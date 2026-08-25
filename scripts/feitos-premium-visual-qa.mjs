import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL || 'http://127.0.0.1:3128'
const outputDir = path.resolve('qa/age-3089-feitos-premium')

const scenarios = [
  { name: 'mobile-320', width: 320, height: 720, lang: 'pt' },
  { name: 'mobile-390', width: 390, height: 844, lang: 'pt' },
  { name: 'tablet-768', width: 768, height: 1024, lang: 'pt' },
  { name: 'desktop-1024', width: 1024, height: 768, lang: 'pt' },
  { name: 'desktop-1440', width: 1440, height: 1000, lang: 'pt' },
  { name: 'english-390', width: 390, height: 844, lang: 'en' },
  { name: 'reduced-motion-390', width: 390, height: 844, lang: 'pt', reducedMotion: true },
]

async function inspectScenario(browser, scenario) {
  const context = await browser.newContext({
    viewport: { width: scenario.width, height: scenario.height },
    reducedMotion: scenario.reducedMotion ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()
  const consoleErrors = []
  const failedRequests = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}`))

  const route = scenario.lang === 'en' ? '/en/feitos' : '/feitos'
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: path.join(outputDir, `${scenario.name}-hero.png`), fullPage: false })

  const baseline = await page.evaluate(() => ({
    title: document.title,
    h1Count: document.querySelectorAll('h1').length,
    h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    printButton: [...document.querySelectorAll('button')].some((button) => /PDF/.test(button.textContent || '')),
    metrics: document.querySelectorAll('[id="execution-proof"] article').length,
    images: [...document.images].map((image) => ({ src: image.currentSrc, complete: image.complete, width: image.naturalWidth })),
    schemaTypes: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => {
      try {
        const parsed = JSON.parse(node.textContent || '{}')
        const values = Array.isArray(parsed) ? parsed : [parsed]
        return values.map((value) => value['@type']).filter(Boolean)
      } catch {
        return ['invalid-json']
      }
    }),
  }))

  await page.locator('#paid-ai-flow-title').scrollIntoViewIfNeeded()
  await page.screenshot({ path: path.join(outputDir, `${scenario.name}-flow.png`), fullPage: false })
  await page.locator('#public-products-title').scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  await page.screenshot({ path: path.join(outputDir, `${scenario.name}-products.png`), fullPage: false })

  const productImages = await page.evaluate(() => {
    const section = document.querySelector('#public-products-title')?.closest('section')
    return [...(section?.querySelectorAll('img') ?? [])].map((image) => ({
      src: image.currentSrc,
      complete: image.complete,
      width: image.naturalWidth,
    }))
  })

  const checks = {
    http200: response?.status() === 200,
    oneH1: baseline.h1Count === 1,
    correctH1: /trabalho manual|manual work/i.test(baseline.h1 || ''),
    noOverflow: baseline.overflow <= 0,
    printButton: baseline.printButton,
    proofVisible: baseline.metrics >= 10,
    publicProductImagesLoaded:
      productImages.length === 3 && productImages.every((image) => image.complete && image.width > 0),
    schema: baseline.schemaTypes.includes('CollectionPage') && baseline.schemaTypes.includes('BreadcrumbList'),
    noConsoleErrors: consoleErrors.length === 0,
    noFailedRequests: failedRequests.length === 0,
  }

  await context.close()
  return {
    ...scenario,
    route,
    baseline,
    productImages,
    checks,
    consoleErrors,
    failedRequests,
    pass: Object.values(checks).every(Boolean),
  }
}

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = []
for (const scenario of scenarios) results.push(await inspectScenario(browser, scenario))
await browser.close()

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  pass: results.every((result) => result.pass),
  results,
}

await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
