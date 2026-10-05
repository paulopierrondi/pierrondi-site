import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { profilePageMainEntity } from '@/lib/authority/authority'
import { SITE_URL } from '@/lib/site'
import HomeV2 from '@/components/home-v2/HomeV2'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi — Fractional AI Officer',
  description:
    'Fractional AI Automation Officer: resultado e automações mensuráveis (não horas soltas), com baseline, métrica e handoff. FSI na ServiceNow.',
  keywords: [
    'Paulo Pierrondi',
    'AI Architect',
    'Automation Architect',
    'Full-stack Builder',
    'Technical Account Executive',
    'multi-agent systems',
    'Enterprise AI Operator',
    'IA governada',
    'ServiceNow',
    'SADA ServiceNow',
    'ServiceNow AI-Driven Architecture',
    'AI Delivery Acceleration',
    'Delivery Acceleration AI Specialist',
    'Forward Deployed Engineering',
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
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Paulo Pierrondi — Fractional AI Officer',
    description:
      'Fractional AI Automation Officer: resultado e automações mensuráveis (não horas soltas), com baseline, métrica e handoff. FSI na ServiceNow.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi — Fractional AI Officer',
    description:
      'Fractional AI Automation Officer: resultado e automações mensuráveis (não horas soltas), com baseline, métrica e handoff. FSI na ServiceNow.',
    images: ['/og'],
  },
}

const homeWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'ProfilePage'],
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: 'Paulo Pierrondi — Fractional AI Officer',
  description:
    'Fractional AI Automation Officer: resultado e automações mensuráveis, com baseline, métrica e handoff. Cargo na ServiceNow: Technical Account Executive.',
  inLanguage: 'pt-BR',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: profilePageMainEntity,
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export default function Home() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />
      <HomeV2 lang="pt" />
    </>
  )
}
