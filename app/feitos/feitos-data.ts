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
      'Um framework prescritivo para conectar estrategia, decisoes de arquitetura, execucao em workflow e valor mensuravel.',
    kicker: 'Feito 01 / ServiceNow AI-Driven Architecture',
    title: 'SADA: ServiceNow AI-Driven Architecture',
    headline: 'Da visao executiva ao workflow medido.',
    lead:
      'Construi uma linguagem de arquitetura para posicionar ServiceNow como plataforma de estrategia + execucao: contexto, governanca, CSDM, IA, agentes e medicao de valor no mesmo sistema.',
    englishAbstract:
      'A prescriptive enterprise architecture language for ServiceNow: strategic context, architecture decisions, execution model and measurable AI value acceleration.',
    marketLine:
      'Aplicavel a grandes enterprises e industrias como FSI, Energy e Retail, sem depender de nomes publicos para provar valor.',
    proof:
      'A tese nasceu de um gap real: empresas precisam de uma metodologia repetivel para sair de iniciativas soltas de IA e entrar em arquitetura, governanca e resultados de plataforma.',
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
        copy: 'Objetivos estrategicos, maturidade, regulacao, estrategia de instancia e contexto operacional antes de escolher solucao.',
      },
      {
        label: '02',
        title: 'Architecture Decisions',
        copy: 'Baseline CSDM, governanca, AI adoption, fit de licenca, integracoes e limites de autonomia.',
      },
      {
        label: '03',
        title: 'Execution Model',
        copy: 'ITSM, ITOM, SPM, CSM, ESG, AI Agents e automacao traduzidos em padroes reutilizaveis.',
      },
      {
        label: '04',
        title: 'Value Acceleration',
        copy: 'Hipoteses de valor, KPIs, time-to-value, impacto em UX, melhoria continua e evidencia executiva.',
      },
    ],
    workflow: [
      {
        title: 'Do contexto para principios',
        copy: 'Transforma ambicao executiva em regras simples que times de negocio, arquitetura e plataforma conseguem repetir.',
      },
      {
        title: 'Dos principios para patterns',
        copy: 'Cria modelos de referencia para instancia, governanca, AI adoption, integracao e automacao.',
      },
      {
        title: 'Dos patterns para valor',
        copy: 'Cada decisao vira uma hipotese: se aplicamos X, a organizacao deve obter Y, medido por indicadores concretos.',
      },
    ],
    methods: ['CSDM baseline', 'AI adoption patterns', 'Value hypotheses', 'KPI loops', 'Architecture principles'],
    outcomes: [
      'Menos discussao abstrata e mais linguagem comum entre estrategia, arquitetura e execucao.',
      'Um catalogo reutilizavel para acelerar decisoes sem perder rigor de governanca.',
      'Conexao explicita entre modelo operacional, velocidade de adocao e expansao de valor.',
    ],
  },
  {
    slug: 'agentes-governados',
    navLabel: 'Agentes governados',
    cardLabel: 'AgentOps / Governanca',
    cardTitle: 'Agentes governados a partir de dados e contexto',
    cardCopy:
      'Estudo de dados, inferencia contextual, politicas, avaliacao e human gates para autonomia que deixa rastro.',
    kicker: 'Feito 02 / Governed agents',
    title: 'Agentes governados a partir de dados e contexto',
    headline: 'Autonomia so escala quando o agente sabe o que pode fazer.',
    lead:
      'Desenho agentes como sistemas operacionais: contexto confiavel, escopo claro, permissao, avaliacao, memoria, runner e auditoria antes de qualquer acao sensivel.',
    englishAbstract:
      'Governed agent systems built from operational data, inference boundaries, policy gates, evaluations and audit-ready execution.',
    marketLine:
      'Relevante para grandes enterprises, FSI, Energy e Retail, onde risco, escala e rastreabilidade importam tanto quanto produtividade.',
    proof:
      'A melhoria veio de parar de tratar agente como chat e passar a tratar agente como trabalhador digital com identidade, job description, limite e evidencia.',
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
        copy: 'Mapear fontes, qualidade, ownership, semantica operacional, eventos e entidades que sustentam decisao.',
      },
      {
        label: '02',
        title: 'Inference boundary',
        copy: 'Definir o que o agente pode inferir, quando precisa perguntar, quando deve recusar e quando escalar.',
      },
      {
        label: '03',
        title: 'Policy and gates',
        copy: 'Politicas, permissoes, thresholds, aprovacao humana e trilhas de auditoria para operacao regulada.',
      },
      {
        label: '04',
        title: 'Learning loop',
        copy: 'Evals, telemetria, feedback e revisao de incidentes para melhorar sem abrir mao de controle.',
      },
    ],
    workflow: [
      {
        title: 'Observa o trabalho real',
        copy: 'Antes do agente, entende-se a fila, a excecao, o risco, os dados e a decisao humana que existe hoje.',
      },
      {
        title: 'Cria uma fronteira de autonomia',
        copy: 'A tarefa e quebrada por risco: sugerir, preparar, executar com gate ou executar sozinho.',
      },
      {
        title: 'Opera com evidencia',
        copy: 'Cada acao gera log, justificativa, input, output, policy result e proxima melhoria.',
      },
    ],
    methods: ['AgentOps', 'Policy gates', 'Eval suites', 'Audit trails', 'Context graphs'],
    outcomes: [
      'Agentes mais uteis porque trabalham dentro do contexto real da empresa.',
      'Menos risco operacional, pois autonomia vira contrato, nao improviso.',
      'Maior confianca executiva para escalar agentes alem de demos controladas.',
    ],
  },
  {
    slug: 'llm-inferencia',
    navLabel: 'LLM inference',
    cardLabel: 'LLMOps / Inference',
    cardTitle: 'Criacao, avaliacao e inferencia de LLMs',
    cardCopy:
      'Pipelines de LLM com roteamento, RAG, prompt caching, evals, latencia, custo e qualidade observavel.',
    kicker: 'Feito 03 / LLM systems',
    title: 'Criacao, avaliacao e inferencia de LLMs',
    headline: 'O trabalho cientifico esta entre o modelo e a decisao.',
    lead:
      'Meu foco nao e vender magia de modelo. E construir sistemas com LLMs: adaptacao, grounding, avaliacao, roteamento, inferencia, cache, observabilidade e limites de confianca.',
    englishAbstract:
      'LLM systems for model adaptation, retrieval, routing, prompt caching, inference quality, latency/cost envelopes and evaluation-driven deployment.',
    marketLine:
      'Para enterprise, FSI, Energy e Retail, o diferencial esta em saber quando usar modelo grande, modelo pequeno, RAG, tool use, cache ou bloqueio.',
    proof:
      'A evolucao foi sair de prompts artesanais para um laboratorio de decisao: datasets de teste, criterios de qualidade, ablation, rastreio de falha e custo por resultado.',
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
        copy: 'Roteamento, prompt caching, streaming, fallback, guardrails e envelopes de latencia para operacao real.',
      },
      {
        label: '03',
        title: 'Evaluation science',
        copy: 'Evals por tarefa, datasets anonimizados, testes adversariais, rubricas e curvas de qualidade por versao.',
      },
      {
        label: '04',
        title: 'Operational telemetry',
        copy: 'Observabilidade de custo, qualidade, contexto usado, decisao tomada, falha e impacto por workflow.',
      },
    ],
    workflow: [
      {
        title: 'Define a tarefa mensuravel',
        copy: 'Sem tarefa, nao existe benchmark. Cada experimento com LLM comeca com decisao, criterio e risco.',
      },
      {
        title: 'Mede antes de escalar',
        copy: 'Prompts, RAG, modelos e ferramentas entram em comparacao com datasets e rubricas estaveis.',
      },
      {
        title: 'Publica com fallback',
        copy: 'O sistema entra em producao com cache, limites, telemetria, fallback e criterio claro de rollback.',
      },
    ],
    methods: ['LLMOps', 'RAG', 'Model routing', 'Prompt caching', 'Eval harnesses'],
    outcomes: [
      'Decisoes de modelo baseadas em evidencia, nao em preferencia de fornecedor.',
      'Melhor balanco entre qualidade, custo, latencia e risco operacional.',
      'Um caminho tecnico claro para transformar prototipo em sistema confiavel.',
    ],
  },
  {
    slug: 'plataformas-automacao-ia',
    navLabel: 'AI platforms',
    cardLabel: 'Automation OS',
    cardTitle: 'Plataformas para automacao e execucao com IA',
    cardCopy:
      'Sistemas que coordenam agentes, coders, validadores, memoria, browser, runners, handoffs e aprovacao humana.',
    kicker: 'Feito 04 / AI execution platforms',
    title: 'Plataformas para automacao e execucao com IA',
    headline: 'IA cria valor quando vira uma esteira de execucao confiavel.',
    lead:
      'Tenho construido plataformas onde IA nao fica isolada em chat: ela entra em backlog, codigo, validacao, browser, evidencia, handoff, governanca e entrega.',
    englishAbstract:
      'AI execution platforms that coordinate agents, coders, validators, memory, browsers, runners, handoffs, human gates and delivery evidence.',
    marketLine:
      'Esse tipo de plataforma serve para grandes enterprises e para times enxutos que precisam multiplicar execucao sem perder controle.',
    proof:
      'A melhoria ao longo do tempo foi transformar automacoes pontuais em um sistema com preflight, gates, scheduler, registry, memoria, QA e registro de aprendizado.',
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
        copy: 'Backlog, contexto, prioridade, riscos, artefatos e criterios de aceite entram antes da execucao.',
      },
      {
        label: '02',
        title: 'Multi-agent execution',
        copy: 'Coders, pesquisadores, validadores e operadores trabalham com papeis separados e handoffs claros.',
      },
      {
        label: '03',
        title: 'Validation pipeline',
        copy: 'Lint, build, testes, browser QA, screenshots, smoke e revisao de seguranca antes de publicar.',
      },
      {
        label: '04',
        title: 'Operating memory',
        copy: 'Decisoes, falhas, comandos, evidencias e proximos passos viram memoria reutilizavel.',
      },
    ],
    workflow: [
      {
        title: 'Preflight antes de agir',
        copy: 'Cada execucao sensivel checa contrato, risco, permissoes, contexto de projeto e gate humano quando necessario.',
      },
      {
        title: 'Agentes por especialidade',
        copy: 'Pesquisa, implementacao, revisao, QA e deploy deixam de ser uma conversa unica e viram uma operacao coordenada.',
      },
      {
        title: 'Entrega com rastro',
        copy: 'O resultado final inclui arquivos mudados, evidencias, riscos, deploy state e aprendizado para proxima rodada.',
      },
    ],
    methods: ['Agent Hub', 'Mission Control', 'Human gates', 'Browser QA', 'Execution memory'],
    outcomes: [
      'Mais throughput sem transformar automacao em caixa-preta.',
      'Menos retrabalho, porque cada entrega carrega criterio, evidencia e memoria.',
      'Um modelo operacional que pode evoluir de portfolio pessoal para plataforma enterprise.',
    ],
  },
]

export function getFeito(slug: string) {
  return feitos.find((feito) => feito.slug === slug)
}
