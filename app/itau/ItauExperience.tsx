'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  Activity,
  Bot,
  Boxes,
  Building2,
  Cloud,
  Database,
  FileCheck2,
  Gauge,
  GitBranch,
  Link2,
  Network,
  ScrollText,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import styles from './ItauExperience.module.css'

type VerdictKind = 'approved' | 'adjust' | 'reject'

const verdictItems: Array<{
  kind: VerdictKind
  item: string
  meta?: string
  reason: string
}> = [
  {
    kind: 'approved',
    item: 'Ponto de partida para agentes/skills em SaaS ou cloud gerenciada',
    meta: 'cmdb_ci_function_ai · AI Function',
    reason:
      'Use quando o agente, skill ou capacidade de IA é consumido como serviço gerenciado: Now Assist, Azure AI Foundry, AWS Bedrock, Copilot, SaaS ou plataforma hospedada por terceiro.',
  },
  {
    kind: 'adjust',
    item: 'Aplicação ou workload de IA operado pelo Itaú',
    meta: 'cmdb_ci_appl_ai_application · AI & Model Application',
    reason:
      'Use quando existe software de IA rodando em infraestrutura controlada pelo banco: Linux, Windows, containers, Kubernetes, private cloud, on-prem ou runtime gerenciado internamente.',
  },
  {
    kind: 'approved',
    item: 'Governança do ativo de IA antes da CI operacional',
    meta: 'alm_ai_*_digital_asset',
    reason:
      'Crie ativo de IA para declarar uso, dono, risco, modelo, dataset e finalidade. Se não há deployment visível, o ativo existe mesmo sem CI operacional.',
  },
  {
    kind: 'approved',
    item: 'Conexão com CSDM via Service Instance',
    meta: 'cmdb_ci_service_auto · antigo Application Service',
    reason:
      'Cada deployment relevante deve estar ligado ao Service Instance para participar de incidente, mudança, impacto, ownership e health operacional.',
  },
  {
    kind: 'approved',
    item: 'Contexto de negócio não pode ficar inferido',
    meta: 'Business Application / Digital Product / Business Service',
    reason:
      'A CMDB precisa explicar qual produto, jornada ou serviço o agente suporta. A tabela técnica sozinha não responde risco, valor nem accountability.',
  },
  {
    kind: 'reject',
    item: 'Cadastrar caso de uso isolado como CI',
    meta: 'anti-pattern',
    reason:
      'Um caso de uso, demanda ou iniciativa de IA não é automaticamente CI. Primeiro classifique como ativo de IA e conecte ao produto/serviço; só crie CI quando houver runtime/deployment governável.',
  },
  {
    kind: 'approved',
    item: 'Cadastro centralizado com validação',
    meta: 'intake + API + workflow de aprovação',
    reason:
      'Bom caminho para evitar inventário paralelo: o cadastro deve validar classe, owner, risco, dados, ambiente, suporte e ciclo de vida antes de virar registro operacional.',
  },
  {
    kind: 'adjust',
    item: 'Relacionamentos técnicos',
    meta: 'usar OOTB quando existir; validar na release do Itaú',
    reason:
      'Evitar tipos custom como primeiro movimento. Preferir membership/relacionamentos CSDM suportados, e validar nomes reais no CI Class Manager da instância.',
  },
  {
    kind: 'reject',
    item: 'Campos mínimos de banco regulado',
    reason:
      'Não ir para piloto sem risk_tier, data_classification, pii_handling, decision_authority, model_provider, data_residency, owner, support_group e audit cadence.',
  },
  {
    kind: 'reject',
    item: 'Falta chave de correlação com runtime',
    meta: 'correlation_id / external_id / provider_resource_id',
    reason:
      'Sem identificador externo, o inventário da CMDB fica desconectado de execução real, observabilidade, custo, logs, AI Control Tower e auditoria.',
  },
  {
    kind: 'reject',
    item: 'Erro de cadastro como falha de plataforma',
    meta: 'HTTP 400, não 500',
    reason:
      'Validação de campo obrigatório, classe inválida ou owner ausente deve retornar erro de negócio estruturado, não incidente falso de API.',
  },
]

const criticalItems = [
  {
    title: '1. Começar pelo inventário de ativos de IA',
    severity: 'Alta',
    severityClass: styles.severityHigh,
    description:
      'Antes de escolher tabela CMDB, declarar que a organização usa ou possui aquele agente, modelo, dataset, prompt ou sistema de IA.',
    action:
      'Criar AI Digital Asset com owner, finalidade, risco, dados, modelo/provedor, status e ciclo de vida. Isso governa intenção e accountability.',
  },
  {
    title: '2. Classificar o tipo de deployment',
    severity: 'Alta',
    severityClass: styles.severityHigh,
    description:
      'A escolha entre as duas tabelas do print depende de onde e como o agente roda, não do nome “agente de IA”.',
    action:
      'SaaS/cloud/terceiro: AI Function. Infra controlada pelo Itaú: AI & Model Application. Sem deployment visível: ativo de IA sem CI operacional.',
  },
  {
    title: '3. Conectar ao CSDM operacional',
    severity: 'Média',
    severityClass: styles.severityMed,
    description:
      'O CI de IA precisa aparecer dentro do contexto de serviço, produto e aplicação de negócio que ele suporta.',
    action:
      'Relacionar Business Application/Digital Product → Service Instance → AI CI, com owners e grupo de suporte. Isso habilita incidente, mudança e impacto.',
  },
  {
    title: '4. Governar dados, autonomia e risco',
    severity: 'Média',
    severityClass: styles.severityMed,
    description:
      'Banco regulado precisa saber que dado entra, que decisão sai, qual autonomia existe e quem responde quando o agente erra.',
    action:
      'Exigir classificação de dados, LGPD/PII, nível de autonomia, human-in-the-loop, provider/model, data residency e revisão periódica.',
  },
  {
    title: '5. Operar ciclo de vida, não apenas cadastrar',
    severity: 'Baixa',
    severityClass: styles.severityLow,
    description:
      'O valor não está em ter uma lista; está em manter o agente confiável depois de mudança de prompt, modelo, permissão ou base de dados.',
    action:
      'Amarrar change, incident, revisão de risco, evidência de teste, kill switch, decommission e recertificação de acesso.',
  },
]

