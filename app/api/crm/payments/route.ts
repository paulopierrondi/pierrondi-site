import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionCookie, CRM_SESSION_COOKIE } from '@/lib/crm/auth'
import { getPayments, createPayment } from '@/lib/crm/store'
import type { PaymentStatus, Currency } from '@/lib/crm/types'

export const runtime = 'nodejs'

async function auth() {
  const cookieStore = await cookies()
  return verifySessionCookie(cookieStore.get(CRM_SESSION_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const projectId = req.nextUrl.searchParams.get('projectId') ?? undefined
  return NextResponse.json(getPayments(projectId))
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const payment = createPayment({
    projectId: body.projectId ?? '',
    description: body.description ?? '',
    amount: Number(body.amount) || 0,
    currency: (body.currency as Currency) ?? 'BRL',
    status: (body.status as PaymentStatus) ?? 'pending',
    dueDate: body.dueDate ?? '',
    receivedDate: body.receivedDate ?? '',
    notes: body.notes ?? '',
  })
  return NextResponse.json(payment, { status: 201 })
}
