'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleGauge,
  Cpu,
  DatabaseZap,
  GitBranch,
  Languages,
  Layers3,
  Network,
  Radar,
  ShieldCheck,
  TerminalSquare,
  Workflow,
  Zap,
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styles from './WhyPauloExperience.module.css'

type Lang = 'pt' | 'en'

const copy = {
  pt: {
    language: {
      aria: 'Selecionar idioma da pagina',
      short: 'PT-BR',
    },
    hero: {
      kicker: 'O caso para me colocar como a pessoa de IA da ServiceNow — provado em FSI Brasil',
      title:
        'Todo vendor tem uma narrativa de IA. Raro é encontrar quem opera o sistema onde a barra é mais alta.',
      lead:
        'A ServiceNow já tem base instalada, contexto de workflow e confiança enterprise para vencer a era agentic. O que ela precisa agora é velocidade governada: alguém que traduza IA em execução real em um ambiente de alta exigência — FSI brasileiro top-tier, pressão de escala, BACEN e LGPD. Eu converso com executivos sobre valor, traduzo isso para plataforma e opero agentes/LLMs com guardrails, evidência e disciplina de produção. Essa é a maturidade que a virada agentic precisa.',
      primaryCta: 'Ver como eu venceria',
      secondaryCta: 'Por que eu',
      signals: ['Opera IA diariamente', 'Fala com C-level', 'Entrega agentes governados', 'Mede em receita'],
    },
    pressurePanel: {
      header: 'Leitura viva do mercado',
      items: [
        ['Clientes', 'já criando workflows de IA fora da plataforma'],
        ['Competidores', 'empacotando construtores de apps agenticos'],
        ['ServiceNow', 'capaz de converter contexto de workflow em execução governada'],
      ],
    },
    market: {
      kicker: 'O panorama',
      title: 'A virada agentica ja esta dentro das contas.',
      intro:
        'Esta é a leitura que eu levaria para a liderança no primeiro dia: IA já mudou como clientes imaginam software, a velocidade que esperam de protótipos e como um concorrente pode capturar silenciosamente fatias de valor de workflow. A janela para liderar, em vez de apenas defender, está aberta agora.',
      items: [
        {
          icon: Zap,
          title: 'O relógio é o concorrente real',
          copy:
            'Em poucos meses, a conversa saiu de roadmap de IA para experimentação viva. O risco para a ServiceNow não é falta de feature. É a velocidade com que outros entram dentro das contas.',
        },
        {
          icon: TerminalSquare,
          title: 'Clientes agora constroem sem nos',
          copy:
            'LLMs locais, ambientes de vibe-code e frameworks de agentes permitem que negócio e TI prototipem workflows antes mesmo da conversa de plataforma começar. Cada um desses workflows poderia ser ServiceNow.',
        },
        {
          icon: Radar,
          title: 'Concorrentes atacam primeiro pelas bordas',
          copy:
            'Ferramentas agenticas não substituem o estate inteiro no primeiro dia. Elas entram em intake, aprovações, requests, reporting e pequenos legados — depois expandem. É assim que bases instaladas erodem sem barulho.',
        },
        {
          icon: Layers3,
          title: 'O upside é maior que o risco',
          copy:
            'Bem conduzida, essa pressão vira a maior onda de modernização em anos: retirar SaaS fragmentado e legado, governar autonomia e expandir a partir do contexto de workflow que só a ServiceNow tem.',
        },
      ],
    },
    agent: {
      kicker: 'Como eu rodaria a cadeira',
      title: 'Nao mais uma demo de IA. Um movimento repetivel de modernizacao de clientes.',
      intro:
        'Meu playbook é simples e escala: achar onde clientes estão construindo ao redor da ServiceNow, mostrar o que pode ser retirado e mover esse trabalho para agentes e workflows governados na plataforma. IA deixa de ser experimento e vira defesa de base instalada mais expansão — medida em pipeline, não em slides.',
      metricsAria: 'Sinais de execucao',
      theaterAria: 'Modelo visual de agentes executando modernizacao de clientes',
      queueAria: 'Fila de tarefas dos agentes',
    },
    serviceNow: {
      kicker: 'Posicao ServiceNow',
      title: 'A ServiceNow está vencendo. A peça que falta é tradução.',
      intro:
        'A leitura equilibrada e direta: a ServiceNow é líder com uma base instalada séria e uma vantagem de workflow que ninguém mais tem. A exposição real é velocidade — competidores agenticos e IA criada pelos próprios clientes andam mais rápido que movimentos clássicos de transformação. Fechar esse gap depende menos de mais features e mais de alguém que traduza capacidade de IA em resultado enterprise.',
      items: [
        {
          icon: BadgeCheck,
          title: 'Uma líder com base instalada séria',
          copy:
            'ServiceNow tem confiança enterprise, profundidade de workflow, contexto de dados, relevância executiva e footprint respeitado. Essa é a base para vencer a virada agentic.',
        },
        {
          icon: CircleGauge,
          title: 'O desafio é velocidade',
          copy:
            'O mercado acelerou mais que ciclos clássicos de transformação. Clientes já conseguem construir ao redor, e concorrentes podem embalar agentes contra partes da nossa base instalada.',
        },
        {
          icon: DatabaseZap,
          title: 'O moat é execução governada',
          copy:
            'A história vencedora não é "mais features de IA". É execução enterprise segura: dados, workflow, identidade, auditoria, human gates e outcomes mensuráveis.',
        },
        {
          icon: ChartNoAxesCombined,
          title: 'O field motion precisa mudar',
          copy:
            'Vender IA exige descoberta mais aguda, provas mais críveis, demos mais fortes e caminho claro de modelo operacional para velocidade de adoção e expansão de receita.',
        },
      ],
    },
    plan: {
      kicker: 'Meu plano na cadeira',
      title: 'Transformar urgência de IA em adoção ServiceNow e expansão.',
      intro:
        'Aqui conhecimento de cliente e maturidade operacional em IA deixam de ser linha de currículo e viram movimento de campo. Cinco movimentos, conta por conta, para defender base instalada e abrir crescimento novo.',
      steps: [
        {
          phase: '01',
          icon: Radar,
          title: 'Mapear a pressão',
          copy:
            'Identificar onde cada cliente já está construindo ao redor da ServiceNow, quais apps legados ou SaaS estão vulneráveis e onde concorrentes agenticos podem entrar.',
        },
        {
          phase: '02',
          icon: Network,
          title: 'Escolher os plays de substituição',
          copy:
            'Priorizar workflows que a ServiceNow pode absorver com dados de plataforma, agentes governados e ownership de negócio mais claro.',
        },
        {
          phase: '03',
          icon: BrainCircuit,
          title: 'Construir provas críveis',
          copy:
            'Transformar problemas específicos de clientes em demos de agentes, narrativas de adoção e POVs executivos reais o bastante para mover decisões.',
        },
        {
          phase: '04',
          icon: ShieldCheck,
          title: 'Governar a autonomia',
          copy:
            'Desenhar human gates, fronteiras de dados, telemetria, evidência de auditoria e caminhos de recuperação antes de prometer execução autônoma.',
        },
        {
          phase: '05',
          icon: ChartNoAxesCombined,
          title: 'Converter em expansão',
          copy:
            'Conectar modelo operacional à velocidade de adoção, e depois converter velocidade de adoção em expansão e defesa da base instalada.',
        },
      ],
    },
    ninety: {
      kicker: 'Primeiros 90 dias',
      title: 'O que voce veria de mim no primeiro trimestre.',
      intro:
        'Sem teatro de ramp-up. Um plano time-boxed que produz uma prova governada e um field motion repetível antes do trimestre fechar.',
      phases: [
        {
          window: 'Dias 0-30',
          title: 'Ouvir, mapear e escolher os beachheads',
          points: [
            'Sentar com líderes de campo e contas prioritárias; mapear exatamente onde clientes já criam IA ao redor da ServiceNow.',
            'Escolher os 3-5 plays de substituição de maior alavancagem por região e o legado ou SaaS que cada um retira.',
            'Estabelecer guardrails de governança — human gates, fronteiras de dados e auditoria — para nada nascer sem controle.',
          ],
        },
        {
          window: 'Dias 30-60',
          title: 'Entregar prova que move deal',
          points: [
            'Transformar um problema real de cliente em agente governado funcionando — workflow real, dado real permitido e nada de slideware.',
            'Parear com AEs e SCs para colocar a prova diante de comprador econômico e amarrar a pipeline.',
            'Codificar descoberta e demo em um kit que o campo consiga rodar sem mim na sala.',
          ],
        },
        {
          window: 'Dias 60-90',
          title: 'Virar motion repetível',
          points: [
            'Levar o play para uma segunda e terceira conta; medir velocidade de adoção e sinal de expansão.',
            'Publicar o modelo operacional: como a ServiceNow posiciona, governa e expande trabalho agentico.',
            'Entregar ao campo um motion que defende base instalada e abre crescimento novo — reportado em termos de receita.',
          ],
        },
      ],
    },
    operating: {
      kicker: 'Como eu opero IA de verdade',
      title: 'Eu rodo IA governada todos os dias — e traria essa disciplina para dentro.',
      intro:
        'Mostro o padrão operacional, não a maquinaria confidencial. O ponto é que trato IA como enterprise precisa tratar: contexto, roteamento, guardrails, evidência e tradução de negócio — não prompts e vibes.',
      signals: [
        { label: 'Contexto', copy: 'narrativa de cliente, pressão na base instalada, memória de projeto e plays reutilizáveis' },
        { label: 'Roteamento', copy: 'modelo certo, agente certo, ferramenta certa e fronteira de risco certa para cada tarefa' },
        { label: 'Governança', copy: 'aprovações humanas, disciplina de no-secrets, evidência de auditoria e limites de produção' },
        { label: 'Evidência', copy: 'artefatos funcionando, testes, QA visual, notas e próximas ações antes de dizer que está pronto' },
      ],
    },
    proof: {
      kicker: 'Por que eu, especificamente',
      title: 'A combinação que quase ninguém tem — as quatro ao mesmo tempo.',
      intro:
        'Muita gente tem uma ou duas dessas dimensões. O valor está em segurar as quatro juntas: fluência de IA, maturidade de cliente, profundidade de plataforma e disciplina de entrega. É exatamente nessa interseção que a ServiceNow precisa vencer a era agentic — e é onde eu já opero.',
      pillars: [
        ['Maturidade de IA', 'Comportamento de LLMs, modelos locais/Llama, Kimi, GPT, Gemini, Claude, roteamento estilo LiteLLM, evals, custo e limites de contexto.'],
        ['Maturidade de cliente', 'Framing executivo, qualidade de discovery, barreiras de adoção, desenho de operating model e tradução de valor.'],
        ['Maturidade de plataforma', 'Now Assist, AI Agents, CMDB/CSDM, contexto de workflow, governança e caminhos de modernização.'],
        ['Maturidade de execução', 'Preflight, handoffs, trilhas de evidência, QA visual, limites de segurança e operação disciplinada de agentes.'],
      ],
    },
    stack: {
      kicker: 'O que levo no primeiro dia',
      title: 'Fluente em IA o bastante para tornar a ServiceNow mais valiosa — rápido.',
      items: [
        'Estratégia de plataforma ServiceNow',
        'Posicionamento Now Assist / AI Agents',
        'Defesa de base instalada',
        'Retirada de legado e SaaS fragmentado',
        'CSDM e CMDB como framing de valor',
        'Modernizacao de workflows agenticos',
        'Literacia em Llama e modelos locais',
        'Pensamento de gateway estilo LiteLLM',
        'Sistemas operacionais multiagente',
        'Prompt caching e controle de custo',
        'Governança human-in-the-loop',
        'Storytelling executivo de cliente',
        'Demos de campo e plays de adocao',
        'Modelo operacional para expansão de receita',
      ],
    },
    author: {
      kicker: 'O pedido',
      title: 'Me coloque como a pessoa de IA da ServiceNow.',
      copy:
        'Sou Technical Account Executive da ServiceNow em FSI Brasil, com profundidade prática em IA, LLMs e operação de agentes. Não quero operar ao lado da plataforma. Quero fazer a plataforma virar o lugar onde agentes governados criam valor enterprise mensurável. Dada a cadeira certa, eu transformo urgência de IA em velocidade de adoção, defesa de base instalada e expansão — provado no ambiente onde a barra de governança é mais alta.',
      cta: 'Vamos falar sobre a cadeira',
      emailSubject: 'ServiceNow%20AI%20role%20conversation%20-%20FSI%2FBrazil-proven',
      badge: 'ServiceNow first. IA como alavanca. Receita como teste.',
    },
    agentNodes: [
      { label: 'Sinal da base', x: 12, y: 24, mobileX: 23, mobileY: 18, tone: 'cyan' },
      { label: 'LLMs locais + vibe-code', x: 28, y: 66, mobileX: 31, mobileY: 58, tone: 'danger' },
      { label: 'Concorrentes agenticos', x: 43, y: 22, mobileX: 72, mobileY: 16, tone: 'danger' },
      { label: 'Contexto ServiceNow', x: 52, y: 52, mobileX: 50, mobileY: 43, tone: 'main' },
      { label: 'Agentes governados', x: 74, y: 29, mobileX: 74, mobileY: 29, tone: 'lime' },
      { label: 'Retirada legado/SaaS', x: 84, y: 67, mobileX: 74, mobileY: 58, tone: 'brass' },
    ],
    agentQueue: [
      'captura de sinais de cliente',
      'analise de sprawl de apps',
      'tese de substituicao ServiceNow',
      'politica de agente e human gate',
      'POV executivo e plano de adocao',
    ],
    metrics: [
      ['FSI', 'ServiceNow em escala de banco brasileiro top-tier'],
      ['BACEN/LGPD', 'IA governada sob regulação real'],
      ['CMDB + Now Assist', 'profundidade de plataforma, não slideware'],
    ],
  },
  en: {
    language: {
      aria: 'Select page language',
      short: 'EN',
    },
    hero: {
      kicker: "The case to make me ServiceNow's AI person — proven in FSI Brazil",
      title:
        'Every vendor has an AI story. The rare thing is someone who operates the system where the bar is highest.',
      lead:
        'ServiceNow already has the install base, workflow context and enterprise trust to win the agentic era. What it needs now is governed speed: someone who can turn AI into real execution in a high-pressure environment — top-tier Brazilian FSI, scale pressure, BACEN and LGPD. I can speak with executives about value, translate that into platform strategy and operate agents/LLMs with guardrails, evidence and production discipline. That is the operating maturity the agentic shift needs.',
      primaryCta: "See how I'd win",
      secondaryCta: 'Why me',
      signals: ['Operates AI daily', 'Speaks to the C-suite', 'Ships governed agents', 'Measured in revenue'],
    },
    pressurePanel: {
      header: 'Live market readout',
      items: [
        ['Customers', 'already creating AI workflows outside the platform'],
        ['Competitors', 'packaging agentic app builders'],
        ['ServiceNow', 'able to turn workflow context into governed execution'],
      ],
    },
    market: {
      kicker: 'The panorama',
      title: 'The agentic shift is already inside your accounts.',
      intro:
        'This is the read I would bring to leadership on day one: AI has already changed how customers imagine software, how fast they expect prototypes, and how quietly a competitor can capture pieces of workflow value. The window to lead this, instead of only defend against it, is open right now.',
      items: [
        {
          icon: Zap,
          title: 'The clock is the real competitor',
          copy:
            'In a matter of months the customer conversation jumped from AI roadmap to live experimentation. The threat to ServiceNow is not a feature gap. It is the speed at which others are moving inside the accounts.',
        },
        {
          icon: TerminalSquare,
          title: 'Customers now build without us',
          copy:
            'Local LLMs, vibe-code environments and agent frameworks let business and IT teams prototype workflows before a platform conversation even starts. Every one of those is a workflow ServiceNow could have owned.',
        },
        {
          icon: Radar,
          title: 'Competitors attack the edges first',
          copy:
            'Agentic tools will not replace the estate on day one. They land on intake, approvals, service requests, reporting and small legacy workflows — then expand. That is how install bases erode quietly.',
        },
        {
          icon: Layers3,
          title: 'The upside dwarfs the risk',
          copy:
            'Handled right, this pressure becomes the biggest modernization wave in years: retire fragmented SaaS and legacy apps, govern autonomy, and expand out from the workflow context only ServiceNow holds.',
        },
      ],
    },
    agent: {
      kicker: "How I'd run the role",
      title: 'Not another AI demo. A repeatable customer modernization motion.',
      intro:
        'My playbook is simple and it scales: find where customers are quietly building around ServiceNow, show them what can be retired, and move that work onto governed agents and workflows on the platform. AI stops being a science project and becomes install-base defense plus expansion — measured in pipeline, not slides.',
      metricsAria: 'Execution signals',
      theaterAria: 'Visual model of agents executing customer modernization work',
      queueAria: 'Agent task queue',
    },
    serviceNow: {
      kicker: 'ServiceNow position',
      title: "You're winning. The one missing piece is a translator.",
      intro:
        'Let me be balanced and honest: ServiceNow is a leader with a serious install base and a workflow advantage no one else has. The real exposure is speed — agentic competitors and customer-built AI move faster than classic transformation motions. Closing that gap is less about more AI features and more about someone who can translate AI capability into enterprise outcomes.',
      items: [
        {
          icon: BadgeCheck,
          title: 'A leader with a serious install base',
          copy:
            'ServiceNow has enterprise trust, workflow depth, data context, executive relevance and a respected customer footprint. That is the foundation to win the agentic shift.',
        },
        {
          icon: CircleGauge,
          title: 'The challenge is speed',
          copy:
            'The market accelerated faster than classic transformation cycles. Customers can now build around us, and competitors can package agents against pieces of our install base.',
        },
        {
          icon: DatabaseZap,
          title: 'The moat is governed execution',
          copy:
            'The winning story is not "more AI features." It is secure enterprise execution: data, workflow, identity, audit, human gates and measurable business outcomes.',
        },
        {
          icon: ChartNoAxesCombined,
          title: 'The field motion must change',
          copy:
            'AI selling needs sharper discovery, stronger proofs, credible demos and a path from operating model to adoption velocity to revenue expansion.',
        },
      ],
    },
    plan: {
      kicker: 'My plan in the seat',
      title: 'Turn AI urgency into ServiceNow adoption and expansion.',
      intro:
        'This is where customer knowledge and AI operating maturity stop being a resume line and become a repeatable field motion. Five moves, run account by account, that defend the install base and open new growth.',
      steps: [
        {
          phase: '01',
          icon: Radar,
          title: 'Map the pressure',
          copy:
            'Identify where each customer is building around ServiceNow, which legacy or SaaS apps are vulnerable, and where agentic competitors could enter.',
        },
        {
          phase: '02',
          icon: Network,
          title: 'Pick the replacement plays',
          copy:
            'Prioritize workflows that ServiceNow can absorb with platform data, governed agents and clearer business ownership.',
        },
        {
          phase: '03',
          icon: BrainCircuit,
          title: 'Build credible proofs',
          copy:
            'Turn customer-specific problems into agent demos, adoption narratives and executive POVs that feel real enough to move decisions.',
        },
        {
          phase: '04',
          icon: ShieldCheck,
          title: 'Govern the autonomy',
          copy:
            'Design human gates, data boundaries, telemetry, audit evidence and recovery paths before promising autonomous execution.',
        },
        {
          phase: '05',
          icon: ChartNoAxesCombined,
          title: 'Convert into expansion',
          copy:
            'Connect the operating model to adoption velocity, then convert adoption velocity into expansion and install-base defense.',
        },
      ],
    },
    ninety: {
      kicker: 'First 90 days',
      title: "What you'd see from me in the first quarter.",
      intro:
        'No ramp-up theater. A time-boxed plan that produces a governed proof and a repeatable field motion before the quarter closes.',
      phases: [
        {
          window: 'Days 0-30',
          title: 'Listen, map, pick the beachheads',
          points: [
            'Sit with field leaders and priority accounts; map exactly where customers are already building AI around ServiceNow.',
            'Pick the 3-5 highest-leverage replacement plays per region and the legacy or SaaS they retire.',
            'Stand up the governance guardrails — human gates, data boundaries, audit — so nothing ships ungoverned.',
          ],
        },
        {
          window: 'Days 30-60',
          title: 'Ship proof that moves a deal',
          points: [
            'Turn one real customer problem into a working governed agent — permitted real workflow, permitted real data and no slideware.',
            'Pair with AEs and SCs to put that proof in front of an economic buyer and tie it to pipeline.',
            'Codify the discovery and demo into a kit the field can run without me in the room.',
          ],
        },
        {
          window: 'Days 60-90',
          title: 'Turn proof into a repeatable motion',
          points: [
            'Roll the play into a second and third account; track adoption velocity and the expansion signal.',
            'Publish the operating model: how ServiceNow positions, governs and expands agentic work.',
            'Hand the field a motion that defends the install base and opens new growth — reported in revenue terms.',
          ],
        },
      ],
    },
    operating: {
      kicker: 'How I actually operate AI',
      title: "I run governed AI every day — this is the discipline I'd bring in.",
      intro:
        "I'm showing the operating pattern, not the confidential machinery. The point is that I treat AI the way an enterprise has to: context, routing, guardrails, evidence and business translation — not prompts and vibes.",
      signals: [
        { label: 'Context', copy: 'customer narrative, install-base pressure, project memory and reusable plays' },
        { label: 'Routing', copy: 'right model, right agent, right tool and right risk boundary for each task' },
        { label: 'Governance', copy: 'human approval gates, no-secret discipline, audit evidence and production boundaries' },
        { label: 'Evidence', copy: 'working artifacts, tests, visual QA, notes and next actions before claiming done' },
      ],
    },
    proof: {
      kicker: 'Why me, specifically',
      title: 'The combination almost no one has — all four at once.',
      intro:
        'Plenty of people have one or two of these. The value is in holding all four together: AI fluency, customer maturity, platform depth and delivery discipline. That intersection is exactly where ServiceNow needs to win the agentic era — and it is where I already operate.',
      pillars: [
        ['AI maturity', 'LLM behavior, Llama/local models, Kimi, GPT, Gemini, Claude, LiteLLM-style routing, evals, cost and context limits.'],
        ['Customer maturity', 'Executive framing, discovery quality, adoption barriers, operating model design and value translation.'],
        ['Platform maturity', 'Now Assist, AI Agents, CMDB/CSDM, workflow context, governance and modernization paths.'],
        ['Execution maturity', 'Preflight, handoffs, evidence trails, visual QA, security boundaries and disciplined agent operations.'],
      ],
    },
    stack: {
      kicker: 'What I bring on day one',
      title: 'AI-fluent enough to make ServiceNow more valuable — fast.',
      items: [
        'ServiceNow platform strategy',
        'Now Assist / AI Agents positioning',
        'Install-base defense',
        'Legacy and SaaS retirement plays',
        'CSDM and CMDB value framing',
        'Agentic workflow modernization',
        'Llama and local model literacy',
        'LiteLLM-style gateway thinking',
        'Multi-agent operating systems',
        'Prompt caching and cost control',
        'Human-in-the-loop governance',
        'Executive customer storytelling',
        'Field demos and adoption plays',
        'Operating model to revenue expansion',
      ],
    },
    author: {
      kicker: 'The ask',
      title: "Make me ServiceNow's AI person.",
      copy:
        "I'm a ServiceNow Technical Account Executive in FSI Brazil with practical AI, LLM and agent operating depth. I do not want to sit beside the platform. I want to make the platform the place where governed agents create measurable enterprise value. Given the right role, I will turn AI urgency into adoption velocity, install-base defense and expansion — proven where the governance bar is highest.",
      cta: "Let's talk about the role",
      emailSubject: 'ServiceNow%20AI%20role%20conversation%20-%20FSI%2FBrazil-proven',
      badge: 'ServiceNow first. AI as leverage. Revenue as the test.',
    },
    agentNodes: [
      { label: 'Install-base signal', x: 12, y: 24, mobileX: 23, mobileY: 18, tone: 'cyan' },
      { label: 'Local AI + vibe-code builds', x: 28, y: 66, mobileX: 31, mobileY: 58, tone: 'danger' },
      { label: 'Agent competitors', x: 43, y: 22, mobileX: 72, mobileY: 16, tone: 'danger' },
      { label: 'ServiceNow workflow context', x: 52, y: 52, mobileX: 50, mobileY: 43, tone: 'main' },
      { label: 'Governed agents', x: 74, y: 29, mobileX: 74, mobileY: 29, tone: 'lime' },
      { label: 'Legacy/SaaS retirement', x: 84, y: 67, mobileX: 74, mobileY: 58, tone: 'brass' },
    ],
    agentQueue: [
      'customer signal intake',
      'application-sprawl analysis',
      'ServiceNow replacement thesis',
      'agent policy and human gate',
      'executive POV and adoption plan',
    ],
    metrics: [
      ['FSI', 'ServiceNow at top-tier Brazilian bank scale'],
      ['BACEN/LGPD', 'governed AI under real regulation'],
      ['CMDB + Now Assist', 'platform depth, not slideware'],
    ],
  },
} as const

