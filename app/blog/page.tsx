import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Ideias — IA enterprise, ServiceNow e AgentOps',
  description: 'Notas sobre IA enterprise, ServiceNow, AgentOps, modelo operacional e execução governada.',
  alternates: {
    canonical: '/blog',
    languages: {
      'pt-BR': '/blog',
      'en-US': '/en/blog',
      'x-default': '/blog',
    },
  },
  openGraph: {
    title: 'Ideias | pierrondi.dev',
    description: 'Notas sobre IA enterprise, ServiceNow, AgentOps e modelo operacional.',
    url: '/blog',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Ideias pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideias | pierrondi.dev',
    description: 'Notas sobre IA enterprise, ServiceNow, AgentOps e modelo operacional.',
    images: ['/og'],
  },
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="IDEIAS"
        title={<>Notas sobre <span className="text-primary">IA enterprise.</span></>}
        lead="Ensaios curtos sobre modelo operacional, governança de agentes, ServiceNow, arquitetura de valor e execução. Sem hype — só o que aprendi no campo."
      />
      <BlogContent lang="pt" />
    </>
  )
}
