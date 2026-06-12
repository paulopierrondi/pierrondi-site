export type HomeLang = 'pt' | 'en'

export interface HomeExperienceCopy {
  htmlLang: string
  nav: {
    aria: string
    home: string
    about: string
    design: string
    sada: string
    agents: string
    llm: string
    automation: string
    contact: string
    linkedinAria: string
  }
  hero: {
    kicker: string
    ariaLabel: string
    headlineLines: Array<Array<{ text: string; accent?: boolean }>>
    lead: string
    note: string
    linkedIn: string
    proofCta: string
    proofIntro: string
    proofStrip: Array<{ label: string; title: string; copy: string }>
    agentPanelLabel: string
    agentSignals: Array<[string, string]>
  }
  sections: {
    lens: {
      eyebrow: string
      title: string
      copy: string
    }
    operating: {
      eyebrow: string
      title: string
      copy: string
    }
    promotion: {
      eyebrow: string
      title: string
      copy: string
    }
    themes: {
      eyebrow: string
      title: string
      copy: string
      identity: string
    }
    achievements: {
      eyebrow: string
      title: string
      copy: string
      cta: string
      cards: Record<string, { label: string; title: string; copy: string }>
    }
    sources: {
      eyebrow: string
      title: string
      copy: string
    }
    contact: {
      eyebrow: string
      title: string
      copy: string
      proof: string[]
    }
  }
  themes: Array<{ label: string; title: string; copy: string }>
  focusAreas: Array<{ number: string; title: string; copy: string }>
  operatingLayers: Array<{ label: string; title: string; copy: string }>
  promotionOutcomes: Array<{ label: string; title: string; copy: string }>
  form: {
    serviceValue: string
    subject: string
    fallbackCompany: string
    fallbackMessage: string
    errors: {
      name: string
      email: string
      message: string
    }
    fields: {
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      company: string
      companyPlaceholder: string
      message: string
      messagePlaceholder: string
      submit: string
      submitting: string
      success: string
      errorPrefix: string
    }
  }
  footer: {
    site: string
    disclaimer: string
  }
}

