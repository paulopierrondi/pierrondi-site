import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://localhost:3187'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/frontier-hero/local')
const viewports = [
  { name: 'mobile-320', width: 320, height: 720 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
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
  english: null,
  reducedMotion: null,
  webglFallback: null,
  noJavaScript: null,
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
    failedRequests.push(
      `${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`,
    )
  })
  return { consoleErrors, pageErrors, failedRequests }
}

async function settleScene(page, waitMs = 850) {
  await page.waitForLoadState('domcontentloaded')
  await page
    .locator('[data-frontier-scene]')
    .waitFor({ state: 'attached', timeout: 15_000 })
  await page.waitForFunction(
    () =>
      document
        .querySelector('[data-frontier-scene]')
        ?.getAttribute('data-frontier-state') !== 'loading',
    undefined,
    { timeout: 15_000 },
  )
  await page.waitForTimeout(waitMs)
}

async function sampleFrames(page, frames = 48) {
  return page.evaluate(
    (frameCount) =>
      new Promise((resolve) => {
        const deltas = []
        let previous = performance.now()
        const tick = (now) => {
          deltas.push(now - previous)
          previous = now
          if (deltas.length >= frameCount) {
            const sorted = [...deltas].sort((a, b) => a - b)
            const average =
              deltas.reduce((sum, value) => sum + value, 0) / deltas.length
            resolve({
              fps: Math.round(1000 / average),
              frameP95Ms: Number(
                sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
              ),
            })
            return
          }
          requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }),
    frames,
  )
}

async function captureMotionChange(page, viewport) {
  const canvas = page.locator('[data-frontier-scene] canvas')
  const canvasCount = await canvas.count()
  if (canvasCount !== 1 || viewport.name !== 'desktop-1440') return null

  const before = await canvas.screenshot()
  await page.mouse.move(viewport.width * 0.78, viewport.height * 0.28)
  await page.waitForTimeout(520)
  const after = await canvas.screenshot()
  return !before.equals(after)
}

async function collectViewportMetrics(page) {
  return page.evaluate(() => {
    const scene = document.querySelector('[data-frontier-scene]')
    const hero = document.querySelector('#hero')
    const heading = hero?.querySelector('h1')
    const ctas = [...(hero?.querySelectorAll('a') ?? [])]
    return {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      scrollY: window.scrollY,
      scrollWidth: document.documentElement.scrollWidth,
      heroRect: hero?.getBoundingClientRect().toJSON() ?? null,
      h1Count: document.querySelectorAll('h1').length,
      headingText: heading?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      sceneState: scene?.getAttribute('data-frontier-state') ?? '',
      sceneActive: scene?.getAttribute('data-frontier-active') ?? '',
      canvases: scene?.querySelectorAll('canvas').length ?? 0,
      ctas: ctas.map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          text: element.textContent?.trim() ?? '',
          visible: rect.width > 0 && rect.height > 0,
          inViewport:
            rect.left >= 0 &&
            rect.right <= window.innerWidth &&
            rect.top >= 0 &&
            rect.bottom <= window.innerHeight,
        }
      }),
    }
  })
}

async function verifyScenePausesOffscreen(page) {
  await page
    .locator('#contact')
    .evaluate((element) =>
      element.scrollIntoView({ block: 'start', behavior: 'instant' }),
    )
  await page.waitForTimeout(650)
  return (
    (await page
      .locator('[data-frontier-scene]')
      .getAttribute('data-frontier-active')) === 'false'
  )
}

function viewportPassed({
  response,
  metrics,
  frameChanged,
  pausedOffscreen,
  diagnostics,
}) {
  const ctasPass = metrics.ctas.every(
    (cta) => cta.visible && cta.inViewport,
  )
  const framePass = frameChanged === null ? true : frameChanged
  return [
    response?.status() === 200,
    metrics.scrollWidth <= metrics.viewportWidth,
    metrics.h1Count === 1,
    metrics.headingText.includes('Paulo Pierrondi'),
    metrics.headingText.includes('design_operate_scale_ai'),
    metrics.sceneState === 'ready',
    metrics.canvases === 1,
    metrics.ctas.length === 2,
    ctasPass,
    pausedOffscreen,
    framePass,
    diagnostics.consoleErrors.length === 0,
    diagnostics.pageErrors.length === 0,
    diagnostics.failedRequests.length === 0,
  ].every(Boolean)
}

