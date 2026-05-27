import 'server-only'

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { AutomationControlSnapshot } from './types'

const FILE_NAME = 'latest-automation-control-snapshot.json'

function dataDir() {
  return process.env.AUTOMATION_CONTROL_DATA_DIR ?? path.join(tmpdir(), 'pierrondi-automation-control')
}

function snapshotPath() {
  return path.join(dataDir(), FILE_NAME)
}

export async function readAutomationSnapshot(): Promise<AutomationControlSnapshot | null> {
  try {
    const raw = await readFile(snapshotPath(), 'utf8')
    return JSON.parse(raw) as AutomationControlSnapshot
  } catch {
    return null
  }
}

export async function saveAutomationSnapshot(snapshot: AutomationControlSnapshot) {
  await mkdir(dataDir(), { recursive: true })
  await writeFile(snapshotPath(), `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  return snapshotPath()
}
