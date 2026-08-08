import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PortfolioExperience from '@/components/portfolio/PortfolioExperience'
import { PORTFOLIO_CATALOG, resolvePortfolioHref } from '@/components/portfolio/portfolio-catalog'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Products, Studio, and systems portfolio | Paulo Pierrondi',
  description:
    'Complete catalog of products, apps, AI, Multi-LLM, automation, websites, commerce, and systems—with search, honest status, and public evidence.',
  alternates: {
    canonical: '/en/portfolio',
    languages: { 'pt-BR': '/portfolio', 'en-US': '/en/portfolio', 'x-default': '/portfolio' },
  },
  openGraph: {
    title: 'Products, Studio, and systems portfolio | Paulo Pierrondi',
    description: 'Products, apps, systems, Multi-LLM, and integrations taken from strategy through implementation in one searchable catalog.',
    url: '/en/portfolio',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI, apps and systems portfolio | Paulo Pierrondi',
    description: 'Complete catalog of products, published apps, systems, automation, WordPress/Elementor, and Multi-LLM operations.',
    images: ['/og'],
  },
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/en/portfolio#collection`,
  url: `${SITE_URL}/en/portfolio`,
  name: 'Products, Studio, and systems portfolio — Paulo Pierrondi',
  description: metadata.description,
  inLanguage: 'en-US',
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: PORTFOLIO_CATALOG.length,
    itemListElement: PORTFOLIO_CATALOG.map((item, index) => {
      const href = resolvePortfolioHref(item, 'en')
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.summary.en,
        url: href
          ? (href.startsWith('http') ? href : `${SITE_URL}${href}`)
          : `${SITE_URL}/en/portfolio#catalog-${item.id}`,
      }
    }),
  },
}

export default function PortfolioEnPage() {
  return (
    <>
      <JsonLd data={portfolioSchema} />
      <PortfolioExperience lang="en" />
    </>
  )
}
