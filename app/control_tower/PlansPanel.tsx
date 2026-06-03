'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, Clock, FileCode, ListTodo, ShieldAlert, X } from 'lucide-react'

import { chunkPlanActionIds } from '@/lib/control-tower/plan-action-limits'
import {
  summarizePlanQueue,
  type PlanApprovalView,
  type PlanQueueItem,
} from '@/lib/control-tower/plan-view'
import styles from './ControlTower.module.css'

export type { PlanQueueItem } from '@/lib/control-tower/plan-view'

interface PlansPanelProps {
  plans: PlanQueueItem[]
  approvals?: Record<string, PlanApprovalView>
  freshnessLabel?: string
  freshnessTone?: 'green' | 'amber' | 'red' | 'unknown'
}

type PlanAction = 'approve' | 'defer' | 'reject'
type RowState =
  | 'idle'
  | 'pending'
  | 'approved'
  | 'deferred'
  | 'rejected'
  | 'error'

interface RowStatus {
  state: RowState
  message?: string
}

const APPROVAL_TTL_HOURS = 24

const ERROR_LABELS: Record<string, string> = {
  invalid_payload: 'lote inválido — recarregue o snapshot e tente de novo',
  rate_limited: 'limite de aprovações atingido — aguarde ~1min e tente de novo',
  unauthorized: 'sessão expirada — recarregue a página e entre de novo',
}

function humanError(msg: string) {
  const [code, detail] = msg.split(': ', 2)
  const label = ERROR_LABELS[code]
  if (!label) return msg
  return detail ? `${label} (${detail})` : label
}

async function postAction(action: PlanAction, planIds: string[]) {
  const response = await fetch('/api/control-tower/plan-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, planIds }),
    cache: 'no-store',
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const detail = Array.isArray(payload?.issues)
      ? payload.issues
          .map((issue: { path?: string; message?: string }) =>
            [issue.path, issue.message].filter(Boolean).join(': '),
          )
          .filter(Boolean)
          .join('; ')
      : ''
    const msg =
      typeof payload?.error === 'string'
        ? [payload.error, detail].filter(Boolean).join(': ')
        : `http_${response.status}`
    throw new Error(msg)
  }
  return payload
}

function ageLabel(createdAtUtc: string): string {
  const ts = new Date(createdAtUtc).getTime()
  if (Number.isNaN(ts)) return '—'
  const ageMin = Math.round((Date.now() - ts) / 60000)
  if (ageMin < 0) return 'agora'
  if (ageMin < 60) return `${Math.max(1, ageMin)}min atrás`
  const ageHr = ageMin / 60
  if (ageHr < 24) return `${ageHr.toFixed(1)}h atrás`
  return `${(ageHr / 24).toFixed(1)}d atrás`
}

const STATE_HINT: Record<
  Exclude<RowState, 'idle' | 'pending' | 'error'>,
  string
> = {
  approved: `aprovado · gate expira em ${APPROVAL_TTL_HOURS}h`,
  deferred: 'adiado · sai da fila até o próximo run',
  rejected: 'rejeitado · não vira gate',
}

