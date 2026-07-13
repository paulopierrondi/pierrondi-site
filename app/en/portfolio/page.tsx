import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PortfolioExperience from '@/components/portfolio/PortfolioExperience'
import { APP_STORE_CATALOG, PORTFOLIO_CASES } from '@/components/portfolio/portfolio-data'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI, apps and systems portfolio | Paulo Pierrondi',
  description:
    'CantuStudio, FaithSchool, 21 published apps, iOS, Android, CRM, WhatsApp, AgenticosCore, and SADA — end-to-end architecture and product engineering.',
  alternates: {
    canonical: '/en/portfolio',
    languages: { 'pt-BR': '/portfolio', 'en-US': '/en/portfolio', 'x-default': '/portfolio' },
  },
  openGraph: {
    title: 'AI, apps and systems portfolio | Paulo Pierrondi',
    description: 'Products, systems, and integrations taken from concept to production—with public evidence and real identities.',
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
    description: 'CantuStudio, FaithSchool, published apps, CRM, WhatsApp, AgenticosCore, and SADA.',
    images: ['/og'],
  },
}

const cases = PORTFOLIO_CASES.en

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/en/portfolio#collection`,
  url: `${SITE_URL}/en/portfolio`,
  name: 'AI, apps and systems portfolio — Paulo Pierrondi',
  description: metadata.description,
  inLanguage: 'en-US',
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

export default function PortfolioEnPage() {
  return (
    <>
      <JsonLd data={portfolioSchema} />
      <PortfolioExperience lang="en" />
    </>
  )
}

