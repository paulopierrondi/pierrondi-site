import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import AutomacoesContent from './AutomacoesContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Automação de Processos com n8n e IA',
  description: 'Automatize processos manuais em até 14 dias. n8n, Make, APIs e IA integrados. Diagnóstico gratuito, proposta com escopo fechado, preço entre R$1.500 e R$3.000. Para PMEs no Brasil.',
  keywords: [
    'automação n8n brasil',
    'automação de processos empresariais',
    'integração de sistemas pme',
    'n8n make zapier',
    'automação com IA',
    'workflow automation pme',
  ],
  alternates: { canonical: '/automacoes' },
  openGraph: {
    title: 'Automação de Processos com n8n e IA | pierrondi.dev',
    description: 'Automatize processos manuais em até 14 dias. R$1.500–3.000, escopo fechado, código seu.',
    url: '/automacoes',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Automação de Processos com n8n — pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automação de Processos com n8n e IA | pierrondi.dev',
    description: 'Automatize processos manuais em até 14 dias. R$1.500–3.000, escopo fechado.',
    images: ['/og'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Automações', item: `${SITE_URL}/automacoes` },
  ],
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automação de Processos',
  provider: { '@type': 'Organization', name: 'pierrondi.dev' },
  description: 'Automação de processos com n8n, Make e integrações sob medida. CRM, planilhas, WhatsApp, ERPs, APIs e IA no mesmo workflow.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    price: '1500',
    priceSpecification: { '@type': 'PriceSpecification', minPrice: '1500', maxPrice: '3000', priceCurrency: 'BRL' },
  },
  areaServed: { '@type': 'Country', name: 'Brazil' },
  serviceType: 'Business Process Automation',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Ferramentas de automação',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'n8n workflow' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Make (Integromat)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp Business API' } },
    ],
  },
  mainEntityOfPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Preciso saber programar para automatizar?', acceptedAnswer: { '@type': 'Answer', text: 'Não. Você descreve o processo; a gente implementa.' } },
      { '@type': 'Question', name: 'Quanto tempo leva o primeiro fluxo?', acceptedAnswer: { '@type': 'Answer', text: 'Fluxos focados costumam sair em 1–2 semanas, dependendo da complexidade.' } },
      { '@type': 'Question', name: 'Quanto custa uma automação?', acceptedAnswer: { '@type': 'Answer', text: 'A partir de R$1.500 para fluxos focados. O valor final depende de escopo e integrações.' } },
      { '@type': 'Question', name: 'O workflow fica com minha empresa?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Documentação, credenciais e acesso completo. Zero caixa preta.' } },
    ],
  },
}

export default function AutomacoesPage() {
  return (
    <>
      <JsonLd data={[schema, breadcrumb]} />
      <Nav />
      <main>
        <AutomacoesContent />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
