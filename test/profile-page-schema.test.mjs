import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const authority = await readFile(new URL('../lib/authority/authority.ts', import.meta.url), 'utf8')
const home = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
const homeEn = await readFile(new URL('../app/en/page.tsx', import.meta.url), 'utf8')
const contact = await readFile(new URL('../lib/contact.ts', import.meta.url), 'utf8')
const paulo = await readFile(new URL('../app/paulo/page.tsx', import.meta.url), 'utf8')

test('ProfilePage JSON-LD includes required mainEntity Person', () => {
  assert.match(authority, /export const profilePageMainEntity/)
  assert.match(authority, /@type': 'Person'/)
  assert.match(authority, /name: 'Paulo Pierrondi'/)
  assert.match(authority, /#person/)
  assert.match(authority, /mainEntity: profilePageMainEntity/)

  assert.match(home, /@type': 'ProfilePage'/)
  assert.match(home, /mainEntity: profilePageMainEntity/)
  assert.match(home, /from '@\/lib\/authority\/authority'/)

  assert.match(homeEn, /@type': 'ProfilePage'/)
  assert.match(homeEn, /mainEntity: profilePageMainEntity/)
  assert.match(homeEn, /from '@\/lib\/authority\/authority'/)
})

test('official Person entity URL is the homepage with real sameAs profiles only', () => {
  assert.match(contact, /export const OFFICIAL_SAME_AS/)
  assert.match(contact, /linkedin\.com\/in\/paulopierrondi/)
  assert.match(contact, /github\.com\/paulopierrondi/)

  assert.match(authority, /url: SITE_URL/)
  assert.match(authority, /sameAs: \[\.\.\.OFFICIAL_SAME_AS\]/)
  assert.doesNotMatch(authority, /url: `\$\{SITE_URL\}\/paulo`/)

  assert.match(paulo, /url: SITE_URL/)
  assert.match(paulo, /sameAs: \[\.\.\.OFFICIAL_SAME_AS\]/)
  assert.doesNotMatch(paulo, /url: `\$\{SITE_URL\}\/paulo`/)
})