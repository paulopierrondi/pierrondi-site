import { SITE_URL } from '@/lib/site'

export type EngajamentoLang = 'pt' | 'en'

type Block = {
  id: string
  no: string
  category: string
  title: string
  outcome: string
  desc: string
  items: Array<{ k: string; t: string }>
}

export const ENGAJAMENTO_ROUTES: Record<
  EngajamentoLang,
  { contact: string; proof: string; self: string }
> = {
  pt: { contact: '/contato', proof: '/feitos', self: '/engajamento' },
  en: { contact: '/en/contato', proof: '/en/feitos', self: '/en/engajamento' },
}

export const ENGAJAMENTO_WHATSAPP: Record<EngajamentoLang, string> = {
  pt: 'Olá, Paulo! Vim pela página de engajamento e quero conversar sobre Fractional AI Automation Officer.',
  en: 'Hi Paulo! I came from the engagement page and would like to discuss Fractional AI Automation Officer.',
}

export const ENGAJAMENTO_COPY: Record<
  EngajamentoLang,
  {
    locale: string
    metaName: string
    metaDescription: string
    serviceType: string
    blocks: Block[]
    proof: { h2: string; p: string; cta: string }
    final: { h2: string; p: string; contact: string; whatsapp: string }
    disclaimer: string
  }
