import assert from 'node:assert/strict'
import test from 'node:test'

import { getPostBySlug } from '../app/blog/posts.ts'
import { META_DESCRIPTION_MAX } from '../lib/seo/meta-description.ts'

const post = getPostBySlug('medir-valor-ia-operacional')

test('medir valor essay answers the query and links the measurement cluster', () => {
  assert.ok(post)
  assert.equal(post.title, 'Como medir valor em IA operacional')
  assert.ok(post.excerpt.length > 0 && post.excerpt.length <= META_DESCRIPTION_MAX)
  assert.match(post.content, /<h2>Resposta direta<\/h2>/)
  assert.match(post.content, /baseline do trabalho real/)
  assert.match(
    post.content,
    /<a href="\/answers\/como-medir-resultado-de-ia-operacional">como medir resultado de IA operacional<\/a>/,
  )
  assert.match(post.content, /<a href="\/feitos">feitos<\/a>/)
  assert.match(post.content, /<a href="\/engajamento">engajamento<\/a>/)
  assert.equal((post.content.match(/href="\/answers\/como-medir-resultado-de-ia-operacional"/g) ?? []).length, 1)
  assert.equal((post.content.match(/href="\/feitos"/g) ?? []).length, 1)
  assert.equal((post.content.match(/href="\/engajamento"/g) ?? []).length, 1)
})

test('medir valor essay does not invent proof or link unpublished offers', () => {
  assert.ok(post)
  assert.doesNotMatch(post.content, /\/sprint/)
  assert.doesNotMatch(post.content, /R\$|%|cliente nomeado|economiz/)
  assert.match(post.content, /não publica taxa de sucesso, cliente, preço ou ROI/)
  assert.match(post.content, /Não são resultados deste site/)
})
