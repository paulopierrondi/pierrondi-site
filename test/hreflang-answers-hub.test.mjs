import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

import { resolveLocalizedPath } from '../lib/i18n/site-language.ts'

const root = new URL('..', import.meta.url)

const redirectingAnswersUrl = /['"](?:pt-BR|en-US|x-default|pt|en)['"]\s*:\s*['"](?:\/answers|https:\/\/www\.pierrondi\.dev\/answers)['"]/

async function sourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(full)))
      continue
    }
    if (/\.(tsx?|mjs|js|xml)$/.test(entry.name)) files.push(full)
  }
  return files
}

test('hreflang and language targets are final 200s, never the redirecting /answers URL', async () => {
  const files = [
    ...(await sourceFiles(path.join(root.pathname, 'app'))),
    ...(await sourceFiles(path.join(root.pathname, 'lib'))),
    ...(await sourceFiles(path.join(root.pathname, 'components'))),
  ]
  const offenders = []
  for (const file of files) {
    const source = await readFile(file, 'utf8')
    if (redirectingAnswersUrl.test(source)) offenders.push(path.relative(root.pathname, file))
  }
  assert.deepEqual(offenders, [])

  assert.equal(resolveLocalizedPath('/answers', 'pt'), '/ai-search')
  assert.equal(resolveLocalizedPath('/answers', 'en'), '/ai-search')
  assert.equal(resolveLocalizedPath('/en/answers', 'pt'), '/en/answers')
  assert.equal(resolveLocalizedPath('/en/answers', 'en'), '/en/answers')

  const sitemap = await readFile(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
  assert.doesNotMatch(sitemap, /path:\s*'\/answers'/)
  assert.doesNotMatch(sitemap, /languages:/)
  assert.doesNotMatch(sitemap, /\/sprint/)
})

test('/ai-search and /en/answers are not hreflang equivalents', async () => {
  const enHub = await readFile(new URL('../app/en/answers/page.tsx', import.meta.url), 'utf8')
  const aiSearch = await readFile(new URL('../app/ai-search/page.tsx', import.meta.url), 'utf8')

  // /ai-search is an English citation portfolio (inLanguage en-US). /en/answers
  // is a separate English index of three briefs. Pairing them would mark one
  // English page as the pt-BR version of the other.
  assert.match(aiSearch, /inLanguage:\s*'en-US'/)
  assert.match(aiSearch, /alternates:\s*\{\s*canonical:\s*canonicalPath\s*\}/)
  assert.doesNotMatch(aiSearch, /['"](?:pt-BR|en-US|x-default)['"]\s*:/)

  assert.match(enHub, /canonical:\s*path/)
  assert.match(enHub, /const path = '\/en\/answers'/)
  assert.doesNotMatch(enHub, /languages:\s*\{/)
  assert.doesNotMatch(enHub, /['"](?:pt-BR|en-US|x-default)['"]\s*:/)
  assert.doesNotMatch(enHub, /['"]\/ai-search['"]\s*,/)
})

test('English surfaces link internally to /en/answers', async () => {
  const footer = await readFile(new URL('../components/SiteFooter.tsx', import.meta.url), 'utf8')
  const brief = await readFile(
    new URL('../app/answers/_components/AnswerBrief.tsx', import.meta.url),
    'utf8',
  )

  assert.match(footer, /label: 'Answer briefs', href: '\/en\/answers'/)
  assert.match(brief, /href: '\/en\/answers'/)
  assert.match(brief, /item: `\$\{SITE_URL\}\/en\/answers`/)

  for (const slug of [
    'who-is-paulo-pierrondi',
    'what-is-agentops',
    'fractional-vs-consultancy-vs-agency',
  ]) {
    const page = await readFile(new URL(`../app/en/answers/${slug}/page.tsx`, import.meta.url), 'utf8')
    assert.match(page, /AnswerBrief/)
    assert.match(page, /inLanguage="en"/)
    assert.match(page, new RegExp(`const path = '/en/answers/${slug}'`))
  }
})
