import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const controlTowerPage = await readFile(
  new URL('../app/control_tower/page.tsx', import.meta.url),
  'utf8',
)
const planActionRoute = await readFile(
  new URL('../app/api/control-tower/plan-action/route.ts', import.meta.url),
  'utf8',
)
const devotionalActionRoute = await readFile(
  new URL('../app/api/control-tower/devotional-action/route.ts', import.meta.url),
  'utf8',
)
const planStorage = await readFile(
  new URL('../lib/control-tower/plan-storage.ts', import.meta.url),
  'utf8',
)

test('Control Tower view remains public, dynamic, and noindex', () => {
  assert.match(controlTowerPage, /runtime = 'nodejs'/)
  assert.match(controlTowerPage, /dynamic = 'force-dynamic'/)
  assert.match(controlTowerPage, /robots: \{ index: false, follow: false, nocache: true \}/)
  assert.match(controlTowerPage, /actionsEnabled/)
  assert.doesNotMatch(controlTowerPage, /LockedControlTower/)
  assert.doesNotMatch(controlTowerPage, /AUTOMATION_CONTROL_VIEW_TOKEN/)
  assert.doesNotMatch(controlTowerPage, /Token de acesso/)
})

test('Control Tower plan approval guardrails remain in place', () => {
  assert.match(planActionRoute, /verifySessionCookie/)
  assert.match(planActionRoute, /AUTOMATION_CONTROL_COOKIE/)
  assert.match(planActionRoute, /PLAN_ACTION_MAX_IDS/)
  assert.match(planActionRoute, /const RATE_LIMIT_MAX = PLAN_ACTION_MAX_IDS \* 2/)
  assert.match(planActionRoute, /planActionPayloadSchema\.safeParse/)
  assert.match(planActionRoute, /applyPlanAction/)
  assert.match(planStorage, /APPROVE_TTL_MS = 1000 \* 60 \* 60 \* 24/)
  assert.match(planStorage, /AUTOMATION_CONTROL_DATA_DIR/)
})

test('Control Tower devotional actions remain session-gated', () => {
  assert.match(devotionalActionRoute, /verifySessionCookie/)
  assert.match(devotionalActionRoute, /AUTOMATION_CONTROL_COOKIE/)
  assert.match(devotionalActionRoute, /RATE_LIMIT_MAX/)
  assert.match(devotionalActionRoute, /mintMagicTokens/)
})
