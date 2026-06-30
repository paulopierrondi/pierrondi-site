import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const llmsText = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8')
const answersJson = JSON.parse(await readFile(new URL('../public/answers.json', import.meta.url), 'utf8'))
const robotsText = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')
const aiSearchPortfolioPage = await readFile(
  new URL('../app/ai-search-portfolio/page.tsx', import.meta.url),
  'utf8',
)

// Extract the set of product answer-brief slugs (host -> Set(slug)) from any text
// surface. Matches both the HTML form (/answers/slug) used by the page and the
// machine-readable .md form (/answers/slug.md) used by llms.txt / answers.json.
const PRODUCT_HOSTS = ['faithschool.app', 'cantustudio.app', 'agenticoscore.ai']
function answerSlugSets(text) {
  const sets = { 'faithschool.app': new Set(), 'cantustudio.app': new Set(), 'agenticoscore.ai': new Set() }
  const re = /https:\/\/(faithschool\.app|cantustudio\.app|agenticoscore\.ai)\/answers\/([a-z0-9-]+)/gi
  for (const match of text.matchAll(re)) sets[match[1]].add(match[2])
  return sets
}

test('pierrondi GEO files expose the owned product graph', () => {
  for (const product of ['FaithSchool', 'CantuStudio', 'AgenticosCore']) {
    assert.match(llmsText, new RegExp(product))
    assert.match(JSON.stringify(answersJson), new RegExp(product))
  }

  assert.equal(answersJson.entity.name, 'pierrondi.dev')
  assert.equal(answersJson.primaryHub, 'https://www.pierrondi.dev/ai-search-portfolio')
  assert.ok(answersJson.answerDocs.length >= 10)
  assert.ok(answersJson.ownedSiteGraph.length >= 3)
})

test('product answer-brief citations are identical across hub page, llms.txt and answers.json', () => {
  // The /ai-search-portfolio page, llms.txt and answers.json are three owned-media
  // surfaces that must cite the SAME set of commercial answer pages per product.
  // They drifted apart before (different AgenticosCore/FaithSchool subsets); this
  // guard keeps them unified so crawlers, AI answer engines and humans see one signal.
  const page = answerSlugSets(aiSearchPortfolioPage)
  const llms = answerSlugSets(llmsText)
  const answers = answerSlugSets(JSON.stringify(answersJson))

  for (const host of PRODUCT_HOSTS) {
    const pageSlugs = [...page[host]].sort()
    const llmsSlugs = [...llms[host]].sort()
    const answersSlugs = [...answers[host]].sort()
    assert.ok(pageSlugs.length > 0, `expected at least one answer brief for ${host}`)
    assert.deepEqual(llmsSlugs, pageSlugs, `llms.txt answer briefs for ${host} must match the hub page`)
    assert.deepEqual(answersSlugs, pageSlugs, `answers.json answer briefs for ${host} must match the hub page`)
  }
})

test('robots allows answer-engine retrieval while preserving private route blocks', () => {
  for (const agent of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot']) {
    assert.match(robotsText, new RegExp(`User-agent: ${agent}`))
  }

  for (const privatePath of ['/api/', '/control_tower', '/bradesco-26', '/itau']) {
    assert.match(robotsText, new RegExp(`Disallow: ${privatePath.replace('/', '\\/')}`))
  }
})
