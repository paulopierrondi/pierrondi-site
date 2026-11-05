const MEETLY_RELEASE_URL =
  'https://github.com/paulopierrondi/paulopierrondi.github.io/releases/download/meetly-v0.1.1/Meetly-0.1.1-arm64.dmg'

function redirectToMeetlyRelease(): Response {
  return new Response(null, {
    status: 307,
    headers: {
      location: MEETLY_RELEASE_URL,
      'cache-control': 'private, no-store, max-age=0',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'no-referrer',
    },
  })
}

export const dynamic = 'force-dynamic'
export const GET = redirectToMeetlyRelease
export const HEAD = redirectToMeetlyRelease
