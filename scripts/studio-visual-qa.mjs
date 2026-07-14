import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3107'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/pierrondi-studio/local')

const viewports = [
  { name: 'mobile-320', width: 320, height: 720 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl'],
})
const report = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  viewports: [],
  integrations: null,
  reducedMotion: null,
}

function attachDiagnostics(page) {
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`)
  })

  return { consoleErrors, pageErrors, failedRequests }
}

async function settle(page, ms = 700) {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(ms)
}

async function createContext(options) {
  const context = await browser.newContext(options)
  await context.addInitScript(() => localStorage.setItem('cookie-consent', 'essential'))
  return context
}

async function inspectViewport(viewport) {
  const context = await createContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: 'pt-BR',
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  const diagnostics = attachDiagnostics(page)

  const response = await page.goto(`${baseUrl}/studio`, { waitUntil: 'domcontentloaded' })
  await settle(page)
  await page.screenshot({ path: path.join(outputDir, `studio-hero-${viewport.name}.png`), fullPage: false })

  await page.locator('#frentes').scrollIntoViewIfNeeded()
  await page.waitForTimeout(450)
  await page.screenshot({ path: path.join(outputDir, `studio-services-${viewport.name}.png`), fullPage: false })

  await page.locator('#cases').scrollIntoViewIfNeeded()
  await page.waitForTimeout(450)
  await page.screenshot({ path: path.join(outputDir, `studio-cases-${viewport.name}.png`), fullPage: false })

  await page.locator('nav[aria-label="Seções do Studio"] a[href="#cases"]').click()
  await page.waitForTimeout(900)

  const metrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    h1Count: document.querySelectorAll('h1').length,
    mainCount: document.querySelectorAll('main').length,
    serviceCards: document.querySelectorAll('#frentes article').length,
    caseCards: document.querySelectorAll('#cases article').length,
    processSteps: document.querySelectorAll('#metodo article').length,
    sectionLinks: document.querySelectorAll('nav[aria-label="Seções do Studio"] a').length,
    primaryCta: document.querySelector('main a[href^="/contato"]')?.getAttribute('href') ?? '',
    webglReady: document.querySelector('[data-studio-growth-core]')?.getAttribute('data-webgl-ready') ?? '',
    growthCoreCanvases: document.querySelectorAll('[data-studio-growth-core] canvas').length,
    visibleCookieBanners: [...document.querySelectorAll('[aria-label="Consentimento de cookies"]')]
      .filter((element) => element.getBoundingClientRect().height > 0).length,
    casesHeadingTop: document.querySelector('#studio-cases-title')?.getBoundingClientRect().top ?? -1,
  }))

  await context.close()
  const pass = response?.status() === 200
    && metrics.scrollWidth <= metrics.viewportWidth
    && metrics.h1Count === 1
    && metrics.mainCount === 1
    && metrics.serviceCards === 4
    && metrics.caseCards === 3
    && metrics.processSteps === 5
    && metrics.sectionLinks === 4
    && metrics.primaryCta.includes('studio-piloto')
    && metrics.webglReady === 'true'
    && metrics.growthCoreCanvases === 1
    && metrics.visibleCookieBanners === 0
    && metrics.casesHeadingTop >= 110
    && metrics.casesHeadingTop < metrics.viewportHeight
    && diagnostics.consoleErrors.length === 0
    && diagnostics.pageErrors.length === 0
    && diagnostics.failedRequests.length === 0

  return { ...viewport, status: response?.status(), metrics, ...diagnostics, pass }
}

for (const viewport of viewports) report.viewports.push(await inspectViewport(viewport))

const integrationContext = await createContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  locale: 'pt-BR',
  colorScheme: 'dark',
})
const integrationPage = await integrationContext.newPage()
const integrationDiagnostics = attachDiagnostics(integrationPage)

await integrationPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
await settle(integrationPage)
await integrationPage.locator('section[aria-labelledby="portfolio-home-title"]').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
await integrationPage.waitForTimeout(500)
await integrationPage.screenshot({ path: path.join(outputDir, 'home-studio-mobile-390.png'), fullPage: false })
const home = await integrationPage.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  selectedProject: document.querySelector('section[aria-labelledby="portfolio-home-title"] [role="tab"][aria-selected="true"] strong')?.textContent?.trim() ?? '',
  studioHref: document.querySelector('section[aria-labelledby="portfolio-home-title"] a[href="/studio"]')?.getAttribute('href') ?? '',
  navStudioHref: document.querySelector('header a[href="/studio"]')?.getAttribute('href') ?? '',
  growthCoreCanvases: document.querySelectorAll('section[aria-labelledby="portfolio-home-title"] [data-studio-growth-core] canvas').length,
  webglReady: document.querySelector('section[aria-labelledby="portfolio-home-title"] [data-studio-growth-core]')?.getAttribute('data-webgl-ready') ?? '',
}))

const desktopContext = await createContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  locale: 'pt-BR',
  colorScheme: 'dark',
})
const desktopPage = await desktopContext.newPage()
const desktopDiagnostics = attachDiagnostics(desktopPage)
await desktopPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
await settle(desktopPage, 900)
const desktopPortfolio = desktopPage.locator('section[aria-labelledby="portfolio-home-title"]')
await desktopPortfolio.evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
await desktopPage.waitForTimeout(700)
const desktopCore = desktopPortfolio.locator('[data-studio-growth-core]')
const desktopCanvas = desktopCore.locator('canvas')
const frameBefore = await desktopCanvas.evaluate((canvas) => canvas.toDataURL('image/png'))
const coreBox = await desktopCore.boundingBox()
if (coreBox) await desktopPage.mouse.move(coreBox.x + coreBox.width * 0.72, coreBox.y + coreBox.height * 0.32)
await desktopPage.waitForTimeout(650)
const frameAfter = await desktopCanvas.evaluate((canvas) => canvas.toDataURL('image/png'))
await desktopPage.screenshot({ path: path.join(outputDir, 'home-studio-desktop-1440.png'), fullPage: false })
const homeDesktop = await desktopPage.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  navStudioHref: document.querySelector('header a[href="/studio"]')?.getAttribute('href') ?? '',
  topbarStudioHref: document.querySelector('section[aria-labelledby="portfolio-home-title"] a[href="/studio"]')?.getAttribute('href') ?? '',
  webglReady: document.querySelector('section[aria-labelledby="portfolio-home-title"] [data-studio-growth-core]')?.getAttribute('data-webgl-ready') ?? '',
  growthCoreCanvases: document.querySelectorAll('section[aria-labelledby="portfolio-home-title"] [data-studio-growth-core] canvas').length,
}))
homeDesktop.frameChanged = frameBefore !== frameAfter
await desktopContext.close()

await integrationPage.goto(`${baseUrl}/portfolio#pierrondi-studio`, { waitUntil: 'domcontentloaded' })
await settle(integrationPage)
await integrationPage.screenshot({ path: path.join(outputDir, 'portfolio-studio-mobile-390.png'), fullPage: false })
const portfolio = await integrationPage.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  studioAnchors: document.querySelectorAll('#pierrondi-studio').length,
  studioHref: document.querySelector('a[href="/studio"]')?.getAttribute('href') ?? '',
}))

