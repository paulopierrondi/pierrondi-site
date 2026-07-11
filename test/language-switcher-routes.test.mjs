import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const siteLanguageSource = await readFile(
  new URL('../lib/i18n/site-language.ts', import.meta.url),
  'utf8',
)

test('global language picker maps deliberate PT/EN route pairs', () => {
  const requiredMappings = [
    "'/': { pt: '/', en: '/en' }",
    "'/en': { pt: '/', en: '/en' }",
    "'/about': { pt: '/about', en: '/en/about' }",
    "'/en/about': { pt: '/about', en: '/en/about' }",
    "'/citations': { pt: '/citations', en: '/citations' }",
    "'/en/citations': { pt: '/citations', en: '/citations' }",
    "'/privacidade': { pt: '/privacidade', en: '/privacy' }",
    "'/privacy': { pt: '/privacidade', en: '/privacy' }",
    "'/termos': { pt: '/termos', en: '/terms' }",
    "'/terms': { pt: '/termos', en: '/terms' }",
  ]

  for (const mapping of requiredMappings) {
    assert.ok(siteLanguageSource.includes(mapping), `Expected route mapping: ${mapping}`)
  }
})

test('global language picker keeps accessible names and URL suffixes', () => {
  const requiredSnippets = [
    "name: 'Português'",
    "name: 'English'",
    "const normalizedSearch = search ? `?${search.replace(/^\\?/, '')}` : ''",
    "const normalizedHash = hash ? `#${hash.replace(/^#/, '')}` : ''",
    "return `${mappedRoute[targetLanguage]}${suffix}`",
  ]

  for (const snippet of requiredSnippets) {
    assert.ok(siteLanguageSource.includes(snippet), `Expected language switcher snippet: ${snippet}`)
  }
})

test('global language picker is hidden on single-language or page-managed experiences', () => {
  const hiddenPrefixes = ["'/bradesco-26'", "'/fso'", "'/itau'", "'/paulo'", "'/whypaulo'", "'/control_tower'", "'/automacoes'"]

  for (const prefix of hiddenPrefixes) {
    assert.ok(siteLanguageSource.includes(prefix), `Expected hidden language switcher prefix: ${prefix}`)
  }
})
