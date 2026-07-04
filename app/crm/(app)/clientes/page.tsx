import { getClients } from '@/lib/crm/store'
import ClientsView from './ClientsView'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function ClientesPage() {
  const clients = getClients()
  return <ClientsView initialClients={clients} />
}
