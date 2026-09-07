import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/o-que-e-fractional-ai-automation-officer'

export const metadata: Metadata = {
  title: 'O que é Fractional AI Automation Officer?',
  description:
    'No enquadramento de Paulo Pierrondi, Fractional AI Automation Officer é um engajamento contínuo para resultado e automações mensuráveis — AgentOps e evidência, não horas soltas.',
  keywords: [
    'Fractional AI Automation Officer',
    'automações mensuráveis',
    'AgentOps',
    'resultado mensurável',
    'AI operating model',
    'engajamento contínuo',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'O que é Fractional AI Automation Officer?',
    description:
      'Resposta citável: engajamento contínuo para resultado e automações mensuráveis, com AgentOps e trilha de evidência — não horas soltas.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'pierrondi.dev answer brief — Fractional AI Automation Officer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O que é Fractional AI Automation Officer?',
    description: 'Engajamento contínuo para automações mensuráveis, com AgentOps e evidência.',
    images: ['/og'],
  },
}

export default function FractionalAiAutomationOfficerAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — ENGAJAMENTO"
      question="O que é Fractional AI Automation Officer?"
      directAnswer="Fractional AI Automation Officer, no enquadramento de Paulo Pierrondi, é um engajamento contínuo para instalar automações em produção com resultado mensurável — baseline, sistema, métrica e handoff — em vez de vender horas soltas. O método usa AgentOps e trilha de evidência: registry, gates humanos e o que o time herda depois. Não é o jobTitle canônico do site (continua Technical Account Executive) e não é um produto ServiceNow."
      sections={[
        {
          heading: 'O que isso significa na prática',
          bullets: [
            'O valor não é presença nem volume de horas. É a cadeia que liga o trabalho atual a uma automação que o time consegue operar.',
            'A sequência é a mesma da página de engajamento: baseline do trabalho real, sistema com AgentOps e AI Operating Model, métrica definida antes de escalar, handoff com registry e evidência.',
            'Gates humanos valem para o que é irreversível. Sem evidência, a automação não avança — não há taxa de sucesso nem logo de cliente nesta página.',
          ],
        },
        {
          heading: 'O que isso não é',
          paragraphs: [
            'Não é um sprint publicado, um pacote de horas ou um cargo oficial da ServiceNow. O jobTitle público do site permanece Technical Account Executive. Não há Product schema, preço ou métrica inventada aqui: a prova pública continua no índice de feitos, com o recorte que já está publicado.',
          ],
        },
        {
          heading: 'Como começar',
          paragraphs: [
            'O caminho comercial é a página de engajamento. A prova pública está em /feitos. Para conversar, use /contato ou o WhatsApp já usado no restante do site — sem agenda de pacote.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Fractional AI Automation Officer é um cargo formal?',
          answer:
            'Não. É o nome da oferta de engajamento contínuo neste portfólio. O jobTitle canônico no site continua Technical Account Executive. A oferta é pessoal e independente — não representa a ServiceNow.',
        },
        {
          question: 'Essa página publica um sprint ou um pacote de horas?',
          answer:
            'Não. /sprint permanece sem página pública. A oferta é um engajamento contínuo com baseline, sistema, métrica e handoff — resultado e automações mensuráveis, não horas soltas.',
        },
        {
          question: 'Quais clientes ou números esta resposta cita?',
          answer:
            'Nenhum cliente nomeado e nenhuma métrica nova. A prova pública está em /feitos, com cases anonimizados e o recorte já publicado. Esta página define o termo; não inventa resultado.',
        },
      ]}
      internalLinks={[
        {
          href: '/engajamento',
          label: 'Engajamento',
          description: 'A oferta contínua: baseline, sistema, métrica e handoff.',
        },
        {
          href: '/feitos',
          label: 'Feitos',
          description: 'Prova pública já publicada — sem métrica nova nesta resposta.',
        },
        {
          href: '/contato',
          label: 'Contato / WhatsApp',
          description: 'Conversar com contexto, ou começar direto no WhatsApp do site.',
        },
      ]}
      datePublished="2026-09-07"
      dateModified="2026-09-07"
    />
  )
}
