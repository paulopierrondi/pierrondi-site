export type FeitoAccent = 'green' | 'cyan' | 'brass'

export interface FeitoNode {
  id: string
  label: string
  x: number
  y: number
  accent: FeitoAccent
}

export interface FeitoEdge {
  from: string
  to: string
  dashed?: boolean
}

export interface Feito {
  slug: string
  navLabel: string
  cardLabel: string
  cardTitle: string
  cardCopy: string
  kicker: string
  title: string
  headline: string
  lead: string
  englishAbstract: string
  marketLine: string
  proof: string
  diagram: {
    label: string
    nodes: FeitoNode[]
    edges: FeitoEdge[]
  }
  layers: Array<{
    label: string
    title: string
    copy: string
  }>
  workflow: Array<{
    title: string
    copy: string
  }>
  methods: string[]
  outcomes: string[]
}

export const feitos: Feito[] = [
  {
    slug: 'sada-servicenow',
    navLabel: 'SADA',
    cardLabel: 'ServiceNow / SADA',
    cardTitle: 'SADA: arquitetura de valor para IA governada',
    cardCopy:
      'Framework desenvolvido por Paulo Pierrondi para conectar estratégia, decisões de arquitetura, execução em workflow e valor mensurável.',
    kicker: 'Feito 01 / ServiceNow AI-Driven Architecture',
    title: 'SADA: ServiceNow AI-Driven Architecture',
    headline: 'Da visão executiva ao workflow medido.',
    lead:
      'Construí uma linguagem de arquitetura para posicionar ServiceNow como plataforma de estratégia + execução: contexto, governança, CSDM, IA, agentes e medição de valor no mesmo sistema.',
    englishAbstract:
      'A prescriptive enterprise architecture language for ServiceNow: strategic context, architecture decisions, execution model and measurable AI value acceleration.',
    marketLine:
      'Aplicável a grandes enterprises e indústrias como FSI, Energy e Retail, sem depender de nomes públicos para provar valor.',
    proof:
      'A tese nasceu de um gap real: empresas precisam de uma metodologia repetível para sair de iniciativas soltas de IA e entrar em arquitetura, governança e resultados de plataforma.',
    diagram: {
      label: 'SADA value architecture',
      nodes: [
        { id: 'vision', label: 'Vision', x: 54, y: 70, accent: 'brass' },
        { id: 'context', label: 'Context', x: 168, y: 44, accent: 'cyan' },
        { id: 'decisions', label: 'Architecture', x: 286, y: 70, accent: 'green' },
        { id: 'execution', label: 'Workflow', x: 306, y: 166, accent: 'green' },
        { id: 'value', label: 'Value', x: 168, y: 204, accent: 'brass' },
        { id: 'patterns', label: 'Patterns', x: 54, y: 166, accent: 'cyan' },
      ],
      edges: [
        { from: 'vision', to: 'context' },
        { from: 'context', to: 'decisions' },
        { from: 'decisions', to: 'execution' },
        { from: 'execution', to: 'value' },
        { from: 'value', to: 'patterns' },
        { from: 'patterns', to: 'vision', dashed: true },
        { from: 'context', to: 'value', dashed: true },
      ],
    },
    layers: [
      {
        label: '01',
        title: 'Vision & Context',
        copy: 'Objetivos estratégicos, maturidade, regulação, estratégia de instância e contexto operacional antes de escolher solução.',
      },
      {
        label: '02',
        title: 'Architecture Decisions',
        copy: 'Baseline CSDM, governança, AI adoption, fit de licença, integrações e limites de autonomia.',
      },
      {
        label: '03',
        title: 'Execution Model',
        copy: 'ITSM, ITOM, SPM, CSM, ESG, AI Agents e automação traduzidos em padrões reutilizáveis.',
      },
      {
        label: '04',
        title: 'Value Acceleration',
        copy: 'Hipóteses de valor, KPIs, time-to-value, impacto em UX, melhoria contínua e evidência executiva.',
      },
    ],
    workflow: [
      {
        title: 'Do contexto para princípios',
        copy: 'Transforma ambição executiva em regras simples que times de negócio, arquitetura e plataforma conseguem repetir.',
      },
      {
        title: 'Dos princípios para patterns',
        copy: 'Cria modelos de referência para instância, governança, AI adoption, integração e automação.',
      },
      {
        title: 'Dos patterns para valor',
        copy: 'Cada decisão vira uma hipótese: se aplicamos X, a organização deve obter Y, medido por indicadores concretos.',
      },
    ],
    methods: ['CSDM baseline', 'AI adoption patterns', 'Value hypotheses', 'KPI loops', 'Architecture principles'],
    outcomes: [
      'Menos discussão abstrata e mais linguagem comum entre estratégia, arquitetura e execução.',
      'Um catálogo reutilizável para acelerar decisões sem perder rigor de governança.',
      'Conexão explícita entre modelo operacional, velocidade de adoção e expansão de valor.',
    ],
  },
  {
    slug: 'agentes-governados',
    navLabel: 'Agentes governados',
    cardLabel: 'AgentOps / Governança',
    cardTitle: 'Agentes governados a partir de dados e contexto',
    cardCopy:
      'Estudo de dados, inferência contextual, políticas, avaliação e human gates para autonomia que deixa rastro.',
    kicker: 'Feito 02 / Governed agents',
    title: 'Agentes governados a partir de dados e contexto',
    headline: 'Autonomia só escala quando o agente sabe o que pode fazer.',
    lead:
      'Desenho agentes como sistemas operacionais: contexto confiável, escopo claro, permissão, avaliação, memória, runner e auditoria antes de qualquer ação sensível.',
    englishAbstract:
      'Governed agent systems built from operational data, inference boundaries, policy gates, evaluations and audit-ready execution.',
    marketLine:
      'Relevante para grandes enterprises, FSI, Energy e Retail, onde risco, escala e rastreabilidade importam tanto quanto produtividade.',
    proof:
      'A melhoria veio de parar de tratar agente como chat e passar a tratar agente como trabalhador digital com identidade, job description, limite e evidência.',
    diagram: {
      label: 'Governed agent loop',
      nodes: [
        { id: 'data', label: 'Data', x: 56, y: 74, accent: 'cyan' },
        { id: 'ontology', label: 'Ontology', x: 168, y: 42, accent: 'brass' },
        { id: 'agent', label: 'Agent', x: 286, y: 74, accent: 'green' },
        { id: 'policy', label: 'Policy', x: 310, y: 166, accent: 'brass' },
        { id: 'gate', label: 'Gate', x: 168, y: 206, accent: 'green' },
        { id: 'audit', label: 'Audit', x: 54, y: 166, accent: 'cyan' },
      ],
      edges: [
        { from: 'data', to: 'ontology' },
        { from: 'ontology', to: 'agent' },
        { from: 'agent', to: 'policy' },
        { from: 'policy', to: 'gate' },
        { from: 'gate', to: 'audit' },
        { from: 'audit', to: 'data', dashed: true },
        { from: 'ontology', to: 'gate', dashed: true },
      ],
    },
    layers: [
      {
        label: '01',
        title: 'Data study',
        copy: 'Mapear fontes, qualidade, ownership, semântica operacional, eventos e entidades que sustentam decisão.',
      },
      {
        label: '02',
        title: 'Inference boundary',
        copy: 'Definir o que o agente pode inferir, quando precisa perguntar, quando deve recusar e quando escalar.',
      },
      {
        label: '03',
        title: 'Policy and gates',
        copy: 'Políticas, permissões, thresholds, aprovação humana e trilhas de auditoria para operação regulada.',
      },
      {
        label: '04',
        title: 'Learning loop',
        copy: 'Evals, telemetria, feedback e revisão de incidentes para melhorar sem abrir mão de controle.',
      },
    ],
    workflow: [
      {
        title: 'Observa o trabalho real',
        copy: 'Antes do agente, entende-se a fila, a exceção, o risco, os dados e a decisão humana que existe hoje.',
      },
      {
        title: 'Cria uma fronteira de autonomia',
        copy: 'A tarefa é quebrada por risco: sugerir, preparar, executar com gate ou executar sozinho.',
      },
      {
        title: 'Opera com evidência',
        copy: 'Cada ação gera log, justificativa, input, output, policy result e próxima melhoria.',
      },
    ],
    methods: ['AgentOps', 'Policy gates', 'Eval suites', 'Audit trails', 'Context graphs'],
    outcomes: [
      'Agentes mais úteis porque trabalham dentro do contexto real da empresa.',
      'Menos risco operacional, pois autonomia vira contrato, não improviso.',
      'Maior confiança executiva para escalar agentes além de demos controladas.',
    ],
  },
  {
    slug: 'llm-inferencia',
    navLabel: 'LLM inference',
    cardLabel: 'LLMOps / Inference',
    cardTitle: 'Criação, avaliação e inferência de LLMs',
    cardCopy:
      'Pipelines de LLM com roteamento, RAG, prompt caching, evals, latência, custo e qualidade observável.',
    kicker: 'Feito 03 / LLM systems',
    title: 'Criação, avaliação e inferência de LLMs',
    headline: 'O trabalho científico está entre o modelo e a decisão.',
    lead:
      'Meu foco não é vender magia de modelo. É construir sistemas com LLMs: adaptação, grounding, avaliação, roteamento, inferência, cache, observabilidade e limites de confiança.',
    englishAbstract:
      'LLM systems for model adaptation, retrieval, routing, prompt caching, inference quality, latency/cost envelopes and evaluation-driven deployment.',
    marketLine:
      'Para enterprise, FSI, Energy e Retail, o diferencial está em saber quando usar modelo grande, modelo pequeno, RAG, tool use, cache ou bloqueio.',
    proof:
      'A evolução foi sair de prompts artesanais para um laboratório de decisão: datasets de teste, critérios de qualidade, ablation, rastreio de falha e custo por resultado.',
    diagram: {
      label: 'LLM inference lab',
      nodes: [
        { id: 'dataset', label: 'Eval set', x: 54, y: 70, accent: 'brass' },
        { id: 'retrieval', label: 'Retrieval', x: 166, y: 42, accent: 'cyan' },
        { id: 'router', label: 'Router', x: 286, y: 70, accent: 'green' },
        { id: 'model', label: 'Model', x: 310, y: 166, accent: 'cyan' },
        { id: 'cache', label: 'Cache', x: 168, y: 206, accent: 'brass' },
        { id: 'eval', label: 'Evals', x: 54, y: 166, accent: 'green' },
      ],
      edges: [
        { from: 'dataset', to: 'retrieval' },
        { from: 'retrieval', to: 'router' },
        { from: 'router', to: 'model' },
        { from: 'model', to: 'cache' },
        { from: 'cache', to: 'eval' },
        { from: 'eval', to: 'dataset', dashed: true },
        { from: 'router', to: 'cache', dashed: true },
      ],
    },
    layers: [
      {
        label: '01',
        title: 'Model strategy',
        copy: 'Escolher entre frontier models, modelos menores, fine-tuning leve, few-shot, RAG e tool calling conforme risco e custo.',
      },
      {
        label: '02',
        title: 'Inference architecture',
        copy: 'Roteamento, prompt caching, streaming, fallback, guardrails e envelopes de latência para operação real.',
      },
      {
        label: '03',
        title: 'Evaluation science',
        copy: 'Evals por tarefa, datasets anonimizados, testes adversariais, rubricas e curvas de qualidade por versão.',
      },
      {
        label: '04',
        title: 'Operational telemetry',
        copy: 'Observabilidade de custo, qualidade, contexto usado, decisão tomada, falha e impacto por workflow.',
      },
    ],
    workflow: [
      {
        title: 'Define a tarefa mensurável',
        copy: 'Sem tarefa, não existe benchmark. Cada experimento com LLM começa com decisão, critério e risco.',
      },
      {
        title: 'Mede antes de escalar',
        copy: 'Prompts, RAG, modelos e ferramentas entram em comparação com datasets e rubricas estáveis.',
      },
      {
        title: 'Publica com fallback',
        copy: 'O sistema entra em produção com cache, limites, telemetria, fallback e critério claro de rollback.',
      },
    ],
    methods: ['LLMOps', 'RAG', 'Model routing', 'Prompt caching', 'Eval harnesses'],
    outcomes: [
      'Decisões de modelo baseadas em evidência, não em preferência de fornecedor.',
      'Melhor balanço entre qualidade, custo, latência e risco operacional.',
      'Um caminho técnico claro para transformar protótipo em sistema confiável.',
    ],
  },
  {
    slug: 'plataformas-automacao-ia',
    navLabel: 'AI platforms',
    cardLabel: 'Automation OS',
    cardTitle: 'Plataformas para automação e execução com IA',
    cardCopy:
      'Sistemas que coordenam agentes, coders, validadores, memória, browser, runners, handoffs e aprovação humana.',
    kicker: 'Feito 04 / AI execution platforms',
    title: 'Plataformas para automação e execução com IA',
    headline: 'IA cria valor quando vira uma esteira de execução confiável.',
    lead:
      'Tenho construído plataformas onde IA não fica isolada em chat: ela entra em backlog, código, validação, browser, evidência, handoff, governança e entrega.',
    englishAbstract:
      'AI execution platforms that coordinate agents, coders, validators, memory, browsers, runners, handoffs, human gates and delivery evidence.',
    marketLine:
      'Esse tipo de plataforma serve para grandes enterprises e para times enxutos que precisam multiplicar execução sem perder controle.',
    proof:
      'A melhoria ao longo do tempo foi transformar automações pontuais em um sistema com preflight, gates, scheduler, registry, memória, QA e registro de aprendizado.',
    diagram: {
      label: 'AI execution operating system',
      nodes: [
        { id: 'backlog', label: 'Backlog', x: 54, y: 72, accent: 'brass' },
        { id: 'planner', label: 'Planner', x: 166, y: 42, accent: 'cyan' },
        { id: 'coders', label: 'Coders', x: 286, y: 72, accent: 'green' },
        { id: 'qa', label: 'QA', x: 310, y: 166, accent: 'cyan' },
        { id: 'gate', label: 'Gate', x: 168, y: 206, accent: 'brass' },
        { id: 'ship', label: 'Ship', x: 54, y: 166, accent: 'green' },
      ],
      edges: [
        { from: 'backlog', to: 'planner' },
        { from: 'planner', to: 'coders' },
        { from: 'coders', to: 'qa' },
        { from: 'qa', to: 'gate' },
        { from: 'gate', to: 'ship' },
        { from: 'ship', to: 'backlog', dashed: true },
        { from: 'planner', to: 'gate', dashed: true },
      ],
    },
    layers: [
      {
        label: '01',
        title: 'Mission control',
        copy: 'Backlog, contexto, prioridade, riscos, artefatos e critérios de aceite entram antes da execução.',
      },
      {
        label: '02',
        title: 'Multi-agent execution',
        copy: 'Coders, pesquisadores, validadores e operadores trabalham com papéis separados e handoffs claros.',
      },
      {
        label: '03',
        title: 'Validation pipeline',
        copy: 'Lint, build, testes, browser QA, screenshots, smoke e revisão de segurança antes de publicar.',
      },
      {
        label: '04',
        title: 'Operating memory',
        copy: 'Decisões, falhas, comandos, evidências e próximos passos viram memória reutilizável.',
      },
    ],
    workflow: [
      {
        title: 'Preflight antes de agir',
        copy: 'Cada execução sensível checa contrato, risco, permissões, contexto de projeto e gate humano quando necessário.',
      },
      {
        title: 'Agentes por especialidade',
        copy: 'Pesquisa, implementação, revisão, QA e deploy deixam de ser uma conversa única e viram uma operação coordenada.',
      },
      {
        title: 'Entrega com rastro',
        copy: 'O resultado final inclui arquivos mudados, evidências, riscos, deploy state e aprendizado para a próxima rodada.',
      },
    ],
    methods: ['Agent Hub', 'Mission Control', 'Human gates', 'Browser QA', 'Execution memory'],
    outcomes: [
      'Mais throughput sem transformar automação em caixa-preta.',
      'Menos retrabalho, porque cada entrega carrega critério, evidência e memória.',
      'Um modelo operacional que pode evoluir de portfólio pessoal para plataforma enterprise.',
    ],
  },
]

export function getFeito(slug: string) {
  return feitos.find((feito) => feito.slug === slug)
}
