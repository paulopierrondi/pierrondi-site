import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import TreinamentosContent from './TreinamentosContent'
import { TREINAMENTOS_COPY } from './treinamentos-content'
import { buildTrainingSchema } from './training-schema'

export const metadata: Metadata = {
  title: 'Treinamentos',
  description:
    'Treinamentos e mentoria com Paulo Pierrondi em IA aplicada, LLM, Vibe Coding, ServiceNow e AgentOps — hands-on, com foco em valor e capacidade instalada.',
  alternates: {
    canonical: '/treinamentos',
    languages: {
      'pt-BR': '/treinamentos',
      'en-US': '/en/treinamentos',
      'x-default': '/treinamentos',
    },
  },
  openGraph: {
    title: 'Treinamentos | pierrondi.dev',
    description: 'IA aplicada, Vibe Coding, ServiceNow e AgentOps: treinamento hands-on que instala capacidade no time.',
    url: '/treinamentos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Treinamentos em IA, coding e ServiceNow com Paulo Pierrondi' }],
  },
}

export default function TreinamentosPage() {
  const copy = TREINAMENTOS_COPY.pt

  return (
    <>
      <JsonLd data={buildTrainingSchema('pt')} />
      <PageHeader
        eyebrow={copy.header.eyebrow}
        title={<>Eu treino times para <span className="text-primary">operar IA</span>, não para assistir demo.</>}
        lead={copy.header.lead}
        chips={copy.header.chips}
      />
      <TreinamentosContent lang="pt" />
    </>
  )
}