const releaseRows = [
  ['Agora', 'Resolver a dúvida de tabela sem criar modelo paralelo.', 'Adotar regra de decisão: AI Function vs AI & Model Application.', styles.releaseVancouver],
  ['Piloto', 'Provar rastreabilidade em poucos agentes críticos.', '3 a 5 agentes reais com ativo, CI quando aplicável, owners e serviço.', styles.releaseWashington],
  ['Operação', 'Transformar cadastro em processo vivo.', 'Workflow de intake, aprovação, mudança, revisão e auditoria.', styles.releaseXanadu],
  ['AICT', 'Preparar visibilidade centralizada de agentes, modelos e workflows.', 'Guardar external_id/correlation_id e link Asset-CI para descoberta/runtime.', styles.releaseYokohama],
  ['Escala', 'Evitar CMDB decorativa e inventário duplicado.', 'Métricas de completude, atualização, risco e cobertura por domínio.', styles.releaseZurich],
]

const roadmap = [
  ['Semana 1', 'Taxonomia e intake mínimo', 'Fechar critérios de classe, campos obrigatórios, owner, risco, dados e ciclo de vida.', 'Gaia + ServiceNow'],
  ['Semana 2', 'Carga piloto', 'Cadastrar 3 a 5 agentes críticos com ativo de IA, CI quando aplicável e relação com Service Instance.', 'Squad Gaia'],
  ['Semana 3', 'Governança e operação', 'Amarrar aprovação, change, incident, revisão de risco, evidência de teste e kill switch.', 'Governança + Operação'],
  ['Semana 4', 'Painel e go/no-go', 'Publicar visão executiva: cobertura, risco, gaps, owners, runtime correlacionado e próximos domínios.', 'Squad + Governança'],
]

const questions = [
  'Esse item é uso/ativo de IA, deployment técnico ou serviço de negócio?',
  'O agente roda em SaaS/cloud/terceiro ou em infraestrutura controlada pelo Itaú?',
  'Existe deployment visível e operacional para justificar CI, ou só governança de ativo?',
  'Qual Business Application, Digital Product ou Service Instance consome esse agente?',
  'Que dados o agente acessa e qual classificação LGPD/risco se aplica?',
  'Quem aprova mudança de modelo, prompt, permissão, ferramenta ou dataset?',
  'Qual external_id/correlation_id liga CMDB ao runtime, logs, custo e AI Control Tower?',
  'Qual evidência prova que o agente continua aderente depois de uma mudança?',
]

const relationships: Array<[string, string, string, string]> = [
  ['AI Digital Asset', 'declara governança', 'alm_ai_system/model/dataset/prompt_digital_asset', 'Uso, dono, finalidade, risco e ciclo de vida'],
  ['AI Digital Asset', 'Asset-CI linkage', 'cmdb_ci_function_ai ou cmdb_ci_appl_ai_application', 'Liga governança ao deployment quando houver CI'],
  ['Business Application / Digital Product', 'usa / suporta', 'Service Instance', 'Contexto de negócio e ownership'],
  ['Service Instance', 'contém / depende de', 'AI Function', 'Agente SaaS/cloud/terceiro em operação'],
  ['Service Instance', 'contém / depende de', 'AI & Model Application', 'Workload de IA operado pelo Itaú'],
  ['AI CI', 'consome', 'modelo, dataset, prompt, API, vector store', 'Dependências para impacto, mudança e auditoria'],
  ['AI CI', 'owned by / supported by', 'sys_user_group / owner', 'Accountability operacional'],
]

const helpItems: Array<{
  icon: string
  title: string
  desc: string
  effort: string
}> = [
  {
    icon: '01',
    title: 'Sessão de modelagem CSDM',
    desc: 'Fechar com Squad Gaia a regra de decisão entre AI Function, AI & Model Application e AI Digital Asset, usando exemplos reais do Itaú.',
    effort: '2h · antes do piloto',
  },
  {
    icon: '02',
    title: 'Desenhar intake mínimo',
    desc: 'Criar formulário/API com campos obrigatórios de owner, risco, dado, autonomia, provider, ambiente e external_id.',
    effort: '1 workshop',
  },
  {
    icon: '03',
    title: 'Piloto com agentes reais',
    desc: 'Selecionar 3 a 5 agentes que já existam ou estejam próximos de produção, cobrindo SaaS/cloud e infraestrutura controlada.',
    effort: '1 sprint',
  },
  {
    icon: '04',
    title: 'Dashboard de qualidade e risco',
    desc: 'Medir completude, freshness, owner coverage, risk coverage, itens sem Service Instance e itens sem correlation_id.',
    effort: '1 sprint',
  },
  {
    icon: '05',
    title: 'Validação com especialistas ServiceNow',
    desc: 'Usar a sessão para validar a semântica contra CSDM 5, CI Class Manager da instância e roadmap de AI Control Tower.',
    effort: 'pontual',
  },
]

