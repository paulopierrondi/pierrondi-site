import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import './globals.css'
import './animations.css'

const sans = GeistSans
const mono = GeistMono

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

const CookieBanner = dynamic(() => import('@/components/CookieBanner'))

export const metadata: Metadata = {
  title: {
    default: 'pierrondi.dev — IA aplicada, automação e produto digital para vender mais',
    template: '%s | pierrondi.dev',
  },
  description:
    'pierrondi.dev cria landing pages de conversão, automações com n8n, agentes de IA e produtos digitais para PMEs, infoprodutores e startups early-stage no Brasil. Founder técnico, entrega em até 4 semanas, código seu.',
  keywords: [
    'automação de processos com IA',
    'automação n8n brasil',
    'agência de IA aplicada',
    'desenvolvimento de MVP',
    'app store connect',
    'aso app store',
    'CTO fracionado',
    'tech partner brasil',
    'landing page de conversão',
    'agente de IA para empresas',
    'marketing OS',
    'pierrondi.dev',
  ],
  authors: [{ name: 'Paulo Pierrondi', url: `${SITE_URL}/sobre` }],
  creator: 'pierrondi.dev',
  publisher: 'pierrondi.dev',
  category: 'Technology',
  applicationName: 'pierrondi.dev',
  metadataBase: new URL(SITE_URL),
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'pierrondi.dev — IA aplicada, automação e páginas que ajudam a vender',
    description:
      'Landing page, automação, agentes e produto digital com direção técnica real, narrativa comercial forte e prova de execução.',
    url: '/',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev — Tech que vende e entrega.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pierrondi.dev — IA aplicada e automação para PMEs',
    description: 'IA aplicada, automação e produto digital para PMEs e startups early-stage no Brasil.',
    images: ['/og'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/pierrondi-logo-1024.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
    >
      <head>
        {plausibleDomain && (
          <>
            <Script
              strategy="afterInteractive"
              defer
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.tagged-events.outbound-links.js"
            />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
          </>
        )}
      </head>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <JsonLd
          data={[
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
              address: { '@type': 'PostalAddress', addressCountry: 'BR', addressRegion: 'SP', addressLocality: 'São Paulo' },
              contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['Portuguese'] },
              priceRange: 'R$0 - R$12.000',
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
                      offers: { '@type': 'AggregateOffer', lowPrice: 1500, highPrice: 3000, priceCurrency: 'BRL' },
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Produto Digital (MVP)',
                      description: 'App web, micro SaaS ou ferramenta interna do briefing ao deploy.',
                      offers: { '@type': 'AggregateOffer', lowPrice: 5000, highPrice: 12000, priceCurrency: 'BRL' },
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Tech Partner',
                      description: 'Liderança técnica fracionada para guiar stack, execução e roadmap.',
                      offers: { '@type': 'Offer', price: 2500, priceCurrency: 'BRL', unitText: 'MONTH' },
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'App Store Connect / ASO',
                      description: 'Configuração de metadata, screenshots, privacidade e ASO básico para apps iOS prontos.',
                      offers: { '@type': 'Offer', price: 0, priceCurrency: 'BRL' },
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
          ]}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
