import type { Metadata } from 'next'
import FeitosIndexContent from '@/app/feitos/FeitosIndexContent'

export const metadata: Metadata = {
  title: 'Work Index',
  description: 'Applied work and systems by Paulo Pierrondi: Pierrondi Studio, SADA, Governed Agents, LLM Inference, and AI Execution Platforms.',
  alternates: {
    canonical: '/en/feitos',
    languages: {
      'pt-BR': '/feitos',
      'en-US': '/en/feitos',
      'x-default': '/feitos',
    },
  },
  openGraph: {
    title: 'Work Index | pierrondi.dev',
    description: 'Projects and systems connecting strategy, brand, architecture, automation, and execution.',
    url: '/en/feitos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi — Work Index' }],
  },
}

export default function FeitosEnPage() {
  return <FeitosIndexContent lang="en" />
}
