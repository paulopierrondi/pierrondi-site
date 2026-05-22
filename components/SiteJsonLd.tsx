'use client'

import { usePathname } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'

const siteSchema = [
  {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#organization`,
    '@type': ['Organization', 'LocalBusiness'],
    name: 'pierrondi.dev',
    url: SITE_URL,
    logo: `${SITE_URL}/pierrondi-logo-1024.png`,
    image: `${SITE_URL}/og`,
    description:
      'Landing pages de conversão, automações, agentes e produtos digitais com IA aplicada entregues com operação enxuta e direção técnica direta.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'SP',
      addressLocality: 'São Paulo',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Portuguese'],
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ofertas pierrondi.dev',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automação de Processos',
            description: 'Fluxos com n8n, Make, APIs e IA para reduzir trabalho manual.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Produto Digital (MVP)',
            description: 'App web, micro SaaS ou ferramenta interna do briefing ao deploy.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tech Partner',
            description: 'Liderança técnica fracionada para guiar stack, execução e roadmap.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'App Store Connect / ASO',
            description:
              'Configuração de metadata, screenshots, privacidade e ASO básico para apps iOS prontos.',
          },
        },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#website`,
    '@type': 'WebSite',
    name: 'pierrondi.dev',
    url: SITE_URL,
    inLanguage: ['pt-BR', 'en-US'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function SiteJsonLd() {
  const pathname = usePathname()

  if (pathname?.startsWith('/bradesco-26')) {
    return null
  }

  return <JsonLd data={siteSchema} />
}
