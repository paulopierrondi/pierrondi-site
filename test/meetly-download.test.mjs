import assert from 'node:assert/strict'
import test from 'node:test'

import { GET, HEAD } from '../app/downloads/meetly/route.ts'

const RELEASE_URL =
  'https://github.com/paulopierrondi/paulopierrondi.github.io/releases/download/meetly-v0.1.1/Meetly-0.1.1-arm64.dmg'

test('Meetly GET redirects to the fixed public, versioned release URL', async () => {
  const response = GET()

  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), RELEASE_URL)
  assert.equal(response.headers.get('cache-control'), 'private, no-store, max-age=0')
  assert.equal(await response.text(), '')
})

test('Meetly HEAD exposes the same destination without a body', async () => {
  const response = HEAD()

  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), RELEASE_URL)
  assert.equal(await response.text(), '')
})
