import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Problem from '@/components/Problem'
import About from '@/components/About'
import Metrics from '@/components/Metrics'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import MobileCTA from '@/components/MobileCTA'
import LangSync from '@/components/LangSync'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'pierrondi.dev — applied AI, automation and digital products that sell',
  description:
    'pierrondi.dev ships conversion landing pages, n8n automations, AI agents and digital products for SMBs, creators and early-stage startups. Technical founder, real Git-backed proof, fast delivery.',
  keywords: [
    'applied AI',
    'n8n automation',
    'fractional CTO',
    'digital product MVP',
    'tech partner',
    'conversion landing page',
    'AI agent for business',
    'marketing OS',
    'pierrondi.dev',
  ],
  alternates: {
    canonical: '/en',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'pierrondi.dev — applied AI, automation and pages that help you sell',
    description:
      'Landing pages, automation, agents and digital products with real technical direction, sharp commercial narrative and proof of execution.',
    url: '/en',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev — Tech that sells and ships.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pierrondi.dev — applied AI and automation for SMBs',
    description: 'Applied AI, automation and digital products for SMBs and early-stage startups.',
    images: ['/og'],
  },
}

const enWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en`,
  url: `${SITE_URL}/en`,
  name: 'pierrondi.dev — applied AI, automation and digital products',
  description:
    'pierrondi.dev ships conversion landing pages, n8n automations, AI agents and digital products for SMBs, creators and early-stage startups.',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
}

export default function HomeEn() {
  return (
    <>
      <LangSync lang="en" />
      <JsonLd data={enWebPageSchema} />
      <Nav lang="en" />
      <main>
        <Hero lang="en" />
        <Marquee lang="en" />
        <Problem lang="en" />
        <About lang="en" />
        <Metrics lang="en" />
        <Portfolio lang="en" />
        <Services lang="en" />
        <Process lang="en" />
        <Contact lang="en" />
      </main>
      <Footer lang="en" />
      <WhatsApp lang="en" />
      <MobileCTA lang="en" />
    </>
  )
}