async function inspectViewport(viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: 'pt-BR',
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  const diagnostics = attachDiagnostics(page)
  const response = await page.goto(`${baseUrl}/`, {
    waitUntil: 'domcontentloaded',
  })
  await settleScene(page)

  const frameChanged = await captureMotionChange(page, viewport)

  const framePerformance = ['mobile-390', 'desktop-1440'].includes(
    viewport.name,
  )
    ? await sampleFrames(page)
    : null
  const metrics = await collectViewportMetrics(page)

  await page.screenshot({
    path: path.join(outputDir, `frontier-hero-${viewport.name}.png`),
    fullPage: false,
  })
  const pausedOffscreen = await verifyScenePausesOffscreen(page)
  await context.close()

  const pass = viewportPassed({
    response,
    metrics,
    frameChanged,
    pausedOffscreen,
    diagnostics,
  })

  return {
    ...viewport,
    status: response?.status(),
    metrics,
    frameChanged,
    framePerformance,
    pausedOffscreen,
    ...diagnostics,
    pass,
  }
}

for (const viewport of viewports)
  report.viewports.push(await inspectViewport(viewport))

const englishContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  locale: 'en-US',
  colorScheme: 'dark',
})
const englishPage = await englishContext.newPage()
const englishDiagnostics = attachDiagnostics(englishPage)
const englishResponse = await englishPage.goto(`${baseUrl}/en`, {
  waitUntil: 'domcontentloaded',
})
await settleScene(englishPage)
await englishPage.screenshot({
  path: path.join(outputDir, 'frontier-hero-en-mobile-390.png'),
  fullPage: false,
})
const englishMetrics = await englishPage.evaluate(() => ({
  h1:
    document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim() ??
    '',
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  sceneState:
    document
      .querySelector('[data-frontier-scene]')
      ?.getAttribute('data-frontier-state') ?? '',
  motion:
    document
      .querySelector('[data-frontier-scene]')
      ?.getAttribute('data-frontier-motion') ?? '',
  ctas: document.querySelectorAll('#hero a').length,
}))
await englishContext.close()
report.english = {
  status: englishResponse?.status(),
  ...englishMetrics,
  ...englishDiagnostics,
  pass:
    englishResponse?.status() === 200 &&
    englishMetrics.h1.includes('Paulo Pierrondi') &&
    englishMetrics.scrollWidth <= englishMetrics.viewportWidth &&
    englishMetrics.sceneState === 'ready' &&
    englishMetrics.ctas === 2 &&
    englishDiagnostics.consoleErrors.length === 0 &&
    englishDiagnostics.pageErrors.length === 0,
}

const reducedContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
  colorScheme: 'dark',
  locale: 'pt-BR',
})
const reducedPage = await reducedContext.newPage()
const reducedDiagnostics = attachDiagnostics(reducedPage)
await reducedPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
await settleScene(reducedPage, 250)
const reducedCanvas = reducedPage.locator('[data-frontier-scene] canvas')
const reducedBefore = await reducedCanvas.screenshot()
await reducedPage.waitForTimeout(550)
const reducedAfter = await reducedCanvas.screenshot()
await reducedPage.screenshot({
  path: path.join(outputDir, 'frontier-hero-reduced-motion-390.png'),
  fullPage: false,
})
const reducedMetrics = await reducedPage.evaluate(() => ({
  matches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  sceneState:
    document
      .querySelector('[data-frontier-scene]')
      ?.getAttribute('data-frontier-state') ?? '',
  motion:
    document
      .querySelector('[data-frontier-scene]')
      ?.getAttribute('data-frontier-motion') ?? '',
}))
await reducedContext.close()
const reducedFrameStable = reducedBefore.equals(reducedAfter)
report.reducedMotion = {
  ...reducedMetrics,
  frameStable: reducedFrameStable,
  ...reducedDiagnostics,
  pass:
    reducedMetrics.matches &&
    reducedMetrics.scrollWidth <= reducedMetrics.viewportWidth &&
    reducedMetrics.sceneState === 'ready' &&
    reducedMetrics.motion === 'reduced' &&
    reducedFrameStable &&
    reducedDiagnostics.consoleErrors.length === 0 &&
    reducedDiagnostics.pageErrors.length === 0,
}

