import type { Metadata } from 'next'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import CalculadoraContent from './CalculadoraContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Calculadora de ROI de Automação',
  description: 'Calcule o retorno sobre investimento (ROI) de automação. Saiba quanto você economiza mensalmente e em quanto tempo recupera o investimento.',
  keywords: ['calculadora roi automação', 'roi automação processos', 'payback automação', 'economia automação'],
  alternates: { canonical: '/calculadora' },
  openGraph: {
    title: 'Calculadora de ROI de Automação | pierrondi.dev',
    description: 'Ferramenta interativa para calcular ROI de automação. Economia mensal, payback e retorno em 6 meses.',
    url: '/calculadora',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Calculadora de ROI de Automação' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de ROI | pierrondi.dev',
    description: 'Calcule o ROI da sua automação em segundos.',
    images: ['/og'],
  },
}

const roiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Tool',
  name: 'Calculadora de ROI',
  description: 'Ferramenta interativa para calcular o retorno sobre investimento em automação de processos.',
  publisher: { '@type': 'Organization', name: 'pierrondi.dev' },
  url: `${SITE_URL}/calculadora`,
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Calculadora de ROI', item: `${SITE_URL}/calculadora` },
  ],
}

export default function CalculadoraPage() {
  return (
    <>
      <JsonLd data={[roiJsonLd, breadcrumb]} />
      <CalculadoraContent />
      <WhatsApp />
    </>
  )
}
