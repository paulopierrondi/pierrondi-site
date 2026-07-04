import { getDashboardStats, getProjects, getActivities, getPayments } from '@/lib/crm/store'
import { getClients } from '@/lib/crm/store'
import CRMDashboard from './CRMDashboard'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function CRMPage() {
  const stats = getDashboardStats()
  const projects = getProjects()
  const activities = getActivities()
  const payments = getPayments()
  const clients = getClients()

  return (
    <CRMDashboard
      stats={stats}
      projects={projects}
      activities={activities}
      payments={payments}
      clients={clients}
    />
  )
}
