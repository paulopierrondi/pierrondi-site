import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { getContracts, createContract } from '@/lib/crm/store'
import type { ContractStatus, Currency } from '@/lib/crm/types'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const projectId = req.nextUrl.searchParams.get('projectId') ?? undefined
  return NextResponse.json(getContracts(projectId))
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const contract = createContract({
    projectId: body.projectId ?? '',
    title: body.title ?? '',
    value: Number(body.value) || 0,
    currency: (body.currency as Currency) ?? 'BRL',
    status: (body.status as ContractStatus) ?? 'draft',
    signedDate: body.signedDate ?? '',
    notes: body.notes ?? '',
  })
  return NextResponse.json(contract, { status: 201 })
}
