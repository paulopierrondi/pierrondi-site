import { getActivities, getProjects, getClients } from '@/lib/crm/store'
import ActivitiesView from './ActivitiesView'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function AtividadesPage() {
  const activities = getActivities()
  const projects = getProjects()
  const clients = getClients()
  return <ActivitiesView initialActivities={activities} projects={projects} clients={clients} />
}
