export type ProjectStatus = 'lead' | 'active' | 'paused' | 'completed' | 'cancelled'
export type ActivityStatus = 'pending' | 'in_progress' | 'done' | 'blocked'
export type ContractStatus = 'draft' | 'sent' | 'signed' | 'cancelled'
export type PaymentStatus = 'pending' | 'partial' | 'received' | 'overdue'
export type Currency = 'BRL' | 'USD' | 'EUR'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  clientId: string
  title: string
  description: string
  status: ProjectStatus
  startDate: string
  endDate: string
  value: number
  currency: Currency
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Contract {
  id: string
  projectId: string
  title: string
  value: number
  currency: Currency
  status: ContractStatus
  signedDate: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  projectId: string
  description: string
  amount: number
  currency: Currency
  status: PaymentStatus
  dueDate: string
  receivedDate: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  projectId: string
  title: string
  description: string
  status: ActivityStatus
  dueDate: string
  completedAt: string
  createdAt: string
  updatedAt: string
}

export interface Discussion {
  id: string
  projectId: string
  content: string
  direction: 'inbound' | 'outbound' | 'internal'
  channel: string
  createdAt: string
}

export interface CRMStore {
  clients: Client[]
  projects: Project[]
  contracts: Contract[]
  payments: Payment[]
  activities: Activity[]
  discussions: Discussion[]
}

export interface DashboardStats {
  totalClients: number
  activeProjects: number
  totalReceived: number
  pendingPayments: number
  openActivities: number
  completedProjects: number
}
