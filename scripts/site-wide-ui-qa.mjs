import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://localhost:3187'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/site-wide/local')
const concurrency = Math.max(1, Number(process.env.QA_CONCURRENCY ?? 4))
const mainViewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]
const breakpointWidths = [768, 980, 981, 1024, 1080, 1081]
const breakpointRoutes = ['/', '/about', '/apps/faithschool', '/feitos']
const reducedMotionRoutes = [
  '/', '/about', '/portfolio', '/studio', '/feitos', '/blog',
  '/apps/faithschool', '/design', '/paulo', '/itau', '/bradesco-26',
  '/fso', '/control_tower', '/crm/login',
]
const noJavaScriptRoutes = [
  '/', '/en', '/about', '/en/about', '/atuacao', '/en/atuacao',
  '/portfolio', '/en/portfolio', '/studio', '/en/studio', '/feitos',
  '/blog', '/contato', '/ai-search', '/citations', '/answers', '/obrigado',
  '/apps/faithschool', '/apps/faithschool/privacy', '/privacidade', '/design',
  '/kommo', '/paulo', '/fso', '/itau', '/bradesco-26',
]
const legacyRedirects = {
  '/bio': '/about',
  '/precos': '/atuacao',
  '/ideias': '/blog',
  '/quiz': '/atuacao',
  '/produto-digital': '/atuacao',
  '/calculadora': '/atuacao',
  '/marketing-os': '/atuacao',
  '/marketing-os/demo': '/atuacao',
  '/marketing-os/numeros': '/atuacao',
  '/faq': '/contato',
  '/tech-partner': '/atuacao',
}
const representativeRoutes = new Set([
  '/',
  '/about',
  '/atuacao',
  '/portfolio',
  '/studio',
  '/feitos',
  '/blog',
  '/blog/automacao-com-n8n-brasil',
  '/apps/faithschool',
  '/design',
  '/paulo',
  '/itau',
  '/bradesco-26',
  '/fso',
])

const forcedDynamicRoutes = [
  '/automacoes',
  '/bradesco-26',
  '/bradesco-26/slides',
  '/control_tower',
  '/crm',
  '/crm/atividades',
  '/crm/clientes',
  '/crm/contratos',
  '/crm/discussoes',
  '/crm/pagamentos',
  '/crm/projetos',
  '/crm/login',
  '/itau',
]

function isHtmlRoute(route) {
  if (!route || route.startsWith('/_') || route.startsWith('/api/')) return false
  if (/\[[^/]+\]/.test(route)) return false
  const last = route.split('/').filter(Boolean).at(-1) ?? ''
  return !last.includes('.') && !route.includes('/opengraph-image')
}

function normalizeAppPage(route) {
  if (!route.endsWith('/page')) return null
  const normalized = route
    .replace(/\/page$/, '')
    .replace(/\/(\([^/]+\))/g, '')
  return normalized || '/'
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return fallback
  }
}

async function collectRoutes() {
  const prerender = await readJson('.next/prerender-manifest.json', { routes: {} })
  const appPaths = await readJson('.next/server/app-paths-manifest.json', {})
  const routes = new Set([
    ...Object.keys(prerender.routes ?? {}),
    ...Object.keys(appPaths).map(normalizeAppPage).filter(Boolean),
    ...forcedDynamicRoutes,
  ])
  return [...routes].filter(isHtmlRoute).sort((a, b) => a.localeCompare(b))
}

