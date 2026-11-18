import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import test from 'node:test'
import GoogleAnalytics, { readGa4PageView, subscribeToAnalyticsConsent } from '../components/GoogleAnalytics.tsx'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

const GA4_MEASUREMENT_ID = 'G-1CL8PFYY7T'

const [
  layout,
  ga,
  banner,
  cspConfig,
  sitemap,
  home,
  homeEn,
  siteSchema,
  ptLayout,
  enLayout,
] = await Promise.all([
  read('components/SiteRootDocument.tsx'),
  read('components/GoogleAnalytics.tsx'),
  read('components/CookieBanner.tsx'),
  read('next.config.ts'),
  read('app/sitemap.ts'),
  read('app/(pt)/page.tsx'),
  read('app/(en)/en/page.tsx'),
  read('components/SiteJsonLd.tsx'),
  read('app/(pt)/layout.tsx'),
  read('app/(en)/layout.tsx'),
])

test('root layout always injects gtag.js for G-1CL8PFYY7T without an env gate', () => {
  assert.match(layout, /const GA4_MEASUREMENT_ID = 'G-1CL8PFYY7T'/)
  assert.match(layout, /<script[\s\S]*googletagmanager\.com\/gtag\/js\?id=\$\{GA4_MEASUREMENT_ID\}/)
  assert.match(layout, /dangerouslySetInnerHTML/)
  assert.match(layout, /gtag\('consent', 'default'/)
  assert.match(layout, /analytics_storage: 'denied'/)
  assert.match(layout, /gtag\('config', '\$\{GA4_MEASUREMENT_ID\}', \{ anonymize_ip: true, send_page_view: false \}\)/)
  assert.equal((layout.match(/googletagmanager\.com\/gtag\/js\?id=/g) ?? []).length, 1)
  assert.equal((layout.match(/gtag\('config',/g) ?? []).length, 1)
  assert.equal((layout.match(/send_page_view/g) ?? []).length, 1)
  assert.match(ptLayout, /<SiteRootDocument lang="pt-BR">/)
  assert.match(enLayout, /<SiteRootDocument lang="en-US">/)
  assert.doesNotMatch(layout, /NEXT_PUBLIC_GA_MEASUREMENT_ID/)
  assert.doesNotMatch(layout, /strategy="beforeInteractive"/)
  assert.equal([...layout.matchAll(/G-[A-Z0-9]+/g)].map((match) => match[0]).every((id) => id === GA4_MEASUREMENT_ID), true)
})

test('GA client renders no UI and sends page_view itself instead of a second config', () => {
  assert.equal(renderToStaticMarkup(createElement(GoogleAnalytics, { measurementId: GA4_MEASUREMENT_ID })), '')
  assert.match(ga, /usePathname/)
  assert.doesNotMatch(ga, /gtag\(\s*['"]config['"]/)
  assert.match(ga, /page_location/)
  assert.match(ga, /page_path/)
  assert.match(ga, /page_title/)
  assert.match(ga, /'page_view'/)
  assert.doesNotMatch(ga, /googletagmanager\.com\/gtag\/js/)
  assert.match(ga, /subscribeToAnalyticsConsent\(window,\s*window\.localStorage/)
  assert.match(ga, /\},\s*\[measurementId\]\)/)
  assert.deepEqual(
    readGa4PageView({
      location: { href: 'https://www.pierrondi.dev/en/feitos?utm_source=x', pathname: '/en/feitos', search: '?utm_source=x' },
      document: { title: 'Work' },
    }),
    {
      page_location: 'https://www.pierrondi.dev/en/feitos?utm_source=x',
      page_path: '/en/feitos?utm_source=x',
      page_title: 'Work',
    },
  )
})

function installAnalyticsTarget(initialConsent) {
  const target = new EventTarget()
  const calls = []
  target.gtag = (...args) => calls.push(args)
  target.location = { href: 'https://www.pierrondi.dev/contato', pathname: '/contato', search: '' }
  target.document = { title: 'Contato' }
  let consent = initialConsent
  const storage = {
    getItem: (key) => key === 'cookie-consent' ? consent : null,
    setConsent: (value) => { consent = value },
  }
  const routes = { current: null }
  return { target, calls, storage, routes }
}

const contatoPageView = [
  'event',
  'page_view',
  {
    page_location: 'https://www.pierrondi.dev/contato',
    page_path: '/contato',
    page_title: 'Contato',
  },
]

test('GA consent sync only grants stored all-consent and removes its listener', () => {
  const { target, calls, storage, routes } = installAnalyticsTarget('essential')

  const cleanup = subscribeToAnalyticsConsent(target, storage, routes)
  assert.deepEqual(calls, [])
  routes.current()
  assert.deepEqual(calls, [])

  storage.setConsent('all')
  target.dispatchEvent(new Event('cookie-consent-granted'))
  assert.deepEqual(calls, [
    ['consent', 'update', { analytics_storage: 'granted' }],
    contatoPageView,
  ])

  target.dispatchEvent(new Event('cookie-consent-granted'))
  assert.equal(calls.length, 2)

  cleanup()
  assert.equal(routes.current, null)
  target.dispatchEvent(new Event('cookie-consent-granted'))
  assert.equal(calls.length, 2)
})

test('GA consent sync applies an existing all-consent grant once on mount', () => {
  const { target, calls, storage, routes } = installAnalyticsTarget('all')

  const cleanup = subscribeToAnalyticsConsent(target, storage, routes)
  assert.deepEqual(calls, [
    ['consent', 'update', { analytics_storage: 'granted' }],
    contatoPageView,
  ])
  target.dispatchEvent(new Event('popstate'))
  routes.current()
  assert.equal(calls.length, 2)
  cleanup()

  // Same document remount (React Strict Mode) must not send the URL again.
  const remountRoutes = { current: null }
  subscribeToAnalyticsConsent(target, storage, remountRoutes)
  assert.equal(calls.length, 2)
  remountRoutes.current()
  assert.equal(calls.length, 2)
})

test('GA route changes send one page_view for the new path while consent stays granted', () => {
  const { target, calls, storage, routes } = installAnalyticsTarget('all')
  const cleanup = subscribeToAnalyticsConsent(target, storage, routes)
  assert.equal(calls.length, 2)

  target.location = {
    href: 'https://www.pierrondi.dev/en/feitos?utm_source=x',
    pathname: '/en/feitos',
    search: '?utm_source=x',
  }
  target.document = { title: 'Work' }
  routes.current()
  assert.deepEqual(calls[2], [
    'event',
    'page_view',
    {
      page_location: 'https://www.pierrondi.dev/en/feitos?utm_source=x',
      page_path: '/en/feitos?utm_source=x',
      page_title: 'Work',
    },
  ])
  assert.equal(calls.filter(([command]) => command === 'consent').length, 1)

  routes.current()
  assert.equal(calls.length, 3)

  target.location = { href: 'https://www.pierrondi.dev/contato', pathname: '/contato', search: '' }
  target.document = { title: 'Contato' }
  routes.current()
  assert.equal(calls.length, 4)
  assert.deepEqual(calls[3], contatoPageView)

  cleanup()
})

test('cookie banner can grant consent on immersive home routes', () => {
  assert.doesNotMatch(banner, /isImmersiveHomeRoute/)
  assert.match(banner, /usesOwnAppChrome/)
  assert.match(banner, /cookie-consent-granted/)
  assert.match(banner, /localStorage\.setItem\('cookie-consent', level\)/)
})

test('CSP allows gtag.js and GA4 collect without changing Plausible', () => {
  assert.match(cspConfig, /script-src[^"]*https:\/\/plausible\.io[^"]*https:\/\/www\.googletagmanager\.com/)
  assert.match(cspConfig, /connect-src[^"]*https:\/\/plausible\.io/)
  assert.match(cspConfig, /connect-src[^"]*https:\/\/www\.googletagmanager\.com/)
  assert.match(cspConfig, /connect-src[^"]*https:\/\/www\.google-analytics\.com/)
  assert.match(cspConfig, /connect-src[^"]*https:\/\/\*\.google-analytics\.com/)
  assert.match(cspConfig, /connect-src[^"]*https:\/\/\*\.analytics\.google\.com/)
  assert.match(cspConfig, /img-src[^"]*https:\/\/www\.googletagmanager\.com/)
  assert.match(cspConfig, /img-src[^"]*https:\/\/www\.google-analytics\.com/)
})

test('GA4 fix does not publish /sprint or add Product schema', () => {
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  for (const source of [home, homeEn, siteSchema]) {
    assert.doesNotMatch(source, /@type': 'Product'/)
  }
  assert.match(home, /@type': \['WebPage', 'ProfilePage'\]/)
  assert.match(homeEn, /@type': \['WebPage', 'ProfilePage'\]/)
})
