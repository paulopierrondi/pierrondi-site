import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root), 'utf8')

const [links, home, feitos, about, sitemap] = await Promise.all([
  read('lib/seo/public-answer-links.ts'),
  read('components/home-v2/sections/EngageSection.tsx'),
  read('app/feitos/FeitosIndexContent.tsx'),
  read('app/about/AboutAuthorityExperience.tsx'),
  read('app/sitemap.ts'),
])

const expected = [
  '/answers/fractional-vs-consultoria-vs-agencia',
  '/answers/o-que-e-fractional-ai-automation-officer',
  '/answers/como-medir-resultado-de-ia-operacional',
  '/answers/o-que-e-agentops',
  '/answers/quem-e-paulo-pierrondi',
  '/answers/llm-cost-cut-audit',
  '/en/answers/fractional-vs-consultancy-vs-agency',
  '/en/answers/what-is-agentops',
  '/en/answers/who-is-paulo-pierrondi',
]

test('home, /feitos and /about link every public answer brief', () => {
  for (const href of expected) {
    assert.match(links, new RegExp(href.replaceAll('/', '\\/')))
  }
  assert.match(home, /publicAnswerLinks/)
  assert.match(home, /data-home-answer-links/)
  assert.match(feitos, /publicAnswerLinks/)
  assert.match(feitos, /data-feitos-answer-links/)
  assert.match(about, /publicAnswerLinks/)
  assert.match(about, /data-about-answer-links/)
  assert.match(feitos, /href=\{lang === 'pt' \? '\/engajamento' : '\/en\/engajamento'\}/)
  assert.doesNotMatch(home, /\/sprint/)
  assert.doesNotMatch(feitos, /\/sprint/)
  assert.doesNotMatch(about, /\/sprint/)
  assert.doesNotMatch(links, /\/sprint/)
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
})
