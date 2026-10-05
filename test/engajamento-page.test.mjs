import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')
const { buildEngajamentoSchema } = await import('../app/engajamento/engajamento-copy.ts')
const { resolveLocalizedPath } = await import('../lib/i18n/site-language.ts')

const [
  ptPage,
  enPage,
  content,
  copySource,
  sitemap,
  hero,
  heroStyles,
  homeCopy,
  home,
  homeEn,
  siteSchema,
  atuacao,
] = await Promise.all([
  read('app/engajamento/page.tsx'),
  read('app/en/engajamento/page.tsx'),
  read('app/engajamento/EngajamentoContent.tsx'),
  read('app/engajamento/engajamento-copy.ts'),
  read('app/sitemap.ts'),
  read('components/home-v2/sections/HeroSection.tsx'),
  read('components/home-v2/sections/HeroSection.module.css'),
  read('components/home-v2/copy.ts'),
  read('app/page.tsx'),
  read('app/en/page.tsx'),
  read('components/SiteJsonLd.tsx'),
  read('app/atuacao/AtuacaoContent.tsx'),
])

const sources = [ptPage, enPage, content, copySource, sitemap, hero, homeCopy, home, homeEn, atuacao]

test('engagement pages publish canonical, hreflang and a complete Open Graph image', () => {
  assert.match(ptPage, /canonical:\s*'\/engajamento'/)
  assert.match(enPage, /canonical:\s*'\/en\/engajamento'/)

  for (const source of [ptPage, enPage]) {
    assert.match(source, /'pt-BR':\s*'\/engajamento'/)
    assert.match(source, /'en-US':\s*'\/en\/engajamento'/)
    assert.match(source, /'x-default':\s*'\/engajamento'/)
    assert.match(source, /openGraph:\s*\{[\s\S]*?images:\s*\[\s*\{\s*url:\s*'\/og'/)
    assert.match(source, /width:\s*1200/)
    assert.match(source, /height:\s*630/)
    assert.match(source, /alt:\s*'[^']+'/)
    assert.match(source, /title: 'Fractional AI Automation Officer'/)
    assert.match(source, /<h1>|title=\{<>Fractional AI Automation/)
  }

  for (const title of ['Fractional AI Automation Officer']) {
    assert.ok(`${title} | pierrondi.dev`.length <= 62, `title too long: ${title}`)
  }

  for (const source of [ptPage, enPage]) {
    const description = source.match(/description:\s*\n?\s*'([^']+)'/)[1]
    assert.ok(
      description.length >= 120 && description.length <= 160,
      `description length off: ${description.length} — ${description}`,
    )
  }
})

test('sitemap and language switcher register both engagement locales', () => {
  assert.match(sitemap, /path:\s*'\/engajamento'/)
  assert.match(sitemap, /path:\s*'\/en\/engajamento'/)
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  assert.equal(resolveLocalizedPath('/engajamento', 'en'), '/en/engajamento')
  assert.equal(resolveLocalizedPath('/en/engajamento', 'pt'), '/engajamento')
})

test('home title names the Fractional offer and the hero links the comparison', () => {
  assert.match(hero, /data-hero-engagement/)
  assert.match(hero, /\/answers\/fractional-vs-consultoria-vs-agencia/)
  assert.match(hero, /\/en\/answers\/fractional-vs-consultancy-vs-agency/)
  assert.match(hero, /Fractional, consultoria ou interno/)
  assert.match(heroStyles, /\.engagementLink/)
  assert.match(homeCopy, /ctaPrimary: \{ label: 'ver o engajamento', href: '\/engajamento' \}/)
  assert.match(homeCopy, /ctaPrimary: \{ label: 'see the engagement', href: '\/en\/engajamento' \}/)
  assert.match(home, /title: 'Paulo Pierrondi — Fractional AI Officer'/)
  assert.match(homeEn, /title: 'Paulo Pierrondi — Fractional AI Officer'/)
  assert.match(homeCopy, /headlineLine2: 'Onde IA vira operação com evidência'/)
  assert.doesNotMatch(homeCopy, /Fractional AI Automation Officer/)
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
})

test('atuacao links to the engagement page without publishing /sprint', () => {
  assert.match(atuacao, /engagementHref: '\/engajamento'/)
  assert.match(atuacao, /engagementHref: '\/en\/engajamento'/)
  assert.match(atuacao, /c\.final\.engagementHref/)
  assert.doesNotMatch(atuacao, /\/sprint/)
})

test('engagement schema is WebPage + Service, with a next step and no published price', () => {
  for (const lang of ['pt', 'en']) {
    const schema = buildEngajamentoSchema(lang)
    const serialized = JSON.stringify(schema)
    const types = schema['@graph'].map((node) => node['@type'])

    assert.deepEqual(types, ['WebPage', 'Service'])
    assert.doesNotMatch(serialized, /"Product"/)
    assert.doesNotMatch(serialized, /"offers"/)
    assert.doesNotMatch(serialized, /"price"/)
    assert.match(serialized, /CommunicateAction/)
    assert.match(serialized, /#proximo-passo/)
    assert.match(serialized, /#person/)
    assert.match(serialized, /Fractional AI Automation Officer/)
  }

  assert.match(siteSchema, /jobTitle: \[\.\.\.PERSON_JOB_TITLES\]/)
  assert.doesNotMatch(siteSchema, /"price"/)
})

test('engagement copy stays honest: no invented clients, metrics or published sprint', () => {
  const forbidden = [
    /R\$\s?\d/,
    /US\$\s?\d/,
    /\$\d/,
    /\bMRR\b/,
    /50\+|100\+|200\+/,
    /SentinelSOAR|DataFlow Nexus|AccessHub|ClinicPro|AutoCRM|FinFlow/i,
    /href:\s*'\/sprint'/,
    /href:\s*"\/sprint"/,
  ]

  for (const source of sources) {
    assert.doesNotMatch(source, /href:\s*['"]\/sprint['"]/)
    for (const pattern of forbidden) {
      assert.doesNotMatch(source, pattern, `must not contain ${pattern}`)
    }
  }

  assert.match(copySource, /baseline/i)
  assert.match(copySource, /handoff/i)
  assert.match(copySource, /AgentOps/)
  assert.match(copySource, /AI Operating Model/)
  assert.match(content, /href=\{route\.proof\}/)
  assert.match(content, /href=\{route\.answer\}/)
  assert.match(content, /href=\{route\.measure\}/)
  assert.match(copySource, /\/answers\/o-que-e-fractional-ai-automation-officer/)
  assert.match(copySource, /\/answers\/como-medir-resultado-de-ia-operacional/)
  assert.match(content, /getWhatsAppHref/)
  assert.match(content, /className=\{styles\.btnPrimary\}/)
  assert.match(content, /href=\{whatsappHref\}/)
  assert.match(content, /id="proximo-passo"/)
  assert.match(content, /copy\.blockCta/)
  assert.match(copySource, /Começar no WhatsApp/)
  assert.match(copySource, /Start on WhatsApp/)
  assert.match(copySource, /não publica valor/)
  assert.match(copySource, /does not publish a number/)
  assert.match(content, /route\.contact/)
  assert.match(ptPage, /buildEngajamentoSchema\('pt'\)/)
  assert.match(enPage, /buildEngajamentoSchema\('en'\)/)
})
