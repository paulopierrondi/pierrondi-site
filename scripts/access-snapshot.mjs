#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { createSign } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DEFAULT_SINCE = '1h'
const DEFAULT_LIMIT = 250
const FETCH_TIMEOUT_MS = 30000
const GSC_LOOKBACK_DAYS = 28
const GSC_LAG_DAYS = 2
const GOOGLE_READONLY_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
]

const SOURCES = [
  {
    id: 'pierrondi',
    label: 'pierrondi.dev',
    provider: 'railway',
    cwd: '/Users/paulopierrondi/Projects/pierrondi-site',
    args: ['logs', '--http', '--service', 'pierrondi-site', '--json'],
    analytics: {
      envPrefix: 'PIERRONDI',
      baseUrl: 'https://www.pierrondi.dev',
      plausibleSiteId: 'pierrondi.dev',
      gscSiteCandidates: ['sc-domain:pierrondi.dev', 'https://www.pierrondi.dev/', 'https://pierrondi.dev/'],
      gscCsvDir: '/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/pierrondi',
    },
  },
  {
    id: 'cantustudio',
    label: 'CantuStudio',
    provider: 'railway',
    cwd: '/Users/paulopierrondi/Projects/.deploy-worktrees/cantustudio-geo-prod',
    args: ['logs', '--http', '--service', 'cantustudio-frontend', '--json'],
    analytics: {
      envPrefix: 'CANTUSTUDIO',
      baseUrl: 'https://cantustudio.app',
      plausibleSiteId: 'cantustudio.app',
      gscSiteCandidates: ['sc-domain:cantustudio.app', 'https://cantustudio.app/', 'https://www.cantustudio.app/'],
      gscCsvDir: '/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/cantustudio',
    },
  },
  {
    id: 'agenticoscore',
    label: 'AgenticosCore',
    provider: 'railway',
    cwd: '/Users/paulopierrondi/Projects/.deploy-worktrees/agenticoscore-geo-prod',
    args: ['logs', '--http', '--service', 'agentcore-revenue-ops', '--json'],
    analytics: {
      envPrefix: 'AGENTICOSCORE',
      baseUrl: 'https://agenticoscore.ai',
      plausibleSiteId: 'agenticoscore.ai',
      gscSiteCandidates: ['sc-domain:agenticoscore.ai', 'https://agenticoscore.ai/', 'https://www.agenticoscore.ai/'],
      gscCsvDir: '/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/agentcore',
      extraGa4PropertyEnv: ['AGENTCORE_GA4_PROPERTY_ID', 'AGENTCORE_GA_PROPERTY_ID'],
      extraGscSiteEnv: ['AGENTCORE_GSC_SITE_URL', 'AGENTCORE_SEARCH_CONSOLE_SITE_URL'],
    },
  },
  {
    id: 'faithschool',
    label: 'FaithSchool',
    provider: 'vercel',
    cwd: '/Users/paulopierrondi/Projects/faithschool-copilot',
    args: ['logs', '--project', 'faithschool-web', '--environment', 'production', '--json', '--no-branch'],
    analytics: {
      envPrefix: 'FAITHSCHOOL',
      baseUrl: 'https://faithschool.app',
      plausibleSiteId: 'faithschool.app',
      gscSiteCandidates: ['sc-domain:faithschool.app', 'https://faithschool.app/', 'https://www.faithschool.app/'],
      gscCsvDir: '/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/faithschool',
    },
  },
]

