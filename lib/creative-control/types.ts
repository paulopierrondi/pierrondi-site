export type LookScoreTier = 'A' | 'B' | 'C' | 'D'

export interface LookBreakdown {
  color: number
  proportion: number
  fit: number
  coherence: number
  accessories: number
  details: number
}

export interface LookSummary {
  id: string
  createdAt: string
  occasion?: string | null
  styleGoal?: string | null
  totalScore: number
  tier: LookScoreTier
  breakdown: LookBreakdown
  itemCount: number
  thumbnailPath?: string | null
}

export interface OccasionTally {
  occasion: string
  count: number
}

export type LooksSourceMode = 'looks' | 'closet_items_fallback' | 'empty'

export interface LooksSourceCounts {
  closetItems: number
  savedLooks: number
  lookReviews: number
}

export interface LooksStats {
  total: number
  totalScored: number
  avgScore: number
  p95Score: number
  byTier: Record<LookScoreTier, number>
  byOccasion: OccasionTally[]
  lastCreatedAt?: string
  sourceMode?: LooksSourceMode
  sourceCounts?: LooksSourceCounts
}

export type DevotionalSource = 'youversion-votd' | 'manual' | 'other'

export interface DevotionalPending {
  docId: string
  date: string
  language: string
  bibleTranslation?: string
  scriptureRef: string
  title?: string
  snippet: string
  source: DevotionalSource
  reviewStatus?: 'approved' | 'pending' | 'rejected'
  generatedAt?: string
  ageLabel?: string
}

export type DevotionalPublished = DevotionalPending & {
  reviewStatus?: 'approved'
}

export interface DevotionalsStats {
  totalPending: number
  totalPublished?: number
  byLanguage: Record<string, number>
  byPublishedLanguage?: Record<string, number>
  oldestPendingAt?: string
  lastGeneratedAt?: string
  lastPublishedAt?: string
}

export interface CreativeControlMachine {
  hostname: string
  user?: string
}

export interface CreativeControlSnapshot {
  schemaVersion: '1.0'
  collectedAt: string
  machine: CreativeControlMachine
  looks: {
    stats: LooksStats
    recent: LookSummary[]
  }
  devotionals: {
    stats: DevotionalsStats
    pending: DevotionalPending[]
    published?: DevotionalPublished[]
  }
}
