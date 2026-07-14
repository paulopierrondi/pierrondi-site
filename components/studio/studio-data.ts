export type StudioLang = 'pt' | 'en'

export interface StudioFront {
  id: string
  index: string
  label: string
  title: string
  description: string
  deliverables: string[]
  signal: string
}

export interface StudioCase {
  index: string
  sector: string
  title: string
  problem: string
  solution: string
  result: string
  tags: string[]
}

export interface StudioStep {
  index: string
  title: string
  description: string
}

export const STUDIO_COPY = {
  pt: {
    lang: 'pt' as const,
    eyebrow: 'PIERRONDI STUDIO · MARCA, CONTEÚDO E IA',
    title: 'Crescimento não é uma campanha. É um sistema.',
    positioning:
      'Transformamos posicionamento, comunicação e operação comercial em sistemas de crescimento executáveis.',
    heroNote:
      'Estratégia que orienta. Marca que sustenta. Conteúdo que se adapta. Automação que mantém o ritmo.',
    primaryCta: 'Vamos avaliar um projeto-piloto',
    secondaryCta: 'Ver como funciona',
    nav: {
      services: 'Frentes',
      cases: 'Cases',
      process: 'Método',
      partnership: 'White-label',
    },
    proofLabels: ['Oferta e mensagem', 'Sistema de marca', 'Conteúdo multimídia', 'CRM + IA'],
    signalMap: {
      eyebrow: 'GROWTH SYSTEM / LIVE MAP',
      title: 'Da percepção à operação',
      nodes: ['Posição', 'Marca', 'Conteúdo', 'CRM', 'Crescimento'],
      status: 'sistema conectado',
    },
    servicesEyebrow: 'QUATRO FRENTES · UMA MESMA ARQUITETURA',
    servicesTitle: 'A estratégia continua viva quando a execução começa.',
    servicesLead:
      'Cada frente resolve uma parte do sistema. Juntas, eliminam a distância entre o que a empresa quer dizer e o que ela consegue operar.',
    fronts: [
      {
        id: 'strategy',
        index: '01',
        label: 'DIREÇÃO',
        title: 'Estratégia e posicionamento',
        description:
          'Oferta, público, mensagem e jornada comercial organizados em uma tese clara, defensável e pronta para orientar decisões.',
        deliverables: ['Arquitetura da oferta', 'ICP e narrativa', 'Jornada comercial'],
        signal: 'clareza antes de escala',
      },
      {
        id: 'brand',
        index: '02',
        label: 'IDENTIDADE',
        title: 'Branding como sistema',
        description:
          'Identidade visual, linguagem de marca, apresentações e kits de canal que criam consistência sem engessar a comunicação.',
        deliverables: ['Identidade visual', 'Linguagem de marca', 'Decks e social kits'],
        signal: 'reconhecimento com coerência',
      },
      {
        id: 'content',
        index: '03',
        label: 'DISTRIBUIÇÃO',
        title: 'Conteúdo multimídia',
        description:
          'Vídeos curtos, campanhas, roteiros, narração, legendas e variações desenhados desde o início para cada canal.',
        deliverables: ['Roteiro e direção', 'Voz e legendas', 'Versões por canal'],
        signal: 'uma ideia, múltiplas entregas',
      },
      {
        id: 'automation',
        index: '04',
        label: 'OPERAÇÃO',
        title: 'IA e automação comercial',
        description:
          'CRM, pré-qualificação, Salesbots, fluxos inteligentes, bases de conhecimento e copilotos conectados a handoffs humanos.',
        deliverables: ['CRM e funis', 'Salesbots e copilotos', 'Knowledge base e gates'],
        signal: 'automação com controle',
      },
    ] satisfies StudioFront[],
    casesEyebrow: 'CASOS DE APLICAÇÃO · PROBLEMA → SISTEMA → RESULTADO',
    casesTitle: 'Prova de capacidade sem teatro de números.',
    casesLead:
      'Os resultados abaixo descrevem mudanças operacionais observáveis. Sem métricas inventadas, nomes expostos ou promessas que o projeto não pode sustentar.',
    problemLabel: 'Problema',
    solutionLabel: 'Solução',
    resultLabel: 'Resultado operacional',
    cases: [
      {
        index: 'CASE 01',
        sector: 'CLÍNICA E CURSOS',
        title: 'Do primeiro contato ao handoff humano.',
        problem:
          'Leads chegavam por jornadas diferentes, sem uma lógica única de entrada, qualificação e continuidade do atendimento.',
        solution:
          'Implantação de CRM, funis segmentados, campos, tags, pré-qualificação por Salesbot e regras explícitas de transferência para uma pessoa.',
        result:
          'Jornada de entrada organizada, critérios de qualificação documentados e contexto preservado até o atendimento humano.',
        tags: ['CRM', 'Salesbot', 'WhatsApp', 'Handoff'],
      },
      {
        index: 'CASE 02',
        sector: 'CONTEÚDO MULTICANAL',
        title: 'Uma ideia que nasce pronta para se desdobrar.',
        problem:
          'Cada canal exigia refazer roteiro, formato, voz, legenda e edição, tornando a produção lenta e inconsistente.',
        solution:
          'Sistema multimídia com brief, roteiro, narração, legendas sincronizadas, master visual e variações específicas por plataforma.',
        result:
          'Pipeline repetível, ativos organizados e versões prontas para QA de formato, mensagem e canal.',
        tags: ['Roteiro', 'Voz', 'Legendas', 'Variações'],
      },
      {
        index: 'CASE 03',
        sector: 'TRANSFORMAÇÃO DIGITAL',
        title: 'Mensagem, atendimento e operação na mesma direção.',
        problem:
          'O posicionamento evoluía, mas a comunicação e os processos comerciais continuavam fragmentados entre pessoas e ferramentas.',
        solution:
          'Redesenho da narrativa e da jornada, com base de conhecimento, fluxos inteligentes, copilotos e pontos de aprovação humana.',
        result:
          'Uma experiência comercial mais coerente, com contexto reutilizável, escalonamento explícito e operação preparada para melhoria contínua.',
        tags: ['Posicionamento', 'IA', 'Knowledge base', 'Copilotos'],
      },
    ] satisfies StudioCase[],
    processEyebrow: 'COMO FUNCIONA',
    processTitle: 'Diagnóstico primeiro. Melhoria sempre.',
    processLead:
      'O projeto começa pequeno o bastante para ser testado e estruturado o bastante para virar sistema.',
    steps: [
      { index: '01', title: 'Diagnóstico', description: 'Problema, contexto, ativos, restrições e sinal de sucesso.' },
      { index: '02', title: 'Estratégia', description: 'Oferta, público, mensagem, jornada e arquitetura da solução.' },
      { index: '03', title: 'Produção', description: 'Identidade, conteúdo, fluxos, automações e ativos operacionais.' },
      { index: '04', title: 'Implementação', description: 'Integração nas ferramentas, canais e rotinas que já existem.' },
      { index: '05', title: 'Melhoria', description: 'Evidência, aprendizado e nova iteração com prioridade clara.' },
    ] satisfies StudioStep[],
    partnershipEyebrow: 'PARCERIA WHITE-LABEL',
    partnershipTitle: 'Sua agência continua na frente. O Studio amplia a capacidade por trás.',
    partnershipBody:
      'Apoio estratégico e operacional para agências que precisam entregar branding, conteúdo, CRM ou automação sem inflar estrutura fixa.',
    partnershipPoints: [
      'Escopo modular e fronteiras de responsabilidade claras.',
      'Operação discreta, documentada e adaptada ao método da agência.',
      'Entrega com checkpoints, QA e handoff de ativos.',
    ],
    partnershipBadge: 'ESTRATÉGIA + PRODUÇÃO + IMPLEMENTAÇÃO',
    ctaEyebrow: 'COMEÇAR PEQUENO · PROVAR VALOR · ESCALAR COM CONTROLE',
    ctaTitle: 'Vamos transformar uma frente real em um projeto-piloto.',
    ctaBody:
      'Em uma primeira conversa, avaliamos o problema, o ativo mais promissor e o menor escopo capaz de gerar evidência útil.',
    ctaButton: 'Vamos avaliar um projeto-piloto',
    ctaAlt: 'Explorar o portfólio completo',
    legalNote: 'Pierrondi Studio é uma frente autoral de estratégia, criação e implementação da pierrondi.dev.',
  },
  en: {
    lang: 'en' as const,
    eyebrow: 'PIERRONDI STUDIO · BRAND, CONTENT, AND AI',
    title: 'Growth is not a campaign. It is a system.',
    positioning:
      'We turn positioning, communication, and commercial operations into executable growth systems.',
    heroNote:
      'Strategy that guides. Brand that holds. Content that adapts. Automation that keeps the pace.',
    primaryCta: 'Let’s assess a pilot project',
    secondaryCta: 'See how it works',
    nav: { services: 'Capabilities', cases: 'Cases', process: 'Method', partnership: 'White-label' },
    proofLabels: ['Offer and message', 'Brand system', 'Multimedia content', 'CRM + AI'],
    signalMap: {
      eyebrow: 'GROWTH SYSTEM / LIVE MAP',
      title: 'From perception to operations',
      nodes: ['Position', 'Brand', 'Content', 'CRM', 'Growth'],
      status: 'connected system',
    },
    servicesEyebrow: 'FOUR CAPABILITIES · ONE ARCHITECTURE',
    servicesTitle: 'Strategy stays alive when execution begins.',
    servicesLead:
      'Each capability solves one part of the system. Together, they close the gap between what a company wants to say and what it can actually operate.',
    fronts: [
      {
        id: 'strategy', index: '01', label: 'DIRECTION', title: 'Strategy and positioning',
        description: 'Offer, audience, message, and commercial journey organized into a clear, defensible thesis that can guide decisions.',
        deliverables: ['Offer architecture', 'ICP and narrative', 'Commercial journey'], signal: 'clarity before scale',
      },
      {
        id: 'brand', index: '02', label: 'IDENTITY', title: 'Branding as a system',
        description: 'Visual identity, brand language, presentations, and channel kits that create consistency without freezing communication.',
        deliverables: ['Visual identity', 'Brand language', 'Decks and social kits'], signal: 'recognition with coherence',
      },
      {
        id: 'content', index: '03', label: 'DISTRIBUTION', title: 'Multimedia content',
        description: 'Short-form video, campaigns, scripts, narration, captions, and variations designed for each channel from the start.',
        deliverables: ['Script and direction', 'Voice and captions', 'Channel variants'], signal: 'one idea, multiple outputs',
      },
      {
        id: 'automation', index: '04', label: 'OPERATIONS', title: 'AI and commercial automation',
        description: 'CRM, pre-qualification, Salesbots, intelligent flows, knowledge bases, and copilots connected to human handoffs.',
        deliverables: ['CRM and pipelines', 'Salesbots and copilots', 'Knowledge base and gates'], signal: 'automation with control',
      },
    ] satisfies StudioFront[],
    casesEyebrow: 'APPLICATION CASES · PROBLEM → SYSTEM → OUTCOME',
    casesTitle: 'Capability proof without metric theater.',
    casesLead:
      'The outcomes below describe observable operational changes—without invented metrics, exposed names, or promises the work cannot support.',
    problemLabel: 'Problem', solutionLabel: 'Solution', resultLabel: 'Operational outcome',
    cases: [
      {
        index: 'CASE 01', sector: 'CLINIC AND COURSES', title: 'From first contact to human handoff.',
        problem: 'Leads entered through different journeys without one consistent intake, qualification, and service-continuity logic.',
        solution: 'CRM implementation, segmented pipelines, fields, tags, Salesbot pre-qualification, and explicit rules for handing the conversation to a person.',
        result: 'An organized intake journey, documented qualification criteria, and context preserved through the human handoff.',
        tags: ['CRM', 'Salesbot', 'WhatsApp', 'Handoff'],
      },
      {
        index: 'CASE 02', sector: 'MULTICHANNEL CONTENT', title: 'One idea designed to branch from the start.',
        problem: 'Every channel required a new script, format, voice, caption set, and edit, making production slow and inconsistent.',
        solution: 'A multimedia system combining brief, script, narration, synchronized captions, a visual master, and platform-specific variants.',
        result: 'A repeatable pipeline, organized assets, and versions ready for message, format, and channel QA.',
        tags: ['Script', 'Voice', 'Captions', 'Variants'],
      },
      {
        index: 'CASE 03', sector: 'DIGITAL TRANSFORMATION', title: 'Message, service, and operations moving together.',
        problem: 'Positioning evolved while communication and commercial processes stayed fragmented across people and tools.',
        solution: 'A redesigned narrative and journey, supported by a knowledge base, intelligent flows, copilots, and human approval points.',
        result: 'A more coherent commercial experience with reusable context, explicit escalation, and an operation designed for continuous improvement.',
        tags: ['Positioning', 'AI', 'Knowledge base', 'Copilots'],
      },
    ] satisfies StudioCase[],
    processEyebrow: 'HOW IT WORKS', processTitle: 'Diagnosis first. Improvement always.',
    processLead: 'The project starts small enough to test and structured enough to become a system.',
    steps: [
      { index: '01', title: 'Diagnosis', description: 'Problem, context, assets, constraints, and a meaningful success signal.' },
      { index: '02', title: 'Strategy', description: 'Offer, audience, message, journey, and solution architecture.' },
      { index: '03', title: 'Production', description: 'Identity, content, flows, automation, and operational assets.' },
      { index: '04', title: 'Implementation', description: 'Integration into the tools, channels, and routines already in place.' },
      { index: '05', title: 'Improvement', description: 'Evidence, learning, and the next iteration with a clear priority.' },
    ] satisfies StudioStep[],
    partnershipEyebrow: 'WHITE-LABEL PARTNERSHIP',
    partnershipTitle: 'Your agency stays in front. The Studio expands the capacity behind it.',
    partnershipBody: 'Strategic and operational support for agencies that need to deliver branding, content, CRM, or automation without inflating fixed overhead.',
    partnershipPoints: [
      'Modular scope and explicit responsibility boundaries.',
      'Discrete, documented operations adapted to the agency’s method.',
      'Delivery with checkpoints, QA, and asset handoff.',
    ],
    partnershipBadge: 'STRATEGY + PRODUCTION + IMPLEMENTATION',
    ctaEyebrow: 'START SMALL · PROVE VALUE · SCALE WITH CONTROL',
    ctaTitle: 'Let’s turn one real workstream into a pilot project.',
    ctaBody: 'In an initial conversation, we assess the problem, the most promising asset, and the smallest scope capable of producing useful evidence.',
    ctaButton: 'Let’s assess a pilot project', ctaAlt: 'Explore the full portfolio',
    legalNote: 'Pierrondi Studio is an author-led strategy, creation, and implementation practice within pierrondi.dev.',
  },
} as const

export function getStudioHref(lang: StudioLang) {
  return lang === 'pt' ? '/studio' : '/en/studio'
}

export function getStudioContactHref(lang: StudioLang) {
  return lang === 'pt' ? '/contato?context=studio-piloto' : '/en/contato?context=studio-pilot'
}
