import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

const [form, content, ptPage, enPage, route, sitemap, nextConfig] = await Promise.all([
  read('app/contato/ContatoForm.tsx'),
  read('app/contato/ContatoPageContent.tsx'),
  read('app/(pt)/contato/page.tsx'),
  read('app/(en)/en/contato/page.tsx'),
  read('app/api/contact/route.ts'),
  read('app/sitemap.ts'),
  read('next.config.ts'),
])

const ptLabels = content.slice(content.indexOf('pt: {'), content.indexOf('en: {'))
const enLabels = content.slice(content.indexOf('en: {'))

function fieldTag(source, name) {
  const tags = source.match(/<input[\s\S]*?\/>/g) ?? []
  const tag = tags.find((item) => item.includes(`name="${name}"`))
  assert.ok(tag, `missing input ${name}`)
  return tag
}

test('contato pages stay the PT and EN pair and render the shared form', () => {
  assert.match(ptPage, /<ContatoPageContent lang="pt" \/>/)
  assert.match(enPage, /<ContatoPageContent lang="en" \/>/)
  assert.match(content, /<ContatoForm labels=\{c\.formLabels\} \/>/)
})

test('optional process, KPI and timeframe fields exist in both languages', () => {
  assert.match(ptLabels, /process: 'Processo a automatizar'/)
  assert.match(ptLabels, /kpi: 'KPI a mover'/)
  assert.match(ptLabels, /timeframe: 'Prazo desejado'/)
  assert.match(ptLabels, /optional: 'opcional'/)
  assert.match(enLabels, /process: 'Process to automate'/)
  assert.match(enLabels, /kpi: 'KPI to move'/)
  assert.match(enLabels, /timeframe: 'Desired timeframe'/)
  assert.match(enLabels, /optional: 'optional'/)

  for (const name of ['processo', 'kpi', 'prazo']) {
    const tag = fieldTag(form, name)
    assert.doesNotMatch(tag, /\srequired\b/)
    assert.match(tag, /autoComplete="off"/)
  }

  assert.match(fieldTag(form, 'processo'), /maxLength=\{500\}/)
  assert.match(fieldTag(form, 'kpi'), /maxLength=\{256\}/)
  assert.match(fieldTag(form, 'prazo'), /maxLength=\{128\}/)
  assert.match(fieldTag(form, 'nome'), /\srequired\b/)
})

test('the form posts qualifiers through /api/contact and keeps the _gotcha honeypot', () => {
  assert.match(form, /fetch\('\/api\/contact'/)
  assert.match(form, /processo: String\(formData\.get\('processo'\) \?\? ''\)\.trim\(\)/)
  assert.match(form, /kpi: String\(formData\.get\('kpi'\) \?\? ''\)\.trim\(\)/)
  assert.match(form, /prazo: String\(formData\.get\('prazo'\) \?\? ''\)\.trim\(\)/)
  assert.match(form, /_gotcha: String\(formData\.get\('_gotcha'\) \?\? ''\)/)
  const honeypot = fieldTag(form, '_gotcha')
  assert.match(honeypot, /className=\{styles\.honeypot\}/)
  assert.match(honeypot, /tabIndex=\{-1\}/)
  assert.match(honeypot, /aria-hidden="true"/)
  assert.match(honeypot, /autoComplete="off"/)
})

test('next-step copy is a scope diagnosis and carries no SLA, price, ROI or client', () => {
  assert.match(ptLabels, /nextStep: 'Paulo responde com um diagnóstico de escopo\.'/)
  assert.match(enLabels, /nextStep: 'Paulo replies with a scope diagnosis\.'/)

  const nextSteps = [...content.matchAll(/nextStep: '([^']+)'/g)].map((match) => match[1])
  assert.equal(nextSteps.length, 2)
  for (const line of nextSteps) {
    assert.doesNotMatch(line, /\d/)
    assert.doesNotMatch(line, /R\$|US\$|\$\d|\bROI\b|Bradesco|Ita[uú]|cliente|client/i)
  }
})

test('this change does not publish /sprint or Product/Offer schema', () => {
  for (const source of [form, content, ptPage, enPage, route]) {
    assert.doesNotMatch(source, /@type['"]?\s*:\s*['"](?:Product|Offer|OfferCatalog)['"]/)
    assert.doesNotMatch(source, /href:\s*['"]\/sprint['"]/)
    assert.doesNotMatch(source, /EngageSection|HeroSection|buildEngajamentoSchema/)
  }
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  assert.doesNotMatch(nextConfig, /source:\s*'\/sprint'/)
})

test('the contact handler forwards qualifiers and still swallows a filled _gotcha', async () => {
  const calls = []
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(init.body) })
    return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  try {
    const { POST } = await import('../app/api/contact/route.ts')

    const forwarded = await POST(jsonRequest('10.4.0.1', {
      nome: 'Ana',
      email: 'ana@example.com',
      mensagem: 'Quero conversar sobre um processo.',
      processo: '  triagem de pedidos  ',
      kpi: 'tempo de ciclo',
      prazo: 'neste trimestre',
    }))
    assert.equal(forwarded.status, 200)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].body.processo, 'triagem de pedidos')
    assert.equal(calls[0].body.kpi, 'tempo de ciclo')
    assert.equal(calls[0].body.prazo, 'neste trimestre')
    assert.equal(calls[0].body.nome, 'Ana')
    assert.equal(calls[0].body.email, 'ana@example.com')
    assert.equal(calls[0].body.mensagem, 'Quero conversar sobre um processo.')
    assert.equal(Object.hasOwn(calls[0].body, '_gotcha'), false)

    const minimal = await POST(jsonRequest('10.4.0.2', {
      nome: 'Ana',
      email: 'ana@example.com',
      mensagem: 'Só a mensagem.',
    }))
    assert.equal(minimal.status, 200)
    assert.equal(calls.length, 2)
    assert.equal(calls[1].body.processo, '')
    assert.equal(calls[1].body.kpi, '')
    assert.equal(calls[1].body.prazo, '')

    const formData = new FormData()
    formData.set('nome', 'Ana')
    formData.set('email', 'ana@example.com')
    formData.set('mensagem', 'Pelo formulário.')
    formData.set('processo', 'handoff de incidente')
    formData.set('kpi', '')
    formData.set('prazo', '   ')
    const encoded = await POST(new Request('http://localhost/api/contact', {
      method: 'POST',
      body: formData,
      headers: {
        accept: 'application/json',
        'x-forwarded-for': '10.4.0.3',
      },
    }))
    assert.equal(encoded.status, 200)
    assert.equal(calls.length, 3)
    assert.equal(calls[2].body.processo, 'handoff de incidente')
    assert.equal(calls[2].body.kpi, '')
    assert.equal(calls[2].body.prazo, '')

    const honeypot = await POST(jsonRequest('10.4.0.4', {
      nome: 'Bot',
      email: 'bot@example.com',
      mensagem: 'spam',
      processo: 'should not forward',
      _gotcha: 'bot',
    }))
    assert.equal(honeypot.status, 200)
    assert.deepEqual(await honeypot.json(), { ok: true })
    assert.equal(calls.length, 3)

    const tooLong = await POST(jsonRequest('10.4.0.5', {
      nome: 'Ana',
      email: 'ana@example.com',
      mensagem: 'Mensagem válida.',
      processo: 'x'.repeat(501),
    }))
    assert.equal(tooLong.status, 400)
    assert.equal(calls.length, 3)
  } finally {
    globalThis.fetch = originalFetch
  }
})

function jsonRequest(ip, body) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
}
