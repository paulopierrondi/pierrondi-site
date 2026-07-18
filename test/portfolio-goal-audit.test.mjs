import assert from 'node:assert/strict'
import test from 'node:test'
import { buildGoalAudit } from '../scripts/portfolio-goal-audit.mjs'

function check(product, ok, id = `${product}-check`) {
  return { id, product, area: 'test', ok, url: `https://example.test/${id}`, actual: { status: ok ? 200 : 404 } }
}

test('portfolio goal audit stays open when production routes or AgenticosCore analytics are blocked', () => {
  const audit = buildGoalAudit({
    generatedAt: '2026-07-11T01:52:00.000Z',
    seoGeo: {
      checks: [
        check('pierrondi.dev', false, 'pierrondi-www--ai-search'),
        check('AgenticosCore', true),
        check('CantuStudio', false, 'cantu-stale-how-great-satb-redirect'),
        check('FaithSchool', true),
      ],
    },
    agenticoscoreAnalytics: {
      ga4: { status: 'blocked_ga4_api_error' },
      plausible: { status: 'blocked_no_plausible_token' },
      decision: { restored: false, primaryCandidate: null, blocker: 'permission missing' },
    },
    accessSnapshot: {
      operationsPulse: {
        metrics: {
          providerLogFailures: 0,
          actionableErrors: 2,
        },
      },
    },
  })

  assert.equal(audit.complete, false)
  assert.equal(audit.summary.failed, 4)
  assert.ok(audit.failures.some((failure) => failure.id === 'pierrondi_seo_geo_routes'))
  assert.ok(audit.failures.some((failure) => failure.id === 'cantustudio_seo_geo_routes'))
  assert.ok(audit.failures.some((failure) => failure.id === 'agenticoscore_analytics_restored'))
  assert.ok(audit.failures.some((failure) => failure.id === 'access_snapshot_no_actionable_errors'))
  assert.match(
    audit.failures.find((failure) => failure.id === 'agenticoscore_analytics_restored').nextAction,
    /546092574/,
  )
})

test('portfolio goal audit completes only when every SEO/GEO, analytics and snapshot gate is green', () => {
  const audit = buildGoalAudit({
    generatedAt: '2026-07-11T01:52:00.000Z',
    seoGeo: {
      checks: [
        check('pierrondi.dev', true),
        check('AgenticosCore', true),
        check('CantuStudio', true),
        check('FaithSchool', true),
      ],
    },
    agenticoscoreAnalytics: {
      ga4: { status: 'ok' },
      plausible: { status: 'blocked_no_plausible_token' },
      decision: { restored: true, primaryCandidate: 'ga4', blocker: null },
    },
    accessSnapshot: {
      operationsPulse: {
        metrics: {
          providerLogFailures: 0,
          actionableErrors: 0,
        },
      },
    },
  })

  assert.equal(audit.complete, true)
  assert.equal(audit.summary.failed, 0)
})
