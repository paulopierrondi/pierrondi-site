import { NextResponse, type NextRequest } from 'next/server'
import { getCurrentLanguage } from '@/lib/i18n/site-language'

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

function isRetiredBreachRoute(pathname: string): boolean {
  return /^\/(?:(?:en|es|pt)\/)?breach\/?$/.test(pathname)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/Paulo') {
    const url = request.nextUrl.clone()
    url.pathname = '/paulo'
    return NextResponse.redirect(url, 308)
  }

  if (isRetiredBreachRoute(pathname)) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  // Locale changes are explicit. IP/Accept-Language redirects make canonical
  // URLs unstable for crawlers, shared links and first-time visitors.
  const response = NextResponse.next()
  response.headers.set(
    'Content-Language',
    getCurrentLanguage(pathname) === 'en' ? 'en-US' : 'pt-BR',
  )

  if (isBradescoRoute(pathname)) {
    return applyBradescoHeaders(response)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
