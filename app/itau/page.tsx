import type { Metadata } from 'next'
import ItauExperience from './ItauExperience'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'AI Agent Governance no CMDB — CSDM 5',
  description:
    'Material executivo e técnico sobre cadastro e governança de agentes de IA no CMDB, alinhado com CSDM 5 e forward-compatible com AI Control Tower + Now Assist Agent Fabric.',
  keywords: [
    'ServiceNow',
    'CSDM 5',
    'AI Agent Governance',
    'cmdb_ci_appl_ai_application',
    'cmdb_ci_ai_agent',
    'Now Assist',
    'AI Control Tower',
    'Now Assist Agent Fabric',
    'BACEN CP 109',
    'LGPD IA',
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
    title: 'AI Agent Governance no CMDB — CSDM 5',
    description:
      'Cadastro de agentes de IA no CMDB, alinhado com CSDM 5 e forward-compatible com AI Control Tower.',
    url: 'https://www.pierrondi.dev/itau',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'AI Agent Governance CSDM 5' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Governance no CMDB',
    description: 'CSDM 5 forward-compatible com AI Control Tower + Now Assist Agent Fabric.',
    images: ['/og'],
  },
}

export default function ItauPage() {
  return <ItauExperience />
}
