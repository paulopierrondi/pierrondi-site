// Fetch official app icons for the portfolio.
//
// Sources:
//  - App Store apps (app/apps/[slug]/_apps.ts entries with appStoreUrl):
//    iTunes Lookup API -> artworkUrl512, saved as public/app-icons/<slug>.png
//  - Owned web products (WEB_PRODUCTS below): apple-touch-icon fetched from
//    the product domain.
//
// Writes public/app-icons/manifest.json mapping slug -> { file, name, source }.
// Idempotent: re-running refreshes icons in place. Run: npm run icons:fetch

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const APPS_TS = path.join(ROOT, 'app/apps/[slug]/_apps.ts')
const OUT_DIR = path.join(ROOT, 'public/app-icons')
const MANIFEST = path.join(OUT_DIR, 'manifest.json')

const WEB_PRODUCTS = [
  { slug: 'cantustudio', name: 'CantuStudio', urls: ['https://cantustudio.app/apple-touch-icon.png', 'https://cantustudio.app/icon.png', 'https://cantustudio.app/favicon.png'] },
  { slug: 'faithschool-web', name: 'FaithSchool', urls: ['https://faithschool.app/apple-touch-icon.png', 'https://faithschool.app/icon.png'] },
  { slug: 'agenticoscore', name: 'AgenticosCore', urls: ['https://agenticoscore.ai/apple-touch-icon.png', 'https://agenticoscore.ai/icon.png', 'https://agenticoscore.ai/favicon.png'] },
]

async function parseStoreApps() {
  const src = await readFile(APPS_TS, 'utf8')
  const apps = []
  // Match each entry: 'slug': { ... name: '...', ... appStoreUrl: '...id123...' }
  const entryRe = /^\s{2}(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*\{([\s\S]*?)^\s{2}\},/gm
  let m
  while ((m = entryRe.exec(src))) {
    const slug = m[1] ?? m[2]
    const body = m[3]
    const name = body.match(/name:\s*'([^']+)'/)?.[1] ?? slug
    const storeId = body.match(/appStoreUrl:\s*'[^']*id(\d+)[^']*'/)?.[1]
    if (storeId) apps.push({ slug, name, storeId })
  }
  return apps
}

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = res.headers.get('content-type') ?? ''
  if (!type.startsWith('image/')) throw new Error(`not an image: ${type}`)
  const ext = type.includes('svg') ? 'svg' : type.includes('jpeg') ? 'jpg' : type.includes('webp') ? 'webp' : 'png'
  return { buf: Buffer.from(await res.arrayBuffer()), ext }
}

async function lookupArtwork(storeId) {
  for (const country of ['br', 'us']) {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${storeId}&country=${country}`, {
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) continue
    const data = await res.json()
    const hit = data.results?.[0]
    if (hit?.artworkUrl512 || hit?.artworkUrl100) {
      return {
        url: (hit.artworkUrl512 ?? hit.artworkUrl100).replace('100x100', '512x512'),
        trackName: hit.trackName,
      }
    }
  }
  return null
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const manifest = {}
  const failures = []

  for (const app of await parseStoreApps()) {
    try {
      const art = await lookupArtwork(app.storeId)
      if (!art) throw new Error('no lookup result')
      const { buf, ext } = await fetchBuffer(art.url)
      const file = `${app.slug}.${ext}`
      await writeFile(path.join(OUT_DIR, file), buf)
      manifest[app.slug] = { file, name: app.name, source: `appstore:${app.storeId}` }
      console.log(`ok  ${app.slug} <- App Store ${app.storeId} (${art.trackName ?? app.name})`)
    } catch (err) {
      failures.push(`${app.slug}: ${err.message}`)
      console.warn(`skip ${app.slug}: ${err.message}`)
    }
  }

  for (const product of WEB_PRODUCTS) {
    let done = false
    // Discover icon links from the product homepage <head> as extra candidates.
    const origin = new URL(product.urls[0]).origin
    try {
      const res = await fetch(origin, { redirect: 'follow', signal: AbortSignal.timeout(20000) })
      const html = await res.text()
      const links = [...html.matchAll(/<link[^>]+rel=["'](?:apple-touch-icon|icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/gi)]
        .map((match) => new URL(match[1], origin).href)
      product.urls.push(...links)
    } catch {
      // homepage unreachable; keep static candidates
    }
    for (const url of product.urls) {
      try {
        const { buf, ext } = await fetchBuffer(url)
        const file = `${product.slug}.${ext}`
        await writeFile(path.join(OUT_DIR, file), buf)
        manifest[product.slug] = { file, name: product.name, source: url }
        console.log(`ok  ${product.slug} <- ${url}`)
        done = true
        break
      } catch {
        // try next candidate URL
      }
    }
    if (!done) {
      failures.push(`${product.slug}: no icon found on domain`)
      console.warn(`skip ${product.slug}: no icon found on domain`)
    }
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`\nmanifest: ${Object.keys(manifest).length} icons, ${failures.length} failures`)
  if (failures.length) console.log(failures.map((f) => ` - ${f}`).join('\n'))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
