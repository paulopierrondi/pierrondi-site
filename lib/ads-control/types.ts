export type Platform = 'google_ads' | 'apple_ads' | 'tiktok_ads' | 'meta_ads'
export type WindowKey = 'yesterday' | 'last7' | 'prev7' | 'last30'

export interface Metrics {
  spend: number
  impressions: number
  clicks: number
  installs: number
  conversions: number
  conversionValue: number
  ctr: number | null
  cpc: number | null
  cpm: number | null
  cpa: number | null
  roas: number | null
  cvr: number | null
}

export type Windows = Partial<Record<WindowKey, Metrics>>

export interface ConnectorStatus {
  platform: Platform
  status: 'ok' | 'missing_credentials' | 'error' | 'no_data'
  accounts: number
  rows: number
  message: string
  missingEnv: string[]
  lastSuccessAt: string | null
}

export interface AdRow {
  id: string
  platform: Platform
  product: string
  channel: string
  campaign: string
  adGroup: string
  ad: string
  creative: { id: string; name: string; type: string; thumbnailUrl: string | null }
  status: string
  windows: Windows
}

export interface CreativeRow {
  key: string
  platform: Platform
  product: string
  name: string
  type: string
  thumbnailUrl: string | null
  adsCount: number
  windows: Windows
}

export interface Recommendation {
  id: string
  type: 'fix' | 'opportunity'
  severity: 'critical' | 'high' | 'medium' | 'low'
  kind: 'waste' | 'fatigue' | 'scale' | 'tracking' | 'landing' | 'budget_shift' | 'coverage' | 'data'
  product: string
  platform: Platform | 'all'
  entityLevel: 'product' | 'platform' | 'channel' | 'campaign' | 'ad' | 'creative'
  entityName: string
  title: string
  evidence: string
  action: string
  expectedImpact: string
  requiresApproval: true
}

export interface DailyRow {
  date: string
  platform: Platform
  product: string
  spend: number
  conversions: number
  clicks: number
  impressions: number
  conversionValue: number
}

export interface AdsControlSnapshot {
  schemaVersion: 1
  collectedAt: string
  timezone: 'America/Sao_Paulo'
  reportingCurrency: 'BRL'
  fx: { USD_BRL: number | null; source: string; date: string | null }
  windows: Record<WindowKey, { start: string; end: string }>
  connectors: ConnectorStatus[]
  totals: Windows
  daily: DailyRow[]
  byProduct: Array<{ product: string; windows: Windows }>
  byPlatform: Array<{ platform: Platform; windows: Windows }>
  byChannel: Array<{ platform: Platform; channel: string; windows: Windows }>
  ads: AdRow[]
  creatives: CreativeRow[]
  recommendations: Recommendation[]
}
