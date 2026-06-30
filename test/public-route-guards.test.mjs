import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const guardedPages = await Promise.all([
  readFile(new URL('../app/whypaulo/page.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../app/fso/page.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../app/itau/page.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../app/bradesco-26/page.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../app/bradesco-26/slides/page.tsx', import.meta.url), 'utf8'),
])

const sitemapSource = await readFile(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

test('sensitive public routes redirect to /about', () => {
  for (const source of guardedPages) {
    assert.match(source, /import \{ redirect \} from 'next\/navigation'/)
    assert.match(source, /redirect\('\/about'\)/)
  }
})

test('sitemap does not advertise redirected sensitive routes', () => {
  assert.doesNotMatch(sitemapSource, /path: '\/fso'/)
})
