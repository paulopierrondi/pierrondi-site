import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PortfolioExperience from '@/components/portfolio/PortfolioExperience'
import { PORTFOLIO_CATALOG, resolvePortfolioHref } from '@/components/portfolio/portfolio-catalog'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Portfólio de produtos, Studio e sistemas | Paulo Pierrondi',
  description:
    'PropTech, produtos, apps, IA, Multi-LLM, automação, commerce e sistemas — com navegação rápida, status honesto e evidência pública.',
  alternates: {
    canonical: '/portfolio',
    languages: { 'pt-BR': '/portfolio', 'en-US': '/en/portfolio', 'x-default': '/portfolio' },
  },
  openGraph: {
    title: 'Portfólio de produtos, Studio e sistemas | Paulo Pierrondi',
    description: 'Meta Busca Parceiros, produtos, apps, sistemas, Multi-LLM e integrações levados da estratégia à implementação.',
    url: '/portfolio',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Portfólio de Paulo Pierrondi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfólio de IA, apps e sistemas | Paulo Pierrondi',
    description: 'PropTech, produtos, apps publicados, sistemas, automação, WordPress/Elementor e operações Multi-LLM.',
    images: ['/og'],
  },
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/portfolio#collection`,
  url: `${SITE_URL}/portfolio`,
  name: 'Portfólio de produtos, Studio e sistemas — Paulo Pierrondi',
  description: metadata.description,
  inLanguage: 'pt-BR',
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: PORTFOLIO_CATALOG.length,
    itemListElement: PORTFOLIO_CATALOG.map((item, index) => {
      const href = resolvePortfolioHref(item, 'pt')
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.summary.pt,
        url: href
          ? (href.startsWith('http') ? href : `${SITE_URL}${href}`)
          : `${SITE_URL}/portfolio#catalog-${item.id}`,
      }
    }),
  },
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={portfolioSchema} />
      <PortfolioExperience lang="pt" />
    </>
  )
}
