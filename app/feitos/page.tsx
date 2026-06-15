import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import FeitosIndexContent from './FeitosIndexContent'

export const metadata: Metadata = {
  title: 'Feitos',
  description: 'Sistemas enterprise aplicados por Paulo Pierrondi: SADA, Agentes Governados, LLM Inference e AI Execution Platforms.',
  alternates: {
    canonical: '/feitos',
    languages: {
      'pt-BR': '/feitos',
      'en-US': '/en/feitos',
      'x-default': '/feitos',
    },
  },
  openGraph: {
    title: 'Feitos | pierrondi.dev',
    description: 'Não é portfólio. São sistemas que viram conversa executiva, demo e execução.',
    url: '/feitos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function FeitosIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="FEITOS"
        title={<>Não é portfólio. <span className="text-primary">São sistemas.</span></>}
        lead="Sistemas enterprise aplicados sem nomes de clientes e sem métricas confidenciais. O que importa é a arquitetura, a governança e a trilha de evidência."
        chips={['SADA', 'AgentOps', 'LLMOps', 'Execution OS']}
      />
      <FeitosIndexContent lang="pt" />
    </>
  )
}
