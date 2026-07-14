import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const siteNavSource = await readFile(
  new URL('../components/SiteNav.tsx', import.meta.url),
  'utf8',
)
const homeNavSource = await readFile(
  new URL('../components/home-v2/chrome/NavBar.tsx', import.meta.url),
  'utf8',
)
const publicNavSource = await readFile(
  new URL('../components/public-navigation.ts', import.meta.url),
  'utf8',
)
const siteFooterSource = await readFile(
  new URL('../components/SiteFooter.tsx', import.meta.url),
  'utf8',
)

test('global header menu uses route language for PT and EN labels', () => {
  const requiredSnippets = [
    "key: 'bio', label: 'Bio', href: '/about', homeSection: 'about'",
    "label: 'Atuação', href: '/atuacao'",
    "label: 'Portfólio', href: '/portfolio'",
    "label: 'Feitos', href: '/feitos'",
    "label: 'Ideias', href: '/blog'",
    "label: 'Contato', href: '/contato'",
    "label: 'About', href: '/en/about'",
    "label: 'Work', href: '/en/atuacao'",
    "label: 'Portfolio', href: '/en/portfolio'",
    "label: 'Proof', href: '/en/feitos'",
    "label: 'Ideas', href: '/en/blog'",
    "label: 'Contact', href: '/en/contato'",
    "aria: 'Main navigation'",
  ]

  for (const snippet of requiredSnippets) {
    assert.ok(publicNavSource.includes(snippet), `Expected canonical nav i18n snippet: ${snippet}`)
  }

  assert.match(siteNavSource, /PUBLIC_NAV_COPY/)
  assert.match(siteNavSource, /<PublicNavigation/)
  assert.match(homeNavSource, /PUBLIC_NAV_COPY/)
  assert.match(homeNavSource, /<PublicNavigation/)
  assert.match(homeNavSource, /activeHref/)
})

test('global footer menu uses route language for PT and EN labels', () => {
  const requiredSnippets = [
    'getCurrentLanguage(pathname)',
    "navHead: 'Navegação'",
    "navHead: 'Navigation'",
    "workHead: 'Atuação'",
    "workHead: 'Work'",
    "secondaryCta: 'Send email'",
    "status: 'Open for good conversations'",
    "label: 'Privacy', href: '/privacy'",
    "label: 'Legal notice', href: '/terms'",
  ]

  for (const snippet of requiredSnippets) {
    assert.ok(siteFooterSource.includes(snippet), `Expected SiteFooter i18n snippet: ${snippet}`)
  }
})
