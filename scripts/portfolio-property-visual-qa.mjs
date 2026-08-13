import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3114'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/portfolio-property/local')
const productUrl = 'https://meta-busca-parceiros-production.up.railway.app/'

const checks = [
  { name: 'desktop-1440', route: '/portfolio', width: 1440, height: 1000, locale: 'pt-BR' },
  { name: 'mobile-390', route: '/portfolio', width: 390, height: 844, locale: 'pt-BR' },
  { name: 'english-mobile-390', route: '/en/portfolio', width: 390, height: 844, locale: 'en-US' },
  { name: 'reduced-motion-mobile-390', route: '/portfolio', width: 390, height: 844, locale: 'pt-BR', reducedMotion: 'reduce' },
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })

function collectDiagnostics(page) {
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    if (new URL(request.url()).origin === new URL(baseUrl).origin) {
      failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`)
    }
  })

  return { consoleErrors, pageErrors, failedRequests }
}

async function inspect(check) {
  const context = await browser.newContext({
    viewport: { width: check.width, height: check.height },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    locale: check.locale,
    reducedMotion: check.reducedMotion ?? 'no-preference',
  })
  await context.addInitScript(() => localStorage.setItem('cookie-consent', 'essential'))
  const page = await context.newPage()
  const diagnostics = collectDiagnostics(page)
  const response = await page.goto(`${baseUrl}${check.route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(650)

  const english = check.locale === 'en-US'
  const shortcuts = page.getByRole('navigation', {
    name: english ? 'Portfolio shortcuts' : 'Atalhos do portfólio',
    exact: true,
  })
  await shortcuts.getByRole('link', { name: english ? 'Property' : 'Imóveis', exact: true }).click()
  await page.waitForTimeout(420)

  const spotlight = page.locator('[data-property-partner-spotlight]')
  const metrics = await page.evaluate(({ productUrl: expectedProductUrl }) => {
    const section = document.querySelector('[data-property-partner-spotlight]')
    const studio = document.querySelector('#studio-visual')
    const shortcutNav = document.querySelector('[data-portfolio-section-nav]')
    const activeShortcut = shortcutNav?.querySelector('[aria-current="location"]')
    const primaryLink = section?.querySelector(`a[href="${expectedProductUrl}"]`)

    return {
      h1Count: document.querySelectorAll('h1').length,
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      htmlLang: document.documentElement.lang,
      hash: window.location.hash,
      spotlightTop: section?.getBoundingClientRect().top ?? -1,
      propertyVisuals: section?.querySelectorAll('[data-property-partner-visual]').length ?? 0,
      propertyCards: section?.querySelectorAll('[data-property]').length ?? 0,
      primaryHref: primaryLink?.getAttribute('href') ?? '',
      primaryTarget: primaryLink?.getAttribute('target') ?? '',
      boundary: section?.querySelector('article > p:last-child')?.textContent?.trim() ?? '',
      shortcutPosition: shortcutNav ? getComputedStyle(shortcutNav).position : '',
      shortcutCount: shortcutNav?.querySelectorAll('a').length ?? 0,
      activeHref: activeShortcut?.getAttribute('href') ?? '',
      propertyBeforeStudio: Boolean(section && studio && section.offsetTop < studio.offsetTop),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }
  }, { productUrl })

  await spotlight.screenshot({ path: path.join(outputDir, `portfolio-property-${check.name}.png`) })
  await context.close()

  const expectedLang = english ? 'en-US' : 'pt-BR'
  const expectedBoundary = english ? 'no live integration' : 'sem integração viva'
  const pass = [
    response?.status() === 200,
    metrics.h1Count === 1,
    metrics.scrollWidth <= metrics.viewportWidth,
    metrics.htmlLang === expectedLang,
    metrics.hash === '#property-partner-search-spotlight',
    metrics.spotlightTop >= 100,
    metrics.spotlightTop < check.height / 2,
    metrics.propertyVisuals === 1,
    metrics.propertyCards === 3,
    metrics.primaryHref === productUrl,
    metrics.primaryTarget === '_blank',
    metrics.boundary.includes(expectedBoundary),
    metrics.shortcutPosition === 'sticky',
    metrics.shortcutCount === 5,
    metrics.activeHref === '#property-partner-search-spotlight',
    metrics.propertyBeforeStudio,
    diagnostics.consoleErrors.length === 0,
    diagnostics.pageErrors.length === 0,
    diagnostics.failedRequests.length === 0,
    check.reducedMotion ? metrics.reducedMotion : true,
  ].every(Boolean)

  return { ...check, status: response?.status(), metrics, ...diagnostics, pass }
}

const report = { baseUrl, generatedAt: new Date().toISOString(), checks: [] }
for (const check of checks) report.checks.push(await inspect(check))
await browser.close()

report.pass = report.checks.every((check) => check.pass)
await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
