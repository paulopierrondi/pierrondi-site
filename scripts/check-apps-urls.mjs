#!/usr/bin/env node
// Verifies every slug in app/apps/[slug]/_apps.ts renders 200 at
// /apps/[slug] plus the 3 legal routes, and that an unknown slug returns 404.
//
// Usage:
//   node scripts/check-apps-urls.mjs                     # against $TARGET_URL or http://localhost:3000
//   TARGET_URL=https://www.pierrondi.dev npm run test:apps
//
// Exit code 0 on success, 1 on any failure. Designed to gate PRs and run nightly.

import { setTimeout as wait } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const TARGET = process.env.TARGET_URL?.replace(/\/$/, '') || 'http://localhost:3000'
const ROUTES = ['', '/privacy', '/support', '/terms']
const UNKNOWN_SLUG = 'definitely-not-a-real-app-zzz'
const TIMEOUT_MS = Number(process.env.CHECK_TIMEOUT_MS || 10000)
const RETRIES = Number(process.env.CHECK_RETRIES || 2)
const RETRY_DELAY_MS = 2000

async function loadSlugs() {
  // _apps.ts is TypeScript, parsed via regex (avoids needing tsx/ts-node in CI).
  const fs = await import('node:fs/promises')
  const file = path.join(process.cwd(), 'app/apps/[slug]/_apps.ts')
  const src = await fs.readFile(file, 'utf8')
  // Capture top-level keys inside the APPS const literal.
  // Keys are either bareword identifiers OR quoted strings (e.g. 'parabens-ia-br').
  const match = src.match(/export const APPS = \{([\s\S]*?)\}\s*satisfies/)
  if (!match) throw new Error('Could not locate APPS const in _apps.ts')
  const body = match[1]
  // Top-level keys appear at the start of a line (after optional whitespace),
  // followed by a colon and an opening `{`. Nested props use `name:`, `category:` etc.
  // We match indented keys at the catalog's first-level indentation only.
  const slugs = []
  for (const line of body.split('\n')) {
    const m = line.match(/^\s\s([A-Za-z][\w-]*|'[^']+'|"[^"]+")\s*:\s*\{/)
    if (!m) continue
    let key = m[1]
    if ((key.startsWith("'") && key.endsWith("'")) || (key.startsWith('"') && key.endsWith('"'))) {
      key = key.slice(1, -1)
    }
    slugs.push(key)
  }
  if (slugs.length === 0) throw new Error('Parsed 0 slugs from _apps.ts — regex needs review')
  return slugs
}

async function fetchStatus(url) {
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const controller = new AbortController()
    const timer = global.setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      const res = await fetch(url, { redirect: 'manual', signal: controller.signal })
      global.clearTimeout(timer)
      // Follow one redirect for trailing-slash normalization.
      if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
        const next = new URL(res.headers.get('location'), url).toString()
        const res2 = await fetch(next, { signal: controller.signal })
        return res2.status
      }
      return res.status
    } catch (err) {
      global.clearTimeout(timer)
      if (attempt === RETRIES) return `ERR:${err.code || err.name || 'fetch_failed'}`
      await wait(RETRY_DELAY_MS)
    }
  }
}

function color(code, s) {
  if (process.env.NO_COLOR) return s
  return `\x1b[${code}m${s}\x1b[0m`
}

async function main() {
  console.log(`[check-apps-urls] target=${TARGET}`)
  const slugs = await loadSlugs()
  console.log(`[check-apps-urls] catalog slugs (${slugs.length}): ${slugs.join(', ')}`)

  const failures = []
  const checks = []
  for (const slug of slugs) {
    for (const route of ROUTES) {
      checks.push({ slug, route, url: `${TARGET}/apps/${slug}${route}`, expect: 200 })
    }
  }
  checks.push({
    slug: UNKNOWN_SLUG,
    route: '(unknown)',
    url: `${TARGET}/apps/${UNKNOWN_SLUG}`,
    expect: 404,
  })

  for (const c of checks) {
    const status = await fetchStatus(c.url)
    const pass = status === c.expect
    const label = pass ? color(32, 'OK ') : color(31, 'FAIL')
    process.stdout.write(`${label}  ${String(status).padEnd(8)} expect=${c.expect}  ${c.slug}${c.route}\n`)
    if (!pass) failures.push({ ...c, got: status })
  }

  console.log('')
  if (failures.length > 0) {
    console.log(color(31, `[check-apps-urls] ${failures.length} failure(s):`))
    for (const f of failures) {
      console.log(`  - ${f.url} expected ${f.expect}, got ${f.got}`)
    }
    process.exit(1)
  }
  console.log(color(32, `[check-apps-urls] all ${checks.length} routes pass.`))
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error('[check-apps-urls] fatal:', err)
    process.exit(1)
  })
}
