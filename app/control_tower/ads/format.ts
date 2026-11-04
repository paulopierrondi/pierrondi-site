import type { AdsControlSnapshot, AdRow, Metrics, Platform, Windows, WindowKey } from '@/lib/ads-control/types'

export const PLATFORM_LABEL: Record<Platform, string> = {
  google_ads: 'Google Ads',
  apple_ads: 'Apple Ads',
  tiktok_ads: 'TikTok Ads',
  meta_ads: 'Meta Ads',
}
export const PLATFORM_ORDER: Platform[] = ['google_ads', 'apple_ads', 'meta_ads', 'tiktok_ads']

export const STALE_HOURS = 30

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const brl0 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const int = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })
const dec1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const dec2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pct1 = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 })

export const fmtMoney = (v: number | null | undefined, round = false) =>
  v == null || !Number.isFinite(v) ? '—' : (round ? brl0 : brl).format(v)
export const fmtInt = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? '—' : int.format(v))
export const fmtDec = (v: number | null | undefined, digits: 1 | 2 = 1) =>
  v == null || !Number.isFinite(v) ? '—' : (digits === 1 ? dec1 : dec2).format(v)
export const fmtPct = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? '—' : pct1.format(v))
export const fmtRoas = (v: number | null | undefined) =>
  v == null || !Number.isFinite(v) ? '—' : `${dec2.format(v)}x`

