import 'server-only'

import crypto from 'node:crypto'

function ingestToken() {
  return process.env.ADS_CONTROL_INGEST_TOKEN ?? process.env.AUTOMATION_CONTROL_INGEST_TOKEN ?? ''
}

function safeEqual(left: string, right: string) {
  if (!left || !right) return false
  const l = Buffer.from(left)
  const r = Buffer.from(right)
  if (l.length !== r.length) return false
  return crypto.timingSafeEqual(l, r)
}

export function isValidAdsIngestBearer(header: string | null) {
  const match = /^Bearer\s+(.+)$/i.exec(header ?? '')
  return safeEqual(match?.[1] ?? '', ingestToken())
}