await integrationPage.goto(`${baseUrl}/feitos`, { waitUntil: 'domcontentloaded' })
await settle(integrationPage)
await integrationPage.locator('section[aria-labelledby="portfolio-home-title"]').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
await integrationPage.waitForTimeout(500)
await integrationPage.screenshot({ path: path.join(outputDir, 'feitos-studio-mobile-390.png'), fullPage: false })
const feitos = await integrationPage.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  selectedProject: document.querySelector('section[aria-labelledby="portfolio-home-title"] [role="tab"][aria-selected="true"] strong')?.textContent?.trim() ?? '',
  studioHref: document.querySelector('section[aria-labelledby="portfolio-home-title"] a[href="/studio"]')?.getAttribute('href') ?? '',
}))

const enResponse = await integrationPage.goto(`${baseUrl}/en/studio`, { waitUntil: 'domcontentloaded' })
await settle(integrationPage)
await integrationPage.screenshot({ path: path.join(outputDir, 'studio-en-hero-mobile-390.png'), fullPage: false })
const english = await integrationPage.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  h1: document.querySelector('h1')?.textContent?.trim() ?? '',
  serviceCards: document.querySelectorAll('#frentes article').length,
  caseCards: document.querySelectorAll('#cases article').length,
}))

await integrationContext.close()
report.integrations = {
  home,
  homeDesktop,
  portfolio,
  feitos,
  english,
  englishStatus: enResponse?.status(),
  ...integrationDiagnostics,
  desktopDiagnostics,
  pass: home.scrollWidth <= home.viewportWidth
    && home.selectedProject === 'Pierrondi Studio'
    && home.studioHref === '/studio'
    && home.navStudioHref === '/studio'
    && home.growthCoreCanvases === 1
    && home.webglReady === 'true'
    && homeDesktop.scrollWidth <= homeDesktop.viewportWidth
    && homeDesktop.navStudioHref === '/studio'
    && homeDesktop.topbarStudioHref === '/studio'
    && homeDesktop.webglReady === 'true'
    && homeDesktop.growthCoreCanvases === 1
    && homeDesktop.frameChanged
    && portfolio.scrollWidth <= portfolio.viewportWidth
    && portfolio.studioAnchors === 1
    && portfolio.studioHref === '/studio'
    && feitos.scrollWidth <= feitos.viewportWidth
    && feitos.selectedProject === 'Pierrondi Studio'
    && feitos.studioHref === '/studio'
    && enResponse?.status() === 200
    && english.scrollWidth <= english.viewportWidth
    && english.serviceCards === 4
    && english.caseCards === 3
    && integrationDiagnostics.consoleErrors.length === 0
    && integrationDiagnostics.pageErrors.length === 0
    && integrationDiagnostics.failedRequests.length === 0
    && desktopDiagnostics.consoleErrors.length === 0
    && desktopDiagnostics.pageErrors.length === 0
    && desktopDiagnostics.failedRequests.length === 0,
}

const reducedContext = await createContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
  colorScheme: 'dark',
  locale: 'pt-BR',
})
const reducedPage = await reducedContext.newPage()
const reducedDiagnostics = attachDiagnostics(reducedPage)
await reducedPage.goto(`${baseUrl}/studio`, { waitUntil: 'domcontentloaded' })
await settle(reducedPage, 350)
await reducedPage.screenshot({ path: path.join(outputDir, 'studio-reduced-motion-mobile-390.png'), fullPage: false })
const reducedMetrics = await reducedPage.evaluate(() => ({
  matches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  progressTransform: getComputedStyle(document.querySelector('main > span') ?? document.body).transform,
}))
await reducedContext.close()
report.reducedMotion = {
  ...reducedMetrics,
  ...reducedDiagnostics,
  pass: reducedMetrics.matches
    && reducedMetrics.scrollWidth <= reducedMetrics.viewportWidth
    && reducedDiagnostics.consoleErrors.length === 0
    && reducedDiagnostics.pageErrors.length === 0
    && reducedDiagnostics.failedRequests.length === 0,
}

await browser.close()
report.pass = report.viewports.every((viewport) => viewport.pass)
  && report.integrations.pass
  && report.reducedMotion.pass

await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
