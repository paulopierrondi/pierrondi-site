import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const llmsText = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8')
const answersJson = JSON.parse(await readFile(new URL('../public/answers.json', import.meta.url), 'utf8'))
const robotsText = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')

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

test('robots allows answer-engine retrieval while preserving private route blocks', () => {
  for (const agent of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot']) {
    assert.match(robotsText, new RegExp(`User-agent: ${agent}`))
  }

  for (const privatePath of ['/api/', '/control_tower', '/bradesco-26', '/itau']) {
    assert.match(robotsText, new RegExp(`Disallow: ${privatePath.replace('/', '\\/')}`))
  }
})
