import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import FeitosIndexContent from './FeitosIndexContent'
import { buildFeitosSchema } from './feitos-schema'

export const metadata: Metadata = {
  title: 'Paulo Pierrondi — dados, trabalhos e provas de execução',
  description: 'Dossiê público de Paulo Pierrondi: automação, IA, produtos, cases anonimizados, resultados agregados e arquitetura de pagamento até entrega automática.',
  alternates: {
    canonical: '/feitos',
    languages: {
      'pt-BR': '/feitos',
      'en-US': '/en/feitos',
      'x-default': '/feitos',
    },
  },
  openGraph: {
    title: 'Dados, trabalhos e provas de execução | Paulo Pierrondi',
    description: 'Cases anonimizados, produtos públicos e arquitetura real para automação, pagamentos, IA e entrega automática.',
    url: '/feitos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi — Feitos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dados, trabalhos e provas de execução | Paulo Pierrondi',
    description: 'Automação, IA, produtos públicos, cases anonimizados e arquitetura de entrega.',
    images: ['/og'],
  },
}

export default function FeitosIndexPage() {
  return (
    <>
      <JsonLd data={buildFeitosSchema('pt')} />
      <FeitosIndexContent lang="pt" />
    </>
  )
}
