'use client'

import { useMemo, useState } from 'react'

import type { AdsControlSnapshot, Metrics, Windows, WindowKey } from '@/lib/ads-control/types'
import {
  PLATFORM_LABEL,
  PLATFORM_ORDER,
  buildRows,
  fmtDelta,
  fmtInt,
  fmtMoney,
  fmtPct,
  fmtRoas,
  kpiWindows,
  relDelta,
  type Dimension,
  type TableRow,
} from './format'
import WebSection from './WebSection'
import styles from './AdsDashboard.module.css'

const WINDOWS: Array<{ key: WindowKey; label: string }> = [
  { key: 'yesterday', label: 'Ontem' },
  { key: 'last7', label: '7 dias' },
  { key: 'last30', label: '30 dias' },
]
const TABS: Array<{ key: Dimension; label: string }> = [
  { key: 'product', label: 'Produto' },
  { key: 'platform', label: 'Plataforma' },
  { key: 'channel', label: 'Canal' },
  { key: 'ad', label: 'Anúncio' },
  { key: 'creative', label: 'Criativo' },
]

type SortKey = 'spend' | 'impressions' | 'clicks' | 'ctr' | 'conversions' | 'cpa' | 'roas' | 'dcpa'

const COLS: Array<{ key: SortKey; label: string }> = [
  { key: 'spend', label: 'Gasto' },
  { key: 'impressions', label: 'Impr.' },
  { key: 'clicks', label: 'Cliques' },
  { key: 'ctr', label: 'CTR' },
  { key: 'conversions', label: 'Conv.' },
  { key: 'cpa', label: 'CPA' },
  { key: 'roas', label: 'ROAS' },
  { key: 'dcpa', label: 'Δ CPA vs prev7' },
]

function sortValue(w: Windows, win: WindowKey, key: SortKey) {
  if (key === 'dcpa') return relDelta(w.last7?.cpa, w.prev7?.cpa)
  return w[win]?.[key] ?? null
}

function Kpi({
  label,
  value,
  delta,
  goodWhenDown,
}: {
  label: string
  value: string
  delta: number | null | undefined
  goodWhenDown?: boolean
}) {
  const tone = delta == null || Math.abs(delta) < 0.005 ? 'flat' : (delta < 0) === Boolean(goodWhenDown) ? 'good' : 'bad'
  return (
    <div className={styles.kpi}>
      <span>{label}</span>
      <strong>{value}</strong>
      {delta !== undefined && (
        <small data-tone={tone} title="Variação vs. 7 dias anteriores (prev7)">
          {delta == null ? '— vs prev7' : `${fmtDelta(delta)} vs prev7`}
        </small>
      )}
    </div>
  )
}

