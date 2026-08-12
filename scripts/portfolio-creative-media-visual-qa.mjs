import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3108'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/portfolio-creative-media/local')

const checks = [
  { name: 'desktop-1440', route: '/portfolio', width: 1440, height: 1000, locale: 'pt-BR' },
  { name: 'mobile-390', route: '/portfolio', width: 390, height: 844, locale: 'pt-BR' },
  { name: 'english-mobile-390', route: '/en/portfolio', width: 390, height: 844, locale: 'en-US' },
  { name: 'reduced-motion-mobile-390', route: '/portfolio', width: 390, height: 844, locale: 'pt-BR', reducedMotion: 'reduce' },
]

const expectedIds = [
  'creative-forge',
  'creative-video-factory',
  'content-engine',
  'brand-os',
]

const expectedAssets = [
  'feature-graphic.png',
  'pierrondi-studio-review-console-v1.webp',
  'pierrondi-studio-storyboard-atlas-v1.webp',
  'storefront-desktop.png',
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })

function attachDiagnostics(page) {
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    const requestUrl = new URL(request.url())
    if (requestUrl.origin === new URL(baseUrl).origin) {
      failedRequests.push(`${request.method()} ${requestUrl.pathname} ${request.failure()?.errorText ?? ''}`)
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
  const diagnostics = attachDiagnostics(page)
  const response = await page.goto(`${baseUrl}${check.route}`, { waitUntil: 'networkidle' })
  const category = page.getByRole('button', { name: /Creative & Media/ })
  await category.click()

  const shelf = page.locator('[data-creative-media-shelf]')
  await shelf.scrollIntoViewIfNeeded()
  await shelf.waitFor({ state: 'visible', timeout: 15000 })
  const images = shelf.locator('img')
  await Promise.all((await images.all()).map((image) => image.evaluate(async (node) => {
    if (node.complete) return node.naturalWidth > 0
    await new Promise((resolve) => {
      node.addEventListener('load', resolve, { once: true })
      node.addEventListener('error', resolve, { once: true })
      setTimeout(resolve, 5000)
    })
    return node.naturalWidth > 0
  })))
  await page.screenshot({ path: path.join(outputDir, `creative-media-${check.name}.png`), fullPage: false })

  const metrics = await page.evaluate(() => ({
    h1Count: document.querySelectorAll('h1').length,
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    creativeMediaCards: document.querySelectorAll('[data-creative-media-shelf] a').length,
    creativeMediaImages: document.querySelectorAll('[data-creative-media-shelf] img').length,
    creativeMediaHrefs: Array.from(document.querySelectorAll('[data-creative-media-shelf] a')).map((item) => item.getAttribute('href')),
    creativeMediaSources: Array.from(document.querySelectorAll('[data-creative-media-shelf] img')).map((item) => item.getAttribute('src') ?? ''),
    catalogCards: document.querySelectorAll('article[id^="catalog-"]').length,
    selectedCategory: document.querySelector('[data-category="creative-media"]')?.getAttribute('data-category') ?? '',
    shelfTop: document.querySelector('[data-creative-media-shelf]')?.getBoundingClientRect().top ?? -1,
    htmlLang: document.documentElement.lang,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }))

  const imagesLoaded = await Promise.all((await images.all()).map((image) => image.evaluate((node) => node.complete && node.naturalWidth > 0)))
  await context.close()
  const isEnglish = check.locale === 'en-US'
  const expectedPrefix = isEnglish ? '/en/studio#' : '/studio#'
  const pass = response?.status() === 200
    && metrics.h1Count === 1
    && metrics.scrollWidth <= metrics.viewportWidth
    && metrics.creativeMediaCards === 4
    && metrics.creativeMediaImages === 4
    && metrics.catalogCards === 9
    && metrics.selectedCategory === 'creative-media'
    && metrics.shelfTop >= 0
    && expectedIds.every((id) => metrics.creativeMediaHrefs.includes(`${expectedPrefix}${id}`))
    && expectedAssets.every((asset) => metrics.creativeMediaSources.some((source) => source.includes(asset)))
    && metrics.htmlLang === (isEnglish ? 'en-US' : 'pt-BR')
    && imagesLoaded.every(Boolean)
    && diagnostics.consoleErrors.length === 0
    && diagnostics.pageErrors.length === 0
    && diagnostics.failedRequests.length === 0
    && (!check.reducedMotion || metrics.reducedMotion)

  return { ...check, status: response?.status(), metrics, imagesLoaded, ...diagnostics, pass }
}

const report = { baseUrl, generatedAt: new Date().toISOString(), checks: [] }
for (const check of checks) report.checks.push(await inspect(check))
await browser.close()

report.pass = report.checks.every((check) => check.pass)
await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
