import assert from 'node:assert/strict'
import test from 'node:test'

import { GET as getIago, HEAD as headIago } from '../app/downloads/iago/route.ts'
import { GET as getMeetly } from '../app/downloads/meetly/route.ts'

const IAGO_RELEASE_URL =
  'https://github.com/paulopierrondi/paulopierrondi.github.io/releases/download/iago-v0.1.2/IAgo-0.1.2-arm64.dmg'
const MEETLY_RELEASE_URL =
  'https://github.com/paulopierrondi/paulopierrondi.github.io/releases/download/meetly-v0.1.1/Meetly-0.1.1-arm64.dmg'

test('IAgo GET redirects to the fixed, versioned public release URL', async () => {
  const response = getIago()

  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), IAGO_RELEASE_URL)
  assert.equal(response.headers.get('cache-control'), 'private, no-store, max-age=0')
  assert.equal(await response.text(), '')
})

test('IAgo HEAD keeps the same destination without a body', async () => {
  const response = headIago()

  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), IAGO_RELEASE_URL)
  assert.equal(await response.text(), '')
})

test('Meetly compatibility URL still points to the 0.1.1 release', () => {
  assert.equal(getMeetly().headers.get('location'), MEETLY_RELEASE_URL)
})
