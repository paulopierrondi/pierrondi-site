import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import EngajamentoContent from '@/app/engajamento/EngajamentoContent'
import { buildEngajamentoSchema } from '@/app/engajamento/engajamento-copy'

export const metadata: Metadata = {
  title: 'Fractional AI Automation Officer',
  description:
    'Ongoing engagement for mid-market and ops teams that need production automations: baseline, system, metric, and handoff — measurable outcomes, not loose hours.',
  alternates: {
    canonical: '/en/engajamento',
    languages: {
      'pt-BR': '/engajamento',
      'en-US': '/en/engajamento',
      'x-default': '/engajamento',
    },
  },
  openGraph: {
    title: 'Fractional AI Automation Officer | pierrondi.dev',
    description:
      'Production automations with baseline, system, metric, and handoff — not loose hours, and no published sprint offer.',
    url: '/en/engajamento',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Fractional AI Automation Officer — measurable automation engagement',
      },
    ],
  },
}

export default function EngajamentoEnPage() {
  return (
    <>
      <JsonLd data={buildEngajamentoSchema('en')} />
      <PageHeader
        eyebrow="ENGAGEMENT"
        title={<>Fractional AI Automation <span className="text-primary">Officer</span></>}
        lead="Ongoing engagement to put automations into production: outcomes and metrics, not loose hours. Baseline → system → metric → handoff."
        chips={['AI Operating Model', 'AgentOps', 'Evidence trails', 'Handoff']}
      />
      <EngajamentoContent lang="en" />
    </>
  )
}
