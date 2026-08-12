import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  CATALOG_CATEGORIES,
  MULTI_LLM_ROSTER,
  PORTFOLIO_CATALOG,
  PUBLIC_APP_STORE_APPS,
  portfolioCatalogSearchText,
  resolvePortfolioHref,
} from '../components/portfolio/portfolio-catalog.ts'

test('complete portfolio catalog is deduplicated, bilingual, and deeply described', () => {
  assert.ok(PORTFOLIO_CATALOG.length >= 70)
  assert.equal(new Set(PORTFOLIO_CATALOG.map((entry) => entry.id)).size, PORTFOLIO_CATALOG.length)
  assert.ok(Object.keys(CATALOG_CATEGORIES).length >= 8)

  for (const entry of PORTFOLIO_CATALOG) {
    assert.ok(entry.name.trim(), `${entry.id} must have a name`)
    assert.ok(entry.summary.pt.length >= 24, `${entry.id} needs substantive PT summary`)
    assert.ok(entry.summary.en.length >= 24, `${entry.id} needs substantive EN summary`)
    assert.ok(entry.proof.pt.length >= 30, `${entry.id} needs substantive PT evidence`)
    assert.ok(entry.proof.en.length >= 30, `${entry.id} needs substantive EN evidence`)
    assert.ok(entry.status.pt && entry.status.en, `${entry.id} needs localized status`)
    assert.ok(entry.technologies.length >= 3, `${entry.id} needs technologies`)
    assert.equal(entry.publicSafe, true, `${entry.id} must be explicitly public-safe`)
    assert.ok(entry.kind, `${entry.id} needs a product-level kind`)
    assert.ok(entry.evidence, `${entry.id} needs a provenance class`)
    assert.ok(entry.visibility, `${entry.id} needs a visibility class`)

    const visibleCopy = [
      entry.name,
      entry.summary.pt,
      entry.summary.en,
      entry.proof.pt,
      entry.proof.en,
      entry.status.pt,
      entry.status.en,
      entry.cta?.pt ?? '',
      entry.cta?.en ?? '',
    ].join(' ')
    assert.doesNotMatch(visibleCopy, /\bdemo\b/i, `${entry.id} must use product-grade public language`)
  }
})

test('catalog distinguishes products, components, labs, capabilities, and protected access', () => {
  const byId = new Map(PORTFOLIO_CATALOG.map((entry) => [entry.id, entry]))
  assert.deepEqual(
    [byId.get('wordpress-elementor-kit')?.kind, byId.get('wordpress-elementor-kit')?.evidence],
    ['capability', 'capability-artifact'],
  )
  assert.deepEqual(
    [byId.get('sap-training-studio')?.kind, byId.get('sap-training-studio')?.visibility],
    ['course', 'local'],
  )
  assert.deepEqual(
    [byId.get('qwen-code-lab')?.kind, byId.get('qwen-code-lab')?.visibility],
    ['lab', 'archived'],
  )
  assert.equal(byId.get('cotapulse')?.visibility, 'protected')
  assert.match(byId.get('cotapulse')?.status.en ?? '', /protected access/i)
})

test('catalog search corpus includes both locales and EN internal links stay localized', () => {
  const studio = PORTFOLIO_CATALOG.find((entry) => entry.id === 'pierrondi-studio')
  const kommo = PORTFOLIO_CATALOG.find((entry) => entry.id === 'kommo-whatsapp')
  const creativeVideo = PORTFOLIO_CATALOG.find((entry) => entry.id === 'creative-video-factory')
  const brandOs = PORTFOLIO_CATALOG.find((entry) => entry.id === 'brand-os')
  assert.ok(studio && kommo && creativeVideo && brandOs)
  assert.match(portfolioCatalogSearchText(studio), /Marca, conteúdo, CRM e IA/)
  assert.match(portfolioCatalogSearchText(studio), /Brand, content, CRM, and AI/)
  assert.equal(resolvePortfolioHref(studio, 'en'), '/en/studio')
  assert.equal(resolvePortfolioHref(kommo, 'en'), '/en/portfolio#kommo-whatsapp')
  assert.equal(resolvePortfolioHref({ href: '/' }, 'en'), '/en')
  assert.equal(resolvePortfolioHref({ href: '/feitos/sada-servicenow' }, 'en'), '/en/feitos')
  assert.equal(resolvePortfolioHref({ href: '/feitos/llm-inferencia' }, 'en'), '/en/feitos')
  assert.equal(resolvePortfolioHref(creativeVideo, 'en'), '/en/studio#creative-video-factory')
  assert.equal(resolvePortfolioHref(brandOs, 'en'), '/en/studio#brand-os')
})

