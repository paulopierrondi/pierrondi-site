import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/como-medir-resultado-de-ia-operacional'

export const metadata: Metadata = {
  title: 'Como medir resultado de IA operacional?',
  description:
    'Framework honesto para medir IA operacional: baseline do trabalho real, métrica definida antes de escalar e evidência AgentOps. Sem taxa de sucesso, logo de cliente ou ROI inventado.',
  keywords: [
    'medir resultado de IA',
    'IA operacional',
    'baseline',
    'métrica',
    'evidência',
    'AgentOps',
    'automações mensuráveis',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Como medir resultado de IA operacional?',
    description:
      'Resposta citável: baseline → métrica → evidência / AgentOps. Sem número inventado. A prova pública continua em /feitos.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'pierrondi.dev answer brief — como medir resultado de IA operacional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Como medir resultado de IA operacional?',
    description: 'Baseline, métrica e evidência AgentOps — sem ROI inventado.',
    images: ['/og'],
  },
}

export default function ComoMedirResultadoDeIaOperacionalAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — RESULTADO"
      question="Como medir resultado de IA operacional?"
      directAnswer="Medir resultado de IA operacional é comparar o trabalho de hoje com o que a automação entrega depois — baseline, métrica definida antes de escalar e evidência AgentOps. Sem baseline, o número é teatro. Sem evidência (o que rodou, quem aprovou, o que o time herda), a métrica não se sustenta. Esta página não publica taxa de sucesso, logo de cliente ou ROI inventado: a prova pública continua em /feitos."
      sections={[
        {
          heading: 'O framework: baseline → métrica → evidência',
          bullets: [
            'Baseline: descrever o trabalho real de hoje — fila, exceção, tempo, retrabalho, dono e o que já existe. Sem esse recorte, qualquer percentual depois é incomparável.',
            'Métrica: escolher uma medida que o time já consegue observar antes de escalar. Adoção, qualidade e valor só entram quando dá para apontar a fonte — não um KPI de vitrine.',
            'Evidência / AgentOps: registrar o que rodou, quem aprovou e o que o time herda. A métrica sem trilha vira slide; a trilha sem métrica vira log morto.',
          ],
        },
        {
          heading: 'O que AgentOps adiciona à medição',
          paragraphs: [
            'AgentOps é a disciplina de operar agentes com registry, gates humanos e handoff auditável. Na medição, isso significa que o resultado não é “a IA rodou”: é a cadeia que liga o trabalho atual a uma automação que o time consegue operar depois. Gates humanos valem para o que é irreversível. Sem evidência, a automação não avança — e nenhum número novo é inventado para preencher o vazio.',
          ],
        },
        {
          heading: 'O que esta resposta não faz',
          paragraphs: [
            'Não cita cliente nomeado, taxa de sucesso, economia em reais ou tráfego. Não publica /sprint e não muda o jobTitle canônico do site (continua Technical Account Executive). A oferta contínua está em /engajamento; a definição do termo Fractional está no brief correspondente; a prova pública está no índice de feitos, com o recorte já publicado.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Quais números ou clientes esta página cita?',
          answer:
            'Nenhum cliente nomeado e nenhuma métrica nova. A prova pública está em /feitos, com cases anonimizados e o recorte já publicado. Esta página define o método de medição; não inventa resultado.',
        },
        {
          question: 'Preciso de um dashboard de vendor para começar?',
          answer:
            'Não. O primeiro passo é o baseline do trabalho real — fila, exceção, dono e o que já existe. Ferramenta sem recorte só produz gráfico. A métrica só entra quando a fonte já é observável pelo time.',
        },
        {
          question: 'Como isso se relaciona com Fractional AI Automation Officer?',
          answer:
            'A oferta de engajamento contínuo usa a mesma cadeia: baseline, sistema, métrica e handoff. Esta resposta detalha a parte de medição. A definição do termo e o caminho comercial estão no brief Fractional e em /engajamento.',
        },
      ]}
      internalLinks={[
        {
          href: '/engajamento',
          label: 'Engajamento',
          description: 'Oferta contínua: baseline, sistema, métrica e handoff.',
        },
        {
          href: '/answers/o-que-e-fractional-ai-automation-officer',
          label: 'O que é Fractional AI Automation Officer?',
          description: 'Definição citável da oferta — PT-first, sem twin EN.',
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
      datePublished="2026-09-14"
      dateModified="2026-09-14"
    />
  )
}
