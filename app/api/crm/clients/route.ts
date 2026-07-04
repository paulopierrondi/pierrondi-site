import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { getClients, createClient } from '@/lib/crm/store'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(getClients())
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const client = createClient({
    name: body.name ?? '',
    email: body.email ?? '',
    phone: body.phone ?? '',
    company: body.company ?? '',
    notes: body.notes ?? '',
  })
  return NextResponse.json(client, { status: 201 })
}
