export type HomeLang = 'pt' | 'en'

export interface HomeExperienceCopy {
  htmlLang: string
  nav: {
    aria: string
    home: string
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
    email: string
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
      design: 'Design',
      sada: 'SADA',
      agents: 'Agentes',
      llm: 'LLM',
      automation: 'Automação',
      contact: 'Contato',
      linkedinAria: 'LinkedIn de Paulo Pierrondi',
    },
    hero: {
      kicker: 'ServiceNow / IA corporativa / Estratégia de plataforma',
      ariaLabel: 'IA corporativa não escala só por modelos.',
      headlineLines: [
        [{ text: 'IA' }, { text: 'corporativa' }],
        [{ text: 'não' }, { text: 'escala' }, { text: 'só' }],
        [{ text: 'por' }, { text: 'modelos.', accent: true }],
      ],
      lead:
        'Ela escala quando governança, contexto operacional e execução em workflow andam juntos. Sou Technical Account Executive na ServiceNow, trabalhando na interseção entre estratégia, plataforma, dados e adoção.',
      note:
        'Este é meu site pessoal, baseado em materiais públicos, frameworks próprios e na minha perspectiva profissional. Não é um canal oficial da ServiceNow e não inclui informação confidencial.',
      linkedIn: 'Conectar no LinkedIn',
      email: 'Enviar email',
      agentPanelLabel: 'Modelo operacional de agentes',
      agentSignals: [
        ['Intenção', 'porta de entrada'],
        ['Contexto', 'service graph'],
        ['Política', 'controle de IA'],
        ['Ação', 'workflow'],
        ['Evidência', 'trilha auditável'],
      ],
    },
    sections: {
      lens: {
        eyebrow: 'Minha lente',
        title: 'A conversa deixou de ser sobre IA. Agora é sobre trabalho delegado.',
        copy:
          'O ponto crítico não é quantos agentes existem. É se a organização sabe onde eles podem atuar, quais dados podem usar, quem aprova exceções, como evidenciam valor e como aprendem sem perder controle.',
      },
      operating: {
        eyebrow: 'Modelo operacional',
        title: 'Agente autônomo exige base operacional: contexto, permissão, ação e evidência.',
        copy:
          'Essa é a forma como eu estruturo a conversa: antes de escalar autonomia, desenhar a cadeia que conecta intenção, dados, controle, workflow e resultado mensurável.',
      },
      themes: {
        eyebrow: 'Temas que importam agora',
        title: 'O ciclo da IA governada na ServiceNow.',
        copy:
          'Minha leitura das novidades públicas: a plataforma está se movendo de assistência pontual para execução governada, com dados vivos e agentes sob controle operacional.',
        identity: 'leitura executiva + arquitetura operacional',
      },
      achievements: {
        eyebrow: 'Feitos aplicados',
        title: 'Arquiteturas de valor que já construí, refinei e transformei em sistema.',
        copy:
          'Sem expor nomes: minha experiência inclui apoiar grandes enterprises e indústrias como FSI, Energy e Retail a avançarem na era da IA, dados e agentes. Abaixo estão os sistemas de pensamento e execução que eu levo para conversas de investimento, contratação e parceria.',
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
        title: 'Estratégia para plataforma',
        copy: 'Traduzir prioridades executivas em arquitetura, roadmap, governança e adoção real da ServiceNow.',
      },
      {
        number: '02',
        title: 'Agentes para operação',
        copy: 'Separar assistência, autonomia e controle: qual trabalho pode ser delegado, em que escopo e com qual evidência.',
      },
      {
        number: '03',
        title: 'Dados para contexto',
        copy: 'Conectar CMDB, Service Graph, CSDM e dados externos para reduzir decisão baseada em fragmentos.',
      },
      {
        number: '04',
        title: 'Adoção para valor',
        copy: 'Fazer inovação virar ritual operacional: ownership, processo, métrica, segurança e melhoria contínua.',
      },
    ],
    operatingLayers: [
      { label: '01', title: 'Intent', copy: 'A entrada precisa ser simples para o usuário e clara para a plataforma.' },
      { label: '02', title: 'Context', copy: 'O agente precisa enxergar serviço, ativo, risco, histórico e prioridade.' },
      { label: '03', title: 'Control', copy: 'Permissão, política, limite e aprovação definem onde autonomia termina.' },
      { label: '04', title: 'Action', copy: 'Execução acontece no workflow, não em uma conversa solta.' },
      { label: '05', title: 'Evidence', copy: 'Valor e confiança dependem de log, métrica, auditoria e aprendizado.' },
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
      design: 'Design',
      sada: 'SADA',
      agents: 'Agents',
      llm: 'LLM',
      automation: 'Automation',
      contact: 'Contact',
      linkedinAria: 'Paulo Pierrondi on LinkedIn',
    },
    hero: {
      kicker: 'ServiceNow / Enterprise AI / Platform strategy',
      ariaLabel: 'Enterprise AI does not scale on models alone.',
      headlineLines: [
        [{ text: 'Enterprise' }, { text: 'AI' }],
        [{ text: 'does' }, { text: 'not' }, { text: 'scale' }],
        [{ text: 'on' }, { text: 'models', accent: true }, { text: 'alone.', accent: true }],
      ],
      lead:
        'It scales when governance, operational context and workflow execution move together. I am a Technical Account Executive at ServiceNow, working at the intersection of strategy, platform, data and adoption.',
      note:
        'This is my personal site, based on public material, my own frameworks and my professional perspective. It is not an official ServiceNow channel and it does not include confidential information.',
      linkedIn: 'Connect on LinkedIn',
      email: 'Send email',
      agentPanelLabel: 'Agent operating model',
      agentSignals: [
        ['Intent', 'front door'],
        ['Context', 'service graph'],
        ['Policy', 'AI control'],
        ['Action', 'workflow'],
        ['Evidence', 'audit trail'],
      ],
    },
    sections: {
      lens: {
        eyebrow: 'My lens',
        title: 'The conversation stopped being about AI. It is now about delegated work.',
        copy:
          'The critical question is not how many agents exist. It is whether the organization knows where they can act, which data they can use, who approves exceptions, how they prove value and how they learn without losing control.',
      },
      operating: {
        eyebrow: 'Operating model',
        title: 'Autonomous agents need an operating base: context, permission, action and evidence.',
        copy:
          'This is how I structure the conversation: before scaling autonomy, design the chain that connects intent, data, control, workflow and measurable outcomes.',
      },
      themes: {
        eyebrow: 'What matters now',
        title: 'The cycle of governed AI on ServiceNow.',
        copy:
          'My read of the public announcements: the platform is moving from point assistance to governed execution, with live data and agents under operational control.',
        identity: 'executive reading + operating architecture',
      },
      achievements: {
        eyebrow: 'Applied work',
        title: 'Value architectures I have built, refined and turned into systems.',
        copy:
          'Without exposing names: my experience includes supporting large enterprises and industries such as FSI, Energy and Retail as they advance into AI, data and agents. Below are the thinking and execution systems I bring into investment, hiring and partnership conversations.',
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
        title: 'Platform strategy',
        copy: 'Translate executive priorities into architecture, roadmap, governance and real ServiceNow adoption.',
      },
      {
        number: '02',
        title: 'Agents for operations',
        copy: 'Separate assistance, autonomy and control: which work can be delegated, in which scope and with which evidence.',
      },
      {
        number: '03',
        title: 'Data for context',
        copy: 'Connect CMDB, Service Graph, CSDM and external data to reduce decisions based on fragments.',
      },
      {
        number: '04',
        title: 'Adoption for value',
        copy: 'Turn innovation into an operating ritual: ownership, process, metrics, security and continuous improvement.',
      },
    ],
    operatingLayers: [
      { label: '01', title: 'Intent', copy: 'The entry point must be simple for the user and clear for the platform.' },
      { label: '02', title: 'Context', copy: 'The agent needs to see service, asset, risk, history and priority.' },
      { label: '03', title: 'Control', copy: 'Permission, policy, limits and approval define where autonomy ends.' },
      { label: '04', title: 'Action', copy: 'Execution happens in the workflow, not in a loose conversation.' },
      { label: '05', title: 'Evidence', copy: 'Value and trust depend on logs, metrics, auditability and learning.' },
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
