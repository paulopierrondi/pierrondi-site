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
      'Use quando o agente, skill ou capacidade de IA é consumido como serviço gerenciado: Now Assist, Azure AI Foundry, AWS Bedrock, Copilot Studio, SaaS ou plataforma hospedada por terceiro.',
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
    meta: 'alm_ai_system_digital_asset · cmdb_ai_system_product_model',
    reason:
      'Crie AI System Digital Asset para declarar uso, dono, risco, modelo, dataset, prompt, ferramenta e finalidade. O Product Model classifica o tipo de AI System; a CI só entra quando há deployment visível.',
  },
  {
    kind: 'approved',
    item: 'Vínculo governança ↔ runtime',
    meta: 'cmdb_rel_asset_ci · Asset-CI Relationship',
    reason:
      'Quando houver CI, ligar o AI Digital Asset ao CI pelo relacionamento Asset-CI. Isso evita tratar governança de ativo e runtime operacional como registros desconectados.',
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
      'Bom caminho para evitar inventário paralelo: o cadastro deve validar classe, owner, risco, dados, ambiente, suporte, source_unique_id e ciclo de vida antes de virar registro operacional.',
  },
  {
    kind: 'adjust',
    item: 'Pipeline não substitui discovery enterprise',
    meta: 'Service Graph Connectors · AI Control Tower',
    reason:
      'Pipeline Git cobre agentes governados pelo processo de engenharia. Para shadow AI, SaaS e hyperscalers, a estratégia precisa prever discovery/SGC e reconciliação com a CMDB.',
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
    meta: 'correlation_id / external_id / provider_resource_id / source_unique_id',
    reason:
      'Sem identificador externo, o inventário da CMDB fica desconectado de execução real, observabilidade, custo, logs, AI Control Tower, IRE e auditoria.',
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
      'Criar AI System Digital Asset em alm_ai_system_digital_asset, com Product Model em cmdb_ai_system_product_model, owner, finalidade, risco, dados, provider, status e ciclo de vida.',
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
      'Amarrar change, incident, revisão de risco, evidência de teste, kill switch, decommission, recertificação de acesso e deduplicação via IRE.',
  },
]

const releaseRows = [
  ['Agora', 'Pacificar a semântica sem criar modelo paralelo.', 'AI Digital Asset para governança; CI só para deployment visível.', styles.releaseVancouver],
  ['Sandbox', 'Testar com dados reais sem sujar dev/prod.', '3 a 5 agentes em ambiente descartável, com source_unique_id e owner.', styles.releaseWashington],
  ['Piloto', 'Provar rastreabilidade ponta a ponta.', 'Asset-CI via cmdb_rel_asset_ci, Service Instance e change/incident coverage.', styles.releaseXanadu],
  ['AICT', 'Preparar descoberta e inventário centralizado.', 'Service Graph Connectors + IRE para reconciliar pipeline, cloud e shadow AI.', styles.releaseYokohama],
  ['Carga em escala', 'Evitar CMDB decorativa e inventário duplicado.', 'Métricas de completude, atualização, risco, duplicidade e cobertura por domínio.', styles.releaseZurich],
]

const roadmap = [
  ['Semana 1', 'Taxonomia e intake mínimo', 'Fechar critérios de classe, campos obrigatórios, owner, risco, dados, source_unique_id e ciclo de vida.', 'Gaia + ServiceNow'],
  ['Semana 2', 'Sandbox descartável', 'Cadastrar 3 a 5 agentes reais com AI Digital Asset, CI quando aplicável e relação com Service Instance.', 'Squad Gaia'],
  ['Semana 3', 'Piloto governado', 'Amarrar Asset-CI, aprovação, change, incident, revisão de risco, evidência de teste, IRE e kill switch.', 'Governança + Operação'],
  ['Semana 4', 'Go/no-go para carga em escala', 'Publicar visão executiva: cobertura, risco, gaps, owners, runtime correlacionado e próximos domínios.', 'Squad + Governança'],
]

