import type { Metadata } from 'next'

import JsonLd from '@/components/JsonLd'
import { authorityProfileJsonLd, getAuthorityPage } from '@/lib/authority/authority'
import { SITE_URL } from '@/lib/site'
import AboutAuthorityExperience from '../../about/AboutAuthorityExperience'

const page = getAuthorityPage('en')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: page.metadataTitle,
  description: page.metadataDescription,
  keywords: [
    'Paulo Pierrondi',
    'ServiceNow',
    'governed AI',
    'Now Assist',
    'AI Agents',
    'CSDM',
    'CMDB',
    'AgentOps',
    'AI Control Tower',
    'enterprise AI governance',
  ],
  alternates: {
    canonical: '/en/about',
    languages: {
      'pt-BR': '/about',
      'en-US': '/en/about',
      'x-default': '/about',
    },
  },
  openGraph: {
    title: page.metadataTitle,
    description: page.metadataDescription,
    url: '/en/about',
    siteName: 'pierrondi.dev',
    type: 'profile',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    images: [
      {
        url: '/assets/paulo-pierrondi-executive-neural.jpg',
        width: 900,
        height: 900,
        alt: 'Paulo Pierrondi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: page.metadataTitle,
    description: page.metadataDescription,
    images: ['/assets/paulo-pierrondi-executive-neural.jpg'],
  },
}

export default function AboutEnPage() {
  return (
    <>
      <JsonLd data={authorityProfileJsonLd('en')} />
      <AboutAuthorityExperience lang="en" />
    </>
  )
}
