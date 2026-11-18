import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

import { adsControlSnapshotSchema } from '../lib/ads-control/schema.ts'

const fixture = () => JSON.parse(readFileSync(new URL('./fixtures/ads-control-snapshot.sample.json', import.meta.url), 'utf8'))

test('ads schema accepts the sample fixture', () => {
  const result = adsControlSnapshotSchema.safeParse(fixture())
  assert.equal(result.success, true, result.success ? '' : JSON.stringify(result.error.issues.slice(0, 3)))
  const f = fixture()
  assert.equal(new Set(f.connectors.map((c) => c.platform)).size, 4)
  assert.ok(f.connectors.some((c) => c.status === 'missing_credentials'))
})

test('ads schema rejects bad snapshots', () => {
  const bad = fixture()
  bad.schemaVersion = 2
  assert.equal(adsControlSnapshotSchema.safeParse(bad).success, false)
  const bad2 = fixture()
  bad2.recommendations[0].requiresApproval = false
  assert.equal(adsControlSnapshotSchema.safeParse(bad2).success, false)
  const bad3 = fixture()
  bad3.ads[0].platform = 'linkedin_ads'
  assert.equal(adsControlSnapshotSchema.safeParse(bad3).success, false)
  const bad4 = fixture()
  bad4.ads = Array.from({ length: 501 }, () => bad4.ads[0])
  assert.equal(adsControlSnapshotSchema.safeParse(bad4).success, false)
})

test('ads schema: web section is optional and validated', () => {
  const withWeb = fixture()
  assert.ok(withWeb.web, 'fixture carries a synthetic web section')
  assert.equal(adsControlSnapshotSchema.safeParse(withWeb).success, true)

  const without = fixture()
  delete without.web
  assert.equal(adsControlSnapshotSchema.safeParse(without).success, true)

  const badSource = fixture()
  badSource.web.connectors[0].source = 'adobe'
  assert.equal(adsControlSnapshotSchema.safeParse(badSource).success, false)

  const badChannels = fixture()
  badChannels.web.channels = Array.from({ length: 61 }, () => badChannels.web.channels[0])
  assert.equal(adsControlSnapshotSchema.safeParse(badChannels).success, false)

  const badQueries = fixture()
  badQueries.web.topQueries = Array.from({ length: 81 }, () => badQueries.web.topQueries[0])
  assert.equal(adsControlSnapshotSchema.safeParse(badQueries).success, false)

  const missingWindow = fixture()
  delete missingWindow.web.channels[0].windows.prev7
  assert.equal(adsControlSnapshotSchema.safeParse(missingWindow).success, false)

  const withAhrefs = fixture()
  withAhrefs.web.connectors.push({ source: 'ahrefs', status: 'ok', properties: 1, message: 'DR de 1 domínio(s)' })
  withAhrefs.web.authority = [{ product: 'Demo', domain: 'demo.test', domainRating: 12.5, ahrefsRank: null }]
  assert.equal(adsControlSnapshotSchema.safeParse(withAhrefs).success, true)

  const badAuthority = fixture()
  badAuthority.web.authority = [{ product: 'Demo', domain: 'demo.test', domainRating: 'alto' }]
  assert.equal(adsControlSnapshotSchema.safeParse(badAuthority).success, false)
})

test('ads schema: revenue section is optional and validated', () => {
  const withRevenue = fixture()
  assert.ok(withRevenue.revenue, 'fixture carries a synthetic revenue section')
  assert.equal(adsControlSnapshotSchema.safeParse(withRevenue).success, true)

  const without = fixture()
  delete without.revenue
  assert.equal(adsControlSnapshotSchema.safeParse(without).success, true)

  const badSource = fixture()
  badSource.revenue.connectors[0].source = 'paypal'
  assert.equal(adsControlSnapshotSchema.safeParse(badSource).success, false)

  const badNumber = fixture()
  badNumber.revenue.byProduct[0].mrr = '2400'
  assert.equal(adsControlSnapshotSchema.safeParse(badNumber).success, false)

  const badNullable = fixture()
  badNullable.revenue.unitEconomics[0].cac = 'alto'
  assert.equal(adsControlSnapshotSchema.safeParse(badNullable).success, false)

  const tooMany = fixture()
  tooMany.revenue.unitEconomics = Array.from({ length: 51 }, () => tooMany.revenue.unitEconomics[0])
  assert.equal(adsControlSnapshotSchema.safeParse(tooMany).success, false)
})

test('ads ingest auth rejects missing or wrong bearer and accepts the right one', () => {
  const script = `
    import { isValidAdsIngestBearer as ok } from './lib/ads-control/auth.ts'
    const r = [ok(null), ok('Bearer wrong-token'), ok('Basic abc'), ok('Bearer'), ok('Bearer test-ads-token')]
    console.log(JSON.stringify(r))
  `
  const env = { ...process.env, ADS_CONTROL_INGEST_TOKEN: 'test-ads-token' }
  delete env.AUTOMATION_CONTROL_INGEST_TOKEN
  const run = (e) =>
    spawnSync(process.execPath, ['--conditions=react-server', '--import', 'tsx', '--input-type=module', '-e', script], {
      cwd: process.cwd(),
      env: e,
      encoding: 'utf8',
    })
  const a = run(env)
  assert.equal(a.status, 0, a.stderr)
  assert.deepEqual(JSON.parse(a.stdout.trim()), [false, false, false, false, true])

  // Sem token configurado nada passa (nem bearer vazio).
  const none = { ...env }
  delete none.ADS_CONTROL_INGEST_TOKEN
  const b = run(none)
  assert.equal(b.status, 0, b.stderr)
  assert.deepEqual(JSON.parse(b.stdout.trim()), [false, false, false, false, false])

  // Fallback para AUTOMATION_CONTROL_INGEST_TOKEN.
  const fb = { ...none, AUTOMATION_CONTROL_INGEST_TOKEN: 'test-ads-token' }
  const c = run(fb)
  assert.deepEqual(JSON.parse(c.stdout.trim()).at(-1), true)
})