export function fmtDateTimeSP(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function freshness(collectedAt: string, now = Date.now()) {
  const ts = new Date(collectedAt).getTime()
  if (Number.isNaN(ts)) return { stale: true, label: 'timestamp inválido', ageHours: null as number | null }
  const ageHours = Math.max(0, (now - ts) / 3_600_000)
  const stale = ageHours > STALE_HOURS
  const label =
    ageHours < 1
      ? 'atualizado há menos de 1h'
      : ageHours < 48
        ? `atualizado há ${Math.round(ageHours)}h`
        : `atualizado há ${Math.round(ageHours / 24)} dias`
  return { stale, label: stale ? `${label} · STALE` : label, ageHours }
}

export function sumMetrics(list: Array<Metrics | undefined>): Metrics | undefined {
  const items = list.filter((m): m is Metrics => Boolean(m))
  if (!items.length) return undefined
  const s = { spend: 0, impressions: 0, clicks: 0, installs: 0, conversions: 0, conversionValue: 0 }
  for (const m of items) {
    s.spend += m.spend
    s.impressions += m.impressions
    s.clicks += m.clicks
    s.installs += m.installs
    s.conversions += m.conversions
    s.conversionValue += m.conversionValue
  }
  return {
    ...s,
    ctr: s.impressions ? s.clicks / s.impressions : null,
    cpc: s.clicks ? s.spend / s.clicks : null,
    cpm: s.impressions ? (s.spend / s.impressions) * 1000 : null,
    cpa: s.conversions ? s.spend / s.conversions : null,
    roas: s.spend ? s.conversionValue / s.spend : null,
    cvr: s.clicks ? s.conversions / s.clicks : null,
  }
}

export function sumWindows(list: Windows[]): Windows {
  const keys: WindowKey[] = ['yesterday', 'last7', 'prev7', 'last30']
  const out: Windows = {}
  for (const k of keys) {
    const m = sumMetrics(list.map((w) => w[k]))
    if (m) out[k] = m
  }
  return out
}

/** Variação relativa; null quando não calculável. */
export function relDelta(current: number | null | undefined, previous: number | null | undefined) {
  if (current == null || previous == null || !Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) {
    return null
  }
  return (current - previous) / Math.abs(previous)
}

export function fmtDelta(d: number | null) {
  if (d == null) return '—'
  const sign = d > 0 ? '+' : ''
  return `${sign}${pct1.format(d)}`
}

export type Dimension = 'product' | 'platform' | 'channel' | 'ad' | 'creative'

export interface TableRow {
  key: string
  label: string
  sub?: string
  platform?: Platform
  product?: string
  thumbnailUrl?: string | null
  windows: Windows
}

export interface Filters {
  product: string
  platform: string
}

const matches = (f: Filters, product: string, platform: string) =>
  (f.product === 'all' || f.product === product) && (f.platform === 'all' || f.platform === platform)

/** Linhas da tabela. Sem filtro usa os agregados do snapshot; com filtro reagrega a partir dos anúncios listados. */
export function buildRows(s: AdsControlSnapshot, dim: Dimension, f: Filters): { rows: TableRow[]; derived: boolean } {
  const filtered = f.product !== 'all' || f.platform !== 'all'
  let rows: TableRow[] = []
  let derived = false

  if (dim === 'ad') {
    rows = s.ads
      .filter((a) => matches(f, a.product, a.platform))
      .map((a) => ({
        key: a.id,
        label: a.ad,
        sub: `${PLATFORM_LABEL[a.platform]} · ${a.product} · ${a.channel} · ${a.status}`,
        platform: a.platform,
        product: a.product,
        windows: a.windows,
      }))
  } else if (dim === 'creative') {
    rows = s.creatives
      .filter((c) => matches(f, c.product, c.platform))
      .map((c) => ({
        key: c.key,
        label: c.name,
        sub: `${PLATFORM_LABEL[c.platform]} · ${c.product} · ${c.type} · ${c.adsCount} anúncio(s)`,
        platform: c.platform,
        product: c.product,
        thumbnailUrl: c.thumbnailUrl,
        windows: c.windows,
      }))
  } else if (!filtered) {
    if (dim === 'product') rows = s.byProduct.map((p) => ({ key: p.product, label: p.product, windows: p.windows }))
    if (dim === 'platform')
      rows = s.byPlatform.map((p) => ({ key: p.platform, label: PLATFORM_LABEL[p.platform], platform: p.platform, windows: p.windows }))
    if (dim === 'channel')
      rows = s.byChannel.map((c) => ({
        key: `${c.platform}:${c.channel}`,
        label: c.channel,
        sub: PLATFORM_LABEL[c.platform],
        platform: c.platform,
        windows: c.windows,
      }))
  } else {
    derived = true
    const groups = new Map<string, { row: TableRow; list: Windows[] }>()
    for (const a of s.ads as AdRow[]) {
      if (!matches(f, a.product, a.platform)) continue
      const key = dim === 'product' ? a.product : dim === 'platform' ? a.platform : `${a.platform}:${a.channel}`
      const g = groups.get(key) ?? {
        row: {
          key,
          label: dim === 'product' ? a.product : dim === 'platform' ? PLATFORM_LABEL[a.platform] : a.channel,
          sub: dim === 'channel' ? PLATFORM_LABEL[a.platform] : undefined,
          platform: a.platform,
          windows: {},
        },
        list: [],
      }
      g.list.push(a.windows)
      groups.set(key, g)
    }
    rows = [...groups.values()].map((g) => ({ ...g.row, windows: sumWindows(g.list) }))
  }
  return { rows, derived }
}

export function kpiWindows(s: AdsControlSnapshot, f: Filters): { windows: Windows; derived: boolean } {
  const filtered = f.product !== 'all' || f.platform !== 'all'
  if (!filtered) return { windows: s.totals, derived: false }
  if (f.platform === 'all') {
    const p = s.byProduct.find((x) => x.product === f.product)
    if (p) return { windows: p.windows, derived: false }
  }
  if (f.product === 'all') {
    const p = s.byPlatform.find((x) => x.platform === f.platform)
    if (p) return { windows: p.windows, derived: false }
  }
  return { windows: sumWindows(s.ads.filter((a) => matches(f, a.product, a.platform)).map((a) => a.windows)), derived: true }
}

export function missingConnectors(s: AdsControlSnapshot) {
  return s.connectors.filter((c) => c.status !== 'ok')
}
