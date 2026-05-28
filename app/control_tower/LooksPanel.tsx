import { Shirt, Sparkles, TrendingUp } from 'lucide-react'

import type { LookSummary, LooksStats } from '@/lib/creative-control/types'

import styles from './ControlTower.module.css'

interface LooksPanelProps {
  stats: LooksStats
  recent: LookSummary[]
}

const tierToneMap: Record<string, string> = {
  A: 'green',
  B: 'blue',
  C: 'amber',
  D: 'red',
}

function formatDate(value?: string) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString('pt-BR')
  } catch {
    return value
  }
}

export default function LooksPanel({ stats, recent }: LooksPanelProps) {
  const total = stats.total
  const tierEntries: Array<['A' | 'B' | 'C' | 'D', number]> = [
    ['A', stats.byTier.A],
    ['B', stats.byTier.B],
    ['C', stats.byTier.C],
    ['D', stats.byTier.D],
  ]

  return (
    <section id="looks" className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>FashionCore looks</h2>
        <span>{total} look{total === 1 ? '' : 's'} no snapshot</span>
      </div>

      <div className={styles.creativeStatsRow}>
        <article data-tone="blue">
          <span>Total disponível</span>
          <strong>{total}</strong>
          <small>saved_looks + look_reviews</small>
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

      <div className={styles.tierHeatmap} aria-label="Distribuição por tier">
        {tierEntries.map(([tier, count]) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
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

      {stats.byOccasion.length > 0 && (
        <div className={styles.occasionChips}>
          <TrendingUp size={14} />
          {stats.byOccasion.map((tally) => (
            <span key={tally.occasion} className={styles.occasionChip}>
              {tally.occasion} <em>{tally.count}</em>
            </span>
          ))}
        </div>
      )}

      {recent.length === 0 ? (
        <div className={styles.emptyState}>
          <Shirt size={20} />
          <p>
            Nenhum look no db.json. Salve um look no app fashioncore e rode
            <code> creative-control-snapshot.py</code> para popular esta seção.
          </p>
        </div>
      ) : (
        <div className={styles.looksGrid}>
          {recent.map((look) => {
            const tone = tierToneMap[look.tier] ?? 'blue'
            return (
              <article key={look.id} className={styles.lookCard} data-tone={tone}>
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
          })}
        </div>
      )}
    </section>
  )
}
