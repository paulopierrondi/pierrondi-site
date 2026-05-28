import 'server-only'

import crypto from 'node:crypto'

function ingestToken() {
  return (
    process.env.CREATIVE_CONTROL_INGEST_TOKEN ??
    process.env.AUTOMATION_CONTROL_INGEST_TOKEN ??
    process.env.AUTOMATION_CONTROL_VIEW_TOKEN ??
    ''
  )
}

function safeEqual(left: string, right: string) {
  if (!left || !right) return false
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  if (leftBuffer.length !== rightBuffer.length) return false
  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

export function isValidCreativeIngestBearer(header: string | null) {
  const match = /^Bearer\s+(.+)$/i.exec(header ?? '')
  return safeEqual(match?.[1] ?? '', ingestToken())
}

export function hashSession(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 12)
}

export function faithschoolMagicSecret() {
  return process.env.FAITHSCHOOL_MAGIC_LINK_SECRET ?? ''
}

export function faithschoolMagicBaseUrl() {
  return (
    process.env.FAITHSCHOOL_MAGIC_URL ??
    'https://faithschool.app/api/admin/devotional/magic'
  )
}

interface MagicPayload {
  docId: string
  action: 'approve' | 'reject'
  exp: number
}

function b64url(input: string) {
  return Buffer.from(input).toString('base64url')
}

function signMagicToken(docId: string, action: 'approve' | 'reject') {
  const secret = faithschoolMagicSecret()
  if (!secret || secret.length < 32) {
    throw new Error('magic_secret_missing_or_too_short')
  }
  const payload: MagicPayload = {
    docId,
    action,
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
  }
  const body = b64url(JSON.stringify(payload))
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function mintMagicTokens(action: 'approve' | 'reject', docIds: string[]) {
  return docIds.map((docId) => ({
    docId,
    token: signMagicToken(docId, action),
  }))
}
