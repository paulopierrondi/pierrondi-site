#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, 'outputs')

function readArg(name, fallback = '') {
  const prefix = `--${name}=`
  const inline = process.argv.find((arg) => arg.startsWith(prefix))
  if (inline) return inline.slice(prefix.length)
  const index = process.argv.indexOf(`--${name}`)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`)
}

function timestampSlug(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

function redact(value) {
  return String(value || '').replace(/[A-Za-z0-9_+/=.-]{80,}/g, '[REDACTED]')
}

function parseJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function runJsonScript({ id, args, outPath }) {
  const result = spawnSync(process.execPath, args, {
    cwd: ROOT,
    env: process.env,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 16,
  })
  const stdout = result.stdout || ''
  const stderr = redact(result.stderr || '')
  const json = outPath && existsSync(outPath)
    ? parseJson(readFileSync(outPath, 'utf8'))
    : parseJson(stdout)

  return {
    id,
    command: `node ${args.join(' ')}`,
    status: result.status ?? 1,
    ok: result.status === 0,
    outPath,
    json,
    stderr: stderr.trim().slice(0, 1200),
  }
}

function productSummary(seoGeo, product) {
  const checks = seoGeo?.checks?.filter((check) => check.product === product) || []
  const failures = checks.filter((check) => !check.ok)
  return {
    total: checks.length,
    passed: checks.length - failures.length,
    failed: failures.length,
    failures: failures.map((check) => ({
      id: check.id,
      area: check.area,
      url: check.url,
      actual: check.actual,
    })),
  }
}

function requirement({ id, label, ok, evidence = {}, nextAction = '' }) {
  return { id, label, status: ok ? 'complete' : 'open', ok, evidence, nextAction }
}

export function buildGoalAudit({ generatedAt, seoGeo, agenticoscoreAnalytics, accessSnapshot, artifacts = {} }) {
  const pierrondi = productSummary(seoGeo, 'pierrondi.dev')
  const agenticoscore = productSummary(seoGeo, 'AgenticosCore')
  const cantustudio = productSummary(seoGeo, 'CantuStudio')
  const faithschool = productSummary(seoGeo, 'FaithSchool')
  const accessMetrics = accessSnapshot?.operationsPulse?.metrics || null
  const accessProviderHealthy = accessMetrics ? accessMetrics.providerLogFailures === 0 : false
  const accessNoActionableErrors = accessMetrics ? accessMetrics.actionableErrors === 0 : false
  const agenticoscoreAnalyticsOk = agenticoscoreAnalytics?.decision?.restored === true

  const requirements = [
    requirement({
      id: 'pierrondi_seo_geo_routes',
      label: 'Pierrondi.dev apex/www SEO/GEO routes and observed EN app redirect are clean',
      ok: pierrondi.total > 0 && pierrondi.failed === 0,
      evidence: pierrondi,
      nextAction: 'Deploy the prepared /ai-search canonical route and /en/apps/:slug redirects, then rerun this audit.',
    }),
    requirement({
      id: 'agenticoscore_seo_geo_routes',
      label: 'AgenticosCore canonical www/root/v2/answers/ai-search routes are clean',
      ok: agenticoscore.total > 0 && agenticoscore.failed === 0,
      evidence: agenticoscore,
      nextAction: 'Keep monitoring canonical redirects and click-id preservation.',
    }),
    requirement({
      id: 'cantustudio_seo_geo_routes',
      label: 'CantuStudio favicon, stale SATB redirect, sitemap and AI-crawler commercial links are clean',
      ok: cantustudio.total > 0 && cantustudio.failed === 0,
      evidence: cantustudio,
      nextAction: 'Deploy the prepared CantuStudio redirect/sitemap/internal-link fixes, then rerun this audit.',
    }),
    requirement({
      id: 'faithschool_seo_geo_routes',
      label: 'FaithSchool production SEO/GEO endpoints are clean',
      ok: faithschool.total > 0 && faithschool.failed === 0,
      evidence: faithschool,
      nextAction: 'Keep monitoring GSC and GA4 because endpoint health is currently clean.',
    }),
    requirement({
      id: 'agenticoscore_analytics_restored',
      label: 'AgenticosCore analytics source is restored through GA4 or Plausible',
      ok: agenticoscoreAnalyticsOk,
      evidence: {
        ga4: agenticoscoreAnalytics?.ga4?.status || 'missing',
        plausible: agenticoscoreAnalytics?.plausible?.status || 'missing',
        primaryCandidate: agenticoscoreAnalytics?.decision?.primaryCandidate || null,
        blocker: agenticoscoreAnalytics?.decision?.blocker || null,
      },
      nextAction: 'Verify GA4 Data API readback on the restored AgenticosCore property 546092574; GA4 is primary and Plausible remains optional.',
    }),
    requirement({
      id: 'access_snapshot_generated',
      label: 'Fresh provider-log access snapshot ran without provider failures',
      ok: accessProviderHealthy,
      evidence: accessMetrics || { status: 'missing' },
      nextAction: 'Run access:snapshot with provider CLIs available through the secure env wrapper.',
    }),
    requirement({
      id: 'access_snapshot_no_actionable_errors',
      label: 'Fresh access snapshot has no actionable public SEO/GEO errors',
      ok: accessNoActionableErrors,
      evidence: accessMetrics || { status: 'missing' },
      nextAction: 'Clear remaining production 404/linking issues and rerun the snapshot.',
    }),
  ]

  const failures = requirements.filter((item) => !item.ok)
  return {
    generatedAt,
    audit: 'portfolio-seo-geo-ga4-goal-audit',
    complete: failures.length === 0,
    summary: {
      total: requirements.length,
      passed: requirements.length - failures.length,
      failed: failures.length,
    },
    artifacts,
    requirements,
    failures: failures.map((item) => ({
      id: item.id,
      label: item.label,
      nextAction: item.nextAction,
      evidence: item.evidence,
    })),
  }
}

async function main() {
  const generatedAt = new Date().toISOString()
  const slug = timestampSlug(new Date(generatedAt))
  const since = readArg('since', '2h')
  const limit = readArg('limit', '300')
  const outPath = readArg('out', path.join(OUTPUT_DIR, `portfolio-goal-audit-${slug}.json`))
  const skipAccess = hasFlag('no-access')

  mkdirSync(path.dirname(outPath), { recursive: true })
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const seoOut = path.join(OUTPUT_DIR, `seo-geo-production-validator-goal-audit-${slug}.json`)
  const analyticsOut = path.join(OUTPUT_DIR, `agenticoscore-analytics-doctor-goal-audit-${slug}.json`)
  const accessOut = path.join(OUTPUT_DIR, `access-snapshot-goal-audit-${slug}.json`)

  const seoRun = runJsonScript({
    id: 'seo_geo_production_validator',
    args: ['scripts/seo-geo-production-validator.mjs', '--out', seoOut],
    outPath: seoOut,
  })
  const analyticsRun = runJsonScript({
    id: 'agenticoscore_analytics_doctor',
    args: ['scripts/agenticoscore-analytics-doctor.mjs', '--out', analyticsOut],
    outPath: analyticsOut,
  })
  const accessRun = skipAccess
    ? { id: 'access_snapshot', skipped: true, outPath: null, json: null }
    : runJsonScript({
      id: 'access_snapshot',
      args: ['scripts/access-snapshot.mjs', `--since=${since}`, `--limit=${limit}`, '--out', accessOut],
      outPath: accessOut,
    })

  const audit = buildGoalAudit({
    generatedAt,
    seoGeo: seoRun.json,
    agenticoscoreAnalytics: analyticsRun.json,
    accessSnapshot: accessRun.json,
    artifacts: {
      seoGeo: seoOut,
      agenticoscoreAnalytics: analyticsOut,
      accessSnapshot: skipAccess ? null : accessOut,
    },
  })

  audit.runs = [seoRun, analyticsRun, accessRun].map((run) => ({
    id: run.id,
    command: run.command || null,
    status: run.status ?? null,
    skipped: run.skipped || false,
    outPath: run.outPath || null,
    stderr: run.stderr || '',
  }))

  const output = `${JSON.stringify(audit, null, 2)}\n`
  writeFileSync(outPath, output, 'utf8')
  process.stdout.write(output)
  process.exitCode = audit.complete ? 0 : 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main()
}
