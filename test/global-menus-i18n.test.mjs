import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const siteNavSource = await readFile(
  new URL('../components/SiteNav.tsx', import.meta.url),
  'utf8',
)
const siteFooterSource = await readFile(
  new URL('../components/SiteFooter.tsx', import.meta.url),
  'utf8',
)

test('global header menu uses route language for PT and EN labels', () => {
  const requiredSnippets = [
    'getCurrentLanguage(pathname)',
    "label: 'Atuação', href: '/atuacao'",
    "label: 'Feitos', href: '/feitos'",
    "label: 'Ideias', href: '/blog'",
    "label: 'Contato', href: '/contato'",
    "label: 'About', href: '/en/about'",
    "label: 'Work', href: '/en/atuacao'",
    "label: 'Proof', href: '/en/feitos'",
    "label: 'Ideas', href: '/en/blog'",
    "label: 'Contact', href: '/en/contato'",
    "cta: 'Connect'",
    "aria: 'Main navigation'",
  ]

  for (const snippet of requiredSnippets) {
    assert.ok(siteNavSource.includes(snippet), `Expected SiteNav i18n snippet: ${snippet}`)
  }
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
