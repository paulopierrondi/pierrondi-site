import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BRADESCO_NO_STORE =
  'no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/Paulo') {
    const url = request.nextUrl.clone()
    url.pathname = '/paulo'
    return NextResponse.redirect(url, 308)
  }

  const response = NextResponse.next()

  response.headers.set('Cache-Control', BRADESCO_NO_STORE)
  response.headers.set('CDN-Cache-Control', 'no-store')
  response.headers.set('Surrogate-Control', 'no-store')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')

  return response
}

export const config = {
  matcher: ['/Paulo', '/bradesco-26', '/bradesco-26/:path*', '/itau', '/itau/:path*'],
}