function readArg(name, fallback) {
  const prefix = `--${name}=`
  const inline = process.argv.find((arg) => arg.startsWith(prefix))
  if (inline) return inline.slice(prefix.length)
  const index = process.argv.indexOf(`--${name}`)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

const since = readArg('since', process.env.ACCESS_SNAPSHOT_SINCE || DEFAULT_SINCE)
const limit = Number(readArg('limit', process.env.ACCESS_SNAPSHOT_LIMIT || DEFAULT_LIMIT))
const outPath = readArg('out', process.env.ACCESS_SNAPSHOT_OUT || '')
const includeAnalytics = readBoolArg('analytics', process.env.ACCESS_SNAPSHOT_ANALYTICS !== '0')

function readBoolArg(name, fallback) {
  if (process.argv.includes(`--no-${name}`)) return false
  if (process.argv.includes(`--${name}`)) return true
  const value = readArg(name, '')
  if (!value) return fallback
  return !['0', 'false', 'no', 'off'].includes(String(value).toLowerCase())
}

function redact(value) {
  return String(value || '').replace(/[A-Za-z0-9_+/=.-]{80,}/g, '[REDACTED]')
}

function runSource(source) {
  if (!existsSync(source.cwd)) {
    return { ok: false, error: `missing cwd ${source.cwd}`, lines: [] }
  }

  const args =
    source.provider === 'railway'
      ? [...source.args, '--since', since, '--lines', String(limit)]
      : [...source.args, '--since', since, '--limit', String(limit)]

  try {
    const output = execFileSync(source.provider === 'railway' ? 'railway' : 'vercel', args, {
      cwd: source.cwd,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 8,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return { ok: true, lines: output.split('\n').filter(Boolean) }
  } catch (error) {
    const message = `${error.stderr || error.message || error}`.replace(/[A-Za-z0-9_+/=.-]{80,}/g, '[REDACTED]')
    return { ok: false, error: message.trim().slice(0, 800), lines: [] }
  }
}

function normalize(source, line) {
  let raw
  try {
    raw = JSON.parse(line)
  } catch {
    return null
  }

  if (source.provider === 'railway') {
    return {
      timestamp: raw.timestamp || null,
      host: raw.host || null,
      method: raw.method || null,
      path: raw.path || '/',
      status: Number(raw.httpStatus || 0),
      durationMs: Number(raw.totalDuration || 0),
      userAgent: raw.clientUa || '',
      source: raw.edgeRegion || null,
      uniqueKey: raw.srcIp || null,
      cache: null,
    }
  }

  return {
    timestamp: raw.timestamp ? new Date(raw.timestamp).toISOString() : null,
    host: raw.domain || null,
    method: raw.requestMethod || null,
    path: raw.requestPath || '/',
    status: Number(raw.responseStatusCode || 0),
    durationMs: null,
    userAgent: '',
    source: raw.source || null,
    uniqueKey: null,
    cache: raw.cache || null,
  }
}

function isBot(userAgent) {
  return /bot|crawler|spider|google|bing|slurp|duckduck|yandex|baidu|facebookexternalhit|linkedinbot|applebot/i.test(userAgent)
}

function isAiCrawler(userAgent) {
  return /gptbot|chatgpt|oai-search|perplexity|claude|anthropic|ccbot|google-extended|applebot-extended|bytespider/i.test(userAgent)
}

function statusBucket(status) {
  if (status >= 500) return '5xx'
  if (status >= 400) return '4xx'
  if (status >= 300) return '3xx'
  if (status >= 200) return '2xx'
  return 'other'
}

function topEntries(map, count = 10) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, count)
    .map(([key, value]) => ({ key, value }))
}

function summarize(source) {
  const result = runSource(source)
  const rows = result.lines.map((line) => normalize(source, line)).filter(Boolean)

  const statuses = new Map()
  const paths = new Map()
  const hosts = new Map()
  const agents = new Map()
  const unique = new Set()
  let botRequests = 0
  let aiCrawlerRequests = 0
  let slowestMs = 0

  for (const row of rows) {
    statuses.set(statusBucket(row.status), (statuses.get(statusBucket(row.status)) || 0) + 1)
    paths.set(`${row.status} ${row.path}`, (paths.get(`${row.status} ${row.path}`) || 0) + 1)
    if (row.host) hosts.set(row.host, (hosts.get(row.host) || 0) + 1)
    if (row.userAgent) {
      const agent = row.userAgent.slice(0, 90)
      agents.set(agent, (agents.get(agent) || 0) + 1)
    }
    if (row.uniqueKey) unique.add(row.uniqueKey)
    if (isBot(row.userAgent)) botRequests += 1
    if (isAiCrawler(row.userAgent)) aiCrawlerRequests += 1
    if (row.durationMs && row.durationMs > slowestMs) slowestMs = row.durationMs
  }

  return {
    id: source.id,
    label: source.label,
    provider: source.provider,
    ok: result.ok,
    error: result.ok ? null : result.error,
    window: { since, limit },
    requests: rows.length,
    estimatedUniqueIps: unique.size || null,
    statuses: Object.fromEntries([...statuses.entries()].sort()),
    botRequests,
    aiCrawlerRequests,
    slowestMs: slowestMs || null,
    topHosts: topEntries(hosts, 5),
    topPaths: topEntries(paths, 12),
    topUserAgents: topEntries(agents, 8),
  }
}

function envValue(names) {
  for (const name of names.filter(Boolean)) {
    const value = process.env[name]
    if (value) return { name, value }
  }
  return null
}

function sourceEnvNames(source, suffix, extras = []) {
  const prefix = source.analytics?.envPrefix
  return [
    ...extras,
    prefix ? `${prefix}_${suffix}` : '',
    prefix ? `${suffix}_${prefix}` : '',
    prefix ? `${prefix}_GOOGLE_${suffix}` : '',
  ].filter(Boolean)
}

function ga4PropertyEnvNames(source) {
  return sourceEnvNames(source, 'GA4_PROPERTY_ID', source.analytics?.extraGa4PropertyEnv || [])
}

function plausibleTokenEnvNames(source) {
  return sourceEnvNames(source, 'PLAUSIBLE_API_KEY', [
    'PLAUSIBLE_API_KEY',
    'PLAUSIBLE_TOKEN',
    'PLAUSIBLE_AUTH_TOKEN',
    `${source.analytics?.envPrefix || ''}_PLAUSIBLE_TOKEN`,
  ])
}

function plausibleSiteEnvNames(source) {
  return sourceEnvNames(source, 'PLAUSIBLE_SITE_ID', [
    `${source.analytics?.envPrefix || ''}_PLAUSIBLE_DOMAIN`,
  ])
}

function gscSiteEnvNames(source) {
  return sourceEnvNames(source, 'GSC_SITE_URL', [
    ...(source.analytics?.extraGscSiteEnv || []),
    `${source.analytics?.envPrefix || ''}_SEARCH_CONSOLE_SITE_URL`,
  ])
}

function googleTokenEnvNames() {
  return [
    'GOOGLE_ACCESS_TOKEN',
    'GOOGLE_API_ACCESS_TOKEN',
    'GSC_ACCESS_TOKEN',
    'GA4_ACCESS_TOKEN',
  ]
}

function googleServiceAccountEnvNames() {
  return [
    'GOOGLE_APPLICATION_CREDENTIALS',
    'GOOGLE_SERVICE_ACCOUNT_JSON',
    'GOOGLE_SERVICE_ACCOUNT_JSON_BASE64',
    'GSC_SERVICE_ACCOUNT_JSON',
    'GA4_SERVICE_ACCOUNT_JSON',
  ]
}

function parseGoogleSiteCandidates(source) {
  const configured = envValue(gscSiteEnvNames(source))
  if (!configured) return source.analytics?.gscSiteCandidates || []
  return configured.value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function isoDateDaysAgo(days) {
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  return date.toISOString().slice(0, 10)
}

function gscDateRange() {
  return {
    startDate: isoDateDaysAgo(GSC_LOOKBACK_DAYS + GSC_LAG_DAYS),
    endDate: isoDateDaysAgo(GSC_LAG_DAYS),
  }
}

function todayDateRange() {
  const today = new Date().toISOString().slice(0, 10)
  return { startDate: today, endDate: today }
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
  const body = await response.json().catch(() => ({}))
  return { response, body }
}

let googleTokenCache = null

async function googleAccessToken() {
  if (googleTokenCache) return googleTokenCache

  const explicit = envValue(googleTokenEnvNames())
  if (explicit) {
    googleTokenCache = { ok: true, source: 'env_access_token', token: explicit.value }
    return googleTokenCache
  }

  const serviceAccount = await serviceAccountAccessToken()
  if (serviceAccount.ok) {
    googleTokenCache = serviceAccount
    return googleTokenCache
  }

  const gcloud = gcloudAccessToken()
  if (gcloud.ok) {
    googleTokenCache = gcloud
    return googleTokenCache
  }

  googleTokenCache = {
    ok: false,
    source: 'missing_google_auth',
    expectedEnv: [...googleTokenEnvNames(), ...googleServiceAccountEnvNames()],
    note: 'No Google read-only auth found. Run gcloud application-default login with analytics/search-console scopes or configure a service account in the secure env provider.',
  }
  return googleTokenCache
}

async function serviceAccountAccessToken() {
  const configured = envValue(googleServiceAccountEnvNames())
  if (!configured) return { ok: false }

  let raw = configured.value
  try {
    if (configured.name === 'GOOGLE_APPLICATION_CREDENTIALS' && existsSync(raw)) {
      raw = readFileSync(raw, 'utf8')
    } else if (configured.name.endsWith('_BASE64')) {
      raw = Buffer.from(raw, 'base64').toString('utf8')
    }
    const credentials = JSON.parse(raw)
    if (!credentials.client_email || !credentials.private_key) return { ok: false }

    const iat = Math.floor(Date.now() / 1000)
    const payload = {
      iss: credentials.client_email,
      scope: GOOGLE_READONLY_SCOPES.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: iat + 3600,
      iat,
    }
    const assertion = [
      base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })),
      base64Url(JSON.stringify(payload)),
    ].join('.')
    const signature = createSign('RSA-SHA256').update(assertion).sign(credentials.private_key)
    const jwt = `${assertion}.${base64Url(signature)}`
    const { response, body } = await fetchJson('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })
    if (!response.ok || !body.access_token) {
      return {
        ok: false,
        source: 'service_account',
        note: redact(body?.error_description || body?.error || response.statusText),
      }
    }
    return { ok: true, source: 'service_account', token: body.access_token }
  } catch (error) {
    return { ok: false, source: 'service_account', note: redact(error.message) }
  }
}

