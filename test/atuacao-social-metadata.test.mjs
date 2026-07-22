import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('atuacao locale pages publish a complete Open Graph image', async () => {
  const pages = await Promise.all([
    read('app/atuacao/page.tsx'),
    read('app/en/atuacao/page.tsx'),
  ])

  for (const source of pages) {
    assert.match(source, /openGraph:\s*\{[\s\S]*?images:\s*\[\{\s*url:\s*'\/og'/)
    assert.match(source, /width:\s*1200/)
    assert.match(source, /height:\s*630/)
    assert.match(source, /alt:\s*'[^']+'/)
  }
})