const questions = [
  'Esse item é uso/ativo de IA, deployment técnico ou serviço de negócio?',
  'O agente roda em SaaS/cloud/terceiro ou em infraestrutura controlada pelo Itaú?',
  'Existe deployment visível e operacional para justificar CI, ou só governança de ativo?',
  'Qual Business Application, Digital Product ou Service Instance consome esse agente?',
  'Que dados o agente acessa e qual classificação LGPD/risco se aplica?',
  'Quem aprova mudança de modelo, prompt, permissão, ferramenta ou dataset?',
  'Qual external_id/correlation_id/source_unique_id liga CMDB ao runtime, logs, custo e AI Control Tower?',
  'Esse registro veio da esteira, de Service Graph Connectors, de Now Assist sync ou de cadastro manual?',
  'Qual evidência prova que o agente continua aderente depois de uma mudança?',
]

const relationships: Array<[string, string, string, string]> = [
  ['AI System Product Model', 'classifica', 'cmdb_ai_system_product_model', 'Tipo de AI system, agente, skill ou capacidade'],
  ['AI System Digital Asset', 'declara governança', 'alm_ai_system_digital_asset', 'Uso, dono, finalidade, risco e ciclo de vida'],
  ['AI System Digital Asset', 'cmdb_rel_asset_ci', 'cmdb_ci_function_ai ou cmdb_ci_appl_ai_application', 'Liga governança ao deployment quando houver CI'],
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
    title: 'Sandbox com agentes reais',
    desc: 'Selecionar 3 a 5 agentes que já existam ou estejam próximos de produção, cobrindo SaaS/cloud e infraestrutura controlada, sem contaminar dev/prod.',
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
    desc: 'Validar semântica contra CSDM 5, CI Class Manager, CMDB CI Class Models, IRE, AI Asset Inventory e roadmap de AI Control Tower.',
    effort: 'pontual',
  },
]

const sourceChecks = [
  {
    title: 'Classe AI & Model Application',
    fact:
      'A documentação do CMDB CI Class Models descreve cmdb_ci_appl_ai_application para aplicações de IA executadas em Linux, Windows, containers ou Kubernetes.',
    href: 'https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/cmdb-ci-class-model-list-of-classes.html',
  },
  {
    title: 'Classe AI Function',
    fact:
      'As release notes do CMDB CI Class Models descrevem cmdb_ci_function_ai para AI SaaS/cloud com serviços escaláveis e on-demand.',
    href: 'https://www.servicenow.com/docs/en-US/bundle/store-release-notes/page/release-notes/store/it-operations-management/store-rn-itom-cmdb-class-models.html',
  },
  {
    title: 'AI Asset Inventory',
    fact:
      'AI Control Tower organiza AI systems, models, prompts, datasets e MCP servers; AI system pode ser associado a modelos, prompts, datasets e tools.',
    href: 'https://www.servicenow.com/docs/r/intelligent-experiences/ai-control-tower/ai-inventory.html',
  },
  {
    title: 'Discovery e shadow AI',
    fact:
      'Enterprise AI discovery usa Service Graph Connectors para descobrir agentes, modelos, prompts e tools e adicioná-los à CMDB para governança unificada.',
    href: 'https://www.servicenow.com/docs/r/intelligent-experiences/ai-control-tower/enterprise-ai-discovery.html',
  },
  {
    title: 'Asset-CI Relationship',
    fact:
      'Padrões de discovery documentam o vínculo entre AI Function e AI System Digital Asset no Asset-CI Relationship cmdb_rel_asset_ci.',
    href: 'https://www.servicenow.com/docs/r/yokohama/it-operations-management/itom-visibility/microsoft-foundry-classic-pattern.html',
  },
  {
    title: 'IRE e duplicidade',
    fact:
      'Identification and Reconciliation Engine usa regras para identificar/reconciliar CIs, prevenir duplicidade e controlar fontes autoritativas.',
    href: 'https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/c_CompsandProcessIDandReconcil.html',
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
    "asset_table": "alm_ai_system_digital_asset",
    "product_model_table": "cmdb_ai_system_product_model",
    "purpose": "Apoiar respostas e abertura de solicitacoes",
    "risk_tier": "HIGH",
    "data_classification": "CONFIDENTIAL",
    "pii_handling": true,
    "decision_authority": "HUMAN_IN_LOOP"
  },

  "deployment": {
    "hosting_model": "CLOUD_MANAGED",
    "recommended_ci_class": "cmdb_ci_function_ai",
    "asset_ci_relationship_table": "cmdb_rel_asset_ci",
    "provider": "AZURE_OPENAI",
    "environment": "PROD",
    "region_or_residency": "BR",
    "external_id": "azure-ai-foundry-agent-123",
    "source_unique_id": "provider-resource-id-or-sgc-source-id"
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
    "last_review_date": "2026-05-29",
    "ire_policy": "create/update CI through IRE-aware integration"
  }
}`

const correctedHandler = `if no approved AI use exists:
  create AI System Digital Asset first [alm_ai_system_digital_asset]
  classify the AI System Product Model [cmdb_ai_system_product_model]
  capture owner, purpose, risk, data, provider, review cadence

