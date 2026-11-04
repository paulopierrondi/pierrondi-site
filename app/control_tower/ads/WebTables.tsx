import type { WebChannelRow, WebQueryRow, WebSearchRow, WindowKey } from '@/lib/ads-control/types'
import { fmtDec, fmtDelta, fmtInt, fmtPct, relDelta } from './format'
import styles from './AdsDashboard.module.css'

const tone = (d: number | null) => (d == null || Math.abs(d) < 0.005 ? 'flat' : d > 0 ? 'good' : 'bad')

function Empty({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols} className={styles.emptyCell}>Sem dados para o filtro atual.</td>
    </tr>
  )
}

export function ChannelsTable({ rows }: { rows: WebChannelRow[] }) {
  const sorted = [...rows].sort((a, b) => b.windows.last7.sessions - a.windows.last7.sessions)
  return (
    <>
      <h3 className={styles.subTitle}>Canais de aquisição (GA4 · 7 dias)</h3>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Canais de aquisição">
        <table className={styles.table} style={{ minWidth: 560 }}>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Canal</th>
              <th scope="col" className={styles.num}>Sessões</th>
              <th scope="col" className={styles.num}>Δ vs prev7</th>
              <th scope="col" className={styles.num}>Eventos-chave</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && <Empty cols={5} />}
            {sorted.map((c) => {
              const d = relDelta(c.windows.last7.sessions, c.windows.prev7.sessions)
              return (
                <tr key={`${c.product}:${c.channel}`}>
                  <th scope="row" style={{ minWidth: 140 }}>{c.product}</th>
                  <td>{c.channel}</td>
                  <td className={styles.num}>{fmtInt(c.windows.last7.sessions)}</td>
                  <td className={styles.num} data-tone={tone(d)}>{fmtDelta(d)}</td>
                  <td className={styles.num}>{fmtInt(c.windows.last7.keyEvents)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export function SearchTable({ rows, win, showDelta }: { rows: WebSearchRow[]; win: WindowKey; showDelta: boolean }) {
  const sorted = [...rows].sort((a, b) => (b.windows[win]?.clicks ?? -1) - (a.windows[win]?.clicks ?? -1))
  return (
    <>
      <h3 className={styles.subTitle}>Busca orgânica (Search Console)</h3>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Busca orgânica por site">
        <table className={styles.table} style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th scope="col">Site</th>
              <th scope="col" className={styles.num}>Cliques</th>
              <th scope="col" className={styles.num}>Impressões</th>
              <th scope="col" className={styles.num}>CTR</th>
              <th scope="col" className={styles.num}>Posição média</th>
              <th scope="col" className={styles.num}>Δ cliques vs prev7</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && <Empty cols={6} />}
            {sorted.map((s) => {
              const m = s.windows[win]
              const d = showDelta ? relDelta(m?.clicks, s.windows.prev7?.clicks) : null
              return (
                <tr key={`${s.product}:${s.site}`}>
                  <th scope="row">
                    <div className={styles.cellName}>
                      <span>
                        <strong>{s.site}</strong>
                        <small>{s.product}</small>
                      </span>
                    </div>
                  </th>
                  <td className={styles.num}>{fmtInt(m?.clicks)}</td>
                  <td className={styles.num}>{fmtInt(m?.impressions)}</td>
                  <td className={styles.num}>{fmtPct(m?.ctr)}</td>
                  <td className={styles.num}>{fmtDec(m?.position)}</td>
                  <td className={styles.num} data-tone={tone(d)}>{fmtDelta(d)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export function QueriesTable({ rows }: { rows: WebQueryRow[] }) {
  const sorted = [...rows].sort((a, b) => b.impressions - a.impressions)
  return (
    <>
      <h3 className={styles.subTitle}>Principais consultas (Search Console · 30 dias)</h3>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Principais consultas de busca">
        <table className={styles.table} style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th scope="col">Consulta</th>
              <th scope="col">Produto</th>
              <th scope="col" className={styles.num}>Impressões</th>
              <th scope="col" className={styles.num}>Cliques</th>
              <th scope="col" className={styles.num}>CTR</th>
              <th scope="col" className={styles.num}>Posição</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && <Empty cols={6} />}
            {sorted.map((q) => (
              <tr key={`${q.product}:${q.site}:${q.query}`}>
                <th scope="row">{q.query}</th>
                <td>{q.product}</td>
                <td className={styles.num}>{fmtInt(q.impressions)}</td>
                <td className={styles.num}>{fmtInt(q.clicks)}</td>
                <td className={styles.num}>{fmtPct(q.ctr)}</td>
                <td className={styles.num}>{fmtDec(q.position)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
