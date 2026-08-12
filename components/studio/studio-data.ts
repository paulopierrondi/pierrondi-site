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

export interface StudioCreativeProofItem {
  id: string
  index: string
  layout: 'atlas' | 'product' | 'portrait' | 'review' | 'diptych' | 'demo'
  label: string
  title: string
  caption: string
  sources: {
    src: string
    alt: string
  }[]
}

export interface StudioCreativeSystem {
  eyebrow: string
  title: string
  lead: string
  visualLabel: string
  visualCaption: string
  visualAlt: string
  proofEyebrow: string
  proofTitle: string
  proofLead: string
  proofNote: string
  proofItems: StudioCreativeProofItem[]
  capabilityLabel: string
  formatLabel: string
  proofLabel: string
  note: string
  systems: {
    id: string
    index: string
    title: string
    strapline: string
    description: string
    stages: string[]
    formats: string[]
    proof: string
  }[]
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
      creative: 'Sistema criativo',
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
          'Vídeos curtos, campanhas, roteiros, narração, legendas, cortes e variações planejados desde o início para cada canal.',
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
    creativeSystem: {
      eyebrow: 'PIERRONDI STUDIO / SISTEMA CRIATIVO',
      title: 'Uma ideia central. Uma cadeia de produção que a mantém inteira.',
      lead:
        'Os produtos criativos funcionam como uma mesa de produção: a mensagem orienta a direção visual, o roteiro organiza o movimento e o QA protege cada variação antes do handoff.',
      visualLabel: 'VISUAL EDITORIAL AUTORAL',
      visualCaption:
        'Composição criada para esta vitrine. Ela representa a linguagem de produção do Studio; não é foto de cliente nem prova de resultado de campanha.',
      visualAlt:
        'Visual editorial autoral de uma mesa de produção audiovisual, com storyboard, celular, paleta de cor e detalhes de edição.',
      proofEyebrow: 'CADERNO DE CAMPO / PROVA VISUAL',
      proofTitle: 'Direção, frame e sistema deixam rastros visíveis.',
      proofLead:
        'Cenas autorais do Studio convivem com artefatos públicos de produto. Cada quadro identifica com precisão se mostra uma cena de processo, uma interface de produto ou um ambiente demonstrativo.',
      proofNote:
        'Cenas autorais foram criadas para esta vitrine e não documentam uma produção, campanha ou cliente específico. Os artefatos de produto aparecem somente com a classificação indicada.',
      proofItems: [
        {
          id: 'direction-notebook',
          index: '02',
          layout: 'atlas',
          label: 'CENA AUTORAL DO STUDIO · DIREÇÃO',
          title: 'Caderno de direção',
          caption:
            'Referências, sequência, paleta e pontos de corte organizados como linguagem de produção — não como registro de uma campanha de cliente.',
          sources: [
            {
              src: '/portfolio/studio/pierrondi-studio-storyboard-atlas-v1.webp',
              alt: 'Cena autoral de direção audiovisual com parede de referências, contato de imagens, paleta de cor e mesa de trabalho.',
            },
          ],
        },
        {
          id: 'cantustudio-feature',
          index: '03',
          layout: 'product',
          label: 'ARTEFATO PÚBLICO DE PRODUTO · CANTUSTUDIO',
          title: 'Composição para produto',
          caption:
            'Arte pública do CantuStudio usada aqui como evidência visual de composição e superfície de produto; não é uma alegação de performance.',
          sources: [
            {
              src: '/portfolio/cantustudio/feature-graphic.png',
              alt: 'Arte de produto pública do CantuStudio mostrando um fluxo móvel de harmonização entre importação, revisão e exportação.',
            },
          ],
        },
        {
          id: 'cantustudio-vertical',
          index: '04',
          layout: 'portrait',
          label: 'CRIATIVO AUTORAL DE PRODUTO · CANTUSTUDIO',
          title: 'Criativo vertical',
          caption:
            'Frame vertical de produto para mostrar ritmo, hierarquia e leitura mobile; sem alegação de campanha ou resultado de mídia.',
          sources: [
            {
              src: '/portfolio/cantustudio/melodia-satb.png',
              alt: 'Criativo vertical do CantuStudio mostrando entrada de melodia e o caminho para harmonização SATB.',
            },
          ],
        },
        {
          id: 'review-console',
          index: '05',
          layout: 'review',
          label: 'CENA AUTORAL DO STUDIO · REVIEW + QA',
          title: 'Sala de revisão',
          caption:
            'Um visual de processo para o momento em que grade, som, quadro e entrega recebem revisão antes do handoff.',
          sources: [
            {
              src: '/portfolio/studio/pierrondi-studio-review-console-v1.webp',
              alt: 'Cena autoral de pós-produção com monitor abstrato, contato de imagens, formas de onda e superfície de revisão.',
            },
          ],
        },
        {
          id: 'faithschool-diptych',
          index: '06',
          layout: 'diptych',
          label: 'ARTEFATO PÚBLICO DE PRODUTO · FAITHSCHOOL',
          title: 'Sistema em duas superfícies',
          caption:
            'Duas telas públicas do FaithSchool, apresentadas como evidência de interface e organização de produto — sem atribuir métricas ou resultados de adoção.',
          sources: [
            {
              src: '/portfolio/faithschool/app-home.png',
              alt: 'Tela pública inicial do app FaithSchool com painel Today e cartões de rotina.',
            },
            {
              src: '/portfolio/faithschool/app-planner.png',
              alt: 'Tela pública de planejamento do app FaithSchool com cartões de ritmo e cronograma.',
            },
          ],
        },
        {
          id: 'luar-demo',
          index: '07',
          layout: 'demo',
          label: 'DEMO CONCEITUAL · LUAR DO CAMPO',
          title: 'Direção de marca em superfície',
          caption:
            'Ambiente demonstrativo de storefront para mostrar direção editorial. Pagamentos, frete, estoque e pedidos são simulados.',
          sources: [
            {
              src: '/portfolio/luar-do-campo/storefront-desktop.png',
              alt: 'Demo conceitual do Luar do Campo com storefront editorial e uma modelo em vestido marfim.',
            },
          ],
        },
      ] satisfies StudioCreativeProofItem[],
      capabilityLabel: 'CAPACIDADE',
      formatLabel: 'SAÍDAS',
      proofLabel: 'CONTROLE',
      note:
        'Todo material externo permanece sujeito a escopo, direitos de uso, revisão de marca e aprovação humana antes de publicação.',
      systems: [
        {
          id: 'creative-forge',
          index: '01',
          title: 'Creative Forge',
          strapline: 'Do briefing à superfície editorial.',
          description:
            'Transforma uma direção de mensagem em peças de imagem com composição, tipografia e variantes de formato — sem começar do zero a cada canal.',
          stages: ['Brief e mensagem', 'Direção visual', 'Composição editorial', 'Variações + QA'],
          formats: ['Feed e carrossel', 'Deck e institucional', 'Formatos sociais'],
          proof: 'Sistema de criação local com revisão antes de qualquer uso externo.',
        },
        {
          id: 'creative-video-factory',
          index: '02',
          title: 'Creative Video Factory',
          strapline: 'Do roteiro ao master, com espaço para variar.',
          description:
            'Organiza briefing, hook, roteiro, voz, legendas, render e cortes em uma cadeia audiovisual que produz um master consistente e versões orientadas por canal.',
          stages: ['Brief e hook', 'Roteiro e direção', 'Voz + legendas', 'Render + QA'],
          formats: ['Vertical 9:16', 'Master + variações', 'Reels, Shorts e TikTok'],
          proof: 'Pipeline local com gates de formato, mensagem e aprovação humana.',
        },
        {
          id: 'content-engine',
          index: '03',
          title: 'Pierrondi Content Engine',
          strapline: 'Criação em fila; publicação separada.',
          description:
            'Mantém briefing, roteiro, copy, direção visual e QA em uma fila editorial. Criar um ativo não equivale a publicar: a decisão externa permanece controlada.',
          stages: ['Brief operacional', 'Roteiro e copy', 'Direção visual', 'QA + aprovação'],
          formats: ['Pacote de produção', 'Assets por canal', 'Handoff organizado'],
          proof: 'Fila local com criação, aprovação e publicação deliberadamente separadas.',
        },
        {
          id: 'brand-os',
          index: '04',
          title: 'Pierrondi Brand OS',
          strapline: 'Identidade que orienta cada superfície.',
          description:
            'Conecta identidade, presença e conteúdo por meio de tokens, regras e superfícies reutilizáveis para que a linguagem da marca sobreviva ao volume de entregas.',
          stages: ['Princípios de marca', 'Tokens e regras', 'Superfícies de canal', 'QA + aprovação'],
          formats: ['Kits de marca', 'Guides de produção', 'Presença por canal'],
          proof: 'Sistema local testado com ações externas mantidas sob aprovação.',
        },
      ] satisfies StudioCreativeSystem['systems'],
    } satisfies StudioCreativeSystem,
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
    nav: { services: 'Capabilities', creative: 'Creative system', cases: 'Cases', process: 'Method', partnership: 'White-label' },
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
        description: 'Short-form video, campaigns, scripts, narration, captions, edits, and variations planned for each channel from the start.',
        deliverables: ['Script and direction', 'Voice and captions', 'Channel variants'], signal: 'one idea, multiple outputs',
      },
      {
        id: 'automation', index: '04', label: 'OPERATIONS', title: 'AI and commercial automation',
        description: 'CRM, pre-qualification, Salesbots, intelligent flows, knowledge bases, and copilots connected to human handoffs.',
        deliverables: ['CRM and pipelines', 'Salesbots and copilots', 'Knowledge base and gates'], signal: 'automation with control',
      },
    ] satisfies StudioFront[],
    creativeSystem: {
      eyebrow: 'PIERRONDI STUDIO / CREATIVE SYSTEM',
      title: 'One central idea. One production chain that keeps it whole.',
      lead:
        'The creative products work as one production desk: the message guides the visual direction, the script organizes movement, and QA protects every variation before handoff.',
      visualLabel: 'AUTHORIAL EDITORIAL VISUAL',
      visualCaption:
        'A composition created for this showcase. It represents the Studio production language; it is not client photography or campaign-performance proof.',
      visualAlt:
        'Authorial editorial visual of an audiovisual production desk with a storyboard, phone, colour palette, and editing details.',
      proofEyebrow: 'FIELD NOTES / VISUAL PROOF',
      proofTitle: 'Direction, frame, and system leave visible traces.',
      proofLead:
        'Authorial Studio scenes sit alongside public product artifacts. Every frame identifies whether it shows a process scene, a product interface, or a demonstration environment.',
      proofNote:
        'Authorial scenes were created for this showcase and do not document a specific client production or campaign. Product artifacts appear only with the classification shown.',
      proofItems: [
        {
          id: 'direction-notebook',
          index: '02',
          layout: 'atlas',
          label: 'AUTHORIAL STUDIO SCENE · DIRECTION',
          title: 'Direction notebook',
          caption:
            'References, sequencing, colour, and cut points organized as a production language—not as a record of a client campaign.',
          sources: [
            {
              src: '/portfolio/studio/pierrondi-studio-storyboard-atlas-v1.webp',
              alt: 'Authorial audiovisual direction scene with a wall of references, image contact sheets, colour palette, and work table.',
            },
          ],
        },
        {
          id: 'cantustudio-feature',
          index: '03',
          layout: 'product',
          label: 'PUBLIC PRODUCT ARTIFACT · CANTUSTUDIO',
          title: 'Product composition',
          caption:
            'A public CantuStudio product asset used here as visual evidence of composition and product surface, not as a performance claim.',
          sources: [
            {
              src: '/portfolio/cantustudio/feature-graphic.png',
              alt: 'Public CantuStudio product artwork showing a mobile harmonization flow from import through review and export.',
            },
          ],
        },
        {
          id: 'cantustudio-vertical',
          index: '04',
          layout: 'portrait',
          label: 'AUTHORIAL PRODUCT CREATIVE · CANTUSTUDIO',
          title: 'Vertical creative',
          caption:
            'A vertical product frame showing rhythm, hierarchy, and mobile reading—with no campaign or media-performance claim.',
          sources: [
            {
              src: '/portfolio/cantustudio/melodia-satb.png',
              alt: 'CantuStudio vertical product creative showing melody input and the path to SATB harmonization.',
            },
          ],
        },
        {
          id: 'review-console',
          index: '05',
          layout: 'review',
          label: 'AUTHORIAL STUDIO SCENE · REVIEW + QA',
          title: 'Review room',
          caption:
            'A process visual for the moment grade, sound, frame, and delivery receive review before handoff.',
          sources: [
            {
              src: '/portfolio/studio/pierrondi-studio-review-console-v1.webp',
              alt: 'Authorial post-production scene with an abstract monitor, image contact sheet, waveforms, and review surface.',
            },
          ],
        },
        {
          id: 'faithschool-diptych',
          index: '06',
          layout: 'diptych',
          label: 'PUBLIC PRODUCT ARTIFACT · FAITHSCHOOL',
          title: 'System across two surfaces',
          caption:
            'Two public FaithSchool screens shown as interface and product-organization evidence, without adoption or performance metrics.',
          sources: [
            {
              src: '/portfolio/faithschool/app-home.png',
              alt: 'Public FaithSchool app home screen with the Today dashboard and routine cards.',
            },
            {
              src: '/portfolio/faithschool/app-planner.png',
              alt: 'Public FaithSchool planning screen with rhythm cards and schedule.',
            },
          ],
        },
        {
          id: 'luar-demo',
          index: '07',
          layout: 'demo',
          label: 'CONCEPTUAL DEMO · LUAR DO CAMPO',
          title: 'Brand direction on a surface',
          caption:
            'A demonstration storefront used to show editorial direction. Payments, freight, inventory, and orders are simulated.',
          sources: [
            {
              src: '/portfolio/luar-do-campo/storefront-desktop.png',
              alt: 'Luar do Campo conceptual demo with an editorial storefront and a model in an ivory dress.',
            },
          ],
        },
      ] satisfies StudioCreativeProofItem[],
      capabilityLabel: 'CAPABILITY',
      formatLabel: 'OUTPUTS',
      proofLabel: 'CONTROL',
      note:
        'Every external asset remains subject to scope, usage rights, brand review, and human approval before publication.',
      systems: [
        {
          id: 'creative-forge',
          index: '01',
          title: 'Creative Forge',
          strapline: 'From brief to editorial surface.',
          description:
            'Turns a message direction into image pieces with composition, typography, and format variants—without starting from scratch for every channel.',
          stages: ['Brief and message', 'Visual direction', 'Editorial composition', 'Variants + QA'],
          formats: ['Feed and carousel', 'Deck and institutional', 'Social formats'],
          proof: 'Local creation system with review before any external use.',
        },
        {
          id: 'creative-video-factory',
          index: '02',
          title: 'Creative Video Factory',
          strapline: 'From script to master, with room to vary.',
          description:
            'Organizes brief, hook, script, voice, captions, render, and cuts into an audiovisual chain that creates a consistent master and channel-aware versions.',
          stages: ['Brief and hook', 'Script and direction', 'Voice + captions', 'Render + QA'],
          formats: ['Vertical 9:16', 'Master + variations', 'Reels, Shorts, and TikTok'],
          proof: 'Local pipeline with format, message, and human-approval gates.',
        },
        {
          id: 'content-engine',
          index: '03',
          title: 'Pierrondi Content Engine',
          strapline: 'Creation in queue; publishing kept separate.',
          description:
            'Keeps brief, script, copy, visual direction, and QA in one editorial queue. Creating an asset does not publish it: the external decision remains controlled.',
          stages: ['Operational brief', 'Script and copy', 'Visual direction', 'QA + approval'],
          formats: ['Production package', 'Channel assets', 'Organized handoff'],
          proof: 'Local queue that deliberately separates creation, approval, and publishing.',
        },
        {
          id: 'brand-os',
          index: '04',
          title: 'Pierrondi Brand OS',
          strapline: 'Identity that guides every surface.',
          description:
            'Connects identity, presence, and content through tokens, rules, and reusable surfaces so the brand language holds through a growing volume of work.',
          stages: ['Brand principles', 'Tokens and rules', 'Channel surfaces', 'QA + approval'],
          formats: ['Brand kits', 'Production guides', 'Channel presence'],
          proof: 'Tested local system with external actions kept under approval.',
        },
      ] satisfies StudioCreativeSystem['systems'],
    } satisfies StudioCreativeSystem,
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
