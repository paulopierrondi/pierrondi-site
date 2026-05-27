import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import PauloPortfolioExperience from './PauloPortfolioExperience'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Paulo Pierrondi - Portfólio executivo de IA, ServiceNow e Agent OS',
  description:
    'Portfólio executivo de Paulo Pierrondi: ServiceNow, IA governada, treinamento e inferência de LLMs, sistemas operacionais de agentes, produto digital e execução enterprise.',
  keywords: [
    'Paulo Pierrondi',
    'portfolio executivo IA',
    'ServiceNow',
    'LLM inference',
    'LLM training',
    'AI agents',
    'Agent OS',
    'CSDM',
    'Now Assist',
    'enterprise AI governance',
  ],
  alternates: {
    canonical: '/paulo',
  },
  openGraph: {
    title: 'Paulo Pierrondi - AI Operating Systems for enterprise execution',
    description:
      'A bilingual executive portfolio on ServiceNow, LLM inference, agent governance and product execution.',
    url: '/paulo',
    siteName: 'pierrondi.dev',
    type: 'profile',
    locale: 'pt_BR',
    images: [
      {
        url: '/assets/paulo-pierrondi-executive-neural.jpg',
        width: 900,
        height: 900,
        alt: 'Paulo Pierrondi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - AI, ServiceNow and Agent OS',
    description:
      'Executive portfolio on ServiceNow, governed AI, LLM inference and agent operating systems.',
    images: ['/assets/paulo-pierrondi-executive-neural.jpg'],
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Paulo Pierrondi',
  url: `${SITE_URL}/paulo`,
  image: `${SITE_URL}/assets/paulo-pierrondi-executive-neural.jpg`,
  jobTitle: 'Technical Account Executive, AI Operator and Agent OS Builder',
  knowsAbout: [
    'ServiceNow',
    'Enterprise AI governance',
    'LLM inference',
    'LLM training and evaluation',
    'Agent operating systems',
    'CSDM',
    'Now Assist',
    'Product execution',
  ],
  sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
}

export default function PauloPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <Nav />
      <main>
        <PauloPortfolioExperience />
      </main>
      <Footer />
    </>
  )
}
