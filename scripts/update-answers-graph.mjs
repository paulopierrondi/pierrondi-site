// Sync public/answers.json with the live app catalog and flagship projects.
//
// - entity: adds sameAs + logo (idempotent)
// - projectGraph: flagship projects and evidence-backed public portfolio cases
// - appsPortfolio: only apps in the verified public App Store catalog, with
//   official App Store and icon URLs
// - lastUpdated: bumped to today (UTC date)
//
// Run: node scripts/update-answers-graph.mjs

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const ANSWERS = path.join(ROOT, 'public/answers.json')
const APP_STORE_CATALOG = path.join(ROOT, 'public/app-icons/app-store-catalog.json')
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
    name: 'Pierrondi Studio',
    category: 'Brand, content and AI growth systems',
    description:
      'Author-led practice combining positioning, brand systems, multimedia content, CRM and AI automation with explicit human handoffs and a five-stage implementation method.',
    url: `${SITE}/studio`,
    relationship: 'author-led portfolio practice',
  },
  {
    name: 'Luar do Campo',
    category: "Client-contracted women's fashion commerce implementation",
    description:
      'Successfully delivered by Paulo Pierrondi as an operational public conceptual demo with a 50-product catalog, size/color variants, search and filters, wishlist, cart, demonstrative checkout, customer account, local inventory reservation and an administrative order queue.',
    url: `${SITE}/portfolio#luar-do-campo`,
    demoUrl: 'https://luar-do-campo-demo.vercel.app',
    relationship: 'confidential client delivery represented by a public conceptual demo',
  },
  {
    name: 'SADA',
    category: 'Enterprise AI operating-model framework',
    description:
      'Framework developed by Paulo Pierrondi: ServiceNow AI-Driven Architecture connects strategy, architecture decisions, workflow execution and measured value.',
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
  {
    name: 'FaithSchool',
    category: 'Education product for web and mobile',
    description:
      'Christian homeschool planning and family-record workflow delivered across web and iOS, with Android packages prepared for distribution.',
    url: 'https://faithschool.app',
    relationship: 'flagship project',
  },
  {
    name: 'Kommo + WhatsApp',
    category: 'CRM integration and conversational operations',
    description:
      'Controlled Kommo implementation with two operational pipelines, qualification fields, Salesbot routing and documented human handoff.',
    url: `${SITE}/portfolio#kommo-whatsapp`,
    relationship: 'protected case study',
  },
  {
    name: 'Studio CRM',
    category: 'Custom CRM application',
    description:
      'Protected CRM system covering clients, projects, contracts, payments and operational activity without exposing private records.',
    url: `${SITE}/portfolio#studio-crm`,
    relationship: 'protected case study',
  },
  {
    name: 'AgenticosCore',
    category: 'Revenue operations system',
    description: 'Revenue OS connecting diagnosis, scorecard, commercial action plan and operational evidence.',
    url: 'https://agenticoscore.ai/diagnostico',
    relationship: 'flagship project',
  },
]

async function main() {
  const answers = JSON.parse(await readFile(ANSWERS, 'utf8'))
  const appStoreCatalog = JSON.parse(await readFile(APP_STORE_CATALOG, 'utf8'))

  if (answers.entity) {
    answers.entity.sameAs = [
      'https://br.linkedin.com/in/paulopierrondi',
      'https://github.com/paulopierrondi',
    ]
    answers.entity.logo = `${SITE}/pierrondi-logo-1024.png`
  }

  answers.projectGraph = FLAGSHIP_PROJECTS

  answers.appsPortfolio = appStoreCatalog.apps.map((app) => ({
    name: app.name,
    category: app.category,
    url: `${SITE}/apps/${app.slug}`,
    appStoreUrl: app.url.replace(/\?uo=4$/, ''),
    image: `${SITE}${app.icon}`,
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
