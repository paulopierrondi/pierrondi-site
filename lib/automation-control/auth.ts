import 'server-only'

import crypto from 'node:crypto'

export const AUTOMATION_CONTROL_COOKIE = 'paulo_automation_control'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

function viewToken() {
  return process.env.AUTOMATION_CONTROL_VIEW_TOKEN ?? ''
}

export function ingestToken() {
  return process.env.AUTOMATION_CONTROL_INGEST_TOKEN ?? viewToken()
}

function safeEqual(left: string, right: string) {
  if (!left || !right) return false
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  if (leftBuffer.length !== rightBuffer.length) return false
  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

export function isValidViewToken(candidate: string | null | undefined) {
  return safeEqual(candidate ?? '', viewToken())
}

export function isValidIngestBearer(header: string | null) {
  const match = /^Bearer\s+(.+)$/i.exec(header ?? '')
  return safeEqual(match?.[1] ?? '', ingestToken())
}

function sign(value: string) {
  return crypto.createHmac('sha256', viewToken()).update(value).digest('base64url')
}

export function createSessionCookieValue() {
  const issuedAt = Date.now().toString()
  return `${issuedAt}.${sign(issuedAt)}`
}

export function verifySessionCookie(value: string | undefined) {
  if (!value || !viewToken()) return false
  const [issuedAt, signature] = value.split('.')
  if (!issuedAt || !signature) return false
  const issuedAtMs = Number(issuedAt)
  if (!Number.isFinite(issuedAtMs)) return false
  if (Date.now() - issuedAtMs > SESSION_TTL_MS) return false
  return safeEqual(signature, sign(issuedAt))
}
