import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

import { APPS } from '../app/apps/[slug]/_apps.ts'
import { posts } from '../app/blog/posts.ts'
import { feitos } from '../app/feitos/feitos-data.ts'
import {
  RENDERED_TITLE_MAX,
  RENDERED_TITLE_MIN,
  TITLE_BRAND_SUFFIX,
  appDocumentTitle,
  renderedTitleLength,
} from '../lib/seo/document-title.ts'

const root = new URL('..', import.meta.url)

const read = (file) => readFile(new URL(file, root), 'utf8')

function rendered(title) {
  return `${title}${TITLE_BRAND_SUFFIX}`
}

async function walk(dir) {
  const base = typeof dir === 'string' ? dir : fileURLToPath(dir)
  const entries = await readdir(base, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(base, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(path)))
    else if (entry.name === 'page.tsx') files.push(path)
  }
  return files
}

function literalTitle(source) {
  const start = source.search(/export const metadata/)
  if (start < 0) return null
  const match = source.slice(start).match(/\btitle:\s*'([^']+)'/)
  return match ? match[1] : null
}

const PRIVATE_ROUTE = /\/(itau|fso|bradesco-26|crm|obrigado|control_tower|automacoes|kommo|login-v2)\//

function literalDescription(source) {
  const start = source.search(/export const metadata/)
  if (start < 0) return null
  const match = source.slice(start).match(/\bdescription:\s*\n?\s*'([^']+)'/)
  return match ? match[1] : null
}

test('short App Store names render a unique title inside 30–60 characters', () => {
  const seen = new Map()
  for (const [slug, app] of Object.entries(APPS)) {
    const title = appDocumentTitle(app.name)
    const length = renderedTitleLength(title)
    assert.ok(length >= RENDERED_TITLE_MIN && length <= RENDERED_TITLE_MAX, `${slug} rendered ${length}: ${rendered(title)}`)
    assert.ok(!seen.has(rendered(title)), `duplicate app title ${rendered(title)}`)
    seen.set(rendered(title), slug)
    if (renderedTitleLength(app.name) < RENDERED_TITLE_MIN) {
      assert.match(title, /— iOS app$/)
    }
  }
})

test('indexable document titles are unique, with length exceptions only where another draft owns the copy', async () => {
  const appDir = new URL('../app', import.meta.url)
  const files = await walk(appDir)
  const titles = new Map()
  const lengthAllow = new Map([
    // Open PR #75 owns these short titles.
    ['Atuação', 'app/(pt)/atuacao/page.tsx'],
    ['Work', 'app/(en)/en/atuacao/page.tsx'],
    // posts.ts is owned by open PR #78. The H1 is the document title and sits 1–5 characters over 60.
    ['AgentOps precisa de registry, handoff e evidência', 'blog/agentops-registry-handoffs-evidencia'],
    ['Adoption velocity é a métrica executiva de IA', 'blog/execucao-governada-adoption-velocity'],
  ])

  const add = (title, id) => {
    const full = rendered(title)
    const previous = titles.get(full)
    assert.equal(previous, undefined, `duplicate title "${full}" on ${id} and ${previous}`)
    titles.set(full, id)
    if (lengthAllow.has(title)) return
    const length = [...full].length
    assert.ok(length >= RENDERED_TITLE_MIN && length <= RENDERED_TITLE_MAX, `${id} rendered ${length}: ${full}`)
  }

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const title = literalTitle(source)
    if (!title) continue
    const id = file.slice(file.indexOf('/app/') + 1)
    if (PRIVATE_ROUTE.test(`/${id}`)) continue
    // The PT homepage shares the root layout segment, so Next does not apply the brand template.
    if (id.endsWith('app/(pt)/page.tsx')) {
      const length = [...title].length
      assert.ok(length >= RENDERED_TITLE_MIN && length <= RENDERED_TITLE_MAX, `home ${length}: ${title}`)
      assert.equal(titles.get(title), undefined)
      titles.set(title, id)
      continue
    }
    add(title, id)
  }

  for (const post of posts) add(post.seoTitle ?? post.title, `blog/${post.slug}`)
  for (const feito of feitos) {
    const title = feito.slug === 'agentes-governados' ? 'Agentes governados: dados e contexto' : feito.title
    add(title, `feitos/${feito.slug}`)
  }
  for (const [slug, app] of Object.entries(APPS)) add(appDocumentTitle(app.name), `apps/${slug}`)
})

test('literal meta descriptions on static pages do not repeat', async () => {
  const files = await walk(new URL('../app', import.meta.url))
  const seen = new Map()
  for (const file of files) {
    const description = literalDescription(await readFile(file, 'utf8'))
    if (!description) continue
    const id = file.slice(file.indexOf('/app/') + 1)
    if (PRIVATE_ROUTE.test(`/${id}`)) continue
    const previous = seen.get(description)
    assert.equal(previous, undefined, `duplicate description on ${id} and ${previous}`)
    seen.set(description, id)
    assert.ok(description.length >= 70 && description.length <= 160, `${id} description ${description.length}`)
  }
})

test('studio schema has no Offer, Product, or price', async () => {
  for (const file of ['app/(pt)/studio/page.tsx', 'app/(en)/en/studio/page.tsx']) {
    const source = await read(file)
    assert.doesNotMatch(source, /'@type': 'Offer'/)
    assert.doesNotMatch(source, /'@type': 'OfferCatalog'/)
    assert.doesNotMatch(source, /'@type': 'Product'/)
    assert.doesNotMatch(source, /price/)
    assert.match(source, /'@type': 'Service'/)
  }
})

test('public hrefs do not point at permanent redirect sources', async () => {
  const config = await read('next.config.ts')
  const redirectBlock = config.slice(config.indexOf('const CANONICAL_REDIRECTS'), config.indexOf('const HOST_REDIRECTS'))
  const sources = [...redirectBlock.matchAll(/source:\s*'([^']+)'/g)]
    .map((match) => match[1])
    .filter((source) => !source.includes(':') && !source.includes('*'))
  assert.ok(sources.includes('/agentes'))
  assert.ok(sources.includes('/answers'))
  assert.equal(sources.includes('/portfolio'), false)

  const dirs = ['app', 'components', 'lib', 'public']
  const files = []
  for (const dir of dirs) {
    const found = await walkAll(new URL(`../${dir}/`, import.meta.url))
    files.push(...found)
  }

  const hits = []
  for (const file of files) {
    if (file.endsWith('.test.mjs')) continue
    const source = await readFile(file, 'utf8')
    for (const route of sources) {
      const pattern = new RegExp(`(?:href|url|canonical)\\s*[:=]\\s*['"\`]${route.replaceAll('/', '\\/')}(?:['"\`?#]|$)`)
      if (pattern.test(source)) hits.push(`${file.slice(file.indexOf('/workspace') + 1)} -> ${route}`)
    }
    if (/(?:href|url)\s*[:=]\s*['"`]https?:\/\/pierrondi\.dev/.test(source)) {
      hits.push(`${file} -> apex host`)
    }
    if (/(?:href|url)\s*[:=]\s*['"`]http:\/\/www\.pierrondi\.dev/.test(source)) {
      hits.push(`${file} -> http host`)
    }
  }
  assert.deepEqual(hits, [])
})

async function walkAll(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const path = join(dir.pathname ?? dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walkAll(path)))
    else if (/\.(tsx|ts|mjs|txt|md|json)$/.test(entry.name)) files.push(path)
  }
  return files
}
