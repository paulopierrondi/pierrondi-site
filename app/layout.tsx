import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import SiteJsonLd from '@/components/SiteJsonLd'
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
        <SiteJsonLd />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
