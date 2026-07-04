import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ContatoPageContent from './ContatoPageContent'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Paulo Pierrondi para conversar sobre IA enterprise, ServiceNow, AgentOps e modelo operacional.',
  alternates: {
    canonical: '/contato',
    languages: {
      'pt-BR': '/contato',
      'en-US': '/en/contato',
      'x-default': '/contato',
    },
  },
  openGraph: {
    title: 'Contato | pierrondi.dev',
    description: 'Vamos conversar sobre IA que vira execução governada.',
    url: '/contato',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTATO"
        title={<>Vamos <span className="text-primary">trocar uma ideia.</span></>}
        lead="Sobre estratégia de IA, ServiceNow, agentes governados e modelo operacional. Sem agenda comercial — uma boa conversa é sempre bem-vinda."
        chips={['Resposta por email', 'Sem nomes de clientes', 'Contexto técnico + executivo']}
      />
      <ContatoPageContent lang="pt" />
    </>
  )
}
