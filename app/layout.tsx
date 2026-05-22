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
    default: 'Paulo Pierrondi - ServiceNow, IA governada e enterprise workflows',
    template: '%s | pierrondi.dev',
  },
  description:
    'Site pessoal de Paulo Pierrondi, Technical Account Executive na ServiceNow, sobre IA governada, plataforma, dados e workflows corporativos.',
  keywords: [
    'Paulo Pierrondi',
    'ServiceNow',
    'IA governada',
    'AI Control Tower',
    'Now Assist',
    'Workflow Data Fabric',
    'Service Graph',
    'CSDM',
    'enterprise workflows',
    'pierrondi.dev',
  ],
  authors: [{ name: 'Paulo Pierrondi', url: SITE_URL }],
  creator: 'Paulo Pierrondi',
  publisher: 'Paulo Pierrondi',
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
    title: 'Paulo Pierrondi - ServiceNow, IA governada e enterprise workflows',
    description:
      'Site pessoal sobre ServiceNow, IA governada, dados, contexto e execucao corporativa.',
    url: '/',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - ServiceNow e IA governada',
    description: 'Site pessoal sobre ServiceNow, IA governada e workflows corporativos.',
    images: ['/og'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'x-default': '/',
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
