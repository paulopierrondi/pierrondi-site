import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

import {
  AUTOMATION_CONTROL_COOKIE,
  verifySessionCookie,
} from '@/lib/automation-control/auth'
import {
  faithschoolMagicBaseUrl,
  faithschoolMagicSecret,
  hashSession,
  mintMagicTokens,
} from '@/lib/creative-control/auth'
import { appendDevotionalAudit } from '@/lib/creative-control/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Private, session-gated human review endpoint. Keep abuse protection, but
// allow reviewing a full pending snapshot without tripping after a few clicks.
const MAX_BULK_DEVOTIONAL_ACTION_IDS = 250
const RATE_LIMIT_MAX = MAX_BULK_DEVOTIONAL_ACTION_IDS * 2
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

const ActionPayloadSchema = z.object({
  action: z.enum(['approve', 'reject']),
  docIds: z.array(z.string().min(1).max(120)).min(1).max(MAX_BULK_DEVOTIONAL_ACTION_IDS),
})

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

  if (!faithschoolMagicSecret()) {
    return NextResponse.json(
      { ok: false, error: 'magic_secret_missing' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    )
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

  if (!checkRateLimit(sessionHash, docIds.length)) {
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

  let tokens: ReturnType<typeof mintMagicTokens>
  try {
    tokens = mintMagicTokens(action, docIds)
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'mint_failed' },
      { status: 503 },
    )
  }

  const baseUrl = faithschoolMagicBaseUrl()
  const results = await Promise.all(tokens.map(async ({ docId, token }) => {
    try {
      const upstream = await fetch(
        `${baseUrl}?token=${encodeURIComponent(token)}`,
        {
          method: 'GET',
          cache: 'no-store',
          signal: AbortSignal.timeout(15_000),
        },
      )
      return { docId, status: upstream.status, ok: upstream.ok }
    } catch {
      return { docId, status: 599, ok: false }
    }
  }))

  const overallOk = results.every((r) => r.ok)

  await appendDevotionalAudit({
    sessionHash,
    action,
    docIds,
    upstreamStatus: overallOk ? 200 : 502,
    upstreamOk: overallOk,
  })

  if (!overallOk) {
    return NextResponse.json(
      {
        ok: false,
        error: 'upstream_failed',
        results,
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    action,
    updated: docIds.length,
    results,
  })
}
