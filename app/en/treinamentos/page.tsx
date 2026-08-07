import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import TreinamentosContent from '@/app/treinamentos/TreinamentosContent'
import { TREINAMENTOS_COPY } from '@/app/treinamentos/treinamentos-content'
import { buildTrainingSchema } from '@/app/treinamentos/training-schema'

export const metadata: Metadata = {
  title: 'Training',
  description:
    'Training and coaching with Paulo Pierrondi on applied AI, LLMs, Vibe Coding, ServiceNow and AgentOps — hands-on, focused on value and installed capability.',
  alternates: {
    canonical: '/en/treinamentos',
    languages: {
      'pt-BR': '/treinamentos',
      'en-US': '/en/treinamentos',
      'x-default': '/treinamentos',
    },
  },
  openGraph: {
    title: 'Training | pierrondi.dev',
    description: 'Applied AI, Vibe Coding, ServiceNow and AgentOps: hands-on training that installs capability in the team.',
    url: '/en/treinamentos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'AI, coding and ServiceNow training with Paulo Pierrondi' }],
  },
}

export default function TrainingEnPage() {
  const copy = TREINAMENTOS_COPY.en

  return (
    <>
      <JsonLd data={buildTrainingSchema('en')} />
      <PageHeader
        eyebrow={copy.header.eyebrow}
        title={<>I train teams to <span className="text-primary">operate AI</span>, not to watch demos.</>}
        lead={copy.header.lead}
        chips={copy.header.chips}
      />
      <TreinamentosContent lang="en" />
    </>
  )
}
