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

export interface LooksStats {
  total: number
  totalScored: number
  avgScore: number
  p95Score: number
  byTier: Record<LookScoreTier, number>
  byOccasion: OccasionTally[]
  lastCreatedAt?: string
}

export type DevotionalSource = 'youversion-votd' | 'manual' | 'other'

export interface DevotionalPending {
  docId: string
  date: string
  language: string
  scriptureRef: string
  title?: string
  snippet: string
  source: DevotionalSource
  generatedAt?: string
  ageLabel?: string
}

export interface DevotionalsStats {
  totalPending: number
  byLanguage: Record<string, number>
  oldestPendingAt?: string
  lastGeneratedAt?: string
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
  }
}
