import 'server-only'

import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { CreativeControlSnapshot } from './types'

const FILE_NAME = 'latest-creative-control-snapshot.json'
const AUDIT_LOG = 'devotional-actions.log'

function dataDir() {
  return process.env.AUTOMATION_CONTROL_DATA_DIR ?? path.join(tmpdir(), 'pierrondi-automation-control')
}

function snapshotPath() {
  return path.join(dataDir(), FILE_NAME)
}

function auditLogPath() {
  return path.join(dataDir(), AUDIT_LOG)
}

export async function readCreativeSnapshot(): Promise<CreativeControlSnapshot | null> {
  try {
    const raw = await readFile(snapshotPath(), 'utf8')
    return JSON.parse(raw) as CreativeControlSnapshot
  } catch {
    return null
  }
}

export async function saveCreativeSnapshot(snapshot: CreativeControlSnapshot) {
  await mkdir(dataDir(), { recursive: true })
  await writeFile(snapshotPath(), `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  return snapshotPath()
}

export interface AuditEntry {
  sessionHash: string
  action: 'approve' | 'reject'
  docIds: string[]
  upstreamStatus: number
  upstreamOk: boolean
}

export async function appendDevotionalAudit(entry: AuditEntry) {
  await mkdir(dataDir(), { recursive: true })
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    ...entry,
  })
  await appendFile(auditLogPath(), `${line}\n`, 'utf8')
}