export default function PlansPanel({
  plans,
  approvals = {},
  freshnessLabel,
  freshnessTone,
}: PlansPanelProps) {
  const router = useRouter()
  const [rows, setRows] = useState<Record<string, RowStatus>>({})
  const [bulkBusy, setBulkBusy] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const resolved = (state: RowState | undefined) =>
    state === 'approved' || state === 'deferred' || state === 'rejected'

  const localApprovals = Object.fromEntries(
    Object.entries(rows).flatMap(([planId, row]) => {
      if (!resolved(row.state)) return []
      const now = new Date()
      const expires =
        row.state === 'approved'
          ? new Date(now.getTime() + APPROVAL_TTL_HOURS * 60 * 60 * 1000).toISOString()
          : null
      return [
        [
          planId,
          {
            status: row.state,
            action_at_utc: now.toISOString(),
            expires_at_utc: expires,
          } satisfies PlanApprovalView,
        ],
      ]
    }),
  )
  const queue = summarizePlanQueue(plans, { ...approvals, ...localApprovals })
  const visible = queue.visible
  const lowRisk = queue.lowRiskCount
  const mediumRisk = queue.mediumRiskCount

  function markRows(ids: string[], state: RowState, message?: string) {
    setRows((current) => {
      const next = { ...current }
      ids.forEach((id) => {
        next[id] = { state, message }
      })
      return next
    })
  }

  async function handleAction(action: PlanAction, planId: string) {
    setActionMessage(null)
    markRows([planId], 'pending')
    try {
      await postAction(action, [planId])
      markRows(
        [planId],
        action === 'approve' ? 'approved' : action === 'defer' ? 'deferred' : 'rejected',
      )
      setActionMessage(`Plano ${action === 'approve' ? 'aprovado' : action === 'defer' ? 'adiado' : 'rejeitado'}.`)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? humanError(err.message) : 'falha'
      markRows([planId], 'error', message)
    }
  }

  async function handleBatchApprove() {
    const ids = visible
      .filter((p) => p.risk_class === 'low')
      .map((p) => p.planId)
    if (ids.length === 0) return

    setBulkBusy(true)
    setActionMessage(`Aprovando ${ids.length} planos low risk...`)
    markRows(ids, 'pending')

    let processed = 0
    let failed = 0
    for (const batch of chunkPlanActionIds(ids)) {
      setActionMessage(`Aprovando ${processed + 1}-${processed + batch.length} de ${ids.length}...`)
      try {
        await postAction('approve', batch)
        markRows(batch, 'approved')
      } catch (err) {
        const message = err instanceof Error ? humanError(err.message) : 'falha'
        markRows(batch, 'error', message)
        failed += batch.length
      }
      processed += batch.length
    }

    setBulkBusy(false)
    setActionMessage(
      failed > 0
        ? `${ids.length - failed} aprovados; ${failed} falharam.`
        : `${ids.length} planos low risk aprovados.`,
    )
    router.refresh()
  }

  return (
    <section id="planos" className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Autodev plan queue</h2>
        <span data-tone={freshnessTone}>
          {queue.pendingCount} pendente{queue.pendingCount === 1 ? '' : 's'}
          {freshnessLabel ? ` · ${freshnessLabel}` : ''}
        </span>
      </div>

      <div className={styles.creativeStatsRow}>
        <article data-tone={queue.pendingCount > 0 ? 'amber' : 'green'}>
          <span>Planos pendentes</span>
          <strong>{queue.pendingCount}</strong>
          <small>hourly Kimi planner</small>
        </article>
        <article data-tone="blue">
          <span>Low risk</span>
          <strong>{lowRisk}</strong>
          <small>aplicação direta em worktree</small>
        </article>
        <article data-tone={mediumRisk > 0 ? 'amber' : 'green'}>
          <span>Medium risk</span>
          <strong>{mediumRisk}</strong>
          <small>exige revisão antes do gate</small>
        </article>
      </div>

      {lowRisk > 0 && (
        <div className={styles.planActionRail}>
          <button
            type="button"
            onClick={() => void handleBatchApprove()}
            disabled={bulkBusy}
            className={styles.approveButton}
            aria-label="Aprovar todos os planos low risk de uma vez"
          >
            <Check size={14} /> Aprovar {lowRisk} low risk
          </button>
          <small>
            chunks de 50 · {mediumRisk} medium ficam para revisão manual · gate expira em {APPROVAL_TTL_HOURS}h
          </small>
        </div>
      )}
      {actionMessage && <p className={styles.planActionStatus}>{actionMessage}</p>}

      {visible.length === 0 ? (
        <div className={styles.emptyState}>
          <ListTodo size={20} />
          <p>
            Nenhum plano pendente neste snapshot. Aprovados/adiados/rejeitados
            nesta sessão somem da lista. Próximo run do planner renova a fila.
          </p>
        </div>
      ) : (
        <div className={styles.devotionalGrid}>
          {visible.map((item) => {
            const status = rows[item.planId]
            const busy = status?.state === 'pending' || bulkBusy
            return (
              <article
                key={item.planId}
                className={styles.devotionalCard}
                data-state={status?.state ?? 'idle'}
              >
                <header>
                  <span className={styles.langChip}>{item.project}</span>
                  <strong>{item.risk_class}</strong>
                  <em>
                    <Clock size={11} /> {ageLabel(item.created_at_utc)}
                  </em>
                </header>
                <p className={styles.scriptureRef}>{item.title}</p>
                <p className={styles.devotionalSnippet}>{item.summary}</p>
                {item.scope_files.length > 0 && (
                  <div className={styles.langChips}>
                    <FileCode size={14} />
                    {item.scope_files.map((file) => (
                      <span key={file} className={styles.langChip}>
                        {file}
                      </span>
                    ))}
                  </div>
                )}
                {item.risk_class === 'medium' && (
                  <p className={styles.devotionalTitle}>
                    <ShieldAlert size={12} /> revisar antes de aprovar
                  </p>
                )}
                <footer>
                  <button
                    type="button"
                    onClick={() => void handleAction('approve', item.planId)}
                    disabled={busy}
                    className={styles.approveButton}
                    aria-label={`Aprovar plano ${item.planId}`}
                  >
                    <Check size={14} /> Aprovar
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleAction('defer', item.planId)}
                    disabled={busy}
                    className={styles.rejectButton}
                    aria-label={`Adiar plano ${item.planId}`}
                  >
                    <Clock size={14} /> Adiar
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleAction('reject', item.planId)}
                    disabled={busy}
                    className={styles.rejectButton}
                    aria-label={`Rejeitar plano ${item.planId}`}
                  >
                    <X size={14} /> Rejeitar
                  </button>
                </footer>
                {status?.state === 'error' && (
                  <p className={styles.devotionalError}>
                    Erro: {status.message ?? 'falha'}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      )}

      {(() => {
        const justResolved = queue.resolved
        if (justResolved.length === 0) return null
        return (
          <div className={styles.langChips}>
            {justResolved.map(({ plan, approval }) => {
              const state = approval.status
              return (
                <span key={plan.planId} className={styles.langChip}>
                  {plan.planId} <em>{STATE_HINT[state]}</em>
                </span>
              )
            })}
          </div>
        )
      })()}
    </section>
  )
}
