import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

// EN index pages exist (/en/blog, /en/feitos) but the detail pages are PT-only.
// Without these redirects, any /en/blog/<slug> or /en/feitos/<slug> URL that an
// AI answer engine or a shared link constructs 404s. Provider logs caught a real
// hit: GET /en/blog/ia-enterprise-modelo-operacional. Guard the redirects so the
// gap cannot silently reopen.
const nextConfig = await readFile(new URL('../next.config.ts', import.meta.url), 'utf8')

test('EN blog/feitos detail URLs redirect to the canonical PT article', () => {
  assert.match(
    nextConfig,
    /source:\s*'\/en\/blog\/:slug',\s*destination:\s*'\/blog\/:slug',\s*permanent:\s*true/,
  )
  assert.match(
    nextConfig,
    /source:\s*'\/en\/feitos\/:slug',\s*destination:\s*'\/feitos\/:slug',\s*permanent:\s*true/,
  )
})

test('EN CRM URLs redirect to the canonical private CRM routes', () => {
  assert.match(nextConfig, /source:\s*'\/en\/crm',\s*destination:\s*'\/crm',\s*permanent:\s*true/)
  assert.match(nextConfig, /source:\s*'\/en\/crm\/login',\s*destination:\s*'\/crm\/login',\s*permanent:\s*true/)
})

test('EN app detail URLs redirect to the canonical app catalog routes', () => {
  assert.match(
    nextConfig,
    /source:\s*'\/en\/apps\/:slug',\s*destination:\s*'\/apps\/:slug',\s*permanent:\s*true/,
  )
  assert.match(
    nextConfig,
    /source:\s*'\/en\/apps\/:slug\/:doc',\s*destination:\s*'\/apps\/:slug\/:doc',\s*permanent:\s*true/,
  )
})

test('single-language citation hub redirects EN variant to canonical URL', () => {
  assert.match(
    nextConfig,
    /source:\s*'\/en\/citations',\s*destination:\s*'\/citations',\s*permanent:\s*true/,
  )
})

test('legacy AI search portfolio URLs redirect to canonical AI search hub', () => {
  assert.match(
    nextConfig,
    /source:\s*'\/ai-search-portfolio',\s*destination:\s*'\/ai-search',\s*permanent:\s*true/,
  )
  assert.match(
    nextConfig,
    /source:\s*'\/en\/ai-search-portfolio',\s*destination:\s*'\/ai-search',\s*permanent:\s*true/,
  )
})

test('EN locale slug redirects are wired into redirects()', () => {
  assert.match(nextConfig, /const EN_LOCALE_SLUG_REDIRECTS\b/)
  assert.match(nextConfig, /\.\.\.EN_LOCALE_SLUG_REDIRECTS/)
})

test('redirects use single-segment :slug so index routes stay 200', () => {
  // `:slug*` would also match /en/blog and /en/feitos themselves and wrongly
  // redirect the index pages. `:slug` requires exactly one non-empty segment.
  assert.doesNotMatch(nextConfig, /'\/en\/blog\/:slug\*'/)
  assert.doesNotMatch(nextConfig, /'\/en\/feitos\/:slug\*'/)
})
