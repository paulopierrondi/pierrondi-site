#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DEFAULT_SINCE = '1h'
const DEFAULT_LIMIT = 250

const SOURCES = [
  {
    id: 'pierrondi',
    label: 'pierrondi.dev',
    provider: 'railway',
    cwd: '/Users/paulopierrondi/Projects/pierrondi-site',
    args: ['logs', '--http', '--service', 'pierrondi-site', '--json'],
  },
  {
    id: 'cantustudio',
    label: 'CantuStudio',
    provider: 'railway',
    cwd: '/Users/paulopierrondi/Projects/.deploy-worktrees/cantustudio-geo-prod',
    args: ['logs', '--http', '--service', 'cantustudio-frontend', '--json'],
  },
  {
    id: 'agenticoscore',
    label: 'AgenticosCore',
    provider: 'railway',
    cwd: '/Users/paulopierrondi/Projects/.deploy-worktrees/agenticoscore-geo-prod',
    args: ['logs', '--http', '--service', 'agentcore-revenue-ops', '--json'],
  },
  {
    id: 'faithschool',
    label: 'FaithSchool',
    provider: 'vercel',
    cwd: '/Users/paulopierrondi/Projects/faithschool-copilot',
    args: ['logs', '--project', 'faithschool-web', '--environment', 'production', '--json', '--no-branch'],
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

const report = {
  generatedAt: new Date().toISOString(),
  window: { since, limit },
  note: 'Provider-log snapshot. Counts are request-level, not a replacement for GA4/Plausible/Search Console users, sessions or search clicks.',
  sources: SOURCES.map(summarize),
}

const body = `${JSON.stringify(report, null, 2)}\n`
if (outPath) {
  const absolute = path.isAbsolute(outPath) ? outPath : path.join(ROOT, outPath)
  mkdirSync(path.dirname(absolute), { recursive: true })
  writeFileSync(absolute, body)
}

process.stdout.write(body)
