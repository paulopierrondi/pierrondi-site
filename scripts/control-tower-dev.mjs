import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { tmpdir } from 'node:os'

const port = process.env.CONTROL_TOWER_PORT ?? '3014'
const token = process.env.AUTOMATION_CONTROL_VIEW_TOKEN ?? 'dev-local-token'
const dataDir =
  process.env.AUTOMATION_CONTROL_DATA_DIR ??
  path.join(tmpdir(), 'pierrondi-control-tower-local')

const automationPath = path.join(dataDir, 'latest-automation-control-snapshot.json')
const creativePath = path.join(dataDir, 'latest-creative-control-snapshot.json')
const nextDevLockPath = path.join(process.cwd(), '.next/dev/lock')

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

async function writeJsonIfMissing(filePath, payload) {
  if (existsSync(filePath)) return
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

async function ensureLocalSnapshots() {
  await mkdir(dataDir, { recursive: true })
  const now = new Date().toISOString()
  const day = todayIsoDate()

  await writeJsonIfMissing(automationPath, {
    schemaVersion: '1.0',
    collectedAt: now,
    machine: { hostname: 'local-dev', user: 'codex', platform: process.platform },
    railway: {
      linked: false,
      project: 'pierrondi-site',
      environment: 'local-dev',
      service: 'control-tower',
    },
    summary: {
      overallStatus: 'yellow',
      activeRecent: 8,
      failed: 1,
      blocked: 1,
      silentOrStale: 2,
      noEvidence: 3,
      manualOk: 4,
      logsTracked: 18,
      launchAgentsTracked: 82,
      codexAutomations: 11,
      openHandoffs: 203,
    },
    coders: [],
    llms: [],
    automations: [
      {
        id: 'daily-product-council',
        surface: 'Agent Hub',
        status: 'ok',
        ageLabel: 'local snapshot',
        signal: 'mocked-local-dev',
        action: 'Use real collector for live operations.',
      },
      {
        id: 'handoff-sweeper',
        surface: 'Vault',
        status: 'stale',
        ageLabel: 'local snapshot',
        signal: 'mocked-local-dev',
        action: 'Classify owner and next action before production decisions.',
      },
    ],
    decisions: [],
    reports: [],
  })

  await writeJsonIfMissing(creativePath, {
    schemaVersion: '1.0',
    collectedAt: now,
    machine: { hostname: 'local-dev', user: 'codex' },
    looks: {
      stats: {
        total: 18,
        totalScored: 14,
        avgScore: 78,
        p95Score: 94,
        byTier: { A: 5, B: 7, C: 2, D: 0 },
        byOccasion: [
          { occasion: 'executivo', count: 6 },
          { occasion: 'casual', count: 4 },
        ],
        lastCreatedAt: now,
      },
      recent: [],
    },
    devotionals: {
      stats: {
        totalPending: 3,
        byLanguage: { 'pt-BR': 2, en: 1 },
        oldestPendingAt: now,
        lastGeneratedAt: now,
      },
      pending: [
        {
          docId: 'mock-pt-1',
          date: day,
          language: 'pt-BR',
          scriptureRef: 'Salmo 46:10',
          title: 'Aquietar antes de decidir',
          snippet:
            'Snapshot local para validar layout sem habilitar aprovacao real nem tocar credenciais.',
          source: 'youversion-votd',
          generatedAt: now,
          ageLabel: 'mock',
        },
        {
          docId: 'mock-pt-2',
          date: day,
          language: 'pt-BR',
          scriptureRef: 'Proverbios 16:3',
          title: 'Entregar o plano',
          snippet:
            'Use o coletor real somente quando precisar operar a fila viva do FaithSchool.',
          source: 'manual',
          generatedAt: now,
          ageLabel: 'mock',
        },
        {
          docId: 'mock-en-1',
          date: day,
          language: 'en',
          scriptureRef: 'James 1:5',
          title: 'Ask for wisdom',
          snippet:
            'This local snapshot keeps the portal usable without exposing secrets.',
          source: 'other',
          generatedAt: now,
          ageLabel: 'mock',
        },
      ],
    },
  })
}

async function activeNextDevLock() {
  try {
    const raw = await readFile(nextDevLockPath, 'utf8')
    const lock = JSON.parse(raw)
    if (!Number.isInteger(lock.pid)) return null
    process.kill(lock.pid, 0)
    return lock
  } catch {
    return null
  }
}

await ensureLocalSnapshots()

const activeLock = await activeNextDevLock()
if (activeLock) {
  const url = activeLock.appUrl ?? `http://localhost:${activeLock.port ?? port}`
  console.log(`Control Tower dev server already running: ${url}/control_tower`)
  console.log(`PID: ${activeLock.pid}`)
  console.log('Keeping the existing Next dev process instead of starting a duplicate.')
  process.exit(0)
}

console.log(`Control Tower local dev: http://localhost:${port}/control_tower`)
console.log(`Data dir: ${dataDir}`)
console.log('Token: configured through env or synthetic local fallback; value not printed.')

const child = spawn('npm', ['run', 'dev', '--', '--port', port], {
  env: {
    ...process.env,
    AUTOMATION_CONTROL_VIEW_TOKEN: token,
    AUTOMATION_CONTROL_DATA_DIR: dataDir,
  },
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 0)
})