> = {
  pt: {
    locale: 'pt-BR',
    metaName: 'Fractional AI Automation Officer',
    metaDescription:
      'Engajamento contínuo para mid-market e ops que precisam de automação em produção: baseline, sistema, métrica e handoff — resultado mensurável, não horas soltas.',
    serviceType: 'Engajamento Fractional AI Automation Officer',
    blocks: [
      {
        id: 'para-quem',
        no: '01',
        category: 'Para quem',
        title: 'Ops que precisam de automação em produção.',
        outcome: 'Mid-market e times de operação — sem logos inventados e sem ICP de vitrine.',
        desc: 'O encaixe é operacional, não de marca. Serve quem já tem intenção de IA ou automação e precisa de um sistema que rode no trabalho real: fila, exceção, evidência e dono. Não é um pacote de horas soltas nem um sprint isolado.',
        items: [
          { k: '01', t: 'Mid-market e ops que precisam sair de piloto e entrar em produção.' },
          { k: '02', t: 'Times que já têm ferramenta e ainda não têm operating model.' },
          { k: '03', t: 'Liderança que pede resultado mensurável, não volume de horas.' },
          { k: '04', t: 'Ambientes que exigem gate humano, trilha de evidência e handoff.' },
        ],
      },
      {
        id: 'oferta',
        no: '02',
        category: 'O que se vende',
        title: 'Resultado e automações mensuráveis, não horas soltas.',
        outcome: 'Baseline → sistema → métrica → handoff.',
        desc: 'A oferta é um engajamento contínuo como Fractional AI Automation Officer: instalar a cadeia que liga trabalho atual a automação governada. O valor não é presença. É o sistema que o time consegue operar depois.',
        items: [
          { k: '01', t: 'Baseline: o trabalho de hoje, as restrições e o que já existe.' },
          { k: '02', t: 'Sistema: AgentOps, AI Operating Model, permissão e fallback.' },
          { k: '03', t: 'Métrica: adoção, qualidade e valor definidos antes de escalar.' },
          { k: '04', t: 'Handoff: o time fica com registry, runbook e trilha de evidência.' },
        ],
      },
      {
        id: 'metodo',
        no: '03',
        category: 'Como o engajamento funciona',
        title: 'Fases do método que o site já descreve.',
        outcome: 'AgentOps, evidence trails e AI Operating Model — sem números de case inventados.',
        desc: 'As fases repetem a linguagem já pública de atuação: contexto, controle, ação e evidência. Não há aqui taxa de sucesso, logo de cliente ou prazo milagroso. Há um método que só avança quando a evidência aguenta.',
        items: [
          { k: '01', t: 'Baseline e recorte: domínio, risco, dono e o que fica fora de escopo.' },
          { k: '02', t: 'AI Operating Model: política, memória, validação, custo e auditoria.' },
          { k: '03', t: 'AgentOps: registry, scheduler, human gates e execução auditável.' },
          { k: '04', t: 'Evidence trails: o que rodou, quem aprovou e o que o time herda.' },
        ],
      },
    ],
    proof: {
      h2: 'Prova pública',
      p: 'A prova deste site é o índice de feitos — sistemas, demos e execução com recorte público. Esta página não inventa métrica, cliente ou case.',
      cta: 'Ver os feitos',
    },
    final: {
      h2: 'Vamos abrir o engajamento.',
      p: 'Contato para trazer contexto. WhatsApp para começar direto. Sem agenda de pacote e sem /sprint publicado.',
      contact: 'Ir para contato',
      whatsapp: 'Chamar no WhatsApp',
    },
    disclaimer:
      'Oferta independente de engajamento pessoal. Não representa a ServiceNow e não é um produto oficial do fabricante. O job title canônico no site continua Technical Account Executive.',
  },
  en: {
    locale: 'en-US',
    metaName: 'Fractional AI Automation Officer',
    metaDescription:
      'Ongoing engagement for mid-market and ops teams that need production automations: baseline, system, metric, and handoff — measurable outcomes, not loose hours.',
    serviceType: 'Fractional AI Automation Officer engagement',
    blocks: [
      {
        id: 'para-quem',
        no: '01',
        category: 'Who it is for',
        title: 'Ops teams that need automation in production.',
        outcome: 'Mid-market and operations teams — no invented logos and no showcase ICP.',
        desc: 'Fit is operational, not brand theater. It serves teams that already intend to use AI or automation and need a system that runs in real work: queue, exception, evidence, and an owner. It is not a bucket of loose hours and not a one-off sprint.',
        items: [
          { k: '01', t: 'Mid-market and ops teams that need to leave the pilot and enter production.' },
          { k: '02', t: 'Teams that already have tools and still lack an operating model.' },
          { k: '03', t: 'Leaders who ask for a measurable outcome, not a volume of hours.' },
          { k: '04', t: 'Environments that require a human gate, an evidence trail, and a handoff.' },
        ],
      },
      {
        id: 'oferta',
        no: '02',
        category: 'What you buy',
        title: 'Measurable outcomes and automations, not loose hours.',
        outcome: 'Baseline → system → metric → handoff.',
        desc: 'The offer is an ongoing Fractional AI Automation Officer engagement: install the chain that connects current work to governed automation. The value is not presence. It is the system the team can operate afterwards.',
        items: [
          { k: '01', t: 'Baseline: today’s work, the constraints, and what already exists.' },
          { k: '02', t: 'System: AgentOps, AI Operating Model, permissioning, and fallback.' },
          { k: '03', t: 'Metric: adoption, quality, and value defined before scale.' },
          { k: '04', t: 'Handoff: the team keeps the registry, runbook, and evidence trail.' },
        ],
      },
      {
        id: 'metodo',
        no: '03',
        category: 'How the engagement works',
        title: 'Phases in the method language already on this site.',
        outcome: 'AgentOps, evidence trails, and AI Operating Model — no invented case numbers.',
        desc: 'The phases reuse the public work language: context, control, action, and evidence. There is no success rate, client logo, or miracle timeline here. There is a method that only advances when the evidence holds.',
        items: [
          { k: '01', t: 'Baseline and cut: domain, risk, owner, and what stays out of scope.' },
          { k: '02', t: 'AI Operating Model: policy, memory, validation, cost, and audit.' },
          { k: '03', t: 'AgentOps: registry, scheduler, human gates, and auditable execution.' },
          { k: '04', t: 'Evidence trails: what ran, who approved it, and what the team inherits.' },
        ],
      },
    ],
    proof: {
      h2: 'Public proof',
      p: 'The public proof on this site is the work index — systems, demos, and execution with a public cut. This page does not invent a metric, client, or case.',
      cta: 'See the work',
    },
    final: {
      h2: 'Let’s open the engagement.',
      p: 'Contact to bring context. WhatsApp to start directly. No packaged sprint and no published /sprint offer.',
      contact: 'Go to contact',
      whatsapp: 'Message on WhatsApp',
    },
    disclaimer:
      'Independent personal engagement offer. It does not represent ServiceNow and is not an official vendor product. The canonical on-site jobTitle remains Technical Account Executive.',
  },
}

export function buildEngajamentoSchema(lang: EngajamentoLang) {
  const copy = ENGAJAMENTO_COPY[lang]
  const pageUrl = `${SITE_URL}${ENGAJAMENTO_ROUTES[lang].self}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.metaName,
        description: copy.metaDescription,
        inLanguage: copy.locale,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        mainEntity: { '@id': `${pageUrl}#service` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        url: pageUrl,
        name: copy.metaName,
        serviceType: copy.serviceType,
        description: copy.metaDescription,
        inLanguage: copy.locale,
        provider: { '@id': `${SITE_URL}/#person` },
        areaServed: { '@type': 'AdministrativeArea', name: 'Brazil' },
      },
    ],
  }
}