function base64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function gcloudAccessToken() {
  const bins = [...new Set([process.env.GCLOUD_BIN, '/opt/homebrew/bin/gcloud', '/usr/local/bin/gcloud', 'gcloud'].filter(Boolean))]
  const commands = [
    ['auth', 'application-default', 'print-access-token'],
    ['auth', 'print-access-token'],
  ]

  for (const bin of bins) {
    if (bin.startsWith('/') && !existsSync(bin)) continue
    for (const args of commands) {
      try {
        const token = execFileSync(bin, args, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          maxBuffer: 1024 * 1024,
        }).trim().split(/\r?\n/).pop()
        if (token) return { ok: true, source: args.includes('application-default') ? 'gcloud_adc' : 'gcloud_user', token }
      } catch {}
    }
  }
  return { ok: false }
}

function googleAuthBlocked(provider) {
  return {
    status: `blocked_no_${provider}_auth`,
    expectedEnv: [...googleTokenEnvNames(), ...googleServiceAccountEnvNames()],
    note: 'Google read-only auth is not available in this runtime.',
  }
}

async function ga4Snapshot(source) {
  const property = envValue(ga4PropertyEnvNames(source))
  if (!property) {
    return {
      status: 'blocked_no_ga4_property_id',
      expectedEnv: ga4PropertyEnvNames(source),
      note: 'GA4 Data API needs the numeric property id, not the public G- measurement id.',
    }
  }

  const auth = await googleAccessToken()
  if (!auth.ok) return googleAuthBlocked('ga4')

  const dateRange = todayDateRange()
  try {
    const { response, body } = await fetchJson(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(property.value)}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [dateRange],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'eventCount' },
        ],
      }),
    })
    if (!response.ok) {
      return {
        status: 'blocked_ga4_api_error',
        httpStatus: response.status,
        reason: redact(body?.error?.message || response.statusText).slice(0, 240),
      }
    }

    const headers = body.metricHeaders?.map((item) => item.name) || []
    const values = body.rows?.[0]?.metricValues?.map((item) => Number(item.value || 0)) || []
    return {
      status: 'ok',
      source: 'ga4_data_api',
      dateRange,
      metrics: Object.fromEntries(headers.map((name, index) => [name, values[index] || 0])),
    }
  } catch (error) {
    return { status: 'blocked_ga4_fetch_error', reason: redact(error.message).slice(0, 240) }
  }
}

