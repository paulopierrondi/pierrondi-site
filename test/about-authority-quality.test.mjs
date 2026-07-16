import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('about presents bilingual operating qualities from the authority registry', async () => {
  const [registryRaw, experience, styles] = await Promise.all([
    read('content/authority/paulo-authority-ops.json'),
    read('app/about/AboutAuthorityExperience.tsx'),
    read('app/about/AboutAuthorityExperience.module.css'),
  ])
  const registry = JSON.parse(registryRaw)

  assert.equal(registry.pages.pt.qualities.items.length, 5)
  assert.equal(registry.pages.en.qualities.items.length, 5)
  assert.equal(registry.pages.pt.evidence.items.length, registry.pages.en.evidence.items.length)
  assert.match(registry.pages.pt.hero.title, /para de improvisar e começa a operar/)
  assert.match(registry.pages.en.hero.title, /stops improvising and starts operating/)
  assert.match(experience, /page\.qualities\.items\.map/)
  assert.match(experience, /page\.evidence\.items\.map/)
  assert.doesNotMatch(experience, /SP_BR/)
  assert.doesNotMatch(styles, /rgba\(74, 222, 128/)
  assert.doesNotMatch(styles, /color-accent-cyan/)
})
