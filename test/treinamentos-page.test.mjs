import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')
const { TREINAMENTOS_COPY } = await import('../app/treinamentos/treinamentos-content.ts')
const { buildTrainingSchema } = await import('../app/treinamentos/training-schema.ts')

const languages = ['pt', 'en']

test('training copy keeps PT and EN structurally at parity', () => {
  const [pt, en] = languages.map((lang) => TREINAMENTOS_COPY[lang])

  assert.equal(pt.tracks.items.length, en.tracks.items.length)
  assert.equal(pt.formats.items.length, en.formats.items.length)
  assert.equal(pt.method.items.length, en.method.items.length)
  assert.equal(pt.header.chips.length, en.header.chips.length)

  for (const [index, track] of pt.tracks.items.entries()) {
    const counterpart = en.tracks.items[index]
    assert.equal(track.id, counterpart.id)
    assert.equal(track.no, counterpart.no)
    assert.equal(track.modules.length, counterpart.modules.length)
  }

  for (const [index, format] of pt.formats.items.entries()) {
    assert.equal(format.id, en.formats.items[index].id)
  }
})

test('training covers the four announced domains', () => {
  const trackIds = TREINAMENTOS_COPY.pt.tracks.items.map((track) => track.id)
  assert.deepEqual(trackIds, ['ia-llm', 'vibe-coding', 'servicenow', 'agentops'])
})

test('training pages publish canonical, hreflang and a complete Open Graph image', async () => {
  const [ptPage, enPage] = await Promise.all([
    read('app/treinamentos/page.tsx'),
    read('app/en/treinamentos/page.tsx'),
  ])

  assert.match(ptPage, /canonical:\s*'\/treinamentos'/)
  assert.match(enPage, /canonical:\s*'\/en\/treinamentos'/)

  for (const source of [ptPage, enPage]) {
    assert.match(source, /'pt-BR':\s*'\/treinamentos'/)
    assert.match(source, /'en-US':\s*'\/en\/treinamentos'/)
    assert.match(source, /'x-default':\s*'\/treinamentos'/)
    assert.match(source, /openGraph:\s*\{[\s\S]*?images:\s*\[\{\s*url:\s*'\/og'/)
    assert.match(source, /width:\s*1200/)
    assert.match(source, /height:\s*630/)
    assert.match(source, /alt:\s*'[^']+'/)
  }
})

test('training is reachable from the global nav, footer and sitemap', async () => {
  const [nav, footer, sitemap] = await Promise.all([
    read('components/public-navigation.ts'),
    read('components/SiteFooter.tsx'),
    read('app/sitemap.ts'),
  ])

  assert.ok(nav.includes("key: 'training', label: 'Treinamentos', href: '/treinamentos'"))
  assert.ok(nav.includes("key: 'training', label: 'Training', href: '/en/treinamentos'"))
  assert.ok(footer.includes("{ label: 'Treinamentos', href: '/treinamentos' }"))
  assert.ok(footer.includes("{ label: 'Training', href: '/en/treinamentos' }"))
  assert.match(sitemap, /path:\s*'\/treinamentos'/)
  assert.match(sitemap, /path:\s*'\/en\/treinamentos'/)
})

test('the language switcher maps both training routes explicitly', async () => {
  const siteLanguage = await read('lib/i18n/site-language.ts')
  const { resolveLocalizedPath } = await import('../lib/i18n/site-language.ts')

  assert.match(siteLanguage, /'\/treinamentos':\s*\{\s*pt:\s*'\/treinamentos',\s*en:\s*'\/en\/treinamentos'\s*\}/)
  assert.equal(resolveLocalizedPath('/treinamentos', 'en'), '/en/treinamentos')
  assert.equal(resolveLocalizedPath('/en/treinamentos', 'pt'), '/treinamentos')
})

test('course schema stays honest: no invented price and no dangling references', () => {
  for (const lang of languages) {
    const schema = buildTrainingSchema(lang)
    const serialized = JSON.stringify(schema)

    assert.equal(schema['@graph'].length, TREINAMENTOS_COPY[lang].tracks.items.length)
    assert.doesNotMatch(serialized, /"offers"/)
    assert.doesNotMatch(serialized, /"price"/)
    assert.doesNotMatch(serialized, /#collection/)

    for (const course of schema['@graph']) {
      assert.equal(course['@type'], 'Course')
      assert.ok(course.name)
      assert.ok(course.teaches.length > 0)
      assert.match(course.provider['@id'], /#organization$/)
      assert.match(course.instructor['@id'], /#person$/)
    }
  }
})

test('public training copy never leaks private commercial claims', () => {
  const forbidden = [
    /R\$\s?\d/,
    /US\$\s?\d/,
    /\$\d/,
    /£\d/,
    /\bMRR\b/,
    /SentinelSOAR|DataFlow Nexus|AccessHub|ClinicPro|AutoCRM|FinFlow/i,
    /Bradesco/i,
    /partner|parceir/i,
  ]

  const serialized = JSON.stringify(TREINAMENTOS_COPY)
  for (const pattern of forbidden) {
    assert.doesNotMatch(serialized, pattern, `Training copy must not contain ${pattern}`)
  }
})

test('the ServiceNow track carries the independence disclaimer in both languages', () => {
  assert.match(TREINAMENTOS_COPY.pt.disclaimer, /não representa a ServiceNow/i)
  assert.match(TREINAMENTOS_COPY.pt.disclaimer, /substitui treinamento ou certificação oficial/i)
  assert.match(TREINAMENTOS_COPY.en.disclaimer, /does not represent ServiceNow/i)
  assert.match(TREINAMENTOS_COPY.en.disclaimer, /does not replace official vendor training/i)
})
