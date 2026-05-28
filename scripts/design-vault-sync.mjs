#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'

const outputPath = new URL('../docs/design-vault/21st-source-snapshot.json', import.meta.url)

const sources = [
  'https://21st.dev/community/components',
  'https://21st.dev/community/components/s/21st-dev',
  'https://help.21st.dev/community',
]

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'pierrondi-design-vault/1.0',
      accept: 'text/html,text/plain,application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return response.text()
}

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))
}

function extractCategorySlugs(text) {
  const matches = text.matchAll(/\/community\/components\/s\/([a-z0-9-]+)/g)
  return Array.from(matches, (match) => match[1]).filter((slug) => slug !== 'week')
}

function buildSnapshot(sourceBodies) {
  const categorySlugs = uniqueSorted(sourceBodies.flatMap(extractCategorySlugs))

  return {
    generatedAt: new Date().toISOString(),
    source: '21st.dev Community public pages',
    licenseNote:
      '21st docs state Community components are open-source with MIT license; preserve author attribution when copying code.',
    usagePolicy:
      'Keep full source map as metadata; install component code selectively with npm run design:install when there is a real page/product use case.',
    docs: {
      overview: 'https://help.21st.dev/community',
      components: 'https://21st.dev/community/components',
      installPattern: 'npx shadcn@latest add https://21st.dev/r/author/component-name',
    },
    categories: categorySlugs.map((slug) => ({
      slug,
      url: `https://21st.dev/community/components/s/${slug}`,
    })),
    seedRegistryItems: [
      {
        title: 'Pricing Component',
        author: 'jatin-yadav05',
        registryUrl: 'https://21st.dev/r/jatin-yadav05/pricing-component',
      },
      {
        title: 'Cards Stack',
        author: 'youcefbnm',
        registryUrl: 'https://21st.dev/r/youcefbnm/cards-stack',
      },
      {
        title: 'Footer Column',
        author: 'mvp_Subha',
        registryUrl: 'https://21st.dev/r/mvp_Subha/footer-column',
      },
    ],
  }
}

async function main() {
  const sourceBodies = await Promise.all(sources.map(fetchText))
  const snapshot = buildSnapshot(sourceBodies)
  await mkdir(new URL('../docs/design-vault/', import.meta.url), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  console.log(`Design Vault snapshot written: ${outputPath.pathname}`)
  console.log(`Categories: ${snapshot.categories.length}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
