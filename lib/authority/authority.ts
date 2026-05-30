import { z } from 'zod'

import authorityOpsRaw from '@/content/authority/paulo-authority-ops.json'
import { SITE_URL } from '@/lib/site'

export type AuthorityLang = 'pt' | 'en'

const budgetItemSchema = z.object({
  item: z.string(),
  monthlyUsd: z.number().nonnegative(),
  use: z.string(),
})

const authoritySectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
})

const capabilitySchema = z.object({
  label: z.string(),
  title: z.string(),
  body: z.string(),
})

const pageSchema = z.object({
  slug: z.string(),
  metadataTitle: z.string(),
  metadataDescription: z.string(),
  hero: z.object({
    kicker: z.string(),
    title: z.string(),
    lead: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
  proofStrip: z.array(z.string()).min(1),
  sections: z.array(authoritySectionSchema).min(1),
  capabilities: z.array(capabilitySchema).min(1),
  operatingSystem: z.array(z.string()).min(1),
  cta: z.object({
    title: z.string(),
    body: z.string(),
    primary: z.string(),
    secondary: z.string(),
  }),
})

const contentQueueItemSchema = z.object({
  id: z.string(),
  channel: z.literal('linkedin'),
  status: z.literal('draft_only'),
  theme: z.string(),
  hook: z.string(),
  cta: z.string(),
})

const authorityOpsSchema = z.object({
  version: z.string(),
  budgetUsd: z.number().max(40),
  budgetPlan: z.array(budgetItemSchema).min(1),
  guardrails: z.object({
    linkedInScope: z.string(),
    publishingMode: z.literal('manual_approval_only'),
    runtimeWrites: z.literal(false),
    autopublish: z.literal(false),
    clientClaims: z.string(),
    officialEndorsement: z.string(),
  }),
  positioning: z.object({
    pt: z.object({ statement: z.string(), short: z.string() }),
    en: z.object({ statement: z.string(), short: z.string() }),
  }),
  pages: z.object({
    pt: pageSchema,
    en: pageSchema,
  }),
  contentQueue: z.array(contentQueueItemSchema).min(1),
})

export const authorityOps = authorityOpsSchema.parse(authorityOpsRaw)

export function getAuthorityPage(lang: AuthorityLang) {
  return authorityOps.pages[lang]
}

export function authorityProfileJsonLd(lang: AuthorityLang) {
  const page = getAuthorityPage(lang)
  const language = lang === 'pt' ? 'pt-BR' : 'en-US'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#paulo-pierrondi`,
      name: 'Paulo Pierrondi',
      url: `${SITE_URL}${page.slug}`,
      image: `${SITE_URL}/assets/paulo-pierrondi-executive-neural.jpg`,
      jobTitle: 'ServiceNow Technical Account Executive and governed AI operator',
      knowsAbout: [
        'ServiceNow',
        'Now Assist',
        'AI Agents',
        'CSDM',
        'CMDB',
        'Service Graph',
        'AgentOps',
        'Enterprise AI governance',
      ],
      sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}${page.slug}#profile`,
      url: `${SITE_URL}${page.slug}`,
      name: page.metadataTitle,
      description: page.metadataDescription,
      inLanguage: language,
      about: { '@id': `${SITE_URL}/#paulo-pierrondi` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ]
}
