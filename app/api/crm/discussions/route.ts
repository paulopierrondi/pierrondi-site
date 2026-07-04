import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { getDiscussions, createDiscussion } from '@/lib/crm/store'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!await auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const projectId = req.nextUrl.searchParams.get('projectId') ?? undefined
  return NextResponse.json(getDiscussions(projectId))
}

export async function POST(req: NextRequest) {
  if (!await auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const discussion = createDiscussion({
    projectId: body.projectId ?? '',
    content: body.content ?? '',
    direction: body.direction ?? 'inbound',
    channel: body.channel ?? 'WhatsApp',
  })
  return NextResponse.json(discussion, { status: 201 })
}
