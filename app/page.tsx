import type { Metadata } from 'next'
import HomeExperience from './HomeExperience'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi - IA governada, ServiceNow, AgentOps e LLM inference',
  description:
    'Portfólio executivo de Paulo Pierrondi sobre IA governada, ServiceNow, SADA, agentes autônomos com governança, LLM inference, AgentOps e plataformas de automação enterprise.',
  keywords: [
    'Paulo Pierrondi',
    'IA governada',
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
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Paulo Pierrondi - IA governada, ServiceNow, AgentOps e LLM inference',
    description:
      'Portfólio executivo sobre ServiceNow, SADA, agentes governados, inferência de LLMs, AgentOps, dados e execução corporativa.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - IA governada, AgentOps e ServiceNow',
    description:
      'Portfólio executivo sobre ServiceNow, SADA, agentes governados, LLM inference e workflows corporativos.',
    images: ['/og'],
  },
}

export default function Home() {
  return <HomeExperience lang="pt" />
}
