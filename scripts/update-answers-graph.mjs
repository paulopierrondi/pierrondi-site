// Sync public/answers.json with the live app catalog and flagship projects.
//
// - entity: adds sameAs + logo (idempotent)
// - projectGraph: the 6 flagship projects from the homepage
// - appsPortfolio: every app in app/apps/[slug]/_apps.ts, with official icon
//   URLs from public/app-icons/manifest.json when available
// - lastUpdated: bumped to today (UTC date)
//
// Run: node scripts/update-answers-graph.mjs

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const ANSWERS = path.join(ROOT, 'public/answers.json')
const APPS_TS = path.join(ROOT, 'app/apps/[slug]/_apps.ts')
const MANIFEST = path.join(ROOT, 'public/app-icons/manifest.json')
const SITE = 'https://www.pierrondi.dev'

const FLAGSHIP_PROJECTS = [
  {
    name: 'Agent Hub',
    category: 'Multi-agent automation OS',
    description:
      'Operating system for agents: registry, scheduler, handoffs, memory, human gates and runners coordinating 60+ specialist agents with auditable deliveries.',
    url: `${SITE}/#projects`,
    relationship: 'flagship project',
  },
  {
    name: 'AI Control Tower',
    category: 'Agent operations and governance dashboard',
    description: 'Operations dashboard for agent governance: runs, evidence, health and human-gate visibility.',
    url: `${SITE}/#projects`,
    relationship: 'flagship project',
  },
  {
    name: 'CSDM/FSDM Validator',
    category: 'ServiceNow data-quality analyzer',
    description: 'ServiceNow CSDM/FSDM data-quality and FSO-readiness analyzer for regulated financial services.',
    url: `${SITE}/#projects`,
    relationship: 'flagship project',
  },
  {
    name: 'pierrondi.dev',
    category: 'Portfolio platform with GEO/SEO automation',
    description: 'This platform: public portfolio, AI-search hub, answers graph and GEO/SEO automation pipeline.',
    url: SITE,
    relationship: 'flagship project',
  },
  {
    name: 'SADA',
    category: 'Enterprise AI operating-model framework',
    description: 'ServiceNow AI-Driven Architecture: a prescriptive value-architecture framework connecting strategy, architecture decisions, workflow execution and measured value.',
    url: `${SITE}/feitos/sada-servicenow`,
    relationship: 'flagship project',
  },
  {
    name: 'CantuStudio',
    category: 'AI SATB arrangement product',
    description: 'AI application for SATB choral arrangements with backend validation, playback and MusicXML export.',
    url: 'https://cantustudio.app',
    relationship: 'flagship project',
  },
]

async function parseApps() {
  const src = await readFile(APPS_TS, 'utf8')
  const apps = []
  const entryRe = /^\s{2}(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*\{([\s\S]*?)^\s{2}\},/gm
  let m
  while ((m = entryRe.exec(src))) {
    const slug = m[1] ?? m[2]
    const body = m[3]
    const name = body.match(/name:\s*'([^']+)'/)?.[1] ?? slug
    const category = body.match(/category:\s*'([^']+)'/)?.[1] ?? ''
    const appStoreUrl = body.match(/appStoreUrl:\s*'([^']+)'/)?.[1]
    apps.push({ slug, name, category, appStoreUrl })
  }
  return apps
}

async function main() {
  const answers = JSON.parse(await readFile(ANSWERS, 'utf8'))
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
  const apps = await parseApps()

  if (answers.entity) {
    answers.entity.sameAs = [
      'https://br.linkedin.com/in/paulopierrondi',
      'https://github.com/paulopierrondi',
    ]
    answers.entity.logo = `${SITE}/pierrondi-logo-1024.png`
  }

  answers.projectGraph = FLAGSHIP_PROJECTS

  answers.appsPortfolio = apps.map((app) => ({
    name: app.name,
    category: app.category,
    url: `${SITE}/apps/${app.slug}`,
    ...(app.appStoreUrl ? { appStoreUrl: app.appStoreUrl } : {}),
    ...(manifest[app.slug] ? { image: `${SITE}/app-icons/${manifest[app.slug].file}` } : {}),
  }))

  answers.lastUpdated = new Date().toISOString().slice(0, 10)

  await writeFile(ANSWERS, `${JSON.stringify(answers, null, 2)}\n`)
  console.log(
    `answers.json updated: ${FLAGSHIP_PROJECTS.length} flagship projects, ${answers.appsPortfolio.length} apps, entity sameAs/logo set`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
