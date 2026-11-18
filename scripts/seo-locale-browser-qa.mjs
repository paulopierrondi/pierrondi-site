import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'

const base = process.env.TARGET_URL || 'http://127.0.0.1:4321'
const output = process.env.SEO_BROWSER_REPORT_DIR || 'qa/seo-locale'
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = []
try {
  for (const width of [375, 1280]) {
    for (const colorScheme of ['light', 'dark']) {
      for (const [path, expected] of [['/contato', 'pt-BR'], ['/en/contato', 'en-US']]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme, reducedMotion: 'reduce' })
        const page = await context.newPage()
        const errors = []
        page.on('pageerror', (error) => errors.push(error.message))
        // These are rendering/navigation checks. Never emit analytics or call
        // external services while measuring the public document.
        await page.route('**/*', (route) => new URL(route.request().url()).origin === new URL(base).origin
          ? route.continue() : route.abort())
        const response = await page.goto(base + path, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        await page.getByRole('dialog', { name: /Cookie consent|Consentimento de cookies/ }).waitFor({ state: 'visible' })
        const actual = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          h1: [...document.querySelectorAll('h1')].map((node) => node.textContent),
          text: document.body.innerText,
          font: getComputedStyle(document.body).fontFamily,
          gaLoaders: document.querySelectorAll('script[src*="gtag/js"]').length,
          navs: document.querySelectorAll('nav[aria-label="Language selector"]').length,
        }))
        const name = `${path === '/contato' ? 'pt' : 'en'}-${width}-${colorScheme}`
        await page.screenshot({ path: join(output, `${name}.png`), fullPage: true })
        const issues = []
        if (response.status() !== 200) issues.push(`HTTP ${response.status()}`)
        if (actual.lang !== expected) issues.push(`lang ${actual.lang}`)
        if (actual.h1.length !== 1) issues.push('H1 count')
        if (actual.overflow > 1) issues.push(`overflow ${actual.overflow}`)
        if (actual.gaLoaders !== 1) issues.push('GA loader count')
        if (actual.navs !== 1) issues.push('language switcher count')
        if (errors.length) issues.push(...errors)
        results.push({ name, path, width, colorScheme, ...actual, issues })
        await context.close()
      }
    }
  }
  // A same-locale Link must keep the document/SPA; switching locale can load
  // the other static root document, with no language/cookie cache variation.
  const page = await browser.newPage()
  await page.route('**/*', (route) => new URL(route.request().url()).origin === new URL(base).origin
    ? route.continue() : route.abort())
  await page.goto(base + '/en/contato', { waitUntil: 'networkidle' })
  await page.evaluate(() => { window.__seoDocumentMarker = 'same-document' })
  await page.locator('a[href="/en/portfolio"]').first().click()
  await page.waitForURL(base + '/en/portfolio')
  await page.waitForLoadState('networkidle')
  const sameLocale = await page.evaluate(() => ({ marker: window.__seoDocumentMarker, lang: document.documentElement.lang }))
  if (sameLocale.marker !== 'same-document' || sameLocale.lang !== 'en-US') throw new Error('Same-locale SPA navigation regressed')
  await page.close()
  const report = { base, results, sameLocale, failures: results.filter((row) => row.issues.length) }
  await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ views: results.length, failures: report.failures.length, sameLocale }))
  if (report.failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
