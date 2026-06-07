import { z } from 'zod'

const tierSchema = z.enum(['A', 'B', 'C', 'D'])

const breakdownSchema = z.object({
  color: z.number().min(0).max(100),
  proportion: z.number().min(0).max(100),
  fit: z.number().min(0).max(100),
  coherence: z.number().min(0).max(100),
  accessories: z.number().min(0).max(100),
  details: z.number().min(0).max(100),
})

const lookSummarySchema = z.object({
  id: z.string().min(1).max(120),
  createdAt: z.string().min(1).max(80),
  occasion: z.string().max(160).nullable().optional(),
  styleGoal: z.string().max(160).nullable().optional(),
  totalScore: z.number().min(0).max(100),
  tier: tierSchema,
  breakdown: breakdownSchema,
  itemCount: z.number().int().nonnegative(),
  thumbnailPath: z.string().max(500).nullable().optional(),
})

const looksStatsSchema = z.object({
  total: z.number().int().nonnegative(),
  totalScored: z.number().int().nonnegative(),
  avgScore: z.number().min(0).max(100),
  p95Score: z.number().min(0).max(100),
  byTier: z.object({
    A: z.number().int().nonnegative(),
    B: z.number().int().nonnegative(),
    C: z.number().int().nonnegative(),
    D: z.number().int().nonnegative(),
  }),
  byOccasion: z
    .array(
      z.object({
        occasion: z.string().min(1).max(80),
        count: z.number().int().nonnegative(),
      }),
    )
    .max(16),
  lastCreatedAt: z.string().max(80).optional(),
  sourceMode: z.enum(['looks', 'closet_items_fallback', 'empty']).optional(),
  sourceCounts: z
    .object({
      closetItems: z.number().int().nonnegative(),
      savedLooks: z.number().int().nonnegative(),
      lookReviews: z.number().int().nonnegative(),
    })
    .optional(),
})

const devotionalSourceSchema = z.enum(['youversion-votd', 'manual', 'other'])

const devotionalPendingSchema = z.object({
  docId: z.string().min(1).max(120),
  date: z.string().min(1).max(40),
  language: z.string().min(1).max(20),
  bibleTranslation: z.string().max(20).optional(),
  scriptureRef: z.string().min(1).max(160),
  title: z.string().max(200).optional(),
  snippet: z.string().max(400),
  source: devotionalSourceSchema,
  reviewStatus: z.enum(['approved', 'pending', 'rejected']).optional(),
  generatedAt: z.string().max(80).optional(),
  ageLabel: z.string().max(40).optional(),
})

const devotionalPublishedSchema = devotionalPendingSchema.extend({
  reviewStatus: z.literal('approved').optional(),
})

const devotionalsStatsSchema = z.object({
  totalPending: z.number().int().nonnegative(),
  totalPublished: z.number().int().nonnegative().optional(),
  byLanguage: z.record(z.string().min(1).max(20), z.number().int().nonnegative()),
  byPublishedLanguage: z
    .record(z.string().min(1).max(20), z.number().int().nonnegative())
    .optional(),
  oldestPendingAt: z.string().max(80).optional(),
  lastGeneratedAt: z.string().max(80).optional(),
  lastPublishedAt: z.string().max(80).optional(),
})

export const creativeControlSnapshotSchema = z.object({
  schemaVersion: z.literal('1.0'),
  collectedAt: z.string().datetime(),
  machine: z.object({
    hostname: z.string().min(1).max(255),
    user: z.string().max(255).optional(),
  }),
  looks: z.object({
    stats: looksStatsSchema,
    recent: z.array(lookSummarySchema).max(48),
  }),
  devotionals: z.object({
    stats: devotionalsStatsSchema,
    pending: z.array(devotionalPendingSchema).max(96),
    published: z.array(devotionalPublishedSchema).max(96).optional(),
  }),
})

export type CreativeControlSnapshotInput = z.infer<typeof creativeControlSnapshotSchema>
