import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import HomeV2 from '@/components/home-v2/HomeV2'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi — Where AI becomes governed operations',
  description:
    'Operating system for AI: operating model, AgentOps, governance and evidence trails. Enterprise FSI at ServiceNow and public systems designed, built and shipped by Paulo Pierrondi.',
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
    title: 'Paulo Pierrondi — Where AI becomes governed operations',
    description:
      'AI operating model, AgentOps and systems with evidence trails — enterprise FSI at ServiceNow and public products.',
    url: '/en',
    siteName: 'pierrondi.dev',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow and governed AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi — Where AI becomes governed operations',
    description:
      'Operating system for AI: context, governance, AgentOps and evidence — across enterprise accounts and shipped systems.',
    images: ['/og'],
  },
}

const enWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/en`,
  url: `${SITE_URL}/en`,
  name: 'Paulo Pierrondi — Where AI becomes governed operations',
  description:
    'Profile of Paulo Pierrondi: AI operating model, AgentOps, multi-agent systems, products and frameworks with evidence trails, and enterprise FSI account leadership at ServiceNow.',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
}

export default function HomeEn() {
  return (
    <>
      <JsonLd data={enWebPageSchema} />
      <HomeV2 lang="en" />
    </>
  )
}
