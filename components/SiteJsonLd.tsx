'use client'

import { usePathname } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'

const siteSchema = [
  {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#person`,
    '@type': 'Person',
    name: 'Paulo Pierrondi',
    url: SITE_URL,
    image: `${SITE_URL}/og`,
    description:
      'Technical Account Executive na ServiceNow, com foco em IA governada, plataforma, dados e workflows corporativos.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'SP',
      addressLocality: 'São Paulo',
    },
    affiliation: {
      '@type': 'Organization',
      name: 'ServiceNow',
      url: 'https://www.servicenow.com/',
    },
    sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
  },
  {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#website`,
    '@type': 'WebSite',
    name: 'pierrondi.dev',
    url: SITE_URL,
    inLanguage: ['pt-BR'],
    publisher: { '@id': `${SITE_URL}/#person` },
  },
]

export default function SiteJsonLd() {
  const pathname = usePathname()

  if (pathname?.startsWith('/bradesco-26')) {
    return null
  }

  return <JsonLd data={siteSchema} />
}
