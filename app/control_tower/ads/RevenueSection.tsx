import type { RevenueSection as RevenueData, WindowKey } from '@/lib/ads-control/types'
import { fmtMoney, fmtRoas } from './format'
import { RevenueByProductTable, UnitEconomicsTable } from './RevenueTables'
import styles from './AdsDashboard.module.css'

function Tile({ label, value, tone, hint }: { label: string; value: string; tone?: 'good' | 'warn'; hint?: string }) {
  return (
    <div className={styles.kpi}>
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small data-tone={tone ?? 'flat'}>{hint}</small>}
    </div>
  )
}

export default function RevenueSection({
  revenue,
  product,
  win,
  winLabel,
}: {
  revenue: RevenueData
  product: string
  win: WindowKey
  winLabel: string
}) {
  const keep = <T extends { product: string }>(rows: T[]) => rows.filter((r) => product === 'all' || r.product === product)
  const econ = keep(revenue.unitEconomics)
  const byProduct = keep(revenue.byProduct)

  const mrr = econ.length ? econ.reduce((a, r) => a + r.mrr, 0) : byProduct.reduce((a, r) => a + r.mrr, 0)
  const revenue30 = econ.reduce((a, r) => a + r.revenue30, 0)
  const spend30 = econ.reduce((a, r) => a + r.spend30, 0)
  const newPaying = econ.reduce((a, r) => a + r.newPaying30, 0)
  const cac = newPaying > 0 ? spend30 / newPaying : null
  // ROAS só com produtos anunciados; receita orgânica (sem gasto) entra apenas no MER.
  const paidRevenue = econ.filter((r) => r.spend30 > 0).reduce((a, r) => a + r.revenue30, 0)
  const roas = spend30 > 0 ? paidRevenue / spend30 : null
  const mer = spend30 > 0 ? revenue30 / spend30 : null
  const roasTone = roas == null ? undefined : roas >= 1 ? 'good' : 'warn'
  const roasHint = roas == null ? 'sem gasto' : `produtos anunciados · MER ${fmtRoas(mer)} (receita total ÷ gasto)`

  return (
    <section className={styles.panel} aria-labelledby="ads-revenue">
      <div className={styles.panelHeader}>
        <h2 id="ads-revenue">Receita e economia unitária</h2>
        <span className={styles.pill}>Stripe · RevenueCat</span>
      </div>
      <p className={styles.muted}>
        Cruza o gasto em ads (30 dias) com a receita real. Valores em R$. Economia unitária usa sempre 30 dias; a tabela de
        receita acompanha a janela ({winLabel}) e o filtro de produto.
      </p>

      <div className={styles.kpis}>
        <Tile label="MRR total" value={fmtMoney(mrr, true)} />
        <Tile label="Receita 30d" value={fmtMoney(revenue30, true)} />
        <Tile label="CAC blended" value={fmtMoney(cac)} hint={newPaying > 0 ? `${newPaying} novos pagantes` : 'sem novos pagantes'} tone={newPaying > 0 ? undefined : 'warn'} />
        <Tile label="ROAS (anunciados)" value={fmtRoas(roas)} tone={roasTone} hint={roasHint} />
      </div>

      <UnitEconomicsTable rows={econ} />
      <RevenueByProductTable rows={byProduct} win={win} winLabel={winLabel} />
    </section>
  )
}
