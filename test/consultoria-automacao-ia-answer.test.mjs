import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

const PATH = '/answers/consultoria-de-automacao-com-ia'
const TITLE = 'Consultoria de automação com IA para empresas'

const [page, sitemap, llms, llmsFull, geo, answersJson, aiSearch, engajamento, atuacao, brief] =
  await Promise.all([
    read('app/(pt)/answers/consultoria-de-automacao-com-ia/page.tsx'),
    read('app/sitemap.ts'),
    read('public/llms.txt'),
    read('public/llms-full.txt'),
    read('public/geo.md'),
    read('public/answers.json'),
    read('app/(en)/ai-search/page.tsx'),
    read('app/engajamento/engajamento-copy.ts'),
    read('app/atuacao/AtuacaoContent.tsx'),
    read('app/answers/_components/AnswerBrief.tsx'),
  ])

function words(text) {
  return text.split(/\s+/).filter(Boolean)
}

function prose(source) {
  const direct = source.match(/directAnswer="([^"]+)"/)?.[1]
  assert.ok(direct, 'direct answer missing')
  const sectionBlock = source.slice(source.indexOf('sections={['), source.indexOf('faq={['))
  const paragraphs = [...sectionBlock.matchAll(/'([^']+)'/g)]
    .map((match) => match[1])
    .filter((value) => !value.startsWith('heading') && sectionBlock.includes(`'${value}'`))
    .filter((value) => !sectionBlock.includes(`heading: '${value}'`))
  const faqBlock = source.slice(source.indexOf('faq={['), source.indexOf('internalLinks'))
  const faqBits = [...faqBlock.matchAll(/'([^']+)'/g)].map((match) => match[1])
  return { direct, paragraphs, faqBits }
}

test('consultoria brief leads with the query, canonical, and index/follow', () => {
  assert.match(page, /AnswerBrief/)
  assert.match(page, new RegExp(`const path = '${PATH}'`))
  assert.match(page, /canonical: path/)
  assert.match(page, /robots: \{ index: true, follow: true \}/)
  assert.doesNotMatch(page, /languages:/)
  const absolute = 'Consultoria de automação com IA para empresas | Pierrondi'
  assert.match(page, /absolute: 'Consultoria de automação com IA para empresas \| Pierrondi'/)
  assert.equal([...absolute].length, 57)
  assert.ok(absolute.startsWith(TITLE))
  assert.match(page, new RegExp(`question="${TITLE}"`))

  const description = page.match(/description:\n\s*'([^']+)'/)[1]
  assert.ok(description.length >= 120 && description.length <= 160, `description ${description.length}`)
  assert.match(description, /consultoria de automação com IA para empresas/i)
})

test('the first 80 words answer who, what, and how, and the page links to engajamento', () => {
  const { direct } = prose(page)
  const opening = words(direct)
  assert.ok(opening.length <= 80, `direct answer is ${opening.length} words`)
  assert.match(direct, /consultoria de automação com IA para empresas/i)
  assert.match(direct, /mid-market/)
  assert.match(direct, /times de operação/)
  assert.match(direct, /critério de aceite/)
  assert.match(direct, /baseline, sistema, métrica e handoff/)
  assert.match(direct, /gates humanos/)
  assert.match(direct, /página de engajamento/)
  assert.match(page, /href: '\/engajamento'/)
})

test('body stays in range and covers payoff, first slice, inheritance, and FAQ', () => {
  const { direct, paragraphs, faqBits } = prose(page)
  const count = words([direct, ...paragraphs, ...faqBits].join(' ')).length
  assert.ok(count >= 600 && count <= 900, `visible prose is ${count} words`)
  assert.match(page, /Quando a automação com IA compensa/)
  assert.match(page, /Quando o trabalho deve esperar/)
  assert.match(page, /Como é a primeira fatia/)
  assert.match(page, /O que o time herda/)
  assert.match(page, /consultor de automação com IA/)
  assert.match(page, /automação com IA para empresas/)
  assert.equal((page.match(/question: '/g) ?? []).length, 5)
  assert.match(brief, /'@type': 'FAQPage'/)
  assert.match(page, /registry/)
  assert.match(page, /runbook/)
  assert.match(page, /trilha de evidência/)
})

test('the brief is on the sitemap, answers hub, and llms files', () => {
  assert.match(sitemap, new RegExp(`path: '${PATH}'`))
  assert.match(llms, new RegExp(`https://www\\.pierrondi\\.dev${PATH}`))
  assert.match(llmsFull, new RegExp(`https://www\\.pierrondi\\.dev${PATH}`))
  assert.match(geo, new RegExp(`https://www\\.pierrondi\\.dev${PATH}`))
  const docs = JSON.parse(answersJson).answerDocs
  assert.ok(docs.some((doc) => doc.id === 'consultoria-de-automacao-com-ia' && doc.url.endsWith(PATH)))
  assert.match(aiSearch, new RegExp(`url: '${PATH}'`))
  assert.match(aiSearch, new RegExp(`title: '${TITLE}'`))
})

test('engajamento and atuacao link to the brief without touching titles', async () => {
  assert.match(engajamento, new RegExp(`consultancy: '${PATH}'`))
  assert.match(atuacao, new RegExp(`consultancyHref: '${PATH}'`))
  const [ptAtuacao, enAtuacao] = await Promise.all([
    read('app/(pt)/atuacao/page.tsx'),
    read('app/(en)/en/atuacao/page.tsx'),
  ])
  assert.doesNotMatch(ptAtuacao, /consultoria-de-automacao-com-ia/)
  assert.doesNotMatch(enAtuacao, /consultoria-de-automacao-com-ia/)
  assert.match(ptAtuacao, /title: '/)
})

test('internal links resolve and /sprint stays unpublished', async () => {
  const hrefs = [...page.matchAll(/href: '(\/[^']+)'/g)].map((match) => match[1])
  assert.ok(hrefs.includes('/engajamento'))
  assert.ok(hrefs.includes('/atuacao'))
  assert.ok(hrefs.includes('/contato'))
  assert.ok(hrefs.includes('/feitos'))
  const routes = {
    '/engajamento': 'app/(pt)/engajamento/page.tsx',
    '/atuacao': 'app/(pt)/atuacao/page.tsx',
    '/contato': 'app/(pt)/contato/page.tsx',
    '/feitos': 'app/(pt)/feitos/page.tsx',
  }
  for (const href of hrefs) {
    const file = routes[href] ?? `app/(pt)${href}/page.tsx`
    await access(new URL(`../${file}`, import.meta.url))
  }

  for (const missing of [
    'app/sprint/page.tsx',
    'app/(pt)/sprint/page.tsx',
    'app/(en)/en/sprint/page.tsx',
  ]) {
    await assert.rejects(access(new URL(`../${missing}`, import.meta.url)))
  }

  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  assert.doesNotMatch(page, /\/sprint/)
  assert.doesNotMatch(page, /R\$\s?\d|US\$\s?\d|\$\d/)
  assert.doesNotMatch(page, /'@type': 'Product'|@type': 'Offer'/)
  assert.doesNotMatch(atuacao, /\/sprint/)
})
