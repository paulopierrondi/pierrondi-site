import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const llmsText = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8')
const llmsFullText = await readFile(new URL('../public/llms-full.txt', import.meta.url), 'utf8')
const geoText = await readFile(new URL('../public/geo.md', import.meta.url), 'utf8')
const answersJson = JSON.parse(await readFile(new URL('../public/answers.json', import.meta.url), 'utf8'))
const robotsText = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')
const aiSearchPage = await readFile(
  new URL('../app/ai-search/page.tsx', import.meta.url),
  'utf8',
)

// Extract the set of product answer-brief slugs (host -> Set(slug)) from any text
// surface. Matches both the HTML form (/answers/slug) used by the page and the
// machine-readable .md form (/answers/slug.md) used by llms.txt / answers.json.
const PRODUCT_HOSTS = ['faithschool.app', 'cantustudio.app', 'agenticoscore.ai']
function answerSlugSets(text) {
  const sets = { 'faithschool.app': new Set(), 'cantustudio.app': new Set(), 'agenticoscore.ai': new Set() }
  const re = /https:\/\/(faithschool\.app|cantustudio\.app|agenticoscore\.ai)\/answers\/([a-z0-9-]+)/gi
  for (const match of text.matchAll(re)) sets[match[1]].add(match[2])
  return sets
}

test('pierrondi GEO files expose the product portfolio graph', () => {
  for (const product of ['FaithSchool', 'CantuStudio', 'AgenticosCore']) {
    assert.match(llmsText, new RegExp(product))
    assert.match(JSON.stringify(answersJson), new RegExp(product))
  }

  assert.equal(answersJson.entity.name, 'pierrondi.dev')
  assert.equal(answersJson.primaryHub, 'https://www.pierrondi.dev/ai-search')
  assert.ok(answersJson.answerDocs.length >= 10)
  assert.ok(answersJson.ownedSiteGraph.length >= 3)
  assert.deepEqual(answersJson.portfolioCatalog, {
    canonicalUrl: 'https://www.pierrondi.dev/portfolio',
    publicEntryCount: 77,
    categoryCount: 8,
    independentAppShowcaseCount: 20,
    multiLlmLaneCount: 6,
    scope: 'Distinct public-safe catalog entries typed by kind, evidence and visibility. Aliases, maintenance branches and reserved client or enterprise work are consolidated or excluded.',
  })
  for (const body of [llmsText, llmsFullText, geoText]) {
    assert.match(body, /77 distinct public-safe catalog entries/)
    assert.match(body, /six-lane Multi-LLM operating system/)
  }
})

test('machine-readable portfolio preserves the source count and exposes the 20-app independent showcase', () => {
  assert.equal(answersJson.appStorePortfolio.developerId, '1895717587')
  assert.equal(answersJson.appStorePortfolio.verifiedCount, 21)
  assert.equal(answersJson.appStorePortfolio.publicShowcaseCount, 20)
  assert.equal(answersJson.appsPortfolio.length, 20)
  assert.ok(answersJson.appsPortfolio.every((app) => app.appStoreUrl && app.image))
  assert.equal(answersJson.appsPortfolio.some((app) => app.name === 'SuperApp ServiceNow'), false)
  for (const body of [llmsText, llmsFullText, geoText]) {
    assert.match(body, /21 records/)
    assert.match(body, /20 independent apps/)
  }
})

