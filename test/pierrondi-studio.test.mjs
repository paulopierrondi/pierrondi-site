import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'
import { STUDIO_COPY } from '../components/studio/studio-data.ts'
import { resolveLocalizedPath } from '../lib/i18n/site-language.ts'

const root = new URL('../', import.meta.url)
const portfolioData = await readFile(new URL('components/portfolio/portfolio-data.ts', root), 'utf8')
const projectsSection = await readFile(new URL('components/home-v2/sections/ProjectsSection.tsx', root), 'utf8')
const projectsSectionParts = await readFile(new URL('components/home-v2/sections/ProjectsSectionParts.tsx', root), 'utf8')
const homeNav = await readFile(new URL('components/home-v2/chrome/NavBar.tsx', root), 'utf8')
const homeV2 = await readFile(new URL('components/home-v2/HomeV2.tsx', root), 'utf8')
const publicNavigation = await readFile(new URL('components/public-navigation.ts', root), 'utf8')
const growthCore = await readFile(new URL('components/studio/StudioGrowthCore.tsx', root), 'utf8')
const feitosIndex = await readFile(new URL('app/feitos/FeitosIndexContent.tsx', root), 'utf8')
const sitemap = await readFile(new URL('app/sitemap.ts', root), 'utf8')
const robots = await readFile(new URL('public/robots.txt', root), 'utf8')
const cookieBanner = await readFile(new URL('components/CookieBanner.tsx', root), 'utf8')
const answers = JSON.parse(await readFile(new URL('public/answers.json', root), 'utf8'))

test('Pierrondi Studio has complete PT and EN public routes', async () => {
  await Promise.all([
    access(new URL('app/studio/page.tsx', root)),
    access(new URL('app/en/studio/page.tsx', root)),
  ])

  assert.equal(resolveLocalizedPath('/studio', 'en'), '/en/studio')
  assert.equal(resolveLocalizedPath('/en/studio', 'pt'), '/studio')
  assert.equal(resolveLocalizedPath('/studio', 'en', 'context=pilot', 'cases'), '/en/studio?context=pilot#cases')
})

test('Studio content keeps four capabilities, three cases, five stages, and white-label separate', () => {
  for (const lang of ['pt', 'en']) {
    const copy = STUDIO_COPY[lang]
    assert.equal(copy.fronts.length, 4)
    assert.equal(copy.cases.length, 3)
    assert.equal(copy.steps.length, 5)
    assert.match(copy.partnershipEyebrow, /WHITE-LABEL/i)
    assert.ok(copy.cases.every((item) => item.problem && item.solution && item.result))
  }

  assert.equal(STUDIO_COPY.pt.ctaButton, 'Vamos avaliar um projeto-piloto')
  assert.match(STUDIO_COPY.pt.positioning, /sistemas de crescimento executáveis/i)
})

test('one shared portfolio case powers the landing, portfolio, and feitos', () => {
  assert.equal(portfolioData.match(/id: 'pierrondi-studio'/g)?.length, 2)
  assert.match(portfolioData, /visual: 'pierrondi-studio'/)
  assert.match(portfolioData, /href: '\/studio'/)
  assert.match(portfolioData, /href: '\/en\/studio'/)
  assert.match(projectsSection, /PORTFOLIO_CASES\[lang\]/)
  assert.match(feitosIndex, /<ProjectsSection lang=\{lang\} \/>/)
})

test('landing exposes Studio directly and the visual uses an accessible WebGL system', () => {
  assert.match(homeV2, /<NavBar/)
  assert.match(homeNav, /PUBLIC_NAV_COPY/)
  assert.match(publicNavigation, /key: 'studio', label: 'Studio', href: '\/studio'/)
  assert.match(publicNavigation, /key: 'studio', label: 'Studio', href: '\/en\/studio'/)
  assert.match(projectsSectionParts, /Pierrondi Studio/)
  assert.match(projectsSectionParts, /const studioHref = lang === 'pt' \? '\/studio' : '\/en\/studio'/)
  assert.match(growthCore, /data-studio-growth-core/)
  assert.match(growthCore, /frameloop=\{reducedMotion \? 'demand' : 'always'\}/)
  assert.match(growthCore, /preserveDrawingBuffer: true/)
})

test('Studio is indexable while legacy private descendants remain blocked', () => {
  assert.doesNotMatch(robots, /^Disallow: \/studio$/m)
  assert.match(robots, /^Disallow: \/studio\/$/m)
  assert.doesNotMatch(cookieBanner, /startsWith\('\/studio'\)/)
  assert.match(cookieBanner, /startsWith\('\/studio\/'\)/)
  assert.match(sitemap, /path: '\/studio'/)
  assert.match(sitemap, /path: '\/en\/studio'/)
})

test('AI-search graph exposes Studio without unsupported claims', () => {
  const studio = answers.projectGraph.find((item) => item.name === 'Pierrondi Studio')
  assert.ok(studio)
  assert.equal(studio.url, 'https://www.pierrondi.dev/studio')
  assert.match(studio.description, /positioning, brand systems, multimedia content, CRM and AI automation/i)
  assert.doesNotMatch(studio.description, /revenue|conversion|guarantee|guaranteed/i)
})