function attachDiagnostics(page) {
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  const httpErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    const requestUrl = new URL(request.url())
    if (requestUrl.origin !== new URL(baseUrl).origin) return
    if (!['document', 'stylesheet', 'script', 'font', 'image'].includes(request.resourceType())) return
    failedRequests.push(`${request.method()} ${requestUrl.pathname} ${request.failure()?.errorText ?? ''}`)
  })
  page.on('response', (response) => {
    if (response.status() < 400) return
    const responseUrl = new URL(response.url())
    if (responseUrl.origin !== new URL(baseUrl).origin) return
    httpErrors.push(`${response.status()} ${response.request().resourceType()} ${responseUrl.pathname}`)
  })
  return { consoleErrors, pageErrors, failedRequests, httpErrors }
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const visibleRect = (element) => {
      if (!element) return null
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      if (style.display === 'none' || style.visibility === 'hidden' || rect.width <= 0 || rect.height <= 0) return null
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height }
    }
    const intersects = (a, b) => Boolean(a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)
    const rootStyle = getComputedStyle(document.documentElement)
    const publicNav = document.querySelector('[data-public-navigation]')
    const brand = publicNav?.querySelector('a') ?? null
    const navLinks = publicNav?.querySelector('[data-public-nav-links]') ?? null
    const burger = publicNav?.querySelector('[data-public-nav-burger]') ?? null
    const language = [...document.querySelectorAll('nav')].find((node) => node.getAttribute('aria-label') === 'Language selector') ?? null
    const firstHeading = document.querySelector('main h1, main h2')
    const firstH1 = document.querySelector('h1')
    const navRect = visibleRect(publicNav)
    const brandRect = visibleRect(brand)
    const linksRect = visibleRect(navLinks)
    const burgerRect = visibleRect(burger)
    const languageRect = visibleRect(language)
    const headingRect = visibleRect(firstHeading)
    const h1Rect = visibleRect(firstH1)
    const h1Style = firstH1 ? getComputedStyle(firstH1) : null
    const headingFonts = [...document.querySelectorAll('h1, h2, h3')]
      .slice(0, 24)
      .map((element) => getComputedStyle(element).fontFamily)
    const isInsideHorizontalScroller = (element) => {
      let parent = element.parentElement
      while (parent && parent !== document.body && parent !== document.documentElement) {
        const overflow = getComputedStyle(parent).overflowX
        if (['auto', 'scroll', 'hidden', 'clip'].includes(overflow)) return true
        parent = parent.parentElement
      }
      return false
    }
    const interactiveRects = [...document.querySelectorAll('a, button, input, select, textarea, [role="button"]')]
      .filter((element) => !isInsideHorizontalScroller(element))
      .map(visibleRect)
      .filter(Boolean)
    const interactiveOutsideViewport = interactiveRects.filter((rect) => rect.left < -1 || rect.right > window.innerWidth + 1).length
    const displayToken = rootStyle.getPropertyValue('--font-display').trim()
    const bodyToken = rootStyle.getPropertyValue('--font-body').trim()
    const monoToken = rootStyle.getPropertyValue('--font-mono').trim()
    return {
      title: document.title,
      lang: document.documentElement.lang,
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      fontsStatus: document.fonts.status,
      bodyFont: getComputedStyle(document.body).fontFamily,
      brandFont: brand ? getComputedStyle(brand).fontFamily : '',
      headingFonts: [...new Set(headingFonts)],
      fontTokens: { display: displayToken, body: bodyToken, mono: monoToken },
      invalidFontTokens:
        !displayToken || !bodyToken || !monoToken ||
        displayToken.includes('var(--font-display)') ||
        bodyToken.includes('var(--font-body)') ||
        monoToken.includes('var(--font-mono)') ||
        !displayToken.includes('Space Grotesk') ||
        !bodyToken.includes('Inter') ||
        !monoToken.includes('JetBrains Mono'),
      invalidFontRoles:
        !getComputedStyle(document.body).fontFamily.includes('Inter') ||
        Boolean(brand && !getComputedStyle(brand).fontFamily.includes('JetBrains Mono')),
      h1Count: document.querySelectorAll('h1').length,
      h1Visible: Boolean(
        h1Rect &&
        h1Style &&
        Number.parseFloat(h1Style.opacity || '1') >= 0.98 &&
        h1Style.visibility !== 'hidden'
      ),
      publicNav: Boolean(publicNav),
      burgerVisible: Boolean(burgerRect),
      linksVisible: Boolean(linksRect),
      languageVisible: Boolean(languageRect),
      collisionCount: [
        intersects(brandRect, linksRect),
        intersects(brandRect, languageRect),
        intersects(linksRect, languageRect),
        intersects(burgerRect, languageRect),
      ].filter(Boolean).length,
      interactiveOutsideViewport,
      headingUnderNav: Boolean(navRect && headingRect && intersects(navRect, headingRect)),
    }
  })
}