const verdictBadgeClass: Record<VerdictKind, string> = {
  approved: styles.verdictBadgeApproved,
  adjust: styles.verdictBadgeAdjust,
  reject: styles.verdictBadgeReject,
}

const verdictBadgeLabel: Record<VerdictKind, string> = {
  approved: '✓ PADRÃO',
  adjust: '⚠ QUANDO APLICAR',
  reject: '✕ NÃO FAZER',
}

const correctedPayload = `{
  "name": "Agente Atendimento PJ",
  "business_owner": "Area de Atendimento PJ",
  "technical_owner": "Squad Gaia",
  "support_group": "GRP-IA-SUPORTE",
  "business_application": "Atendimento Digital PJ",
  "service_instance": "Atendimento Digital PJ - PROD",

  "ai_asset": {
    "type": "AI system",
    "purpose": "Apoiar respostas e abertura de solicitacoes",
    "risk_tier": "HIGH",
    "data_classification": "CONFIDENTIAL",
    "pii_handling": true,
    "decision_authority": "HUMAN_IN_LOOP"
  },

  "deployment": {
    "hosting_model": "CLOUD_MANAGED",
    "recommended_ci_class": "cmdb_ci_function_ai",
    "provider": "AZURE_OPENAI",
    "environment": "PROD",
    "region_or_residency": "BR",
    "external_id": "azure-ai-foundry-agent-123"
  },

  "dependencies": {
    "models": ["GPT-4o"],
    "prompts": ["prompt_atendimento_v1"],
    "datasets": ["Base_Conhecimento_PJ"],
    "apis": ["ServiceNow Case API"]
  },

  "controls": {
    "audit_cadence_days": 90,
    "kill_switch_owner": "GRP-IA-SUPORTE",
    "last_review_date": "2026-05-29"
  }
}`

const correctedHandler = `if no approved AI use exists:
  create AI Digital Asset first
  capture owner, purpose, risk, data, provider, review cadence

if deployment is not visible / not operational:
  do not create operational CI yet
  keep governance at AI Digital Asset layer

if hosting_model in [SAAS, CLOUD_MANAGED, THIRD_PARTY, SERVICENOW_HOSTED]:
  create/link CI as cmdb_ci_function_ai

if hosting_model in [ITAU_MANAGED, ON_PREM, PRIVATE_CLOUD, CONTAINER, KUBERNETES]:
  create/link CI as cmdb_ci_appl_ai_application

always:
  link AI Asset to CI when CI exists
  link CI to Service Instance / business context
  require owner, support group, risk, data classification, external_id
  return HTTP 400 for validation errors, never HTTP 500`

const csdmLayers: Array<{
  tier: string
  name: string
  meta: string
  toneClass: string
  highlight?: boolean
}> = [
  {
    tier: 'L5',
    name: 'Service Portfolio / Negócio',
    meta: 'Business Service · Service Offering',
    toneClass: styles.csdmNavy,
  },
  {
    tier: 'L4',
    name: 'Application Service (ponto de entrega)',
    meta: 'cmdb_ci_service_auto',
    toneClass: styles.csdmBlue,
  },
  {
    tier: 'L3',
    name: 'AI CI — deployment operacional',
    meta: 'cmdb_ci_function_ai ou cmdb_ci_appl_ai_application',
    toneClass: styles.csdmOrange,
    highlight: true,
  },
  {
    tier: 'L2',
    name: 'AI Digital Asset — governança',
    meta: 'AI system · model · prompt · dataset',
    toneClass: styles.csdmGreen,
  },
  {
    tier: 'L1',
    name: 'Foundation / Technical Services',
    meta: 'CMDB core · CSDM 5 baseline',
    toneClass: styles.csdmSlate,
  },
]

const csdmLessons = [
  'CSDM 5 não é tabela nova: é onde cada coisa mora e como ela se conecta.',
  'O agente primeiro é ativo de IA governado; vira CI quando existe deployment operacional.',
  'SaaS/cloud/terceiro aponta para AI Function; workload Itaú-managed aponta para AI & Model Application.',
  'Governança real nasce do relacionamento: ativo → CI → Service Instance → dado → owner.',
]

const architectureNodes: Array<{
  layer: string
  title: string
  table: string
  desc: string
  icon: LucideIcon
  toneClass: string
}> = [
  {
    layer: 'Negócio',
    title: 'Jornada, produto ou capability',
    table: 'Business Service · Digital Product · Business Application',
    desc: 'Explica valor, dono de negócio, público impactado e criticidade para o banco.',
    icon: Building2,
    toneClass: styles.archBusiness,
  },
  {
    layer: 'Entrega',
    title: 'Service Instance',
    table: 'cmdb_ci_service_auto',
    desc: 'Ponto operacional de impacto: health, mudança, incidente, disponibilidade e suporte.',
    icon: Network,
    toneClass: styles.archService,
  },
  {
    layer: 'Governança',
    title: 'AI Digital Asset',
    table: 'alm_ai_system/model/dataset/prompt_digital_asset',
    desc: 'Registra finalidade, dono, risco, dados, modelo, prompt, dataset, ciclo de vida e aprovação.',
    icon: ShieldCheck,
    toneClass: styles.archGovernance,
  },
  {
    layer: 'Runtime SaaS',
    title: 'AI Function',
    table: 'cmdb_ci_function_ai',
    desc: 'Agente, skill ou capacidade de IA consumida como SaaS, cloud gerenciada ou plataforma de terceiro.',
    icon: Cloud,
    toneClass: styles.archRuntime,
  },
  {
    layer: 'Runtime Itaú',
    title: 'AI & Model Application',
    table: 'cmdb_ci_appl_ai_application',
    desc: 'Workload de IA rodando em infraestrutura controlada pelo Itaú: container, Kubernetes, private cloud ou on-prem.',
    icon: Server,
    toneClass: styles.archRuntimeAlt,
  },
  {
    layer: 'Dependências',
    title: 'Modelo, prompt, dados e ferramentas',
    table: 'model · prompt · dataset · API · vector store · MCP',
    desc: 'Itens que precisam de impacto, mudança, revisão de acesso e evidência de auditoria.',
    icon: Database,
    toneClass: styles.archDependency,
  },
]

