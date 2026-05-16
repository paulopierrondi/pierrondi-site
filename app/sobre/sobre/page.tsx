import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import SobreContent from './SobreContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre a pierrondi.dev — quem opera e como entregamos',
  description:
    'pierrondi.dev é uma operação técnica founder-led: arquiteto de software com histórico enterprise, IA aplicada como alavanca, entrega de software, automações e produtos digitais com velocidade real.',
  keywords: ['pierrondi.dev', 'paulo pierrondi', 'fundador agência ia', 'arquiteto de software brasil'],
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre a pierrondi.dev',
    description:
      'Operação técnica founder-led com IA aplicada. Software, automação e produto digital entregues com velocidade real.',
    url: '/sobre',
    siteName: 'pierrondi.dev',
    type: 'profile',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Sobre a pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre a pierrondi.dev',
    description: 'Operação técnica founder-led com IA aplicada.',
    images: ['/og'],
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Paulo Pierrondi',
  url: `${SITE_URL}/sobre`,
  jobTitle: 'Founder, Arquiteto de Software',
  worksFor: {
    '@type': 'Organization',
    name: 'pierrondi.dev',
    url: SITE_URL,
  },
  knowsAbout: ['IA Aplicada', 'Automação', 'Next.js', 'TypeScript', 'n8n', 'Arquitetura de Software', 'Marketing OS'],
}

export default function SobrePage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <Nav />
      <main>
        <SobreContent />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
