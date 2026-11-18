import assert from 'node:assert/strict'
import test from 'node:test'
import { buildCollectionPageSchema } from '../lib/seo/collection-page.ts'

const websiteId = 'https://www.pierrondi.dev/#website'

test('EN answers schema describes the three visible briefs in page order', () => {
  const schema = buildCollectionPageSchema({
    path: '/en/answers',
    name: 'English answer briefs',
    description:
      'English answer briefs: who Paulo Pierrondi is, what AgentOps is, and fractional versus consultancy, agency or internal hire.',
    inLanguage: 'en-US',
    items: [
      { href: '/en/answers/who-is-paulo-pierrondi', title: 'Who is Paulo Pierrondi?' },
      { href: '/en/answers/what-is-agentops', title: 'What is AgentOps?' },
      {
        href: '/en/answers/fractional-vs-consultancy-vs-agency',
        title: 'Fractional, consultancy, agency or internal?',
      },
    ],
  })

  assert.deepEqual(Object.keys(schema).sort(), [
    '@context',
    '@id',
    '@type',
    'description',
    'inLanguage',
    'isPartOf',
    'mainEntity',
    'name',
    'url',
  ])
  assert.equal(schema['@type'], 'CollectionPage')
  assert.equal(schema['@id'], 'https://www.pierrondi.dev/en/answers#collection')
  assert.equal(schema.url, 'https://www.pierrondi.dev/en/answers')
  assert.equal(schema.name, 'English answer briefs')
  assert.equal(
    schema.description,
    'English answer briefs: who Paulo Pierrondi is, what AgentOps is, and fractional versus consultancy, agency or internal hire.',
  )
  assert.equal(schema.inLanguage, 'en-US')
  assert.deepEqual(schema.isPartOf, { '@id': websiteId })
  assert.deepEqual(Object.keys(schema.mainEntity).sort(), ['@type', 'itemListElement', 'numberOfItems'])
  assert.equal(schema.mainEntity['@type'], 'ItemList')
  assert.equal(schema.mainEntity.numberOfItems, 3)
  assert.deepEqual(
    schema.mainEntity.itemListElement.map(({ position, item }) => ({ position, ...item })),
    [
      {
        position: 1,
        '@type': 'WebPage',
        '@id': 'https://www.pierrondi.dev/en/answers/who-is-paulo-pierrondi',
        url: 'https://www.pierrondi.dev/en/answers/who-is-paulo-pierrondi',
        name: 'Who is Paulo Pierrondi?',
      },
      {
        position: 2,
        '@type': 'WebPage',
        '@id': 'https://www.pierrondi.dev/en/answers/what-is-agentops',
        url: 'https://www.pierrondi.dev/en/answers/what-is-agentops',
        name: 'What is AgentOps?',
      },
      {
        position: 3,
        '@type': 'WebPage',
        '@id': 'https://www.pierrondi.dev/en/answers/fractional-vs-consultancy-vs-agency',
        url: 'https://www.pierrondi.dev/en/answers/fractional-vs-consultancy-vs-agency',
        name: 'Fractional, consultancy, agency or internal?',
      },
    ],
  )
  assert.equal('inLanguage' in schema.mainEntity, false)
})

test('design library schema describes the collection without inventing a list', () => {
  const schema = buildCollectionPageSchema({
    path: '/design/library',
    name: 'Component Library',
    description:
      'Biblioteca de componentes React do ecossistema Pierrondi: blocos reais com Tailwind, prontos para copiar, remixar e usar em produtos.',
    inLanguage: 'pt-BR',
  })

  assert.deepEqual(Object.keys(schema).sort(), [
    '@context',
    '@id',
    '@type',
    'description',
    'inLanguage',
    'isPartOf',
    'name',
    'url',
  ])
  assert.equal(schema['@type'], 'CollectionPage')
  assert.equal(schema['@id'], 'https://www.pierrondi.dev/design/library#collection')
  assert.equal(schema.url, 'https://www.pierrondi.dev/design/library')
  assert.equal(schema.name, 'Component Library')
  assert.equal(
    schema.description,
    'Biblioteca de componentes React do ecossistema Pierrondi: blocos reais com Tailwind, prontos para copiar, remixar e usar em produtos.',
  )
  assert.equal(schema.inLanguage, 'pt-BR')
  assert.deepEqual(schema.isPartOf, { '@id': websiteId })
})
