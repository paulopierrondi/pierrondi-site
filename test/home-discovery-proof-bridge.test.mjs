import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const [
  publicNav,
  homeNav,
  home,
  copy,
  proofSection,
  hero,
  sitemap,
  nextConfig,
] = await Promise.all([
  readFile(new URL('components/public-navigation.ts', root), 'utf8'),
  readFile(new URL('components/home-v2/chrome/NavBar.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/HomeV2.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/copy.ts', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/ProofSection.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/HeroSection.tsx', root), 'utf8'),
  readFile(new URL('app/sitemap.ts', root), 'utf8'),
  readFile(new URL('next.config.ts', root), 'utf8'),
])

test('home Atuação/Work go to the commercial page and Stack keeps #skills', () => {
  assert.match(publicNav, /key: 'work', label: 'Atuação', href: '\/atuacao'/)
  assert.match(publicNav, /key: 'work', label: 'Work', href: '\/en\/atuacao'/)
  assert.doesNotMatch(publicNav, /label: 'Atuação'[\s\S]{0,40}homeSection: 'skills'/)
  assert.doesNotMatch(publicNav, /label: 'Work'[\s\S]{0,40}homeSection: 'skills'/)
  assert.match(publicNav, /key: 'stack', label: 'Stack', href: '\/#skills', homeSection: 'skills'/)
  assert.match(publicNav, /key: 'stack', label: 'Stack', href: '\/en#skills', homeSection: 'skills'/)
  assert.match(homeNav, /PUBLIC_NAV_COPY/)
})

test('home proof bridge sits between hero and portfolio and reuses /feitos cases', () => {
  assert.match(home, /meta\.id === 'hero' \? <ProofSection lang=\{lang\} \/>/)
  assert.match(proofSection, /id="proof"/)
  assert.match(proofSection, /from '@\/app\/feitos\/feitos-proof-data'/)
  assert.match(proofSection, /deliveryCases\.slice\(0, 2\)/)
  assert.match(copy, /cta: \{ label: 'Ver provas de execução', href: '\/feitos' \}/)
  assert.match(copy, /cta: \{ label: 'View execution proof', href: '\/en\/feitos' \}/)
  assert.match(copy, /EVIDENCE LEDGER \/ 2026/)
  assert.match(copy, /O mecanismo muda\. A disciplina de entrega permanece\./)
  assert.match(copy, /The mechanism changes\. Delivery discipline remains\./)
  assert.doesNotMatch(copy, /Fractional AI Automation Officer/)
})

test('measurable-outcomes pill points at the home proof module', () => {
  assert.match(hero, /href="#proof"/)
  assert.match(hero, /Resultado mensurável/)
  assert.match(hero, /Measurable outcomes/)
})

test('hero primary CTA is collaborate with amber fill; systems CTA stays ghost', async () => {
  const heroStyles = await readFile(
    new URL('components/home-v2/sections/HeroSection.module.css', root),
    'utf8',
  )
  assert.match(copy, /ctaPrimary: \{ label: 'colaborar', href: '#contact' \}/)
  assert.match(copy, /ctaSecondary: \{ label: 'sistemas em produção', href: '#projects' \}/)
  assert.match(copy, /ctaPrimary: \{ label: 'collaborate', href: '#contact' \}/)
  assert.match(copy, /ctaSecondary: \{ label: 'systems in production', href: '#projects' \}/)
  assert.match(heroStyles, /\.ctaPrimary \{[\s\S]*background: var\(--hv2-accent-copper\)/)
  assert.match(heroStyles, /\.ctaSecondary \{[\s\S]*background: rgba\(2, 2, 2, 0\.58\)/)
})

test('this change does not publish /sprint or Product schema', () => {
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  assert.doesNotMatch(nextConfig, /source:\s*'\/sprint'/)
  assert.doesNotMatch(copy, /@type': 'Product'/)
  assert.doesNotMatch(proofSection, /@type': 'Product'/)
})
