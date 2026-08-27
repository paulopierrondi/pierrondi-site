import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import SprintContent from './SprintContent'

export const metadata: Metadata = {
  title: 'Uma automação no ar — oferta fixa em 7 dias',
  description:
    'Um processo manual vira fluxo no ar em 7 dias após kickoff. R$ 2.400 ou US$ 450 via Wise, escopo fechado, aceite testável e handoff documentado.',
  alternates: {
    canonical: '/sprint',
  },
  openGraph: {
    title: 'Uma automação no ar | pierrondi.dev',
    description:
      'Oferta fixa: um fluxo no ar em 7 dias, aceite escrito, happy path + falha, handoff e revisão. R$ 2.400 pré-pago.',
    url: '/sprint',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Uma automação no ar — Paulo Pierrondi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uma automação no ar — oferta fixa em 7 dias',
    description: 'Processo manual → fluxo no ar em 7 dias. R$ 2.400, aceite testável, sem hora avulsa.',
    images: ['/og'],
  },
}

export default function SprintPage() {
  return (
    <>
      <PageHeader
        eyebrow="SPRINT · OFERTA DIRETA"
        title={
          <>
            Uma automação <span className="text-primary">no ar</span> em 7 dias.
          </>
        }
        lead="Escopo fechado, preço fixo, aceite testável. Para quem já sabe qual processo manual precisa sair do caminho — sem discovery call."
        chips={['R$ 2.400', 'Kickoff out/2026', '1 fluxo', 'Aceite escrito']}
      />
      <SprintContent />
    </>
  )
}
