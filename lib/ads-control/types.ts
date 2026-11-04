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

export interface GaMetrics {
  sessions: number
  users: number
  newUsers: number
  engagedSessions: number
  keyEvents: number
  engagementRate: number | null
  keyEventRate: number | null
}

export interface GscMetrics {
  clicks: number
  impressions: number
  ctr: number | null
  position: number | null
}

export interface WebConnector {
  source: 'ga4' | 'gsc' | 'ahrefs'
  status: 'ok' | 'no_data' | 'error'
  properties: number
  message: string
}

export interface WebTrafficRow {
  product: string
  property: string
  propertyId: string
  windows: Partial<Record<WindowKey, GaMetrics>>
}

export interface WebChannelRow {
  product: string
  channel: string
  windows: { last7: GaMetrics; prev7: GaMetrics }
}

export interface WebSearchRow {
  product: string
  site: string
  windows: Partial<Record<WindowKey, GscMetrics>>
}

export interface WebQueryRow {
  product: string
  site: string
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface WebAuthorityRow {
  product: string
  domain: string
  domainRating: number
  ahrefsRank: number | null
}

export interface WebSection {
  connectors: WebConnector[]
  traffic: WebTrafficRow[]
  channels: WebChannelRow[]
  search: WebSearchRow[]
  topQueries: WebQueryRow[]
  /** Domain Rating by Ahrefs (endpoint gratuito); ausente em snapshots antigos. */
  authority?: WebAuthorityRow[]
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
  web?: WebSection
}
