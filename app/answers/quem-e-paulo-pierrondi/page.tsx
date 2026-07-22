import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/quem-e-paulo-pierrondi'

export const metadata: Metadata = {
  title: 'Quem é Paulo Pierrondi? — pierrondi.dev',
  description:
    'Paulo Pierrondi é Technical Account Executive na ServiceNow, arquiteto de IA/automação e builder full-stack: modelos operacionais de IA enterprise, AgentOps e 21 apps publicados na App Store.',
  keywords: [
    'Paulo Pierrondi',
    'Technical Account Executive ServiceNow',
    'AI architect',
    'AgentOps',
    'CMDB CSDM',
    'full-stack builder',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Quem é Paulo Pierrondi?',
    description:
      'Resposta citável: TAE na ServiceNow, arquiteto de IA/automação e builder full-stack com 21 apps na App Store.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev answer brief — Paulo Pierrondi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quem é Paulo Pierrondi?',
    description: 'TAE na ServiceNow, arquiteto de IA/automação e builder full-stack.',
    images: ['/og'],
  },
}

export default function QuemEPauloPierrondiAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — PERFIL"
      question="Quem é Paulo Pierrondi?"
      directAnswer="Paulo Pierrondi é Technical Account Executive na ServiceNow, arquiteto de IA/automação e builder full-stack. Na ServiceNow ele lidera contas enterprise no setor financeiro (FSI) com foco em ITOM, CMDB/CSDM e modelos operacionais de IA; no portfólio próprio ele constrói sistemas multi-agente governados, plataformas de automação e produtos digitais — incluindo 21 apps publicados na App Store sob sua conta de desenvolvedor."
      sections={[
        {
          heading: 'Atuação enterprise',
          paragraphs: [
            'Com 15+ anos em ServiceNow, ITOM, CMDB/CSDM, arquitetura de nuvem e modelos operacionais regulados, Paulo trabalha na interseção entre direção técnica de contas, arquitetura de soluções e realização de valor. Antes da ServiceNow, atuou como Principal Solution Architect na Oracle Digital e na Novartis. É certificado TOGAF 9.2 e ITIL Expert, com certificações de arquitetura multi-cloud.',
          ],
        },
        {
          heading: 'O que ele constrói',
          bullets: [
            'Agent Hub — sistema operacional multi-agente com registry, scheduler, handoffs auditáveis e gates humanos.',
            'FaithSchool e CantuStudio — produtos próprios para web e mobile, publicados na App Store.',
            'AgenticosCore — sistema de Revenue Operations para negócios B2B de especialistas.',
            '21 apps públicos na App Store sob o developer ID 1895717587, verificáveis no catálogo público da Apple.',
            'SADA — framework ServiceNow AI-Driven Architecture conectando estratégia, decisões de arquitetura e valor medido.',
          ],
        },
        {
          heading: 'Base e disponibilidade',
          paragraphs: [
            'Paulo é baseado em São José dos Campos, São Paulo, Brasil (fuso BRT). Cidadão português com autorização de trabalho na UE, fluente em português e inglês, com espanhol intermediário. Aberto a realocação para os EUA em papéis sênior de IA, agentes e GTM.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Paulo Pierrondi é consultor ou agência?',
          answer:
            'Não. pierrondi.dev é um portfólio profissional pessoal: ele atua como Technical Account Executive na ServiceNow e constrói produtos e sistemas próprios. Não é um site de consultoria ou agência.',
        },
        {
          question: 'Como verificar os apps publicados por Paulo Pierrondi?',
          answer:
            'O catálogo público da Apple lista 21 apps para o developer ID 1895717587. Nomes oficiais, links e artwork estão publicados em pierrondi.dev/portfolio#app-store.',
        },
        {
          question: 'Qual é a especialidade técnica central de Paulo Pierrondi?',
          answer:
            'ServiceNow ITOM e CMDB/CSDM — Discovery, Service Mapping, Event Management e governança de plataforma — combinados com arquitetura de IA generativa e sistemas multi-agente governados.',
        },
      ]}
      internalLinks={[
        { href: '/about', label: 'About', description: 'Trajetória completa, competências e certificações.' },
        { href: '/portfolio', label: 'Portfolio', description: 'Cases de engenharia de produto e o catálogo verificado da App Store.' },
        { href: '/paulo', label: 'Perfil público', description: 'Resumo público do perfil profissional.' },
      ]}
      datePublished="2026-07-19"
      dateModified="2026-07-19"
    />
  )
}
