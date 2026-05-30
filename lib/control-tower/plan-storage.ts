import 'server-only'

import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { PlanAction, PlanApprovals, PlansSnapshot } from './plan-types'

const SNAPSHOT_FILE = 'latest-plans-snapshot.json'
const APPROVALS_FILE = 'plan-approvals.json'
const AUDIT_LOG = 'plan-actions.log'

// IMPORTANT: AUTOMATION_CONTROL_DATA_DIR MUST point at a durable volume in
// production. The os.tmpdir() fallback exists only for local/dev parity with
// lib/automation-control/storage.ts; on an ephemeral filesystem the durable
// plan-approvals record would be lost on restart, which fails-closed (the
// down-sync poller treats a missing record as NOT approved), but production
// must still set AUTOMATION_CONTROL_DATA_DIR to a persistent path.
function dataDir() {
  return process.env.AUTOMATION_CONTROL_DATA_DIR ?? path.join(tmpdir(), 'pierrondi-automation-control')
}

function snapshotPath() {
  return path.join(dataDir(), SNAPSHOT_FILE)
}

function approvalsPath() {
  return path.join(dataDir(), APPROVALS_FILE)
}

function auditLogPath() {
  return path.join(dataDir(), AUDIT_LOG)
}

const APPROVE_TTL_MS = 1000 * 60 * 60 * 24 // approved gates expire 24h after action

export async function readPlansSnapshot(): Promise<PlansSnapshot | null> {
  try {
    const raw = await readFile(snapshotPath(), 'utf8')
    return JSON.parse(raw) as PlansSnapshot
  } catch {
    return null
  }
}

export async function writePlansSnapshot(snapshot: PlansSnapshot) {
  await mkdir(dataDir(), { recursive: true })
  await writeFile(snapshotPath(), `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  return snapshotPath()
}

export async function readPlanApprovals(): Promise<PlanApprovals> {
  try {
    const raw = await readFile(approvalsPath(), 'utf8')
    return JSON.parse(raw) as PlanApprovals
  } catch {
    return {}
  }
}

async function writePlanApprovals(approvals: PlanApprovals) {
  await mkdir(dataDir(), { recursive: true })
  await writeFile(approvalsPath(), `${JSON.stringify(approvals, null, 2)}\n`, 'utf8')
  return approvalsPath()
}

export async function applyPlanAction(
  planIds: string[],
  action: PlanAction,
  sessionHash: string,
): Promise<PlanApprovals> {
  const approvals = await readPlanApprovals()
  const nowMs = Date.now()
  const actionAt = new Date(nowMs).toISOString()
  const status = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'deferred'
  const expiresAt = action === 'approve' ? new Date(nowMs + APPROVE_TTL_MS).toISOString() : null

  for (const planId of planIds) {
    approvals[planId] = {
      status,
      action_at_utc: actionAt,
      sessionHash,
      expires_at_utc: expiresAt,
    }
  }

  await writePlanApprovals(approvals)
  return approvals
}

export async function appendPlanAudit(line: string) {
  await mkdir(dataDir(), { recursive: true })
  const entry = JSON.stringify({
    ts: new Date().toISOString(),
    line,
  })
  await appendFile(auditLogPath(), `${entry}\n`, 'utf8')
}