async function plausibleSnapshot(source) {
  const token = envValue(plausibleTokenEnvNames(source))
  const site = envValue(plausibleSiteEnvNames(source))?.value || source.analytics?.plausibleSiteId
  if (!token) {
    return {
      status: 'blocked_no_plausible_token',
      siteId: site,
      expectedEnv: plausibleTokenEnvNames(source),
    }
  }

  const baseUrl = process.env.PLAUSIBLE_API_BASE_URL || 'https://plausible.io'
  try {
    const aggregateUrl = new URL('/api/v1/stats/aggregate', baseUrl)
    aggregateUrl.searchParams.set('site_id', site)
    aggregateUrl.searchParams.set('period', 'day')
    aggregateUrl.searchParams.set('metrics', 'visitors,pageviews,visits,bounce_rate,visit_duration')

    const { response, body } = await fetchJson(aggregateUrl, {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (!response.ok) {
      return {
        status: 'blocked_plausible_api_error',
        siteId: site,
        httpStatus: response.status,
        reason: redact(body?.error || body?.message || response.statusText).slice(0, 240),
      }
    }

    const realtimeUrl = new URL('/api/v1/stats/realtime/visitors', baseUrl)
    realtimeUrl.searchParams.set('site_id', site)
    const realtime = await fetchJson(realtimeUrl, {
      headers: { Authorization: `Bearer ${token.value}` },
    }).catch(() => null)

    return {
      status: 'ok',
      source: 'plausible_stats_api',
      siteId: site,
      period: 'day',
      metrics: Object.fromEntries(Object.entries(body.results || {}).map(([key, value]) => [key, value?.value ?? value])),
      realtimeVisitors: realtime?.response?.ok ? Number(realtime.body || 0) : null,
    }
  } catch (error) {
    return { status: 'blocked_plausible_fetch_error', siteId: site, reason: redact(error.message).slice(0, 240) }
  }
}

async function searchConsoleSnapshot(source) {
  const csv = latestSearchConsoleCsv(source.analytics?.gscCsvDir)
  if (csv) return { status: 'csv', source: csv.path, ...summarizeSearchConsoleCsv(csv.body) }

  const auth = await googleAccessToken()
  if (!auth.ok) {
    return {
      ...googleAuthBlocked('search_console'),
      attemptedSites: parseGoogleSiteCandidates(source),
      csvDir: source.analytics?.gscCsvDir,
    }
  }

  const attempts = []
  for (const siteUrl of parseGoogleSiteCandidates(source)) {
    const result = await searchConsoleQuery(siteUrl, auth.token)
    if (result.ok) return result
    attempts.push(result)
  }

  return {
    status: 'blocked_no_search_console_access',
    attemptedSites: parseGoogleSiteCandidates(source),
    attempts,
    csvDir: source.analytics?.gscCsvDir,
    note: 'Google auth exists, but none of the candidate Search Console properties returned metrics.',
  }
}

async function searchConsoleQuery(siteUrl, token) {
  const dateRange = gscDateRange()
  try {
    const { response, body } = await fetchJson(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...dateRange,
        dimensions: ['page', 'query'],
        rowLimit: 25,
      }),
    })
    if (!response.ok) {
      return {
        ok: false,
        siteUrl,
        httpStatus: response.status,
        reason: redact(body?.error?.message || response.statusText).slice(0, 240),
      }
    }
    const rows = Array.isArray(body.rows) ? body.rows : []
    return {
      ok: true,
      status: 'ok',
      source: 'search_console_api',
      siteUrl,
      dateRange,
      rowCount: rows.length,
      metrics: summarizeSearchConsoleRows(rows),
      topRows: topSearchConsoleRows(rows),
    }
  } catch (error) {
    return { ok: false, siteUrl, reason: redact(error.message).slice(0, 240) }
  }
}

