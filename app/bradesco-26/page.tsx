import type { Metadata } from 'next'
import Bradesco26Experience from './Bradesco26Experience'

export const metadata: Metadata = {
  title: 'Knowledge 2026 para Bradesco',
  description:
    'Briefing executivo e tecnico sobre os anuncios do ServiceNow Knowledge 2026 aplicados ao contexto do Bradesco.',
  keywords: [
    'ServiceNow Knowledge 2026',
    'Bradesco',
    'IA governada',
    'AI Control Tower',
    'Now Assist',
    'Workflow Data Fabric',
    'ServiceNow Otto',
  ],
  authors: [{ name: 'ServiceNow' }],
  creator: 'ServiceNow',
  publisher: 'ServiceNow',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: 'https://www.pierrondi.dev/bradesco-26',
  },
  openGraph: {
    title: 'Knowledge 2026 para Bradesco',
    description:
      'Da novidade ao valor: IA governada, dados confiaveis e execucao ponta a ponta na plataforma.',
    url: 'https://www.pierrondi.dev/bradesco-26',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Knowledge 2026 para Bradesco' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge 2026 para Bradesco',
    description:
      'Briefing executivo e tecnico sobre IA governada, dados confiaveis e execucao ponta a ponta.',
    images: ['/og'],
  },
}

export default function Bradesco26Page() {
  return <Bradesco26Experience />
}
