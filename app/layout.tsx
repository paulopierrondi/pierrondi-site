import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import KimiSwarmEffects from '@/components/KimiSwarmEffects'
import LanguageSwitcher from '@/components/LanguageSwitcher'
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
    default: 'Paulo Pierrondi - AI Operating Model, ServiceNow, AgentOps e Enterprise AI',
    template: '%s | pierrondi.dev',
  },
  description:
    'ServiceNow TAE / Enterprise Architect transformando IA enterprise em AI Operating Model: AgentOps, adoption velocity, AI control towers e execução governada.',
  keywords: [
    'Paulo Pierrondi',
    'ServiceNow',
    'Enterprise AI Operator',
    'AI Operating Model',
    'adoption velocity',
    'revenue expansion',
    'IA governada',
    'SADA ServiceNow',
    'ServiceNow AI-Driven Architecture',
    'AI Delivery Acceleration',
    'Delivery Acceleration AI Specialist',
    'Forward Deployed Engineering',
    'Applied AI Architect',
    'AI Control Tower',
    'Action Fabric',
    'Now Assist',
    'AI Agents',
    'AgentOps',
    'LLM inference',
    'LLMOps',
    'Workflow Data Fabric',
    'Service Graph',
    'CSDM',
    'CMDB',
    'enterprise AI governance',
    'enterprise workflows',
    'workflow automation',
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
    title: 'Paulo Pierrondi - AI Operating Model, ServiceNow e AgentOps',
    description:
      'ServiceNow TAE / Enterprise Architect transformando IA enterprise em modelo operacional, adoption velocity e execução governada.',
    url: '/',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - AI Operating Model e AgentOps',
    description: 'ServiceNow, AgentOps, AI Operating Model, adoption velocity e implementação governada em ambientes enterprise.',
    images: ['/og'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
        <KimiSwarmEffects />
        <LanguageSwitcher />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
