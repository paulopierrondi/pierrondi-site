import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3108'
const outputDir = path.resolve(process.env.QA_DIR ?? 'qa/navigation/local')
const routes = [
  { name: 'home-pt', path: '/', labels: ['Bio', 'Atuação', 'Studio', 'Portfólio', 'Feitos', 'Ideias', 'Contato'], active: '' },
  { name: 'studio-pt', path: '/studio', labels: ['Bio', 'Atuação', 'Studio', 'Portfólio', 'Feitos', 'Ideias', 'Contato'], active: 'studio' },
  { name: 'portfolio-pt', path: '/portfolio', labels: ['Bio', 'Atuação', 'Studio', 'Portfólio', 'Feitos', 'Ideias', 'Contato'], active: 'portfolio' },
  { name: 'feitos-pt', path: '/feitos', labels: ['Bio', 'Atuação', 'Studio', 'Portfólio', 'Feitos', 'Ideias', 'Contato'], active: 'proof' },
  { name: 'home-en', path: '/en', labels: ['About', 'Work', 'Studio', 'Portfolio', 'Proof', 'Ideas', 'Contact'], active: '' },
  { name: 'studio-en', path: '/en/studio', labels: ['About', 'Work', 'Studio', 'Portfolio', 'Proof', 'Ideas', 'Contact'], active: 'studio' },
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
    failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`)
  })
  return { consoleErrors, pageErrors, failedRequests }
}

async function createContext(viewport) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    locale: 'pt-BR',
  })
  await context.addInitScript(() => localStorage.setItem('cookie-consent', 'essential'))
  return context
}

async function inspect(route, viewport, mobile) {
  const context = await createContext(viewport)
  const page = await context.newPage()
  const diagnostics = attachDiagnostics(page)
  const response = await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(850)

  const metrics = await page.evaluate(() => {
    const header = document.querySelector('[data-public-navigation]')
    const brand = header?.querySelector('a[aria-label*="Pierrondi.dev"]')
    const links = [...(header?.querySelectorAll('[data-public-nav-key]') ?? [])]
    const burger = header?.querySelector('[data-public-nav-burger]')
    const language = document.querySelector('nav[aria-label="Language selector"]')
    const headerBox = header?.getBoundingClientRect()
    const brandBox = brand?.getBoundingClientRect()
    const linksBox = header?.querySelector('[data-public-nav-links]')?.getBoundingClientRect()
    const languageBox = language?.getBoundingClientRect()

    return {
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      headerHeight: headerBox?.height ?? 0,
      headerTop: headerBox?.top ?? -1,
      brandLeft: brandBox?.left ?? -1,
      brandText: brand?.textContent?.replace(/\s+/g, '') ?? '',
      navCenter: linksBox ? linksBox.left + linksBox.width / 2 : -1,
      labels: links.map((link) => link.textContent?.trim() ?? ''),
      hrefs: links.map((link) => link.getAttribute('href') ?? ''),
      activeKey: links.find((link) => link.getAttribute('aria-current'))?.getAttribute('data-public-nav-key') ?? '',
      burgerVisible: burger ? getComputedStyle(burger).display !== 'none' : false,
      languageTop: languageBox?.top ?? -1,
      languageActive: language?.querySelector('[aria-current="page"]')?.textContent?.trim() ?? '',
    }
  })

  let mobileMenu = null
  if (mobile) {
    await page.locator('[data-public-nav-burger]').click()
    await page.waitForTimeout(180)
    mobileMenu = await page.evaluate(() => {
      const links = [...document.querySelectorAll('[data-public-nav-key]')]
      const nav = document.querySelector('[data-public-nav-links]')
      const box = nav?.getBoundingClientRect()
      return {
        expanded: document.querySelector('[data-public-nav-burger]')?.getAttribute('aria-expanded'),
        visibleLinks: links.filter((link) => link.getBoundingClientRect().height > 0).length,
        menuTop: box?.top ?? -1,
        bodyOverflow: document.body.style.overflow,
      }
    })
  }

  await page.screenshot({
    path: path.join(outputDir, `${route.name}-${mobile ? 'mobile-390' : 'desktop-1440'}.png`),
    fullPage: false,
  })

  if (mobile) {
    await page.keyboard.press('Escape')
    await page.waitForTimeout(80)
  }

  const pass = response?.status() === 200
    && metrics.scrollWidth <= metrics.viewportWidth
    && metrics.headerTop === 0
    && Math.abs(metrics.headerHeight - (mobile ? 56 : 64)) < 0.5
    && metrics.brandText === '<pierrondi.dev/>'
    && JSON.stringify(metrics.labels) === JSON.stringify(route.labels)
    && metrics.activeKey === route.active
    && metrics.burgerVisible === mobile
    && Math.abs(metrics.navCenter - metrics.viewportWidth / 2) < (mobile ? metrics.viewportWidth : 2)
    && (route.path.startsWith('/en') ? metrics.languageActive === 'EN' : metrics.languageActive === 'PT')
    && (!mobile || (
      mobileMenu?.expanded === 'true'
      && mobileMenu.visibleLinks === 7
      && Math.abs(mobileMenu.menuTop - 56) < 0.5
      && mobileMenu.bodyOverflow === 'hidden'
    ))
    && diagnostics.consoleErrors.length === 0
    && diagnostics.pageErrors.length === 0
    && diagnostics.failedRequests.length === 0

  await context.close()
  return { route: route.path, status: response?.status(), metrics, mobileMenu, ...diagnostics, pass }
}

const desktop = []
const mobile = []
for (const route of routes) {
  desktop.push(await inspect(route, { width: 1440, height: 900 }, false))
  mobile.push(await inspect(route, { width: 390, height: 844 }, true))
}

const desktopHeaderHeights = new Set(desktop.map((item) => item.metrics.headerHeight))
const desktopBrandLefts = new Set(desktop.map((item) => item.metrics.brandLeft))
const mobileHeaderHeights = new Set(mobile.map((item) => item.metrics.headerHeight))
const mobileBrandLefts = new Set(mobile.map((item) => item.metrics.brandLeft))
const parity = {
  desktopHeaderHeights: [...desktopHeaderHeights],
  desktopBrandLefts: [...desktopBrandLefts],
  mobileHeaderHeights: [...mobileHeaderHeights],
  mobileBrandLefts: [...mobileBrandLefts],
  pass: desktopHeaderHeights.size === 1
    && desktopBrandLefts.size === 1
    && mobileHeaderHeights.size === 1
    && mobileBrandLefts.size === 1,
}

await browser.close()
const report = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  desktop,
  mobile,
  parity,
  pass: desktop.every((item) => item.pass) && mobile.every((item) => item.pass) && parity.pass,
}

await writeFile(path.join(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exitCode = 1
