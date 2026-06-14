import { NextResponse } from 'next/server'

import {
  AUTOMATION_CONTROL_COOKIE,
  createSessionCookieValue,
  isValidViewToken,
} from '@/lib/automation-control/auth'
import { createRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const sessionRateLimit = createRateLimit(10, 15 * 60 * 1000)

const ALLOWED_NEXT_PATHS = new Set(['/automacoes', '/control_tower'])

function safeNextPath(value: FormDataEntryValue | string | null) {
  if (typeof value !== 'string') return '/automacoes'
  return ALLOWED_NEXT_PATHS.has(value) ? value : '/automacoes'
}

function redirectToPrivatePane(request: Request, status?: 'invalid', nextPath = '/automacoes') {
  const requestUrl = new URL(request.url)
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const forwardedHost = request.headers.get('x-forwarded-host')
  const proto = forwardedProto ?? requestUrl.protocol.replace(':', '')
  const host = forwardedHost ?? request.headers.get('host') ?? requestUrl.host
  const url = new URL(safeNextPath(nextPath), `${proto}://${host}`)
  if (status) url.searchParams.set('auth', status)
  return NextResponse.redirect(url, 303)
}

function setSessionCookie(response: NextResponse) {
  response.cookies.set(AUTOMATION_CONTROL_COOKIE, createSessionCookieValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function GET(request: Request) {
  const rateLimit = sessionRateLimit.check(getClientIp(request))
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'rate_limited', retryAfter: rateLimit.retryAfter }, { status: 429 })
  }

  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const nextPath = safeNextPath(url.searchParams.get('next'))
  if (!isValidViewToken(token)) return redirectToPrivatePane(request, 'invalid', nextPath)

  const response = redirectToPrivatePane(request, undefined, nextPath)
  setSessionCookie(response)
  return response
}

export async function POST(request: Request) {
  const rateLimit = sessionRateLimit.check(getClientIp(request))
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'rate_limited', retryAfter: rateLimit.retryAfter }, { status: 429 })
  }

  const formData = await request.formData()
  const token = formData.get('token')
  const nextPath = safeNextPath(formData.get('next'))
  if (!isValidViewToken(typeof token === 'string' ? token : null)) {
    return redirectToPrivatePane(request, 'invalid', nextPath)
  }

  const response = redirectToPrivatePane(request, undefined, nextPath)
  setSessionCookie(response)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(AUTOMATION_CONTROL_COOKIE)
  return response
}
