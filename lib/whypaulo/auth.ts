import 'server-only'

import crypto from 'node:crypto'

export const WHYPAULO_COOKIE = 'paulo_whypaulo_access'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 5
const FALLBACK_ACCESS_TOKEN_SHA256 =
  'f6d0138bd4b2df5cab692159d7b74e3a2650922a61be4c8ae5bc4a7cec4f7e1a'

function accessToken() {
  return process.env.WHYPAULO_ACCESS_TOKEN ?? ''
}

function accessTokenHash() {
  return process.env.WHYPAULO_ACCESS_TOKEN_SHA256 ?? FALLBACK_ACCESS_TOKEN_SHA256
}

function safeEqual(left: string, right: string) {
  if (!left || !right) return false
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  if (leftBuffer.length !== rightBuffer.length) return false
  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

export function isValidWhyPauloToken(candidate: string | null | undefined) {
  const token = accessToken()
  if (token) return safeEqual(candidate ?? '', token)
  const hashedCandidate = crypto.createHash('sha256').update(candidate ?? '').digest('hex')
  return safeEqual(hashedCandidate, accessTokenHash())
}

function sign(value: string) {
  return crypto.createHmac('sha256', accessToken() || accessTokenHash()).update(value).digest('base64url')
}

export function createWhyPauloSessionCookie() {
  const issuedAt = Date.now().toString()
  return `${issuedAt}.${sign(issuedAt)}`
}

export function verifyWhyPauloSessionCookie(value: string | undefined) {
  if (!value || (!accessToken() && !accessTokenHash())) return false
  const [issuedAt, signature] = value.split('.')
  if (!issuedAt || !signature) return false
  const issuedAtMs = Number(issuedAt)
  if (!Number.isFinite(issuedAtMs)) return false
  if (Date.now() - issuedAtMs > SESSION_TTL_MS) return false
  return safeEqual(signature, sign(issuedAt))
}
