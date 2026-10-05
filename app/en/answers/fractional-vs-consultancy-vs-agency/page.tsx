import type { Metadata } from 'next'

import AnswerBrief from '@/app/answers/_components/AnswerBrief'

const path = '/en/answers/fractional-vs-consultancy-vs-agency'
const ptPath = '/answers/fractional-vs-consultoria-vs-agencia'

export const metadata: Metadata = {
  title: 'Fractional, consultancy, agency or internal?',
  description:
    'Compares Fractional AI Automation Officer, consultancy, an automation agency and an internal hire: ownership after go-live, measurement and risk. No price.',
  keywords: [
    'Fractional AI Automation Officer',
    'traditional consultancy',
    'automation agency',
    'internal hire',
    'handoff',
    'baseline',
    'operational AI',
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
    title: 'Fractional, consultancy, agency or internal?',
    description:
      'Four paths for AI automation in production: who owns the system, how to measure, and which risks. No price, client or ROI.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'pierrondi.dev answer brief — fractional, consultancy, agency or internal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional, consultancy, agency or internal?',
    description: 'Ownership after go-live, measurement and risk — no price and no invented ROI.',
    images: ['/og'],
  },
}

export default function FractionalVsConsultancyVsAgencyAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      inLanguage="en"
      eyebrow="ANSWER BRIEF — COMPARISON"
      question="Fractional, consultancy, agency or internal?"
      directAnswer="For a mid-size operations team that needs AI automations in production, the four common paths are a Fractional AI Automation Officer, traditional consultancy, an automation agency and an internal hire. The difference that matters is structural: who owns the system after go-live, how the result is measured (baseline, metric and handoff) and which risk the team takes on. This page describes the shape of each path. It does not publish a price, a client, a logo or an ROI."
      sections={[
        {
          heading: 'Who owns the system after go-live',
          bullets: [
            'Fractional AI Automation Officer: the format of this portfolio installs the automation and delivers the handoff. The operational owner after go-live is the client’s team — registry, evidence and what the team inherits. The offer is not a product that stays locked to the vendor.',
            'Traditional consultancy: the usual format delivers a diagnosis and a recommendation, and sometimes a pilot. The production system stays with the client only when implementation and transfer are in scope. Without that, the artifact that remains is the report.',
            'Automation agency: the usual format builds flows and integrations. The system stays with the client only if access, code, exceptions and the runbook are transferred. If operations stay at the agency, go-live did not transfer ownership.',
            'Internal hire: the person can be the permanent owner from the start. The system is born inside the company. That requires the role to cover operations, not only experiments, and the method not to live only in one person’s head.',
          ],
        },
        {
          heading: 'How the result is measured',
          bullets: [
            'All four paths can use the same honest chain: a baseline of the real work, an observable metric before scaling, and a handoff with evidence. Without a baseline, the later number has nothing to compare against.',
            'Fractional: baseline, system, metric and handoff are the shape of the offer. The metric enters when the source is already observable. The evidence is AgentOps: what ran, who approved it and what the team inherits.',
            'Consultancy: measurement usually starts in the diagnosis. The risk is that the metric stops on a slide if nobody operates the system after the project.',
            'Agency: measurement usually starts at delivery, when the flow is live. The risk is counting a published automation instead of the work that changed.',
            'Internal hire: the person can measure on the real work, but only if the company already has a baseline and an owner for the metric. The role does not create the measure by itself.',
          ],
        },
        {
          heading: 'Typical engagement shape',
          bullets: [
            'Fractional: a continuous engagement, with human gates on what is irreversible. It is not a package of loose hours, and there is no sprint published on this site.',
            'Consultancy: a project with a start and an end — discovery, recommendation and, when contracted, implementation. Close-out is the point at which operations need an internal owner.',
            'Agency: a project or a retainer to build and maintain flows. The format tends to optimize delivery of the automation, not the team’s operating model.',
            'Internal hire: an employment relationship. It is permanent capacity, with a ramp, management and the coverage risk when the person leaves.',
          ],
        },
        {
          heading: 'Risks of each path',
          paragraphs: [
            'No path is better by definition. The risk changes with what the team needs to operate after go-live. This page does not claim what a specific consultancy or agency does: it describes the usual shape of each category and what to ask before hiring.',
          ],
          bullets: [
            'Fractional: temporary dependence on an external operator until the handoff is complete. If the scope becomes hours without evidence, the format dissolves. The offer is personal and independent: it does not represent ServiceNow, and it does not change the site’s public jobTitle, which remains Technical Account Executive.',
            'Consultancy: a recommendation without an operable system, and knowledge that leaves with the project team.',
            'Agency: automation that only the vendor knows how to maintain, and a volume of flows in place of a result on the work.',
            'Internal hire: time until the person produces, single-person risk, and the need for the method (baseline, metric, evidence) to already exist in the company.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Does this comparison cite a price, a client or an ROI?',
          answer:
            'No. There is no price band, named client, logo or ROI. Public proof stays on /feitos, with the slice already published. This page describes formats; it does not invent a result.',
        },
        {
          question: 'Is fractional always the best of the four paths?',
          answer:
            'No. It is the format of this portfolio when the team wants a continuous external operator who installs the system and delivers the handoff. Consultancy fits when the problem is still a diagnosis. An agency fits when the bottleneck is building flows that are already specified. An internal hire fits when the company wants a permanent owner and accepts the ramp. The choice depends on who should operate after go-live.',
        },
        {
          question: 'Where is the commercial path, and how do you measure?',
          answer:
            'The commercial path is the engagement page. The definition of the term is on the Fractional brief. The baseline, metric and evidence chain is on the measurement brief. There is no sprint published in this answer, and there is no Product schema.',
        },
      ]}
      internalLinks={[
        {
          href: '/en/engajamento',
          label: 'Engagement',
          description: 'The continuous offer: baseline, system, metric and handoff.',
        },
        {
          href: '/answers/o-que-e-fractional-ai-automation-officer',
          label: 'What is a Fractional AI Automation Officer?',
          description: 'Citable definition of the offer — Portuguese only, no English twin yet.',
        },
        {
          href: '/answers/como-medir-resultado-de-ia-operacional',
          label: 'How to measure operational AI results',
          description: 'Honest framework: baseline → metric → evidence / AgentOps. Portuguese only.',
        },
        {
          href: '/en/feitos',
          label: 'Proof',
          description: 'Public proof already published — no new metric on this page.',
        },
        {
          href: '/en/contato',
          label: 'Contact / WhatsApp',
          description: 'Talk with context, or start on the site WhatsApp.',
        },
        {
          href: ptPath,
          label: 'Portuguese original',
          description: 'The pt-BR brief this page mirrors.',
        },
      ]}
      datePublished="2026-10-05"
      dateModified="2026-10-05"
    />
  )
}
