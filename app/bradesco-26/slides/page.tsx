import type { Metadata } from 'next'
import Bradesco26Slides from './Bradesco26Slides'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Knowledge 2026 | Bradesco - Apresentação',
  description:
    'Material executivo e técnico sobre os anúncios do Knowledge 2026 aplicados ao contexto Bradesco.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: {
    canonical: 'https://www.pierrondi.dev/bradesco-26/slides',
  },
  openGraph: {
    title: 'Knowledge 2026 | Bradesco - Apresentação',
    description:
      'IA governada, dados vivos, execução, risco e arquitetura aplicados ao contexto Bradesco.',
    url: 'https://www.pierrondi.dev/bradesco-26/slides',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Knowledge 2026 | Bradesco',
      },
    ],
  },
}

export default function Bradesco26SlidesPage() {
  return <Bradesco26Slides />
}
