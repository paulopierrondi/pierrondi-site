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
const planStorage = await readFile(
  new URL('../lib/control-tower/plan-storage.ts', import.meta.url),
  'utf8',
)

test('Control Tower remains private and dynamic after Itaú production changes', () => {
  assert.match(controlTowerPage, /runtime = 'nodejs'/)
  assert.match(controlTowerPage, /dynamic = 'force-dynamic'/)
  assert.match(controlTowerPage, /robots: \{ index: false, follow: false, nocache: true \}/)
  assert.match(controlTowerPage, /verifySessionCookie/)
  assert.match(controlTowerPage, /Control Tower privado/)
})

test('Control Tower plan approval guardrails remain in place', () => {
  assert.match(planActionRoute, /const RATE_LIMIT_MAX = 60/)
  assert.match(planActionRoute, /planActionPayloadSchema\.safeParse/)
  assert.match(planActionRoute, /applyPlanAction/)
  assert.match(planStorage, /APPROVE_TTL_MS = 1000 \* 60 \* 60 \* 24/)
  assert.match(planStorage, /AUTOMATION_CONTROL_DATA_DIR/)
})