test('appsPortfolio urls never invent /apps slugs without a local landing page', async () => {
  const appsCatalog = await readFile(new URL('../app/apps/[slug]/_apps.ts', import.meta.url), 'utf8')
  const match = appsCatalog.match(/export const APPS = \{([\s\S]*?)\}\s*satisfies/)
  assert.ok(match, 'APPS catalog must be parseable')
  const localSlugs = new Set()
  for (const line of match[1].split('\n')) {
    const m = line.match(/^\s\s([A-Za-z][\w-]*|'[^']+'|"[^"]+")\s*:\s*\{/)
    if (!m) continue
    let key = m[1]
    if ((key.startsWith("'") && key.endsWith("'")) || (key.startsWith('"') && key.endsWith('"'))) {
      key = key.slice(1, -1)
    }
    localSlugs.add(key)
  }

  const invented = []
  for (const app of answersJson.appsPortfolio) {
    const appsMatch = app.url.match(/^https:\/\/www\.pierrondi\.dev\/apps\/([^/?#]+)$/)
    if (appsMatch) {
      assert.ok(
        localSlugs.has(appsMatch[1]),
        `${app.name} points at /apps/${appsMatch[1]} but that slug is not in _apps.ts`,
      )
      continue
    }
    assert.equal(
      app.url,
      app.appStoreUrl,
      `${app.name} has no local /apps page so url must equal the App Store URL used on /portfolio`,
    )
    invented.push(app.name)
  }

  // Known App Store-only showcase apps (no /apps/<slug> landing).
  for (const name of [
    'CantuStudio',
    'Muse Edit - Style Closet',
    'VibeCode Kids',
    'Aura - Afirmacoes Diarias',
    'Álbum de Figurinhas 26',
    'Casa Clara',
    'Blockfront Tactics',
  ]) {
    assert.ok(invented.includes(name), `${name} should be remapped away from a 404 /apps URL`)
  }
})

test('public GEO files advertise /ai-search as the canonical hub', () => {
  const publicSurfaces = [
    ['llms.txt', llmsText],
    ['llms-full.txt', llmsFullText],
    ['geo.md', geoText],
    ['answers.json', JSON.stringify(answersJson)],
  ]

  for (const [name, body] of publicSurfaces) {
    assert.match(body, /https:\/\/www\.pierrondi\.dev\/ai-search/)
    assert.doesNotMatch(body, /https:\/\/www\.pierrondi\.dev\/ai-search-portfolio/, `${name} should not advertise the legacy hub URL`)
    // Bare /apps is a redirect hub, not an indexable page. Machine files must
    // not re-advertise it as a crawl target (Ahrefs 2026-08-28 live 404).
    assert.doesNotMatch(
      body,
      /https:\/\/www\.pierrondi\.dev\/apps(?![/\w-])/,
      `${name} should not advertise a bare /apps hub URL`,
    )
  }
})

test('Luar do Campo delivery evidence stays aligned across public AI surfaces', () => {
  const publicSurfaces = [
    ['ai-search page', aiSearchPage],
    ['llms.txt', llmsText],
    ['llms-full.txt', llmsFullText],
    ['geo.md', geoText],
    ['answers.json', JSON.stringify(answersJson)],
  ]

  for (const [name, body] of publicSurfaces) {
    assert.match(body, /Luar do Campo/, `${name} should name the public functional storefront`)
    assert.match(body, /luar-do-campo-demo\.vercel\.app/, `${name} should cite the public storefront`)
  }

  const project = answersJson.projectGraph.find((item) => item.name === 'Luar do Campo')
  assert.ok(project)
  assert.equal(project.url, 'https://www.pierrondi.dev/portfolio#luar-do-campo')
  assert.equal(project.publicProductUrl, 'https://luar-do-campo-demo.vercel.app')
  assert.match(project.description, /Successfully delivered by Paulo Pierrondi/i)
  assert.doesNotMatch(project.description, /\bdemo\b/i)
  assert.doesNotMatch(project.description, /revenue|conversion|sales generated|production client store/i)
})

test('product answer-brief citations are identical across hub page, llms.txt and answers.json', () => {
  // The /ai-search page, llms.txt and answers.json are three owned-media
  // surfaces that must cite the SAME set of commercial answer pages per product.
  // They drifted apart before (different AgenticosCore/FaithSchool subsets); this
  // guard keeps them unified so crawlers, AI answer engines and humans see one signal.
  const page = answerSlugSets(aiSearchPage)
  const llms = answerSlugSets(llmsText)
  const answers = answerSlugSets(JSON.stringify(answersJson))

  for (const host of PRODUCT_HOSTS) {
    const pageSlugs = [...page[host]].sort()
    const llmsSlugs = [...llms[host]].sort()
    const answersSlugs = [...answers[host]].sort()
    assert.ok(pageSlugs.length > 0, `expected at least one answer brief for ${host}`)
    assert.deepEqual(llmsSlugs, pageSlugs, `llms.txt answer briefs for ${host} must match the hub page`)
    assert.deepEqual(answersSlugs, pageSlugs, `answers.json answer briefs for ${host} must match the hub page`)
  }
})

test('robots allows answer-engine retrieval while preserving private route blocks', () => {
  for (const agent of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot']) {
    assert.match(robotsText, new RegExp(`User-agent: ${agent}`))
  }

  for (const privatePath of ['/api/', '/control_tower', '/bradesco-26', '/itau']) {
    assert.match(robotsText, new RegExp(`Disallow: ${privatePath.replace('/', '\\/')}`))
  }
})
