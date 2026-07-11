#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { createSign } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const FETCH_TIMEOUT_MS = 30000
const GOOGLE_READONLY_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
]
const DEFAULT_PROPERTY_ID = '543366142'
const DEFAULT_SITE_ID = 'agenticoscore.ai'

const GA4_PROPERTY_ENV = [
  'AGENTICOSCORE_GA4_PROPERTY_ID',
  'AGENTCORE_GA4_PROPERTY_ID',
  'AGENTCORE_GA_PROPERTY_ID',
  'GA4_PROPERTY_ID_AGENTICOSCORE',
  'AGENTICOSCORE_GOOGLE_GA4_PROPERTY_ID',
]
const PLAUSIBLE_TOKEN_ENV = [
  'AGENTICOSCORE_PLAUSIBLE_API_KEY',
  'AGENTICOSCORE_PLAUSIBLE_TOKEN',
  'PLAUSIBLE_API_KEY_AGENTICOSCORE',
  'PLAUSIBLE_API_KEY',
  'PLAUSIBLE_TOKEN',
  'PLAUSIBLE_AUTH_TOKEN',
]
const PLAUSIBLE_SITE_ENV = [
  'AGENTICOSCORE_PLAUSIBLE_SITE_ID',
  'AGENTICOSCORE_PLAUSIBLE_DOMAIN',
  'PLAUSIBLE_SITE_ID_AGENTICOSCORE',
]
const GOOGLE_TOKEN_ENV = [
  'GOOGLE_ACCESS_TOKEN',
  'GOOGLE_API_ACCESS_TOKEN',
  'GSC_ACCESS_TOKEN',
  'GA4_ACCESS_TOKEN',
]
const GOOGLE_SERVICE_ACCOUNT_ENV = [
  'PORTFOLIO_GOOGLE_APPLICATION_CREDENTIALS',
  'PORTFOLIO_GOOGLE_SERVICE_ACCOUNT_JSON',
  'PORTFOLIO_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64',
  'GOOGLE_APPLICATION_CREDENTIALS',
  'GOOGLE_SERVICE_ACCOUNT_JSON',
  'GOOGLE_SERVICE_ACCOUNT_JSON_BASE64',
  'GSC_SERVICE_ACCOUNT_JSON',
  'GA4_SERVICE_ACCOUNT_JSON',
]

function readArg(name, fallback = '') {
  const prefix = `--${name}=`
  const inline = process.argv.find((arg) => arg.startsWith(prefix))
  if (inline) return inline.slice(prefix.length)
  const index = process.argv.indexOf(`--${name}`)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

function envValue(names) {
  for (const name of names.filter(Boolean)) {
    const value = process.env[name]
    if (value) return { name, value }
  }
  return null
}

function redact(value) {
  return String(value || '').replace(/[A-Za-z0-9_+/=.-]{80,}/g, '[REDACTED]')
}

function base64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
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

function readServiceAccountCredentials() {
  const configured = envValue(GOOGLE_SERVICE_ACCOUNT_ENV)
  if (!configured) return { ok: false, configured: null }
  try {
    let raw = configured.value
    if (configured.name.endsWith('APPLICATION_CREDENTIALS') && existsSync(raw)) {
      raw = readFileSync(raw, 'utf8')
    } else if (configured.name.endsWith('_BASE64')) {
      raw = Buffer.from(raw, 'base64').toString('utf8')
    }
    const credentials = JSON.parse(raw)
    if (!credentials.client_email || !credentials.private_key) {
      return { ok: false, configured: configured.name, reason: 'missing_client_email_or_private_key' }
    }
    return { ok: true, configured: configured.name, credentials, clientEmail: credentials.client_email }
  } catch (error) {
    return { ok: false, configured: configured.name, reason: redact(error.message).slice(0, 160) }
  }
}

async function serviceAccountAccessToken() {
  const serviceAccount = readServiceAccountCredentials()
  if (!serviceAccount.ok) return { ok: false, source: 'service_account', ...serviceAccount }

  const iat = Math.floor(Date.now() / 1000)
  const payload = {
    iss: serviceAccount.credentials.client_email,
    scope: GOOGLE_READONLY_SCOPES.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: iat + 3600,
    iat,
  }
  const assertion = [
    base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })),
    base64Url(JSON.stringify(payload)),
  ].join('.')
  const signature = createSign('RSA-SHA256').update(assertion).sign(serviceAccount.credentials.private_key)
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
      configured: serviceAccount.configured,
      clientEmail: serviceAccount.clientEmail,
      reason: redact(body?.error_description || body?.error || response.statusText).slice(0, 200),
    }
  }
  return {
    ok: true,
    source: 'service_account',
    configured: serviceAccount.configured,
    clientEmail: serviceAccount.clientEmail,
    token: body.access_token,
  }
}

function gcloudAccessToken() {
  const bins = [...new Set([process.env.GCLOUD_BIN, '/opt/homebrew/bin/gcloud', '/usr/local/bin/gcloud', 'gcloud'].filter(Boolean))]
  const commands = [
    ['auth', 'application-default', 'print-access-token'],
    ['auth', 'print-access-token'],
  ]
  const gcloudPython = process.env.CLOUDSDK_PYTHON || process.env.GCLOUD_PYTHON || (
    existsSync('/opt/homebrew/bin/python3.14') ? '/opt/homebrew/bin/python3.14' : ''
  )
  const env = gcloudPython ? { ...process.env, CLOUDSDK_PYTHON: gcloudPython } : process.env

  for (const bin of bins) {
    if (bin.startsWith('/') && !existsSync(bin)) continue
    for (const args of commands) {
      try {
        const token = execFileSync(bin, args, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          env,
          maxBuffer: 1024 * 1024,
        }).trim().split(/\r?\n/).pop()
        if (token) return { ok: true, source: args.includes('application-default') ? 'gcloud_adc' : 'gcloud_user', token }
      } catch {}
    }
  }
  return { ok: false }
}

