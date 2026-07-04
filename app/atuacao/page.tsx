import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import AtuacaoContent from './AtuacaoContent'

export const metadata: Metadata = {
  title: 'Atuação',
  description: 'Onde Paulo Pierrondi gera valor: AI Operating Model, ServiceNow, AgentOps e estratégia enterprise.',
  alternates: {
    canonical: '/atuacao',
    languages: {
      'pt-BR': '/atuacao',
      'en-US': '/en/atuacao',
      'x-default': '/atuacao',
    },
  },
  openGraph: {
    title: 'Atuação | pierrondi.dev',
    description: 'AI Operating Model, ServiceNow e AgentOps para ambientes enterprise regulados.',
    url: '/atuacao',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function AtuacaoPage() {
  return (
    <>
      <PageHeader
        eyebrow="ATUAÇÃO"
        title={<>Onde eu <span className="text-primary">gero valor.</span></>}
        lead="Quatro pilares de atuação para levar IA enterprise de intenção a execução governada — sem preços, sem pacotes, sem linguagem de agência."
        chips={['AI Operating Model', 'ServiceNow', 'AgentOps', 'Estratégia']}
      />
      <AtuacaoContent lang="pt" />
    </>
  )
}
