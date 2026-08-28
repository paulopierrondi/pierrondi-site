import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const [notFound, layout] = await Promise.all([
  readFile(new URL('../app/not-found.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8'),
])

const homepageTitle = layout.match(/default:\s*'([^']+)'/)?.[1]
assert.ok(homepageTitle, 'root layout must declare a default homepage title')

test('custom not-found page exists and does not reuse the homepage title', () => {
  assert.match(notFound, /title:\s*'Página não encontrada'/)
  assert.match(notFound, /robots:\s*\{\s*index:\s*false/)
  assert.match(notFound, /<h1>|PageHeader/)
  assert.match(notFound, /não encontrada/)
  assert.doesNotMatch(notFound, new RegExp(homepageTitle.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.doesNotMatch(notFound, /Onde IA vira operação com evidência/)
})

test('not-found overrides Open Graph title so crawlers do not see a soft-404 homepage card', () => {
  assert.match(notFound, /openGraph:\s*\{[\s\S]*title:\s*'Página não encontrada'/)
  assert.match(notFound, /twitter:\s*\{[\s\S]*title:\s*'Página não encontrada'/)
})
