export type AutomationControlStatus =
  | 'green'
  | 'yellow'
  | 'red'
  | 'unknown'

export interface AutomationControlSnapshot {
  schemaVersion: '1.0'
  collectedAt: string
  machine: {
    hostname: string
    user?: string
    platform?: string
  }
  railway: {
    linked: boolean
    project?: string
    environment?: string
    service?: string
    statusOutput?: string
  }
  summary: {
    overallStatus: AutomationControlStatus
    activeRecent: number
    failed: number
    blocked: number
    silentOrStale: number
    noEvidence: number
    manualOk: number
    logsTracked: number
    launchAgentsTracked: number
    codexAutomations: number
    openHandoffs: number
  }
  coders: CoderActivity[]
  llms: LlmRuntime[]
  automations: AutomationSignal[]
  decisions: ControlDecision[]
  reports: ControlReport[]
}

export interface CoderActivity {
  name: string
  active: number
  failed: number
  blocked: number
  silentOrStale: number
  noEvidence: number
  manualOk: number
  total: number
  recommendation: string
}

export interface LlmRuntime {
  name: string
  available: boolean
  cliPath?: string | null
  activeProcesses: number
  recentJobs: number
  lastSignal?: string | null
  status: AutomationControlStatus
}

export interface AutomationSignal {
  id: string
  surface: string
  status: string
  lastSeen?: string
  ageLabel?: string
  signal: string
  evidence?: string
  action: string
}

export interface ControlDecision {
  priority: 'P0' | 'P1' | 'P2'
  title: string
  type: 'act' | 'monitor' | 'ignore' | 'investigate'
  rationale: string
  nextAction: string
  evidence?: string
}

export interface ControlReport {
  name: string
  path: string
  generatedAt?: string
}
