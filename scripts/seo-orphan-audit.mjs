/** Read-only HTML link graph for the 32 URLs reported by Ahrefs (AGE-4006). */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { APPS } from '../app/apps/[slug]/_apps.ts'

const base = process.env.TARGET_URL || 'https://www.pierrondi.dev'
const targets = [...Object.keys(APPS).map(slug => `/apps/${slug}`), '/en/answers', '/design/library']
const sources = ['/', '/en', '/en/portfolio', '/portfolio', '/apps', '/design']
const graph = new Map()
const rows = []
const appsDescriptionBounds = { min: 120, max: 160 }
let appsDescription = null

function decodeHtmlEntities(value) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0' }
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, reference) => {
    if (reference.startsWith('#')) {
      const codePoint = reference[1].toLowerCase() === 'x'
        ? Number.parseInt(reference.slice(2), 16)
        : Number.parseInt(reference.slice(1), 10)
      return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : entity
    }
    return named[reference.toLowerCase()] ?? entity
  })
}

function metaContent(html, key, expectedValue) {
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = new Map([...tag.matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
      .map(([, name, doubleQuoted, singleQuoted, unquoted]) => [
        name.toLowerCase(),
        decodeHtmlEntities(doubleQuoted ?? singleQuoted ?? unquoted ?? ''),
      ]))
    if (attributes.get(key) === expectedValue) return attributes.get('content') ?? null
  }
  return null
}

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

  if (path === '/apps') {
    const description = metaContent(html, 'name', 'description')
    const openGraphDescription = metaContent(html, 'property', 'og:description')
    const isValidLength = value => value !== null
      && value.length >= appsDescriptionBounds.min
      && value.length <= appsDescriptionBounds.max
    appsDescription = {
      path,
      minimumChars: appsDescriptionBounds.min,
      maximumChars: appsDescriptionBounds.max,
      descriptionChars: description?.length ?? null,
      openGraphDescriptionChars: openGraphDescription?.length ?? null,
      valid: isValidLength(description) && isValidLength(openGraphDescription),
    }
  }
}

const reachable = new Set(['/'])
let previous = -1
while (previous !== reachable.size) {
  previous = reachable.size
  for (const path of [...reachable]) for (const link of graph.get(path) || []) reachable.add(link)
}
const orphans = targets.filter(path => !reachable.has(path))
const unavailableSources = rows.filter(row => row.status !== 200).map(row => row.path)
const result = {
  base,
  targets: targets.length,
  reachableTargets: targets.length - orphans.length,
  orphans,
  unavailableSources,
  appsDescription,
  sources: rows,
}
if (process.env.AUDIT_OUTPUT) writeFileSync(process.env.AUDIT_OUTPUT, JSON.stringify(result, null, 2))
console.log(JSON.stringify({
  targets: result.targets,
  reachableTargets: result.reachableTargets,
  orphans,
  unavailableSources,
  appsDescription,
}, null, 2))
process.exitCode = orphans.length || unavailableSources.length || !appsDescription?.valid ? 1 : 0
