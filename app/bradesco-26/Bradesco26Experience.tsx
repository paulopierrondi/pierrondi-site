'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Brain,
  CircleDot,
  Code2,
  DatabaseZap,
  Gauge,
  GitBranch,
  LockKeyhole,
  Network,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import styles from './Bradesco26Experience.module.css'

type Lens = 'executivo' | 'tecnico' | 'valor'
type Theme = 'all' | 'ai' | 'data' | 'ops' | 'risk' | 'dev'

const lenses: Array<{ id: Lens; label: string; helper: string }> = [
  { id: 'executivo', label: 'Executivo', helper: 'Por que importa' },
  { id: 'tecnico', label: 'Tecnico', helper: 'Como viabilizar' },
  { id: 'valor', label: 'Valor', helper: 'Proximo movimento' },
]

const themes: Array<{ id: Theme; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'ai', label: 'IA e agentes' },
  { id: 'data', label: 'Dados e CMDB' },
  { id: 'ops', label: 'Operacoes' },
  { id: 'risk', label: 'Risco' },
  { id: 'dev', label: 'Plataforma dev' },
]

const capabilitySet = [
  'ITSM',
  'ITOM / CMDB',
  'SPM',
  'HRSD',
  'App Engine',
  'SecOps',
  'IRM / VRM / TPRM',
  'SAM / HAM',
  'CSM / Ouvidoria',
  'IntegrationHub / WDF',
  'Now Assist',
]

const thesis = [
  {
    icon: ShieldCheck,
    title: 'Governar',
    copy: 'Política, identidade, telemetria e auditoria desde o desenho.',
  },
  {
    icon: DatabaseZap,
    title: 'Contextualizar',
    copy: 'Dados, serviços e conhecimento como base para decisão confiável.',
  },
  {
    icon: Workflow,
    title: 'Executar',
    copy: 'Agentes conectando recomendação, aprovação e ação ponta a ponta.',
  },
]

const motionTicker = [
  'AI governance',
  'Context engine',
  'Workflow data fabric',
  'Action Fabric',
  'CMDB / CSDM',
  'Risk by design',
  'System of action',
]

const chapters = [
  {
    number: '01',
    title: 'AI & Plataforma',
    copy: 'AI Control Tower, Otto e Action Fabric como sistema governado de trabalho.',
    items: ['AI Control Tower', 'Otto', 'Action Fabric'],
  },
  {
    number: '02',
    title: 'Developers',
    copy: 'Build Agent, App Engine e Project Arc para escala com padrão e revisão.',
    items: ['Build Agent', 'App Engine', 'Project Arc'],
  },
  {
    number: '03',
    title: 'Autonomous IT',
    copy: 'ITSM, ITOM, CMDB e SPM conectados por contexto operacional.',
    items: ['ITSM', 'ITOM / CMDB', 'SPM'],
  },
  {
    number: '04',
    title: 'FSI & Atendimento',
    copy: 'FSO, CSM e ouvidoria como jornada, evidência e continuidade.',
    items: ['FSO', 'CSM', 'Ouvidoria'],
  },
  {
    number: '05',
    title: 'Security & Risk',
    copy: 'Identidade, ativo, risco e resposta no mesmo sistema de ação.',
    items: ['SecOps', 'IRM / VRM', 'Veza / Armis'],
  },
  {
    number: '06',
    title: 'Arquitetura',
    copy: 'Camadas técnicas para transformar anúncio em plano executável.',
    items: ['WDF', 'Context Engine', 'Guardrails'],
  },
]

