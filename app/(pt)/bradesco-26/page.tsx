import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Knowledge 2026 | Bradesco',
  description:
    'Material executivo e técnico sobre os anúncios do ServiceNow Knowledge 2026 aplicados ao contexto Bradesco.',
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
    title: 'Knowledge 2026 | Bradesco',
    description:
      'Da novidade ao valor: IA governada, dados confiáveis e execução ponta a ponta na plataforma.',
    url: 'https://www.pierrondi.dev/bradesco-26',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Knowledge 2026 | Bradesco' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge 2026 | Bradesco',
    description:
      'Material executivo e técnico sobre IA governada, dados confiáveis e execução ponta a ponta.',
    images: ['/og'],
  },
}

export default function Bradesco26Page() {
  redirect('/about')
}
