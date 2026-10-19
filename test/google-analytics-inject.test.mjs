import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import test from 'node:test'
import GoogleAnalytics, { subscribeToAnalyticsConsent } from '../components/GoogleAnalytics.tsx'

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
] = await Promise.all([
  read('components/SiteRootDocument.tsx'),
  read('components/GoogleAnalytics.tsx'),
  read('components/CookieBanner.tsx'),
  read('next.config.ts'),
  read('app/sitemap.ts'),
  read('app/(pt)/page.tsx'),
  read('app/(en)/en/page.tsx'),
  read('components/SiteJsonLd.tsx'),
])

test('root layout always injects gtag.js for G-1CL8PFYY7T without an env gate', () => {
  assert.match(layout, /const GA4_MEASUREMENT_ID = 'G-1CL8PFYY7T'/)
  assert.match(layout, /<script[\s\S]*googletagmanager\.com\/gtag\/js\?id=\$\{GA4_MEASUREMENT_ID\}/)
  assert.match(layout, /dangerouslySetInnerHTML/)
  assert.match(layout, /gtag\('consent', 'default'/)
  assert.match(layout, /analytics_storage: 'denied'/)
  assert.match(layout, /gtag\('config', '\$\{GA4_MEASUREMENT_ID\}'/)
  assert.equal((layout.match(/googletagmanager\.com\/gtag\/js\?id=/g) ?? []).length, 1)
  assert.equal((layout.match(/gtag\('config',/g) ?? []).length, 1)
  assert.doesNotMatch(layout, /NEXT_PUBLIC_GA_MEASUREMENT_ID/)
  assert.doesNotMatch(layout, /strategy="beforeInteractive"/)
  assert.equal([...layout.matchAll(/G-[A-Z0-9]+/g)].map((match) => match[0]).every((id) => id === GA4_MEASUREMENT_ID), true)
})

test('GA client renders no UI and leaves route page views to the root config plus Enhanced Measurement', () => {
  assert.equal(renderToStaticMarkup(createElement(GoogleAnalytics, { measurementId: GA4_MEASUREMENT_ID })), '')
  assert.doesNotMatch(ga, /usePathname/)
  assert.doesNotMatch(ga, /gtag\(\s*['"]config['"]/)
  assert.doesNotMatch(ga, /page_view|page_path/)
  assert.doesNotMatch(ga, /googletagmanager\.com\/gtag\/js/)
  assert.match(ga, /subscribeToAnalyticsConsent\(window,\s*window\.localStorage\)/)
  assert.match(ga, /\},\s*\[measurementId\]\)/)
})

test('GA consent sync only grants stored all-consent and removes its listener', () => {
  const target = new EventTarget()
  const calls = []
  target.gtag = (...args) => calls.push(args)
  let consent = 'essential'
  const storage = { getItem: (key) => key === 'cookie-consent' ? consent : null }

  const cleanup = subscribeToAnalyticsConsent(target, storage)
  assert.deepEqual(calls, [])

  consent = 'all'
  target.dispatchEvent(new Event('cookie-consent-granted'))
  assert.deepEqual(calls, [['consent', 'update', { analytics_storage: 'granted' }]])

  cleanup()
  target.dispatchEvent(new Event('cookie-consent-granted'))
  assert.equal(calls.length, 1)
  assert.ok(calls.every(([command]) => command === 'consent'))
})

test('GA consent sync applies an existing all-consent grant once on mount', () => {
  const target = new EventTarget()
  const calls = []
  target.gtag = (...args) => calls.push(args)
  const storage = { getItem: (key) => key === 'cookie-consent' ? 'all' : null }

  const cleanup = subscribeToAnalyticsConsent(target, storage)
  assert.deepEqual(calls, [['consent', 'update', { analytics_storage: 'granted' }]])
  target.dispatchEvent(new Event('popstate'))
  assert.equal(calls.length, 1)
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
