import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SiteJsonLdWrapper from '@/components/SiteJsonLdWrapper'
import DocumentLangSync from '@/components/DocumentLangSync'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import HomeBackground from '@/components/HomeBackground'
import { SITE_URL } from '@/lib/site'
import './globals.css'
import './animations.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const CookieBanner = dynamic(() => import('@/components/CookieBanner'))

export const metadata: Metadata = {
  title: {
    default: 'Paulo Pierrondi — Onde IA vira operação com evidência',
    template: '%s | pierrondi.dev',
  },
  description:
    'Sistema operacional da IA: operating model, AgentOps, governança e trilha de evidência. Enterprise FSI na ServiceNow e sistemas públicos construídos e publicados.',
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
    title: 'Paulo Pierrondi — Onde IA vira operação com evidência',
    description:
      'Operating model de IA, AgentOps e sistemas com trilha de evidência — enterprise FSI na ServiceNow e produtos públicos.',
    url: '/',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    // No static title here: Next derives twitter:title per route from each
    // page's resolved title, so product/portfolio shares get page-specific
    // cards instead of leaking the homepage's generic enterprise title.
    card: 'summary_large_image',
    description: 'Sistemas multi-agente, AgentOps, automação, apps e frameworks — com liderança de contas enterprise na ServiceNow.',
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
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
      <body className={`${body.className} antialiased`}>
        <DocumentLangSync />
        <SiteJsonLdWrapper />
        <HomeBackground />
        <SiteNav />
        <LanguageSwitcher />
        <GoogleAnalytics measurementId={googleAnalyticsMeasurementId} />
        {children}
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  )
}
