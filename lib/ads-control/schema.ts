import { z } from 'zod'

const platform = z.enum(['google_ads', 'apple_ads', 'tiktok_ads', 'meta_ads'])
const windowKeys = ['yesterday', 'last7', 'prev7', 'last30'] as const
const num = z.number().finite()
const nullableNum = num.nullable()
const str = (max = 300) => z.string().max(max)

const metrics = z.object({
  spend: num,
  impressions: num,
  clicks: num,
  installs: num,
  conversions: num,
  conversionValue: num,
  ctr: nullableNum,
  cpc: nullableNum,
  cpm: nullableNum,
  cpa: nullableNum,
  roas: nullableNum,
  cvr: nullableNum,
})

const windows = z.object({
  yesterday: metrics.optional(),
  last7: metrics.optional(),
  prev7: metrics.optional(),
  last30: metrics.optional(),
})

const range = z.object({ start: str(10), end: str(10) })

const connector = z.object({
  platform,
  status: z.enum(['ok', 'missing_credentials', 'error', 'no_data']),
  accounts: z.number().int().nonnegative(),
  rows: z.number().int().nonnegative(),
  message: str(500),
  missingEnv: z.array(str(120)).max(32),
  lastSuccessAt: str(80).nullable(),
})

const ad = z.object({
  id: str(200),
  platform,
  product: str(120),
  channel: str(120),
  campaign: str(300),
  adGroup: str(300),
  ad: str(300),
  creative: z.object({
    id: str(200),
    name: str(300),
    type: str(60),
    thumbnailUrl: str(1000).nullable(),
  }),
  status: str(80),
  windows,
})

const creative = z.object({
  key: str(200),
  platform,
  product: str(120),
  name: str(300),
  type: str(60),
  thumbnailUrl: str(1000).nullable(),
  adsCount: z.number().int().nonnegative(),
  windows,
})

const recommendation = z.object({
  id: str(200),
  type: z.enum(['fix', 'opportunity']),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  kind: z.enum(['waste', 'fatigue', 'scale', 'tracking', 'landing', 'budget_shift', 'coverage', 'data']),
  product: str(120),
  platform: z.union([platform, z.literal('all')]),
  entityLevel: z.enum(['product', 'platform', 'channel', 'campaign', 'ad', 'creative']),
  entityName: str(300),
  title: str(300),
  evidence: str(1000),
  action: str(1000),
  expectedImpact: str(500),
  requiresApproval: z.literal(true),
})

export const adsControlSnapshotSchema = z.object({
  schemaVersion: z.literal(1),
  collectedAt: z.string().datetime({ offset: true }),
  timezone: z.literal('America/Sao_Paulo'),
  reportingCurrency: z.literal('BRL'),
  fx: z.object({ USD_BRL: nullableNum, source: str(200), date: str(10).nullable() }),
  windows: z.object(
    Object.fromEntries(windowKeys.map((k) => [k, range])) as Record<(typeof windowKeys)[number], typeof range>,
  ),
  connectors: z.array(connector).max(16),
  totals: windows,
  daily: z
    .array(
      z.object({
        date: str(10),
        platform,
        product: str(120),
        spend: num,
        conversions: num,
        clicks: num,
        impressions: num,
        conversionValue: num,
      }),
    )
    .max(5000),
  byProduct: z.array(z.object({ product: str(120), windows })).max(100),
  byPlatform: z.array(z.object({ platform, windows })).max(8),
  byChannel: z.array(z.object({ platform, channel: str(120), windows })).max(200),
  ads: z.array(ad).max(500),
  creatives: z.array(creative).max(300),
  recommendations: z.array(recommendation).max(200),
})

export type AdsControlSnapshotInput = z.infer<typeof adsControlSnapshotSchema>
