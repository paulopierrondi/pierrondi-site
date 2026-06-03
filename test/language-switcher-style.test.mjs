import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const switcherCss = await readFile(
  new URL('../components/LanguageSwitcher.module.css', import.meta.url),
  'utf8',
)
const switcherSource = await readFile(
  new URL('../components/LanguageSwitcher.tsx', import.meta.url),
  'utf8',
)

test('global language picker is compact and does not use the old blocky neon treatment', () => {
  assert.match(switcherCss, /border-radius:\s*999px/)
  assert.match(switcherCss, /safe-area-inset-top/)
  assert.match(switcherCss, /--language-active/)
  assert.match(switcherCss, /\.switcher\.withTopNav/)
  assert.match(switcherSource, /hasTopNav/)
  assert.doesNotMatch(switcherCss, /minmax\(38px,\s*1fr\)/)
  assert.doesNotMatch(switcherCss, /#c8ff2e/i)
})
