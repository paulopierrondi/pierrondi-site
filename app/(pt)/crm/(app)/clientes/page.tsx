import { getClients } from '@/lib/crm/store'
import ClientsView from '@/app/crm/(app)/clientes/ClientsView'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function ClientesPage() {
  const clients = getClients()
  return <ClientsView initialClients={clients} />
}
