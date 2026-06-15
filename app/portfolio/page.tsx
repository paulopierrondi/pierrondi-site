import type { Metadata } from 'next'
import WhatsApp from '@/components/WhatsApp'
import MobileCTA from '@/components/MobileCTA'
import JsonLd from '@/components/JsonLd'
import PortfolioContent from './PortfolioContent'
import { SITE_URL } from '@/lib/site'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Portfólio', item: `${SITE_URL}/portfolio` },
  ],
}

export const metadata: Metadata = {
  title: 'Portfólio — projetos reais de automação, MVP e IA aplicada',
  description:
    'Portfólio comercial da pierrondi.dev: páginas, automações, ferramentas e produtos digitais criados para vender mais, qualificar leads e reduzir trabalho manual.',
  keywords: [
    'portfolio automação',
    'portfolio desenvolvimento produto digital',
    'portfolio ia aplicada',
    'cases pierrondi ia',
    'portfolio agência tecnologia',
  ],
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfólio | pierrondi.dev',
    description: 'Páginas, automações, ferramentas e produtos digitais que entregam resultado real.',
    url: '/portfolio',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Portfólio pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfólio | pierrondi.dev',
    description: 'Projetos reais de automação, MVP e IA aplicada.',
    images: ['/og'],
  },
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <PortfolioContent />
      <WhatsApp />
      <MobileCTA />
    </>
  )
}
