import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { getProjects, createProject } from '@/lib/crm/store'
import type { ProjectStatus, Currency } from '@/lib/crm/types'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const clientId = req.nextUrl.searchParams.get('clientId') ?? undefined
  return NextResponse.json(getProjects(clientId))
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const project = createProject({
    clientId: body.clientId ?? '',
    title: body.title ?? '',
    description: body.description ?? '',
    status: (body.status as ProjectStatus) ?? 'lead',
    startDate: body.startDate ?? '',
    endDate: body.endDate ?? '',
    value: Number(body.value) || 0,
    currency: (body.currency as Currency) ?? 'BRL',
    notes: body.notes ?? '',
  })
  return NextResponse.json(project, { status: 201 })
}
