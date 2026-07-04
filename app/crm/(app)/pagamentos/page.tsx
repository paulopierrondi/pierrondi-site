import { getPayments, getProjects, getClients } from '@/lib/crm/store'
import PaymentsView from './PaymentsView'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function PagamentosPage() {
  const payments = getPayments()
  const projects = getProjects()
  const clients = getClients()
  return <PaymentsView initialPayments={payments} projects={projects} clients={clients} />
}
