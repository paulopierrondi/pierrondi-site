import type { RevenueProductRow, UnitEconomicsRow, WindowKey } from '@/lib/ads-control/types'
import { fmtDec, fmtInt, fmtMoney, fmtRoas } from './format'
import styles from './AdsDashboard.module.css'

/** flat: sem gasto em ads (nada a julgar); good: ROAS >= 1 ou payback <= 3 meses; senão warn. */
export function econTone(r: Pick<UnitEconomicsRow, 'roas' | 'paybackMonths' | 'spend30'>): 'good' | 'warn' | 'flat' {
  if (!r.spend30) return 'flat'
  if (r.roas != null && r.roas >= 1) return 'good'
  if (r.paybackMonths != null && r.paybackMonths <= 3) return 'good'
  return 'warn'
}

function Empty({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols} className={styles.emptyCell}>Sem dados para o filtro atual.</td>
    </tr>
  )
}

export function UnitEconomicsTable({ rows }: { rows: UnitEconomicsRow[] }) {
  const sorted = [...rows].sort((a, b) => b.spend30 - a.spend30)
  return (
    <>
      <h3 className={styles.subTitle}>Economia unitária por produto (30 dias)</h3>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Economia unitária por produto">
        <table className={styles.table} style={{ minWidth: 820 }}>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col" className={styles.num}>Gasto ads (30d)</th>
              <th scope="col" className={styles.num}>Receita (30d)</th>
              <th scope="col" className={styles.num}>Novos pagantes</th>
              <th scope="col" className={styles.num}>CAC</th>
              <th scope="col" className={styles.num}>ARPU/mês</th>
              <th scope="col" className={styles.num}>Payback (meses)</th>
              <th scope="col" className={styles.num}>ROAS</th>
              <th scope="col" className={styles.num}>MRR</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && <Empty cols={9} />}
            {sorted.map((r) => {
              const t = econTone(r)
              return (
                <tr key={r.product}>
                  <th scope="row"><strong>{r.product}</strong></th>
                  <td className={styles.num}>{fmtMoney(r.spend30, true)}</td>
                  <td className={styles.num}>{fmtMoney(r.revenue30, true)}</td>
                  <td className={styles.num}>{fmtInt(r.newPaying30)}</td>
                  <td className={styles.num}>{fmtMoney(r.cac)}</td>
                  <td className={styles.num}>{fmtMoney(r.arpu)}</td>
                  <td className={styles.num} data-tone={t}>{fmtDec(r.paybackMonths)}</td>
                  <td className={styles.num} data-tone={t}>{fmtRoas(r.roas)}</td>
                  <td className={styles.num}>{fmtMoney(r.mrr, true)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export function RevenueByProductTable({
  rows,
  win,
  winLabel,
}: {
  rows: RevenueProductRow[]
  win: WindowKey
  winLabel: string
}) {
  const sorted = rows
    .map((r) => ({ r, w: r.windows[win] }))
    .sort((a, b) => (b.w?.revenue ?? -1) - (a.w?.revenue ?? -1))
  return (
    <>
      <h3 className={styles.subTitle}>Receita por produto · {winLabel}</h3>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Receita por produto">
        <table className={styles.table} style={{ minWidth: 760 }}>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col" className={styles.num}>Receita</th>
              <th scope="col" className={styles.num}>Pagamentos</th>
              <th scope="col" className={styles.num}>Avulsos</th>
              <th scope="col" className={styles.num}>Novas assinaturas</th>
              <th scope="col" className={styles.num}>MRR</th>
              <th scope="col" className={styles.num}>Assinaturas ativas</th>
              <th scope="col" className={styles.num}>Trials</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && <Empty cols={8} />}
            {sorted.map(({ r, w }) => (
              <tr key={r.product}>
                <th scope="row"><strong>{r.product}</strong></th>
                <td className={styles.num}>{fmtMoney(w?.revenue)}</td>
                <td className={styles.num}>{fmtInt(w?.payments)}</td>
                <td className={styles.num}>{fmtInt(w?.oneTime)}</td>
                <td className={styles.num}>{fmtInt(w?.newSubscriptions)}</td>
                <td className={styles.num}>{fmtMoney(r.mrr, true)}</td>
                <td className={styles.num}>{fmtInt(r.activeSubscriptions)}</td>
                <td className={styles.num}>{fmtInt(r.trialing)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