const fallbackBrowser = await chromium.launch({
  headless: true,
  args: ['--disable-webgl', '--disable-software-rasterizer'],
})
const fallbackContext = await fallbackBrowser.newContext({
  viewport: { width: 390, height: 844 },
  colorScheme: 'dark',
})
const fallbackPage = await fallbackContext.newPage()
const fallbackDiagnostics = attachDiagnostics(fallbackPage)
await fallbackPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
await settleScene(fallbackPage, 300)
await fallbackPage.screenshot({
  path: path.join(outputDir, 'frontier-hero-webgl-fallback-390.png'),
  fullPage: false,
})
const fallbackMetrics = await fallbackPage.evaluate(() => ({
  state:
    document
      .querySelector('[data-frontier-scene]')
      ?.getAttribute('data-frontier-state') ?? '',
  canvases: document.querySelectorAll('[data-frontier-scene] canvas').length,
  h1: document.querySelector('h1')?.textContent?.trim() ?? '',
  ctas: document.querySelectorAll('#hero a').length,
  fallbackVisible:
    getComputedStyle(
      document.querySelector('[data-frontier-fallback]') ?? document.body,
    ).display !== 'none',
}))
await fallbackContext.close()
await fallbackBrowser.close()
const expectedWebglFailure = (message) =>
  /WebGL context|Error creating WebGL context/i.test(message)
const fallbackUnexpectedErrors = [
  ...fallbackDiagnostics.consoleErrors,
  ...fallbackDiagnostics.pageErrors,
].filter((message) => !expectedWebglFailure(message))
report.webglFallback = {
  ...fallbackMetrics,
  ...fallbackDiagnostics,
  expectedContextErrors: [
    ...fallbackDiagnostics.consoleErrors,
    ...fallbackDiagnostics.pageErrors,
  ].filter(expectedWebglFailure),
  unexpectedErrors: fallbackUnexpectedErrors,
  pass:
    fallbackMetrics.state === 'fallback' &&
    fallbackMetrics.canvases === 0 &&
    fallbackMetrics.h1.includes('Paulo Pierrondi') &&
    fallbackMetrics.ctas === 2 &&
    fallbackMetrics.fallbackVisible &&
    fallbackUnexpectedErrors.length === 0,
}

const noJsContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false,
  colorScheme: 'dark',
})
const noJsPage = await noJsContext.newPage()
const noJsResponse = await noJsPage.goto(`${baseUrl}/`, {
  waitUntil: 'domcontentloaded',
})
await noJsPage.screenshot({
  path: path.join(outputDir, 'frontier-hero-no-js-390.png'),
  fullPage: false,
})
const noJsMetrics = await noJsPage.evaluate(() => ({
  h1: document.querySelector('h1')?.textContent?.trim() ?? '',
  ctas: document.querySelectorAll('#hero a').length,
  fallback: document.querySelectorAll('[data-frontier-fallback]').length,
}))
await noJsContext.close()
report.noJavaScript = {
  status: noJsResponse?.status(),
  ...noJsMetrics,
  pass:
    noJsResponse?.status() === 200 &&
    noJsMetrics.h1.includes('Paulo Pierrondi') &&
    noJsMetrics.ctas === 2 &&
    noJsMetrics.fallback >= 1,
}

await browser.close()
report.pass =
  report.viewports.every((viewport) => viewport.pass) &&
  report.english.pass &&
  report.reducedMotion.pass &&
  report.webglFallback.pass &&
  report.noJavaScript.pass

await writeFile(
  path.join(outputDir, 'qa-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
