import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PortfolioExperience from '@/components/portfolio/PortfolioExperience'
import { APP_STORE_CATALOG, PORTFOLIO_CASES } from '@/components/portfolio/portfolio-data'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Portfólio de IA, apps e sistemas | Paulo Pierrondi',
  description:
    'Cases de CantuStudio, FaithSchool, 21 apps publicados, iOS, Android, CRM, WhatsApp, AgenticosCore e SADA — arquitetura e desenvolvimento ponta a ponta.',
  alternates: {
    canonical: '/portfolio',
    languages: { 'pt-BR': '/portfolio', 'en-US': '/en/portfolio', 'x-default': '/portfolio' },
  },
  openGraph: {
    title: 'Portfólio de IA, apps e sistemas | Paulo Pierrondi',
    description: 'Produtos, sistemas e integrações levados do conceito à produção — com evidência pública e identidade real.',
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
    description: 'CantuStudio, FaithSchool, apps publicados, CRM, WhatsApp, AgenticosCore e SADA.',
    images: ['/og'],
  },
}

const cases = PORTFOLIO_CASES.pt

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/portfolio#collection`,
  url: `${SITE_URL}/portfolio`,
  name: 'Portfólio de IA, apps e sistemas — Paulo Pierrondi',
  description: metadata.description,
  inLanguage: 'pt-BR',
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: cases.length + APP_STORE_CATALOG.count,
    itemListElement: [
      ...cases.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description,
        url: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
      })),
      ...APP_STORE_CATALOG.apps.map((app, index) => ({
        '@type': 'ListItem',
        position: cases.length + index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: app.name,
          applicationCategory: app.category,
          operatingSystem: 'iOS, iPadOS',
          url: app.url,
          image: `${SITE_URL}${app.icon}`,
          author: { '@id': `${SITE_URL}/#person` },
        },
      })),
    ],
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