const announcements = [
  {
    id: 'control-tower',
    theme: 'ai',
    number: '01',
    icon: Radar,
    title: 'AI Control Tower',
    subtitle: 'Controle central para agentes, modelos, dados, risco e resultado.',
    executive:
      'Tira IA do modo experimento e coloca a operação sob governança, visibilidade e métricas.',
    technical:
      'Exige inventário de agentes, runtime observável, IAM, CMDB, logs, políticas e critérios de aprovação.',
    value:
      'Usar como trilha-mestra para qualquer piloto de Now Assist ou agente externo.',
    bradescoAngle: 'Camada comum para governar Now Assist, agentes internos e agentes externos.',
    architecture: 'Inventario de agentes, runtime observavel, IAM, CMDB, logs, politicas e metricas.',
    operatingModel: 'Fórum único para aprovar exceções, permissoes, risco e entrada em produção.',
    nextMove: 'Escolher um dominio piloto e mapear assistentes/agentes ja existentes.',
    proofPoints: ['Discover', 'Observe', 'Govern', 'Secure', 'Measure'],
    discussion: {
      executivo: 'Quem assina o modelo de governanca de IA operacional?',
      tecnico: 'Quais logs, IAM e CMDB precisam existir antes de producao?',
      valor: 'Qual piloto precisa de governanca antes de escalar?',
    },
  },
  {
    id: 'otto',
    theme: 'ai',
    number: '02',
    icon: Bot,
    title: 'ServiceNow Otto',
    subtitle: 'Interface conversacional única para transformar intenção em resultado.',
    executive:
      'O colaborador pede o resultado. A plataforma decide fluxo, política, aprovação e handoff.',
    technical:
      'Depende de catálogo, base de conhecimento, elegibilidade, identidade, approvals e integrações.',
    value:
      'Começar por jornadas de alto volume e baixa ambiguidade com escala humana clara.',
    bradescoAngle: 'Experiencia unificada para colaborador, operador e lider sem navegar por silos.',
    architecture: 'Intencao, catalogo, KB, identidade, approvals, integrações e handoff humano.',
    operatingModel:
      'Curadoria de jornadas, responsaveis por conhecimento e monitoramento de resolucao.',
    nextMove: 'Selecionar duas jornadas internas com volume alto e regra de elegibilidade clara.',
    proofPoints: ['Natural language', 'Enterprise search', 'Voice', 'Cross-system work'],
    discussion: {
      executivo: 'Qual jornada deve desaparecer do portal e virar conversa resolutiva?',
      tecnico: 'Quais catalogos, bases e approvals precisam estar confiaveis para Otto?',
      valor: 'Onde reduzir navegacao manual sem aumentar risco operacional?',
    },
  },
  {
    id: 'specialists',
    theme: 'ops',
    number: '03',
    icon: Brain,
    title: 'AI Specialists',
    subtitle: 'Agentes por função executando processos completos.',
    executive:
      'O K26 desloca a conversa de assistente individual para trabalho autônomo governado.',
    technical:
      'Precisa de taxonomia, conhecimento confiável, critérios de confiança, exceções e métricas.',
    value:
      'O primeiro piloto deve ter alto volume, caminho conhecido e baixo risco operacional.',
    bradescoAngle: 'Agentes por funcao para tirar trabalho repetitivo da fila, com controle.',
    architecture: 'Taxonomia, conhecimento, regras de excecao, confianca, fila e medicao de resultado.',
    operatingModel: 'Cada agente precisa de responsavel, escopo permitido e criterio de fallback.',
    nextMove: 'Priorizar um processo repetitivo com dados maduros e caminho de resolucao conhecido.',
    proofPoints: ['Role-based agents', 'Exception handling', 'Knowledge quality', 'Human fallback'],
    discussion: {
      executivo: 'Qual operacao ganha escala se o agente resolver o repetitivo?',
      tecnico: 'Quais sinais indicam baixa confianca e retorno imediato para humano?',
      valor: 'Qual processo tem volume suficiente para provar resultado em semanas?',
    },
  },
  {
    id: 'action-fabric',
    theme: 'ai',
    number: '04',
    icon: Network,
    title: 'Action Fabric e MCP',
    subtitle: 'Agentes externos acionando trabalho governado na ServiceNow.',
    executive:
      'A plataforma vira sistema de ação para agentes corporativos, inclusive fora da ServiceNow.',
    technical:
      'Separar leitura de dados de execução: RBAC, OAuth, approvals, auditoria e rollback.',
    value:
      'Integra agentes Microsoft, modelos internos e apps próprios sem perder governança central.',
    bradescoAngle: 'Transforma a ServiceNow no sistema de acao para agentes corporativos.',
    architecture: 'MCP Server, OAuth, tool packages, RBAC, approvals, auditoria e rollback.',
    operatingModel: 'Catalogar quais ações podem ser executadas por agente e com qual aprovacao.',
    nextMove: 'Publicar primeiro um conjunto pequeno de acoes seguras e auditaveis.',
    proofPoints: ['MCP', 'Headless actions', 'Approvals', 'Audit trail'],
    discussion: {
      executivo: 'Quais agentes externos devem agir pela plataforma, e nao fora dela?',
      tecnico: 'Quais ferramentas MCP podem ser expostas sem abrir risco desnecessario?',
      valor: 'Qual acao simples provaria execucao governada ponta a ponta?',
    },
  },
  {
    id: 'context-engine',
    theme: 'data',
    number: '05',
    icon: GitBranch,
    title: 'Context Engine',
    subtitle: 'Contexto operacional para evitar resposta genérica.',
    executive:
      'CMDB e CSDM deixam de ser higiene de TI e viram fundação para IA confiável.',
    technical:
      'Depende de relações, responsáveis, serviços, políticas, SLAs, histórico e conhecimento.',
    value:
      'Conectar o programa de CMDB ao roadmap de IA e automação governada.',
    bradescoAngle: 'Converte CMDB/CSDM em contexto vivo para decisao automatizada.',
    architecture: 'Servicos, responsaveis, dependencias, SLAs, politicas, conhecimento e historico.',
    operatingModel: 'Governanca de qualidade de contexto ligada aos dominios de automacao.',
    nextMove: 'Escolher relacoes criticas para um caso de IA antes de ampliar escopo.',
    proofPoints: ['CMDB', 'CSDM', 'Knowledge Graph', 'Context Engine'],
    discussion: {
      executivo: 'Qual decisao de IA fica insegura sem contexto de servico?',
      tecnico: 'Quais relacionamentos da CMDB sao obrigatorios para o primeiro agente?',
      valor: 'Qual dominio melhora se a CMDB virar contexto de decisao?',
    },
  },
  {
    id: 'wdf',
    theme: 'data',
    number: '06',
    icon: Boxes,
    title: 'Workflow Data Fabric',
    subtitle: 'Dados em tempo real sem copiar tudo para dentro da instância.',
    executive:
      'A promessa é enriquecer decisões com dados onde eles vivem, reduzindo fricção de integração.',
    technical:
      'Tratar fonte de verdade, autorização, latência, contratos de dados, lineage e observabilidade.',
    value:
      'Escolher poucos dados externos que destravam decisões de IT, risco, atendimento ou portfolio.',
    bradescoAngle: 'Permite enriquecer workflows com dados externos sem replicar tudo.',
    architecture: 'Fonte de verdade, autorizacao, latencia, contratos de dados, lineage e observabilidade.',
    operatingModel: 'Responsaveis por dados conectados aos donos dos workflows consumidores.',
    nextMove: 'Mapear tres dados externos que mudam uma decisao operacional concreta.',
    proofPoints: ['Data federation', 'Authorization', 'Lineage', 'Operational context'],
    discussion: {
      executivo: 'Qual dado fora da plataforma muda uma decisao importante?',
      tecnico: 'Como controlar autorizacao, latencia e linhagem antes de usar em IA?',
      valor: 'Qual integracao evita trabalho manual sem criar copia desnecessaria?',
    },
  },
  {
    id: 'security-risk',
    theme: 'risk',
    number: '07',
    icon: LockKeyhole,
    title: 'Autonomous Security and Risk',
    subtitle: 'Identidades, ativos e risco conectados ao mesmo sistema de ação.',
    executive:
      'Com agentes crescendo, identidade não humana e autorização viram tema executivo.',
    technical:
      'Cobrir identidade humana e não humana, least privilege, ativos, CMDB vivo e resposta auditável.',
    value:
      'IA confiável exige governar quem ou o que pode agir, sobre qual ativo e com qual evidência.',
    bradescoAngle: 'Traz agente, identidade, ativo e risco para o mesmo desenho operacional.',
    architecture: 'Identidade humana e nao humana, least privilege, ativo, CMDB e resposta auditavel.',
    operatingModel: 'Risk, security e operacao definem permissoes e respostas por tipo de agente.',
    nextMove: 'Mapear identidades nao humanas e acoes automatizadas de maior risco.',
    proofPoints: ['Non-human identity', 'Least privilege', 'Asset context', 'Risk response'],
    discussion: {
      executivo: 'Onde a escala de agentes muda o apetite de risco?',
      tecnico: 'Como correlacionar API, identidade, agente e ativo em tempo real?',
      valor: 'Qual risco pode ser reduzido conectando identidade e workflow?',
    },
  },
  {
    id: 'spm',
    theme: 'ops',
    number: '08',
    icon: Gauge,
    title: 'SPM com IA',
    subtitle: 'Portfolio, dependências e priorização conectados ao contexto operacional.',
    executive:
      'Portfolio, demanda, execução e arquitetura deixam de ser silos de decisão.',
    technical:
      'Discutir modelo de dados, integrações, migração, qualidade de épicos e governança de mudança.',
    value:
      'Evoluir de ferramenta de planejamento para sistema de decisão de portfolio.',
    bradescoAngle: 'Conecta demanda, capacidade, risco e execucao em uma visao unica de portfolio.',
    architecture: 'Modelo de dados, integracoes, migracao, epicos, capacidade e mudancas.',
    operatingModel: 'Ritual de portfolio decide com dados, dependencias e criterios comuns.',
    nextMove: 'Selecionar um fluxo de decisao de portfolio para redesenhar com SPM.',
    proofPoints: ['Demand', 'Capacity', 'Dependencies', 'Execution metrics'],
    discussion: {
      executivo: 'Qual decisao de portfolio hoje depende de planilhas paralelas?',
      tecnico: 'Quais objetos precisam ficar consistentes entre Jira, SPM e execucao?',
      valor: 'Qual decisao mensal poderia virar rotina governada na plataforma?',
    },
  },
  {
    id: 'build-agent',
    theme: 'dev',
    number: '09',
    icon: Code2,
    title: 'Build Agent',
    subtitle: 'Desenvolvimento ServiceNow assistido por IA.',
    executive:
      'Mais capacidade de entrega, mas com padrão, revisão e rastreabilidade.',
    technical:
      'Separar produtividade de controle: ambientes, ACLs, regras, Git, review e App Engine.',
    value:
      'Escalar criação de apps sem abrir mão de arquitetura e governança.',
    bradescoAngle: 'Acelera desenvolvimento ServiceNow com padrao, revisao e governanca.',
    architecture: 'Ambientes, ACLs, regras, Git, review, App Engine e esteira de promocao.',
    operatingModel: 'Padroes reutilizaveis, guardrails tecnicos e revisao antes de producao.',
    nextMove: 'Escolher um app novo para nascer com esteira e code review desde o primeiro dia.',
    proofPoints: ['App Engine', 'Git', 'Review', 'Reusable patterns'],
    discussion: {
      executivo: 'Onde acelerar app sem aumentar debito tecnico?',
      tecnico: 'Quais padroes precisam ser obrigatorios para Build Agent?',
      valor: 'Qual app prova produtividade com governanca de entrega?',
    },
  },
  {
    id: 'project-arc',
    theme: 'dev',
    number: '10',
    icon: Sparkles,
    title: 'Project Arc com NVIDIA',
    subtitle: 'Agente desktop governado para trabalho multi-etapa.',
    executive:
      'Explora automação de sistemas e interfaces legadas com sandbox, política e auditoria.',
    technical:
      'Tema exploratório: sandbox, logs, rollback, escopo permitido e limites de produção.',
    value:
      'Mapear processos legados onde API não resolve antes de discutir escala.',
    bradescoAngle: 'Explora automacao governada de sistemas legados e tarefas multi-etapa.',
    architecture: 'Desktop agent, sandbox, logs, comandos, APIs chamadas, rollback e politica.',
    operatingModel: 'Uso exploratorio com escopo restrito, aprovacao previa e trilha auditavel.',
    nextMove: 'Mapear processos sem API onde automacao desktop faria sentido controlado.',
    proofPoints: ['OpenShell sandbox', 'AI Control Tower', 'Action Fabric', 'CMDB context'],
    discussion: {
      executivo: 'Qual processo legado justifica testar agente desktop governado?',
      tecnico: 'Quais limites de sandbox, rollback e auditoria seriam obrigatorios?',
      valor: 'Onde a falta de API ainda trava automacao de ponta a ponta?',
    },
  },
]

