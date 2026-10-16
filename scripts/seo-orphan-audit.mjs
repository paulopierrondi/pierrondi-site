/** Read-only HTML link graph for the 32 URLs reported by Ahrefs (AGE-4006). */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { APPS } from '../app/apps/[slug]/_apps.ts'

const base = process.env.TARGET_URL || 'https://www.pierrondi.dev'
const targets = [...Object.keys(APPS).map(slug => `/apps/${slug}`), '/en/answers', '/design/library']
const sources = ['/', '/en', '/en/portfolio', '/portfolio', '/apps', '/design']
const graph = new Map()
const rows = []

function internalPath(href) {
  const url = new URL(href.replaceAll('&amp;', '&'), base)
  if (url.origin !== new URL(base).origin && !['pierrondi.dev', 'www.pierrondi.dev'].includes(url.hostname)) return null
  return url.pathname.replace(/\/$/, '') || '/'
}

for (const path of sources) {
  const raw = execFileSync('curl', ['-sS', '--max-time', '25', '-w', '\n__CODE__%{http_code}', base + path], { encoding: 'utf8', maxBuffer: 10e6 })
  const [html, status] = raw.split('\n__CODE__')
  const links = new Set([...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(match => internalPath(match[1])).filter(Boolean))
  graph.set(path, links)
  rows.push({ path, status: +status, links: [...links] })
}

const reachable = new Set(['/'])
let previous = -1
while (previous !== reachable.size) {
  previous = reachable.size
  for (const path of [...reachable]) for (const link of graph.get(path) || []) reachable.add(link)
}
const orphans = targets.filter(path => !reachable.has(path))
const unavailableSources = rows.filter(row => row.status !== 200).map(row => row.path)
const result = { base, targets: targets.length, reachableTargets: targets.length - orphans.length, orphans, unavailableSources, sources: rows }
if (process.env.AUDIT_OUTPUT) writeFileSync(process.env.AUDIT_OUTPUT, JSON.stringify(result, null, 2))
console.log(JSON.stringify({ targets: result.targets, reachableTargets: result.reachableTargets, orphans, unavailableSources }, null, 2))
process.exitCode = orphans.length || unavailableSources.length ? 1 : 0
