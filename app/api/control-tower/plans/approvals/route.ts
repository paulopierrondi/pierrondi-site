import { NextResponse } from 'next/server'

import { isValidIngestBearer } from '@/lib/automation-control/auth'
import { readPlanApprovals } from '@/lib/control-tower/plan-storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isValidIngestBearer(request.headers.get('authorization'))) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const approvals = await readPlanApprovals()
  return NextResponse.json({ ok: true, approvals })
}
