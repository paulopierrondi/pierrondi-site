import 'server-only'

import crypto from 'node:crypto'

export const CRM_SESSION_COOKIE = 'paulo_crm_session'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30

function adminToken() {
  return process.env.CRM_ADMIN_TOKEN ?? ''
}

function safeEqual(left: string, right: string) {
  if (!left || !right) return false
  const lb = Buffer.from(left)
  const rb = Buffer.from(right)
  if (lb.length !== rb.length) return false
  return crypto.timingSafeEqual(lb, rb)
}

export function isValidAdminToken(candidate: string | null | undefined) {
  return safeEqual(candidate ?? '', adminToken())
}

function sign(value: string) {
  return crypto.createHmac('sha256', adminToken()).update(value).digest('base64url')
}

export function createSessionCookieValue() {
  const issuedAt = Date.now().toString()
  return `${issuedAt}.${sign(issuedAt)}`
}

export function verifySessionCookie(value: string | undefined): boolean {
  if (!value || !adminToken()) return false
  const [issuedAt, signature] = value.split('.')
  if (!issuedAt || !signature) return false
  const issuedAtMs = Number(issuedAt)
  if (!Number.isFinite(issuedAtMs)) return false
  if (Date.now() - issuedAtMs > SESSION_TTL_MS) return false
  return safeEqual(signature, sign(issuedAt))
}
