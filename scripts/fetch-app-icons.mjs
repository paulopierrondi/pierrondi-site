// Fetch official app icons for the portfolio.
//
// Sources:
//  - Every public app returned by Paulo's Apple developer page:
//    iTunes Lookup API -> artworkUrl512, saved as public/app-icons/<slug>.jpg
//  - Owned web products (WEB_PRODUCTS below): apple-touch-icon fetched from
//    the product domain.
//
// Writes:
//  - public/app-icons/manifest.json mapping slug -> { file, name, source }
//  - public/app-icons/app-store-catalog.json with the verified public catalog.
// Idempotent: re-running refreshes icons in place. Run: npm run icons:fetch

import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const OUT_DIR = path.join(ROOT, 'public/app-icons')
const MANIFEST = path.join(OUT_DIR, 'manifest.json')
const CATALOG = path.join(OUT_DIR, 'app-store-catalog.json')
const APPLE_DEVELOPER_ID = '1895717587'

// Preserve the routes already used by pierrondi.dev where a public app maps to
// an existing support/privacy slug. The remaining names receive stable slugs.
const APP_SLUGS = {
  '6769621331': 'bandle-br',
  '6764325629': 'faithschool',
  '6764287847': 'cantustudio-app',
  '6764715502': 'muse-edit',
  '6769732268': 'adivinha',
  '6773483083': 'vibecode-kids',
  '6772540994': 'caso-relampago-ai',
  '6769853592': 'aura-afirmacoes',
  '6782724792': 'album-figurinhas-26',
  '6772552531': 'lifttool-002',
  '6767297661': 'casa-clara',
  '6772517662': 'brewmate',
  '6764355044': 'investcoach',
  '6772747511': 'blockfront-tactics',
  '6772518398': 'chroma-ai',
  '6770047382': 'mytone',
  '6769599831': 'parabens-ia-br',
  '6772517083': 'snapread',
  '6768396384': 'superapp-servicenow',
  '6772552997': 'linguagil',
  '6772554818': 'supercode-005',
}

const WEB_PRODUCTS = [
  { slug: 'cantustudio', name: 'CantuStudio', urls: ['https://cantustudio.app/apple-touch-icon.png', 'https://cantustudio.app/icon.png', 'https://cantustudio.app/favicon.png'] },
  { slug: 'faithschool-web', name: 'FaithSchool', urls: ['https://faithschool.app/apple-touch-icon.png', 'https://faithschool.app/icon.png'] },
  { slug: 'agenticoscore', name: 'AgenticosCore', urls: ['https://agenticoscore.ai/apple-touch-icon.png', 'https://agenticoscore.ai/icon.png', 'https://agenticoscore.ai/favicon.png'] },
]

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function lookupDeveloperApps() {
  for (const country of ['br', 'us']) {
    const url = `https://itunes.apple.com/lookup?id=${APPLE_DEVELOPER_ID}&entity=software&country=${country}&limit=200`
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
    if (!res.ok) continue
    const data = await res.json()
    const apps = (data.results ?? []).filter((entry) => entry.wrapperType === 'software')
    if (apps.length) return { apps, country }
  }
  throw new Error(`no public apps found for Apple developer ${APPLE_DEVELOPER_ID}`)
}

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = res.headers.get('content-type') ?? ''
  if (!type.startsWith('image/')) throw new Error(`not an image: ${type}`)
  const ext = type.includes('svg') ? 'svg' : type.includes('jpeg') ? 'jpg' : type.includes('webp') ? 'webp' : 'png'
  return { buf: Buffer.from(await res.arrayBuffer()), ext }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const manifest = {}
  const failures = []
  const { apps, country } = await lookupDeveloperApps()
  const catalog = []

  for (const app of apps) {
    const trackId = String(app.trackId)
    const slug = APP_SLUGS[trackId] ?? slugify(app.trackName)
    const artworkUrl = app.artworkUrl512 ?? app.artworkUrl100
    try {
      if (!artworkUrl) throw new Error('no artwork URL')
      const { buf, ext } = await fetchBuffer(artworkUrl)
      const file = `${slug}.${ext}`
      await writeFile(path.join(OUT_DIR, file), buf)
      manifest[slug] = { file, name: app.trackName, source: `appstore:${trackId}` }
      catalog.push({
        slug,
        name: app.trackName,
        trackId,
        bundleId: app.bundleId,
        version: app.version,
        category: app.primaryGenreName,
        url: app.trackViewUrl,
        icon: `/app-icons/${file}`,
      })
      console.log(`ok  ${slug} <- App Store ${trackId} (${app.trackName})`)
    } catch (err) {
      failures.push(`${slug}: ${err.message}`)
      console.warn(`skip ${slug}: ${err.message}`)
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
  await writeFile(
    CATALOG,
    `${JSON.stringify({ developerId: APPLE_DEVELOPER_ID, storefront: country, count: catalog.length, apps: catalog }, null, 2)}\n`,
  )
  console.log(`\nmanifest: ${Object.keys(manifest).length} icons, ${failures.length} failures`)
  console.log(`catalog: ${catalog.length} public App Store apps (${country.toUpperCase()})`)
  if (failures.length) console.log(failures.map((f) => ` - ${f}`).join('\n'))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