function summarizeSearchConsoleRows(rows) {
  const totals = rows.reduce((acc, row) => {
    const clicks = Number(row.clicks || 0)
    const impressions = Number(row.impressions || 0)
    acc.clicks += clicks
    acc.impressions += impressions
    acc.positionWeighted += Number(row.position || 0) * impressions
    return acc
  }, { clicks: 0, impressions: 0, positionWeighted: 0 })
  return {
    clicks: Number(totals.clicks.toFixed(2)),
    impressions: Number(totals.impressions.toFixed(2)),
    ctr: totals.impressions ? Number(((totals.clicks / totals.impressions) * 100).toFixed(2)) : 0,
    averagePosition: totals.impressions ? Number((totals.positionWeighted / totals.impressions).toFixed(2)) : 0,
  }
}

function topSearchConsoleRows(rows) {
  return rows.slice(0, 8).map((row) => ({
    page: row.keys?.[0] || '',
    query: row.keys?.[1] || '',
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(((row.ctr || 0) * 100).toFixed(2)),
    position: Number(row.position || 0).toFixed(1),
  }))
}

function latestSearchConsoleCsv(dir) {
  if (!dir || !existsSync(dir)) return null
  const files = readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith('.csv'))
    .map((file) => path.join(dir, file))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)
  const file = files[0]
  if (!file) return null
  return { path: file, body: readFileSync(file, 'utf8') }
}

