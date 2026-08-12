import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3173'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/pierrondi-studio/creative-local')

const checks = [
  { name: 'desktop-1440', route: '/studio', width: 1440, height: 1000, locale: 'pt-BR' },
  { name: 'mobile-390', route: '/studio', width: 390, height: 844, locale: 'pt-BR' },
  { name: 'english-mobile-390', route: '/en/studio', width: 390, height: 844, locale: 'en-US' },
  { name: 'reduced-motion-mobile-390', route: '/studio', width: 390, height: 844, locale: 'pt-BR', reducedMotion: 'reduce' },
]

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl'],
})

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
  })
  await context.addInitScript(() => localStorage.setItem('cookie-consent', 'essential'))
  const page = await context.newPage()
  const diagnostics = attachDiagnostics(page)
  const response = await page.goto(`${baseUrl}${check.route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(700)

  const creative = page.locator('#sistema-criativo')
  const creativeImage = creative.locator('img').first()
  const imageLoaded = await waitForImage(creativeImage)
  await creative.scrollIntoViewIfNeeded()
  await page.waitForTimeout(350)
  await page.screenshot({ path: path.join(outputDir, `studio-creative-${check.name}.png`), fullPage: false })

  await page.goto(`${baseUrl}${check.route}#creative-video-factory`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  await page.locator('#creative-video-factory').scrollIntoViewIfNeeded()
  await page.waitForTimeout(180)
  const anchorImageLoaded = await waitForImage(page.locator('#sistema-criativo img').first())
  const metrics = await page.evaluate(() => ({
    h1Count: document.querySelectorAll('h1').length,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    creativeCards: document.querySelectorAll('#sistema-criativo article').length,
    creativeSystems: document.querySelectorAll('[data-studio-creative-system]').length,
    proofItems: document.querySelectorAll('[data-studio-proof-item]').length,
    creativeImages: document.querySelectorAll('#sistema-criativo img').length,
    creativeNav: document.querySelector('nav[aria-label] a[href="#sistema-criativo"]')?.getAttribute('href') ?? '',
    creativeImageSrc: document.querySelector('#sistema-criativo img')?.getAttribute('src') ?? '',
    creativeAnchorFound: Boolean(document.querySelector('#creative-video-factory')),
    creativeAnchorText: document.querySelector('#creative-video-factory h3')?.textContent?.trim() ?? '',
    creativeAnchorTop: document.querySelector('#creative-video-factory')?.getBoundingClientRect().top ?? -1,
    htmlLang: document.documentElement.lang,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }))

  await context.close()
  const expectedLang = check.locale === 'en-US' ? 'en-US' : 'pt-BR'
  const pass = response?.status() === 200
    && metrics.h1Count === 1
    && metrics.scrollWidth <= metrics.viewportWidth
    && metrics.creativeCards === 10
    && metrics.creativeSystems === 4
    && metrics.proofItems === 6
    && metrics.creativeImages === 8
    && metrics.creativeNav === '#sistema-criativo'
    && metrics.creativeImageSrc.includes('pierrondi-studio-production-dossier-v1.webp')
    && metrics.creativeAnchorFound
    && metrics.creativeAnchorText === 'Creative Video Factory'
    && metrics.creativeAnchorTop >= 110
    && metrics.creativeAnchorTop < metrics.viewportHeight
    && metrics.htmlLang === expectedLang
    && imageLoaded
    && anchorImageLoaded
    && diagnostics.consoleErrors.length === 0
    && diagnostics.pageErrors.length === 0
    && diagnostics.failedRequests.length === 0
    && (!check.reducedMotion || metrics.reducedMotion)

  return { ...check, status: response?.status(), imageLoaded, anchorImageLoaded, metrics, ...diagnostics, pass }
}

const report = { baseUrl, generatedAt: new Date().toISOString(), checks: [] }
for (const check of checks) report.checks.push(await inspect(check))
await browser.close()

report.pass = report.checks.every((check) => check.pass)
await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
