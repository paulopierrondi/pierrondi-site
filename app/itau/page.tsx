import type { Metadata } from 'next'
import ItauExperience from './ItauExperience'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Itaú × ServiceNow — AI Agent Governance no CMDB (CSDM 5)',
  description:
    'Resposta executiva para Squad Gaia (Itaú) sobre como cadastrar e governar agentes de IA no CMDB, escolhendo entre AI Function e AI & Model Application com racional CSDM 5.',
  keywords: [
    'Itaú Unibanco',
    'ServiceNow',
    'CSDM 5',
    'AI Agent Governance',
    'cmdb_ci_appl_ai_application',
    'cmdb_ci_function_ai',
    'AI Digital Asset',
    'Now Assist',
    'AI Control Tower',
    'Squad Gaia',
    'LGPD',
    'OPR-2025-0162762',
  ],
  authors: [{ name: 'Paulo Pierrondi' }],
  creator: 'Paulo Pierrondi',
  publisher: 'pierrondi.dev',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: {
    canonical: 'https://www.pierrondi.dev/itau',
  },
  openGraph: {
    title: 'Itaú × ServiceNow — AI Agent Governance no CMDB (CSDM 5)',
    description:
      'Como cadastrar agentes de IA no CMDB do Itaú: AI Function, AI & Model Application, AI Digital Asset e CSDM 5.',
    url: 'https://www.pierrondi.dev/itau',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Itaú × ServiceNow CSDM 5' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itaú × ServiceNow — AI Agent Governance no CMDB',
    description: 'Como escolher a tabela correta e o racional CSDM 5 para agentes de IA.',
    images: ['/og'],
  },
}

export default function ItauPage() {
  return <ItauExperience />
}
