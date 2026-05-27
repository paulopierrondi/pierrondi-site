import { NextResponse } from 'next/server'

import { isValidIngestBearer } from '@/lib/automation-control/auth'
import { automationControlSnapshotSchema } from '@/lib/automation-control/schema'
import { readAutomationSnapshot, saveAutomationSnapshot } from '@/lib/automation-control/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isValidIngestBearer(request.headers.get('authorization'))) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const snapshot = await readAutomationSnapshot()
  if (!snapshot) {
    return NextResponse.json({ ok: false, error: 'snapshot_not_found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, snapshot })
}

export async function POST(request: Request) {
  if (!isValidIngestBearer(request.headers.get('authorization'))) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = automationControlSnapshotSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_snapshot',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const path = await saveAutomationSnapshot(parsed.data)

  return NextResponse.json({
    ok: true,
    stored: true,
    path,
    collectedAt: parsed.data.collectedAt,
  })
}