const agentPaths = [
  'M12 24 C24 18 38 36 52 52',
  'M28 66 C38 60 44 56 52 52',
  'M43 22 C50 28 52 38 52 52',
  'M52 52 C62 42 68 34 74 29',
  'M52 52 C64 58 74 63 84 67',
]

const motionEase = [0.16, 1, 0.3, 1] as const
const revealViewport = { once: true, amount: 0.18 } as const

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: motionEase },
  },
}

const heroCopyReveal: Variants = {
  hidden: { opacity: 0, x: -34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: motionEase },
  },
}

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: motionEase },
  },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: motionEase },
  },
}

const staggerReveal: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

export default function WhyPauloExperience() {
  const [lang, setLang] = useState<Lang>('pt')
  const reducedMotion = useReducedMotion()
  const neuralDots = useMemo(() => Array.from({ length: 26 }, (_, index) => index), [])
  const t = copy[lang]
  const motionClass = reducedMotion ? styles.motionPaused : styles.motionEnabled

  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : 80])
  const heroFade = useTransform(heroProgress, [0, 1], [1, reducedMotion ? 1 : 0])
  const neuralY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : -120])
  const revealProps = reducedMotion
    ? { initial: 'visible' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: revealViewport }
  const loadProps = reducedMotion
    ? { initial: 'visible' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const }
  const cardHover = reducedMotion ? undefined : { y: -7, borderColor: 'rgba(200, 255, 46, 0.34)' }
  const softHover = reducedMotion ? undefined : { y: -3, scale: 1.015 }

  return (
    <main className={`${styles.page} ${motionClass}`}>
      <div className={styles.noise} aria-hidden="true" />

      <motion.section
        ref={heroRef}
        className={styles.hero}
        aria-labelledby="why-paulo-title"
        {...loadProps}
        variants={sectionReveal}
      >
        <motion.div className={styles.neuralMap} aria-hidden="true" style={{ y: neuralY, opacity: heroFade }}>
          {neuralDots.map((dot) => (
            <span key={dot} style={{ '--dot-index': dot } as CSSProperties} />
          ))}
        </motion.div>

        <motion.div className={styles.heroCopy} variants={heroCopyReveal} style={{ y: heroCopyY }}>
          <div className={styles.languageSwitch} aria-label={t.language.aria}>
            <Languages size={15} aria-hidden="true" />
            {(['pt', 'en'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={lang === option}
                onClick={() => setLang(option)}
              >
                {copy[option].language.short}
              </button>
            ))}
          </div>
          <p className={styles.kicker}>{t.hero.kicker}</p>
          <h1 id="why-paulo-title">{t.hero.title}</h1>
          <p className={styles.heroLead}>{t.hero.lead}</p>
          <div className={styles.heroActions}>
            <a href="#agentic-plan">
              {t.hero.primaryCta} <ArrowUpRight size={16} />
            </a>
            <a href="#why-me">{t.hero.secondaryCta}</a>
          </div>
          <div className={styles.signalStrip} aria-label="Positioning signals">
            {t.hero.signals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </motion.div>

        <motion.aside className={styles.pressurePanel} aria-label={t.pressurePanel.header} variants={panelReveal}>
          <div className={styles.pressureHeader}>
            <Cpu size={22} aria-hidden="true" />
            <span>{t.pressurePanel.header}</span>
          </div>
          <div className={styles.pressureGauge} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <ul>
            {t.pressurePanel.items.map(([label, detail]) => (
              <li key={label}>
                <strong>{label}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.aside>
      </motion.section>

      <motion.section className={styles.marketSection} aria-labelledby="market-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{t.market.kicker}</p>
          <h2 id="market-title">{t.market.title}</h2>
          <p>{t.market.intro}</p>
        </div>

        <motion.div className={styles.marketGrid} variants={staggerReveal}>
          {t.market.items.map((item) => {
            const Icon = item.icon
            return (
              <motion.article key={item.title} variants={cardReveal} whileHover={cardHover}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section className={styles.agentSection} aria-labelledby="agent-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.agentLayout}>
          <motion.div className={styles.agentNarrative} variants={heroCopyReveal}>
            <p className={styles.kicker}>{t.agent.kicker}</p>
            <h2 id="agent-title">{t.agent.title}</h2>
            <p>{t.agent.intro}</p>
            <div className={styles.theaterStats} aria-label={t.agent.metricsAria}>
              {t.metrics.map(([value, label]) => (
                <motion.div key={label} whileHover={softHover}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.agentTheater} aria-label={t.agent.theaterAria} variants={panelReveal}>
            <div className={styles.agentCanvas}>
              <svg className={styles.agentLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {agentPaths.map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    initial={reducedMotion ? undefined : { pathLength: 0.24, opacity: 0.28 }}
                    animate={
                      reducedMotion
                        ? undefined
                        : { pathLength: [0.24, 1, 0.42], opacity: [0.32, 0.86, 0.42] }
                    }
                    transition={{ duration: 4.2 + index * 0.34, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </svg>
              {t.agentNodes.map((node, index) => (
                <motion.div
                  key={node.label}
                  className={styles.agentNode}
                  data-tone={node.tone}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: [0.9, 1, 0.92],
                          borderColor: [
                            'rgba(247, 245, 238, 0.16)',
                            index === 3 ? 'rgba(200, 255, 46, 0.54)' : 'rgba(247, 245, 238, 0.3)',
                            'rgba(247, 245, 238, 0.16)',
                          ],
                        }
                  }
                  transition={{ duration: 3.8 + index * 0.22, repeat: Infinity, ease: 'easeInOut' }}
                  style={
                    {
                      '--x': `${node.x}%`,
                      '--y': `${node.y}%`,
                      '--mobile-x': `${node.mobileX}%`,
                      '--mobile-y': `${node.mobileY}%`,
                    } as CSSProperties
                  }
                >
                  <span />
                  <strong>{node.label}</strong>
                </motion.div>
              ))}
              <motion.div
                className={styles.executionCore}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        boxShadow: [
                          '0 0 0 rgba(200, 255, 46, 0)',
                          '0 0 34px rgba(200, 255, 46, 0.2)',
                          '0 0 0 rgba(200, 255, 46, 0)',
                        ],
                      }
                }
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <GitBranch size={18} aria-hidden="true" />
                <strong>agentic operating loop</strong>
                <span>discover - govern - prove - expand</span>
              </motion.div>
            </div>

            <motion.div className={styles.taskQueue} aria-label={t.agent.queueAria} variants={staggerReveal}>
              {t.agentQueue.map((task, index) => (
                <motion.div key={task} variants={cardReveal} whileHover={softHover} style={{ '--queue-index': index } as CSSProperties}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{task}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.serviceNowSection}
        id="service-now-position"
        aria-labelledby="service-now-title"
        {...revealProps}
        variants={sectionReveal}
      >
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{t.serviceNow.kicker}</p>
          <h2 id="service-now-title">{t.serviceNow.title}</h2>
          <p>{t.serviceNow.intro}</p>
        </div>

        <motion.div className={styles.serviceNowGrid} variants={staggerReveal}>
          {t.serviceNow.items.map((item) => {
            const Icon = item.icon
            return (
              <motion.article key={item.title} variants={cardReveal} whileHover={cardHover}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section className={styles.planSection} id="agentic-plan" aria-labelledby="plan-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{t.plan.kicker}</p>
          <h2 id="plan-title">{t.plan.title}</h2>
          <p>{t.plan.intro}</p>
        </div>

        <motion.div className={styles.planGrid} variants={staggerReveal}>
          {t.plan.steps.map((item) => {
            const Icon = item.icon
            return (
              <motion.article key={item.phase} className={styles.planStep} variants={cardReveal} whileHover={cardHover}>
                <span>{item.phase}</span>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section className={styles.ninetySection} aria-labelledby="ninety-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{t.ninety.kicker}</p>
          <h2 id="ninety-title">{t.ninety.title}</h2>
          <p>{t.ninety.intro}</p>
        </div>

        <motion.div className={styles.ninetyGrid} variants={staggerReveal}>
          {t.ninety.phases.map((phase) => (
            <motion.article key={phase.window} className={styles.ninetyCard} variants={cardReveal} whileHover={cardHover}>
              <span className={styles.ninetyWindow}>{phase.window}</span>
              <h3>{phase.title}</h3>
              <ul>
                {phase.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.operatingSection} aria-labelledby="operating-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{t.operating.kicker}</p>
          <h2 id="operating-title">{t.operating.title}</h2>
          <p>{t.operating.intro}</p>
        </div>

        <motion.div className={styles.operatingFlow} variants={staggerReveal}>
          {t.operating.signals.map((item, index) => (
            <motion.article key={item.label} variants={cardReveal} whileHover={softHover}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.proofSection} id="why-me" aria-labelledby="proof-title" {...revealProps} variants={sectionReveal}>
        <motion.div className={styles.proofIntro} variants={heroCopyReveal}>
          <p className={styles.kicker}>{t.proof.kicker}</p>
          <h2 id="proof-title">{t.proof.title}</h2>
          <p>{t.proof.intro}</p>
        </motion.div>
        <motion.div className={styles.proofGrid} variants={staggerReveal}>
          {t.proof.pillars.map(([title, pillarCopy]) => (
            <motion.article key={title} variants={cardReveal} whileHover={cardHover}>
              <BadgeCheck size={20} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{pillarCopy}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.stackSection} aria-labelledby="stack-title" {...revealProps} variants={sectionReveal}>
        <motion.div variants={heroCopyReveal}>
          <p className={styles.kicker}>{t.stack.kicker}</p>
          <h2 id="stack-title">{t.stack.title}</h2>
        </motion.div>
        <motion.div className={styles.stackCloud} variants={staggerReveal}>
          {t.stack.items.map((item) => (
            <motion.span key={item} variants={cardReveal} whileHover={softHover}>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.authorSection} aria-labelledby="author-title" {...revealProps} variants={sectionReveal}>
        <motion.div className={styles.authorPhoto} variants={panelReveal} whileHover={softHover}>
          <Image
            src="/assets/paulo-pierrondi-executive-neural.jpg"
            alt="Paulo Pierrondi"
            fill
            sizes="(max-width: 760px) 86vw, 340px"
          />
        </motion.div>
        <motion.div className={styles.authorPanel} variants={panelReveal}>
          <p className={styles.kicker}>{t.author.kicker}</p>
          <h2 id="author-title">{t.author.title}</h2>
          <p>{t.author.copy}</p>
          <div className={styles.authorActions}>
            <a href={`mailto:paulo@pierrondi.dev?subject=${t.author.emailSubject}`}>
              {t.author.cta} <ArrowUpRight size={16} />
            </a>
            <span>
              <Workflow size={16} aria-hidden="true" />
              {t.author.badge}
            </span>
          </div>
        </motion.div>
      </motion.section>
    </main>
  )
}
