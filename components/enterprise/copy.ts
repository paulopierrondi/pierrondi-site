export type HomeLang = 'pt' | 'en'

export const homeCopy: Record<HomeLang, {
  hero: {
    eyebrow: string
    title: string[]
    lead: string
    primaryCta: string
    secondaryCta: string
    micro: string[]
  }
  bio: {
    eyebrow: string
    lede: string
    paragraphs: string[]
    creds: Array<{ k: string; v: string }>
    status: string
    loc: string
  }
  operatingModel: {
    eyebrow: string
    title: string
    copy: string
    nodes: Array<{ num: string; title: string; copy: string }>
    flow: string[]
  }
  systems: {
    eyebrow: string
    title: string
    copy: string
    cards: Array<{ title: string; copy: string; tags: string[]; icon: 'chip' | 'nodes' | 'shield' | 'strategy' }>
  }
  themes: {
    eyebrow: string
    title: string
    items: Array<{ label: string; title: string; copy: string }>
  }
  proof: {
    eyebrow: string
    title: string
    copy: string
    metrics: Array<{ value: string; label: string; count?: number }>
    convictions: string[]
  }
  contact: {
    eyebrow: string
    title: string
    copy: string
    primaryCta: string
    secondaryCta: string
    proof: string[]
  }
}> = {
  pt: {
    hero: {
      eyebrow: 'AI OPERATING MODEL · AGENTOPS · FSI',
      title: ['Transformo IA', 'enterprise em', 'modelo operacional.'],
      lead: 'ServiceNow TAE / Enterprise Architect. Construo AgentOps, fluxos de aceleração de delivery, AI control towers e sistemas de implementação para ambientes enterprise regulados.',
      primaryCta: 'Conectar no LinkedIn',
      secondaryCta: 'Ver o modelo',
      micro: ['Operating model', 'adoption velocity', 'revenue expansion'],
    },
    bio: {
      eyebrow: 'BIO / QUEM OPERA',
      lede: 'Passei a carreira na fronteira entre o que a tecnologia promete e o que a operação aguenta. É ali que IA enterprise vira valor — ou vira risco.',
      paragraphs: [
        'Sou carioca, vivi anos em Dublin e hoje opero de São Paulo. Comecei na interseção entre negócio e plataforma e nunca saí dela: aprendi cedo que arquitetura bonita não sobrevive ao contato com a realidade de uma grande empresa se não tiver contexto, governança e dono.',
        'Hoje sou Technical Account Executive / Enterprise Architect na ServiceNow, focado em serviços financeiros. Meu trabalho não é vender “usar IA” — é desenhar como a IA entra em trabalho real: contexto, política, permissões, memória, validação, custo e evidência. A tese que defendo em público é simples: IA só cria vantagem quando vira modelo operacional.',
        'Para sustentar isso, construo sistemas — frameworks de arquitetura de valor, AgentOps governados, pipelines de inferência e um “segundo cérebro” operacional que aprende, valida e melhora com o tempo. Método antes da ferramenta. Fora do enterprise, sou construtor: lanço produtos e apps, e levo a mesma disciplina de evidência para distribuição. Fé e família são a bússola; consistência é o critério.',
      ],
      creds: [
        { k: 'Função', v: 'TAE / Enterprise Architect' },
        { k: 'Setor', v: 'FSI · Serviços financeiros' },
        { k: 'Domínio', v: 'AgentOps · AI Control Tower' },
        { k: 'Fundação', v: 'CSDM · CMDB · Service Graph' },
      ],
      status: 'Disponível p/ conversas',
      loc: 'São Paulo · BR',
    },
    operatingModel: {
      eyebrow: 'MODELO OPERACIONAL',
      title: 'Autonomia só entra em produção quando contexto, permissão, ação e evidência estão desenhados.',
      copy: 'Antes de escalar agentes, eu desenho a cadeia que conecta intenção, dados, controle, workflow e resultado mensurável. É assim que estruturo a conversa com executivos, arquitetos e times de entrega.',
      nodes: [
        { num: '01', title: 'Intent', copy: 'A entrada precisa ser simples para o usuário e clara para a plataforma.' },
        { num: '02', title: 'Context', copy: 'O agente precisa enxergar serviço, ativo, risco, histórico e prioridade.' },
        { num: '03', title: 'Control', copy: 'Permissão, política, limite e aprovação definem onde a autonomia termina.' },
        { num: '04', title: 'Action', copy: 'A execução acontece no workflow, não em uma conversa solta.' },
        { num: '05', title: 'Evidence', copy: 'Valor e confiança dependem de log, métrica, auditoria e aprendizado.' },
      ],
      flow: ['Operating model', 'adoption velocity', 'revenue expansion'],
    },
    systems: {
      eyebrow: 'SISTEMAS APLICADOS',
      title: 'Não é portfólio decorativo. São sistemas que viram conversa executiva, demo e execução.',
      copy: 'Como eu penso arquitetura, governança e valor em IA enterprise — sem nomes de clientes, sem métricas confidenciais.',
      cards: [
        {
          title: 'LLM training, eval e inferência',
          copy: 'Avaliação, roteamento de modelos, prompts cacheáveis, pipelines de inferência e medição de qualidade antes de escalar autonomia.',
          tags: ['RAG', 'routing', 'evals', 'fallback', 'cost'],
          icon: 'chip',
        },
        {
          title: 'Agent Operating Systems',
          copy: 'Registry, scheduler, handoffs, memória, human gates e runners que transformam agentes em operação auditável.',
          tags: ['registry', 'human gates', 'audit', 'runners'],
          icon: 'nodes',
        },
        {
          title: 'ServiceNow e IA governada',
          copy: 'Now Assist, AI Agents, CSDM, CMDB e operating model conectados diretamente a resultados de negócio e adoção enterprise.',
          tags: ['Now Assist', 'CSDM', 'SADA', 'governance'],
          icon: 'shield',
        },
        {
          title: 'Estratégia e liderança',
          copy: 'Narrativa executiva, enablement de times e clareza técnica para decisões de alto impacto — a ponte entre board, arquitetura e entrega.',
          tags: ['strategy', 'enablement', 'governance', 'leadership'],
          icon: 'strategy',
        },
      ],
    },
    themes: {
      eyebrow: 'O QUE IMPORTA AGORA',
      title: 'O ciclo da IA governada: de assistência pontual para execução sob controle.',
      items: [
        { label: 'AI Control Tower', title: 'Controle antes da autonomia', copy: 'Descobrir, observar, governar, proteger e medir agentes, modelos e workloads antes que virem mais uma camada invisível de risco.' },
        { label: 'Workflow Data Fabric', title: 'Contexto antes da decisão', copy: 'Dados conectados, semântica operacional e contexto em tempo real para que agentes decidam com base no que a empresa realmente sabe.' },
        { label: 'Autonomous Workforce', title: 'Execução antes do hype', copy: 'Especialistas de IA só importam quando resolvem trabalho fim a fim com identidade, permissão, escopo e trilha auditável.' },
        { label: 'Service Graph & CSDM', title: 'Fundação antes da escala', copy: 'Serviços, ownership e dados operacionais bem modelados continuam separando demo bonita de operação confiável.' },
      ],
    },
    proof: {
      eyebrow: 'PROVA OPERACIONAL',
      title: 'O portfólio não é um PDF. É uma operação viva.',
      copy: 'Meu diferencial é unir estratégia enterprise, execução técnica e governança de agentes em um sistema que aprende, valida e melhora.',
      metrics: [
        { value: '5', label: 'estágios no operating model — de Intent a Evidence', count: 5 },
        { value: '4', label: 'pilares de atuação: estratégia, ServiceNow, AgentOps e liderança', count: 4 },
        { value: 'FSI', label: 'foco em serviços financeiros regulados' },
        { value: 'SADA', label: 'linguagem própria de arquitetura de valor para IA' },
      ],
      convictions: [
        'A diferença entre piloto e produção não é o modelo. É o operating model.',
        'A pergunta não é quanto custa a licença — é quanto vale a arquitetura.',
        'Não basta entregar slide. Entrego sistema operacional com trilha de evidência.',
      ],
    },
    contact: {
      eyebrow: 'CONTATO EXECUTIVO',
      title: 'Vamos conversar sobre IA que vira execução governada.',
      copy: 'Sobre estratégia de IA, ServiceNow, agentes governados e modelo operacional. Sem agenda comercial — uma boa conversa é sempre bem-vinda.',
      primaryCta: 'Conectar no LinkedIn',
      secondaryCta: 'Enviar email',
      proof: ['Resposta por email', 'Sem nomes de clientes', 'Contexto técnico + executivo'],
    },
  },
  en: {
    hero: {
      eyebrow: 'AI OPERATING MODEL · AGENTOPS · FSI',
      title: ['I turn enterprise AI', 'into an operating', 'model.'],
      lead: 'ServiceNow TAE / Enterprise Architect. I build AgentOps, delivery acceleration flows, AI control towers, and implementation systems for regulated enterprise environments.',
      primaryCta: 'Connect on LinkedIn',
      secondaryCta: 'See the model',
      micro: ['Operating model', 'adoption velocity', 'revenue expansion'],
    },
    bio: {
      eyebrow: 'BIO / WHO OPERATES',
      lede: 'I built my career at the boundary between what technology promises and what operations can absorb. That is where enterprise AI becomes value — or risk.',
      paragraphs: [
        'I am from Rio, lived for years in Dublin, and now operate from São Paulo. I started at the intersection of business and platform and never left: I learned early that beautiful architecture does not survive contact with the reality of a large enterprise without context, governance, and ownership.',
        'Today I am a Technical Account Executive / Enterprise Architect at ServiceNow, focused on financial services. My job is not to sell “using AI” — it is to design how AI enters real work: context, policy, permissions, memory, validation, cost, and evidence. The thesis I defend in public is simple: AI only creates advantage when it becomes an operating model.',
        'To sustain that, I build systems — value architecture frameworks, governed AgentOps, inference pipelines, and an operational second brain that learns, validates, and improves over time. Method before tool. Outside the enterprise, I am a builder: I launch products and apps, and bring the same evidence discipline to distribution. Faith and family are the compass; consistency is the filter.',
      ],
      creds: [
        { k: 'Role', v: 'TAE / Enterprise Architect' },
        { k: 'Sector', v: 'FSI · Financial services' },
        { k: 'Domain', v: 'AgentOps · AI Control Tower' },
        { k: 'Foundation', v: 'CSDM · CMDB · Service Graph' },
      ],
      status: 'Open for conversations',
      loc: 'São Paulo · BR',
    },
    operatingModel: {
      eyebrow: 'OPERATING MODEL',
      title: 'Autonomy only goes to production when context, permission, action, and evidence are designed.',
      copy: 'Before scaling agents, I design the chain that connects intent, data, control, workflow, and a measurable outcome. That is how I structure the conversation with executives, architects, and delivery teams.',
      nodes: [
        { num: '01', title: 'Intent', copy: 'The input must be simple for the user and clear to the platform.' },
        { num: '02', title: 'Context', copy: 'The agent must see service, asset, risk, history, and priority.' },
        { num: '03', title: 'Control', copy: 'Permission, policy, limit, and approval define where autonomy ends.' },
        { num: '04', title: 'Action', copy: 'Execution happens in the workflow, not in a loose conversation.' },
        { num: '05', title: 'Evidence', copy: 'Value and trust depend on logs, metrics, audit, and learning.' },
      ],
      flow: ['Operating model', 'adoption velocity', 'revenue expansion'],
    },
    systems: {
      eyebrow: 'APPLIED SYSTEMS',
      title: 'Not a decorative portfolio. Systems that become executive conversations, demos, and execution.',
      copy: 'How I think about architecture, governance, and value in enterprise AI — no client names, no confidential metrics.',
      cards: [
        {
          title: 'LLM training, eval & inference',
          copy: 'Evaluation, model routing, cacheable prompts, inference pipelines, and quality measurement before scaling autonomy.',
          tags: ['RAG', 'routing', 'evals', 'fallback', 'cost'],
          icon: 'chip',
        },
        {
          title: 'Agent Operating Systems',
          copy: 'Registry, scheduler, handoffs, memory, human gates, and runners that turn agents into auditable operations.',
          tags: ['registry', 'human gates', 'audit', 'runners'],
          icon: 'nodes',
        },
        {
          title: 'ServiceNow & governed AI',
          copy: 'Now Assist, AI Agents, CSDM, CMDB, and operating model connected directly to business outcomes and enterprise adoption.',
          tags: ['Now Assist', 'CSDM', 'SADA', 'governance'],
          icon: 'shield',
        },
        {
          title: 'Strategy & leadership',
          copy: 'Executive narrative, team enablement, and technical clarity for high-impact decisions — the bridge between board, architecture, and delivery.',
          tags: ['strategy', 'enablement', 'governance', 'leadership'],
          icon: 'strategy',
        },
      ],
    },
    themes: {
      eyebrow: 'WHAT MATTERS NOW',
      title: 'The governed AI cycle: from point assistance to controlled execution.',
      items: [
        { label: 'AI Control Tower', title: 'Control before autonomy', copy: 'Discover, observe, govern, protect, and measure agents, models, and workloads before they become another invisible risk layer.' },
        { label: 'Workflow Data Fabric', title: 'Context before decision', copy: 'Connected data, operational semantics, and real-time context so agents decide based on what the company actually knows.' },
        { label: 'Autonomous Workforce', title: 'Execution before hype', copy: 'AI specialists only matter when they solve work end-to-end with identity, permission, scope, and an auditable trail.' },
        { label: 'Service Graph & CSDM', title: 'Foundation before scale', copy: 'Well-modeled services, ownership, and operational data still separate a pretty demo from reliable operations.' },
      ],
    },
    proof: {
      eyebrow: 'OPERATIONAL PROOF',
      title: 'The portfolio is not a PDF. It is a living operation.',
      copy: 'My edge is combining enterprise strategy, technical execution, and agent governance into a system that learns, validates, and improves.',
      metrics: [
        { value: '5', label: 'stages in the operating model — from Intent to Evidence', count: 5 },
        { value: '4', label: 'pillars: strategy, ServiceNow, AgentOps, and leadership', count: 4 },
        { value: 'FSI', label: 'focus on regulated financial services' },
        { value: 'SADA', label: 'proprietary value architecture language for AI' },
      ],
      convictions: [
        'The difference between pilot and production is not the model. It is the operating model.',
        'The question is not how much the license costs — it is how much the architecture is worth.',
        'I do not deliver slides. I deliver operating systems with evidence trails.',
      ],
    },
    contact: {
      eyebrow: 'EXECUTIVE CONTACT',
      title: "Let's talk about AI that becomes governed execution.",
      copy: 'About AI strategy, ServiceNow, governed agents, and operating models. No sales agenda — a good conversation is always welcome.',
      primaryCta: 'Connect on LinkedIn',
      secondaryCta: 'Send email',
      proof: ['Reply by email', 'No client names', 'Technical + executive context'],
    },
  },
}
