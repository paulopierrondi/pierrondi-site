import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import HomeExperience from './HomeExperience'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi - AI Operating Model, ServiceNow, AgentOps e Enterprise AI',
  description:
    'ServiceNow TAE / Enterprise Architect transformando IA enterprise em AI Operating Model: AgentOps, adoption velocity, AI control towers e execução governada.',
  keywords: [
    'Paulo Pierrondi',
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
    'Energy AI',
    'Retail AI',
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
    title: 'Paulo Pierrondi - AI Operating Model, ServiceNow e AgentOps',
    description:
      'ServiceNow TAE / Enterprise Architect transformando IA enterprise em modelo operacional, adoption velocity e execução governada.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - AI Operating Model e AgentOps',
    description:
      'ServiceNow, AgentOps, AI Operating Model, adoption velocity e implementação governada em ambientes enterprise.',
    images: ['/og'],
  },
}

const homeWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile-page`,
  url: SITE_URL,
  name: 'Paulo Pierrondi - AI Operating Model, ServiceNow, AgentOps e Enterprise AI',
  description:
    'Perfil executivo de Paulo Pierrondi sobre AI Operating Model, Enterprise AI, ServiceNow, AgentOps, adoption velocity, AI control towers e implementação governada.',
  inLanguage: 'pt-BR',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
}

export default function Home() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />
      <HomeExperience lang="pt" />
    </>
  )
}
