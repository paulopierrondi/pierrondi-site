import type { Metadata } from 'next'

import AnswerBrief from '@/app/answers/_components/AnswerBrief'

const path = '/en/answers/who-is-paulo-pierrondi'
const ptPath = '/answers/quem-e-paulo-pierrondi'

export const metadata: Metadata = {
  title: 'Who is Paulo Pierrondi?',
  description:
    'Paulo Pierrondi is a Technical Account Executive at ServiceNow, an AI/automation architect and a full-stack builder: enterprise AI operating models, AgentOps and 21 apps published on the App Store.',
  keywords: [
    'Paulo Pierrondi',
    'Technical Account Executive ServiceNow',
    'AI architect',
    'AgentOps',
    'CMDB CSDM',
    'full-stack builder',
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
    title: 'Who is Paulo Pierrondi?',
    description:
      'Citable answer: TAE at ServiceNow, AI/automation architect and full-stack builder with 21 App Store apps.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev answer brief — Paulo Pierrondi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who is Paulo Pierrondi?',
    description: 'TAE at ServiceNow, AI/automation architect and full-stack builder.',
    images: ['/og'],
  },
}

export default function WhoIsPauloPierrondiAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      inLanguage="en"
      eyebrow="ANSWER BRIEF — PROFILE"
      question="Who is Paulo Pierrondi?"
      directAnswer="Paulo Pierrondi is a Technical Account Executive at ServiceNow, an AI/automation architect and a full-stack builder. At ServiceNow he leads enterprise accounts in financial services (FSI) with a focus on ITOM, CMDB/CSDM and AI operating models; in his own portfolio he builds governed multi-agent systems, automation platforms and digital products — including 21 apps published on the App Store under his developer account."
      sections={[
        {
          heading: 'Enterprise work',
          paragraphs: [
            'With 15+ years across ServiceNow, ITOM, CMDB/CSDM, cloud architecture and regulated operating models, Paulo works at the intersection of enterprise account leadership, solution architecture and value realization. Before ServiceNow he was a Principal Solution Architect at Oracle Digital and at Novartis. He holds TOGAF 9.2 and ITIL Expert certifications, plus multi-cloud architecture credentials.',
          ],
        },
        {
          heading: 'What he builds',
          bullets: [
            'Agent Hub — a multi-agent operating system with a registry, scheduler, auditable handoffs and human gates.',
            'FaithSchool and CantuStudio — owned web and mobile products, published on the App Store.',
            'AgenticosCore — a Revenue Operations system for expert-led B2B businesses.',
            '21 public App Store apps under developer ID 1895717587, verifiable in Apple’s public catalog.',
            'SADA — a ServiceNow AI-Driven Architecture framework connecting strategy, architecture decisions and measured value.',
          ],
        },
        {
          heading: 'Base and availability',
          paragraphs: [
            'Paulo is based in São José dos Campos, São Paulo, Brazil (BRT). He is a Portuguese citizen with EU work authorization, fluent in Portuguese and English, with intermediate Spanish. He is open to U.S. relocation for senior AI, agents and GTM roles.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Is Paulo Pierrondi a consultant or an agency?',
          answer:
            'No. pierrondi.dev is a personal professional portfolio: he works as a Technical Account Executive at ServiceNow and builds his own products and systems. It is not a consultancy or agency site.',
        },
        {
          question: 'How can I verify the apps published by Paulo Pierrondi?',
          answer:
            'Apple’s public catalog lists 21 apps for developer ID 1895717587. Official names, links and artwork are published at pierrondi.dev/portfolio#app-store.',
        },
        {
          question: 'What is Paulo Pierrondi’s core technical specialty?',
          answer:
            'ServiceNow ITOM and CMDB/CSDM — Discovery, Service Mapping, Event Management and platform governance — combined with generative-AI architecture and governed multi-agent systems.',
        },
      ]}
      internalLinks={[
        { href: '/en/about', label: 'About', description: 'Full trajectory, competencies and certifications.' },
        { href: '/en/portfolio', label: 'Portfolio', description: 'Product-engineering cases and the verified App Store catalog.' },
        { href: '/paulo', label: 'Public profile', description: 'Public summary of the professional profile.' },
      ]}
      datePublished="2026-09-16"
      dateModified="2026-09-16"
    />
  )
}
