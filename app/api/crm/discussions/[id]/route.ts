import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { readStore, writeStore } from '@/lib/crm/store'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const store = readStore()
  const before = store.discussions.length
  store.discussions = store.discussions.filter((d) => d.id !== id)
  if (store.discussions.length === before) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  writeStore(store)
  return NextResponse.json({ ok: true })
}
