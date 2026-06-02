import type { Metadata } from 'next'
import ItauExperience from './ItauExperience'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Itaú × ServiceNow — CSDM Architecture Blueprint para AI Agents',
  description:
    'Site de arquitetura para Squad Gaia (Itaú): ServiceNow CSDM, CMDB, AI Digital Asset, AI Function, AI & Model Application e AI Control Tower para governar agentes de IA.',
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
    title: 'Itaú × ServiceNow — CSDM Architecture Blueprint para AI Agents',
    description:
      'Blueprint executivo para cadastrar, governar e operar agentes de IA no Itaú com CSDM, CMDB e AI Control Tower.',
    url: 'https://www.pierrondi.dev/itau',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Itaú × ServiceNow CSDM 5' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itaú × ServiceNow — CSDM Architecture Blueprint',
    description: 'Arquitetura ServiceNow CSDM para governar agentes de IA com CMDB e AI Control Tower.',
    images: ['/og'],
  },
}

export default function ItauPage() {
  return <ItauExperience />
}
