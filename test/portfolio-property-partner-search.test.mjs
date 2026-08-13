import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

const [
  data,
  catalog,
  experience,
  spotlight,
  visual,
  sectionNav,
  sectionNavStyles,
  answers,
  llms,
  llmsFull,
  geo,
] = await Promise.all([
  read('components/portfolio/portfolio-data.ts'),
  read('components/portfolio/portfolio-catalog.ts'),
  read('components/portfolio/PortfolioExperience.tsx'),
  read('components/portfolio/PortfolioRealEstateSpotlight.tsx'),
  read('components/portfolio/PropertyPartnerVisual.tsx'),
  read('components/portfolio/PortfolioSectionNav.tsx'),
  read('components/portfolio/PortfolioSectionNav.module.css'),
  read('public/answers.json'),
  read('public/llms.txt'),
  read('public/llms-full.txt'),
  read('public/geo.md'),
])

test('Meta Busca Parceiros is the first bilingual featured case with honest evidence', () => {
  assert.equal(data.match(/id: 'property-partner-search'/g)?.length, 2)
  assert.match(data, /Protótipo funcional que normaliza catálogos parceiros/)
  assert.match(data, /functional prototype that normalizes partner catalogs/)
  assert.match(data, /Doze imóveis sintéticos em duas fontes demonstrativas/)
  assert.match(data, /Twelve synthetic listings across two demonstration sources/)
  assert.equal(data.match(/https:\/\/meta-busca-parceiros-production\.up\.railway\.app\//g)?.length, 2)

  const ptCaseStart = data.indexOf("id: 'property-partner-search'")
  const ptStudioStart = data.indexOf("id: 'pierrondi-studio'", ptCaseStart)
  assert.ok(ptCaseStart > 0 && ptCaseStart < ptStudioStart)
  assert.doesNotMatch(data.slice(ptCaseStart, ptStudioStart), /integração viva|real partner integration|dados reais de parceiro/i)
})

test('real-estate product has a dedicated editorial spotlight and CSS-built inspectable visual', () => {
  assert.match(experience, /<PortfolioSectionNav lang=\{lang\} \/>/)
  assert.match(experience, /<PortfolioRealEstateSpotlight lang=\{lang\} reduceMotion=\{reduceMotion\} \/>/)
  assert.ok(experience.indexOf('<PortfolioRealEstateSpotlight') < experience.indexOf('<PortfolioStudioSpotlight'))
  assert.match(spotlight, /data-property-partner-spotlight/)
  assert.match(spotlight, /Demonstração controlada/)
  assert.match(spotlight, /Controlled demonstration/)
  assert.match(spotlight, /initial=\{false\}/)
  assert.match(visual, /BUSCA DE PARCEIROS/)
  assert.match(visual, /2 quartos até R\$ 400 mil/)
  assert.match(visual, /12 IMÓVEIS SINTÉTICOS/)
  assert.doesNotMatch(visual, /<Image|\.png|\.webp/)
})

test('portfolio shortcut nav exposes current location and preserves reduced-motion behavior', () => {
  assert.match(sectionNav, /IntersectionObserver/)
  assert.match(sectionNav, /aria-current=\{activeId === id \? 'location'/)
  for (const id of ['property-partner-search-spotlight', 'studio-visual', 'cases', 'catalogo', 'app-store']) {
    assert.match(sectionNav, new RegExp(id))
  }
  assert.match(sectionNavStyles, /position:\s*sticky/)
  assert.match(sectionNavStyles, /overflow-x:\s*auto/)
  assert.match(sectionNavStyles, /prefers-reduced-motion:\s*reduce/)
})

test('catalog and machine-readable surfaces expose the same bounded PropTech proof', () => {
  assert.match(catalog, /featured: true/)
  assert.match(catalog, /Protótipo funcional público/)
  assert.match(catalog, /two demonstration sources/)

  const answerGraph = JSON.parse(answers)
  const answerDoc = answerGraph.answerDocs.find((doc) => doc.id === 'portfolio-property-partner-search')
  const project = answerGraph.projectGraph.find((item) => item.name === 'Meta Busca Parceiros')
  assert.equal(answerDoc?.url, 'https://www.pierrondi.dev/portfolio#property-partner-search')
  assert.equal(project?.publicProductUrl, 'https://meta-busca-parceiros-production.up.railway.app/')
  assert.match(answerGraph.caveats.join(' '), /12 synthetic listings and two demonstration sources/)

  for (const surface of [llms, llmsFull, geo]) {
    assert.match(surface, /Meta Busca Parceiros/)
    assert.match(surface, /12 synthetic listings/)
    assert.match(surface, /meta-busca-parceiros-production\.up\.railway\.app/)
  }
})
