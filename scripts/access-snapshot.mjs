#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { createHash, createSign } from 'node:crypto'
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
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }
const COMMON_GEO_PATHS = [
  /^\/answers(?:\/|$)/,
  /^\/answers\.json$/,
  /^\/llms\.txt$/,
  /^\/sitemap\.xml$/,
  /^\/robots\.txt$/,
]
const COMMON_TECHNICAL_PATHS = [
  /^\/(?:_next|assets|static|images|img|fonts|api\/health|health)(?:\/|$)/,
  /^\/(?:favicon\.ico|apple-touch-icon|site\.webmanifest|manifest\.json)$/,
  /^\/\.well-known\//,
]
const COMMON_LEGAL_PATHS = [/^\/(?:privacy|privacidade|terms|termos)(?:\/|$)/]
const SECURITY_SCAN_PATHS = [
  /^\/+xmlrpc\.php$/,
  /^\/+wp-config\.php$/i,
  /^\/+wp-config\.php\.(?:bak|backup|old|save|txt)$/i,
  /^\/+wp-json(?:\/|$)/i,
  /^\/+(?:wp-admin|wp-login\.php|wp-content|wp-includes|wordpress|wp|cms|blog|news|site|test|backup|old)(?:\/|$)/i,
  /^\/+.*\/wp-includes\/wlwmanifest\.xml$/i,
  /^\/+(?:[^/?#]+\/)*components\/com_jce(?:\/|$)/i,
  /^\/+administrator(?:\/|$)/i,
  /^\/+(?:phpmyadmin|pma|adminer|server-status)(?:\/|$)/i,
  /^\/+\.(?:aws|azure|bash_history|config|dev\.vars|docker|env|git|hg|npmrc|ssh|svn|vscode)(?:[./_-]|$)/i,
  /^\/+(?:[^/?#]+\/)+\.env(?:[._-]|$)/i,
  /^\/+(?:backend|frontend|server|app|client|src)\/\.(?:aws|azure|config|dev\.vars|docker|env|git|hg|npmrc|ssh|svn|vscode)(?:[./_-]|$)/i,
  /^\/+(?:backup|dump|database|db)(?:[._-]?(?:sql|sqlite|sqlite3|tar|tar\.gz|tgz|zip|gz|bak|backup|old))?$/i,
  /^\/+(?:database|db)_backup\.sql$/i,
  /^\/+(?:server|private|ssl|tls)\.key$/i,
  /^\/+(?:[^/?#]+\/)*(?:firebase|firebase-adminsdk|gcp-credentials|google-credentials|google-service-account|service-account|key|keyfile)\.json$/i,
  /^\/+user_secrets\.ya?ml$/i,
  /^\/+(?:secrets?|credentials?|private|config|configuration)(?:[._-]?(?:php|json|ya?ml|ini|txt|bak|backup|old|production|prod|local|dev))?$/i,
  /^\/+config(?:[./_-]|$)/i,
  /^\/+docker-compose\.ya?ml$/i,
  /^\/+etc\/(?:ssl\/private|passwd|shadow)(?:\/|$)/i,
  /^\/+actuator\/(?:env|heapdump|metrics|prometheus|shutdown)(?:\/|$)/i,
  /^\/+admin(?:\/|$)/i,
  /^\/+(?:_vti_pvt|cgi-bin)(?:\/|$)/i,
  /^\/+(?:phpinfo|info)(?:\.php)?$/i,
  /^\/+api\/(?:\.env|\.git|server-status|common\.js|config\.js|secrets?\.json|credentials?\.json)$/i,
  /^\/+api\/(?:config|env|secrets?|credentials?)(?:\/|$)/i,
  /^\/+env(?:\/|$)/i,
  /^\/+api\/(?:\*|auth\/\*)$/i,
  /^\/+curl\/[a-z0-9_-]{24,}$/i,
]
const KNOWN_ASSET_PROBE_PATHS = [
  /^\/+\.vite\/manifest\.json$/i,
  /^\/+(?:account|appsettings|local\.settings|settings)\.json$/i,
  /^\/+(?:package|package-lock|yarn\.lock|pnpm-lock)\.(?:json|ya?ml)$/i,
  /^\/+(?:assets|static|js|css)\/.+\.(?:js|css)\.map$/i,
  /^\/+.+\.map$/i,
  /^\/+(?:[^/?#]+\/)*(?:debug|error|laravel|npm|yarn|storage)(?:[._-]?\d*)?\.log$/i,
]
const BENIGN_MONITOR_PROBE_PATHS = [
  /^\/+\.well-known\/traffic-advice$/i,
  /^\/+ads\.txt$/i,
  /^\/+app-ads\.txt$/i,
  /^\/+apps\/definitely-not-a-real-app(?:-[a-z0-9-]+)?$/i,
]
const EXPECTED_AUTH_PROBE_RULES = {
  agenticoscore: [
    /^\/api\/v1\/(?:me|me\/onboarding|market-intelligence)(?:\/|$)/,
    /^\/conversions\.(?:csv|json)$/i,
  ],
}
// Endpoints where a non-GET method is a REAL user action (form posts, event
// intake, checkout APIs). A 4xx here is a genuine breakage and must stay
// actionable. Read pages that merely signal conversion demand (e.g.
// /diagnostico, /contato, /pricing) are NOT here on purpose: bots POST to them
// constantly and the app rightly 404s those probes.
const WRITE_ENDPOINT_RULES = {
  agenticoscore: [/^\/(?:lead|event|scorecard|checkout|checkout\.json)(?:\/|$)/, /^\/api\/(?:lead|scorecard|checkout)(?:\/|$)/],
  pierrondi: [/^\/api\/(?:contact|lead|automation-control|control-tower)(?:\/|$)/],
  cantustudio: [/^\/api\/(?:checkout|lead|signup)(?:\/|$)/],
  faithschool: [/^\/api\/(?:billing\/checkout|lead|checkout|signup|subscribe)(?:\/|$)/],
}
const PRODUCT_INTENT_RULES = {
  pierrondi: {
    commercial: [
      /^\/$/,
      /^\/(?:about|paulo|whypaulo|atuacao|en\/atuacao|fso|bradesco-26|itau|portfolio|precos|produto-digital|tech-partner|automacoes|marketing-os)(?:\/|$)/,
    ],
    conversion: [/^\/(?:contato|en\/contato|quiz|calculadora)(?:\/|$)/, /^\/api\/(?:contact|lead|automation-control|control-tower)(?:\/|$)/],
  },
  cantustudio: {
    commercial: [
      /^\/$/,
      /^\/(?:answers|ai-search|guias|satb|arranjo|arranjos|musicxml|pricing|precos|planos|choral|choir|hymn-arranger|satb-arranger|satb-arrangement-app|musicxml-harmonization|harmonizar-melodia-online|kit-de-ensaio|gerar-arranjo-satb)(?:\/|$)/,
    ],
    conversion: [
      /^\/(?:checkout|sign-up|signup|pricing|precos|planos|app|gerar-arranjo-satb|harmonizar-melodia-online|kit-de-ensaio)(?:\/|$)/,
      /^\/api\/(?:checkout|lead|signup)(?:\/|$)/,
    ],
  },
  agenticoscore: {
    commercial: [/^\/$/, /^\/(?:diagnostico|plano-de-acao-comercial|app|answers)(?:\/|$)/],
    conversion: [/^\/(?:scorecard|checkout|checkout\.json|diagnostico|lead|event)(?:\/|$)/, /^\/api\/(?:lead|scorecard|checkout)(?:\/|$)/],
  },
  faithschool: {
    commercial: [/^\/$/, /^\/(?:registro-de-frequencia-homeschool|homeschool-laws|curriculum|planner|devotional|pricing)(?:\/|$)/],
    conversion: [/^\/(?:checkout|signup|sign-up|pricing|subscribe)(?:\/|$)/, /^\/api\/(?:lead|checkout|signup|subscribe)(?:\/|$)/],
  },
}

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
      ga4PropertyId: '543380598',
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
      ga4PropertyId: '527930560',
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
  // ACCESS_SNAPSHOT_SOURCES_CWD makes the snapshot hermetic on machines that
  // don't have the per-service worktrees (CI runs with mocked provider CLIs).
  const cwd = process.env.ACCESS_SNAPSHOT_SOURCES_CWD || source.cwd
  if (!existsSync(cwd)) {
    return { ok: false, error: `missing cwd ${cwd}`, lines: [] }
  }

  const args =
    source.provider === 'railway'
      ? [...source.args, '--since', since, '--lines', String(limit)]
      : [...source.args, '--since', since, '--limit', String(limit)]

  try {
    const output = execFileSync(source.provider === 'railway' ? 'railway' : 'vercel', args, {
      cwd,
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
  const raw = parseJsonLine(line)
  if (!raw) return null
  return source.provider === 'railway' ? normalizeRailwayLog(raw) : normalizeVercelLog(raw)
}

function parseJsonLine(line) {
  try {
    return JSON.parse(line)
  } catch {
    return null
  }
}

function normalizeRailwayLog(raw) {
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

function normalizeVercelLog(raw) {
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

function cleanPath(value) {
  const pathOnly = String(value || '/').split('?')[0].split('#')[0] || '/'
  return pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`
}

function matchesAny(pathValue, patterns = []) {
  return patterns.some((pattern) => pattern.test(pathValue))
}

function rowIntent(source, row) {
  const pathValue = cleanPath(row.path)
  const rules = PRODUCT_INTENT_RULES[source.id] || {}

  if (matchesAny(pathValue, SECURITY_SCAN_PATHS) || matchesAny(pathValue, KNOWN_ASSET_PROBE_PATHS) || matchesAny(pathValue, BENIGN_MONITOR_PROBE_PATHS)) return 'technical'
  if (matchesAny(pathValue, rules.conversion)) return 'conversion'
  if (matchesAny(pathValue, COMMON_GEO_PATHS)) return 'geo'
  if (matchesAny(pathValue, rules.commercial)) return 'commercial'
  if (matchesAny(pathValue, COMMON_LEGAL_PATHS)) return 'legal'
  if (matchesAny(pathValue, COMMON_TECHNICAL_PATHS) || pathValue.includes('.')) return 'technical'
  return 'other'
}

function classifyHttpIssue(source, row, intent) {
  const pathValue = cleanPath(row.path)
  const status = Number(row.status || 0)
  if (status < 400) return null

  if (matchesAny(pathValue, SECURITY_SCAN_PATHS) || matchesAny(pathValue, KNOWN_ASSET_PROBE_PATHS) || matchesAny(pathValue, BENIGN_MONITOR_PROBE_PATHS)) {
    return {
      bucket: 'known_noise',
      reason: matchesAny(pathValue, BENIGN_MONITOR_PROBE_PATHS)
        ? 'benign_monitor_or_optional_file_probe'
        : matchesAny(pathValue, KNOWN_ASSET_PROBE_PATHS)
          ? 'asset_or_config_probe_noise'
          : 'security_scan_noise',
      actionable: false,
      evidenceKey: `${status} ${pathValue}`,
    }
  }

  const authRules = EXPECTED_AUTH_PROBE_RULES[source.id] || []
  if ((status === 401 || status === 403) && matchesAny(pathValue, authRules)) {
    return {
      bucket: 'expected_auth',
      reason: 'expected_protected_api_probe',
      actionable: false,
      evidenceKey: `${status} ${pathValue}`,
    }
  }

  // Non-GET/HEAD 4xx on paths that are not real write endpoints are scanner/form
  // probes (e.g. `POST /` answered 404 by design). They are not growth regressions:
  // real users reach commercial pages with GET/HEAD. Genuine write endpoints
  // (POST /lead, /scorecard, /event, checkout...) stay actionable via WRITE_ENDPOINT_RULES.
  const httpMethod = String(row.method || 'GET').toUpperCase()
  const writeRules = WRITE_ENDPOINT_RULES[source.id] || []
  if (status < 500 && httpMethod !== 'GET' && httpMethod !== 'HEAD' && !matchesAny(pathValue, writeRules)) {
    return {
      bucket: 'known_noise',
      reason: 'non_get_probe_noise',
      actionable: false,
      evidenceKey: `${status} ${pathValue}`,
    }
  }

  if (status >= 500) {
    return {
      bucket: 'server_error',
      reason: 'server_error',
      actionable: true,
      evidenceKey: `${status} ${pathValue}`,
    }
  }

  return {
    bucket: intent === 'commercial' || intent === 'conversion' || intent === 'geo' ? 'public_growth_4xx' : 'other_4xx',
    reason: `${intent}_http_${status}`,
    actionable: true,
    evidenceKey: `${status} ${pathValue}`,
  }
}

function addProviderOpportunity(opportunities, source, result) {
  if (result.ok) return
  opportunities.push({
    priority: 'high',
    area: 'monitoring',
    action: `Restore provider log access for ${source.label}.`,
    why: 'Without provider logs the hourly monitor cannot detect crawl, traffic or production regressions.',
  })
}

function addActionableErrorOpportunity(opportunities, intent) {
  const actionableErrorCount = intent.actionableErrorCount || 0
  if (actionableErrorCount <= 0) return
  opportunities.push({
    priority: 'high',
    area: 'technical_seo',
    action: `Fix or intentionally redirect ${actionableErrorCount} recent actionable 4xx/5xx requests.`,
    why: 'Broken URLs waste crawl budget and can block GEO/SEO pages from being trusted by search and answer engines.',
    evidence: topEntries(intent.actionableErrorPaths, 5),
  })
}

function addSecurityNoiseOpportunity(opportunities, intent, rawErrorCount) {
  const knownNoiseErrorCount = intent.knownNoiseErrorCount || 0
  const actionableErrorCount = intent.actionableErrorCount || 0
  if (rawErrorCount <= 0 || actionableErrorCount > 0 || knownNoiseErrorCount <= 0) return
  opportunities.push({
    priority: 'low',
    area: 'security_noise',
    action: `Keep filtering ${knownNoiseErrorCount} known auth/security/asset-probe 4xx requests out of growth alerts.`,
    why: 'Protected API probes, commodity scans and intentionally missing source maps should not page growth or SEO workflows when public endpoints are healthy.',
    evidence: topEntries(intent.knownNoiseErrorPaths, 5),
  })
}

function addAiCrawlerOpportunity(opportunities, source, intent) {
  if (intent.aiCrawlerRequests <= 0) return
  opportunities.push({
    priority: 'medium',
    area: 'geo',
    action: `Expand internal links from AI-visited pages into the strongest commercial pages for ${source.label}.`,
    why: 'AI crawlers already reached the site; the next gain is making answer pages point clearly to product and conversion pages.',
    evidence: topEntries(intent.aiCrawlerPaths, 5),
  })
}

function addSeoGeoBridgeOpportunity(opportunities, source, intent) {
  if (intent.geoRequests <= 0 || intent.commercialRequests !== 0) return
  opportunities.push({
    priority: 'medium',
    area: 'seo_geo_bridge',
    action: `Add stronger commercial CTAs and cross-links from GEO pages for ${source.label}.`,
    why: 'Discovery traffic is arriving on answer/indexing surfaces, but the sampled window did not show commercial page demand.',
    evidence: topEntries(intent.geoPaths, 5),
  })
}

function addConversionOpportunity(opportunities, source, intent) {
  if (intent.conversionRequests <= 0) return
  opportunities.push({
    priority: 'medium',
    area: 'conversion_tracking',
    action: `Audit lead/signup/checkout events on the active conversion paths for ${source.label}.`,
    why: 'These paths are getting demand; every hit needs GA4/server-side event coverage before budget scales.',
    evidence: topEntries(intent.conversionPaths, 5),
  })
}

function addFaviconOpportunity(opportunities, source, intent) {
  if (!topEntries(intent.errorPaths, 3).some((item) => item.key.includes('/favicon.ico'))) return
  opportunities.push({
    priority: 'low',
    area: 'technical_polish',
    action: `Ship a valid favicon for ${source.label}.`,
    why: 'It removes noisy 404s from logs and keeps health checks focused on real SEO/product issues.',
  })
}

function buildSourceOpportunities(source, intent, result) {
  const opportunities = []
  const statusCounts = Object.fromEntries([...intent.statuses.entries()])
  const rawErrorCount = (statusCounts['4xx'] || 0) + (statusCounts['5xx'] || 0)
  addProviderOpportunity(opportunities, source, result)
  addActionableErrorOpportunity(opportunities, intent)
  addSecurityNoiseOpportunity(opportunities, intent, rawErrorCount)
  addAiCrawlerOpportunity(opportunities, source, intent)
  addSeoGeoBridgeOpportunity(opportunities, source, intent)
  addConversionOpportunity(opportunities, source, intent)
  addFaviconOpportunity(opportunities, source, intent)

  return opportunities
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
    .slice(0, 6)
}

function incrementMap(map, key, amount = 1) {
  map.set(key, (map.get(key) || 0) + amount)
}

function createSummaryTracker() {
  return {
    statuses: new Map(),
    paths: new Map(),
    hosts: new Map(),
    agents: new Map(),
    unique: new Set(),
    intentCounts: new Map(),
    commercialPaths: new Map(),
    conversionPaths: new Map(),
    geoPaths: new Map(),
    aiCrawlerPaths: new Map(),
    errorPaths: new Map(),
    actionableErrorPaths: new Map(),
    knownNoiseErrorPaths: new Map(),
    issueBuckets: new Map(),
    botRequests: 0,
    aiCrawlerRequests: 0,
    actionableErrorCount: 0,
    knownNoiseErrorCount: 0,
    slowestMs: 0,
  }
}

function recordIssue(tracker, issue) {
  if (!issue) return
  incrementMap(tracker.errorPaths, issue.evidenceKey)
  incrementMap(tracker.issueBuckets, issue.bucket)
  if (issue.actionable) {
    tracker.actionableErrorCount += 1
    incrementMap(tracker.actionableErrorPaths, issue.evidenceKey)
    return
  }
  tracker.knownNoiseErrorCount += 1
  incrementMap(tracker.knownNoiseErrorPaths, issue.evidenceKey)
}

function recordIntentPath(tracker, intent, pathValue) {
  if (intent === 'commercial') incrementMap(tracker.commercialPaths, pathValue)
  if (intent === 'conversion') incrementMap(tracker.conversionPaths, pathValue)
  if (intent === 'geo') incrementMap(tracker.geoPaths, pathValue)
}

function recordRow(tracker, source, row) {
  const pathValue = cleanPath(row.path)
  const intent = rowIntent(source, row)
  incrementMap(tracker.intentCounts, intent)
  incrementMap(tracker.statuses, statusBucket(row.status))
  incrementMap(tracker.paths, `${row.status} ${pathValue}`)
  if (row.host) incrementMap(tracker.hosts, row.host)
  if (row.userAgent) incrementMap(tracker.agents, row.userAgent.slice(0, 90))
  if (row.uniqueKey) tracker.unique.add(row.uniqueKey)
  if (isBot(row.userAgent)) tracker.botRequests += 1
  if (isAiCrawler(row.userAgent)) {
    tracker.aiCrawlerRequests += 1
    if (Number(row.status || 0) < 400 && intent !== 'technical') {
      incrementMap(tracker.aiCrawlerPaths, pathValue)
    }
  }
  recordIntentPath(tracker, intent, pathValue)
  recordIssue(tracker, classifyHttpIssue(source, row, intent))
  if (row.durationMs && row.durationMs > tracker.slowestMs) tracker.slowestMs = row.durationMs
}

function buildIntentSnapshot(tracker) {
  return {
    counts: Object.fromEntries([...tracker.intentCounts.entries()].sort()),
    commercialRequests: tracker.intentCounts.get('commercial') || 0,
    conversionRequests: tracker.intentCounts.get('conversion') || 0,
    geoRequests: tracker.intentCounts.get('geo') || 0,
    technicalRequests: tracker.intentCounts.get('technical') || 0,
    aiCrawlerRequests: tracker.aiCrawlerRequests,
    statuses: tracker.statuses,
    commercialPaths: tracker.commercialPaths,
    conversionPaths: tracker.conversionPaths,
    geoPaths: tracker.geoPaths,
    aiCrawlerPaths: tracker.aiCrawlerPaths,
    errorPaths: tracker.errorPaths,
    actionableErrorPaths: tracker.actionableErrorPaths,
    knownNoiseErrorPaths: tracker.knownNoiseErrorPaths,
    issueBuckets: tracker.issueBuckets,
    actionableErrorCount: tracker.actionableErrorCount,
    knownNoiseErrorCount: tracker.knownNoiseErrorCount,
  }
}

function formatIntentSnapshot(intent) {
  return {
    counts: intent.counts,
    commercialRequests: intent.commercialRequests,
    conversionRequests: intent.conversionRequests,
    geoRequests: intent.geoRequests,
    technicalRequests: intent.technicalRequests,
    topCommercialPaths: topEntries(intent.commercialPaths, 8),
    topConversionPaths: topEntries(intent.conversionPaths, 8),
    topGeoPaths: topEntries(intent.geoPaths, 8),
    topAiCrawlerPaths: topEntries(intent.aiCrawlerPaths, 8),
    topErrorPaths: topEntries(intent.errorPaths, 8),
    actionableErrorCount: intent.actionableErrorCount,
    knownNoiseErrorCount: intent.knownNoiseErrorCount,
    issueBuckets: Object.fromEntries([...intent.issueBuckets.entries()].sort()),
    topActionableErrorPaths: topEntries(intent.actionableErrorPaths, 8),
    topKnownNoiseErrorPaths: topEntries(intent.knownNoiseErrorPaths, 8),
  }
}

function summarize(source) {
  const result = runSource(source)
  const rows = result.lines.map((line) => normalize(source, line)).filter(Boolean)
  const sampleLimitReached = result.ok && rows.length >= limit
  const tracker = createSummaryTracker()
  for (const row of rows) recordRow(tracker, source, row)
  const intent = buildIntentSnapshot(tracker)

  return {
    id: source.id,
    label: source.label,
    provider: source.provider,
    ok: result.ok,
    error: result.ok ? null : result.error,
    window: { since, limit },
    requests: rows.length,
    sample: {
      truncated: sampleLimitReached,
      note: sampleLimitReached
        ? `Provider returned the configured limit (${limit}); request counts and unique estimates are lower bounds for this source.`
        : 'Provider returned fewer rows than the configured limit; no truncation signal was observed.',
    },
    estimatedUniqueIps: tracker.unique.size || null,
    statuses: Object.fromEntries([...tracker.statuses.entries()].sort()),
    botRequests: tracker.botRequests,
    aiCrawlerRequests: tracker.aiCrawlerRequests,
    slowestMs: tracker.slowestMs || null,
    topHosts: topEntries(tracker.hosts, 5),
    topPaths: topEntries(tracker.paths, 12),
    topUserAgents: topEntries(tracker.agents, 8),
    intent: formatIntentSnapshot(intent),
    opportunities: buildSourceOpportunities(source, intent, result),
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
    'PORTFOLIO_GOOGLE_APPLICATION_CREDENTIALS',
    'PORTFOLIO_GOOGLE_SERVICE_ACCOUNT_JSON',
    'PORTFOLIO_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64',
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

  // Prefer the portfolio service account when present. Generic user tokens can
  // be scoped for Cloud only, which makes GA4/GSC return insufficient scopes.
  const serviceAccount = await serviceAccountAccessToken()
  if (serviceAccount.ok) {
    googleTokenCache = serviceAccount
    return googleTokenCache
  }

  const explicit = envValue(googleTokenEnvNames())
  if (explicit) {
    googleTokenCache = { ok: true, source: 'env_access_token', token: explicit.value }
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
    if (configured.name.endsWith('APPLICATION_CREDENTIALS') && existsSync(raw)) {
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

function googleAuthBlocked(provider) {
  return {
    status: `blocked_no_${provider}_auth`,
    expectedEnv: [...googleTokenEnvNames(), ...googleServiceAccountEnvNames()],
    note: 'Google read-only auth is not available in this runtime.',
  }
}

async function ga4Snapshot(source) {
  const property = envValue(ga4PropertyEnvNames(source))
  const propertyId = property?.value || source.analytics?.ga4PropertyId || ''
  if (!propertyId) {
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

  // Headline totals come from a date-only query. Google withholds anonymised
  // query rows, so a page+query breakdown can return zero rows while the
  // property still has clicks and impressions. Summing that breakdown reports
  // a low-volume site as dark instead of small.
  const headline = await searchAnalyticsRows(siteUrl, token, {
    ...dateRange,
    dimensions: ['date'],
    rowLimit: GSC_LOOKBACK_DAYS + GSC_LAG_DAYS + 1,
  })
  if (!headline.ok) {
    return { ok: false, siteUrl, httpStatus: headline.httpStatus, reason: headline.reason }
  }

  const breakdown = await searchAnalyticsRows(siteUrl, token, {
    ...dateRange,
    dimensions: ['page', 'query'],
    rowLimit: 25,
  })

  return {
    ok: true,
    status: 'ok',
    source: 'search_console_api',
    siteUrl,
    dateRange,
    rowCount: breakdown.ok ? breakdown.rows.length : 0,
    metrics: summarizeSearchConsoleRows(headline.rows),
    topRows: breakdown.ok ? topSearchConsoleRows(breakdown.rows) : [],
    ...(breakdown.ok ? {} : { breakdownReason: breakdown.reason }),
  }
}

async function searchAnalyticsRows(siteUrl, token, payload) {
  try {
    const { response, body } = await fetchJson(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      return {
        ok: false,
        httpStatus: response.status,
        reason: redact(body?.error?.message || response.statusText).slice(0, 240),
      }
    }
    return { ok: true, rows: Array.isArray(body.rows) ? body.rows : [] }
  } catch (error) {
    return { ok: false, reason: redact(error.message).slice(0, 240) }
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

function localizedNumber(row, keys) {
  const raw = keys.map((key) => row[key]).find((value) => value !== undefined && value !== '') || '0'
  return Number(String(raw).replace('%', '').replace(',', '.')) || 0
}

function firstLocalizedValue(row, keys) {
  return keys.map((key) => row[key]).find((value) => value) || ''
}

function parseSearchConsoleCsvRow(headers, line) {
  const cells = parseCsvLine(line)
  const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] || '']))
  const clicks = localizedNumber(row, ['clicks', 'cliques'])
  const impressions = localizedNumber(row, ['impressions', 'impressoes', 'impressões'])
  return {
    keys: [
      firstLocalizedValue(row, ['page', 'pagina', 'página']),
      firstLocalizedValue(row, ['query', 'consulta']),
    ],
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: localizedNumber(row, ['position', 'posicao', 'posição']),
  }
}

function summarizeSearchConsoleCsv(body) {
  const lines = body.split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return { rowCount: 0, metrics: summarizeSearchConsoleRows([]), topRows: [] }
  const headers = parseCsvLine(lines[0]).map((header) => header.trim().toLowerCase())
  const rows = lines.slice(1, 501).map((line) => parseSearchConsoleCsvRow(headers, line))
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

function ga4Opportunity(source) {
  if (source.ga4?.status === 'ok') return null
  return {
    product: source.label,
    priority: source.ga4?.status === 'blocked_no_ga4_property_id' ? 'high' : 'medium',
    area: 'ga4',
    action: source.ga4?.status === 'blocked_no_ga4_property_id'
      ? `Configure the numeric GA4 property ID for ${source.label}.`
      : `Restore GA4 Data API readback for ${source.label}.`,
    why: 'GA4 is the baseline for users, sessions, events and paid traffic learning loops.',
    status: source.ga4?.status || 'unknown',
  }
}

function searchConsoleOpportunity(source) {
  if (source.searchConsole?.status === 'ok' || source.searchConsole?.status === 'csv') return null
  return {
    product: source.label,
    priority: 'high',
    area: 'search_console',
    action: `Grant Search Console access to the portfolio service account for ${source.label}.`,
    why: 'Search Console is required to see organic queries, pages, impressions, CTR and indexing movement.',
    status: source.searchConsole?.status || 'unknown',
  }
}

function plausibleOpportunity(source) {
  if (source.plausible?.status === 'ok') return null
  if (source.ga4?.status === 'ok') return null
  return {
    product: source.label,
    priority: 'medium',
    area: 'plausible',
    action: `Configure a Plausible API token for ${source.label}, or explicitly keep GA4 as the primary source.`,
    why: 'Plausible can give fast lightweight traffic validation, but it should not block the GA4/Search Console path.',
    status: source.plausible?.status || 'unknown',
  }
}

function analyticsSourceOpportunities(source) {
  return [
    ga4Opportunity(source),
    searchConsoleOpportunity(source),
    plausibleOpportunity(source),
  ].filter(Boolean)
}

function analyticsOpportunities(analyticsSources) {
  return analyticsSources.flatMap(analyticsSourceOpportunities)
}

function buildActionBoard(sources, analyticsSources) {
  const sourceItems = sources.flatMap((source) =>
    source.opportunities.map((item) => ({
      product: source.label,
      ...item,
    })),
  )
  const analyticsItems = analyticsOpportunities(analyticsSources)
  const nextActions = [...sourceItems, ...analyticsItems]
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || a.product.localeCompare(b.product))
    .slice(0, 20)

  return {
    summary: {
      products: sources.length,
      requests: sources.reduce((sum, source) => sum + source.requests, 0),
      commercialRequests: sources.reduce((sum, source) => sum + (source.intent?.commercialRequests || 0), 0),
      conversionRequests: sources.reduce((sum, source) => sum + (source.intent?.conversionRequests || 0), 0),
      geoRequests: sources.reduce((sum, source) => sum + (source.intent?.geoRequests || 0), 0),
      aiCrawlerRequests: sources.reduce((sum, source) => sum + source.aiCrawlerRequests, 0),
      actionableErrors: sources.reduce((sum, source) => sum + (source.intent?.actionableErrorCount || 0), 0),
      knownNoiseErrors: sources.reduce((sum, source) => sum + (source.intent?.knownNoiseErrorCount || 0), 0),
      sampledSources: sources.filter((source) => source.sample?.truncated).length,
      providerLogFailures: sources.filter((source) => !source.ok).length,
      blockedAnalyticsItems: analyticsItems.length,
    },
    severity: operationSeverity(sources, analyticsItems),
    urgency: operationUrgency(sources, analyticsItems),
    routingPrimary: operationRoutingPrimary(sources, analyticsItems),
    slackPolicy: operationSlackPolicy(sources, analyticsItems),
    n8nWorkflowName: 'portfolio-access-geo-monitor-triage',
    valueSignals: operationValueSignals(sources),
    humanGates: operationHumanGates(analyticsItems),
    nextActions,
  }
}

function operationStats(report) {
  const summary = report.actionBoard.summary
  return {
    products: summary.products,
    requests: summary.requests,
    commercialRequests: summary.commercialRequests,
    conversionRequests: summary.conversionRequests,
    geoRequests: summary.geoRequests,
    aiCrawlerRequests: summary.aiCrawlerRequests,
    actionableErrors: summary.actionableErrors,
    knownNoiseErrors: summary.knownNoiseErrors,
    sampledSources: summary.sampledSources,
    providerLogFailures: summary.providerLogFailures,
    blockedAnalyticsItems: summary.blockedAnalyticsItems,
  }
}

function operationSeverity(sources, analyticsItems) {
  const providerFailures = sources.filter((source) => !source.ok).length
  const actionableErrors = sources.reduce((sum, source) => sum + (source.intent?.actionableErrorCount || 0), 0)
  const serverErrors = sources.reduce((sum, source) => sum + (source.statuses?.['5xx'] || 0), 0)
  if (providerFailures > 0 || serverErrors > 0) return 'critical'
  if (actionableErrors > 0) return 'warning'
  if (analyticsItems.length > 0 || sources.some((source) => (source.intent?.knownNoiseErrorCount || 0) > 0)) return 'notice'
  return 'ok'
}

function operationUrgency(sources, analyticsItems) {
  const severity = operationSeverity(sources, analyticsItems)
  if (severity === 'critical') return 'immediate'
  if (severity === 'warning') return 'same_day'
  if (analyticsItems.length > 0) return 'decision_batch'
  return 'routine'
}

function operationRoutingPrimary(sources, analyticsItems) {
  if (sources.some((source) => !source.ok || (source.statuses?.['5xx'] || 0) > 0)) return 'incident_or_fix_queue'
  if (sources.some((source) => (source.intent?.actionableErrorCount || 0) > 0)) return 'portfolio_growth_ops'
  if (analyticsItems.length > 0) return 'analytics_access_queue'
  return 'portfolio_growth_digest'
}

function operationSlackPolicy(sources, analyticsItems) {
  const severity = operationSeverity(sources, analyticsItems)
  if (severity === 'critical') return 'active_alert'
  if (severity === 'warning') return 'thread_update'
  return analyticsItems.length > 0 ? 'digest_only' : 'no_alert'
}

function operationValueSignals(sources) {
  return sources.flatMap((source) => {
    const signals = []
    if (source.aiCrawlerRequests > 0) {
      signals.push({
        product: source.label,
        kind: 'ai_crawler',
        count: source.aiCrawlerRequests,
        paths: source.intent?.topAiCrawlerPaths || [],
      })
    }
    if ((source.intent?.conversionRequests || 0) > 0) {
      signals.push({
        product: source.label,
        kind: 'conversion_path_demand',
        count: source.intent.conversionRequests,
        paths: source.intent?.topConversionPaths || [],
      })
    }
    return signals
  }).slice(0, 12)
}

function operationHumanGates(analyticsItems) {
  return analyticsItems
    .filter((item) => ['ga4', 'search_console', 'plausible'].includes(item.area))
    .map((item) => ({
      product: item.product,
      area: item.area,
      status: item.status,
      action: item.action,
    }))
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

function operationStateHash(value) {
  return createHash('sha256').update(stableJson(value)).digest('hex').slice(0, 16)
}

function operationGateSignature(humanGates) {
  return humanGates
    .map((gate) => ({
      product: gate.product,
      area: gate.area,
      status: gate.status,
    }))
    .sort((a, b) =>
      `${a.product}:${a.area}:${a.status}`.localeCompare(`${b.product}:${b.area}:${b.status}`),
    )
}

function operationRequiresHumanGate(item) {
  return ['ga4', 'search_console', 'plausible'].includes(item.area)
}

function buildOperationsQueue(actionBoard) {
  return actionBoard.nextActions.map((item) => {
    const humanGate = operationRequiresHumanGate(item)
    const route = item.area === 'technical_seo'
      ? 'incident_or_fix_queue'
      : humanGate
        ? 'analytics_access_queue'
        : item.area === 'security_noise'
          ? 'security_noise_digest'
          : 'portfolio_growth_ops'
    return {
      product: item.product,
      priority: item.priority,
      area: item.area,
      route,
      owner: route === 'incident_or_fix_queue'
        ? 'technical_ops'
        : route === 'analytics_access_queue'
          ? 'infra_analytics'
          : 'growth_ops',
      action: item.action,
      humanGate,
      evidence: item.evidence || [],
      status: item.status || null,
    }
  })
}

function envFlag(names, fallback = false) {
  const configured = envValue(names)
  if (!configured) return fallback
  return !['0', 'false', 'no', 'off'].includes(String(configured.value).toLowerCase())
}

function n8nWebhookConfig() {
  const configured = envValue([
    'ACCESS_SNAPSHOT_N8N_WEBHOOK_URL',
    'PORTFOLIO_ACCESS_N8N_WEBHOOK_URL',
    'N8N_PORTFOLIO_ACCESS_WEBHOOK_URL',
    'N8N_PORTFOLIO_GEO_WEBHOOK_URL',
  ])
  return {
    enabled: envFlag(['ACCESS_SNAPSHOT_N8N_DISPATCH', 'PORTFOLIO_ACCESS_N8N_DISPATCH'], false),
    webhookConfigured: Boolean(configured),
    webhookEnv: configured?.name || null,
    webhookUrl: configured?.value || null,
  }
}

function localLlmConfig() {
  const endpoint = envValue(['ACCESS_SNAPSHOT_LOCAL_LLM_ENDPOINT', 'PORTFOLIO_ACCESS_LOCAL_LLM_ENDPOINT'])
  const model = envValue(['ACCESS_SNAPSHOT_LOCAL_LLM_MODEL', 'PORTFOLIO_ACCESS_LOCAL_LLM_MODEL'])?.value || 'qwen3:14b'
  return {
    enabled: envFlag(['ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE', 'PORTFOLIO_ACCESS_LOCAL_LLM_TRIAGE'], false),
    endpoint: endpoint?.value || 'http://127.0.0.1:11434/api/generate',
    model,
  }
}

function localLlmEndpointConfig(config) {
  try {
    const url = new URL(config.endpoint)
    const localHosts = new Set(['127.0.0.1', 'localhost', '[::1]', '::1'])
    return {
      ok: url.protocol === 'http:' && localHosts.has(url.hostname),
      redacted: `${url.protocol}//${url.hostname}`,
    }
  } catch {
    return { ok: false, redacted: 'invalid_endpoint' }
  }
}

function buildLocalLlmPrompt(pulse) {
  return [
    'Return only compact JSON with keys: summary, recommendedAction, priority, rationale, actionItems.',
    'Never request secrets, deploys, ads, provider config changes or production mutations.',
    `Automation: ${pulse.automationId}`,
    `Severity: ${pulse.severity}`,
    `Urgency: ${pulse.urgency}`,
    `Metrics: ${JSON.stringify(pulse.metrics)}`,
    `Queue: ${JSON.stringify(pulse.queue.slice(0, 8))}`,
    `Human gates: ${JSON.stringify(pulse.humanGates.slice(0, 8))}`,
  ].join('\n')
}

function parseLocalLlmResult(body, pulse) {
  const raw = typeof body?.response === 'string' ? body.response : JSON.stringify(body || {})
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
      return normalizeLocalLlmResult(parsed, pulse)
    }
  } catch {}
  return fallbackLocalLlmResult(pulse)
}

function normalizeLocalLlmResult(result, pulse) {
  const actionItems = Array.isArray(result.actionItems) && result.actionItems.length
    ? result.actionItems
    : pulse.queue.slice(0, 3).map((item) => ({
        owner: item.owner,
        action: item.action,
        humanGate: item.humanGate,
      }))
  return {
    summary: safeText(result.summary) || fallbackLocalLlmResult(pulse).summary,
    recommendedAction: safeText(result.recommendedAction) || fallbackLocalLlmResult(pulse).recommendedAction,
    priority: safeText(result.priority) || pulse.urgency,
    rationale: safeText(result.rationale) || 'Derived from structured access monitor metrics and queue.',
    actionItems,
  }
}

function fallbackLocalLlmResult(pulse) {
  return {
    summary: `${pulse.metrics.requests} requests observed; ${pulse.metrics.actionableErrors} actionable errors, ${pulse.metrics.knownNoiseErrors} known-noise errors and ${pulse.metrics.blockedAnalyticsItems} analytics blockers.`,
    recommendedAction: pulse.queue[0]?.humanGate
      ? 'Batch the human-gated analytics access decisions before external changes.'
      : pulse.queue[0]?.action || 'Keep monitoring; no production action is required.',
    priority: pulse.urgency,
    rationale: 'Fallback generated locally because the local LLM returned no usable JSON.',
    actionItems: pulse.queue.slice(0, 3).map((item) => ({
      owner: item.owner,
      action: item.action,
      humanGate: item.humanGate,
    })),
  }
}

function buildActionReport(pulse, llmResult = null) {
  const result = llmResult || fallbackLocalLlmResult(pulse)
  return {
    decision: pulse.urgency,
    severity: pulse.severity,
    recommendedAction: result.recommendedAction,
    n8n: {
      workflow: pulse.n8n.workflow,
      mode: 'queue_only',
    },
    actionPlan: {
      doNow: pulse.queue.filter((item) => !item.humanGate).slice(0, 5),
      blockedByHumanGate: pulse.queue.filter((item) => item.humanGate).slice(0, 8),
    },
  }
}

function buildDecisionState(pulseBase) {
  const openItems = pulseBase.queue.filter((item) => !item.humanGate)
  const humanGateSignature = operationGateSignature(pulseBase.humanGates)
  const stateMaterial = {
    severity: pulseBase.severity,
    urgency: pulseBase.urgency,
    routingPrimary: pulseBase.routing.primary,
    metrics: {
      actionableErrors: pulseBase.metrics.actionableErrors,
      knownNoiseErrors: pulseBase.metrics.knownNoiseErrors,
      providerLogFailures: pulseBase.metrics.providerLogFailures,
      blockedAnalyticsItems: pulseBase.metrics.blockedAnalyticsItems,
    },
    openItems: openItems.map((item) => ({
      product: item.product,
      area: item.area,
      status: item.status,
      action: item.action,
    })),
    humanGates: humanGateSignature,
  }
  return {
    signature: operationStateHash(stateMaterial),
    humanGateSignature: operationStateHash(humanGateSignature),
    requiresHumanDecision: humanGateSignature.length > 0,
    hasOpenTechnicalWork: openItems.length > 0,
    repeatedGateCandidate: pulseBase.urgency === 'decision_batch' && openItems.length === 0,
    note: 'Use signature changes to distinguish new operational signals from repeated human-gated analytics blockers.',
  }
}

function safeText(value) {
  return redact(String(value || '').slice(0, 1000))
}

async function runLocalLlmTriage(pulse) {
  const config = localLlmConfig()
  if (!config.enabled) {
    return {
      status: 'disabled',
      actionReport: buildActionReport(pulse),
    }
  }

  const endpoint = localLlmEndpointConfig(config)
  if (!endpoint.ok) {
    return {
      status: 'blocked_nonlocal_endpoint',
      model: config.model,
      actionReport: buildActionReport(pulse),
      note: 'Local LLM triage only permits loopback HTTP endpoints.',
    }
  }

  try {
    const { response, body } = await fetchJson(config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        prompt: buildLocalLlmPrompt(pulse),
        stream: false,
        format: 'json',
      }),
    })
    if (!response.ok) {
      return {
        status: 'failed',
        model: config.model,
        reason: safeText(body?.error || body?.message || response.statusText),
        actionReport: buildActionReport(pulse),
      }
    }
    const result = parseLocalLlmResult(body, pulse)
    return {
      status: 'completed',
      model: config.model,
      result,
      actionReport: buildActionReport(pulse, result),
    }
  } catch (error) {
    return {
      status: 'failed',
      model: config.model,
      reason: safeText(error.message),
      actionReport: buildActionReport(pulse),
    }
  }
}

function buildN8nPayload(pulse) {
  return {
    event: 'portfolio.access_geo_monitor',
    automationId: pulse.automationId,
    generatedAt: pulse.generatedAt,
    dedupeKey: pulse.n8n.dedupeKey,
    severity: pulse.severity,
    urgency: pulse.urgency,
    routingPrimary: pulse.routing.primary,
    slackPolicy: pulse.routing.slackPolicy,
    metrics: pulse.metrics,
    decisionState: pulse.decisionState,
    valueSignals: pulse.valueSignals,
    queue: pulse.queue,
    humanGates: pulse.humanGates,
    llmActionReport: pulse.localLlm.delivery?.actionReport || buildActionReport(pulse),
    prompt_cache: pulse.prompt_cache,
  }
}

async function deliverN8n(pulse) {
  const config = n8nWebhookConfig()
  if (!config.enabled) return { status: 'disabled' }
  if (!config.webhookConfigured) {
    return {
      status: 'not_configured',
      expectedEnv: [
        'ACCESS_SNAPSHOT_N8N_WEBHOOK_URL',
        'PORTFOLIO_ACCESS_N8N_WEBHOOK_URL',
        'N8N_PORTFOLIO_ACCESS_WEBHOOK_URL',
        'N8N_PORTFOLIO_GEO_WEBHOOK_URL',
      ],
    }
  }

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildN8nPayload(pulse)),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    return response.ok
      ? { status: 'sent', httpStatus: response.status }
      : { status: 'failed', httpStatus: response.status }
  } catch (error) {
    return { status: 'failed', reason: safeText(error.message) }
  }
}

function buildLocalLlmPlan() {
  const config = localLlmConfig()
  return {
    enabled: config.enabled,
    model: config.model,
    delivery: { status: config.enabled ? 'pending' : 'disabled' },
  }
}

function buildN8nPlan(pulseBase) {
  const config = n8nWebhookConfig()
  return {
    workflow: 'portfolio-access-geo-monitor-triage',
    dispatchEnabled: config.enabled,
    webhookConfigured: config.webhookConfigured,
    webhookEnv: config.webhookEnv,
    dedupeKey: `${pulseBase.automationId}:${pulseBase.severity}:${pulseBase.decisionState.signature}`,
    delivery: { status: config.enabled ? 'pending' : 'disabled' },
  }
}

function buildOperationsPulse(report) {
  const base = {
    automationId: 'hourly-portfolio-access-geo-monitor',
    generatedAt: report.generatedAt,
    window: report.window,
    severity: report.actionBoard.severity,
    urgency: report.actionBoard.urgency,
    metrics: operationStats(report),
    routing: {
      primary: report.actionBoard.routingPrimary,
      slackPolicy: report.actionBoard.slackPolicy,
    },
    valueSignals: report.actionBoard.valueSignals,
    queue: buildOperationsQueue(report.actionBoard),
    humanGates: report.actionBoard.humanGates,
    prompt_cache: {
      strategy: 'cli-prefix-layout',
      prefix_version: '2026-06-30-portfolio-access-geo-monitor',
      cached_tokens: null,
    },
  }
  base.decisionState = buildDecisionState(base)
  return {
    ...base,
    localLlm: buildLocalLlmPlan(),
    n8n: buildN8nPlan(base),
  }
}

const sourceSummaries = SOURCES.map(summarize)
const analyticsSources = includeAnalytics
  ? (await Promise.all(SOURCES.map(sourceAnalyticsSnapshot))).filter(Boolean)
  : []
const actionBoard = buildActionBoard(sourceSummaries, analyticsSources)

const report = {
  generatedAt: new Date().toISOString(),
  window: { since, limit },
  note: includeAnalytics
    ? 'Provider-log snapshot plus best-effort analytics probes. Provider request counts are still not a replacement for GA4/Plausible/Search Console users, sessions or search clicks when those APIs are blocked.'
    : 'Provider-log snapshot. Counts are request-level, not a replacement for GA4/Plausible/Search Console users, sessions or search clicks.',
  sources: sourceSummaries,
  analytics: includeAnalytics
    ? {
        generatedAt: new Date().toISOString(),
        note: 'Read-only analytics probes. Secrets are never printed; missing credentials are reported as blockers with expected env names only.',
        sources: analyticsSources,
      }
    : { status: 'skipped' },
  actionBoard,
}
report.operationsPulse = buildOperationsPulse(report)
report.operationsPulse.localLlm.delivery = await runLocalLlmTriage(report.operationsPulse)
report.operationsPulse.n8n.delivery = await deliverN8n(report.operationsPulse)

const body = `${JSON.stringify(report, null, 2)}\n`
if (outPath) {
  const absolute = path.isAbsolute(outPath) ? outPath : path.join(ROOT, outPath)
  mkdirSync(path.dirname(absolute), { recursive: true })
  writeFileSync(absolute, body)
}

process.stdout.write(body)
