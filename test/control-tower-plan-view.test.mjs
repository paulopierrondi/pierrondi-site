import assert from 'node:assert/strict'
import test from 'node:test'

import { summarizePlanQueue } from '../lib/control-tower/plan-view.ts'

const now = Date.parse('2026-05-31T20:00:00.000Z')

test('approved durable records remove plans from the pending queue and counts', () => {
  const summary = summarizePlanQueue(
    [
      {
        planId: 'aura-audio-20260530-01',
        project: 'aura-audio',
        title: 'Remove unused imports',
        summary: 'Clean dead imports.',
        status: 'pending_approval',
        risk_class: 'low',
        scope_files: ['src/app/page.tsx'],
        created_at_utc: '2026-05-30T20:00:00.000Z',
      },
      {
        planId: 'creative-forge-20260530-01',
        project: 'creative-forge',
        title: 'Review path traversal',
        summary: 'Requires manual review.',
        status: 'pending_approval',
        risk_class: 'medium',
        scope_files: ['app/api/forge-video/route.ts'],
        created_at_utc: '2026-05-30T20:00:00.000Z',
      },
    ],
    {
      'aura-audio-20260530-01': {
        status: 'approved',
        action_at_utc: '2026-05-31T19:00:00.000Z',
        expires_at_utc: '2026-06-01T19:00:00.000Z',
      },
    },
    now,
  )

  assert.deepEqual(
    summary.visible.map((plan) => plan.planId),
    ['creative-forge-20260530-01'],
  )
  assert.equal(summary.pendingCount, 1)
  assert.equal(summary.lowRiskCount, 0)
  assert.equal(summary.mediumRiskCount, 1)
  assert.equal(summary.resolved.length, 1)
})

test('expired approvals become pending again so the operator can re-approve', () => {
  const summary = summarizePlanQueue(
    [
      {
        planId: 'aura-audio-20260530-01',
        project: 'aura-audio',
        title: 'Remove unused imports',
        summary: 'Clean dead imports.',
        status: 'pending_approval',
        risk_class: 'low',
        scope_files: ['src/app/page.tsx'],
        created_at_utc: '2026-05-30T20:00:00.000Z',
      },
    ],
    {
      'aura-audio-20260530-01': {
        status: 'approved',
        action_at_utc: '2026-05-30T19:00:00.000Z',
        expires_at_utc: '2026-05-31T19:00:00.000Z',
      },
    },
    now,
  )

  assert.equal(summary.pendingCount, 1)
  assert.equal(summary.lowRiskCount, 1)
  assert.equal(summary.resolved.length, 0)
})
