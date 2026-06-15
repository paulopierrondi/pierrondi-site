import type { Metadata } from 'next'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import PrecosContent from './PrecosContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Preços — automação, MVP, App Store Connect e CTO fracionado',
  description: 'Preços transparentes para automação, MVP, App Store Connect e CTO fracionado. Escopo fechado, preço fixo, sem surpresa. Diagnóstico gratuito em 30 minutos.',
  keywords: ['preço automação', 'preço mvp brasil', 'app store connect', 'aso app store', 'preço cto fracionado', 'preços agência tecnologia'],
  alternates: { canonical: '/precos' },
  openGraph: {
    title: 'Preços | pierrondi.dev',
    description: 'Automação a partir de R$1.500. MVP a partir de R$5.000. App Store Connect gratuito. CTO fracionado R$2.500/mês.',
    url: '/precos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Preços pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preços | pierrondi.dev',
    description: 'Automação R$1.500. MVP R$5.000. App Store Connect gratuito. CTO fracionado R$2.500/mês.',
    images: ['/og'],
  },
}

const priceJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automação Express',
    provider: { '@type': 'Organization', name: 'pierrondi.dev' },
    description: 'Processo manual transformado em fluxo automatizado com n8n ou Make. Entrega em até 2 semanas.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: '1500',
      highPrice: '3000',
      offerCount: '1',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Produto Digital (MVP)',
    provider: { '@type': 'Organization', name: 'pierrondi.dev' },
    description: 'App web, micro SaaS ou ferramenta interna — do zero ao deploy em produção com Next.js e Supabase.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: '5000',
      highPrice: '12000',
      offerCount: '1',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tech Partner (CTO Fracionado)',
    provider: { '@type': 'Organization', name: 'pierrondi.dev' },
    description: 'CTO as a Service com ~20h/mês: arquitetura, code review, roadmap e decisões técnicas.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '2500',
      eligibleDuration: { '@type': 'QuantitativeValue', value: '1', unitCode: 'MON' },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'App Store Connect / ASO',
    provider: { '@type': 'Organization', name: 'pierrondi.dev' },
    description: 'Configuração gratuita de App Store Connect para app iOS pronto: nome, descrição, keywords, screenshots, privacidade e ASO básico.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '0',
    },
  },
]

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Preços', item: `${SITE_URL}/precos` },
  ],
}

export default function PrecosPage() {
  return (
    <>
      <JsonLd data={[...priceJsonLd, breadcrumb]} />
      <PrecosContent />
      <WhatsApp />
    </>
  )
}
