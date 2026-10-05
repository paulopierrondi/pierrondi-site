import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const [home, engage, hero, siteSchema, sitemap] = await Promise.all([
  readFile(new URL('components/home-v2/HomeV2.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/EngageSection.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/HeroSection.tsx', root), 'utf8'),
  readFile(new URL('components/SiteJsonLd.tsx', root), 'utf8'),
  readFile(new URL('app/sitemap.ts', root), 'utf8'),
])

test('home renders a compact how-to-engage bridge after the proof ledger', () => {
  assert.match(home, /import EngageSection from '\.\/sections\/EngageSection'/)
  assert.match(home, /meta\.id === 'hero' \? <ProofSection lang=\{lang\} \/>/)
  assert.match(home, /meta\.id === 'hero' \? <EngageSection lang=\{lang\} \/>/)
  assert.match(engage, /id="como-engajar"/)
  assert.match(engage, /data-home-engage=\{lang\}/)
  assert.match(engage, /data-home-engage-cta/)
})

test('PT and EN explain the Fractional offer and primary-link the engagement page', () => {
  assert.match(engage, /eyebrow: 'COMO ENGAJAR'/)
  assert.match(engage, /eyebrow: 'HOW TO ENGAGE'/)
  assert.match(engage, /heading: 'Fractional AI Automation Officer'/)
  assert.match(engage, /baseline → métrica → handoff/)
  assert.match(engage, /baseline → metric → handoff/)
  assert.match(engage, /label: 'ver o engajamento', href: '\/engajamento'/)
  assert.match(engage, /label: 'see the engagement', href: '\/en\/engajamento'/)
  assert.match(engage, /label: 'pedir contato', href: '#contact'/)
  assert.match(engage, /label: 'request contact', href: '#contact'/)
  assert.match(engage, /\/answers\/o-que-e-fractional-ai-automation-officer/)
  assert.match(engage, /\/answers\/como-medir-resultado-de-ia-operacional/)
  assert.match(engage, /\/answers\/fractional-vs-consultoria-vs-agencia/)
  assert.match(engage, /\/en\/answers\/fractional-vs-consultancy-vs-agency/)
})

test('the bridge does not invent a price, publish /sprint, or retitle the person', () => {
  assert.doesNotMatch(engage, /R\$\s?\d|US\$\s?\d|\$\d|\/sprint|@type': 'Product'/)
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  assert.match(siteSchema, /jobTitle: \[\.\.\.PERSON_JOB_TITLES\]/)
  assert.doesNotMatch(siteSchema, /jobTitle: 'Fractional/)
  assert.match(hero, /from 'framer-motion'/)
  assert.match(hero, /FrontierEventHorizon/)
})
