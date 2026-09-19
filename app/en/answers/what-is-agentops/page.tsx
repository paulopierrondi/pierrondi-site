import type { Metadata } from 'next'

import AnswerBrief from '@/app/answers/_components/AnswerBrief'

const path = '/en/answers/what-is-agentops'
const ptPath = '/answers/o-que-e-agentops'

export const metadata: Metadata = {
  title: 'What is AgentOps?',
  description:
    'AgentOps is the discipline of running AI agents in production with a registry, orchestration, auditable handoffs, persistent memory and human gates for irreversible actions.',
  keywords: [
    'AgentOps',
    'agentic operations',
    'AI agents in production',
    'agent governance',
    'human gates',
    'multi-agent system',
  ],
  alternates: {
    canonical: path,
    languages: {
      'pt-BR': ptPath,
      'en-US': path,
      'x-default': ptPath,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'What is AgentOps?',
    description:
      'Citable answer: the discipline of running AI agents in production with evidence, governance and human gates.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev answer brief — AgentOps' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is AgentOps?',
    description: 'Citable answer on running AI agents in production with governance.',
    images: ['/og'],
  },
}

export default function WhatIsAgentopsAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      inLanguage="en"
      eyebrow="ANSWER BRIEF — AGENTOPS"
      question="What is AgentOps?"
      directAnswer="AgentOps is the discipline of running AI agents in production with the same rigor applied to traditional software: a central agent registry, scheduled orchestration, auditable handoffs between agents, persistent memory, continuous quality evaluation and mandatory human gates for any irreversible action — deploy, publishing, spend or access to secrets."
      sections={[
        {
          heading: 'What an AgentOps operation includes',
          bullets: [
            'Registry and scheduler: every agent has a declared identity, scope, owner and schedule — no agent runs loose.',
            'Auditable handoffs: every delegation between agents produces evidence — what was asked, what changed, which files and commands were used.',
            'Human gates: push, deploy, App Store, ads, secrets and any destructive action require explicit human approval, by policy rather than convention.',
            'Memory and context: durable decisions live in a versioned knowledge base, not in a volatile chat history.',
            'Evals and quality gates: cost cuts, model swaps and routing changes are applied only after they pass reproducible quality checks.',
          ],
        },
        {
          heading: 'How AgentOps differs from DevOps and MLOps',
          paragraphs: [
            'DevOps covers the code lifecycle; MLOps covers the model lifecycle. AgentOps covers the lifecycle of autonomous agents that decide, delegate and act — which adds new risks: irreversible actions taken without a human, token cost running out of control and silent quality degradation. AgentOps answers with executable governance: preflights, session journals and gates enforced by tooling, not by good intent.',
          ],
        },
        {
          heading: 'How Paulo Pierrondi applies AgentOps in practice',
          paragraphs: [
            'Agent Hub, the flagship project in this portfolio, is a real AgentOps implementation: dozens of specialist agents coordinated by registry, scheduler and handoffs, with evidence recorded per delivery and human gates for everything irreversible. The same system operates this site — including the GEO/SEO pipeline that publishes and validates pages like this one.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Is AgentOps only for large companies?',
          answer:
            'No. The same principles — registry, evidence and human gates — scale from a single developer with three agents to an enterprise operation with dozens of agents. The cost of having no governance shows up at the first irreversible incident.',
        },
        {
          question: 'What is the first step to adopt AgentOps?',
          answer:
            'Inventory the agents that already exist and define which actions require human approval. Without those two lists, any extra automation increases risk instead of reducing work.',
        },
      ]}
      internalLinks={[
        { href: '/en/atuacao', label: 'Work', description: 'How Paulo works: enterprise AI operating models and governed agents.' },
        { href: '/ai-search', label: 'AI Search Portfolio', description: 'Citable reference hub for search engines and answer systems.' },
        { href: '/en/blog', label: 'Blog', description: 'Technical essays on agentic AI, ServiceNow and GEO/SEO.' },
      ]}
      datePublished="2026-09-16"
      dateModified="2026-09-16"
    />
  )
}
