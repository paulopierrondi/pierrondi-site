import { getDiscussions, getProjects, getClients } from '@/lib/crm/store'
import DiscussoesView from './DiscussoesView'

export const metadata = { title: 'Discussões | Studio CRM' }

export default async function DiscussoesPage() {
  const [discussions, projects, clients] = await Promise.all([
    Promise.resolve(getDiscussions()),
    Promise.resolve(getProjects()),
    Promise.resolve(getClients()),
  ])
  return <DiscussoesView initialDiscussions={discussions} projects={projects} clients={clients} />
}
