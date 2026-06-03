import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import {
  AUTOMATION_CONTROL_COOKIE,
  verifySessionCookie,
} from '@/lib/automation-control/auth'
import { hashSession } from '@/lib/creative-control/auth'
import {
  PLAN_ACTION_MAX_IDS,
  planActionPayloadSchema,
} from '@/lib/control-tower/plan-types'
import {
  applyPlanAction,
  appendPlanAudit,
} from '@/lib/control-tower/plan-storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Private, session-gated human review endpoint. The queue can legitimately
// have hundreds of low/medium-risk plans after a backlog run, so the limiter
// protects abuse without blocking a human-approved snapshot drain.
const RATE_LIMIT_MAX = PLAN_ACTION_MAX_IDS * 2
const RATE_LIMIT_WINDOW_MS = 60_000

const bucket = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(key: string, cost = 1) {
  const now = Date.now()
  const slot = bucket.get(key)
  if (!slot || slot.resetAt < now) {
    bucket.set(key, { count: cost, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (slot.count + cost > RATE_LIMIT_MAX) return false
  slot.count += cost
  return true
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(AUTOMATION_CONTROL_COOKIE)?.value
  if (!verifySessionCookie(sessionValue)) {
    return NextResponse.json(
      { ok: false, error: 'unauthorized' },
      { status: 401 },
    )
  }

  const sessionHash = hashSession(sessionValue ?? '')

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    )
  }

  const parsed = planActionPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_payload',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const { action, planIds } = parsed.data

  if (!checkRateLimit(sessionHash, planIds.length)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'rate_limited',
        retryAfterSeconds: RATE_LIMIT_WINDOW_MS / 1000,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) },
      },
    )
  }

  await applyPlanAction(planIds, action, sessionHash)
  await appendPlanAudit(
    JSON.stringify({ sessionHash, action, planIds, updated: planIds.length }),
  )

  return NextResponse.json({
    ok: true,
    action,
    updated: planIds.length,
    planIds,
  })
}