const architectureEdges: Array<{
  from: string
  verb: string
  to: string
  reason: string
}> = [
  {
    from: 'Business Application',
    verb: 'suporta',
    to: 'Service Instance',
    reason: 'mantém a leitura CSDM: valor e criticidade descem até o ponto operacional.',
  },
  {
    from: 'AI Digital Asset',
    verb: 'governa',
    to: 'AI CI',
    reason: 'separa aprovação, risco e ciclo de vida do deployment técnico.',
  },
  {
    from: 'Service Instance',
    verb: 'depende de',
    to: 'AI Function / AI & Model Application',
    reason: 'habilita impacto, change, incident, SLA/OLA e suporte.',
  },
  {
    from: 'AI CI',
    verb: 'consome',
    to: 'modelo, prompt, dataset e API',
    reason: 'torna mudança de modelo, prompt ou fonte de dados visível para auditoria.',
  },
  {
    from: 'AI CI',
    verb: 'correlaciona',
    to: 'runtime / AI Control Tower',
    reason: 'external_id evita inventário manual sem ligação com execução real.',
  },
]

const csdmAlignment: Array<{
  title: string
  desc: string
  icon: LucideIcon
}> = [
  {
    title: 'Cada camada responde uma pergunta diferente',
    desc: 'Negócio responde valor. Service Instance responde impacto operacional. AI Digital Asset responde governança. AI CI responde deployment.',
    icon: Boxes,
  },
  {
    title: 'CI só quando existe runtime governável',
    desc: 'Caso de uso, ideação ou demanda não precisa virar CI. Primeiro é ativo de IA; depois vira CI quando há execução rastreável.',
    icon: FileCheck2,
  },
  {
    title: 'A classe depende do modelo de hospedagem',
    desc: 'SaaS, cloud gerenciada ou terceiro: AI Function. Software operado pelo Itaú: AI & Model Application.',
    icon: GitBranch,
  },
  {
    title: 'O desenho preserva operações e auditoria',
    desc: 'A relação com Service Instance e dependências evita uma CMDB decorativa e permite change, incident, risco, revisão e decommission.',
    icon: ScrollText,
  },
]

const aiControlTowerFlow: Array<{
  step: string
  title: string
  desc: string
  outcome: string
  icon: LucideIcon
}> = [
  {
    step: '01',
    title: 'Descobrir e consolidar ativos de IA',
    desc: 'Inventariar sistemas de IA, modelos, prompts, datasets, MCP servers e deployments internos ou de terceiros.',
    outcome: 'Menos inventário paralelo e menos “shadow AI”.',
    icon: Activity,
  },
  {
    step: '02',
    title: 'Classificar risco, dono e ciclo de vida',
    desc: 'Aplicar managed by, lifecycle phase, state, status e risk classification no AI Asset Inventory.',
    outcome: 'Accountability explícita para banco regulado.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Relacionar AI Asset, CI e Service Instance',
    desc: 'Usar IDs externos e vínculo Asset-CI para conectar governança, runtime e contexto CSDM.',
    outcome: 'Impacto operacional conectado a valor e risco.',
    icon: Link2,
  },
  {
    step: '04',
    title: 'Governar atividade, performance e compliance',
    desc: 'Observar runtime, controles, postura, métricas, revisões pendentes e ações recomendadas.',
    outcome: 'Auditoria contínua sem depender de planilha.',
    icon: Gauge,
  },
  {
    step: '05',
    title: 'Acionar workflows ServiceNow',
    desc: 'Abrir revisão, change, remediation, decommission, recertificação ou exceção a partir do mesmo sistema de registro.',
    outcome: 'Governança vira execução, não só relatório.',
    icon: Workflow,
  },
]

const officialSources: Array<{
  title: string
  desc: string
  href: string
  tag: string
}> = [
  {
    title: 'Common Service Data Model',
    desc: 'Documentação oficial ServiceNow: CSDM como modelo padrão para produtos que usam CMDB e orientação para CIs e relacionamentos.',
    href: 'https://www.servicenow.com/docs/r/servicenow-platform/common-service-data-model-csdm/csdm-landing-page.html',
    tag: 'CSDM',
  },
  {
    title: 'CSDM data domains',
    desc: 'Modelo conceitual de domínios CSDM e uso de Service Instance/Application Service no desenho de serviços.',
    href: 'https://www.servicenow.com/docs/r/servicenow-platform/common-service-data-model-csdm/csdm-conceptual-model.html?contentId=e1kF7ZEWJwXl_wia~9NHNw',
    tag: 'CSDM 5',
  },
  {
    title: 'AI Control Tower',
    desc: 'Página oficial do produto: governança de agentes, modelos, identidade, risco, runtime, valor e conexão com CMDB/CSDM.',
    href: 'https://www.servicenow.com/products/ai-control-tower.html',
    tag: 'AICT',
  },
  {
    title: 'AI asset inventory',
    desc: 'Documentação oficial: inventário de AI systems, AI models, prompts, datasets e MCP servers.',
    href: 'https://www.servicenow.com/docs/r/intelligent-experiences/ai-control-tower/ai-inventory.html',
    tag: 'Inventory',
  },
  {
    title: 'Create AI system assets',
    desc: 'Documentação oficial: criação de AI system asset, associação com modelos, prompts, datasets e submissão para revisão.',
    href: 'https://www.servicenow.com/docs/r/zurich/intelligent-experiences/ai-control-tower/create-ai-system-assets.html',
    tag: 'Lifecycle',
  },
  {
    title: 'AI Control Tower subscription unit overview',
    desc: 'PDF oficial ServiceNow que lista AI System Digital Asset, AI Model Digital Asset, AI Dataset Digital Asset e os deployed AI system/model CIs.',
    href: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/legal/ai-control-tower-servicenow-subscription-unit-overview.pdf',
    tag: 'Tables',
  },
]

