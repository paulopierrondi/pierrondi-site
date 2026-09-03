import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

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
  read('app/layout.tsx'),
  read('components/GoogleAnalytics.tsx'),
  read('components/CookieBanner.tsx'),
  read('next.config.ts'),
  read('app/sitemap.ts'),
  read('app/page.tsx'),
  read('app/en/page.tsx'),
  read('components/SiteJsonLd.tsx'),
])

test('root layout always injects gtag.js for G-1CL8PFYY7T without an env gate', () => {
  assert.match(layout, /const GA4_MEASUREMENT_ID = 'G-1CL8PFYY7T'/)
  assert.match(layout, /googletagmanager\.com\/gtag\/js\?id=\$\{GA4_MEASUREMENT_ID\}/)
  assert.match(layout, /strategy="beforeInteractive"/)
  assert.match(layout, /gtag\('consent', 'default'/)
  assert.match(layout, /analytics_storage: 'denied'/)
  assert.match(layout, /gtag\('config', '\$\{GA4_MEASUREMENT_ID\}'/)
  assert.doesNotMatch(layout, /NEXT_PUBLIC_GA_MEASUREMENT_ID/)
  assert.equal([...layout.matchAll(/G-[A-Z0-9]+/g)].map((match) => match[0]).every((id) => id === GA4_MEASUREMENT_ID), true)
})

test('GA client updates consent on accept and never gates the loader on cookie-consent', () => {
  assert.doesNotMatch(ga, /useState\(false\)/)
  assert.doesNotMatch(ga, /if \(!measurementId \|\| !enabled\) return null/)
  assert.doesNotMatch(ga, /<Script/)
  assert.match(ga, /cookie-consent-granted/)
  assert.match(ga, /consent',\s*'update'/)
  assert.match(ga, /analytics_storage:\s*'granted'/)
  assert.match(ga, /return null/)
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
