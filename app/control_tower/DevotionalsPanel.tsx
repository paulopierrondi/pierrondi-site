'use client'

import { useState, useTransition } from 'react'
import { BookOpenText, Check, Languages, X } from 'lucide-react'

import type {
  DevotionalPending,
  DevotionalsStats,
} from '@/lib/creative-control/types'

import styles from './ControlTower.module.css'

interface DevotionalsPanelProps {
  stats: DevotionalsStats
  pending: DevotionalPending[]
  freshnessLabel?: string
  freshnessTone?: 'green' | 'amber' | 'red' | 'unknown'
}

type RowState = 'idle' | 'pending' | 'approved' | 'rejected' | 'error'
type DevotionalAction = 'approve' | 'reject'

interface RowStatus {
  state: RowState
  message?: string
}

const MAX_BULK_DEVOTIONAL_ACTION_IDS = 250

const ERROR_LABELS: Record<string, string> = {
  invalid_payload: 'lote inválido — recarregue o snapshot e tente de novo',
  magic_secret_missing: 'segredo de aprovação ausente no ambiente',
  magic_secret_missing_or_too_short: 'segredo de aprovação inválido no ambiente',
  rate_limited: 'limite de aprovações atingido — aguarde ~1min e tente de novo',
  unauthorized: 'sessão expirada — recarregue a página e entre de novo',
  upstream_failed: 'FaithSchool não confirmou todos os itens',
}

function humanError(msg: string) {
  return ERROR_LABELS[msg] ?? msg
}

async function postAction(action: DevotionalAction, docIds: string[]) {
  const response = await fetch('/api/control-tower/devotional-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, docIds }),
    cache: 'no-store',
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const msg = typeof payload?.error === 'string' ? payload.error : `http_${response.status}`
    throw new Error(msg)
  }
  return payload
}

function chunkIds(ids: string[]) {
  const chunks: string[][] = []
  for (let index = 0; index < ids.length; index += MAX_BULK_DEVOTIONAL_ACTION_IDS) {
    chunks.push(ids.slice(index, index + MAX_BULK_DEVOTIONAL_ACTION_IDS))
  }
  return chunks
}

function isMockDevotional(item: DevotionalPending) {
  return item.docId.startsWith('mock-')
}

interface DevotionalStatsSummaryProps {
  stats: DevotionalsStats
  languages: [string, number][]
}

function DevotionalStatsSummary({ stats, languages }: DevotionalStatsSummaryProps) {
  return (
    <div className={styles.creativeStatsRow}>
      <article data-tone="amber">
        <span>Pendentes</span>
        <strong>{stats.totalPending}</strong>
        <small>Âncora YouVersion VOTD</small>
      </article>
      <article data-tone="blue">
        <span>Idiomas ativos</span>
        <strong>{languages.length}</strong>
        <small>pt-BR / en / es</small>
      </article>
      <article data-tone={stats.totalPending > 0 ? 'amber' : 'green'}>
        <span>Última geração</span>
        <strong>{stats.lastGeneratedAt ? new Date(stats.lastGeneratedAt).toLocaleDateString('pt-BR') : '—'}</strong>
        <small>{stats.lastGeneratedAt ? new Date(stats.lastGeneratedAt).toLocaleTimeString('pt-BR') : 'sem ingestão'}</small>
      </article>
    </div>
  )
}

function LanguageChips({ languages }: { languages: [string, number][] }) {
  if (languages.length === 0) return null

  return (
    <div className={styles.langChips}>
      <Languages size={14} />
      {languages.map(([lang, count]) => (
        <span key={lang} className={styles.langChip}>
          {lang} <em>{count}</em>
        </span>
      ))}
    </div>
  )
}

interface BatchApproveRailProps {
  count: number
  isPending: boolean
  onApprove: () => void
}

function BatchApproveRail({ count, isPending, onApprove }: BatchApproveRailProps) {
  if (count === 0) return null

  return (
    <div className={styles.planActionRail}>
      <button
        type="button"
        onClick={onApprove}
        disabled={isPending}
        className={styles.approveButton}
        aria-label="Aprovar todos os devotionais pendentes de uma vez"
      >
        <Check size={14} /> Aprovar pendentes ({count})
      </button>
      <small>aprovação em lote com auditoria no FaithSchool</small>
    </div>
  )
}

interface DevotionalCardProps {
  item: DevotionalPending
  status?: RowStatus
  isPending: boolean
  onAction: (action: DevotionalAction, docId: string) => void
}