async function inspectMenu(page, metrics) {
  if (!metrics.publicNav) return { applicable: false, pass: true }
  const burger = page.locator('[data-public-nav-burger]')
  if ((await burger.count()) !== 1) return { applicable: true, pass: false, reason: 'burger-count' }
  const visible = await burger.isVisible()
  if (!visible) {
    for (let index = 0; index < 12; index += 1) {
      await page.keyboard.press('Tab')
      const reachedNav = await page.evaluate(() => {
        const nav = document.querySelector('[data-public-navigation]')
        return Boolean(nav && nav.contains(document.activeElement))
      })
      if (reachedNav) break
    }
    const focus = await page.evaluate(() => {
      const nav = document.querySelector('[data-public-navigation]')
      if (!nav) return { applicable: false, pass: true }
      const active = document.activeElement
      if (!active || !nav.contains(active)) return { applicable: true, pass: false, reason: 'nav-focus-not-reached' }
      const style = getComputedStyle(active)
      return {
        applicable: true,
        tag: active.tagName,
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        pass: style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) >= 1,
      }
    })
    return {
      applicable: true,
      desktop: true,
      focus,
      pass: metrics.linksVisible && metrics.collisionCount === 0 && metrics.interactiveOutsideViewport === 0 && focus.pass,
    }
  }

  // Give the client boundary time to hydrate before exercising the mobile menu.
  await page.waitForTimeout(300)
  await burger.click()
  const opened = await page.evaluate(() => {
    const menu = document.querySelector('[data-public-nav-links]')
    const button = document.querySelector('[data-public-nav-burger]')
    if (!menu || !button) return null
    const menuRect = menu.getBoundingClientRect()
    const headerRect = document.querySelector('[data-public-navigation]')?.getBoundingClientRect()
    const links = [...menu.querySelectorAll('a')].map((link) => link.getBoundingClientRect())
    return {
      expanded: button.getAttribute('aria-expanded') === 'true',
      bodyLocked: getComputedStyle(document.body).overflow === 'hidden',
      menuInsideViewport: menuRect.left >= -1 && menuRect.right <= window.innerWidth + 1 && menuRect.top >= (headerRect?.bottom ?? 0) - 1,
      linksInsideViewport: links.every((rect) => rect.left >= -1 && rect.right <= window.innerWidth + 1 && rect.width > 0 && rect.height > 0),
    }
  })
  await page.keyboard.press('Escape')
  const closed = await page.evaluate(() => ({
    expanded: document.querySelector('[data-public-nav-burger]')?.getAttribute('aria-expanded'),
    bodyLocked: getComputedStyle(document.body).overflow === 'hidden',
  }))
  return {
    applicable: true,
    desktop: false,
    opened,
    closed,
    pass: Boolean(
      opened?.expanded && opened.bodyLocked && opened.menuInsideViewport && opened.linksInsideViewport &&
      closed.expanded === 'false' && !closed.bodyLocked,
    ),
  }
}

function routePass(result) {
  return Boolean(
    result.status && result.status < 400 &&
    result.metrics.scrollWidth <= result.metrics.viewportWidth + 1 &&
    result.metrics.fontsStatus === 'loaded' &&
    !result.metrics.invalidFontTokens &&
    !result.metrics.invalidFontRoles &&
    result.metrics.h1Count >= 1 &&
    result.metrics.h1Visible &&
    result.metrics.collisionCount === 0 &&
    result.metrics.interactiveOutsideViewport === 0 &&
    !result.metrics.headingUnderNav &&
    result.menu.pass &&
    result.consoleErrors.length === 0 &&
    result.pageErrors.length === 0 &&
    result.failedRequests.length === 0
    && result.httpErrors.length === 0
  )
}

function safeFileName(route) {
  return (route === '/' ? 'home' : route.slice(1)).replace(/[^a-z0-9-]+/gi, '-')
}

