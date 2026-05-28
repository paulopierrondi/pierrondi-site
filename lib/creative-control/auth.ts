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

export function faithschoolAdminToken() {
  return process.env.CONTROL_TOWER_FAITHSCHOOL_ADMIN_TOKEN ?? ''
}

export function faithschoolActionUrl() {
  return (
    process.env.FAITHSCHOOL_ACTION_URL ??
    'https://faithschool.app/api/admin/devotional/action'
  )
}
