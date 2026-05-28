import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

import {
  AUTOMATION_CONTROL_COOKIE,
  verifySessionCookie,
} from '@/lib/automation-control/auth'
import {
  faithschoolActionUrl,
  faithschoolAdminToken,
  hashSession,
} from '@/lib/creative-control/auth'
import { appendDevotionalAudit } from '@/lib/creative-control/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60_000

const bucket = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(key: string) {
  const now = Date.now()
  const slot = bucket.get(key)
  if (!slot || slot.resetAt < now) {
    bucket.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (slot.count >= RATE_LIMIT_MAX) return false
  slot.count += 1
  return true
}

const ActionPayloadSchema = z.object({
  action: z.enum(['approve', 'reject']),
  docIds: z.array(z.string().min(1).max(120)).min(1).max(50),
})

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(AUTOMATION_CONTROL_COOKIE)?.value
  if (!verifySessionCookie(sessionValue)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const sessionHash = hashSession(sessionValue ?? '')

  if (!checkRateLimit(sessionHash)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    )
  }

  const adminToken = faithschoolAdminToken()
  if (!adminToken) {
    return NextResponse.json(
      { ok: false, error: 'admin_token_missing' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = ActionPayloadSchema.safeParse(body)
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

  const { action, docIds } = parsed.data

  let upstreamStatus = 0
  let upstreamOk = false
  let upstreamPayload: unknown = null

  try {
    const upstream = await fetch(faithschoolActionUrl(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, docIds }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    })
    upstreamStatus = upstream.status
    upstreamOk = upstream.ok
    try {
      upstreamPayload = await upstream.json()
    } catch {
      upstreamPayload = null
    }
  } catch (err) {
    upstreamStatus = 599
    upstreamOk = false
    upstreamPayload = { error: err instanceof Error ? err.message : 'upstream_failed' }
  }

  await appendDevotionalAudit({
    sessionHash,
    action,
    docIds,
    upstreamStatus,
    upstreamOk,
  })

  if (!upstreamOk) {
    return NextResponse.json(
      {
        ok: false,
        error: 'upstream_failed',
        upstreamStatus,
        upstreamPayload,
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    action,
    updated: docIds.length,
    upstreamPayload,
  })
}
