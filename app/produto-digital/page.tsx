import type { Metadata } from 'next'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import ProdutoContent from './ProdutoContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'MVP e Produto Digital — desenvolvimento em 4 a 8 semanas',
  description: 'MVP do zero ao primeiro usuário em 4 a 8 semanas. Next.js, TypeScript, Supabase. Escopo fechado, entrega real. A partir de R$5.000. Ideal para founders e infoprodutores.',
  keywords: [
    'criar mvp aplicativo',
    'desenvolvimento software pme',
    'mvp startup barato',
    'desenvolvimento app pme',
    'micro saas',
    'desenvolvimento next.js',
  ],
  alternates: { canonical: '/produto-digital' },
  openGraph: {
    title: 'MVP e Produto Digital | pierrondi.dev',
    description: 'Do briefing ao deploy em 4 a 8 semanas. Next.js, TypeScript, Supabase. A partir de R$5.000.',
    url: '/produto-digital',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'MVP e Produto Digital — pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVP e Produto Digital | pierrondi.dev',
    description: 'Do briefing ao deploy em 4–8 semanas. A partir de R$5.000.',
    images: ['/og'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Produto Digital', item: `${SITE_URL}/produto-digital` },
  ],
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Produto Digital — MVP',
  provider: { '@type': 'Organization', name: 'pierrondi.dev' },
  description: 'Do zero ao MVP funcional. App web, micro SaaS ou ferramenta interna com stack moderna, deploy em produção e código que você pode continuar.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    priceSpecification: { '@type': 'PriceSpecification', minPrice: '5000', maxPrice: '12000', priceCurrency: 'BRL' },
  },
  areaServed: { '@type': 'Country', name: 'Brazil' },
  serviceType: 'Software Development',
}

export default function ProdutoPage() {
  return (
    <>
      <JsonLd data={[schema, breadcrumb]} />
      <main>
        <ProdutoContent />
      </main>
      <WhatsApp />
    </>
  )
}