const architectureLayers = [
  {
    title: 'Experiência e canais',
    copy: 'Otto, Employee Center, portal, chat e atendimento assistido.',
    nodes: ['Otto', 'Employee Center', 'Portal', 'Transicao'],
  },
  {
    title: 'IA governada',
    copy: 'AI Control Tower, Now Assist, AI Specialists e orquestração com políticas.',
    nodes: ['AI Control Tower', 'Now Assist', 'Specialists', 'Orquestrador'],
  },
  {
    title: 'Domínios de workflow',
    copy: 'ITSM, ITOM, SPM, HRSD, SecOps, IRM, App Engine, CSM e FSI.',
    nodes: ['Autonomous IT', 'Risco', 'HRSD', 'App Engine'],
  },
  {
    title: 'Dados e contexto',
    copy: 'WDF, Context Engine, Knowledge Graph, CMDB/CSDM e metricas.',
    nodes: ['WDF', 'Context Engine', 'CMDB / CSDM', 'RaptorDB'],
  },
  {
    title: 'Segurança e integração',
    copy: 'IAM, RBAC, Veza, Armis, IntegrationHub, MCP, OAuth e auditoria.',
    nodes: ['IAM / RBAC', 'IntegrationHub', 'MCP', 'Auditoria'],
  },
]

