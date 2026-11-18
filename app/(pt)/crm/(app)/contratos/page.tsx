import { getContracts, getProjects, getClients } from '@/lib/crm/store'
import ContractsView from '@/app/crm/(app)/contratos/ContractsView'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function ContratosPage() {
  const contracts = getContracts()
  const projects = getProjects()
  const clients = getClients()
  return <ContractsView initialContracts={contracts} projects={projects} clients={clients} />
}