function DevotionalCard({ item, status, isPending, onAction }: DevotionalCardProps) {
  const busy = status?.state === 'pending' || isPending
  const mock = isMockDevotional(item)

  return (
    <article className={styles.devotionalCard} data-state={status?.state ?? 'idle'}>
      <header>
        <span className={styles.langChip}>{item.language}</span>
        <strong>{item.date || '—'}</strong>
        {item.ageLabel && <em>{item.ageLabel}</em>}
      </header>
      <p className={styles.scriptureRef}>{item.scriptureRef}</p>
      {item.title && <p className={styles.devotionalTitle}>{item.title}</p>}
      <p className={styles.devotionalSnippet}>{item.snippet}</p>
      <footer>
        <button
          type="button"
          onClick={() => onAction('approve', item.docId)}
          disabled={busy || mock}
          className={styles.approveButton}
          aria-label={`Aprovar devotional ${item.docId}`}
        >
          <Check size={14} /> Aprovar
        </button>
        <button
          type="button"
          onClick={() => onAction('reject', item.docId)}
          disabled={busy || mock}
          className={styles.rejectButton}
          aria-label={`Rejeitar devotional ${item.docId}`}
        >
          <X size={14} /> Rejeitar
        </button>
      </footer>
      {status?.state === 'error' && (
        <p className={styles.devotionalError}>Erro: {status.message ?? 'falha'}</p>
      )}
      {mock && (
        <p className={styles.devotionalError}>
          Snapshot mockado: rode o coletor real antes de aprovar.
        </p>
      )}
    </article>
  )
}

export default function DevotionalsPanel({ stats, pending, freshnessLabel, freshnessTone }: DevotionalsPanelProps) {
  const [rows, setRows] = useState<Record<string, RowStatus>>({})
  const [isPending, startTransition] = useTransition()

  const languages = Object.entries(stats.byLanguage)
  const visible = pending.filter((d) => rows[d.docId]?.state !== 'approved' && rows[d.docId]?.state !== 'rejected')
  const actionable = visible.filter((d) => !isMockDevotional(d))

  function markRows(ids: string[], state: RowState, message?: string) {
    setRows((current) => {
      const next = { ...current }
      ids.forEach((id) => {
        next[id] = { state, message }
      })
      return next
    })
  }

  function handleAction(action: DevotionalAction, docId: string) {
    setRows((current) => ({ ...current, [docId]: { state: 'pending' } }))
    startTransition(() => {
      postAction(action, [docId])
        .then(() => {
          setRows((current) => ({
            ...current,
            [docId]: {
              state: action === 'approve' ? 'approved' : 'rejected',
            },
          }))
        })
        .catch((err: Error) => {
          setRows((current) => ({
            ...current,
            [docId]: { state: 'error', message: humanError(err.message) },
          }))
        })
    })
  }

  function handleBatchApprove() {
    const ids = actionable.map((item) => item.docId)
    if (ids.length === 0) return

    markRows(ids, 'pending')

    startTransition(() => {
      void (async () => {
        for (const batch of chunkIds(ids)) {
          try {
            await postAction('approve', batch)
            markRows(batch, 'approved')
          } catch (err) {
            const message = err instanceof Error ? humanError(err.message) : 'falha'
            markRows(batch, 'error', message)
          }
        }
      })()
    })
  }

  return (
    <section id="devotionais" className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Devotionais FaithSchool</h2>
        <span data-tone={freshnessTone}>
          {stats.totalPending} pendente{stats.totalPending === 1 ? '' : 's'}
          {freshnessLabel ? ` · ${freshnessLabel}` : ''}
        </span>
      </div>

      <DevotionalStatsSummary stats={stats} languages={languages} />
      <LanguageChips languages={languages} />
      <BatchApproveRail count={actionable.length} isPending={isPending} onApprove={handleBatchApprove} />

      {visible.length === 0 ? (
        <div className={styles.emptyState}>
          <BookOpenText size={20} />
          <p>
            Nenhum devocional pendente neste snapshot. Aprovados/rejeitados nesta sessão somem da lista.
            Próximo run do coletor renova a fila.
          </p>
        </div>
      ) : (
        <div className={styles.devotionalGrid}>
          {visible.map((item) => (
            <DevotionalCard
              key={item.docId}
              item={item}
              status={rows[item.docId]}
              isPending={isPending}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </section>
  )
}