const useCases = [
  {
    title: 'Governança de IA corporativa',
    outcome: 'Inventariar agentes, responsável, permissão, telemetria e aprovação.',
    stack: 'AI Control Tower + IAM + Action Fabric',
  },
  {
    title: 'Service desk autônomo',
    outcome: 'Resolver jornadas repetitivas com conhecimento confiável e escala humana.',
    stack: 'Otto + AI Specialists + ITSM + HRSD',
  },
  {
    title: 'CMDB como fundação de IA',
    outcome: 'Priorizar relações, serviços, responsáveis e atributos que reduzem ambiguidade.',
    stack: 'CMDB/CSDM + Context Engine + WDF',
  },
  {
    title: 'Portfolio conectado',
    outcome: 'Ligar demanda, dependência, capacidade, risco e mudança em SPM.',
    stack: 'SPM + App Engine + métricas',
  },
  {
    title: 'Risco e identidade',
    outcome: 'Enxergar agentes, APIs, ativos e identidades no mesmo modelo de risco.',
    stack: 'IRM + SecOps + Veza + Armis',
  },
  {
    title: 'Produtividade dev governada',
    outcome: 'Acelerar apps com padrões versionados, revisão e governança.',
    stack: 'Build Agent + App Engine + AEMC',
  },
]

