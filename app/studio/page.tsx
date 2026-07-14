import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import StudioExperience from '@/components/studio/StudioExperience'
import { STUDIO_COPY } from '@/components/studio/studio-data'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pierrondi Studio — Marca, Conteúdo e IA aplicada ao crescimento',
  description:
    'Estratégia, branding, conteúdo multimídia, CRM e automação com IA transformados em sistemas de crescimento executáveis.',
  alternates: {
    canonical: '/studio',
    languages: { 'pt-BR': '/studio', 'en-US': '/en/studio', 'x-default': '/studio' },
  },
  openGraph: {
    title: 'Pierrondi Studio — Marca, Conteúdo e IA',
    description: STUDIO_COPY.pt.positioning,
    url: '/studio',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Pierrondi Studio — Marca, Conteúdo e IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pierrondi Studio — Marca, Conteúdo e IA',
    description: STUDIO_COPY.pt.positioning,
    images: ['/og'],
  },
}

const studioSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/studio#service`,
  url: `${SITE_URL}/studio`,
  name: 'Pierrondi Studio',
  serviceType: 'Estratégia de marca, conteúdo multimídia e automação comercial com IA',
  description: STUDIO_COPY.pt.positioning,
  inLanguage: 'pt-BR',
  provider: { '@id': `${SITE_URL}/#person` },
  brand: { '@type': 'Brand', name: 'Pierrondi Studio' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Frentes Pierrondi Studio',
    itemListElement: STUDIO_COPY.pt.fronts.map((front) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: front.title,
        description: front.description,
      },
    })),
  },
}

export default function StudioPage() {
  return (
    <>
      <JsonLd data={studioSchema} />
      <StudioExperience lang="pt" />
    </>
  )
}
