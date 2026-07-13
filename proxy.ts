import { NextResponse, type NextRequest } from 'next/server'
import {
  getCurrentLanguage,
  resolveLocalizedPath,
  shouldHideLanguageSwitcher,
  type HomeLang,
} from '@/lib/i18n/site-language'

// ── Bradesco private briefing: never cache, never index ──
const BRADESCO_NO_STORE =
  'no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate'

function isBradescoRoute(pathname: string): boolean {
  return pathname === '/bradesco-26' || pathname.startsWith('/bradesco-26/')
}

function applyBradescoHeaders(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', BRADESCO_NO_STORE)
  response.headers.set('CDN-Cache-Control', 'no-store')
  response.headers.set('Surrogate-Control', 'no-store')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  return response
}

// ── First-visit language routing ──
// Brazil always lands on the Portuguese canonical paths (today's default);
// everyone else lands on /en. This only ever redirects PT -> EN — an
// explicit /en/... URL is always respected as-is, since arriving at one is
// itself a stronger signal than a geo/language guess (shared links,
// bookmarks). The decision is remembered in a cookie so it only ever fires
// once per visitor, and the manual language switcher can always override it.
//
// Bots/crawlers are never redirected: this site depends on both classic SEO
// and GEO (llms.txt, answers.json, hreflang) and a bot bounced off the URL
// it requested would break that.
const LANG_COOKIE = 'pierrondi_lang'
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|linkedinbot|twitterbot|pinterest|discordbot|embedly|quora link preview|outbrain|vkshare|w3c_validator|redditbot|applebot|preview|headless|lighthouse|pagespeed|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|chatgpt-user|claudebot|claude-web|anthropic-ai|perplexitybot|cohere-ai|ccbot|diffbot|amazonbot|google-extended|oai-searchbot/i

function isBotRequest(userAgent: string): boolean {
  return BOT_UA_PATTERN.test(userAgent)
}

function detectLanguageSignal(request: NextRequest): HomeLang {
  const cfCountry = request.headers.get('cf-ipcountry')
  if (cfCountry) return cfCountry.toUpperCase() === 'BR' ? 'pt' : 'en'

  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return 'pt' // no signal at all: keep today's default

  const primaryTag = acceptLanguage.split(',')[0]?.trim().split('-')[0]?.toLowerCase()
  return primaryTag === 'pt' ? 'pt' : 'en'
}

function applyLanguageRouting(request: NextRequest): NextResponse | null {
  if (request.method !== 'GET' || isBotRequest(request.headers.get('user-agent') || '')) {
    return null
  }

  const existingChoice = request.cookies.get(LANG_COOKIE)?.value
  if (existingChoice === 'pt' || existingChoice === 'en') return null

  const { pathname, search } = request.nextUrl
  const currentLang = getCurrentLanguage(pathname)

  if (currentLang !== 'pt') {
    // Already landed on an English-canonical path on first visit — respect
    // it and remember the choice so later PT-only links don't get bounced.
    const response = NextResponse.next()
    response.cookies.set(LANG_COOKIE, 'en', { maxAge: LANG_COOKIE_MAX_AGE, path: '/', sameSite: 'lax' })
    return response
  }

  if (shouldHideLanguageSwitcher(pathname)) {
    // Single-language route (no real EN counterpart) — nothing to decide
    // yet, don't burn the one-time redirect on it.
    return null
  }

  const signal = detectLanguageSignal(request)

  if (signal === 'en') {
    const target = resolveLocalizedPath(pathname, 'en', search)
    const response = NextResponse.redirect(new URL(target, request.url), 307)
    response.cookies.set(LANG_COOKIE, 'en', { maxAge: LANG_COOKIE_MAX_AGE, path: '/', sameSite: 'lax' })
    return response
  }

  const response = NextResponse.next()
  response.cookies.set(LANG_COOKIE, 'pt', { maxAge: LANG_COOKIE_MAX_AGE, path: '/', sameSite: 'lax' })
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/Paulo') {
    const url = request.nextUrl.clone()
    url.pathname = '/paulo'
    return NextResponse.redirect(url, 308)
  }

  const response = applyLanguageRouting(request) ?? NextResponse.next()

  if (isBradescoRoute(pathname)) {
    return applyBradescoHeaders(response)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
