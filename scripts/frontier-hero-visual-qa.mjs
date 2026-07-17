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
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1536', width: 1536, height: 864 },
  { name: 'desktop-wide-2048', width: 2048, height: 1080 },
]

const PT_LANE_HREFS = ['/feitos', '/portfolio']
const EN_LANE_HREFS = ['/en/feitos', '/en/portfolio']

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

// With WebGL live the static fallback must crossfade out; both compositions
// stacked is the "two globes + stray ring" defect.
async function verifyFallbackRetired(page) {
  try {
    await page.waitForFunction(
      () => {
        const scene = document.querySelector('[data-frontier-scene]')
        const fallback = document.querySelector('[data-frontier-fallback]')
        if (!scene || !fallback) return false
        if (scene.getAttribute('data-frontier-state') !== 'ready') return true
        return getComputedStyle(fallback).opacity === '0'
      },
      undefined,
      { timeout: 6_000 },
    )
    return true
  } catch {
    return false
  }
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
    const prelude = hero?.querySelector('[data-hero-prelude]')
    const description = heading?.nextElementSibling
    const badges = description?.nextElementSibling
    const ctaGroup = hero?.querySelector('[data-hero-ctas]')
    const laneGroup = hero?.querySelector('[data-hero-lanes]')
    // Primary CTAs only — lane cards live outside [data-hero-ctas].
    const ctas = [...(hero?.querySelectorAll('[data-hero-ctas] a') ?? [])]
    const lanes = [...(hero?.querySelectorAll('[data-hero-lanes] a') ?? [])]
    const toMetrics = (element) => {
      const rect = element.getBoundingClientRect()
      return {
        text: element.textContent?.replace(/\s+/g, ' ').trim() ?? '',
        href: element.getAttribute('href') ?? '',
        visible: rect.width > 0 && rect.height > 0,
        inViewport:
          rect.left >= 0 &&
          rect.right <= window.innerWidth &&
          rect.top >= 0 &&
          rect.bottom <= window.innerHeight,
      }
    }
    const layoutRects = [
      prelude,
      heading,
      description,
      badges,
      ctaGroup,
      laneGroup,
    ].map((element) => element?.getBoundingClientRect() ?? null)
    const layoutOrdered = layoutRects.every((rect, index) => {
      if (!rect || index === 0) return true
      const previous = layoutRects[index - 1]
      return !previous || previous.bottom <= rect.top + 0.5
    })
    return {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      scrollY: window.scrollY,
      scrollWidth: document.documentElement.scrollWidth,
      heroRect: hero?.getBoundingClientRect().toJSON() ?? null,
      h1Count: document.querySelectorAll('h1').length,
      headingText: heading?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      preludeText: prelude?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      preludeInViewport: prelude
        ? prelude.getBoundingClientRect().top >= 0 &&
          prelude.getBoundingClientRect().bottom <= window.innerHeight
        : false,
      layoutOrdered,
      sceneState: scene?.getAttribute('data-frontier-state') ?? '',
      sceneActive: scene?.getAttribute('data-frontier-active') ?? '',
      canvases: scene?.querySelectorAll('canvas').length ?? 0,
      ctas: ctas.map(toMetrics),
      lanes: lanes.map(toMetrics),
    }
  })
}

