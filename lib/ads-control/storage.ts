import 'server-only'

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { AdsControlSnapshot } from './types'

const FILE_NAME = 'latest-ads-control-snapshot.json'

function dataDir() {
  return process.env.AUTOMATION_CONTROL_DATA_DIR ?? path.join(tmpdir(), 'pierrondi-automation-control')
}

export async function readAdsSnapshot(): Promise<AdsControlSnapshot | null> {
  try {
    return JSON.parse(await readFile(path.join(dataDir(), FILE_NAME), 'utf8')) as AdsControlSnapshot
  } catch {
    return null
  }
}

export async function saveAdsSnapshot(snapshot: AdsControlSnapshot) {
  await mkdir(dataDir(), { recursive: true })
  const file = path.join(dataDir(), FILE_NAME)
  await writeFile(file, `${JSON.stringify(snapshot)}\n`, 'utf8')
  return file
}
