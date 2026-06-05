import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pageSource = await readFile(new URL('../app/fso/page.tsx', import.meta.url), 'utf8')
const experienceSource = await readFile(new URL('../app/fso/FsoExperience.tsx', import.meta.url), 'utf8')
const siteLanguageSource = await readFile(new URL('../lib/i18n/site-language.ts', import.meta.url), 'utf8')

test('FSO page positions automation as FSO + IRM + governed action', () => {
  const requiredTerms = [
    'Automation-first ServiceNow implementation',
    'Integrated Risk Management',
    'Action Fabric',
    'AI Control Tower',
    'FSO brings the work. IRM brings the permission. Action Fabric brings the hands.',
    'IRM is the control surface',
    'Automation is the default posture',
    'high-risk action',
    'evidence loop',
  ]

  const combined = `${pageSource}\n${experienceSource}`
    .replace(/<br\s*\/>/g, ' ')
    .replace(/\s+/g, ' ')

  for (const term of requiredTerms) {
    assert.match(combined, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `Expected /fso to mention ${term}`)
  }
})

test('FSO page hides the global language picker', () => {
  assert.ok(siteLanguageSource.includes("'/fso'"), 'Expected /fso to be in language switcher hidden prefixes')
})
