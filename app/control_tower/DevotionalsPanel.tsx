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

interface RowStatus {
  state: RowState
  message?: string
}

async function postAction(action: 'approve' | 'reject', docId: string) {
  const response = await fetch('/api/control-tower/devotional-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, docIds: [docId] }),
    cache: 'no-store',
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const msg = typeof payload?.error === 'string' ? payload.error : `http_${response.status}`
    throw new Error(msg)
  }
  return payload
}

export default function DevotionalsPanel({ stats, pending, freshnessLabel, freshnessTone }: DevotionalsPanelProps) {
  const [rows, setRows] = useState<Record<string, RowStatus>>({})
  const [isPending, startTransition] = useTransition()

  const languages = Object.entries(stats.byLanguage)
  const visible = pending.filter((d) => rows[d.docId]?.state !== 'approved' && rows[d.docId]?.state !== 'rejected')

  function handleAction(action: 'approve' | 'reject', docId: string) {
    setRows((current) => ({ ...current, [docId]: { state: 'pending' } }))
    startTransition(() => {
      postAction(action, docId)
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
            [docId]: { state: 'error', message: err.message },
          }))
        })
    })
  }

  return (
    <section id="devotionais" className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>FaithSchool devotionals</h2>
        <span data-tone={freshnessTone}>
          {stats.totalPending} pendente{stats.totalPending === 1 ? '' : 's'}
          {freshnessLabel ? ` · ${freshnessLabel}` : ''}
        </span>
      </div>

      <div className={styles.creativeStatsRow}>
        <article data-tone="amber">
          <span>Total pending</span>
          <strong>{stats.totalPending}</strong>
          <small>YouVersion VOTD anchor</small>
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

      {languages.length > 0 && (
        <div className={styles.langChips}>
          <Languages size={14} />
          {languages.map(([lang, count]) => (
            <span key={lang} className={styles.langChip}>
              {lang} <em>{count}</em>
            </span>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className={styles.emptyState}>
          <BookOpenText size={20} />
          <p>
            Nenhum devotional pendente neste snapshot. Aprovados/rejeitados nesta sessão somem da lista.
            Próximo run do coletor renova a fila.
          </p>
        </div>
      ) : (
        <div className={styles.devotionalGrid}>
          {visible.map((item) => {
            const status = rows[item.docId]
            const busy = status?.state === 'pending' || isPending
            return (
              <article key={item.docId} className={styles.devotionalCard} data-state={status?.state ?? 'idle'}>
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
                    onClick={() => handleAction('approve', item.docId)}
                    disabled={busy}
                    className={styles.approveButton}
                    aria-label={`Aprovar devotional ${item.docId}`}
                  >
                    <Check size={14} /> Aprovar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction('reject', item.docId)}
                    disabled={busy}
                    className={styles.rejectButton}
                    aria-label={`Rejeitar devotional ${item.docId}`}
                  >
                    <X size={14} /> Rejeitar
                  </button>
                </footer>
                {status?.state === 'error' && (
                  <p className={styles.devotionalError}>Erro: {status.message ?? 'falha'}</p>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
