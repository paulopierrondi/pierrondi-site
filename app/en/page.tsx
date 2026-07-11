import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import HomeV2 from '@/components/home-v2/HomeV2'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi - Enterprise AI becomes an operating model',
  description:
    'ServiceNow TAE / Enterprise Architect turning enterprise AI into an operating model: AgentOps, adoption velocity, AI control towers, and governed execution.',
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
    title: 'Paulo Pierrondi - Enterprise AI becomes an operating model',
    description:
      'ServiceNow TAE / Enterprise Architect turning enterprise AI into an operating model, adoption velocity, and governed execution.',
    url: '/en',
    siteName: 'pierrondi.dev',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow and governed AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - Enterprise AI becomes an operating model',
    description:
      'ServiceNow, AgentOps, AI Operating Model, adoption velocity and governed implementation in enterprise environments.',
    images: ['/og'],
  },
}

const enWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en`,
  url: `${SITE_URL}/en`,
  name: 'Paulo Pierrondi - Enterprise AI becomes an operating model',
  description:
    'Executive profile by Paulo Pierrondi on AI Operating Model, Enterprise AI, ServiceNow, AgentOps, adoption velocity, AI control towers, and governed implementation systems.',
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
