import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ContatoPageContent from '@/app/contato/ContatoPageContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Paulo Pierrondi to talk about enterprise AI, ServiceNow, AgentOps, and operating models.',
  alternates: {
    canonical: '/en/contato',
    languages: {
      'pt-BR': '/contato',
      'en-US': '/en/contato',
      'x-default': '/contato',
    },
  },
  openGraph: {
    title: 'Contact | pierrondi.dev',
    description: 'Let\'s talk about AI that becomes governed execution.',
    url: '/en/contato',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
  },
}

export default function ContatoEnPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title={<>Let&apos;s <span className="text-primary">start a good conversation.</span></>}
        lead="WhatsApp for a direct start, email for detailed context, and LinkedIn for a professional connection. No sales agenda — a good conversation is always welcome."
        chips={['Direct WhatsApp', 'Email for context', 'Technical + executive']}
      />
      <ContatoPageContent lang="en" />
    </>
  )
}
