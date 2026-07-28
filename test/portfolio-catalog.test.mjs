import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const catalog = JSON.parse(await readFile(new URL('public/app-icons/app-store-catalog.json', root), 'utf8'))
const manifest = JSON.parse(await readFile(new URL('public/app-icons/manifest.json', root), 'utf8'))
const portfolioData = await readFile(new URL('components/portfolio/portfolio-data.ts', root), 'utf8')
const projectVisual = await readFile(new URL('components/portfolio/ProjectVisual.tsx', root), 'utf8')
const portfolioExperience = await readFile(new URL('components/portfolio/PortfolioExperience.tsx', root), 'utf8')

test('public App Store portfolio contains the verified 21-app developer catalog', () => {
  assert.equal(catalog.developerId, '1895717587')
  assert.equal(catalog.count, 21)
  assert.equal(catalog.apps.length, 21)
  assert.equal(new Set(catalog.apps.map((app) => app.trackId)).size, 21)
  assert.equal(new Set(catalog.apps.map((app) => app.slug)).size, 21)
})

test('CantuStudio and FaithSchool use their current public App Store IDs', () => {
  assert.ok(catalog.apps.some((app) => app.trackId === '6764287847' && app.name === 'CantuStudio'))
  assert.ok(catalog.apps.some((app) => app.trackId === '6764325629' && app.name === 'FaithSchool'))
})

test('every catalog app has a local official icon in the shared manifest', async () => {
  await Promise.all(catalog.apps.map(async (app) => {
    assert.equal(manifest[app.slug]?.source, `appstore:${app.trackId}`)
    await access(new URL(`public${app.icon}`, root))
  }))
})

test('portfolio copy avoids freelancer and ownership positioning', () => {
  assert.doesNotMatch(portfolioData, /freelancer/i)
  assert.doesNotMatch(portfolioData, /produtos? próprios|owned products/i)
  assert.doesNotMatch(portfolioData, /meu crm|my crm/i)
})

test('localized English portfolio route exists', async () => {
  await access(new URL('app/en/portfolio/page.tsx', root))
})

test('Luar do Campo is a localized, evidence-backed confidential client case', async () => {
  assert.equal(portfolioData.match(/id: 'luar-do-campo'/g)?.length, 2)
  assert.equal(portfolioData.match(/href: 'https:\/\/luar-do-campo-demo\.vercel\.app'/g)?.length, 2)
  assert.match(portfolioData, /Projeto contratado por um cliente confidencial/)
  assert.match(portfolioData, /Contracted by a confidential fashion retail client/)
  assert.match(portfolioData, /identidade conceitual da demo pública/)
  assert.match(portfolioExperience, /NOVE PROJETOS/)
  assert.match(portfolioExperience, /NINE PROJECTS/)
  const localizedCases = portfolioData
    .split("id: 'luar-do-campo'")
    .slice(1)
    .map((section) => section.split('\n    },')[0])
  assert.equal(localizedCases.length, 2)
  for (const localizedCase of localizedCases) {
    assert.doesNotMatch(localizedCase, /R\$|receita gerada|revenue generated|conversion uplift|nome do cliente/i)
  }
  assert.match(projectVisual, /visual === 'luar-do-campo'/)
  await Promise.all([
    access(new URL('public/portfolio/luar-do-campo/storefront-desktop.png', root)),
    access(new URL('public/portfolio/luar-do-campo/operations-desktop.png', root)),
  ])
})