export const homeExperienceCopy: Record<HomeLang, HomeExperienceCopy> = {
  pt: {
    htmlLang: 'pt-BR',
    nav: {
      aria: 'Navegação principal',
      home: 'Início',
      about: 'Sobre',
      design: 'Design',
      sada: 'SADA',
      agents: 'Agentes',
      llm: 'LLM',
      automation: 'Automação',
      contact: 'Contato',
      linkedinAria: 'LinkedIn de Paulo Pierrondi',
    },
    hero: {
      kicker: 'AI Operating Model | AgentOps | FSI',
      ariaLabel: 'Transformo IA enterprise em modelo operacional.',
      headlineLines: [
        [{ text: 'Transformo' }, { text: 'IA' }],
        [{ text: 'enterprise' }, { text: 'em' }],
        [{ text: 'modelo' }, { text: 'operacional.', accent: true }],
      ],
      lead:
        'ServiceNow TAE / Enterprise Architect construindo AgentOps, fluxos de delivery acceleration, AI control towers e sistemas de implementação para ambientes enterprise regulados.',
      note:
        'Opero na interseção de estratégia, plataforma, dados e execução. Este é meu site pessoal; não é canal oficial da ServiceNow e não inclui informação confidencial.',
      linkedIn: 'Conectar no LinkedIn',
      proofCta: 'Ver modelo operacional',
      proofIntro: 'Operating model -> adoption velocity -> revenue expansion.',
      proofStrip: [
        { label: 'AI Operating Model', title: 'Categoria própria', copy: 'Método antes da ferramenta' },
        { label: 'Adoption Velocity', title: 'Piloto para ritual', copy: 'Cadência, ownership e métrica' },
        { label: 'AgentOps', title: 'Governed agents', copy: 'Policies, evals and gates' },
        { label: 'CSDM / CMDB', title: 'Operational backbone', copy: 'Context before action' },
        { label: 'LLMOps', title: 'Model orchestration', copy: 'Cost, fallback and trace' },
        { label: 'Revenue Expansion', title: 'Valor de plataforma', copy: 'Roadmap, execucao e prova' },
      ],
      agentPanelLabel: 'AI Operating Model: pilot to governed execution',
      agentSignals: [
        ['Intent', 'usuário / sistema'],
        ['Context', 'Service Graph / CMDB'],
        ['Policy', 'acesso / risco / aprovação'],
        ['Action', 'workflow automation'],
        ['Evidence', 'audit trail / KPIs'],
      ],
    },
    sections: {
      lens: {
        eyebrow: 'Proof systems',
        title: 'A tese pública: IA só cria vantagem quando vira modelo operacional.',
        copy:
          'O posicionamento não é "sei usar IA". É saber converter estratégia em sistemas operacionais: agentes governados, aceleradores de implementação, modelos de adoção e trilhas de evidência para ambientes enterprise.',
      },
      operating: {
        eyebrow: 'Modelo operacional',
        title: 'Autonomia só entra em produção quando contexto, permissão, ação e evidência estão desenhados.',
        copy:
          'Essa é a forma como estruturo a conversa com executivos, arquitetos e times de entrega: antes de escalar agentes, desenhar a cadeia que conecta intenção, dados, controle, workflow, adoção e resultado mensurável.',
      },
      promotion: {
        eyebrow: 'Posicionamento executivo',
        title: 'De usuário avançado de IA para operador aplicado de AI Operating Model.',
        copy:
          'A narrativa defensável: maturidade prática acima da média em IA aplicada, convertida em capacidade repetível para acelerar adoção, reduzir risco operacional e abrir expansão de plataforma em contas enterprise.',
      },
      themes: {
        eyebrow: 'Temas que importam agora',
        title: 'O ciclo da IA governada na ServiceNow.',
        copy:
          'Minha leitura das novidades públicas: a plataforma está se movendo de assistência pontual para execução governada, com dados vivos e agentes sob controle operacional.',
        identity: 'leitura executiva + arquitetura operacional',
      },
      achievements: {
        eyebrow: 'Sistemas aplicados',
        title: 'Não é portfólio decorativo. São sistemas que viram conversa executiva, demo e execução.',
        copy:
          'Sem expor nomes: minha experiência inclui apoiar grandes enterprises e indústrias como FSI, Energy e Retail a avançarem em IA, dados e agentes. Abaixo estão os sistemas de pensamento e execução que levo para contratação, mobilidade interna, parceria e investimento.',
        cta: 'Abrir arquitetura',
        cards: {
          'sada-servicenow': {
            label: 'ServiceNow / SADA',
            title: 'SADA: arquitetura de valor para IA governada',
            copy:
              'Um framework prescritivo para conectar estratégia, decisões de arquitetura, execução em workflow e valor mensurável.',
          },
          'agentes-governados': {
            label: 'AgentOps / Governança',
            title: 'Agentes governados a partir de dados e contexto',
            copy:
              'Estudo de dados, inferência contextual, políticas, avaliação e human gates para autonomia que deixa rastro.',
          },
          'llm-inferencia': {
            label: 'LLM inference / Operação',
            title: 'Inferência de LLM como camada operacional',
            copy:
              'Roteamento, custo, observabilidade e fallback para que modelos entrem no fluxo sem virar dependência invisível.',
          },
          'plataformas-automacao-ia': {
            label: 'Automação / Plataformas',
            title: 'Plataformas de automação com IA',
            copy:
              'Arquiteturas que conectam dados, modelos, integrações e execução para tirar trabalho de aplicações isoladas.',
          },
        },
      },
      sources: {
        eyebrow: 'Referências públicas',
        title: 'A base da conversa vem dos anúncios oficiais.',
        copy:
          'Os temas acima refletem anúncios públicos recentes da ServiceNow sobre governança de IA, Autonomous Workforce, dados em tempo real, system of action para agentes e experiências AI-native.',
      },
      contact: {
        eyebrow: 'Contato executivo',
        title: 'Vamos conversar sobre IA que vira execução governada.',
        copy:
          'Use o formulário ou email direto para oportunidades, investimento, parcerias, arquitetura enterprise, ServiceNow, agentes governados, LLM inference ou plataformas de automação com IA.',
        proof: ['Resposta por email', 'Sem nomes de clientes', 'Contexto técnico + executivo'],
      },
    },
    themes: [
      {
        label: 'AI Control Tower',
        title: 'Controle antes da autonomia',
        copy:
          'Descobrir, observar, governar, proteger e medir agentes, modelos e workloads antes que eles virem mais uma camada invisível de risco.',
      },
      {
        label: 'Workflow Data Fabric',
        title: 'Contexto antes da decisão',
        copy:
          'Dados conectados, semântica operacional e contexto em tempo real para que agentes decidam com base no que a empresa realmente sabe.',
      },
      {
        label: 'Autonomous Workforce',
        title: 'Execução antes do hype',
        copy:
          'Especialistas de IA só importam quando resolvem trabalho fim a fim com identidade, permissão, escopo e trilha auditável.',
      },
      {
        label: 'Service Graph e CSDM',
        title: 'Fundação antes da escala',
        copy:
          'Serviços, ownership, dependências e dados operacionais bem modelados continuam separando demo bonita de operação confiável.',
      },
    ],
    focusAreas: [
      {
        number: '01',
        title: 'Agentes governados',
        copy: 'Desenhar agentes com escopo, contexto, guardrails, avaliação e auditoria antes de entregar autonomia.',
      },
      {
        number: '02',
        title: 'Delivery acceleration',
        copy: 'Transformar demanda em artefatos, templates, critérios de qualidade e handoffs repetíveis para implementação.',
      },
      {
        number: '03',
        title: 'Operating model de IA',
        copy: 'Construir cadência, ownership, métricas e governança para IA sair do piloto e entrar no ritual de execução.',
      },
      {
        number: '04',
        title: 'Arquitetura ServiceNow',
        copy: 'Conectar CSDM, CMDB, Workflow Data Fabric, Now Assist e Action Fabric em narrativa de valor mensurável.',
      },
    ],
    operatingLayers: [
      { label: '01', title: 'Intent', copy: 'A entrada precisa ser simples para o usuário e clara para a plataforma.' },
      { label: '02', title: 'Context', copy: 'O agente precisa enxergar serviço, ativo, risco, histórico e prioridade.' },
      { label: '03', title: 'Control', copy: 'Permissão, política, limite e aprovação definem onde autonomia termina.' },
      { label: '04', title: 'Action', copy: 'Execução acontece no workflow, não em uma conversa solta.' },
      { label: '05', title: 'Evidence', copy: 'Valor e confiança dependem de log, métrica, auditoria e aprendizado.' },
    ],
    promotionOutcomes: [
      {
        label: 'Adoption velocity',
        title: 'Acelerar adoção sem vender hype',
        copy:
          'Converter tese executiva em casos de uso, artefatos, owners, cadência e critérios de avanço para sair de piloto isolado.',
      },
      {
        label: 'Governed execution',
        title: 'Levar IA para o workflow com controle',
        copy:
          'Definir onde agentes podem agir, quando precisam de aprovação, quais dados usam e qual evidência deixam para auditoria.',
      },
      {
        label: 'Revenue expansion',
        title: 'Amarrar IA a valor de plataforma',
        copy:
          'Transformar adoção governada em roadmap, expansão, serviços, confiança executiva e novas conversas de valor.',
      },
    ],
    form: {
      serviceValue: 'portfolio-executivo-ai',
      subject: 'Contato via pierrondi.dev',
      fallbackCompany: 'Não informado',
      fallbackMessage: 'Quero conversar sobre...',
      errors: {
        name: 'Me diga seu nome.',
        email: 'Use um email válido.',
        message: 'Me diga o contexto da conversa.',
      },
      fields: {
        name: 'Nome',
        namePlaceholder: 'Seu nome',
        email: 'Email',
        emailPlaceholder: 'voce@empresa.com',
        company: 'Empresa ou contexto',
        companyPlaceholder: 'Empresa, fundo, time ou oportunidade',
        message: 'Mensagem',
        messagePlaceholder: 'Quero conversar sobre...',
        submit: 'Enviar email',
        submitting: 'Enviando...',
        success: 'Recebi. Vou responder pelo email informado.',
        errorPrefix: 'Não consegui enviar pelo formulário. Abri um email direto; se não abrir, use',
      },
    },
    footer: {
      site: 'pierrondi.dev',
      disclaimer:
        'Site pessoal. Email: <email>. ServiceNow e marcas relacionadas pertencem aos seus respectivos titulares.',
    },
  },
  en: {
    htmlLang: 'en-US',
    nav: {
      aria: 'Main navigation',
      home: 'Home',
      about: 'About',
      design: 'Design',
      sada: 'SADA',
      agents: 'Agents',
      llm: 'LLM',
      automation: 'Automation',
      contact: 'Contact',
      linkedinAria: 'Paulo Pierrondi on LinkedIn',
    },
    hero: {
      kicker: 'AI Operating Model | AgentOps | FSI',
      ariaLabel: 'I turn enterprise AI into an operating model.',
      headlineLines: [
        [{ text: 'I' }, { text: 'turn' }, { text: 'enterprise' }],
        [{ text: 'AI' }, { text: 'into' }, { text: 'an' }],
        [{ text: 'operating' }, { text: 'model.', accent: true }],
      ],
      lead:
        'ServiceNow TAE / Enterprise Architect building AgentOps, delivery acceleration workflows, AI control towers and implementation systems for regulated enterprise environments.',
      note:
        'I operate at the intersection of strategy, platform, data and execution. This is my personal site, not an official ServiceNow channel, and it does not include confidential information.',
      linkedIn: 'Connect on LinkedIn',
      proofCta: 'See operating model',
      proofIntro: 'Operating model -> adoption velocity -> revenue expansion.',
      proofStrip: [
        { label: 'AI Operating Model', title: 'Owned category', copy: 'Method before tooling' },
        { label: 'Adoption Velocity', title: 'Pilot to ritual', copy: 'Cadence, ownership and metrics' },
        { label: 'AgentOps', title: 'Governed agents', copy: 'Policies, evals and gates' },
        { label: 'CSDM / CMDB', title: 'Operational backbone', copy: 'Context before action' },
        { label: 'LLMOps', title: 'Model orchestration', copy: 'Cost, fallback and trace' },
        { label: 'Revenue Expansion', title: 'Platform value', copy: 'Roadmap, execution and proof' },
      ],
      agentPanelLabel: 'AI Operating Model: pilot to governed execution',
      agentSignals: [
        ['Intent', 'user / system'],
        ['Context', 'Service Graph / CMDB'],
        ['Policy', 'access / risk / approval'],
        ['Action', 'workflow automation'],
        ['Evidence', 'audit trail / KPIs'],
      ],
    },
    sections: {
      lens: {
        eyebrow: 'Proof systems',
        title: 'The public thesis: AI creates advantage when it becomes an operating model.',
        copy:
          'The positioning is not "I know how to use AI." It is the ability to turn strategy into operating systems: governed agents, implementation accelerators, adoption models and evidence trails for enterprise environments.',
      },
      operating: {
        eyebrow: 'Operating model',
        title: 'Autonomy reaches production only when context, permission, action and evidence are designed.',
        copy:
          'This is how I structure the conversation with executives, architects and delivery teams: before scaling agents, design the chain that connects intent, data, control, workflow, adoption and measurable outcomes.',
      },
      promotion: {
        eyebrow: 'Executive positioning',
        title: 'From advanced AI user to applied AI Operating Model operator.',
        copy:
          'The defensible narrative: above-average practical maturity in applied AI, converted into repeatable capability that accelerates adoption, lowers operational risk and opens platform expansion in enterprise accounts.',
      },
      themes: {
        eyebrow: 'What matters now',
        title: 'The cycle of governed AI on ServiceNow.',
        copy:
          'My read of the public announcements: the platform is moving from point assistance to governed execution, with live data and agents under operational control.',
        identity: 'executive reading + operating architecture',
      },
      achievements: {
        eyebrow: 'Applied systems',
        title: 'This is not a decorative portfolio. These are systems for executive conversation, demos and execution.',
        copy:
          'Without exposing names: my experience includes supporting large enterprises and industries such as FSI, Energy and Retail as they advance into AI, data and agents. Below are the thinking and execution systems I bring into hiring, internal mobility, partnership and investment conversations.',
        cta: 'Open architecture',
        cards: {
          'sada-servicenow': {
            label: 'ServiceNow / SADA',
            title: 'SADA: value architecture for governed AI',
            copy:
              'A prescriptive framework that connects strategy, architecture decisions, workflow execution and measurable value.',
          },
          'agentes-governados': {
            label: 'AgentOps / Governance',
            title: 'Governed agents from data and context',
            copy:
              'Data study, contextual inference, policies, evaluation and human gates for autonomy that leaves an audit trail.',
          },
          'llm-inferencia': {
            label: 'LLM inference / Operations',
            title: 'LLM inference as an operating layer',
            copy:
              'Routing, cost control, observability and fallbacks so models enter the workflow without becoming an invisible dependency.',
          },
          'plataformas-automacao-ia': {
            label: 'Automation / Platforms',
            title: 'AI automation platforms',
            copy:
              'Architectures that connect data, models, integrations and execution to move work out of isolated applications.',
          },
        },
      },
      sources: {
        eyebrow: 'Public references',
        title: 'The conversation is grounded in official announcements.',
        copy:
          'The themes above reflect recent public ServiceNow announcements about AI governance, Autonomous Workforce, real-time data, system of action for agents and AI-native experiences.',
      },
      contact: {
        eyebrow: 'Executive contact',
        title: 'Let’s talk about AI that becomes governed execution.',
        copy:
          'Use the form or direct email for opportunities, investment, partnerships, enterprise architecture, ServiceNow, governed agents, LLM inference or AI automation platforms.',
        proof: ['Email response', 'No client names', 'Technical + executive context'],
      },
    },
    themes: [
      {
        label: 'AI Control Tower',
        title: 'Control before autonomy',
        copy:
          'Discover, observe, govern, protect and measure agents, models and workloads before they become another invisible layer of risk.',
      },
      {
        label: 'Workflow Data Fabric',
        title: 'Context before decisions',
        copy:
          'Connected data, operational semantics and real-time context so agents can decide based on what the company actually knows.',
      },
      {
        label: 'Autonomous Workforce',
        title: 'Execution before hype',
        copy:
          'AI specialists matter only when they solve work end to end with identity, permission, scope and an auditable trail.',
      },
      {
        label: 'Service Graph and CSDM',
        title: 'Foundation before scale',
        copy:
          'Well-modeled services, ownership, dependencies and operational data still separate a polished demo from reliable operations.',
      },
    ],
    focusAreas: [
      {
        number: '01',
        title: 'Governed agents',
        copy: 'Design agents with scope, context, guardrails, evaluation and auditability before handing them autonomy.',
      },
      {
        number: '02',
        title: 'Delivery acceleration',
        copy: 'Turn demand into artifacts, templates, quality criteria and repeatable handoffs for implementation.',
      },
      {
        number: '03',
        title: 'AI operating model',
        copy: 'Build cadence, ownership, metrics and governance so AI leaves pilot mode and enters execution rituals.',
      },
      {
        number: '04',
        title: 'ServiceNow architecture',
        copy: 'Connect CSDM, CMDB, Workflow Data Fabric, Now Assist and Action Fabric into measurable value narratives.',
      },
    ],
    operatingLayers: [
      { label: '01', title: 'Intent', copy: 'The entry point must be simple for the user and clear for the platform.' },
      { label: '02', title: 'Context', copy: 'The agent needs to see service, asset, risk, history and priority.' },
      { label: '03', title: 'Control', copy: 'Permission, policy, limits and approval define where autonomy ends.' },
      { label: '04', title: 'Action', copy: 'Execution happens in the workflow, not in a loose conversation.' },
      { label: '05', title: 'Evidence', copy: 'Value and trust depend on logs, metrics, auditability and learning.' },
    ],
    promotionOutcomes: [
      {
        label: 'Adoption velocity',
        title: 'Accelerate adoption without selling hype',
        copy:
          'Convert executive thesis into use cases, artifacts, owners, cadence and advancement criteria to move beyond isolated pilots.',
      },
      {
        label: 'Governed execution',
        title: 'Move AI into workflow with control',
        copy:
          'Define where agents can act, when they need approval, what data they use and what evidence they leave behind.',
      },
      {
        label: 'Revenue expansion',
        title: 'Tie AI to platform value',
        copy:
          'Turn governed adoption into roadmap, expansion, services, executive confidence and new value conversations.',
      },
    ],
    form: {
      serviceValue: 'executive-ai-portfolio',
      subject: 'Contact via pierrondi.dev',
      fallbackCompany: 'Not provided',
      fallbackMessage: 'I want to discuss...',
      errors: {
        name: 'Tell me your name.',
        email: 'Use a valid email.',
        message: 'Tell me the context for the conversation.',
      },
      fields: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@company.com',
        company: 'Company or context',
        companyPlaceholder: 'Company, fund, team or opportunity',
        message: 'Message',
        messagePlaceholder: 'I want to discuss...',
        submit: 'Send email',
        submitting: 'Sending...',
        success: 'Received. I will reply to the email provided.',
        errorPrefix: 'I could not submit the form. I opened a direct email; if it does not open, use',
      },
    },
    footer: {
      site: 'pierrondi.dev',
      disclaimer:
        'Personal site. Email: <email>. ServiceNow and related marks belong to their respective owners.',
    },
  },
}

export const sourceLinks = [
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx',
    label: 'AI Control Tower',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-brings-Autonomous-Workforce-to-every-major-business-function/default.aspx',
    label: 'Autonomous Workforce',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-the-real-time-data-foundation-that-puts-autonomous-AI-to-work-across-the-enterprise/default.aspx',
    label: 'Workflow Data Fabric',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-opens-its-full-system-of-action-to-every-AI-Agent-in-the-enterprise/default.aspx',
    label: 'Action Fabric',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-moves-beyond-the-sidecar-AI-era-giving-customers-a-complete-AI-native-experience-across-all-products-and-packages/default.aspx',
    label: 'AI-native platform',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-extends-agentic-AI-governance-from-desktops-to-data-centers-with-NVIDIA/default.aspx',
    label: 'Project Arc',
  },
]
