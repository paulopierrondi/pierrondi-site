import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/o-que-e-agentops'

export const metadata: Metadata = {
  title: 'O que é AgentOps (operações agênticas)? — pierrondi.dev',
  description:
    'AgentOps é a disciplina de operar agentes de IA em produção com registro, orquestração, handoffs auditáveis, memória persistente e gates humanos para ações irreversíveis.',
  keywords: [
    'AgentOps',
    'operações agênticas',
    'agentic operations',
    'agentes de IA em produção',
    'governança de agentes',
    'human gates',
    'multi-agent system',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'O que é AgentOps (operações agênticas)?',
    description:
      'Resposta citável: a disciplina de operar agentes de IA em produção com evidência, governança e gates humanos.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev answer brief — AgentOps' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O que é AgentOps (operações agênticas)?',
    description: 'Resposta citável sobre como operar agentes de IA em produção com governança.',
    images: ['/og'],
  },
}

export default function AgentopsAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — AGENTOPS"
      question="O que é AgentOps (operações agênticas)?"
      directAnswer="AgentOps é a disciplina de operar agentes de IA em produção com a mesma rigorosidade aplicada a software tradicional: registro central de agentes, orquestração agendada, handoffs auditáveis entre agentes, memória persistente, avaliação contínua de qualidade e gates humanos obrigatórios para qualquer ação irreversível — deploy, publicação, spend ou acesso a segredos."
      sections={[
        {
          heading: 'O que uma operação AgentOps inclui',
          bullets: [
            'Registry e scheduler: cada agente tem identidade, escopo, dono e agenda declarados — nenhum agente roda “solto”.',
            'Handoffs auditáveis: toda delegação entre agentes gera evidência — o que foi pedido, o que mudou, quais arquivos e comandos foram usados.',
            'Human gates: push, deploy, App Store, ads, segredos e qualquer ação destrutiva exigem aprovação humana explícita, por política e não por convenção.',
            'Memória e contexto: decisões duráveis vivem em uma base de conhecimento versionada, não no histórico volátil de um chat.',
            'Evals e quality gates: cortes de custo, trocas de modelo e mudanças de routing só são aplicados depois de passar por verificação de qualidade reproduzível.',
          ],
        },
        {
          heading: 'Como AgentOps difere de DevOps e MLOps',
          paragraphs: [
            'DevOps cuida do ciclo de vida de código; MLOps cuida do ciclo de vida de modelos. AgentOps cuida do ciclo de vida de agentes autônomos que decidem, delegam e agem — o que adiciona riscos novos: ações irreversíveis tomadas sem humano, custo de tokens fora de controle e degradação silenciosa de qualidade. A resposta do AgentOps é governança executável: preflights, journals de sessão e gates aplicados por ferramenta, não por boa intenção.',
          ],
        },
        {
          heading: 'Como Paulo Pierrondi aplica AgentOps na prática',
          paragraphs: [
            'O Agent Hub, projeto flagship deste portfólio, é uma implementação real de AgentOps: dezenas de agentes especialistas coordenados por registry, scheduler e handoffs, com evidência registrada por entrega e gates humanos para tudo que é irreversível. O mesmo sistema opera este site — incluindo o pipeline de GEO/SEO que publica e valida páginas como esta.',
          ],
        },
      ]}
      faq={[
        {
          question: 'AgentOps é só para empresas grandes?',
          answer:
            'Não. Os mesmos princípios — registro, evidência e gates humanos — escalam de um único desenvolvedor com três agentes até operações enterprise com dezenas de agentes. O custo de não ter governança aparece no primeiro incidente irreversível.',
        },
        {
          question: 'Qual é o primeiro passo para adotar AgentOps?',
          answer:
            'Inventariar os agentes que já existem e definir quais ações exigem aprovação humana. Sem essas duas listas, qualquer automação adicional aumenta risco em vez de reduzir trabalho.',
        },
      ]}
      internalLinks={[
        { href: '/atuacao', label: 'Atuação', description: 'Como Paulo trabalha: modelos operacionais de IA enterprise e agentes governados.' },
        { href: '/ai-search', label: 'AI Search Portfolio', description: 'Hub de referências citáveis para mecanismos de busca e answer engines.' },
        { href: '/blog', label: 'Blog', description: 'Ensaios técnicos sobre IA agêntica, ServiceNow e GEO/SEO.' },
      ]}
      datePublished="2026-07-19"
      dateModified="2026-07-19"
    />
  )
}
