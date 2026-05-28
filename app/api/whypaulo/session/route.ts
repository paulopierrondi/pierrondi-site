import { NextResponse } from 'next/server'

import {
  WHYPAULO_COOKIE,
  createWhyPauloSessionCookie,
  isValidWhyPauloToken,
} from '@/lib/whypaulo/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ALLOWED_NEXT_PATHS = new Set(['/whypaulo'])

function safeNextPath(value: FormDataEntryValue | string | null) {
  if (typeof value !== 'string') return '/whypaulo'
  return ALLOWED_NEXT_PATHS.has(value) ? value : '/whypaulo'
}

function redirectToBriefing(request: Request, status?: 'invalid', nextPath = '/whypaulo') {
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
  response.cookies.set(WHYPAULO_COOKIE, createWhyPauloSessionCookie(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 5,
  })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const nextPath = safeNextPath(url.searchParams.get('next'))
  if (!isValidWhyPauloToken(token)) return redirectToBriefing(request, 'invalid', nextPath)

  const response = redirectToBriefing(request, undefined, nextPath)
  setSessionCookie(response)
  return response
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const token = formData.get('token')
  const nextPath = safeNextPath(formData.get('next'))
  if (!isValidWhyPauloToken(typeof token === 'string' ? token : null)) {
    return redirectToBriefing(request, 'invalid', nextPath)
  }

  const response = redirectToBriefing(request, undefined, nextPath)
  setSessionCookie(response)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(WHYPAULO_COOKIE)
  return response
}
