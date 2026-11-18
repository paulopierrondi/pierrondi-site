import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const read = (file) => readFile(path.join(root, file), 'utf8')
const { TREINAMENTOS_COPY } = await import('../app/treinamentos/treinamentos-content.ts')

const ADDED_BRIEFS = [
  ['app/(pt)/answers/o-que-e-agentops/page.tsx', '/engajamento', /resultado mensurável/],
  ['app/(pt)/answers/quem-e-paulo-pierrondi/page.tsx', '/engajamento', /resultado mensurável/],
  ['app/(pt)/answers/llm-cost-cut-audit/page.tsx', '/engajamento', /resultado/],
  ['app/(en)/en/answers/what-is-agentops/page.tsx', '/en/engajamento', /measurable outcome/],
  ['app/(en)/en/answers/who-is-paulo-pierrondi/page.tsx', '/en/engajamento', /measurable outcome/],
]

async function answerBriefs() {
  const groups = [
    { dir: 'app/(pt)/answers', href: '/engajamento' },
    { dir: 'app/(en)/en/answers', href: '/en/engajamento' },
  ]
  const found = []

  for (const group of groups) {
    const entries = await readdir(path.join(root, group.dir), { withFileTypes: true })
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('_')) continue
      const rel = path.join(group.dir, entry.name, 'page.tsx')
      const source = await read(rel)
      if (!source.includes('<AnswerBrief')) continue
      found.push({ rel, href: group.href, source })
    }
  }

  return found
}

test('atuacao and treinamentos expose a contextual engagement CTA', async () => {
  const atuacao = await read('app/atuacao/AtuacaoContent.tsx')
  const training = await read('app/treinamentos/TreinamentosContent.tsx')

  assert.match(atuacao, /engagementHref: '\/engajamento'/)
  assert.match(atuacao, /engagementHref: '\/en\/engajamento'/)
  assert.match(atuacao, /data-engagement-cta/)
  assert.match(atuacao, /href=\{c\.final\.engagementHref\}/)
  assert.match(atuacao, /resultado mensurável/)
  assert.match(atuacao, /measurable outcome/)
  assert.doesNotMatch(atuacao, /href:\s*['"]\/sprint['"]/)
  assert.doesNotMatch(atuacao, /R\$\s?\d/)
  assert.doesNotMatch(atuacao, /'@type':\s*'Product'/)
  assert.doesNotMatch(atuacao, /'@type':\s*'Offer'/)

  assert.equal(TREINAMENTOS_COPY.pt.final.engagement, 'Ver o modelo de engajamento')
  assert.equal(TREINAMENTOS_COPY.en.final.engagement, 'See the engagement model')
  assert.match(TREINAMENTOS_COPY.pt.final.p, /resultado mensurável/)
  assert.match(TREINAMENTOS_COPY.pt.final.p, /modelo de engajamento/)
  assert.match(TREINAMENTOS_COPY.en.final.p, /measurable outcome/)
  assert.match(TREINAMENTOS_COPY.en.final.p, /engagement model/)
  assert.match(training, /engagement: '\/engajamento'/)
  assert.match(training, /engagement: '\/en\/engajamento'/)
  assert.match(training, /href=\{route\.engagement\}/)
  assert.match(training, /data-engagement-cta/)
  assert.doesNotMatch(training, /\/sprint/)
  assert.doesNotMatch(JSON.stringify(TREINAMENTOS_COPY), /R\$\s?\d/)
  assert.doesNotMatch(JSON.stringify(TREINAMENTOS_COPY), /\/sprint/)
  assert.doesNotMatch(JSON.stringify(TREINAMENTOS_COPY), /SentinelSOAR|DataFlow Nexus|AccessHub|ClinicPro|AutoCRM|FinFlow/i)
})

test('every answer brief links the engagement page for its locale', async () => {
  const briefs = await answerBriefs()
  const rels = briefs.map((brief) => brief.rel)

  assert.ok(briefs.length >= 8, `expected the known briefs, found ${rels.join(', ')}`)

  for (const brief of briefs) {
    const pattern = new RegExp(`href:\\s*'${brief.href.replaceAll('/', '\\/')}'`)
    assert.match(brief.source, pattern, `${brief.rel} missing ${brief.href}`)
    assert.doesNotMatch(brief.source, /href:\s*'\/sprint'/)
    assert.doesNotMatch(brief.source, /'@type':\s*'Product'/)
    assert.doesNotMatch(brief.source, /'@type':\s*'Offer'/)
  }

  for (const [rel, href, phrase] of ADDED_BRIEFS) {
    const source = briefs.find((brief) => brief.rel === rel)?.source
    assert.ok(source, `missing ${rel}`)
    assert.match(source, new RegExp(`href:\\s*'${href.replaceAll('/', '\\/')}'`))
    assert.match(source, phrase, `${rel} engagement copy should name a measurable result`)
  }
})

test('engagement CTAs stay in page data and do not alter the shared brief renderer', async () => {
  const brief = await read('app/answers/_components/AnswerBrief.tsx')
  const engage = await read('components/home-v2/sections/EngageSection.tsx')
  const hero = await read('components/home-v2/sections/HeroSection.tsx')
  const engagementPage = await read('app/(pt)/engajamento/page.tsx')

  assert.doesNotMatch(brief, /\/engajamento/)
  assert.match(engage, /href: '\/engajamento'/)
  assert.match(hero, /href=\{lang === 'pt' \? '\/engajamento' : '\/en\/engajamento'\}/)
  assert.match(engagementPage, /canonical:\s*'\/engajamento'/)
})
