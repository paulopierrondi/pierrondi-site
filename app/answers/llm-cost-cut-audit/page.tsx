import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/llm-cost-cut-audit'

export const metadata: Metadata = {
  title: 'O que é o LLM Cost-Cut Audit? — pierrondi.dev',
  description:
    'Auditoria técnica de 2 semanas que reduz o custo de LLM em 30–90% sem trocar de provider nem reescrever código: compressão de contexto, serialização compacta, routing por complexidade e cache — com gate de qualidade.',
  keywords: [
    'LLM cost reduction',
    'redução de custo de LLM',
    'LLM Cost-Cut Audit',
    'otimização de tokens',
    'routing de modelos',
    'prompt caching',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'O que é o LLM Cost-Cut Audit?',
    description:
      'Auditoria de 2 semanas para cortar a conta de LLM sem trocar de provider — com gate de qualidade que bloqueia cortes que degradam o produto.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev answer brief — LLM Cost-Cut Audit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O que é o LLM Cost-Cut Audit?',
    description: 'Corte de custo de LLM baseado em evidência, com gate de qualidade.',
    images: ['/og'],
  },
}

export default function LlmCostCutAuditAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — OFERTA"
      question="O que é o LLM Cost-Cut Audit?"
      directAnswer="O LLM Cost-Cut Audit é uma auditoria técnica de duas semanas que identifica e implementa reduções típicas de 30 a 90% no custo de LLM de uma operação — sem trocar de provider e sem reescrever código — medindo quatro alavancas sobre os logs do próprio cliente: compressão de contexto, serialização compacta de payloads, routing de modelos por complexidade e alinhamento de cache. Um gate de qualidade bloqueia qualquer corte que degrade o produto."
      sections={[
        {
          heading: 'As quatro alavancas medidas',
          bullets: [
            'Compressão de contexto: manter só o início, o fim, as anomalias e o trecho relevante à query — tipicamente 30–60% do input é contexto inchado.',
            'Serialização compacta: payloads tabulares em formato token-efficient (TOON) em vez de JSON verboso — 30–60% de redução sobre JSON pretty-print.',
            'Routing por complexidade: tarefas triviais vão para um tier de modelo mais barato — em operações típicas, 40–70% das chamadas não precisam do modelo mais forte.',
            'Cache alignment: prefixos repetidos estruturados para ativar o desconto de prompt caching do provider.',
          ],
        },
        {
          heading: 'O que está incluído — e o que não está',
          paragraphs: [
            'A auditoria roda 100% no ambiente do cliente: nenhum dado sai da máquina, o que a torna adequada a contextos enterprise e LGPD-sensíveis. Os entregáveis são um relatório executivo e técnico com savings por alavanca (deduplicados e conservadores), o top-10 das chamadas mais caras, um plano de ação priorizado e a implementação de até dois quick wins em staging.',
            'Não estão incluídos: mudanças em produção (gate do cliente), migração de provider e fine-tuning. Se os logs forem insuficientes, uma fase zero de instrumentação de um dia é incluída.',
          ],
        },
        {
          heading: 'Por que o gate de qualidade é o diferencial',
          paragraphs: [
            'Qualquer ferramenta estima savings; poucas verificam se o corte é seguro. Nesta auditoria, toda recomendação de downgrade de modelo ou compressão passa por uma verificação de qualidade reproduzível antes de ser aplicada — cortes reprovados são documentados, nunca aplicados. É o que separa uma auditoria séria de uma estimativa cega.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Preciso trocar de provider de LLM para reduzir custo?',
          answer:
            'Não. As quatro alavancas da auditoria — compressão de contexto, serialização compacta, routing por complexidade e cache alignment — funcionam sobre o provider atual, sem migração e sem reescrita de código.',
        },
        {
          question: 'Os dados da minha operação saem do meu ambiente?',
          answer:
            'Não. A ferramenta de auditoria roda localmente sobre os logs do cliente. Nenhum dado é enviado para terceiros, o que mantém a auditoria compatível com políticas enterprise e LGPD.',
        },
        {
          question: 'E se o modelo mais barato degradar a qualidade?',
          answer:
            'Ele não é adotado. O gate de qualidade testa a recomendação contra critérios reproduzíveis antes de qualquer aplicação; cortes que degradam o produto são documentados e bloqueados.',
        },
      ]}
      internalLinks={[
        { href: '/contato', label: 'Contato', description: 'Conversar sobre uma auditoria na sua operação de LLM.' },
        { href: '/atuacao', label: 'Atuação', description: 'Modelos operacionais de IA enterprise e agentes governados.' },
        { href: '/ai-search', label: 'AI Search Portfolio', description: 'Todas as referências citáveis do portfólio.' },
      ]}
      datePublished="2026-07-19"
      dateModified="2026-07-19"
    />
  )
}