const roadmap = [
  {
    title: 'Abrir pela tese',
    detail: 'K26 não foi sobre chatbot. Foi sobre IA governada executando trabalho corporativo.',
  },
  {
    title: 'Desenhar a arquitetura',
    detail: 'Conectar governança, contexto, dados, agentes, execução e medição.',
  },
  {
    title: 'Sair com decisão',
    detail: 'Escolher dois domínios, responsável de negócio, responsável técnico e pré-requisitos.',
  },
]

const sources = [
  {
    label: 'Knowledge 2026 on demand',
    href: 'https://www.servicenow.com/events/knowledge.html',
  },
  {
    label: 'AI Control Tower',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx',
  },
  {
    label: 'Autonomous Workforce',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-brings-Autonomous-Workforce-to-every-major-business-function/default.aspx',
  },
  {
    label: 'Action Fabric',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-opens-its-full-system-of-action-to-every-AI-Agent-in-the-enterprise/default.aspx',
  },
  {
    label: 'Project Arc + NVIDIA',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-extends-agentic-AI-governance-from-desktops-to-data-centers-with-NVIDIA/default.aspx',
  },
  {
    label: 'ServiceNow Otto',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Otto-creates-the-unified-AI-experience-for-the-enterprise/default.aspx',
  },
  {
    label: 'Security and Risk',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-Autonomous-Security--Risk-integrating-Armis-and-Veza-to-govern-every-AI-agent-identity-and-connected-asset/default.aspx',
  },
  {
    label: 'Context Engine e Build Agent',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-moves-beyond-the-sidecar-AI-era-giving-customers-a-complete-AI-native-experience-across-all-products-and-packages/default.aspx',
  },
  {
    label: 'Workflow Data Fabric',
    href: 'https://www.servicenow.com/now-platform/workflow-data-fabric.html',
  },
]

