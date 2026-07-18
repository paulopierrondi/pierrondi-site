import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')
const { getCurrentLanguage } = await import('../lib/i18n/site-language.ts')

const [
  sitemap,
  robots,
  redirects,
  proxy,
  enBlog,
  enFeitos,
  appDocs,
  siteSchema,
  appLanding,
  feed,
  layout,
] = await Promise.all([
  read('app/sitemap.ts'),
  read('public/robots.txt'),
  read('next.config.ts'),
  read('proxy.ts'),
  read('app/en/blog/page.tsx'),
  read('app/en/feitos/page.tsx'),
  read('app/apps/[slug]/[doc]/page.tsx'),
  read('components/SiteJsonLd.tsx'),
  read('app/apps/[slug]/page.tsx'),
  read('app/feed.xml/route.ts'),
  read('app/layout.tsx'),
])

test('sitemap contains only canonical indexable HTML routes', () => {
  for (const path of [
    '/geo.md',
    '/answers.json',
    '/llms.txt',
    '/llms-full.txt',
    '/citations',
    '/en/blog',
    '/en/feitos',
    '/privacy',
    '/privacidade',
    '/terms',
    '/termos',
  ]) {
    assert.doesNotMatch(sitemap, new RegExp(`path:\\s*'${path.replaceAll('/', '\\/')}'`))
  }

  assert.doesNotMatch(sitemap, /const appDocs\b/)
  assert.doesNotMatch(sitemap, /\/apps\/\$\{slug\}\/\$\{doc\}/)
  assert.match(sitemap, /path:\s*'\/ai-search'/)
})

test('thin locale hubs and app legal documents remain crawlable but noindex', () => {
  for (const source of [enBlog, enFeitos, appDocs]) {
    assert.match(source, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/)
  }
})

test('robots does not block public redirects or noindex pages', () => {
  assert.doesNotMatch(robots, /^Disallow:\s*\/login$/m)
  assert.doesNotMatch(robots, /^Disallow:\s*\/whypaulo$/m)
  assert.match(robots, /^User-agent:\s*OAI-SearchBot$/m)
  assert.match(robots, /^Sitemap:\s*https:\/\/www\.pierrondi\.dev\/sitemap\.xml$/m)
})

test('legacy GSC URLs resolve to one canonical destination', () => {
  const expected = [
    ['/answers', '/ai-search'],
    ['/citations', '/ai-search'],
    ['/en/sobre', '/en/about'],
    ['/pt', '/'],
    ['/es', '/'],
    ['/en/privacy', '/privacy'],
    ['/es/terms', '/terms'],
    ['/pt/login', '/crm/login'],
  ]

  for (const [source, destination] of expected) {
    assert.match(
      redirects,
      new RegExp(
        `source:\\s*'${source.replaceAll('/', '\\/')}',\\s*destination:\\s*'${destination.replaceAll('/', '\\/')}',\\s*permanent:\\s*true`,
      ),
    )
  }
})

test('locale delivery is stable and retired breach URLs return 410', () => {
  assert.doesNotMatch(proxy, /detectLanguageSignal|applyLanguageRouting|cf-ipcountry|accept-language/)
  assert.match(proxy, /'Content-Language'/)
  assert.match(proxy, /isRetiredBreachRoute/)
  assert.match(proxy, /status:\s*410/)
  assert.equal(getCurrentLanguage('/ai-search'), 'en')
  assert.equal(getCurrentLanguage('/apps/investcoach'), 'en')
  assert.equal(getCurrentLanguage('/en'), 'en')
  assert.equal(getCurrentLanguage('/'), 'pt')
})

test('entity graph defines its publisher and machine files are not sameAs identities', () => {
  assert.match(siteSchema, /'@id':\s*`\$\{SITE_URL\}\/#organization`/)
  assert.match(siteSchema, /publisher:\s*\{\s*'@id':\s*`\$\{SITE_URL\}\/#organization`\s*\}/)
  assert.doesNotMatch(siteSchema, /sameAs:\s*\[[^\]]*(?:answers\.json|llms\.txt)/)
  assert.match(siteSchema, /subjectOf:/)
})

test('app schema uses verified catalog data without claiming a zero price', () => {
  assert.match(appLanding, /app-store-catalog\.json/)
  assert.match(appLanding, /softwareVersion/)
  assert.match(appLanding, /downloadUrl/)
  assert.doesNotMatch(appLanding, /offers:\s*\{\s*'@type':\s*'Offer'/)
  assert.doesNotMatch(appLanding, /price:\s*'0'/)
})

test('RSS identifies the real creator without a fictitious mailbox', () => {
  assert.match(layout, /'application\/rss\+xml':\s*`\$\{SITE_URL\}\/feed\.xml`/)
  assert.match(feed, /xmlns:dc=/)
  assert.match(feed, /<dc:creator>Paulo Pierrondi<\/dc:creator>/)
  assert.doesNotMatch(feed, /noreply@/)
})
