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
      directAnswer="For a mid-size operations team that needs AI automations in production, the four common paths are a Fractional AI Automation Officer, traditional consultancy, an automation agency and an internal hire. The difference that matters is structural: who owns the system after go-live, how the result is measured (baseline, metric and handoff) and which risk the team takes on. The table compares those shapes on the same axes. This page does not publish a price, a client, a logo or an ROI."
      comparison={{
        heading: 'Comparison on the same axes',
        caption:
          'Usual shape of each category. It does not describe a specific firm, and it does not recommend a path without knowing who operates after go-live.',
        columns: ['Axis', 'Fractional', 'Consultancy', 'Agency', 'Internal'],
        rows: [
          {
            criterion: 'Owner after go-live',
            cells: [
              'The client’s team, after the handoff.',
              'The client, only if implementation and transfer are in scope.',
              'The client, only if access, code, exceptions and the runbook are transferred.',
              'The hired person, if the role covers operations.',
            ],
          },
          {
            criterion: 'Measurement',
            cells: [
              'Baseline, an observable metric and AgentOps evidence.',
              'Usually starts in the diagnosis and can stop on a slide.',
              'Usually starts when the flow is delivered.',
              'Exists only if the company already has a baseline and a metric owner.',
            ],
          },
          {
            criterion: 'Shape',
            cells: [
              'A continuous engagement, with gates on what is irreversible.',
              'A project with a start and an end.',
              'A project or retainer to build flows.',
              'Employment, with a ramp and management.',
            ],
          },
          {
            criterion: 'Main risk',
            cells: [
              'Dependence until the handoff is complete.',
              'A recommendation without an operable system.',
              'Automation only the vendor can maintain.',
              'A long ramp and a single person.',
            ],
          },
          {
            criterion: 'When it fits',
            cells: [
              'The team wants an external operator who installs and hands off.',
              'The problem is still a diagnosis.',
              'The flows are already specified and still need to be built.',
              'The company wants a permanent owner and accepts the ramp.',
            ],
          },
        ],
      }}
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
        {
          heading: 'How to decide before hiring',
          paragraphs: [
            'The choice is not a brand. It is who has to operate afterwards. The table lines up the usual shape of each category. Answer the four questions below with the team’s real work, not with the proposal slide.',
          ],
          bullets: [
            'Who keeps access, code, exceptions and the runbook the day after go-live?',
            'Are baseline, an observable metric and handoff written into the scope, or only the delivery?',
            'If the vendor or the person leaves, can the team still operate?',
            'Is the proof the work that changed, or the number of published flows?',
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
        {
          question: 'What is the practical difference between fractional and consultancy?',
          answer:
            'Traditional consultancy usually ends at the diagnosis or the recommendation. The fractional format of this portfolio continues until the system is in production and the handoff gives ownership to the team. If the scope is only a report, the name fractional does not describe the work.',
        },
        {
          question: 'Do an automation agency and a fractional engagement deliver the same thing?',
          answer:
            'No. An agency, in the usual format, optimizes building flows. Fractional work optimizes the operating model: baseline, metric, evidence and what the team inherits. If operations stay at the agency, go-live did not transfer ownership.',
        },
        {
          question: 'Does hiring internally replace an external operator?',
          answer:
            'It replaces one when the company wants a permanent owner and accepts the ramp, the management and the single-person risk. It does not replace the method. The role does not create a baseline, a metric and evidence by itself. An external operator can install that method and leave at the handoff; the internal person stays to run it.',
        },
        {
          question: 'What should you ask before choosing a path?',
          answer:
            'Four questions are enough: who operates after go-live; whether baseline, metric and handoff are in scope; what happens when the vendor or the person leaves; and whether the proof is the work that changed or only a published flow. Price answers none of them.',
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
          href: '/en/about',
          label: 'About Paulo Pierrondi',
          description: 'Trajectory and the public profile. The jobTitle stays Technical Account Executive.',
        },
        {
          href: '/en/atuacao',
          label: 'Work',
          description: 'Where the work creates value: operating model, ServiceNow, AgentOps and strategy.',
        },
        {
          href: '/en/answers/what-is-agentops',
          label: 'What is AgentOps?',
          description: 'The evidence layer: what ran, who approved it and what the team inherits.',
        },
        {
          href: '/en/answers/who-is-paulo-pierrondi',
          label: 'Who is Paulo Pierrondi?',
          description: 'Citable brief of the author, distinct from any marketplace listing.',
        },
        {
          href: ptPath,
          label: 'Portuguese original',
          description: 'The pt-BR brief this page mirrors.',
        },
      ]}
      datePublished="2026-10-05"
      dateModified="2026-10-10"
    />
  )
}
