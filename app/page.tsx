import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import HomeV2 from '@/components/home-v2/HomeV2'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi — Onde IA vira operação com evidência',
  description:
    'Sistema operacional da IA: operating model, AgentOps, governança e trilha de evidência. Enterprise FSI na ServiceNow e sistemas públicos construídos e publicados por Paulo Pierrondi.',
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
    title: 'Paulo Pierrondi — Onde IA vira operação com evidência',
    description:
      'Operating model de IA, AgentOps e sistemas com trilha de evidência — enterprise FSI na ServiceNow e produtos públicos.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi — Onde IA vira operação com evidência',
    description:
      'Sistema operacional da IA: contexto, governança, AgentOps e evidência — em contas enterprise e em sistemas construídos e publicados.',
    images: ['/og'],
  },
}

const homeWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile-page`,
  url: SITE_URL,
  name: 'Paulo Pierrondi — Onde IA vira operação com evidência',
  description:
    'Perfil de Paulo Pierrondi: operating model de IA, AgentOps, sistemas multi-agente, produtos e frameworks com trilha de evidência, e liderança de contas enterprise FSI na ServiceNow.',
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