async function inspectRoute(context, route, viewport, { capture = false } = {}) {
  const page = await context.newPage()
  const diagnostics = attachDiagnostics(page)
  let result
  try {
    const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'domcontentloaded', timeout: 45_000 })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => {
      const heading = document.querySelector('h1')
      if (!heading) return false
      const style = getComputedStyle(heading)
      return style.visibility !== 'hidden' && Number.parseFloat(style.opacity || '1') >= 0.98
    }, undefined, { timeout: 1_500 }).catch(() => undefined)
    const metrics = await collectMetrics(page)
    const menu = await inspectMenu(page, metrics)
    result = {
      route,
      finalUrl: page.url(),
      status: response?.status() ?? null,
      metrics,
      menu,
      ...diagnostics,
    }
    result.pass = routePass(result)
    if (capture || !result.pass) {
      await page.screenshot({
        path: path.join(outputDir, `${viewport.name}-${safeFileName(route)}${result.pass ? '' : '-FAIL'}.png`),
        fullPage: false,
      })
    }
  } catch (error) {
    result = {
      route,
      finalUrl: page.url(),
      status: null,
      error: error instanceof Error ? error.message : String(error),
      ...diagnostics,
      pass: false,
    }
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-${safeFileName(route)}-ERROR.png`),
      fullPage: false,
    }).catch(() => undefined)
  } finally {
    await page.close()
  }
  return result
}

async function mapWithConcurrency(items, worker, limit) {
  const results = new Array(items.length)
  let cursor = 0
  async function run() {
    while (cursor < items.length) {
      const index = cursor
      cursor += 1
      results[index] = await worker(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run))
  return results
}

await mkdir(outputDir, { recursive: true })
const routes = await collectRoutes()
if (routes.length === 0) throw new Error('No built HTML routes found. Run npm run build before qa:site-wide.')

const browser = await chromium.launch({ headless: true })
const report = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  routeCount: routes.length,
  routes,
  viewports: [],
  breakpoints: [],
  reducedMotion: null,
  noJavaScript: null,
  geoRedirects: null,
}

for (const viewport of mainViewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: 'dark',
    locale: 'pt-BR',
  })
  const results = await mapWithConcurrency(
    routes,
    (route) => inspectRoute(context, route, viewport, { capture: representativeRoutes.has(route) }),
    concurrency,
  )
  report.viewports.push({ ...viewport, results, pass: results.every((result) => result.pass) })
  await context.close()
}

for (const width of breakpointWidths) {
  const viewport = { name: `breakpoint-${width}`, width, height: 900 }
  const context = await browser.newContext({ viewport: { width, height: viewport.height }, colorScheme: 'dark' })
  const results = await mapWithConcurrency(
    breakpointRoutes,
    (route) => inspectRoute(context, route, viewport),
    Math.min(concurrency, breakpointRoutes.length),
  )
  report.breakpoints.push({ ...viewport, results, pass: results.every((result) => result.pass) })
  await context.close()
}

{
  const viewport = { name: 'no-javascript-390', width: 390, height: 844 }
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: 'dark',
    javaScriptEnabled: false,
  })
  const results = await mapWithConcurrency(noJavaScriptRoutes, async (route) => {
    const page = await context.newPage()
    const diagnostics = attachDiagnostics(page)
    try {
      const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'load', timeout: 45_000 })
      await page.evaluate(() => document.fonts.ready)
      const metrics = await collectMetrics(page)
      const unexpectedFailedRequests = diagnostics.failedRequests.filter(
        (request) => !request.endsWith(' csp'),
      )
      const result = {
        route,
        finalUrl: page.url(),
        status: response?.status() ?? null,
        metrics,
        expectedBlockedScripts: diagnostics.failedRequests.filter((request) => request.endsWith(' csp')),
        unexpectedFailedRequests,
        ...diagnostics,
      }
      result.pass = Boolean(
        result.status && result.status < 400 &&
        metrics.scrollWidth <= metrics.viewportWidth + 1 &&
        metrics.fontsStatus === 'loaded' &&
        !metrics.invalidFontTokens &&
        metrics.h1Count >= 1 &&
        metrics.h1Visible &&
        diagnostics.consoleErrors.length === 0 &&
        diagnostics.pageErrors.length === 0 &&
        unexpectedFailedRequests.length === 0 &&
        diagnostics.httpErrors.length === 0
      )
      if (!result.pass) {
        await page.screenshot({ path: path.join(outputDir, `${viewport.name}-${safeFileName(route)}-FAIL.png`), fullPage: false })
      }
      return result
    } catch (error) {
      return {
        route,
        finalUrl: page.url(),
        status: null,
        error: error instanceof Error ? error.message : String(error),
        ...diagnostics,
        pass: false,
      }
    } finally {
      await page.close()
    }
  }, Math.min(concurrency, noJavaScriptRoutes.length))
  report.noJavaScript = { ...viewport, results, pass: results.every((result) => result.pass) }
  await context.close()
}

{
  const viewport = { name: 'reduced-motion-390', width: 390, height: 844 }
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: 'dark',
    reducedMotion: 'reduce',
  })
  const results = await mapWithConcurrency(reducedMotionRoutes, async (route) => {
    const result = await inspectRoute(context, route, viewport)
    if (!result.pass) return result
    const page = await context.newPage()
    try {
      await page.goto(new URL(route, baseUrl).href, { waitUntil: 'domcontentloaded', timeout: 45_000 })
      await page.evaluate(() => document.fonts.ready)
      const motion = await page.evaluate(() => {
        const seconds = (value) => value.split(',').map((part) => {
          const trimmed = part.trim()
          return trimmed.endsWith('ms') ? Number.parseFloat(trimmed) / 1000 : Number.parseFloat(trimmed)
        })
        const violations = [...document.querySelectorAll('*')].filter((element) => {
          const style = getComputedStyle(element)
          const rect = element.getBoundingClientRect()
          if (style.display === 'none' || style.visibility === 'hidden' || rect.width <= 0 || rect.height <= 0) return false
          const animationMax = Math.max(0, ...seconds(style.animationDuration))
          const transitionMax = Math.max(0, ...seconds(style.transitionDuration))
          return animationMax > 0.02 || transitionMax > 0.02
        }).length
        return { matches: matchMedia('(prefers-reduced-motion: reduce)').matches, violations }
      })
      return { ...result, motion, pass: result.pass && motion.matches && motion.violations === 0 }
    } finally {
      await page.close()
    }
  }, Math.min(concurrency, reducedMotionRoutes.length))
  report.reducedMotion = { ...viewport, results, pass: results.every((result) => result.pass) }
  await context.close()
}

{
  const results = []
  for (const [source, expectedPath] of Object.entries(legacyRedirects)) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      locale: 'en-US',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/136.0.0.0 Safari/537.36',
      extraHTTPHeaders: { 'accept-language': 'en-US,en;q=0.9' },
    })
    const page = await context.newPage()
    try {
      const response = await page.goto(new URL(source, baseUrl).href, { waitUntil: 'domcontentloaded', timeout: 45_000 })
      const finalPath = new URL(page.url()).pathname
      results.push({ source, expectedPath, finalPath, status: response?.status() ?? null, pass: response?.status() === 200 && finalPath === expectedPath })
    } catch (error) {
      results.push({ source, expectedPath, finalPath: new URL(page.url()).pathname, status: null, error: error instanceof Error ? error.message : String(error), pass: false })
    } finally {
      await page.close()
      await context.close()
    }
  }
  report.geoRedirects = { results, pass: results.every((result) => result.pass) }
}

await browser.close()
report.pass = report.viewports.every((viewport) => viewport.pass) && report.breakpoints.every((viewport) => viewport.pass) && report.reducedMotion.pass && report.noJavaScript.pass && report.geoRedirects.pass
await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)

const failures = [
  ...report.viewports.flatMap((viewport) => viewport.results.filter((result) => !result.pass).map((result) => ({ viewport: viewport.name, ...result }))),
  ...report.breakpoints.flatMap((viewport) => viewport.results.filter((result) => !result.pass).map((result) => ({ viewport: viewport.name, ...result }))),
  ...report.reducedMotion.results.filter((result) => !result.pass).map((result) => ({ viewport: report.reducedMotion.name, ...result })),
  ...report.noJavaScript.results.filter((result) => !result.pass).map((result) => ({ viewport: report.noJavaScript.name, ...result })),
  ...report.geoRedirects.results.filter((result) => !result.pass).map((result) => ({ viewport: 'geo-redirects', ...result })),
]
console.log(JSON.stringify({
  pass: report.pass,
  baseUrl,
  routeCount: report.routeCount,
  checks: report.viewports.reduce((sum, viewport) => sum + viewport.results.length, 0) + report.breakpoints.reduce((sum, viewport) => sum + viewport.results.length, 0) + report.reducedMotion.results.length + report.noJavaScript.results.length + report.geoRedirects.results.length,
  failures,
  report: path.join(outputDir, 'qa-report.json'),
}, null, 2))
if (!report.pass) process.exitCode = 1
