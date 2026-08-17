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

const profileSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
  items: z.array(capabilitySchema).min(1),
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
  qualities: profileSectionSchema,
  capabilities: z.array(capabilitySchema).min(1),
  evidence: profileSectionSchema,
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

// Google ProfilePage rich results require mainEntity (Person|Organization)
// with at least `name`. Keep @id aligned with SiteJsonLd's #person so the
// entity graph stays one Person, not a second #paulo-pierrondi fork.
export const profilePageMainEntity = {
  '@id': `${SITE_URL}/#person`,
  '@type': 'Person',
  name: 'Paulo Pierrondi',
  url: SITE_URL,
  image: `${SITE_URL}/og`,
  sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
}

export function authorityProfileJsonLd(lang: AuthorityLang) {
  const page = getAuthorityPage(lang)
  const language = lang === 'pt' ? 'pt-BR' : 'en-US'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}${page.slug}#profile`,
      url: `${SITE_URL}${page.slug}`,
      name: page.metadataTitle,
      description: page.metadataDescription,
      inLanguage: language,
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: profilePageMainEntity,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ]
}
