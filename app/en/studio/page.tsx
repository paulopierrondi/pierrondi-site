import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import StudioExperience from '@/components/studio/StudioExperience'
import { STUDIO_COPY } from '@/components/studio/studio-data'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pierrondi Studio — Brand, content, and AI for growth',
  description:
    'Strategy, branding, multimedia content, CRM, and AI automation turned into executable growth systems.',
  alternates: {
    canonical: '/en/studio',
    languages: { 'pt-BR': '/studio', 'en-US': '/en/studio', 'x-default': '/studio' },
  },
  openGraph: {
    title: 'Pierrondi Studio — Brand, content, and AI',
    description: STUDIO_COPY.en.positioning,
    url: '/en/studio',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Pierrondi Studio — Brand, content, and AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pierrondi Studio — Brand, content, and AI',
    description: STUDIO_COPY.en.positioning,
    images: ['/og'],
  },
}

const studioSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/en/studio#service`,
  url: `${SITE_URL}/en/studio`,
  name: 'Pierrondi Studio',
  serviceType: 'Brand strategy, multimedia content, and AI-powered commercial automation',
  description: STUDIO_COPY.en.positioning,
  inLanguage: 'en-US',
  provider: { '@id': `${SITE_URL}/#person` },
  brand: { '@type': 'Brand', name: 'Pierrondi Studio' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pierrondi Studio capabilities',
    itemListElement: STUDIO_COPY.en.fronts.map((front) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: front.title,
        description: front.description,
      },
    })),
  },
}

export default function StudioEnPage() {
  return (
    <>
      <JsonLd data={studioSchema} />
      <StudioExperience lang="en" />
    </>
  )
}
