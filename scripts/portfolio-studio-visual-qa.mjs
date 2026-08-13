import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3108'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/portfolio-studio/local')

const checks = [
  { name: 'desktop-1440', route: '/portfolio', width: 1440, height: 1000, locale: 'pt-BR' },
  { name: 'mobile-390', route: '/portfolio', width: 390, height: 844, locale: 'pt-BR' },
  { name: 'english-mobile-390', route: '/en/portfolio', width: 390, height: 844, locale: 'en-US' },
  { name: 'reduced-motion-mobile-390', route: '/portfolio', width: 390, height: 844, locale: 'pt-BR', reducedMotion: 'reduce' },
  { name: 'no-js-desktop-1440', route: '/portfolio', width: 1440, height: 1000, locale: 'pt-BR', javaScriptEnabled: false },
]

const studioAssets = [
  'pierrondi-studio-production-dossier-v1.webp',
  'pierrondi-studio-storyboard-atlas-v1.webp',
  'pierrondi-studio-review-console-v1.webp',
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })

function attachDiagnostics(page, { allowDisabledScripts = false } = {}) {
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    const requestUrl = new URL(request.url())
    const disabledScript = allowDisabledScripts
      && request.resourceType() === 'script'
      && request.failure()?.errorText === 'csp'
    if (requestUrl.origin === new URL(baseUrl).origin && !disabledScript) {
      failedRequests.push(`${request.method()} ${requestUrl.pathname} ${request.failure()?.errorText ?? ''}`)
    }
  })

  return { consoleErrors, pageErrors, failedRequests }
}

async function waitForImage(image) {
  await image.waitFor({ state: 'visible', timeout: 15000 })
  return image.evaluate(async (node) => {
    if (node.complete) return node.naturalWidth > 0
    await new Promise((resolve) => {
      node.addEventListener('load', resolve, { once: true })
      node.addEventListener('error', resolve, { once: true })
      setTimeout(resolve, 5000)
    })
    return node.naturalWidth > 0
  })
}

async function inspect(check) {
  const context = await browser.newContext({
    viewport: { width: check.width, height: check.height },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    locale: check.locale,
    reducedMotion: check.reducedMotion ?? 'no-preference',
    javaScriptEnabled: check.javaScriptEnabled ?? true,
  })
  await context.addInitScript(() => localStorage.setItem('cookie-consent', 'essential'))
  const page = await context.newPage()
  const diagnostics = attachDiagnostics(page, { allowDisabledScripts: check.javaScriptEnabled === false })
  const response = await page.goto(`${baseUrl}${check.route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(700)

  const heroStudioPhoto = page.locator('[class*="heroEvidence"] img[src*="pierrondi-studio-production-dossier-v1.webp"]')
  const heroStudioLoaded = await waitForImage(heroStudioPhoto)
  const heroStudioVisibility = await heroStudioPhoto.evaluate((image) => {
    const rect = image.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0
  })

  const english = check.locale === 'en-US'
  const shortcutsLabel = english ? 'Portfolio shortcuts' : 'Atalhos do portfólio'
  await page
    .getByRole('navigation', { name: shortcutsLabel, exact: true })
    .getByRole('link', { name: 'Studio', exact: true })
    .click()
  await page.waitForTimeout(360)

  const spotlight = page.locator('#studio-visual')
  const images = spotlight.locator('img')
  const imageLoaded = await Promise.all((await images.all()).map(waitForImage))
  await page.screenshot({ path: path.join(outputDir, `portfolio-studio-${check.name}.png`), fullPage: false })

  const metrics = await page.evaluate(() => ({
    h1Count: document.querySelectorAll('h1').length,
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heroStudioPhoto: document.querySelectorAll('[class*="heroEvidence"] img[src*="pierrondi-studio-production-dossier-v1.webp"]').length,
    spotlightFrames: document.querySelectorAll('[data-portfolio-studio-frame]').length,
    spotlightImages: document.querySelectorAll('#studio-visual img').length,
    spotlightHref: document.querySelector('#studio-visual a')?.getAttribute('href') ?? '',
    spotlightHeading: document.querySelector('#portfolio-studio-title')?.textContent?.trim() ?? '',
    spotlightNote: document.querySelector('#studio-visual p:last-child')?.textContent?.trim() ?? '',
    anchorHash: window.location.hash,
    spotlightTop: document.querySelector('#studio-visual')?.getBoundingClientRect().top ?? -1,
    spotlightHeadingTop: document.querySelector('#portfolio-studio-title')?.getBoundingClientRect().top ?? -1,
    imageSources: Array.from(document.querySelectorAll('#studio-visual img')).map((image) => image.getAttribute('src') ?? ''),
    htmlLang: document.documentElement.lang,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }))

  await context.close()
  const expectedHref = english ? '/en/studio#sistema-criativo' : '/studio#sistema-criativo'
  const expectedHeading = english ? 'From notebook to final cut.' : 'Do caderno ao corte final.'
  const expectedNote = english ? 'not client work' : 'não são registros de cliente'
  const expectedLang = english ? 'en-US' : 'pt-BR'
  const pass = [
    response?.status() === 200,
    metrics.h1Count === 1,
    metrics.scrollWidth <= metrics.viewportWidth,
    metrics.heroStudioPhoto === 1,
    heroStudioLoaded,
    heroStudioVisibility,
    metrics.spotlightFrames === 3,
    metrics.spotlightImages === 3,
    metrics.spotlightHref === expectedHref,
    metrics.spotlightHeading === expectedHeading,
    metrics.spotlightNote.includes(expectedNote),
    metrics.anchorHash === '#studio-visual',
    metrics.spotlightTop >= 56,
    metrics.spotlightHeadingTop >= 72,
    studioAssets.every((asset) => metrics.imageSources.some((source) => source.includes(asset))),
    metrics.htmlLang === expectedLang,
    imageLoaded.every(Boolean),
    diagnostics.consoleErrors.length === 0,
    diagnostics.pageErrors.length === 0,
    diagnostics.failedRequests.length === 0,
    check.reducedMotion ? metrics.reducedMotion : true,
  ].every(Boolean)

  return { ...check, status: response?.status(), imageLoaded, heroStudioLoaded, heroStudioVisibility, metrics, ...diagnostics, pass }
}

const report = { baseUrl, generatedAt: new Date().toISOString(), checks: [] }
for (const check of checks) report.checks.push(await inspect(check))
await browser.close()

report.pass = report.checks.every((check) => check.pass)
await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
