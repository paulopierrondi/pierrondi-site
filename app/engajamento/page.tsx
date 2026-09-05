import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import EngajamentoContent from './EngajamentoContent'
import { buildEngajamentoSchema } from './engajamento-copy'

export const metadata: Metadata = {
  title: 'Fractional AI Automation Officer',
  description:
    'Engajamento contínuo para mid-market e ops que precisam de automação em produção: baseline, sistema, métrica e handoff — resultado mensurável, não horas soltas.',
  alternates: {
    canonical: '/engajamento',
    languages: {
      'pt-BR': '/engajamento',
      'en-US': '/en/engajamento',
      'x-default': '/engajamento',
    },
  },
  openGraph: {
    title: 'Fractional AI Automation Officer | pierrondi.dev',
    description:
      'Automações em produção com baseline, sistema, métrica e handoff — sem horas soltas e sem sprint publicado.',
    url: '/engajamento',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Fractional AI Automation Officer — engajamento em automações mensuráveis',
      },
    ],
  },
}

export default function EngajamentoPage() {
  return (
    <>
      <JsonLd data={buildEngajamentoSchema('pt')} />
      <PageHeader
        eyebrow="ENGAJAMENTO"
        title={<>Fractional AI Automation <span className="text-primary">Officer</span></>}
        lead="Engajamento contínuo para pôr automações em produção: resultado e métrica, não horas soltas. Baseline → sistema → métrica → handoff."
        chips={['AI Operating Model', 'AgentOps', 'Evidence trails', 'Handoff']}
      />
      <EngajamentoContent lang="pt" />
    </>
  )
}
