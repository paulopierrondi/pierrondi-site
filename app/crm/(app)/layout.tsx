import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import CRMShell from './CRMShell'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Studio CRM',
  robots: { index: false, follow: false },
}

export default async function CRMAppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get(CRM_SESSION_COOKIE)?.value
  if (!verifySessionCookie(session)) {
    redirect('/crm/login')
  }
  return <CRMShell>{children}</CRMShell>
}
