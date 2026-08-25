import type { FeitosLang } from './FeitosIndexContent'

export type ProofMetric = {
  value: string
  label: Record<FeitosLang, string>
  context: Record<FeitosLang, string>
}

export type DeliveryCase = {
  sector: Record<FeitosLang, string>
  headline: Record<FeitosLang, string>
  result: string
  detail: Record<FeitosLang, string>
  methods: string[]
}

export type FlowStage = {
  index: string
  title: Record<FeitosLang, string>
  detail: Record<FeitosLang, string>
  signal: string
}

export type PublicProof = {
  title: string
  label: Record<FeitosLang, string>
  detail: Record<FeitosLang, string>
  image: string
  href: string
  imageAlt: Record<FeitosLang, string>
}

export const proofMetrics: ProofMetric[] = [
  {
    value: '50.000+',
    label: { pt: 'horas economizadas', en: 'hours saved' },
    context: {
      pt: 'Resultado agregado de automações e sistemas entregues.',
      en: 'Aggregate result across delivered automation and systems work.',
    },
  },
  {
    value: '500+',
    label: { pt: 'workflows em produção', en: 'production workflows' },
    context: {
      pt: 'Integrações, agentes, ETL, atendimento e operações críticas.',
      en: 'Integrations, agents, ETL, service, and critical operations.',
    },
  },
  {
    value: 'US$ 10M+',
    label: { pt: 'receita gerada', en: 'revenue generated' },
    context: {
      pt: 'Valor agregado por produtos e operações automatizadas.',
      en: 'Aggregate value from products and automated operations.',
    },
  },
]

export const deliveryCases: DeliveryCase[] = [
  {
    sector: { pt: 'HR Tech · case anonimizado', en: 'HR Tech · anonymized case' },
    headline: {
      pt: 'Uma nova fonte de dados deixou de levar duas semanas.',
      en: 'A new data source stopped taking two weeks to onboard.',
    },
    result: '2 semanas → 2 horas',
    detail: {
      pt: 'Arquitetura de integração com mais de 700 workflows e processamento de 2–3 milhões de documentos por mês.',
      en: 'Integration architecture with 700+ workflows processing 2–3 million documents per month.',
    },
    methods: ['n8n', 'ETL', 'APIs', 'Data quality'],
  },
  {
    sector: { pt: 'Telecom / CSOC · case anonimizado', en: 'Telecom / CSOC · anonymized case' },
    headline: {
      pt: 'Operações repetitivas viraram uma malha SOAR modular.',
      en: 'Repetitive operations became a modular SOAR fabric.',
    },
    result: '£2,2M de custo evitado',
    detail: {
      pt: 'Trinta e três workflows coordenados, mais de 5.000 person-days poupados e trilha auditável de decisão.',
      en: 'Thirty-three coordinated workflows, 5,000+ person-days saved, and an auditable decision trail.',
    },
    methods: ['n8n', 'SOAR', 'Governança', 'Observability'],
  },
  {
    sector: { pt: 'Health SaaS · case anonimizado', en: 'Health SaaS · anonymized case' },
    headline: {
      pt: 'A operação saiu do zero para uma base recorrente de clínicas.',
      en: 'The operation went from zero to a recurring clinic base.',
    },
    result: '1.000+ clínicas · US$ 5,6M',
    detail: {
      pt: 'Produto white-label, automações de aquisição e operação, com mais de US$ 300K de MRR no período registrado.',
      en: 'White-label product plus acquisition and operating automations, with US$300K+ MRR in the recorded period.',
    },
    methods: ['GoHighLevel', 'SaaS', 'CRM', 'Lifecycle'],
  },
  {
    sector: { pt: 'CRM B2B · case anonimizado', en: 'B2B CRM · anonymized case' },
    headline: {
      pt: 'Implementação, automação e receita operando no mesmo modelo.',
      en: 'Implementation, automation, and revenue operating as one model.',
    },
    result: '250+ clientes · US$ 120K+ MRR',
    detail: {
      pt: 'Oito trimestres consecutivos de crescimento com oferta productizada de setup e recorrência.',
      en: 'Eight consecutive growth quarters with a productized setup and recurring offer.',
    },
    methods: ['CRM', 'Automation', 'RevOps', 'Handoff'],
  },
]

export const paidAiFlow: FlowStage[] = [
  {
    index: '01',
    title: { pt: 'Pedido', en: 'Request' },
    detail: { pt: 'O usuário escreve e recebe um identificador único.', en: 'The user writes and receives a unique identifier.' },
    signal: 'input.validated',
  },
  {
    index: '02',
    title: { pt: 'Pagamento', en: 'Payment' },
    detail: { pt: 'Checkout Pix/cartão cria a cobrança sem expor chaves.', en: 'Pix/card checkout creates the charge without exposing keys.' },
    signal: 'payment.pending',
  },
  {
    index: '03',
    title: { pt: 'Confirmação', en: 'Confirmation' },
    detail: { pt: 'Webhook assinado confirma o pagamento uma única vez.', en: 'A signed webhook confirms payment exactly once.' },
    signal: 'webhook.verified',
  },
  {
    index: '04',
    title: { pt: 'IA', en: 'AI' },
    detail: { pt: 'Fila idempotente chama o modelo com retry e limite de custo.', en: 'An idempotent queue calls the model with retries and a cost cap.' },
    signal: 'analysis.running',
  },
  {
    index: '05',
    title: { pt: 'Entrega', en: 'Delivery' },
    detail: { pt: 'Resultado persistido aparece em link único e pode ser enviado por e-mail.', en: 'The stored result appears at a unique link and may be emailed.' },
    signal: 'result.delivered',
  },
]

export const publicProofs: PublicProof[] = [
  {
    title: 'CantuStudio',
    label: { pt: 'Produto público · música e IA', en: 'Public product · music and AI' },
    detail: {
      pt: 'Produto web/iOS para transformar melodia em arranjo SATB, com fluxo de revisão e exportação.',
      en: 'Web/iOS product that turns melody into SATB arrangements, with review and export flows.',
    },
    image: '/portfolio/cantustudio/feature-graphic.png',
    href: 'https://cantustudio.app',
    imageAlt: { pt: 'Tela pública do CantuStudio', en: 'Public CantuStudio product screen' },
  },
  {
    title: 'FaithSchool',
    label: { pt: 'Produto público · educação', en: 'Public product · education' },
    detail: {
      pt: 'Planejamento educacional com experiência web/iOS e evidência pública de produto.',
      en: 'Education planning with web/iOS experiences and public product evidence.',
    },
    image: '/portfolio/faithschool/app-planner.png',
    href: 'https://faithschool.app',
    imageAlt: { pt: 'Planejador público do FaithSchool', en: 'Public FaithSchool planner screen' },
  },
  {
    title: 'AgenticosCore',
    label: { pt: 'Sistema público · Revenue OS', en: 'Public system · Revenue OS' },
    detail: {
      pt: 'Diagnóstico, score e próxima ação comercial em um sistema operacional de receita.',
      en: 'Diagnostics, scoring, and next commercial action in a revenue operating system.',
    },
    image: '/portfolio/agenticoscore/home-desktop.png',
    href: 'https://agenticoscore.ai',
    imageAlt: { pt: 'Tela pública do AgenticosCore', en: 'Public AgenticosCore system screen' },
  },
]