if deployment is not visible / not operational:
  do not create operational CI yet
  keep governance at AI Digital Asset layer

if hosting_model in [SAAS, CLOUD_MANAGED, THIRD_PARTY, SERVICENOW_HOSTED]:
  create/link CI as cmdb_ci_function_ai

if hosting_model in [ITAU_MANAGED, ON_PREM, PRIVATE_CLOUD, CONTAINER, KUBERNETES]:
  create/link CI as cmdb_ci_appl_ai_application

always:
  link AI Asset to CI through cmdb_rel_asset_ci when CI exists
  link CI to Service Instance / business context
  require owner, support group, risk, data classification, source_unique_id
  use Service Graph Connectors / IRE-aware path for discovery or imports
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

const csdmMapDomains: Array<{
  key: string
  title: string
  owner: string
  blocks: Array<{
    title: string
    table: string
    recommendation: string
    icon: LucideIcon
  }>
}> = [
  {
    key: 'build',
    title: 'Build & Integration',
    owner: 'Squad Gaia · DevOps · Change',
    blocks: [
      {
        title: 'DevOps Change Data Model',
        table: 'Change · release · deployment pipeline',
        recommendation: 'Toda alteração de prompt, modelo, API ou permissão entra como mudança governada.',
        icon: Workflow,
      },
      {
        title: 'SDLC Component',
        table: 'repo · package · prompt bundle · test evidence',
        recommendation: 'Guardar evidência técnica do agente: versão, pipeline, testes e rollback.',
        icon: GitBranch,
      },
    ],
  },
  {
    key: 'design',
    title: 'Design & Planning',
    owner: 'Enterprise Architect · Digital Product Owner · Data Steward',
    blocks: [
      {
        title: 'Business Capability',
        table: 'capability de atendimento, crédito, operações ou risco',
        recommendation: 'Começar pelo capability que o agente melhora; isso evita CI sem valor de negócio.',
        icon: Building2,
      },
      {
        title: 'Business Application',
        table: 'aplicação ou produto digital consumidor',
        recommendation: 'Relacionar o agente ao produto/canal Itaú que recebe benefício ou risco.',
        icon: Boxes,
      },
      {
        title: 'Information Object',
        table: 'cliente · conta · contrato · documento · transação',
        recommendation: 'Classificar dado, LGPD/PII, data residency e restrições antes do deployment.',
        icon: Database,
      },
    ],
  },
  {
    key: 'ideation',
    title: 'Ideation & Strategy',
    owner: 'Product Owner · AI Governance',
    blocks: [
      {
        title: 'Product Idea',
        table: 'novo agente, skill ou automação com IA',
        recommendation: 'Registrar a intenção e o racional de valor antes de criar CI na CMDB.',
        icon: Bot,
      },
      {
        title: 'Planning Item',
        table: 'épico · demanda · backlog item',
        recommendation: 'Converter em piloto quando owner, risco, dados e escopo estiverem explícitos.',
        icon: FileCheck2,
      },
    ],
  },
  {
    key: 'delivery',
    title: 'Service Delivery',
    owner: 'Service Instance Owner · Service Delivery Owner',
    blocks: [
      {
        title: 'Service Instance',
        table: 'cmdb_ci_service_auto',
        recommendation: 'Ponto de impacto operacional: incidente, mudança, disponibilidade, suporte e health.',
        icon: Network,
      },
      {
        title: 'AI Function',
        table: 'cmdb_ci_function_ai',
        recommendation: 'Usar para SaaS/cloud/terceiro: Now Assist, Azure AI Foundry, Bedrock, Copilot.',
        icon: Cloud,
      },
      {
        title: 'AI & Model Application',
        table: 'cmdb_ci_appl_ai_application',
        recommendation: 'Usar para workload controlado pelo Itaú: container, Kubernetes, private cloud, on-prem.',
        icon: Server,
      },
      {
        title: 'Dynamic CI Group',
        table: 'grupo de agentes críticos por domínio',
        recommendation: 'Agrupar agentes por jornada/serviço para análise de risco, disponibilidade e impacto.',
        icon: Activity,
      },
    ],
  },
  {
    key: 'consumption',
    title: 'Service Consumption',
    owner: 'Business Relationship Manager · Customer Service Manager',
    blocks: [
      {
        title: 'Business Service',
        table: 'serviço de negócio impactado',
        recommendation: 'Explicar quem consome o resultado do agente e qual serviço o banco presta.',
        icon: Building2,
      },
      {
        title: 'Business Offering',
        table: 'oferta/capacidade entregue ao negócio',
        recommendation: 'Mapear oferta que o agente acelera: atendimento assistido, triagem, análise, execução.',
        icon: Boxes,
      },
      {
        title: 'Catalog',
        table: 'request de registro, revisão, recertificação, decommission',
        recommendation: 'Transformar governança em solicitação operacional, não planilha.',
        icon: ScrollText,
      },
    ],
  },
  {
    key: 'foundation',
    title: 'Foundation',
    owner: 'CMDB Owner · Data Steward · Contract Manager',
    blocks: [
      {
        title: 'Organization & People',
        table: 'company · BU · department · group · user · team',
        recommendation: 'Preencher owner, support_group, approver, risk owner e data steward.',
        icon: Building2,
      },
      {
        title: 'Lifecycle & Knowledge',
        table: 'life cycle · knowledge · policy · evidence',
        recommendation: 'Definir status, lifecycle phase, revisão periódica, evidência e runbook.',
        icon: ScrollText,
      },
      {
        title: 'Contracts & Platform',
        table: 'contract · location · CMDB group · product model',
        recommendation: 'Amarrar provedor, contrato, região, data residency e custo quando aplicável.',
        icon: ShieldCheck,
      },
    ],
  },
]

