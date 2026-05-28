import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import HomeExperience from '../HomeExperience'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi - governed AI, ServiceNow, AgentOps and LLM inference',
  description:
    'Executive portfolio by Paulo Pierrondi on governed AI, ServiceNow, SADA, autonomous agents with governance, LLM inference, AgentOps and enterprise automation platforms.',
  keywords: [
    'Paulo Pierrondi',
    'governed AI',
    'ServiceNow',
    'SADA ServiceNow',
    'ServiceNow AI-Driven Architecture',
    'Now Assist',
    'AI Agents',
    'AgentOps',
    'LLM inference',
    'LLMOps',
    'CSDM',
    'CMDB',
    'enterprise AI',
    'workflow automation',
    'FSI AI',
    'Energy AI',
    'Retail AI',
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
    title: 'Paulo Pierrondi - governed AI, ServiceNow, AgentOps and LLM inference',
    description:
      'Executive portfolio on ServiceNow, SADA, governed agents, LLM inference, AgentOps, data and enterprise execution.',
    url: '/en',
    siteName: 'pierrondi.dev',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow and governed AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - governed AI, AgentOps and ServiceNow',
    description:
      'Executive portfolio on ServiceNow, SADA, governed agents, LLM inference and enterprise workflows.',
    images: ['/og'],
  },
}

const enWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en`,
  url: `${SITE_URL}/en`,
  name: 'Paulo Pierrondi - governed AI, ServiceNow, AgentOps and LLM inference',
  description:
    'Executive portfolio by Paulo Pierrondi on governed AI, ServiceNow, autonomous agents, LLM inference and enterprise workflow execution.',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
}

export default function HomeEn() {
  return (
    <>
      <JsonLd data={enWebPageSchema} />
      <HomeExperience lang="en" />
    </>
  )
}
