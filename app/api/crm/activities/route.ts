import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { getActivities, createActivity } from '@/lib/crm/store'
import type { ActivityStatus } from '@/lib/crm/types'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const projectId = req.nextUrl.searchParams.get('projectId') ?? undefined
  return NextResponse.json(getActivities(projectId))
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const activity = createActivity({
    projectId: body.projectId ?? '',
    title: body.title ?? '',
    description: body.description ?? '',
    status: (body.status as ActivityStatus) ?? 'pending',
    dueDate: body.dueDate ?? '',
    completedAt: body.completedAt ?? '',
  })
  return NextResponse.json(activity, { status: 201 })
}
