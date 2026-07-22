import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import AtuacaoContent from '@/app/atuacao/AtuacaoContent'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Where Paulo Pierrondi creates value: AI Operating Model, ServiceNow, AgentOps, and enterprise strategy.',
  alternates: {
    canonical: '/en/atuacao',
    languages: {
      'pt-BR': '/atuacao',
      'en-US': '/en/atuacao',
      'x-default': '/atuacao',
    },
  },
  openGraph: {
    title: 'Work | pierrondi.dev',
    description: 'AI Operating Model, ServiceNow and AgentOps for regulated enterprise environments.',
    url: '/en/atuacao',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi enterprise AI work' }],
  },
}

export default function AtuacaoEnPage() {
  return (
    <>
      <PageHeader
        eyebrow="WORK"
        title={<>Where I <span className="text-primary">create value.</span></>}
        lead="Four pillars for taking enterprise AI from intent to governed execution — no pricing, no packages, no agency speak."
        chips={['AI Operating Model', 'ServiceNow', 'AgentOps', 'Strategy']}
      />
      <AtuacaoContent lang="en" />
    </>
  )
}