test('creative media entries lead to inspectable Studio production systems', () => {
  const expected = {
    'creative-forge': '/studio#creative-forge',
    'creative-video-factory': '/studio#creative-video-factory',
    'content-engine': '/studio#content-engine',
    'brand-os': '/studio#brand-os',
  }

  for (const [id, href] of Object.entries(expected)) {
    const entry = PORTFOLIO_CATALOG.find((item) => item.id === id)
    assert.equal(entry?.href, href)
    assert.ok(entry?.cta?.pt)
    assert.ok(entry?.cta?.en)
  }
})

test('catalog search exposes only the designed clear control', () => {
  const css = readFileSync(
    new URL('../components/portfolio/PortfolioExperience.module.css', import.meta.url),
    'utf8',
  )
  assert.match(css, /input::\-webkit-search-cancel-button[\s\S]*appearance:\s*none/)
})

test('machine-readable portfolio totals stay aligned with the typed catalog', () => {
  const answers = JSON.parse(readFileSync(new URL('../public/answers.json', import.meta.url), 'utf8'))
  const surfaces = ['llms.txt', 'llms-full.txt', 'geo.md'].map((name) =>
    readFileSync(new URL(`../public/${name}`, import.meta.url), 'utf8'),
  )

  assert.equal(answers.portfolioCatalog.publicEntryCount, PORTFOLIO_CATALOG.length)
  assert.equal(answers.portfolioCatalog.categoryCount, Object.keys(CATALOG_CATEGORIES).length)
  assert.equal(answers.portfolioCatalog.independentAppShowcaseCount, PUBLIC_APP_STORE_APPS.length)
  assert.equal(answers.portfolioCatalog.multiLlmLaneCount, MULTI_LLM_ROSTER.length)
  for (const surface of surfaces) {
    assert.match(surface, new RegExp(`${PORTFOLIO_CATALOG.length} distinct public-safe catalog entries`))
  }
})

test('catalog keeps confidential work out and consolidates public product aliases', () => {
  const ids = new Set(PORTFOLIO_CATALOG.map((entry) => entry.id))
  for (const excluded of [
    'entrelinhas-reader',
    'nf-agent',
    'clinic-lead-recovery',
    'movimenta-store-cms',
    'streaming-web-player',
    'servicenow-superapp',
    'csdm-validator',
  ]) {
    assert.equal(ids.has(excluded), false, `${excluded} must stay off the public catalog`)
  }
  assert.equal(PORTFOLIO_CATALOG.filter((entry) => entry.id === 'cantustudio').length, 1)
  assert.equal(PORTFOLIO_CATALOG.filter((entry) => entry.id === 'faithschool').length, 1)
})

test('public App Store showcase excludes reserved enterprise work', () => {
  assert.equal(PUBLIC_APP_STORE_APPS.length, 20)
  assert.equal(PUBLIC_APP_STORE_APPS.some((app) => app.slug === 'superapp-servicenow'), false)
})

test('current Multi-LLM roster uses the approved six lanes only', () => {
  assert.deepEqual(
    MULTI_LLM_ROSTER.map((model) => model.name),
    ['Codex', 'Claude Code', 'Kimi K3', 'DeepSeek V4', 'GLM', 'Grok'],
  )
})

test('WordPress and Elementor are represented honestly as a capability pack', () => {
  const item = PORTFOLIO_CATALOG.find((entry) => entry.id === 'wordpress-elementor-kit')
  assert.ok(item)
  assert.deepEqual(item.technologies.slice(0, 2), ['WordPress', 'Elementor'])
  assert.match(item.proof.pt, /não é apresentado como case de cliente/i)
  assert.match(item.proof.en, /not presented as a client case/i)
})
