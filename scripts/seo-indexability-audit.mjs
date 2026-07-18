#!/usr/bin/env node

const FETCH_TIMEOUT_MS = 15000

function readArg(name, fallback) {
  const prefix = `--${name}=`
  const inline = process.argv.find((arg) => arg.startsWith(prefix))
  if (inline) return inline.slice(prefix.length)
  const index = process.argv.indexOf(`--${name}`)
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback
}

function normalizeUrl(value) {
  const url = new URL(value)
  url.hash = ''
  url.search = ''
  url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  return `${url.origin}${url.pathname}`
}

async function request(url) {
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'user-agent': 'pierrondi.dev local SEO indexability audit' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
  return {
    status: response.status,
    location: response.headers.get('location') || '',
    contentType: response.headers.get('content-type') || '',
    body: await response.text(),
  }
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
}

function extractCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || []
  const canonicalTag = tags.find((tag) => /\brel=["']canonical["']/i.test(tag))
  return canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || ''
}

function hasNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  return tags.some(
    (tag) =>
      /\bname=["']robots["']/i.test(tag) &&
      /\bcontent=["'][^"']*\bnoindex\b/i.test(tag),
  )
}

async function auditSitemap(base, canonicalBase) {
  const sitemapResponse = await request(`${base}/sitemap.xml`)
  if (sitemapResponse.status !== 200) {
    return {
      sitemapStatus: sitemapResponse.status,
      urls: [],
      failures: [{ route: '/sitemap.xml', reason: `expected 200, received ${sitemapResponse.status}` }],
    }
  }

  const urls = extractSitemapUrls(sitemapResponse.body)
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index)
  const failures = duplicateUrls.map((url) => ({ route: url, reason: 'duplicate sitemap URL' }))

  const machineOrNonIndexable = [
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
  ]

  for (const url of urls) {
    const pathname = new URL(url).pathname
    if (
      machineOrNonIndexable.includes(pathname) ||
      /^\/apps\/[^/]+\/(?:support|privacy|terms)$/.test(pathname)
    ) {
      failures.push({ route: pathname, reason: 'non-indexable URL present in sitemap' })
    }
  }

  const pageResults = await Promise.all(
    urls.map(async (canonicalUrl) => {
      const sourceUrl = new URL(canonicalUrl)
      const localUrl = `${base}${sourceUrl.pathname}${sourceUrl.search}`
      const response = await request(localUrl)
      const canonical = extractCanonical(response.body)
      const reasons = []

      if (response.status !== 200) reasons.push(`expected 200, received ${response.status}`)
      if (!response.contentType.includes('text/html')) {
        reasons.push(`expected text/html, received ${response.contentType || 'empty content-type'}`)
      }
      if (!canonical) {
        reasons.push('missing canonical link')
      } else if (normalizeUrl(canonical) !== normalizeUrl(canonicalUrl)) {
        reasons.push(`canonical mismatch: ${canonical}`)
      }
      if (hasNoindex(response.body)) reasons.push('sitemap page contains noindex')
      if (!normalizeUrl(canonicalUrl).startsWith(normalizeUrl(canonicalBase))) {
        reasons.push(`URL is outside canonical origin ${canonicalBase}`)
      }

      return {
        route: sourceUrl.pathname,
        canonicalUrl,
        status: response.status,
        canonical,
        reasons,
      }
    }),
  )

  for (const page of pageResults) {
    for (const reason of page.reasons) failures.push({ route: page.route, reason })
  }

  return {
    sitemapStatus: sitemapResponse.status,
    urls,
    pageResults,
    failures,
  }
}

async function auditRedirects(base) {
  const contracts = [
    ['/answers', 308, '/ai-search'],
    ['/citations', 308, '/ai-search'],
    ['/en/sobre', 308, '/en/about'],
    ['/pt', 308, '/'],
    ['/es', 308, '/'],
    ['/pt/login', 308, '/crm/login'],
    ['/en/privacy', 308, '/privacy'],
    ['/es/terms', 308, '/terms'],
  ]
  const results = []

  for (const [route, expectedStatus, expectedPath] of contracts) {
    const response = await request(`${base}${route}`)
    const actualPath = response.location
      ? new URL(response.location, base).pathname
      : ''
    results.push({
      route,
      expectedStatus,
      expectedPath,
      status: response.status,
      location: response.location,
      ok: response.status === expectedStatus && actualPath === expectedPath,
    })
  }

  for (const route of ['/breach', '/en/breach', '/es/breach', '/pt/breach']) {
    const response = await request(`${base}${route}`)
    results.push({
      route,
      expectedStatus: 410,
      expectedPath: '',
      status: response.status,
      location: response.location,
      ok: response.status === 410,
    })
  }

  return results
}

async function auditRobots(base) {
  const response = await request(`${base}/robots.txt`)
  const failures = []
  if (response.status !== 200) failures.push(`expected 200, received ${response.status}`)
  if (!response.body.includes('User-agent: OAI-SearchBot')) failures.push('OAI-SearchBot policy missing')
  if (response.body.includes('Disallow: /login\n')) failures.push('/login redirect is blocked')
  if (response.body.includes('Disallow: /whypaulo\n')) failures.push('/whypaulo redirect is blocked')
  return { status: response.status, failures }
}

const base = readArg('base', 'http://localhost:3000').replace(/\/+$/, '')
const canonicalBase = readArg('canonical-base', 'https://www.pierrondi.dev').replace(/\/+$/, '')
const [sitemap, redirects, robots] = await Promise.all([
  auditSitemap(base, canonicalBase),
  auditRedirects(base),
  auditRobots(base),
])
const redirectFailures = redirects.filter((result) => !result.ok)
const failures = [
  ...sitemap.failures,
  ...redirectFailures.map((result) => ({
    route: result.route,
    reason: `expected ${result.expectedStatus} ${result.expectedPath}, received ${result.status} ${result.location}`,
  })),
  ...robots.failures.map((reason) => ({ route: '/robots.txt', reason })),
]
const result = {
  generatedAt: new Date().toISOString(),
  base,
  canonicalBase,
  summary: {
    sitemapUrls: sitemap.urls.length,
    sitemapPagesPassed: sitemap.pageResults?.filter((page) => page.reasons.length === 0).length || 0,
    redirectContracts: redirects.length,
    failed: failures.length,
    complete: failures.length === 0,
  },
  failures,
  redirects,
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
process.exitCode = failures.length ? 1 : 0
