import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const SLUGS = ['o-que-e-agentops', 'quem-e-paulo-pierrondi', 'llm-cost-cut-audit']

const sitemapSource = await readFile(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const briefComponent = await readFile(
  new URL('../app/answers/_components/AnswerBrief.tsx', import.meta.url),
  'utf8',
)
const aiSearchPage = await readFile(new URL('../app/ai-search/page.tsx', import.meta.url), 'utf8')
const llmsText = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8')
const llmsFullText = await readFile(new URL('../public/llms-full.txt', import.meta.url), 'utf8')
const answersJson = JSON.parse(await readFile(new URL('../public/answers.json', import.meta.url), 'utf8'))

test('own-domain answer brief pages exist and use the shared brief renderer', async () => {
  for (const slug of SLUGS) {
    const pageUrl = new URL(`../app/answers/${slug}/page.tsx`, import.meta.url)
    await access(pageUrl)
    const source = await readFile(pageUrl, 'utf8')
    assert.match(source, /AnswerBrief/, `${slug} should render via the shared AnswerBrief`)
    assert.match(source, new RegExp(`alternates: \\{ canonical: path \\}`), `${slug} should set a canonical`)
  }
})

test('shared brief renderer emits Question, FAQPage, Article and BreadcrumbList JSON-LD', () => {
  for (const type of ["'Question'", "'FAQPage'", "'Article'", "'BreadcrumbList'"]) {
    assert.ok(briefComponent.includes(`'@type': ${type}`), `missing ${type} JSON-LD`)
  }
  assert.match(briefComponent, /acceptedAnswer/, 'question-form pages need acceptedAnswer')
})

test('own-domain briefs are registered in sitemap, answers.json, llms.txt and llms-full.txt', () => {
  const ids = answersJson.answerDocs.map((doc) => doc.id)
  for (const slug of SLUGS) {
    assert.match(sitemapSource, new RegExp(`/answers/${slug}`), `sitemap missing ${slug}`)
    assert.ok(ids.includes(slug), `answers.json missing ${slug}`)
    assert.match(llmsText, new RegExp(`/answers/${slug}`), `llms.txt missing ${slug}`)
    assert.match(llmsFullText, new RegExp(`/answers/${slug}`), `llms-full.txt missing ${slug}`)
    assert.match(aiSearchPage, new RegExp(`/answers/${slug}`), `ai-search hub missing ${slug}`)
  }
})

test('sitemap lastmod derives from build date instead of a hardcoded stale date', () => {
  assert.match(sitemapSource, /const buildDate = new Date\(\)/)
  assert.doesNotMatch(sitemapSource, /2026-07-11T00:00:00\.000Z/, 'stale hardcoded date must not return')
})

test('favicon.png exists for direct crawler requests', async () => {
  await access(new URL('../public/favicon.png', import.meta.url))
})

test('answer brief titles do not duplicate the brand the layout already appends', async () => {
  const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  assert.match(layout, /template: '%s \| pierrondi\.dev'/)

  for (const slug of SLUGS) {
    const source = await readFile(new URL(`../app/answers/${slug}/page.tsx`, import.meta.url), 'utf8')
    const title = source.match(/^ {2}title: '(.*?)',$/m)[1]
    assert.doesNotMatch(title, /pierrondi\.dev/, `${slug} title must not repeat the brand`)
    assert.ok(
      `${title} | pierrondi.dev`.length <= 62,
      `${slug} rendered title exceeds the SERP budget: ${title.length + 16}`,
    )
  }
})

test('restored answer briefs stay wired to every retrieval surface', () => {
  for (const slug of SLUGS) {
    const url = `https://www.pierrondi.dev/answers/${slug}`
    assert.match(sitemapSource, new RegExp(`path: '/answers/${slug}'`), `sitemap must list ${slug}`)
    assert.ok(llmsText.includes(url), `llms.txt must cite ${slug}`)
    assert.ok(llmsFullText.includes(url), `llms-full.txt must cite ${slug}`)
    assert.ok(
      answersJson.answerDocs.some((doc) => doc.url === url),
      `answers.json must expose ${slug}`,
    )
    assert.match(aiSearchPage, new RegExp(`'/answers/${slug}'`), `the AI search hub must link ${slug}`)
  }

  // The training work landed after this branch was cut; the rebase must not drop it.
  assert.ok(answersJson.answerDocs.some((doc) => doc.url.endsWith('/treinamentos')))
  assert.match(sitemapSource, /path: '\/treinamentos'/)
})
