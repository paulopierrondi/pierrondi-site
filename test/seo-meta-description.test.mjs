import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'

import { APPS } from '../app/apps/[slug]/_apps.ts'
import { posts } from '../app/blog/posts.ts'
import { feitos } from '../app/feitos/feitos-data.ts'
import { authorityOps } from '../lib/authority/authority.ts'
import {
  META_DESCRIPTION_MAX,
  META_DESCRIPTION_MIN,
  clampMetaDescription,
} from '../lib/seo/meta-description.ts'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

async function walkPages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walkPages(path)))
    else if (entry.name === 'page.tsx' || entry.name === 'layout.tsx') files.push(path)
  }
  return files
}

function firstMetadataDescription(source) {
  const start = source.indexOf('export const metadata')
  if (start < 0) return null
  const match = source.slice(start).match(/description:\s*\n?\s*'([^']+)'/)
  return match?.[1] ?? null
}

test('clampMetaDescription fits the project SERP max without emptying copy', () => {
  assert.equal(META_DESCRIPTION_MIN, 120)
  assert.equal(META_DESCRIPTION_MAX, 160)
  assert.equal(clampMetaDescription(''), '')
  assert.equal(clampMetaDescription('  already short enough  '), 'already short enough')

  const long =
    'Mesa de Guerra is a short-session strategic card wargame for iPhone. Choose an AI persona and difficulty, then play up to two cards per turn across three fronts. The adaptive AI runs entirely on-device with deterministic local logic — no account, no internet, no data collection.'
  const clamped = clampMetaDescription(long)
  assert.ok(clamped.length > 0, 'must keep meaning instead of emptying')
  assert.ok(clamped.length <= META_DESCRIPTION_MAX, `clamped length ${clamped.length}`)
  assert.equal(
    clamped,
    'Mesa de Guerra is a short-session strategic card wargame for iPhone. Choose an AI persona and difficulty, then play up to two cards per turn across three fronts',
  )

  const midPhrase =
    'ProvadorIA lets you preview clothing with AI before buying. Upload your photo, a clothing photo and an optional description; the ProvadorIA API and Google Gemini generate a simulated try-on result for that request.'
  const provadoria = clampMetaDescription(midPhrase)
  assert.ok(provadoria.length <= META_DESCRIPTION_MAX)
  assert.doesNotMatch(provadoria, /Google$/)
  assert.match(provadoria, /ProvadorIA/)
})

test('data-driven public metadata emit within the 160-char project max', () => {
  for (const [slug, app] of Object.entries(APPS)) {
    const emitted = clampMetaDescription(app.description ?? `${app.name} — ${app.category}.`)
    assert.ok(emitted.length > 0, `/apps/${slug} description emptied`)
    assert.ok(
      emitted.length <= META_DESCRIPTION_MAX,
      `/apps/${slug} emitted ${emitted.length}: ${emitted}`,
    )
  }

  for (const feito of feitos) {
    const emitted = clampMetaDescription(feito.lead)
    assert.ok(emitted.length > 0, `/feitos/${feito.slug} description emptied`)
    assert.ok(
      emitted.length <= META_DESCRIPTION_MAX,
      `/feitos/${feito.slug} emitted ${emitted.length}: ${emitted}`,
    )
  }

  for (const post of posts) {
    assert.ok(post.excerpt.length > 0, `/blog/${post.slug} excerpt emptied`)
    assert.ok(
      post.excerpt.length <= META_DESCRIPTION_MAX,
      `/blog/${post.slug} excerpt ${post.excerpt.length}`,
    )
  }

  for (const lang of ['pt', 'en']) {
    const description = authorityOps.pages[lang].metadataDescription
    assert.ok(description.length >= META_DESCRIPTION_MIN && description.length <= META_DESCRIPTION_MAX)
  }
})

test('apps and feitos generateMetadata clamp the shared source copy', async () => {
  const [appsPage, feitosPage] = await Promise.all([
    read('app/apps/[slug]/page.tsx'),
    read('app/feitos/[slug]/page.tsx'),
  ])
  assert.match(appsPage, /clampMetaDescription/)
  assert.match(feitosPage, /clampMetaDescription/)
})

test('static metadata descriptions stay inside the 120–160 convention', async () => {
  const files = await walkPages('app')
  const checked = []

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    if (!/export const metadata/.test(source)) continue
    const description = firstMetadataDescription(source)
    if (!description) continue
    checked.push({ file, description, length: description.length })
    assert.ok(description.length > 0, `${file} emptied the description`)
    assert.ok(
      description.length <= META_DESCRIPTION_MAX,
      `${file} meta description is ${description.length} chars: ${description}`,
    )
  }

  assert.ok(checked.length >= 20, `expected to scan public metadata, got ${checked.length}`)

  for (const file of [
    'app/page.tsx',
    'app/en/page.tsx',
    'app/layout.tsx',
    'app/paulo/page.tsx',
    'app/answers/quem-e-paulo-pierrondi/page.tsx',
    'app/answers/llm-cost-cut-audit/page.tsx',
    'app/answers/o-que-e-agentops/page.tsx',
    'app/answers/o-que-e-fractional-ai-automation-officer/page.tsx',
    'app/answers/como-medir-resultado-de-ia-operacional/page.tsx',
    'app/treinamentos/page.tsx',
    'app/engajamento/page.tsx',
  ]) {
    const row = checked.find((item) => item.file === file)
    assert.ok(row, `missing ${file}`)
    assert.ok(
      row.length >= META_DESCRIPTION_MIN && row.length <= META_DESCRIPTION_MAX,
      `${file} should follow 120–160 (got ${row.length})`,
    )
  }
})