const motionEase = [0.16, 1, 0.3, 1] as const
const revealViewport = { once: true, amount: 0.2 } as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: motionEase },
  },
}

const stagger: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: motionEase },
  },
}

const layerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: motionEase },
  },
}

function Reveal({
  children,
  className,
  reduced,
}: {
  children: ReactNode
  className?: string
  reduced: boolean | null
}) {
  const props = reduced
    ? { initial: 'visible' as const, animate: 'visible' as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: revealViewport,
      }
  return (
    <motion.section className={className} variants={fadeUp} {...props}>
      {children}
    </motion.section>
  )
}

export default function ItauExperience() {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : 90])
  const heroFade = useTransform(heroProgress, [0, 1], [1, reduced ? 1 : 0])

  const cardHover = reduced ? undefined : { y: -5, borderColor: 'rgba(236, 112, 0, 0.5)' }

  return (
    <main className={styles.shell}>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: reduced ? 1 : progressScale }}
        aria-hidden="true"
      />
      <div className={styles.container}>
        {/* ─────────── HERO ─────────── */}
        <motion.section
          ref={heroRef}
          className={styles.hero}
          style={{ y: heroY, opacity: heroFade }}
        >
          <motion.div
            initial={reduced ? false : 'hidden'}
            animate="visible"
            variants={stagger}
          >
          <motion.div className={styles.heroBadges} variants={fadeUp}>
            <span className={styles.brandChip}>
              <span className={styles.brandDot} /> Itaú Unibanco
            </span>
            <span className={`${styles.brandChip} ${styles.sn}`}>
              <span className={styles.brandDot} /> ServiceNow
            </span>
            <span className={`${styles.brandChip} ${styles.opr}`}>OPR-2025-0162762</span>
          </motion.div>
          <motion.h1 className={styles.heroTitle} variants={fadeUp}>
            AI Agent Governance no <em>CMDB</em>.
          </motion.h1>
          <motion.p className={styles.heroLede} variants={fadeUp}>
            Resposta objetiva para a dúvida do Itaú: em qual tabela cadastrar agentes de IA,
            como relacionar com CSDM 5 e qual racional usar para governança, operação e auditoria.
          </motion.p>
          <motion.div className={styles.heroMeta} variants={fadeUp}>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Audience</span>
              <span className={styles.heroMetaValue}>Squad Gaia + Governança</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Scope</span>
              <span className={styles.heroMetaValue}>CSDM 5 forward-compatible</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Decision</span>
              <span className={styles.heroMetaValue}>Classe mínima + piloto auditável</span>
            </div>
          </motion.div>
          {!reduced && (
            <motion.div
              className={styles.scrollCue}
              aria-hidden="true"
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>role para a aula</span>
              <span className={styles.scrollCueArrow}>↓</span>
            </motion.div>
          )}
          </motion.div>
        </motion.section>

        {/* ─────────── AULA: CAMADAS CSDM 5 ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>aula · onde o agente mora</span>
            <h2 className={styles.sectionTitle}>CSDM 5 em camadas — e por que isso importa.</h2>
            <p className={styles.sectionSub}>
              Antes de qualquer campo ou relacionamento: CSDM é um mapa de camadas. Cada decisão de
              governança fica fácil quando o AI Agent está na camada certa. Role e veja onde ele entra.
            </p>
          </div>

          <div className={styles.csdmGrid}>
            <motion.div
              className={styles.csdmStack}
              variants={stagger}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={revealViewport}
            >
              {csdmLayers.map((layer) => (
                <motion.div
                  key={layer.tier}
                  className={`${styles.csdmLayer} ${layer.toneClass} ${
                    layer.highlight ? styles.csdmLayerHighlight : ''
                  }`}
                  variants={layerItem}
                  whileHover={reduced ? undefined : { x: 6 }}
                  animate={
                    reduced || !layer.highlight
                      ? undefined
                      : {
                          boxShadow: [
                            '0 0 0 rgba(236,112,0,0)',
                            '0 0 32px rgba(236,112,0,0.35)',
                            '0 0 0 rgba(236,112,0,0)',
                          ],
                        }
                  }
                  transition={
                    layer.highlight
                      ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
                      : undefined
                  }
                >
                  <span className={styles.csdmTier}>{layer.tier}</span>
                  <div className={styles.csdmLayerBody}>
                    <p className={styles.csdmLayerName}>{layer.name}</p>
                    <span className={styles.csdmLayerMeta}>{layer.meta}</span>
                  </div>
                  {layer.highlight && <span className={styles.csdmYouAreHere}>aqui</span>}
                </motion.div>
              ))}
            </motion.div>

            <motion.ul
              className={styles.csdmLessons}
              variants={stagger}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={revealViewport}
            >
              {csdmLessons.map((lesson, i) => (
                <motion.li key={i} variants={cardItem}>
                  <span className={styles.csdmLessonNum}>{String(i + 1).padStart(2, '0')}</span>
                  <p>{lesson}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>

        {/* ─────────── VEREDITO ITEM-POR-ITEM ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>resposta direta</span>
            <h2 className={styles.sectionTitle}>
              Não escolha a tabela só pelo nome “AI Agent”.
            </h2>
            <p className={styles.sectionSub}>
              O desenho mais seguro é separar três camadas: governança do ativo de IA,
              deployment operacional na CMDB e contexto CSDM de negócio/serviço. A partir
              daí, a escolha entre <code>cmdb_ci_function_ai</code> e{' '}
              <code>cmdb_ci_appl_ai_application</code> fica simples.
            </p>
          </div>

          <motion.div
            className={styles.verdictTable}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.08 }}
          >
            {verdictItems.map((v, i) => (
              <motion.div
                key={i}
                className={styles.verdictRow}
                variants={cardItem}
                whileHover={reduced ? undefined : { backgroundColor: 'rgba(236, 112, 0, 0.06)' }}
              >
                <span className={`${styles.verdictBadge} ${verdictBadgeClass[v.kind]}`}>
                  {verdictBadgeLabel[v.kind]}
                </span>
                <div>
                  <p className={styles.verdictItemLabel}>{v.item}</p>
                  {v.meta && <span className={styles.verdictItemMeta}>{v.meta}</span>}
                </div>
                <p className={styles.verdictItemBody}>{v.reason}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className={styles.commitBanner}>
            <div>
              <p className={styles.commitKicker}>tese para a reunião</p>
              <h3 className={styles.commitTitle}>
                A CMDB descreve o que está rodando. O AI Inventory governa o que o banco usa.
              </h3>
              <p className={styles.commitSub}>
                Um agente pode existir como ativo de IA sem CI operacional. Ele só deve virar CI
                quando há deployment visível e governável. Depois, precisa estar ligado ao Service
                Instance e ao contexto de negócio para impact, change, risco e auditoria.
              </p>
            </div>
            <div className={styles.commitPledge}>
              Regra prática
              <br />
              <span style={{ color: '#FFCC00' }}>→ SaaS/cloud: AI Function · Itaú-managed: AI & Model Application.</span>
            </div>
          </div>
        </Reveal>

        {/* ─────────── VEREDITO CONCEITUAL ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>racional</span>
            <h2 className={styles.sectionTitle}>O agente não substitui aplicação, serviço ou capability.</h2>
            <p className={styles.sectionSub}>
              A mesma iniciativa de IA pode ter um ativo governado, um deployment técnico e um
              serviço impactado. Misturar essas camadas cria CMDB decorativa e distorce APM,
              Change, Incident e governança.
            </p>
          </div>
          <motion.article
            className={styles.verdictCard}
            variants={cardItem}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={revealViewport}
          >
            <span className={styles.verdictStamp}>Recomendação</span>
            <h3 className={styles.verdictHeadline}>
              Usar classes nativas sempre que possível: AI Digital Asset para governança,
              AI Function ou AI & Model Application para CI operacional, e Service Instance
              para contexto CSDM.
            </h3>
            <ul className={styles.verdictList}>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>Ativo de IA</p>
                <p className={styles.verdictItemDesc}>Declara uso, dono, propósito, dados, risco, provedor, revisão e ciclo de vida.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>CI operacional</p>
                <p className={styles.verdictItemDesc}>Representa o deployment visível: SaaS/cloud como AI Function; stack Itaú como AI & Model Application.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>CSDM</p>
                <p className={styles.verdictItemDesc}>Conecta o CI ao Service Instance, aplicação, serviço, owner e impacto operacional.</p>
              </li>
            </ul>
          </motion.article>
        </Reveal>

        {/* ─────────── DESENHO ALVO ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>desenho alvo</span>
            <h2 className={styles.sectionTitle}>Arquitetura recomendada para o Itaú.</h2>
            <p className={styles.sectionSub}>
              A notação abaixo segue o raciocínio CSDM: separar contexto de negócio, ponto
              operacional, governança do ativo de IA, deployment e dependências. Isso evita
              cadastrar agente como “coisa solta” na CMDB.
            </p>
          </div>

          <motion.div
            className={styles.architectureBoard}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.12 }}
          >
            <div className={styles.architectureNodes}>
              {architectureNodes.map((node) => {
                const Icon = node.icon
                return (
                  <motion.article
                    key={node.title}
                    className={`${styles.archNode} ${node.toneClass}`}
                    variants={cardItem}
                    whileHover={cardHover}
                  >
                    <div className={styles.archNodeTop}>
                      <span className={styles.nowIcon} aria-hidden="true">
                        <span>SN</span>
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <span className={styles.archLayer}>{node.layer}</span>
                    </div>
                    <h3 className={styles.archTitle}>{node.title}</h3>
                    <p className={styles.archTable}>{node.table}</p>
                    <p className={styles.archDesc}>{node.desc}</p>
                  </motion.article>
                )
              })}
            </div>

            <motion.ul className={styles.architectureEdges} variants={stagger}>
              {architectureEdges.map((edge) => (
                <motion.li key={`${edge.from}-${edge.to}`} variants={cardItem}>
                  <div className={styles.edgeLine}>
                    <span>{edge.from}</span>
                    <strong>{edge.verb}</strong>
                    <span>{edge.to}</span>
                  </div>
                  <p>{edge.reason}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Reveal>

        {/* ─────────── ALINHAMENTO CSDM 5 ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>por que é CSDM 5</span>
            <h2 className={styles.sectionTitle}>O racional arquitetural em quatro regras.</h2>
            <p className={styles.sectionSub}>
              A decisão não é “qual tabela parece mais moderna”. A decisão é preservar a
              semântica do CSDM e deixar cada registro explicar valor, impacto, risco e operação.
            </p>
          </div>

          <motion.div
            className={styles.alignmentGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.16 }}
          >
            {csdmAlignment.map((item) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  className={styles.alignmentCard}
                  variants={cardItem}
                  whileHover={cardHover}
                >
                  <Icon className={styles.alignmentIcon} size={24} strokeWidth={1.8} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </Reveal>

        {/* ─────────── 5 RISCOS CRÍTICOS ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>como fazer</span>
            <h2 className={styles.sectionTitle}>Cinco passos para sair da dúvida e virar piloto governado.</h2>
          </div>
          <motion.div
            className={styles.criticalGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            {criticalItems.map((item, index) => (
              <motion.article
                key={item.title}
                className={styles.criticalCard}
                variants={cardItem}
                whileHover={cardHover}
              >
                <span className={styles.criticalNum}>{index + 1}</span>
                <span className={`${styles.criticalSeverity} ${item.severityClass}`}>{item.severity}</span>
                <h3 className={styles.criticalTitle}>{item.title}</h3>
                <p className={styles.criticalDesc}>{item.description}</p>
                <p className={styles.criticalAction}>
                  <span className={styles.criticalActionLabel}>Ação</span>
                  {item.action}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── CÓDIGO CORRIGIDO ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>modelo mínimo</span>
            <h2 className={styles.sectionTitle}>
              O cadastro precisa carregar a decisão de classe e o racional.
            </h2>
            <p className={styles.sectionSub}>
              O exemplo abaixo não é um contrato final de API. É o shape mínimo para a conversa:
              governança do ativo, deployment, classe recomendada, dependências e controles de banco regulado.
            </p>
          </div>

          <div className={styles.codeStack}>
            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>POST /api/x_itau/ai_agent/register</span>
                  <h3 className={styles.codeTitle}>Shape recomendado para intake</h3>
                </div>
                <span className={styles.codeStatus}>governance-first</span>
              </div>
              <pre className={styles.codeBlock}>{correctedPayload}</pre>
              <div className={styles.codeNote}>
                <strong>Como usar:</strong>{' '}
                se <code>hosting_model</code> for cloud/SaaS/terceiro, a classe recomendada é{' '}
                <code>cmdb_ci_function_ai</code>. Se for runtime controlado pelo Itaú, usar{' '}
                <code>cmdb_ci_appl_ai_application</code>. Sem deployment visível, ficar só no ativo de IA.
              </div>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>Scripted REST · process(request, response)</span>
                  <h3 className={styles.codeTitle}>Regra de decisão (pseudocódigo)</h3>
                </div>
                <span className={styles.codeStatus}>sem tabela por intuição</span>
              </div>
              <pre className={styles.codeBlock}>{correctedHandler}</pre>
              <div className={styles.codeNote}>
                <strong>Racional:</strong>{' '}
                a classe deriva da visibilidade operacional e do modelo de hospedagem. Isso protege
                CSDM, evita customização prematura e deixa o desenho pronto para AI Control Tower.
              </div>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>cmdb_rel_ci</span>
                  <h3 className={styles.codeTitle}>Mapa conceitual de relacionamentos</h3>
                </div>
                <span className={styles.codeStatus}>validar na instância</span>
              </div>
              <div className={styles.relTableWrap}>
                <table className={styles.relTable}>
                  <thead>
                    <tr>
                      <th>Parent</th>
                      <th>Mecanismo</th>
                      <th>Child</th>
                      <th>Semântica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relationships.map((r, i) => (
                      <tr key={i}>
                        <td><code>{r[0]}</code></td>
                        <td><span className={styles.relArrow}>{r[1]}</span></td>
                        <td><code>{r[2]}</code></td>
                        <td>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.codeNote}>
                <strong>Nota:</strong> os nomes exatos de relacionamento devem ser validados no CI Class Manager
                e nos plugins ativos do Itaú. A recomendação é preservar semântica CSDM e evitar tipo custom
                quando houver mecanismo nativo.
              </div>
            </div>
          </div>
        </Reveal>

        {/* ─────────── RELEASE MAP ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>evolução</span>
            <h2 className={styles.sectionTitle}>Como manter o desenho compatível com AI Control Tower.</h2>
          </div>
          <div className={styles.matrixWrap}>
            <table className={styles.matrix}>
              <thead>
                <tr>
                  <th>Release</th>
                  <th>Leitura arquitetural</th>
                  <th>Decisão recomendada</th>
                </tr>
              </thead>
              <tbody>
                {releaseRows.map(([release, reading, decision, releaseClass]) => (
                  <tr key={release}>
                    <td><span className={`${styles.releaseTag} ${releaseClass}`}>{release}</span></td>
                    <td>{reading}</td>
                    <td>{decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.matrixNote}>
            O objetivo é governança acionável agora, sem bloquear descoberta, runtime, AI Control Tower e evolução nativa futura.
          </p>
        </Reveal>

        {/* ─────────── COMO AJUDAMOS ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>condução da reunião</span>
            <h2 className={styles.sectionTitle}>
              Sair da reunião com critério, exemplos e piloto.
            </h2>
            <p className={styles.sectionSub}>
              A melhor reunião amanhã é sair com critério de decisão, exemplos classificados,
              campos mínimos e piloto. Sem debate abstrato de classe.
            </p>
          </div>

          <motion.div
            className={styles.helpGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            {helpItems.map((h) => (
              <motion.article
                key={h.title}
                className={styles.helpCard}
                variants={cardItem}
                whileHover={reduced ? undefined : { y: -5, borderColor: 'rgba(255, 184, 112, 0.55)' }}
              >
                <span className={styles.helpIcon}>{h.icon}</span>
                <h3 className={styles.helpTitle}>{h.title}</h3>
                <p className={styles.helpDesc}>{h.desc}</p>
                <span className={styles.helpEffort}>{h.effort}</span>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── ROADMAP ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div id="roadmap" />
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>execução</span>
            <h2 className={styles.sectionTitle}>Roadmap de quatro semanas para piloto auditável.</h2>
          </div>
          <motion.div
            className={styles.roadmap}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {roadmap.map(([when, title, desc, owner], index) => (
              <motion.article
                key={title}
                className={`${styles.roadmapItem} ${index === 0 ? styles.done : ''}`}
                variants={cardItem}
              >
                <p className={styles.roadmapWhen}>{when}</p>
                <h3 className={styles.roadmapTitle}>{title}</h3>
                <p className={styles.roadmapDesc}>{desc}</p>
                <span className={styles.roadmapOwner}>{owner}</span>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── PERGUNTAS ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>perguntas de controle</span>
            <h2 className={styles.sectionTitle}>O checklist que evita CMDB decorativa.</h2>
          </div>
          <motion.div
            className={styles.questionGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            {questions.map((question, index) => (
              <motion.article
                key={question}
                className={styles.questionCard}
                variants={cardItem}
                whileHover={reduced ? undefined : { y: -4, borderColor: 'rgba(236, 112, 0, 0.4)' }}
              >
                <span className={styles.questionNum}>{String(index + 1).padStart(2, '0')}</span>
                <p className={styles.questionText}>{question}</p>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── FONTES OFICIAIS ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div id="fontes-oficiais" />
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>fontes oficiais</span>
            <h2 className={styles.sectionTitle}>Links para sustentar a conversa com o cliente.</h2>
            <p className={styles.sectionSub}>
              Use estes materiais como base de validação com arquitetura, CMDB owner e governança.
              A instância do Itaú ainda deve confirmar plugins ativos, nomes de relacionamento e
              release aplicável.
            </p>
          </div>

          <motion.div
            className={styles.sourcesGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            {officialSources.map((source) => (
              <motion.a
                key={source.href}
                className={styles.sourceCard}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                variants={cardItem}
                whileHover={cardHover}
              >
                <span className={styles.sourceTag}>{source.tag}</span>
                <h3>{source.title}</h3>
                <p>{source.desc}</p>
                <span className={styles.sourceLink}>
                  Abrir fonte oficial <Link2 size={14} strokeWidth={2} aria-hidden="true" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── AI CONTROL TOWER FLOW ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div id="ai-control-tower-flow" />
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>AI Control Tower</span>
            <h2 className={styles.sectionTitle}>Como o AI Control Tower fortalece essa arquitetura.</h2>
            <p className={styles.sectionSub}>
              O desenho proposto já prepara os registros para uma camada de controle central:
              descoberta, inventário, risco, runtime, valor e workflows ServiceNow conectados
              ao CSDM.
            </p>
          </div>

          <motion.div
            className={styles.controlTower}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {aiControlTowerFlow.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.article
                  key={step.step}
                  className={styles.controlStep}
                  variants={cardItem}
                  whileHover={cardHover}
                >
                  <div className={styles.controlStepTop}>
                    <span className={styles.controlStepNum}>{step.step}</span>
                    <span className={styles.controlIcon}>
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <strong>{step.outcome}</strong>
                  {index < aiControlTowerFlow.length - 1 && (
                    <span className={styles.controlConnector} aria-hidden="true">→</span>
                  )}
                </motion.article>
              )
            })}
          </motion.div>

          <div className={styles.controlTowerSummary}>
            <Bot size={28} strokeWidth={1.8} aria-hidden="true" />
            <p>
              Para o Itaú, o ganho é sair de cadastro manual para controle contínuo: todo agente
              tem owner, risco, runtime, dependências, serviço impactado e ação operacional quando
              algo muda.
            </p>
          </div>
        </Reveal>

        {/* ─────────── CTA ─────────── */}
        <motion.section
          className={styles.cta}
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: motionEase }}
        >
          <div className={styles.ctaInner}>
            <div>
              <p className={styles.ctaKicker}>próxima decisão</p>
              <h2 className={styles.ctaTitle}>Aprovar piloto com regra de decisão, owners e 3 a 5 agentes reais.</h2>
              <p className={styles.ctaSub}>
                O ganho não é escolher uma tabela. É transformar agente de IA em ativo governável,
                com deployment rastreável e contexto CSDM suficiente para adoção segura.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a className={styles.ctaActionPrimary} href="#roadmap">Ver execução</a>
              <a className={styles.ctaActionSecondary} href="#fontes-oficiais">Fontes oficiais</a>
              <a className={styles.ctaActionSecondary} href="#ai-control-tower-flow">Flow AICT</a>
            </div>
          </div>
        </motion.section>

        <footer className={styles.confidential}>
          <span>Material executivo reservado · Itaú × ServiceNow</span>
          <span className={styles.confidentialAuthor}>CSDM 5 · CMDB · AI Control Tower</span>
        </footer>
      </div>
    </main>
  )
}
