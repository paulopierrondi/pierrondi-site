import { AlertTriangle, Shirt, Sparkles, TrendingUp } from 'lucide-react'

import type { LookSummary, LooksStats } from '@/lib/creative-control/types'

import styles from './ControlTower.module.css'

interface LooksPanelProps {
  stats: LooksStats
  recent: LookSummary[]
  freshnessLabel?: string
  freshnessTone?: 'green' | 'amber' | 'red' | 'unknown'
}

interface SourceMeta {
  ageDays: number | null
  detail: string
  realLookTotal: number
  stale: boolean
  tone: 'green' | 'amber' | 'red'
  label: string
  usesFallback: boolean
}

const tierToneMap: Record<string, string> = {
  A: 'green',
  B: 'blue',
  C: 'amber',
  D: 'red',
}

function formatDate(value?: string) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleDateString('pt-BR')
}

function ageDays(value?: string) {
  if (!value) return null
  const ts = new Date(value).getTime()
  if (Number.isNaN(ts)) return null
  return Math.floor((Date.now() - ts) / 86_400_000)
}

function getSourceMeta(stats: LooksStats): SourceMeta {
  const sourceCounts = stats.sourceCounts
  const realLookTotal = sourceCounts
    ? sourceCounts.savedLooks + sourceCounts.lookReviews
    : stats.total
  const sourceMode = stats.sourceMode ?? 'looks'
  const usesClosetFallback = sourceMode === 'closet_items_fallback'
  const sourceAgeDays = ageDays(stats.lastCreatedAt)
  const sourceStale = sourceAgeDays != null && sourceAgeDays >= 3
  const sourceTone = sourceMode === 'empty' || sourceStale ? 'red' : usesClosetFallback ? 'amber' : 'green'
  const sourceLabel =
    sourceMode === 'empty' ? 'vazio' : usesClosetFallback ? 'fallback' : 'looks'
  const sourceDetail = sourceCounts
    ? `${sourceCounts.savedLooks} saved · ${sourceCounts.lookReviews} reviews · ${sourceCounts.closetItems} closet`
    : 'snapshot legado'

  return {
    ageDays: sourceAgeDays,
    detail: sourceDetail,
    realLookTotal,
    stale: sourceStale,
    tone: sourceTone,
    label: sourceLabel,
    usesFallback: usesClosetFallback,
  }
}

function SourceAlert({ meta }: { meta: SourceMeta }) {
  if (!meta.usesFallback && !meta.stale && meta.realLookTotal > 0) return null

  return (
    <div className={styles.sourceAlert} data-tone={meta.tone}>
      <AlertTriangle size={16} />
      <p>
        <strong>
          {meta.realLookTotal === 0
            ? 'Nenhum look composto salvo.'
            : 'Fonte FashionCore sem evolução recente.'}
        </strong>{' '}
        {meta.usesFallback
          ? 'O painel está usando closet_items como fallback; saved_looks e look_reviews estão zerados.'
          : 'O snapshot foi ingerido, mas a fonte de looks está parada.'}
        {meta.ageDays != null && meta.ageDays >= 1 ? ` Última criação há ${meta.ageDays}d.` : ''}
      </p>
    </div>
  )
}

function LooksStatsRow({ stats, source }: { stats: LooksStats; source: SourceMeta }) {
  return (
    <div className={styles.creativeStatsRow}>
      <article data-tone="blue">
        <span>Total disponível</span>
        <strong>{stats.total}</strong>
        <small>{stats.sourceCounts ? 'amostra exibida pelo painel' : 'saved_looks + look_reviews'}</small>
      </article>
      <article data-tone={source.tone}>
        <span>Fonte FashionCore</span>
        <strong>{source.label}</strong>
        <small>{source.detail}</small>
      </article>
      <article data-tone={stats.avgScore >= 75 ? 'green' : stats.avgScore >= 60 ? 'amber' : 'red'}>
        <span>Score médio</span>
        <strong>{stats.avgScore.toFixed(0)}</strong>
        <small>0–100, likelihood</small>
      </article>
      <article data-tone="green">
        <span>A-tier (≥80)</span>
        <strong>{stats.byTier.A}</strong>
        <small>looks fortes</small>
      </article>
      <article data-tone="amber">
        <span>Última criação</span>
        <strong>{formatDate(stats.lastCreatedAt)}</strong>
        <small>{stats.p95Score ? `p95 = ${stats.p95Score.toFixed(0)}` : 'sem amostra'}</small>
      </article>
    </div>
  )
}

