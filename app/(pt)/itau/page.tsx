import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Itaú × ServiceNow — AI Agent Governance e CSDM Blueprint',
  description:
    'Leitura executiva e arquitetural sobre como governar AI Agents no CSDM/CMDB, conectando AI Digital Asset, runtime, Service Instance e AI Control Tower.',
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
    title: 'Itaú × ServiceNow — AI Agent Governance e CSDM Blueprint',
    description:
      'Como discutir AI Agents no CMDB: AI Digital Asset, AI Function, AI & Model Application, Service Instance e CSDM 5.',
    url: 'https://www.pierrondi.dev/itau',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Itaú × ServiceNow CSDM 5' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itaú × ServiceNow — AI Agent Governance no CMDB',
    description: 'Leitura executiva para governar AI Agents com CSDM, CMDB e AI Control Tower.',
    images: ['/og'],
  },
}

export default function ItauPage() {
  redirect('/about')
}
