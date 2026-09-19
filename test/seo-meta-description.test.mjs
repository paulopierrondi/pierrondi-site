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

const STRING = `'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"`

const unquote = (token) => token.slice(1, -1).replace(/\\(['"\\])/g, '$1')

function firstMetadataDescription(source) {
  const start = source.indexOf('export const metadata')
  if (start < 0) return null
  const block = source.slice(start)

  // Read only the page-level description, never a later (shorter) twitter/og
  // literal, so an unresolvable value is skipped instead of passing by accident.
  const at = block.search(/\bdescription:/)
  if (at < 0) return null
  const match = block
    .slice(at)
    .match(new RegExp(`^description:\\s*\\n?\\s*(?:(${STRING})|([A-Za-z_$][\\w$]*)\\s*,)`))
  if (!match) return null
  if (match[1]) return unquote(match[1])

  // A page can assign `description: DESCRIPTION` from a module const.
  const declared = source.match(
    new RegExp(`const\\s+${match[2]}\\s*(?::[^=]+)?=\\s*\\n?\\s*(${STRING})`),
  )
  return declared ? unquote(declared[1]) : null
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

  // An early sentence end must not win over the SERP budget, or Ahrefs simply
  // swaps "meta description too long" for "meta description too short".
  const earlyPeriod =
    'SuperCode is a fast, local-first notebook for snippets, commands and short scratch notes. Built for developers who want their notes on-device, searchable and private.'
  const supercode = clampMetaDescription(earlyPeriod)
  assert.ok(
    supercode.length >= META_DESCRIPTION_MIN && supercode.length <= META_DESCRIPTION_MAX,
    `early sentence end collapsed the snippet to ${supercode.length}`,
  )
})

test('data-driven public metadata emit within the 160-char project max', () => {
  // Sources already inside the budget are published verbatim; anything the
  // clamp rewrites has to land in the 120–160 window, never just under it.
  const assertEmitted = (id, source) => {
    const emitted = clampMetaDescription(source)
    assert.ok(emitted.length > 0, `${id} description emptied`)
    assert.ok(emitted.length <= META_DESCRIPTION_MAX, `${id} emitted ${emitted.length}: ${emitted}`)
    if (source.length > META_DESCRIPTION_MAX) {
      assert.ok(
        emitted.length >= META_DESCRIPTION_MIN,
        `${id} clamped to ${emitted.length}, which Ahrefs reads as too short: ${emitted}`,
      )
    }
  }

  for (const [slug, app] of Object.entries(APPS)) {
    assertEmitted(`/apps/${slug}`, app.description ?? `${app.name} — ${app.category}.`)
  }

  for (const feito of feitos) {
    assertEmitted(`/feitos/${feito.slug}`, feito.lead)
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

  // Guards the resolver itself: a regex regression that stops reading
  // descriptions would otherwise make this whole scan pass vacuously.
  assert.ok(checked.length >= 35, `expected to scan public metadata, got ${checked.length}`)

  for (const file of [
    'app/page.tsx',
    'app/en/page.tsx',
    'app/layout.tsx',
    'app/paulo/page.tsx',
    'app/fso/page.tsx',
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
