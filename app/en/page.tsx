import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { profilePageMainEntity } from '@/lib/authority/authority'
import { SITE_URL } from '@/lib/site'
import HomeV2 from '@/components/home-v2/HomeV2'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi — Fractional AI Officer',
  description:
    'Fractional AI Automation Officer: measurable outcomes and automations (not loose hours), with baseline, metric and handoff. FSI at ServiceNow.',
  keywords: [
    'Paulo Pierrondi',
    'Enterprise AI Operator',
    'governed AI',
    'ServiceNow',
    'SADA ServiceNow',
    'ServiceNow AI-Driven Architecture',
    'AI Delivery Acceleration',
    'Delivery Acceleration AI Specialist',
    'Forward Deployed Engineering',
    'Forward Deployed Engineer',
    'Applied AI Architect',
    'Now Assist',
    'AI Agents',
    'AgentOps',
    'AI Control Tower',
    'Action Fabric',
    'Workflow Data Fabric',
    'Enterprise AI Operating Model',
    'AI Operating Model',
    'adoption velocity',
    'revenue expansion',
    'LLM inference',
    'LLMOps',
    'CSDM',
    'CMDB',
    'enterprise AI',
    'workflow automation',
    'FSI AI',
  ],
  alternates: {
    canonical: '/en',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Paulo Pierrondi — Fractional AI Officer',
    description:
      'Fractional AI Automation Officer: measurable outcomes and automations (not loose hours), with baseline, metric and handoff. FSI at ServiceNow.',
    url: '/en',
    siteName: 'pierrondi.dev',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow and governed AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi — Fractional AI Officer',
    description:
      'Fractional AI Automation Officer: measurable outcomes and automations (not loose hours), with baseline, metric and handoff. FSI at ServiceNow.',
    images: ['/og'],
  },
}

const enWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'ProfilePage'],
  '@id': `${SITE_URL}/en#webpage`,
  url: `${SITE_URL}/en`,
  name: 'Paulo Pierrondi — Fractional AI Officer',
  description:
    'Fractional AI Automation Officer: measurable outcomes and automations, with baseline, metric and handoff. ServiceNow role: Technical Account Executive.',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: profilePageMainEntity,
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export default function HomeEn() {
  return (
    <>
      <JsonLd data={enWebPageSchema} />
      <HomeV2 lang="en" />
    </>
  )
}
