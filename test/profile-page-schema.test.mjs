import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const authority = await readFile(new URL('../lib/authority/authority.ts', import.meta.url), 'utf8')
const home = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
const homeEn = await readFile(new URL('../app/en/page.tsx', import.meta.url), 'utf8')
const contact = await readFile(new URL('../lib/contact.ts', import.meta.url), 'utf8')
const paulo = await readFile(new URL('../app/paulo/page.tsx', import.meta.url), 'utf8')
const siteSchema = await readFile(new URL('../components/SiteJsonLd.tsx', import.meta.url), 'utf8')
const homeCopy = await readFile(new URL('../components/home-v2/copy.ts', import.meta.url), 'utf8')

test('home JSON-LD is WebPage + ProfilePage about Person', () => {
  assert.match(authority, /export const profilePageMainEntity/)
  assert.match(authority, /@type': 'Person'/)
  assert.match(authority, /name: 'Paulo Pierrondi'/)
  assert.match(authority, /#person/)
  assert.match(authority, /mainEntity: profilePageMainEntity/)
  assert.match(
    authority,
    /disambiguatingDescription:\s*'Official website of Paulo Pierrondi at https:\/\/www\.pierrondi\.dev/,
  )

  for (const source of [home, homeEn]) {
    assert.match(source, /@type': \['WebPage', 'ProfilePage'\]/)
    assert.match(source, /#webpage/)
    assert.match(source, /about: \{ '@id': `\$\{SITE_URL\}\/#person` \}/)
    assert.match(source, /mainEntity: profilePageMainEntity/)
    assert.match(source, /publisher: \{ '@id': `\$\{SITE_URL\}\/#organization` \}/)
    assert.match(source, /from '@\/lib\/authority\/authority'/)
    assert.doesNotMatch(source, /@type': 'Product'/)
  }
})

test('Person and Organization name the official site and keep real sameAs only', () => {
  assert.match(contact, /export const OFFICIAL_SAME_AS/)
  assert.match(contact, /linkedin\.com\/in\/paulopierrondi/)
  assert.match(contact, /github\.com\/paulopierrondi/)
  assert.doesNotMatch(contact, /instagram\.com|twitter\.com|x\.com|facebook\.com/)

  assert.match(siteSchema, /'@type': 'Person'/)
  assert.match(siteSchema, /'@type': 'Organization'/)
  assert.match(
    siteSchema,
    /disambiguatingDescription:\s*'Official website of Paulo Pierrondi at https:\/\/www\.pierrondi\.dev/,
  )
  assert.match(
    siteSchema,
    /disambiguatingDescription:\s*'Official site of Paulo Pierrondi at https:\/\/www\.pierrondi\.dev/,
  )
  assert.match(siteSchema, /sameAs: \[\.\.\.OFFICIAL_SAME_AS\]/)
  assert.doesNotMatch(siteSchema, /@type': 'Product'/)
  assert.doesNotMatch(siteSchema, /instagram\.com|twitter\.com|x\.com|facebook\.com/)

  assert.match(authority, /url: SITE_URL/)
  assert.match(authority, /sameAs: \[\.\.\.OFFICIAL_SAME_AS\]/)
  assert.doesNotMatch(authority, /url: `\$\{SITE_URL\}\/paulo`/)

  assert.match(paulo, /url: SITE_URL/)
  assert.match(paulo, /sameAs: \[\.\.\.OFFICIAL_SAME_AS\]/)
  assert.doesNotMatch(paulo, /url: `\$\{SITE_URL\}\/paulo`/)
})

test('home title and H1 still lead with Paulo Pierrondi', () => {
  assert.match(home, /title: 'Paulo Pierrondi — /)
  assert.match(homeEn, /title: 'Paulo Pierrondi — /)
  assert.match(homeCopy, /headlineLine1: 'Paulo Pierrondi'/)
  assert.equal((homeCopy.match(/headlineLine1: 'Paulo Pierrondi'/g) || []).length, 2)
})