export default function Bradesco26Experience() {
  const [activeLens, setActiveLens] = useState<Lens>('executivo')
  const [activeTheme, setActiveTheme] = useState<Theme>('all')
  const [selectedId, setSelectedId] = useState('control-tower')

  const filtered = useMemo(
    () =>
      activeTheme === 'all'
        ? announcements
        : announcements.filter((item) => item.theme === activeTheme),
    [activeTheme],
  )

  const lensCopyKey =
    activeLens === 'executivo' ? 'executive' : activeLens === 'tecnico' ? 'technical' : 'value'
  const activeItem = filtered.find((item) => item.id === selectedId) ?? filtered[0]
  const ActiveIcon = activeItem.icon
  const activeLensInfo = lenses.find((lens) => lens.id === activeLens) ?? lenses[0]
  const activeThemeInfo = themes.find((theme) => theme.id === activeTheme) ?? themes[0]
  const activeDiscussion = activeItem.discussion[activeLens]

  const selectTheme = (theme: Theme) => {
    setActiveTheme(theme)
    const nextItem =
      theme === 'all' ? announcements[0] : announcements.find((item) => item.theme === theme)
    if (nextItem) {
      setSelectedId(nextItem.id)
    }
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Navegacao do briefing">
        <a href="#top" className={styles.navBrand}>
          <span>ServiceNow</span>
          <span>Bradesco</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#flow">Roteiro</a>
          <a href="#radar">Radar</a>
          <a href="#architecture">Arquitetura</a>
          <a href="#use-cases">Casos</a>
        </div>
        <a href="#sources" className={styles.navCta}>
          Fontes
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>

      <section id="top" className={styles.hero} aria-labelledby="bradesco-26-title">
        <div className={styles.heroTexture} aria-hidden="true" />
        <div className={styles.heroShell}>
          <div className={styles.heroTopline}>
            <span>Knowledge 2026</span>
            <span>04 jun 2026</span>
            <span>Briefing executivo e tecnico</span>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>De assistente a agente corporativo</p>
              <h1 id="bradesco-26-title">Bradesco no ciclo da IA governada.</h1>
              <p className={styles.heroLead}>
                Um briefing executivo e tecnico sobre o que o Knowledge 2026 muda para bancos:
                governanca de IA, contexto operacional, agentes, risco, dados e execucao ponta a
                ponta.
              </p>
              <div className={styles.heroProofLine} aria-label="Temas principais">
                <span>AI governance</span>
                <span>Contexto operacional</span>
                <span>Execucao governada</span>
              </div>
              <div className={styles.heroActions} aria-label="Acoes principais">
                <a href="#flow" className={styles.primaryAction}>
                  <Play size={16} aria-hidden="true" />
                  Iniciar conversa
                </a>
                <a href="#radar" className={styles.secondaryAction}>
                  Explorar temas K26
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className={styles.heroStudio} aria-label="Mapa executivo da conversa">
              <div className={styles.systemMap} aria-hidden="true">
                <div className={styles.mapChrome}>
                  <span>Strategy room</span>
                  <span>K26 / Bradesco</span>
                </div>
                <div className={styles.mapTraceOne} />
                <div className={styles.mapTraceTwo} />
                <div className={styles.mapCore}>
                  <strong>AI</strong>
                  <span>governada</span>
                </div>
                <div className={`${styles.mapNode} ${styles.nodeOne}`}>Govern</div>
                <div className={`${styles.mapNode} ${styles.nodeTwo}`}>Context</div>
                <div className={`${styles.mapNode} ${styles.nodeThree}`}>Act</div>
                <div className={`${styles.mapNode} ${styles.nodeFour}`}>Measure</div>
                <div className={styles.mapPulse} />
              </div>

              <div className={styles.commandPanel}>
                <div className={styles.panelHeader}>
                  <CircleDot size={15} aria-hidden="true" />
                  <span>Tese central</span>
                </div>
                <p>
                  O diferencial nao e ter mais IA. E colocar IA para trabalhar com contexto real,
                  permissoes corretas, trilha auditavel e governanca operacional.
                </p>
                <div className={styles.signalGrid}>
                  {thesis.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className={styles.signalCard}>
                        <Icon size={18} aria-hidden="true" />
                        <strong>{item.title}</strong>
                        <small>{item.copy}</small>
                      </div>
                    )
                  })}
                </div>
                <div className={styles.modelFlow} aria-label="Modelo operacional">
                  <span>Papel claro</span>
                  <span>Telemetria</span>
                  <span>Guardrails</span>
                  <span>Indicadores</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.briefStrip} aria-label="Resumo do briefing">
        <div className={styles.briefInner}>
          <div className={styles.briefGrid}>
            <article>
              <span>Objetivo</span>
              <strong>Traduzir os anuncios do Knowledge 2026 para prioridades praticas.</strong>
            </article>
            <article>
              <span>Formato</span>
              <strong>Conversa executiva e tecnica, com arquitetura e casos de uso.</strong>
            </article>
            <article>
              <span>Resultado</span>
              <strong>Dois dominios priorizados, responsavel claro e proximo workshop tecnico.</strong>
            </article>
          </div>
          <div className={styles.kineticMarquee} aria-hidden="true">
            <div>
              {[...motionTicker, ...motionTicker].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="flow" className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.sectionFrame}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Roteiro da conversa</p>
            <h2 id="flow-title">Seis capitulos. Uma narrativa de valor.</h2>
            <p>
              A conversa sai de anuncio de produto e entra em arquitetura: plataforma, dominios,
              risco, desenvolvedores e casos de uso aplicaveis ao Bradesco.
            </p>
          </div>
          <div className={styles.flowGrid}>
            {chapters.map((chapter) => (
              <article key={chapter.title} className={styles.flowCard}>
                <span>{chapter.number}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
                <div>
                  {chapter.items.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.platformSection} aria-labelledby="platform-title">
        <div className={styles.sectionFrame}>
          <div className={styles.platformGrid}>
            <div>
              <p className={styles.eyebrow}>Contexto Bradesco</p>
              <h2 id="platform-title">Conectar capacidades conhecidas a uma arquitetura de IA governada.</h2>
              <p>
                A proposta e organizar o que o K26 trouxe de novo em IA, dados e execucao dentro de
                uma jornada clara de governanca, adocao e valor operacional.
              </p>
            </div>
            <div className={styles.capabilityCloud} aria-label="Capacidades em foco">
              {capabilitySet.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="radar" className={styles.radarSection} aria-labelledby="radar-title">
        <div className={styles.sectionFrame}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Radar K26</p>
            <h2 id="radar-title">Escolha a lente. Mostre o que muda.</h2>
            <p>
              A mesma novidade pode ser lida pela decisao executiva, pela profundidade tecnica ou
              pelo valor operacional para Bradesco.
            </p>
          </div>

          <div className={styles.radarControls} aria-label="Controles de visualizacao">
            <div className={styles.lensSwitch}>
              {lenses.map((lens) => (
                <button
                  key={lens.id}
                  type="button"
                  className={activeLens === lens.id ? styles.lensActive : styles.lensButton}
                  onClick={() => setActiveLens(lens.id)}
                >
                  <span>{lens.label}</span>
                  <small>{lens.helper}</small>
                </button>
              ))}
            </div>

            <div className={styles.themeRail}>
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={activeTheme === theme.id ? styles.themeActive : styles.themeButton}
                  onClick={() => selectTheme(theme.id)}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.radarInsightStrip} aria-label="Resumo da leitura selecionada">
            <article>
              <span>Lente ativa</span>
              <strong>{activeLensInfo.label}</strong>
              <p>{activeItem[lensCopyKey]}</p>
            </article>
            <article>
              <span>Aplicacao Bradesco</span>
              <strong>{activeItem.bradescoAngle}</strong>
            </article>
            <article>
              <span>Proxima decisao</span>
              <strong>{activeItem.nextMove}</strong>
            </article>
          </div>

          <div className={styles.radarBoard}>
            <div className={styles.radarList}>
              {filtered.map((item) => {
                const Icon = item.icon
                const selected = activeItem.id === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={selected ? styles.radarItemActive : styles.radarItem}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <span>{item.number}</span>
                    <Icon size={18} aria-hidden="true" />
                    <strong>{item.title}</strong>
                  </button>
                )
              })}
              <div className={styles.radarListMeta}>
                <span>Trilha ativa</span>
                <strong>{activeThemeInfo.label}</strong>
                <small>{filtered.length} temas para explorar</small>
              </div>
            </div>

            <article key={`${activeItem.id}-${activeLens}`} className={styles.radarDetail}>
              <div className={styles.detailSweep} aria-hidden="true" />
              <div className={styles.radarDetailTop}>
                <span>{activeItem.number}</span>
                <div className={styles.detailIcon}>
                  <ActiveIcon size={30} aria-hidden="true" />
                </div>
              </div>
              <div className={styles.detailHero}>
                <div>
                  <small>{activeLensInfo.helper}</small>
                  <h3>{activeItem.title}</h3>
                  <p className={styles.radarSubtitle}>{activeItem.subtitle}</p>
                </div>
                <div className={styles.detailSignal} aria-label="Sinal da lente ativa">
                  <span>{activeLensInfo.label}</span>
                  <strong>{activeItem.number}</strong>
                </div>
              </div>
              <p className={styles.radarCopy}>{activeItem[lensCopyKey]}</p>
              <div className={styles.decisionGrid}>
                <article>
                  <span>Arquitetura</span>
                  <p>{activeItem.architecture}</p>
                </article>
                <article>
                  <span>Modelo operacional</span>
                  <p>{activeItem.operatingModel}</p>
                </article>
                <article>
                  <span>Proximo movimento</span>
                  <p>{activeItem.nextMove}</p>
                </article>
              </div>
              <div className={styles.proofRail} aria-label="Elementos de prova">
                {activeItem.proofPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              <div className={styles.discussionBox}>
                <span>
                  {activeLens === 'executivo'
                    ? 'Decisao para a sala'
                    : activeLens === 'tecnico'
                      ? 'Criterio tecnico'
                      : 'Workshop de valor'}
                </span>
                <strong>{activeDiscussion}</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="architecture" className={styles.architectureSection} aria-labelledby="architecture-title">
        <div className={styles.sectionFrame}>
          <div className={styles.architectureHeader}>
            <p className={styles.eyebrow}>Arquitetura Pos-K26</p>
            <h2 id="architecture-title">Agente so gera valor quando sabe onde agir.</h2>
            <p>
              A ponte entre anuncio e desenho tecnico: canais, IA, workflows, dados, seguranca e
              integracao operando como sistema de acao.
            </p>
          </div>
          <div className={styles.architectureMap}>
            {architectureLayers.map((layer, index) => (
              <article key={layer.title} className={styles.architectureLayer}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.copy}</p>
                </div>
                <div className={styles.layerNodes}>
                  {layer.nodes.map((node) => (
                    <small key={node}>{node}</small>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className={styles.useCaseSection} aria-labelledby="use-cases-title">
        <div className={styles.sectionFrame}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Casos de uso Bradesco</p>
            <h2 id="use-cases-title">Seis conversas para sair da sala com proximo passo.</h2>
            <p>
              A sessao ajuda a priorizar dominio, responsavel de negocio, responsavel tecnico e
              prerequisitos para avancar com seguranca.
            </p>
          </div>
          <div className={styles.useCaseGrid}>
            {useCases.map((useCase, index) => (
              <article key={useCase.title} className={styles.useCaseCard}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.outcome}</p>
                <small>{useCase.stack}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closeSection} aria-labelledby="close-title">
        <div className={styles.sectionFrame}>
          <div className={styles.closeGrid}>
            <div>
              <p className={styles.eyebrow}>Roteiro de 04 de junho</p>
              <h2 id="close-title">Da inspiracao a decisao operacional.</h2>
              <p>
                Primeiro a tese, depois a arquitetura, entao os casos de uso. O objetivo e sair com
                uma decisao clara sobre onde aprofundar valor, dados, governanca e execucao.
              </p>
            </div>
            <ol className={styles.roadmapList}>
              {roadmap.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="sources" className={styles.sources} aria-labelledby="sources-title">
        <div className={styles.sectionFrame}>
          <div className={styles.sourcesGrid}>
            <div>
              <p className={styles.eyebrow}>Fontes verificadas</p>
              <h2 id="sources-title">Baseado em anuncios oficiais do Knowledge 2026.</h2>
            </div>
            <div className={styles.sourceLinks}>
              {sources.map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Preparado para conversa executiva e tecnica com Bradesco.</span>
        <span>Fontes publicas ServiceNow e trilha de discussao orientada a valor.</span>
      </footer>
    </main>
  )
}
