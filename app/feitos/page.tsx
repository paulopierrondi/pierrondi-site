import type { Metadata } from 'next'
import FeitosIndexContent from './FeitosIndexContent'

export const metadata: Metadata = {
  title: 'Feitos — sistemas enterprise de IA governada',
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
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi — Feitos' }],
  },
}

export default function FeitosIndexPage() {
  return <FeitosIndexContent lang="pt" />
}
