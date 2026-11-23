import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('atuacao locale pages publish a complete Open Graph image', async () => {
  const pages = await Promise.all([
    read('app/(pt)/atuacao/page.tsx'),
    read('app/(en)/en/atuacao/page.tsx'),
  ])

  for (const source of pages) {
    assert.match(source, /openGraph:\s*\{[\s\S]*?images:\s*\[\{\s*url:\s*'\/og'/)
    assert.match(source, /width:\s*1200/)
    assert.match(source, /height:\s*630/)
    assert.match(source, /alt:\s*'[^']+'/)
  }
})

test('atuacao titles name the page topic and stay inside the SERP budget', async () => {
  const [pt, en] = await Promise.all([
    read('app/(pt)/atuacao/page.tsx'),
    read('app/(en)/en/atuacao/page.tsx'),
  ])

  const titleOf = (source) => {
    const match = source.match(/export const metadata: Metadata = \{[\s\S]*?\n  title: '([^']+)'/)
    assert.ok(match, 'metadata title missing')
    return match[1]
  }

  const ptTitle = titleOf(pt)
  const enTitle = titleOf(en)
  assert.equal(ptTitle, 'Atuação em IA enterprise e AgentOps')
  assert.equal(enTitle, 'Enterprise AI work and AgentOps')
  assert.match(pt, /openGraph:\s*\{[\s\S]*?title: 'Atuação em IA enterprise e AgentOps \| pierrondi\.dev'/)
  assert.match(en, /openGraph:\s*\{[\s\S]*?title: 'Enterprise AI work and AgentOps \| pierrondi\.dev'/)

  for (const title of [ptTitle, enTitle]) {
    const rendered = `${title} | pierrondi.dev`
    assert.ok(rendered.length >= 30 && rendered.length <= 62, `title outside SERP budget: ${rendered.length} ${rendered}`)
  }

  assert.match(pt, /canonical: '\/atuacao'/)
  assert.match(en, /canonical: '\/en\/atuacao'/)
  assert.match(pt, /'pt-BR': '\/atuacao'/)
  assert.match(pt, /'en-US': '\/en\/atuacao'/)
  assert.match(en, /'x-default': '\/atuacao'/)
  assert.doesNotMatch(pt, /\/sprint/)
  assert.doesNotMatch(en, /\/sprint/)
})
