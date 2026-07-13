import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3107'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/portfolio-product-stories-2026-07-11/local')

const viewports = [
  { name: 'mobile-320', width: 320, height: 720 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const report = { baseUrl, generatedAt: new Date().toISOString(), viewports: [], reducedMotion: null }

async function settle(page, ms = 700) {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(ms)
}

async function inspectViewport(viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: 'pt-BR',
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`))

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  await settle(page)
  await page.locator('#projects').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
  await page.waitForTimeout(850)
  await page.screenshot({ path: path.join(outputDir, `home-projects-${viewport.name}.png`), fullPage: false })

  const tabs = page.locator('#projects [role="tab"]')
  await tabs.first().focus()
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(520)
  const selectedAfterKeyboard = await page.locator('#projects [role="tab"][aria-selected="true"] strong').textContent()
  const focusedAfterKeyboard = await page.evaluate(() => document.activeElement?.getAttribute('id') ?? '')
  const homeMetrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    projectVisuals: document.querySelectorAll('#projects [data-visual]').length,
    selectedTab: document.querySelector('#projects [role="tab"][aria-selected="true"]')?.textContent?.trim() ?? '',
  }))

  await page.goto(`${baseUrl}/portfolio`, { waitUntil: 'domcontentloaded' })
  await settle(page)
  await page.screenshot({ path: path.join(outputDir, `portfolio-hero-${viewport.name}.png`), fullPage: false })
  await page.locator('#cantustudio').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
  await page.waitForTimeout(650)
  await page.screenshot({ path: path.join(outputDir, `portfolio-case-${viewport.name}.png`), fullPage: false })
  await page.locator('#app-store').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
  await page.waitForTimeout(650)
  await page.screenshot({ path: path.join(outputDir, `portfolio-apps-${viewport.name}.png`), fullPage: false })

  const portfolioMetrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    appLinks: document.querySelectorAll('#app-store a').length,
    caseSections: document.querySelectorAll('[id="cases"] ~ nav + div > section').length,
    exposesClientName: document.body.textContent?.includes('Camila Ferraz') ?? false,
  }))

  if (viewport.name === 'mobile-320') {
    await page.goto(`${baseUrl}/en/portfolio`, { waitUntil: 'domcontentloaded' })
    await settle(page)
    await page.screenshot({ path: path.join(outputDir, 'portfolio-en-hero-mobile-320.png'), fullPage: false })
  }

  await context.close()
  return {
    ...viewport,
    selectedAfterKeyboard,
    focusedAfterKeyboard,
    homeMetrics,
    portfolioMetrics,
    consoleErrors,
    pageErrors,
    failedRequests,
    pass: homeMetrics.scrollWidth <= homeMetrics.viewportWidth
      && portfolioMetrics.scrollWidth <= portfolioMetrics.viewportWidth
      && homeMetrics.projectVisuals === 1
      && selectedAfterKeyboard === 'FaithSchool'
      && focusedAfterKeyboard === 'project-tab-faithschool'
      && portfolioMetrics.appLinks === 21
      && portfolioMetrics.caseSections === 7
      && !portfolioMetrics.exposesClientName
      && consoleErrors.length === 0
      && pageErrors.length === 0,
  }
}

for (const viewport of viewports) report.viewports.push(await inspectViewport(viewport))

const reducedContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
  colorScheme: 'dark',
  locale: 'pt-BR',
})
const reducedPage = await reducedContext.newPage()
const reducedConsoleErrors = []
const reducedPageErrors = []
reducedPage.on('console', (message) => {
  if (message.type() === 'error') reducedConsoleErrors.push(message.text())
})
reducedPage.on('pageerror', (error) => reducedPageErrors.push(error.message))
await reducedPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
await settle(reducedPage, 350)
await reducedPage.locator('#projects').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
await reducedPage.waitForTimeout(250)
await reducedPage.screenshot({ path: path.join(outputDir, 'home-projects-reduced-motion-390.png'), fullPage: false })
const reducedMetrics = await reducedPage.evaluate(() => ({
  matches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  selectedTab: document.querySelector('#projects [role="tab"][aria-selected="true"]')?.textContent?.trim() ?? '',
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
}))
report.reducedMotion = {
  ...reducedMetrics,
  consoleErrors: reducedConsoleErrors,
  pageErrors: reducedPageErrors,
}
await reducedContext.close()

await browser.close()
report.pass = report.viewports.every((viewport) => viewport.pass)
  && report.reducedMotion.matches
  && report.reducedMotion.scrollWidth <= report.reducedMotion.viewportWidth
  && report.reducedMotion.consoleErrors.length === 0
  && report.reducedMotion.pageErrors.length === 0

await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