const aiOverlayBlocks = [
  {
    title: 'AI Digital Asset',
    table: 'alm_ai_system/model/dataset/prompt_digital_asset',
    desc: 'Registro de governança: finalidade, owner, risco, dados, modelo, prompt, dataset e revisão.',
  },
  {
    title: 'External ID / Correlation ID',
    table: 'provider_resource_id · runtime_id · aict_id',
    desc: 'Chave que liga CMDB, runtime, observabilidade, custo e AI Control Tower.',
  },
]

const csdmMapRelations = [
  'Product Idea → Planning Item → AI Digital Asset',
  'Business Application → Service Instance → AI CI',
  'AI Digital Asset → AI Function ou AI & Model Application',
  'AI CI → modelo, prompt, dataset, API e vector store',
  'AI Control Tower → revisão, risco, runtime, auditoria e remediation',
]

const resolutionSteps: Array<{
  step: string
  title: string
  desc: string
}> = [
  {
    step: '01',
    title: 'Fixar owners por camada',
    desc: 'Digital Product Owner para valor, Service Instance Owner para operação, Data Steward para dados e AI Governance para risco.',
  },
  {
    step: '02',
    title: 'Criar intake único',
    desc: 'Form/API com owner, support group, finalidade, dado, risco, modelo, autonomia, ambiente, lifecycle e external_id.',
  },
  {
    step: '03',
    title: 'Decidir classe por runtime',
    desc: 'SaaS/cloud/terceiro vira AI Function. Runtime Itaú-managed vira AI & Model Application. Sem runtime fica só como AI Digital Asset.',
  },
  {
    step: '04',
    title: 'Relacionar no CSDM',
    desc: 'Business Application/Digital Product → Service Instance → AI CI; AI Digital Asset → AI CI; AI CI → dependências.',
  },
  {
    step: '05',
    title: 'Operar controles',
    desc: 'Change para modelo/prompt/API, revisão periódica, kill switch, recertificação, evidência de teste e decommission.',
  },
  {
    step: '06',
    title: 'Preparar AI Control Tower',
    desc: 'Guardar IDs externos e lifecycle para descoberta, inventário, risco, runtime, compliance e workflows automáticos.',
  },
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

const architecturalNotationSteps: Array<{
  id: string
  lane: string
  title: string
  table: string
  decision: string
  owner: string
  toneClass: string
}> = [
  {
    id: '01',
    lane: 'Negócio',
    title: 'Business capability / aplicação consumidora',
    table: 'Business Capability · Business Application · Digital Product',
    decision: 'Explica valor, jornada impactada e criticidade antes de qualquer CI de IA.',
    owner: 'Enterprise Architecture + Product Owner',
    toneClass: styles.notationBusiness,
  },
  {
    id: '02',
    lane: 'Serviço',
    title: 'Service Instance como ponto operacional',
    table: 'cmdb_ci_service_auto',
    decision: 'Onde incidente, mudança, health, suporte e impacto ficam visíveis no CSDM.',
    owner: 'Service Owner + Operação',
    toneClass: styles.notationService,
  },
  {
    id: '03',
    lane: 'Governança',
    title: 'AI Digital Asset governa o uso',
    table: 'alm_ai_system_digital_asset · cmdb_ai_system_product_model',
    decision: 'Registra finalidade, risco, dados, lifecycle, modelo, prompt, dataset e revisão.',
    owner: 'AI Governance + Data Steward',
    toneClass: styles.notationGovernance,
  },
  {
    id: '04',
    lane: 'Runtime',
    title: 'CI só quando existe deployment',
    table: 'cmdb_ci_function_ai · cmdb_ci_appl_ai_application',
    decision: 'SaaS/cloud/terceiro vira AI Function; Itaú-managed vira AI & Model Application.',
    owner: 'Technical Owner + Support Group',
    toneClass: styles.notationRuntime,
  },
  {
    id: '05',
    lane: 'Controle',
    title: 'AI Control Tower consolida e aciona',
    table: 'AI inventory · discovery · risk · runtime · workflows',
    decision: 'Descobre ativos, classifica risco, observa runtime e dispara revisão/remediation.',
    owner: 'AI Governance + Platform Ops',
    toneClass: styles.notationControl,
  },
]

const controlTowerOperatingModel: Array<{
  phase: string
  input: string
  output: string
}> = [
  {
    phase: 'Discover',
    input: 'Service Graph Connectors, Now Assist, hyperscalers, SaaS e esteira Itaú',
    output: 'AI systems, agents, models, prompts, datasets, tools e MCP servers entram no inventário.',
  },
  {
    phase: 'Govern',
    input: 'Owner, risco, dados, lifecycle, approval state e managed/unmanaged',
    output: 'Steward review e política de governança deixam de ser planilha.',
  },
  {
    phase: 'Relate',
    input: 'cmdb_rel_asset_ci, Service Instance, Business Application e source_unique_id',
    output: 'AI asset, CI, serviço e runtime ficam reconciliáveis por IRE e auditáveis.',
  },
  {
    phase: 'Act',
    input: 'Mudança de modelo, prompt, permissão, dataset, postura ou runtime',
    output: 'Change, remediation, recertificação, exceção, kill switch ou decommission.',
  },
]

const architecturePitchCards = [
  {
    kicker: 'Tese',
    title: 'Architecture Blueprint, não cadastro de tabela.',
    copy:
      'O site orienta a conversa para uma arquitetura de governança: onde o agente mora, quem responde, que serviço ele impacta e como vira operação segura.',
  },
  {
    kicker: 'CSDM',
    title: 'Valor, serviço, ativo e runtime ficam separados.',
    copy:
      'Business Service e Service Instance explicam impacto; AI Digital Asset governa risco; AI Function ou AI & Model Application representam deployment.',
  },
  {
    kicker: 'Próximo passo',
    title: 'Architecture Sprint com 3 a 5 agentes reais.',
    copy:
      'Validar owner, data classification, source_unique_id, relação Asset-CI, Service Instance e readiness para AI Control Tower antes de carga em escala.',
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

function ArchitecturalNotationDiagram({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.div
      className={styles.notationBoard}
      data-itau-architecture-notation="ServiceNow Architectural Notation"
      aria-label="ServiceNow Architectural Notation para CSDM e AI Control Tower no Itaú"
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: motionEase }}
    >
      <div className={styles.notationHeader}>
        <div>
          <span>ServiceNow Architectural Notation</span>
          <strong>CSDM + AI Control Tower decision model</strong>
        </div>
        <p>Leitura-alvo para discutir com arquitetura: camada, registro, decisão e owner.</p>
      </div>

      <div className={styles.notationFlow}>
        {architecturalNotationSteps.map((step, index) => (
          <motion.article
            key={step.id}
            className={`${styles.notationNode} ${step.toneClass}`}
            variants={cardItem}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            transition={{ delay: reduced ? 0 : index * 0.06 }}
          >
            <div className={styles.notationNodeTop}>
              <span>{step.id}</span>
              <strong>{step.lane}</strong>
            </div>
            <h3>{step.title}</h3>
            <code>{step.table}</code>
            <p>{step.decision}</p>
            <small>{step.owner}</small>
            {index < architecturalNotationSteps.length - 1 && (
              <i className={styles.notationArrow} aria-hidden="true">→</i>
            )}
          </motion.article>
        ))}
      </div>

      <div className={styles.operatingModel} aria-label="AI Control Tower Operating Model">
        <div className={styles.operatingModelTitle}>
          <span>AI Control Tower Operating Model</span>
          <strong>Descobrir · Governar · Relacionar · Acionar</strong>
        </div>
        <ol>
          {controlTowerOperatingModel.map((phase) => (
            <li key={phase.phase}>
              <strong>{phase.phase}</strong>
              <span>{phase.input}</span>
              <p>{phase.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}

function TargetArchitectureView({ reduced }: { reduced: boolean | null }) {
  const hover = reduced ? undefined : { y: -5, borderColor: 'rgba(236, 112, 0, 0.5)' }

  return (
    <motion.div
      className={styles.architectureBoard}
      data-itau-target-architecture="AI Control Tower Operating Model target architecture"
      variants={stagger}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className={styles.targetArchitectureHeader}>
        <span>Target Architecture</span>
        <strong>Visão final: CSDM como sistema de registro, AI Control Tower como sistema de controle.</strong>
        <p>
          A decisão consolidada: AI Digital Asset governa uso e risco; AI CI representa runtime
          quando existe deployment; Service Instance conecta impacto operacional; AI Control Tower
          descobre, observa, mede risco e aciona workflows.
        </p>
      </div>

      <div className={styles.architectureNodes}>
        {architectureNodes.map((node) => {
          const Icon = node.icon
          return (
            <motion.article
              key={node.title}
              className={`${styles.archNode} ${node.toneClass}`}
              variants={cardItem}
              whileHover={hover}
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
  )
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

function MapBlock({
  block,
  reduced,
}: {
  block: {
    title: string
    table: string
    recommendation: string
    icon: LucideIcon
  }
  reduced: boolean | null
}) {
  const Icon = block.icon

  return (
    <motion.article
      className={styles.mapBlock}
      whileHover={reduced ? undefined : { y: -3 }}
    >
      <span className={styles.mapBlockIcon} aria-hidden="true">
        <Icon size={16} strokeWidth={1.9} />
      </span>
      <div>
        <h4>{block.title}</h4>
        <code>{block.table}</code>
        <p>{block.recommendation}</p>
      </div>
    </motion.article>
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
            className={styles.heroBlueprintGrid}
          >
            <div className={styles.heroCopy}>
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
                ServiceNow Architectural Notation para governar AI Agents no Itaú.
              </motion.h1>
              <motion.p className={styles.heroLede} variants={fadeUp}>
                O pitch sai do 3D e vira notação arquitetural: camadas CSDM, decisão de classe,
                governança do ativo, runtime, relações e uma visão final para o AI Control Tower
                descobrir, reconciliar, observar e acionar a operação.
              </motion.p>
              <motion.div className={styles.heroMeta} variants={fadeUp}>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>Audience</span>
                  <span className={styles.heroMetaValue}>Squad Gaia + Arquitetura + Governança</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>Blueprint</span>
                  <span className={styles.heroMetaValue}>CSDM 5 · CMDB · AI Control Tower</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>Decision</span>
                  <span className={styles.heroMetaValue}>Architecture Sprint → piloto → escala</span>
                </div>
              </motion.div>
              <motion.div className={styles.heroActions} variants={fadeUp}>
                <a href="#architecture-blueprint" className={styles.heroPrimaryAction}>
                  Ver diagramas
                </a>
                <a href="#mapa-csdm-itau" className={styles.heroSecondaryAction}>
                  Diagrama CSDM
                </a>
                <a
                  href="/itau/itau-ai-governance-architecture-reference.pdf"
                  className={styles.heroReferencePack}
                >
                  Reference Pack PDF
                </a>
                <a
                  href="/itau/itau-ai-governance-architecture-reference.docx"
                  className={styles.heroReferencePack}
                >
                  DOCX
                </a>
              </motion.div>
            </div>

            <motion.aside className={styles.heroSceneWrap} variants={fadeUp}>
              <ArchitecturalNotationDiagram reduced={reduced} />
            </motion.aside>
          </motion.div>
          {!reduced && (
            <motion.div
              className={styles.scrollCue}
              aria-hidden="true"
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>role para o blueprint</span>
              <span className={styles.scrollCueArrow}>↓</span>
            </motion.div>
          )}
        </motion.section>

        {/* ─────────── ARCHITECTURE BLUEPRINT ─────────── */}
        <Reveal className={`${styles.section} ${styles.blueprintSection}`} reduced={reduced}>
          <div id="architecture-blueprint" />
          <div className={styles.blueprintIntro}>
            <div>
              <span className={styles.sectionKicker}>site de arquitetura</span>
              <h2 className={styles.sectionTitle}>A conversa certa é notação arquitetural, não efeito 3D.</h2>
            </div>
            <p>
              O material para o Itaú precisa funcionar como uma decision room: mostra a arquitetura
              ServiceNow CSDM, explica onde o agente vive, consolida as decisões e prepara o
              AI Control Tower para operar descoberta, risco, runtime e lifecycle.
            </p>
          </div>

          <motion.div
            className={styles.blueprintPitchGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.18 }}
          >
            {architecturePitchCards.map((card) => (
              <motion.article key={card.title} className={styles.blueprintPitchCard} variants={cardItem}>
                <span>{card.kicker}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </motion.article>
            ))}
          </motion.div>

          <div className={styles.referencePackCallout}>
            <strong>Reference Pack</strong>
            <div>
              <p>
                O DOCX/PDF acompanha essa narrativa: tese executiva, diagrama ServiceNow CSDM,
                modelo de dados, checklist do piloto, fontes oficiais e guardrails para não quebrar
                o Control Tower operacional do pierrondi.dev.
              </p>
              <div className={styles.referencePackLinks}>
                <a href="/itau/itau-ai-governance-architecture-reference.pdf">Abrir PDF</a>
                <a href="/itau/itau-ai-governance-architecture-reference.docx">Baixar DOCX</a>
              </div>
            </div>
          </div>
        </Reveal>

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
          <div id="mapa-csdm-itau" />
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>ServiceNow CSDM Reference Diagram</span>
            <h2 className={styles.sectionTitle}>Como o diagrama CSDM fica para agentes de IA no Itaú.</h2>
            <p className={styles.sectionSub}>
              Abaixo está a leitura prática do CSDM 5: cada domínio recebe os registros, owners e
              decisões necessários para resolver o cadastro de agentes de IA sem criar uma CMDB paralela.
            </p>
          </div>

          <motion.div
            className={styles.csdmMapViewport}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.08 }}
          >
            <div className={styles.csdmMapCanvas} aria-label="Mapa CSDM 5 preenchido para agentes de IA no Itaú">
              <div className={styles.csdmMapTopline}>
                <div>
                  <span className={styles.csdmMark}>CSDM 5</span>
                  <h3>AI Agent Governance · Itaú</h3>
                </div>
                <p>
                  Regra central: primeiro governar o ativo de IA; depois criar CI somente quando há
                  runtime visível; sempre relacionar ao Service Instance.
                </p>
              </div>

              {csdmMapDomains.map((domain) => (
                <section
                  key={domain.key}
                  className={`${styles.mapDomain} ${styles[`mapDomain_${domain.key}`]}`}
                >
                  <div className={styles.mapDomainHeader}>
                    <h3>{domain.title}</h3>
                    <span>{domain.owner}</span>
                  </div>
                  <div className={styles.mapDomainBlocks}>
                    {domain.blocks.map((block) => (
                      <MapBlock key={`${domain.key}-${block.title}`} block={block} reduced={reduced} />
                    ))}
                  </div>
                </section>
              ))}

              <section className={styles.mapPortfolio}>
                <span className={styles.portfolioIcon} aria-hidden="true">
                  <ShieldCheck size={24} strokeWidth={1.8} />
                </span>
                <h3>Manage Portfolio</h3>
                <p>AI Governance Board prioriza, aprova risco e decide entrada no piloto.</p>
              </section>

              <section className={styles.aiOverlayPanel}>
                {aiOverlayBlocks.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <code>{item.table}</code>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </section>

              <section className={styles.mapRelationsPanel}>
                <h3>Relações que resolvem o problema</h3>
                <ol>
                  {csdmMapRelations.map((relation) => (
                    <li key={relation}>{relation}</li>
                  ))}
                </ol>
              </section>
            </div>
          </motion.div>

          <motion.div
            className={styles.resolutionGrid}
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            {resolutionSteps.map((step) => (
              <motion.article
                key={step.step}
                className={styles.resolutionCard}
                variants={cardItem}
                whileHover={cardHover}
              >
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.article>
            ))}
          </motion.div>
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

        {/* ─────────── BASE SERVICENOW ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>checado na base ServiceNow</span>
            <h2 className={styles.sectionTitle}>O que podemos afirmar sem forçar a barra.</h2>
            <p className={styles.sectionSub}>
              A recomendação abaixo foi ajustada para não prometer mais do que a documentação sustenta:
              AI Control Tower dá inventário, discovery, governança, risk/compliance, observabilidade e valor;
              a qualidade do resultado ainda depende de source IDs, IRE, relacionamentos e processo.
            </p>
          </div>

          <div className={styles.sourceGrid}>
            {sourceChecks.map((source) => (
              <a
                key={source.title}
                className={styles.sourceCard}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.sourceLabel}>ServiceNow Docs</span>
                <h3 className={styles.sourceTitle}>{source.title}</h3>
                <p className={styles.sourceFact}>{source.fact}</p>
              </a>
            ))}
          </div>
        </section>

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
              para contexto CSDM. AI Control Tower entra como camada de discovery, lifecycle,
              risk/compliance, observabilidade e valor.
            </h3>
            <ul className={styles.verdictList}>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>Ativo de IA</p>
                <p className={styles.verdictItemDesc}>Declara uso, dono, propósito, dados, risco, provedor, revisão e ciclo de vida em <code>alm_ai_system_digital_asset</code>.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>CI operacional</p>
                <p className={styles.verdictItemDesc}>Representa o deployment visível: SaaS/cloud como AI Function; stack Itaú como AI & Model Application.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>CSDM</p>
                <p className={styles.verdictItemDesc}>Conecta o CI ao Service Instance, aplicação, serviço, owner, impacto operacional e reconciliação via IRE.</p>
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

          <TargetArchitectureView reduced={reduced} />
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
            O objetivo é governança acionável agora, sem bloquear descoberta, runtime, AI Control Tower, IRE e evolução nativa futura.
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
