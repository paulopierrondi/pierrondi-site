import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import HomeV2 from '@/components/home-v2/HomeV2'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi - Arquiteto de IA, Full-stack Builder e Enterprise Account Director',
  description:
    'Arquiteto de IA e automação, full-stack builder e Enterprise Account Director na ServiceNow. Sistemas multi-agente, AgentOps, plataformas de automação, apps e frameworks — com trilha de evidência.',
  keywords: [
    'Paulo Pierrondi',
    'AI Architect',
    'Automation Architect',
    'Full-stack Builder',
    'Enterprise Account Director',
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
    title: 'Paulo Pierrondi - Arquiteto de IA, Full-stack Builder e Enterprise Account Director',
    description:
      'Sistemas multi-agente, AgentOps, plataformas de automação, apps e frameworks — liderando contas enterprise FSI na ServiceNow.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - Arquiteto de IA, Full-stack Builder e Enterprise Account Director',
    description:
      'Sistemas multi-agente, AgentOps, automação, apps e frameworks — com liderança de contas enterprise na ServiceNow.',
    images: ['/og'],
  },
}

const homeWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile-page`,
  url: SITE_URL,
  name: 'Paulo Pierrondi - Arquiteto de IA, Full-stack Builder e Enterprise Account Director',
  description:
    'Perfil de Paulo Pierrondi: arquitetura de IA e automação, sistemas multi-agente, full-stack building, apps e frameworks, com liderança de contas enterprise FSI na ServiceNow.',
  inLanguage: 'pt-BR',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
}

export default function Home() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />
      <HomeV2 lang="pt" />
    </>
  )
}
