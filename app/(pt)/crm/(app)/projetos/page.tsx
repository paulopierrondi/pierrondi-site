import { getProjects, getClients } from '@/lib/crm/store'
import ProjectsView from '@/app/crm/(app)/projetos/ProjectsView'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function ProjetosPage() {
  const projects = getProjects()
  const clients = getClients()
  return <ProjectsView initialProjects={projects} clients={clients} />
}
