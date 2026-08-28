import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import FeitosIndexContent from '@/app/feitos/FeitosIndexContent'
import { buildFeitosSchema } from '@/app/feitos/feitos-schema'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi — profile, work, and execution proof',
  description: 'Public dossier with Paulo Pierrondi’s automation and AI work, anonymized cases, aggregate results, and paid-AI delivery architecture.',
  alternates: {
    canonical: '/en/feitos',
    languages: {
      'pt-BR': '/feitos',
      'en-US': '/en/feitos',
      'x-default': '/feitos',
    },
  },
  openGraph: {
    title: 'Profile, work, and execution proof | Paulo Pierrondi',
    description: 'Anonymized cases, public products, and architecture for payment, AI, and automated delivery.',
    url: '/en/feitos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi — Work Index' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile, work, and execution proof | Paulo Pierrondi',
    description: 'Automation, AI, public products, anonymized cases, and delivery architecture.',
    images: ['/og'],
  },
}

export default function FeitosEnPage() {
  return (
    <>
      <JsonLd data={buildFeitosSchema('en')} />
      <FeitosIndexContent lang="en" />
    </>
  )
}
