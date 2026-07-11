#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const FETCH_TIMEOUT_MS = 30000

function readArg(name, fallback = '') {
  const prefix = `--${name}=`
  const inline = process.argv.find((arg) => arg.startsWith(prefix))
  if (inline) return inline.slice(prefix.length)
  const index = process.argv.indexOf(`--${name}`)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    redirect: 'manual',
    ...options,
    headers: {
      'user-agent': 'Codex portfolio SEO GEO production validator',
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
  const body = await response.text().catch(() => '')
  return {
    url,
    status: response.status,
    location: response.headers.get('location') || '',
    contentType: response.headers.get('content-type') || '',
    body,
  }
}

function passCheck({ id, product, area, url, expected, actual, details = {} }) {
  return { id, product, area, ok: true, url, expected, actual, details }
}

function failCheck({ id, product, area, url, expected, actual, details = {} }) {
  return { id, product, area, ok: false, url, expected, actual, details }
}

async function statusCheck({ id, product, area, url, expectedStatus = 200, contentTypeIncludes = '' }) {
  try {
    const res = await request(url)
    const statusOk = res.status === expectedStatus
    const typeOk = !contentTypeIncludes || res.contentType.includes(contentTypeIncludes)
    const payload = {
      id,
      product,
      area,
      url,
      expected: { status: expectedStatus, contentTypeIncludes },
      actual: { status: res.status, contentType: res.contentType, location: res.location },
    }
    return statusOk && typeOk ? passCheck(payload) : failCheck(payload)
  } catch (error) {
    return failCheck({ id, product, area, url, expected: { status: expectedStatus }, actual: { error: error.message } })
  }
}

async function redirectCheck({ id, product, area, url, expectedStatus = 301, expectedLocation }) {
  try {
    const res = await request(url)
    const ok = res.status === expectedStatus && res.location === expectedLocation
    const payload = {
      id,
      product,
      area,
      url,
      expected: { status: expectedStatus, location: expectedLocation },
      actual: { status: res.status, location: res.location },
    }
    return ok ? passCheck(payload) : failCheck(payload)
  } catch (error) {
    return failCheck({ id, product, area, url, expected: { status: expectedStatus, location: expectedLocation }, actual: { error: error.message } })
  }
}

async function bodyCheck({ id, product, area, url, mustInclude = [], mustNotInclude = [] }) {
  try {
    const res = await request(url)
    const missing = mustInclude.filter((needle) => !res.body.includes(needle))
    const forbiddenPresent = mustNotInclude.filter((needle) => res.body.includes(needle))
    const ok = res.status >= 200 && res.status < 300 && missing.length === 0 && forbiddenPresent.length === 0
    const payload = {
      id,
      product,
      area,
      url,
      expected: { status: '2xx', mustInclude, mustNotInclude },
      actual: { status: res.status, contentType: res.contentType, missing, forbiddenPresent },
    }
    return ok ? passCheck(payload) : failCheck(payload)
  } catch (error) {
    return failCheck({ id, product, area, url, expected: { mustInclude, mustNotInclude }, actual: { error: error.message } })
  }
}

async function pierrondiChecks() {
  const apexBase = 'https://pierrondi.dev'
  const wwwBase = 'https://www.pierrondi.dev'
  const paths = ['/robots.txt', '/sitemap.xml', '/answers', '/ai-search']
  const checks = []
  for (const route of paths) {
    checks.push(await redirectCheck({
      id: `pierrondi-apex-${route.replace(/[^a-z0-9]+/gi, '-')}`,
      product: 'pierrondi.dev',
      area: 'seo_geo_endpoint',
      url: `${apexBase}${route}`,
      expectedStatus: 308,
      expectedLocation: `${wwwBase}${route}`,
    }))
    checks.push(await statusCheck({
      id: `pierrondi-www-${route.replace(/[^a-z0-9]+/gi, '-')}`,
      product: 'pierrondi.dev',
      area: 'seo_geo_endpoint',
      url: `${wwwBase}${route}`,
      expectedStatus: 200,
    }))
  }
  checks.push(await redirectCheck({
    id: 'pierrondi-en-app-brewmate-redirect',
    product: 'pierrondi.dev',
    area: 'technical_seo',
    url: `${wwwBase}/en/apps/brewmate`,
    expectedStatus: 308,
    expectedLocation: '/apps/brewmate',
  }))
  return checks
}

async function agenticoscoreChecks() {
  return [
    await statusCheck({
      id: 'agenticoscore-root-200',
      product: 'AgenticosCore',
      area: 'canonical_route',
      url: 'https://agenticoscore.ai/',
      expectedStatus: 200,
      contentTypeIncludes: 'text/html',
    }),
    await redirectCheck({
      id: 'agenticoscore-www-root-canonical',
      product: 'AgenticosCore',
      area: 'canonical_route',
      url: 'https://www.agenticoscore.ai/',
      expectedStatus: 301,
      expectedLocation: 'https://agenticoscore.ai/',
    }),
    await redirectCheck({
      id: 'agenticoscore-www-scorecard-clickids',
      product: 'AgenticosCore',
      area: 'click_id_preservation',
      url: 'https://www.agenticoscore.ai/scorecard?gclid=CHECK_GCLID&gbraid=CHECK_GBRAID&wbraid=CHECK_WBRAID&utm_source=check',
      expectedStatus: 301,
      expectedLocation: 'https://agenticoscore.ai/scorecard?gclid=CHECK_GCLID&gbraid=CHECK_GBRAID&wbraid=CHECK_WBRAID&utm_source=check',
    }),
    await redirectCheck({
      id: 'agenticoscore-v2-alias',
      product: 'AgenticosCore',
      area: 'canonical_route',
      url: 'https://agenticoscore.ai/v2/?utm_source=check',
      expectedStatus: 301,
      expectedLocation: '/app?utm_source=check',
    }),
    await statusCheck({
      id: 'agenticoscore-answers',
      product: 'AgenticosCore',
      area: 'geo_endpoint',
      url: 'https://agenticoscore.ai/answers',
      expectedStatus: 200,
      contentTypeIncludes: 'text/html',
    }),
    await statusCheck({
      id: 'agenticoscore-ai-search',
      product: 'AgenticosCore',
      area: 'geo_endpoint',
      url: 'https://agenticoscore.ai/ai-search',
      expectedStatus: 200,
      contentTypeIncludes: 'text/html',
    }),
  ]
}

async function cantuChecks() {
  const commercialTargets = [
    '/gerar-arranjo-satb',
    '/planos',
    '/musicxml-harmonization',
    '/harmonizar-melodia-online',
    '/kit-de-ensaio',
  ]
  const aiVisitedPages = [
    '/',
    '/arranjos',
    '/best-choral-arranging-software-2026',
    '/finale-alternative',
    '/hymn-arranger',
    '/llms.txt',
  ]
  const checks = [
    await statusCheck({ id: 'cantu-root-200', product: 'CantuStudio', area: 'seo_endpoint', url: 'https://cantustudio.app/', expectedStatus: 200, contentTypeIncludes: 'text/html' }),
    await statusCheck({ id: 'cantu-favicon-200', product: 'CantuStudio', area: 'seo_endpoint', url: 'https://cantustudio.app/favicon.ico', expectedStatus: 200, contentTypeIncludes: 'image/' }),
    await statusCheck({ id: 'cantu-sitemap-200', product: 'CantuStudio', area: 'seo_endpoint', url: 'https://cantustudio.app/sitemap.xml', expectedStatus: 200 }),
    await statusCheck({ id: 'cantu-answers-200', product: 'CantuStudio', area: 'geo_endpoint', url: 'https://cantustudio.app/answers', expectedStatus: 200, contentTypeIncludes: 'text/html' }),
    await statusCheck({ id: 'cantu-ai-search-200', product: 'CantuStudio', area: 'geo_endpoint', url: 'https://cantustudio.app/ai-search', expectedStatus: 200, contentTypeIncludes: 'text/html' }),
    await redirectCheck({
      id: 'cantu-stale-how-great-satb-redirect',
      product: 'CantuStudio',
      area: 'technical_seo',
      url: 'https://cantustudio.app/satb/how-great-thou-art',
      expectedStatus: 301,
      expectedLocation: '/arranjo/how-great-thou-art',
    }),
    await bodyCheck({
      id: 'cantu-sitemap-no-stale-how-great-satb',
      product: 'CantuStudio',
      area: 'technical_seo',
      url: 'https://cantustudio.app/sitemap.xml',
      mustNotInclude: ['https://cantustudio.app/satb/how-great-thou-art'],
    }),
  ]
  for (const route of aiVisitedPages) {
    checks.push(await bodyCheck({
      id: `cantu-commercial-links-${route.replace(/[^a-z0-9]+/gi, '-') || 'root'}`,
      product: 'CantuStudio',
      area: 'ai_crawler_commercial_links',
      url: `https://cantustudio.app${route}`,
      mustInclude: commercialTargets,
    }))
  }
  return checks
}

async function faithChecks() {
  return [
    await statusCheck({ id: 'faith-root-200', product: 'FaithSchool', area: 'seo_endpoint', url: 'https://faithschool.app/', expectedStatus: 200, contentTypeIncludes: 'text/html' }),
    await statusCheck({ id: 'faith-sitemap-200', product: 'FaithSchool', area: 'seo_endpoint', url: 'https://faithschool.app/sitemap.xml', expectedStatus: 200 }),
    await statusCheck({ id: 'faith-answers-200', product: 'FaithSchool', area: 'geo_endpoint', url: 'https://faithschool.app/answers/', expectedStatus: 200, contentTypeIncludes: 'text/html' }),
    await statusCheck({ id: 'faith-ai-search-200', product: 'FaithSchool', area: 'geo_endpoint', url: 'https://faithschool.app/ai-search/', expectedStatus: 200, contentTypeIncludes: 'text/html' }),
  ]
}

const outPath = readArg('out', '')
const groups = await Promise.all([
  pierrondiChecks(),
  agenticoscoreChecks(),
  cantuChecks(),
  faithChecks(),
])
const checks = groups.flat()
const failures = checks.filter((check) => !check.ok)
const result = {
  generatedAt: new Date().toISOString(),
  validator: 'seo-geo-production-validator',
  summary: {
    total: checks.length,
    passed: checks.length - failures.length,
    failed: failures.length,
    complete: failures.length === 0,
  },
  failures: failures.map((check) => ({
    id: check.id,
    product: check.product,
    area: check.area,
    url: check.url,
    expected: check.expected,
    actual: check.actual,
  })),
  checks,
}
const output = `${JSON.stringify(result, null, 2)}\n`
if (outPath) {
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, output, 'utf8')
}
process.stdout.write(output)
process.exitCode = failures.length ? 1 : 0