function parseCsvLine(line) {
  const cells = []
  let current = ''
  let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    const next = line[index + 1]
    if (char === '"' && quoted && next === '"') {
      current += '"'
      index += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      cells.push(current)
      current = ''
    } else {
      current += char
    }
  }
  cells.push(current)
  return cells
}

function summarizeSearchConsoleCsv(body) {
  const lines = body.split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return { rowCount: 0, metrics: summarizeSearchConsoleRows([]), topRows: [] }
  const headers = parseCsvLine(lines[0]).map((header) => header.trim().toLowerCase())
  const rows = lines.slice(1, 501).map((line) => {
    const cells = parseCsvLine(line)
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] || '']))
    const clicks = Number(String(row.clicks || row.cliques || '0').replace('%', '').replace(',', '.')) || 0
    const impressions = Number(String(row.impressions || row.impressoes || row.impressões || '0').replace(',', '.')) || 0
    const position = Number(String(row.position || row.posicao || row['posição'] || '0').replace(',', '.')) || 0
    return {
      keys: [row.page || row.pagina || row['página'] || '', row.query || row.consulta || ''],
      clicks,
      impressions,
      ctr: impressions ? clicks / impressions : 0,
      position,
    }
  })
  return {
    rowCount: rows.length,
    metrics: summarizeSearchConsoleRows(rows),
    topRows: topSearchConsoleRows(rows),
  }
}

async function sourceAnalyticsSnapshot(source) {
  if (!source.analytics) return null
  const [plausible, ga4, searchConsole] = await Promise.all([
    plausibleSnapshot(source),
    ga4Snapshot(source),
    searchConsoleSnapshot(source),
  ])
  return {
    id: source.id,
    label: source.label,
    plausible,
    ga4,
    searchConsole,
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  window: { since, limit },
  note: includeAnalytics
    ? 'Provider-log snapshot plus best-effort analytics probes. Provider request counts are still not a replacement for GA4/Plausible/Search Console users, sessions or search clicks when those APIs are blocked.'
    : 'Provider-log snapshot. Counts are request-level, not a replacement for GA4/Plausible/Search Console users, sessions or search clicks.',
  sources: SOURCES.map(summarize),
  analytics: includeAnalytics
    ? {
        generatedAt: new Date().toISOString(),
        note: 'Read-only analytics probes. Secrets are never printed; missing credentials are reported as blockers with expected env names only.',
        sources: (await Promise.all(SOURCES.map(sourceAnalyticsSnapshot))).filter(Boolean),
      }
    : { status: 'skipped' },
}

const body = `${JSON.stringify(report, null, 2)}\n`
if (outPath) {
  const absolute = path.isAbsolute(outPath) ? outPath : path.join(ROOT, outPath)
  mkdirSync(path.dirname(absolute), { recursive: true })
  writeFileSync(absolute, body)
}

process.stdout.write(body)
