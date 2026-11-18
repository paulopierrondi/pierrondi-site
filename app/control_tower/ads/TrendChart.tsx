import type { AdsControlSnapshot, Platform } from '@/lib/ads-control/types'
import { PLATFORM_LABEL, PLATFORM_ORDER, fmtMoney } from './format'
import styles from './AdsDashboard.module.css'

const W = 640
const H = 180
const PAD = { l: 44, r: 8, t: 8, b: 22 }

function Chart({
  title,
  dates,
  series,
  fmt,
}: {
  title: string
  dates: string[]
  series: Array<{ platform: Platform; values: number[] }>
  fmt: (v: number) => string
}) {
  const max = Math.max(1, ...series.flatMap((s) => s.values))
  const x = (i: number) => PAD.l + (i / Math.max(1, dates.length - 1)) * (W - PAD.l - PAD.r)
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b)
  const ticks = [0, 0.5, 1]
  const label = `${title}: ${series
    .map((s) => `${PLATFORM_LABEL[s.platform]} total ${fmt(s.values.reduce((a, b) => a + b, 0))}`)
    .join('; ')}`
  return (
    <figure className={styles.chart}>
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="none">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(max * t)} y2={y(max * t)} className={styles.gridLine} />
            <text x={PAD.l - 6} y={y(max * t) + 4} textAnchor="end" className={styles.axisText}>
              {fmt(max * t)}
            </text>
          </g>
        ))}
        {series.map((s) => (
          <polyline
            key={s.platform}
            fill="none"
            strokeWidth="2"
            strokeLinejoin="round"
            className={styles.line}
            data-platform={s.platform}
            points={s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}
          />
        ))}
        <text x={PAD.l} y={H - 6} className={styles.axisText}>
          {dates[0]?.slice(5)}
        </text>
        <text x={W - PAD.r} y={H - 6} textAnchor="end" className={styles.axisText}>
          {dates[dates.length - 1]?.slice(5)}
        </text>
      </svg>
    </figure>
  )
}

export default function TrendChart({ snapshot }: { snapshot: AdsControlSnapshot }) {
  const dates = [...new Set(snapshot.daily.map((d) => d.date))].sort().slice(-30)
  const platforms = PLATFORM_ORDER.filter((p) => snapshot.daily.some((d) => d.platform === p))
  const build = (field: 'spend' | 'conversions') =>
    platforms.map((platform) => ({
      platform,
      values: dates.map((date) =>
        snapshot.daily.filter((d) => d.date === date && d.platform === platform).reduce((a, d) => a + d[field], 0),
      ),
    }))
  if (!dates.length) {
    return <p className={styles.muted}>Sem série diária no snapshot.</p>
  }
  return (
    <div>
      <div className={styles.chartGrid}>
        <Chart title="Gasto diário (R$)" dates={dates} series={build('spend')} fmt={(v) => fmtMoney(v, true)} />
        <Chart title="Conversões diárias" dates={dates} series={build('conversions')} fmt={(v) => String(Math.round(v))} />
      </div>
      <ul className={styles.legend} aria-label="Legenda das plataformas">
        {platforms.map((p) => (
          <li key={p}>
            <i data-platform={p} aria-hidden="true" /> {PLATFORM_LABEL[p]}
          </li>
        ))}
      </ul>
    </div>
  )
}
