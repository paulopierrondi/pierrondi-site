import type { Metadata } from 'next'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import TechPartnerContent from './TechPartnerContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'CTO Fracionado — Tech Partner para startups e PMEs',
  description: 'CTO fracionado para startups e PMEs no Brasil. Decisões técnicas, arquitetura de sistema, code review e roadmap. R$2.500/mês. Sem CLT, sem vínculo, com responsabilidade.',
  keywords: [
    'cto fracionado',
    'contratar cto startup',
    'cto como serviço brasil',
    'tech partner',
    'fractional cto',
    'cto as a service',
    'liderança técnica fracionada',
  ],
  alternates: { canonical: '/tech-partner' },
  openGraph: {
    title: 'CTO Fracionado — Tech Partner | pierrondi.dev',
    description: 'Direção técnica recorrente para startups e PMEs. R$2.500/mês, sem CLT, sem fidelidade.',
    url: '/tech-partner',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'CTO Fracionado — pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTO Fracionado — Tech Partner | pierrondi.dev',
    description: 'Direção técnica recorrente para startups e PMEs. R$2.500/mês.',
    images: ['/og'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Tech Partner', item: `${SITE_URL}/tech-partner` },
  ],
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tech Partner — CTO as a Service',
  provider: { '@type': 'Organization', name: 'pierrondi.dev' },
  description: 'Presença técnica contínua sem vínculo CLT. Arquitetura, code review, roadmap e execução parcial.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    price: '2500',
    priceSpecification: { '@type': 'PriceSpecification', price: '2500', priceCurrency: 'BRL', unitText: 'MONTH' },
  },
  areaServed: { '@type': 'Country', name: 'Brazil' },
  serviceType: 'CTO as a Service',
  mainEntityOfPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Qual o compromisso mínimo?', acceptedAnswer: { '@type': 'Answer', text: 'Contrato mensal, renovável. Sem fidelidade de 12 meses.' } },
      { '@type': 'Question', name: 'Quantas horas por mês?', acceptedAnswer: { '@type': 'Answer', text: '~20h/mês dedicadas, distribuídas conforme a demanda da semana.' } },
      { '@type': 'Question', name: 'Funciona para time sem CTO?', acceptedAnswer: { '@type': 'Answer', text: 'Exatamente para isso. Startups e PMEs que têm dev(s) mas não têm liderança técnica estratégica.' } },
    ],
  },
}

export default function TechPartnerPage() {
  return (
    <>
      <JsonLd data={[schema, breadcrumb]} />
      <TechPartnerContent />
      <WhatsApp />
    </>
  )
}
