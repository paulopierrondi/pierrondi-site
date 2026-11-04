import type { WebSection as WebData, WindowKey } from '@/lib/ads-control/types'
import { fmtDelta, fmtInt, fmtPct, relDelta } from './format'
import { ChannelsTable, QueriesTable, SearchTable } from './WebTables'
import styles from './AdsDashboard.module.css'

const tone = (d: number | null) => (d == null || Math.abs(d) < 0.005 ? 'flat' : d > 0 ? 'good' : 'bad')

export default function WebSection({
  web,
  product,
  win,
  winLabel,
}: {
  web: WebData
  product: string
  win: WindowKey
  winLabel: string
}) {
  const keep = <T extends { product: string }>(rows: T[]) => rows.filter((r) => product === 'all' || r.product === product)
  const traffic = keep(web.traffic)
    .map((t) => ({ t, m: t.windows[win] }))
    .sort((a, b) => (b.m?.sessions ?? -1) - (a.m?.sessions ?? -1))
  const channels = keep(web.channels)
  const search = keep(web.search)
  const queries = keep(web.topQueries)
  const showDelta = win === 'last7'

  return (
    <section className={styles.panel} aria-labelledby="ads-web">
      <div className={styles.panelHeader}>
        <h2 id="ads-web">Site e busca orgânica · {winLabel}</h2>
        <span className={styles.pill}>GA4 + Search Console</span>
      </div>
      <p className={styles.muted}>
        Acompanha a janela e o filtro de produto acima. Variação vs. 7 dias anteriores só aparece em «7 dias». Canais usam sempre
        7 dias; consultas, os últimos 30 dias.
      </p>

      <h3 className={styles.subTitle}>Tráfego por produto (GA4)</h3>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tráfego por produto">
        <table className={styles.table} style={{ minWidth: 760 }}>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col" className={styles.num}>Sessões</th>
              <th scope="col" className={styles.num}>Usuários</th>
              <th scope="col" className={styles.num}>Eventos-chave</th>
              <th scope="col" className={styles.num}>Engajamento</th>
              <th scope="col" className={styles.num}>Taxa evento-chave</th>
              <th scope="col" className={styles.num}>Δ sessões vs prev7</th>
            </tr>
          </thead>
          <tbody>
            {traffic.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyCell}>Sem tráfego para o filtro atual.</td>
              </tr>
            )}
            {traffic.map(({ t, m }) => {
              const d = showDelta ? relDelta(m?.sessions, t.windows.prev7?.sessions) : null
              return (
                <tr key={`${t.product}:${t.propertyId}`}>
                  <th scope="row">
                    <div className={styles.cellName}>
                      <span>
                        <strong>{t.product}</strong>
                        <small>{t.property}</small>
                      </span>
                    </div>
                  </th>
                  <td className={styles.num}>{fmtInt(m?.sessions)}</td>
                  <td className={styles.num}>{fmtInt(m?.users)}</td>
                  <td className={styles.num}>{fmtInt(m?.keyEvents)}</td>
                  <td className={styles.num}>{fmtPct(m?.engagementRate)}</td>
                  <td className={styles.num}>{fmtPct(m?.keyEventRate)}</td>
                  <td className={styles.num} data-tone={tone(d)}>{fmtDelta(d)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ChannelsTable rows={channels} />
      <SearchTable rows={search} win={win} showDelta={showDelta} />
      <QueriesTable rows={queries} />
    </section>
  )
}
