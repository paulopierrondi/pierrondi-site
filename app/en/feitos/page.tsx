import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import FeitosIndexContent from '@/app/feitos/FeitosIndexContent'

export const metadata: Metadata = {
  title: 'Work Index',
  description: 'Applied enterprise systems by Paulo Pierrondi: SADA, Governed Agents, LLM Inference and AI Execution Platforms.',
  alternates: {
    canonical: '/en/feitos',
    languages: {
      'pt-BR': '/feitos',
      'en-US': '/en/feitos',
      'x-default': '/feitos',
    },
  },
  openGraph: {
    title: 'Work Index | pierrondi.dev',
    description: 'Not a portfolio. These are systems that become executive conversation, demo and execution.',
    url: '/en/feitos',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
  },
}

export default function FeitosEnPage() {
  return (
    <>
      <PageHeader
        eyebrow="WORK INDEX"
        title={<>Not a portfolio. <span className="text-primary">These are systems.</span></>}
        lead="Applied enterprise systems without client names or confidential metrics. What matters is architecture, governance and evidence trail."
        chips={['SADA', 'AgentOps', 'LLMOps', 'Execution OS']}
      />
      <FeitosIndexContent lang="en" />
    </>
  )
}