function TierHeatmap({ stats }: { stats: LooksStats }) {
  const tierEntries: Array<['A' | 'B' | 'C' | 'D', number]> = [
    ['A', stats.byTier.A],
    ['B', stats.byTier.B],
    ['C', stats.byTier.C],
    ['D', stats.byTier.D],
  ]

  return (
    <div className={styles.tierHeatmap} aria-label="Distribuição por tier">
      {tierEntries.map(([tier, count]) => {
        const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
        return (
          <div key={tier} className={styles.tierBar}>
            <span className={styles.tierLabel}>{tier}</span>
            <div className={styles.bar}>
              <i style={{ width: `${pct}%` }} data-tone={tierToneMap[tier]} />
            </div>
            <strong>{count}</strong>
          </div>
        )
      })}
    </div>
  )
}

function OccasionChips({ stats }: { stats: LooksStats }) {
  if (stats.byOccasion.length === 0) return null

  return (
    <div className={styles.occasionChips}>
      <TrendingUp size={14} />
      {stats.byOccasion.map((tally) => (
        <span key={tally.occasion} className={styles.occasionChip}>
          {tally.occasion} <em>{tally.count}</em>
        </span>
      ))}
    </div>
  )
}

function EmptyLooksState() {
  return (
    <div className={styles.emptyState}>
      <Shirt size={20} />
      <p>
        Nenhum look no db.json. Salve um look no app fashioncore e rode
        <code> creative-control-snapshot.py</code> para popular esta seção.
      </p>
    </div>
  )
}

function LookCard({ look }: { look: LookSummary }) {
  const tone = tierToneMap[look.tier] ?? 'blue'

  return (
    <article className={styles.lookCard} data-tone={tone}>
      <header>
        <span className={styles.lookTier} data-tone={tone}>
          <Sparkles size={12} /> {look.tier}
        </span>
        <strong>{look.totalScore}</strong>
      </header>
      <p className={styles.lookOccasion}>
        {look.occasion ?? 'sem occasion'}
        {look.styleGoal && <em> · {look.styleGoal}</em>}
      </p>
      <div className={styles.lookBreakdown}>
        {Object.entries(look.breakdown).map(([dim, val]) => (
          <span key={dim} title={`${dim}: ${val}`}>
            <i style={{ width: `${(val / 25) * 100}%` }} />
          </span>
        ))}
      </div>
      <footer>
        <span>{look.itemCount} item{look.itemCount === 1 ? '' : 's'}</span>
        <span>{formatDate(look.createdAt)}</span>
      </footer>
    </article>
  )
}

function LooksGrid({ recent }: { recent: LookSummary[] }) {
  if (recent.length === 0) return <EmptyLooksState />

  return (
    <div className={styles.looksGrid}>
      {recent.map((look) => (
        <LookCard key={look.id} look={look} />
      ))}
    </div>
  )
}

export default function LooksPanel({ stats, recent, freshnessLabel, freshnessTone }: LooksPanelProps) {
  const source = getSourceMeta(stats)

  return (
    <section id="looks" className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>FashionCore looks</h2>
        <span data-tone={freshnessTone}>
          {stats.total} look{stats.total === 1 ? '' : 's'}
          {freshnessLabel ? ` · ${freshnessLabel}` : ''}
        </span>
      </div>

      <LooksStatsRow stats={stats} source={source} />
      <SourceAlert meta={source} />
      <TierHeatmap stats={stats} />
      <OccasionChips stats={stats} />
      <LooksGrid recent={recent} />
    </section>
  )
}
