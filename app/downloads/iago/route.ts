const IAGO_RELEASE_URL =
  'https://github.com/paulopierrondi/paulopierrondi.github.io/releases/download/iago-v0.1.2/IAgo-0.1.2-arm64.dmg'

function redirectToIagoRelease(): Response {
  return new Response(null, {
    status: 307,
    headers: {
      location: IAGO_RELEASE_URL,
      'cache-control': 'private, no-store, max-age=0',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'no-referrer',
    },
  })
}

export const dynamic = 'force-dynamic'
export const GET = redirectToIagoRelease
export const HEAD = redirectToIagoRelease