async function googleAccessToken() {
  const serviceAccount = await serviceAccountAccessToken()
  if (serviceAccount.ok) return serviceAccount

  const explicit = envValue(GOOGLE_TOKEN_ENV)
  if (explicit) return { ok: true, source: 'env_access_token', configured: explicit.name, token: explicit.value }

  const gcloud = gcloudAccessToken()
  if (gcloud.ok) return gcloud

  return {
    ok: false,
    source: 'missing_google_auth',
    expectedEnv: [...GOOGLE_TOKEN_ENV, ...GOOGLE_SERVICE_ACCOUNT_ENV],
    serviceAccount,
  }
}

async function ga4Doctor(propertyId) {
  const auth = await googleAccessToken()
  const authSummary = auth.ok
    ? { ok: true, source: auth.source, configured: auth.configured || null, clientEmail: auth.clientEmail || null }
    : { ok: false, source: auth.source, expectedEnv: auth.expectedEnv, serviceAccount: sanitizeAuth(auth.serviceAccount) }

  if (!auth.ok) {
    return {
      status: 'blocked_no_google_auth',
      auth: authSummary,
      nextAction: 'Configure Google read-only auth before checking GA4 permissions.',
    }
  }

  const dateRange = todayDateRange()
  const { response, body } = await fetchJson(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`, {
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
    const reason = redact(body?.error?.message || response.statusText).slice(0, 240)
    return {
      status: 'blocked_ga4_api_error',
      httpStatus: response.status,
      reason,
      auth: authSummary,
      nextAction: auth.clientEmail
        ? `Add ${auth.clientEmail} as Viewer or Analyst on GA4 property ${propertyId}.`
        : `Grant the active Google auth source read access to GA4 property ${propertyId}.`,
    }
  }

  const headers = body.metricHeaders?.map((item) => item.name) || []
  const values = body.rows?.[0]?.metricValues?.map((item) => Number(item.value || 0)) || []
  return {
    status: 'ok',
    source: 'ga4_data_api',
    propertyId,
    dateRange,
    auth: authSummary,
    metrics: Object.fromEntries(headers.map((name, index) => [name, values[index] || 0])),
    nextAction: 'Use GA4 as AgenticosCore primary analytics source.',
  }
}

function sanitizeAuth(value) {
  if (!value) return null
  return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'token' && key !== 'credentials'))
}

async function plausibleDoctor(siteId) {
  const token = envValue(PLAUSIBLE_TOKEN_ENV)
  const site = envValue(PLAUSIBLE_SITE_ENV)?.value || siteId
  if (!token) {
    return {
      status: 'blocked_no_plausible_token',
      siteId: site,
      expectedEnv: PLAUSIBLE_TOKEN_ENV,
      nextAction: 'Configure an AgenticosCore Plausible API token only if Plausible should be the fallback or primary analytics source.',
    }
  }

  const baseUrl = process.env.PLAUSIBLE_API_BASE_URL || 'https://plausible.io'
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
      configured: token.name,
      httpStatus: response.status,
      reason: redact(body?.error || body?.message || response.statusText).slice(0, 240),
      nextAction: `Verify the Plausible token can read site_id ${site}.`,
    }
  }
  return {
    status: 'ok',
    source: 'plausible_stats_api',
    configured: token.name,
    siteId: site,
    metrics: Object.fromEntries(Object.entries(body.results || {}).map(([key, value]) => [key, value?.value ?? value])),
    nextAction: 'Plausible is available as AgenticosCore analytics source.',
  }
}

const propertyEnv = envValue(GA4_PROPERTY_ENV)
const propertyId = readArg('property', propertyEnv?.value || DEFAULT_PROPERTY_ID)
const siteEnv = envValue(PLAUSIBLE_SITE_ENV)
const plausibleSiteId = readArg('site', siteEnv?.value || DEFAULT_SITE_ID)
const outPath = readArg('out', '')

const [ga4, plausible] = await Promise.all([
  ga4Doctor(propertyId),
  plausibleDoctor(plausibleSiteId),
])

const result = {
  generatedAt: new Date().toISOString(),
  product: 'AgenticosCore',
  ga4Property: {
    propertyId,
    source: propertyEnv?.name || 'default',
    expectedEnv: GA4_PROPERTY_ENV,
  },
  plausibleSite: {
    siteId: plausibleSiteId,
    source: siteEnv?.name || 'default',
    expectedEnv: PLAUSIBLE_SITE_ENV,
  },
  ga4,
  plausible,
  decision: {
    restored: ga4.status === 'ok' || plausible.status === 'ok',
    primaryCandidate: ga4.status === 'ok' ? 'ga4' : plausible.status === 'ok' ? 'plausible' : null,
    blocker: ga4.status !== 'ok' && plausible.status !== 'ok'
      ? 'AgenticosCore still needs GA4 property access or a valid Plausible token.'
      : null,
  },
}

const output = `${JSON.stringify(result, null, 2)}\n`
if (outPath) {
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, output, 'utf8')
}
process.stdout.write(output)