export default function AdsExplorer({ snapshot }: { snapshot: AdsControlSnapshot }) {
  const [win, setWin] = useState<WindowKey>('last7')
  const [tab, setTab] = useState<Dimension>('product')
  const [product, setProduct] = useState('all')
  const [platform, setPlatform] = useState('all')
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'spend', dir: 'desc' })

  const products = useMemo(
    () => [...new Set([...snapshot.byProduct.map((p) => p.product), ...snapshot.ads.map((a) => a.product)])].sort(),
    [snapshot],
  )
  const platforms = useMemo(
    () => PLATFORM_ORDER.filter((p) => snapshot.byPlatform.some((x) => x.platform === p) || snapshot.ads.some((a) => a.platform === p)),
    [snapshot],
  )
  const filters = useMemo(() => ({ product, platform }), [product, platform])

  const kpi = useMemo(() => kpiWindows(snapshot, filters), [snapshot, filters])
  const cur: Metrics | undefined = kpi.windows[win]
  const prev: Metrics | undefined = kpi.windows.prev7
  const withDelta = win === 'last7'
  const d = (field: keyof Metrics) => (withDelta ? relDelta(cur?.[field] as number | null, prev?.[field] as number | null) : undefined)

  const { rows, derived } = useMemo(() => buildRows(snapshot, tab, filters), [snapshot, tab, filters])
  const sorted = useMemo(() => {
    const factor = sort.dir === 'desc' ? -1 : 1
    return [...rows].sort((a, b) => {
      const av = sortValue(a.windows, win, sort.key)
      const bv = sortValue(b.windows, win, sort.key)
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      return (av - bv) * factor
    })
  }, [rows, win, sort])

  function toggleSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'desc' ? 'asc' : 'desc' } : { key, dir: 'desc' }))
  }

  const winLabel = WINDOWS.find((w) => w.key === win)?.label ?? ''
  const range = snapshot.windows[win]

  return (
    <>
      <section className={styles.panel} aria-labelledby="ads-kpis">
        <div className={styles.panelHeader}>
          <h2 id="ads-kpis">Resultados · {winLabel}</h2>
          <div className={styles.segment} role="group" aria-label="Janela de tempo">
            {WINDOWS.map((w) => (
              <button key={w.key} type="button" aria-pressed={win === w.key} onClick={() => setWin(w.key)}>
                {w.label}
              </button>
            ))}
          </div>
        </div>
        <p className={styles.muted}>
          {range.start === range.end ? range.start : `${range.start} a ${range.end}`}
          {product !== 'all' || platform !== 'all' ? ' · com filtros aplicados' : ' · total da conta'}
          {kpi.derived ? ' · somado dos anúncios listados' : ''}
        </p>
        <div className={styles.filters}>
          <label>
            Produto
            <select value={product} onChange={(e) => setProduct(e.target.value)}>
              <option value="all">Todos</option>
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label>
            Plataforma
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="all">Todas</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {PLATFORM_LABEL[p]}
                </option>
              ))}
            </select>
          </label>
        </div>
        {cur ? (
          <div className={styles.kpis}>
            <Kpi label="Gasto" value={fmtMoney(cur.spend)} delta={d('spend')} goodWhenDown />
            <Kpi label="Conversões" value={fmtInt(cur.conversions)} delta={d('conversions')} />
            <Kpi label="CPA" value={fmtMoney(cur.cpa)} delta={d('cpa')} goodWhenDown />
            <Kpi label="ROAS" value={fmtRoas(cur.roas)} delta={d('roas')} />
            <Kpi label="CTR" value={fmtPct(cur.ctr)} delta={d('ctr')} />
            <Kpi label="Installs" value={fmtInt(cur.installs)} delta={d('installs')} />
          </div>
        ) : (
          <p className={styles.emptyInline}>Sem dados nesta janela para o filtro escolhido.</p>
        )}
      </section>

      {snapshot.web && <WebSection web={snapshot.web} product={product} win={win} winLabel={winLabel} />}

      <section className={styles.panel} aria-labelledby="ads-tables">
        <div className={styles.panelHeader}>
          <h2 id="ads-tables">Detalhamento</h2>
        </div>
        <div className={styles.tabs} role="tablist" aria-label="Dimensão">
          {TABS.map((t) => (
            <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        {derived && <p className={styles.muted}>Reagregado a partir dos anúncios listados (top por gasto).</p>}
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={`Tabela por ${TABS.find((t) => t.key === tab)?.label}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{TABS.find((t) => t.key === tab)?.label}</th>
                {COLS.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className={styles.num}
                    aria-sort={sort.key === c.key ? (sort.dir === 'desc' ? 'descending' : 'ascending') : 'none'}
                  >
                    <button type="button" onClick={() => toggleSort(c.key)}>
                      {c.label}
                      {sort.key === c.key ? (sort.dir === 'desc' ? ' ▼' : ' ▲') : ''}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={COLS.length + 1} className={styles.emptyCell}>
                    Nenhuma linha para os filtros atuais.
                  </td>
                </tr>
              )}
              {sorted.map((r) => (
                <Row key={r.key} row={r} win={win} thumb={tab === 'creative'} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Row({ row, win, thumb }: { row: TableRow; win: WindowKey; thumb: boolean }) {
  const m = row.windows[win]
  const dcpa = relDelta(row.windows.last7?.cpa, row.windows.prev7?.cpa)
  const tone = dcpa == null || Math.abs(dcpa) < 0.005 ? 'flat' : dcpa < 0 ? 'good' : 'bad'
  return (
    <tr>
      <th scope="row">
        <div className={styles.cellName}>
          {thumb &&
            (row.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.thumbnailUrl} alt={`Miniatura do criativo ${row.label}`} width={40} height={40} loading="lazy" />
            ) : (
              <span className={styles.noThumb} aria-label="Sem miniatura">
                sem img
              </span>
            ))}
          <span>
            <strong>{row.label}</strong>
            {row.sub && <small>{row.sub}</small>}
          </span>
        </div>
      </th>
      <td className={styles.num}>{fmtMoney(m?.spend)}</td>
      <td className={styles.num}>{fmtInt(m?.impressions)}</td>
      <td className={styles.num}>{fmtInt(m?.clicks)}</td>
      <td className={styles.num}>{fmtPct(m?.ctr)}</td>
      <td className={styles.num}>{fmtInt(m?.conversions)}</td>
      <td className={styles.num}>{fmtMoney(m?.cpa)}</td>
      <td className={styles.num}>{fmtRoas(m?.roas)}</td>
      <td className={styles.num} data-tone={tone}>
        {fmtDelta(dcpa)}
      </td>
    </tr>
  )
}