function lanesPass(lanes, expectedHrefs) {
  if (!Array.isArray(lanes) || lanes.length !== 2) return false
  const hrefs = lanes.map((lane) => lane.href)
  return (
    expectedHrefs.every((href) => hrefs.includes(href)) &&
    lanes.every((lane) => lane.visible && Boolean(lane.href))
  )
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
  fallbackRetired,
  diagnostics,
}) {
  const ctasPass =
    metrics.ctas.length === 2 &&
    metrics.ctas.every((cta) => cta.visible && cta.inViewport)
  const framePass = frameChanged === null ? true : frameChanged
  const lanesFitPass =
    metrics.viewportWidth < 768 ||
    metrics.lanes.every((lane) => lane.inViewport)
  return [
    response?.status() === 200,
    metrics.scrollWidth <= metrics.viewportWidth,
    metrics.h1Count === 1,
    metrics.preludeText.includes('001'),
    metrics.preludeText.toLowerCase().includes('frontier'),
    metrics.preludeInViewport,
    metrics.layoutOrdered,
    metrics.headingText.includes('Paulo Pierrondi'),
    metrics.headingText.includes('operação com evidência') ||
      metrics.headingText.includes('governed operations'),
    metrics.sceneState === 'ready',
    metrics.canvases === 1,
    ctasPass,
    lanesPass(metrics.lanes, PT_LANE_HREFS),
    lanesFitPass,
    pausedOffscreen,
    fallbackRetired,
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

  const fallbackRetired = await verifyFallbackRetired(page)
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
    fallbackRetired,
    diagnostics,
  })

  return {
    ...viewport,
    status: response?.status(),
    metrics,
    frameChanged,
    framePerformance,
    pausedOffscreen,
    fallbackRetired,
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
const englishMetrics = await englishPage.evaluate(() => {
  const ctas = [...document.querySelectorAll('#hero [data-hero-ctas] a')].map(
    (element) => ({
      text: element.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      href: element.getAttribute('href') ?? '',
      visible:
        element.getBoundingClientRect().width > 0 &&
        element.getBoundingClientRect().height > 0,
    }),
  )
  const lanes = [...document.querySelectorAll('#hero [data-hero-lanes] a')].map(
    (element) => ({
      text: element.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      href: element.getAttribute('href') ?? '',
      visible:
        element.getBoundingClientRect().width > 0 &&
        element.getBoundingClientRect().height > 0,
    }),
  )
  return {
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
    ctas,
    lanes,
  }
})
await englishContext.close()
report.english = {
  status: englishResponse?.status(),
  ...englishMetrics,
  ...englishDiagnostics,
  pass:
    englishResponse?.status() === 200 &&
    englishMetrics.h1.includes('Paulo Pierrondi') &&
    englishMetrics.h1.includes('governed operations') &&
    englishMetrics.scrollWidth <= englishMetrics.viewportWidth &&
    englishMetrics.sceneState === 'ready' &&
    englishMetrics.ctas.length === 2 &&
    englishMetrics.ctas.every((cta) => cta.visible) &&
    lanesPass(englishMetrics.lanes, EN_LANE_HREFS) &&
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
const reducedFallback = reducedPage.locator('[data-frontier-fallback]')
const reducedBefore = await reducedFallback.screenshot()
await reducedPage.waitForTimeout(550)
const reducedAfter = await reducedFallback.screenshot()
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
  loop:
    document
      .querySelector('[data-frontier-scene]')
      ?.getAttribute('data-frontier-loop') ?? '',
  canvases: document.querySelectorAll('[data-frontier-scene] canvas').length,
  fallbackVisible: (() => {
    const fallback = document.querySelector('[data-frontier-fallback]')
    return fallback ? fallback.getBoundingClientRect().width > 0 : false
  })(),
  activeFallbackAnimations: (() => {
    const fallback = document.querySelector('[data-frontier-fallback]')
    if (!fallback) return -1
    return fallback
      .getAnimations({ subtree: true })
      .filter((animation) =>
        animation.playState === 'running' || animation.playState === 'pending'
      ).length
  })(),
}))
await reducedContext.close()
const reducedFrameStable = reducedBefore.equals(reducedAfter)
report.reducedMotion = {
  ...reducedMetrics,
  screenshotByteStable: reducedFrameStable,
  ...reducedDiagnostics,
  pass:
    reducedMetrics.matches &&
    reducedMetrics.scrollWidth <= reducedMetrics.viewportWidth &&
    reducedMetrics.sceneState === 'fallback' &&
    reducedMetrics.motion === 'reduced' &&
    reducedMetrics.loop === 'never' &&
    reducedMetrics.canvases === 0 &&
    reducedMetrics.fallbackVisible &&
    reducedMetrics.activeFallbackAnimations === 0 &&
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
const fallbackMetrics = await fallbackPage.evaluate(() => {
  const ctas = [...document.querySelectorAll('#hero [data-hero-ctas] a')].map(
    (element) => ({
      href: element.getAttribute('href') ?? '',
      visible:
        element.getBoundingClientRect().width > 0 &&
        element.getBoundingClientRect().height > 0,
    }),
  )
  const lanes = [...document.querySelectorAll('#hero [data-hero-lanes] a')].map(
    (element) => ({
      href: element.getAttribute('href') ?? '',
      visible:
        element.getBoundingClientRect().width > 0 &&
        element.getBoundingClientRect().height > 0,
    }),
  )
  return {
    state:
      document
        .querySelector('[data-frontier-scene]')
        ?.getAttribute('data-frontier-state') ?? '',
    canvases: document.querySelectorAll('[data-frontier-scene] canvas').length,
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    ctas,
    lanes,
    fallbackVisible:
      getComputedStyle(
        document.querySelector('[data-frontier-fallback]') ?? document.body,
      ).display !== 'none',
  }
})
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
    fallbackMetrics.ctas.length === 2 &&
    fallbackMetrics.ctas.every((cta) => cta.visible) &&
    lanesPass(fallbackMetrics.lanes, PT_LANE_HREFS) &&
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
const noJsMetrics = await noJsPage.evaluate(() => {
  const ctas = [...document.querySelectorAll('#hero [data-hero-ctas] a')].map(
    (element) => element.getAttribute('href') ?? '',
  )
  const lanes = [...document.querySelectorAll('#hero [data-hero-lanes] a')].map(
    (element) => element.getAttribute('href') ?? '',
  )
  return {
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    ctas,
    lanes,
    fallback: document.querySelectorAll('[data-frontier-fallback]').length,
  }
})
await noJsContext.close()
report.noJavaScript = {
  status: noJsResponse?.status(),
  ...noJsMetrics,
  pass:
    noJsResponse?.status() === 200 &&
    noJsMetrics.h1.includes('Paulo Pierrondi') &&
    noJsMetrics.ctas.length === 2 &&
    noJsMetrics.lanes.length === 2 &&
    PT_LANE_HREFS.every((href) => noJsMetrics.lanes.includes(href)) &&
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
