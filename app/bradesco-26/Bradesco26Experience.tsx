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
  { id: 'dev', label: 'Dev platform' },
]

const footprint = [
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
    copy: 'Política, identidade, telemetria e auditoria antes de escala.',
  },
  {
    icon: DatabaseZap,
    title: 'Contextualizar',
    copy: 'CMDB, CSDM, dados e conhecimento como base para decisão confiável.',
  },
  {
    icon: Workflow,
    title: 'Executar',
    copy: 'Agentes saindo da recomendação para ação governada ponta a ponta.',
  },
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
    question: 'Quais agentes já existem fora da visibilidade central do banco?',
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
    question: 'Qual jornada interna deveria deixar de exigir navegação por portal?',
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
    question: 'Qual processo repetitivo já tem dados e caminho de resolução maduros?',
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
    question: 'Quais ações podem ser expostas primeiro como ferramentas seguras?',
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
      'Depende de relações, ownership, serviços, políticas, SLAs, histórico e conhecimento.',
    value:
      'Conectar o programa de CMDB ao roadmap de IA e automação governada.',
    question: 'Quais relações da CMDB são indispensáveis para um agente decidir?',
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
    question: 'Qual dado externo mudaria uma decisão operacional hoje?',
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
    question: 'Como enxergar agentes, APIs e serviços automatizados no mesmo modelo de risco?',
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
    question: 'Quais decisões de portfolio dependem de dados fora da visão atual?',
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
    question: 'Quais apps deveriam nascer com code review desde o primeiro dia?',
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
    question: 'Quais processos ainda exigem interação manual por falta de API?',
  },
]

const architectureLayers = [
  {
    title: 'Experiência e canais',
    copy: 'Otto, Employee Center, portal, chat e atendimento assistido.',
    nodes: ['Otto', 'Employee Center', 'Portal', 'Handoff'],
  },
  {
    title: 'IA governada',
    copy: 'AI Control Tower, Now Assist, AI Specialists e orquestração com políticas.',
    nodes: ['AI Control Tower', 'Now Assist', 'Specialists', 'Orchestrator'],
  },
  {
    title: 'Domínios de workflow',
    copy: 'ITSM, ITOM, SPM, HRSD, SecOps, IRM, App Engine, CSM e FSI.',
    nodes: ['Autonomous IT', 'Risk', 'HRSD', 'App Engine'],
  },
  {
    title: 'Dados e contexto',
    copy: 'WDF, Context Engine, Knowledge Graph, CMDB/CSDM e analytics.',
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
    outcome: 'Inventariar agentes, owner, permissão, telemetria e aprovação.',
    stack: 'AI Control Tower + IAM + Action Fabric',
  },
  {
    title: 'Service desk autônomo',
    outcome: 'Resolver jornadas repetitivas com conhecimento confiável e escala humana.',
    stack: 'Otto + AI Specialists + ITSM + HRSD',
  },
  {
    title: 'CMDB como fundação de IA',
    outcome: 'Priorizar relações, serviços, owners e atributos que reduzem ambiguidade.',
    stack: 'CMDB/CSDM + Context Engine + WDF',
  },
  {
    title: 'Portfolio conectado',
    outcome: 'Ligar demanda, dependência, capacidade, risco e mudança em SPM.',
    stack: 'SPM + App Engine + analytics',
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
    detail: 'Escolher dois domínios, owner de negócio, owner técnico e pré-requisitos.',
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
      <nav className={styles.nav} aria-label="Navegacao da apresentacao">
        <a href="#top" className={styles.navBrand}>
          <span>ServiceNow</span>
          <span>Bradesco</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#flow">Flow</a>
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
            <span>Client-facing / sem valores</span>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>De assistente a agente autonomo</p>
              <h1 id="bradesco-26-title">Bradesco no ciclo da IA governada.</h1>
              <p className={styles.heroLead}>
                Um briefing executivo e tecnico sobre o que o K26 muda para banco: governanca de IA,
                contexto operacional, agentes, risco, dados e execucao ponta a ponta.
              </p>
              <div className={styles.heroActions} aria-label="Acoes principais">
                <a href="#flow" className={styles.primaryAction}>
                  <Play size={16} aria-hidden="true" />
                  Comecar roteiro
                </a>
                <a href="#radar" className={styles.secondaryAction}>
                  Ver radar K26
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className={styles.commandPanel} aria-label="Painel executivo">
              <div className={styles.panelHeader}>
                <CircleDot size={15} aria-hidden="true" />
                <span>Tese para a sala</span>
              </div>
              <p>
                O diferencial nao e ter mais IA. E colocar IA para trabalhar com contexto real,
                permissoes corretas, trilha auditavel e modelo operacional.
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
                <span>Owner</span>
                <span>Telemetria</span>
                <span>Guardrails</span>
                <span>Valor</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.briefStrip} aria-label="Escopo seguro da apresentacao">
        <div className={styles.briefInner}>
          <article>
            <span>Conteudo seguro</span>
            <strong>Sem valores comerciais internos ou informacoes confidenciais.</strong>
          </article>
          <article>
            <span>Formato</span>
            <strong>Briefing premium para apresentar em tela cheia.</strong>
          </article>
          <article>
            <span>Resultado esperado</span>
            <strong>Dois dominios priorizados, owner claro e proximo workshop tecnico.</strong>
          </article>
        </div>
      </section>

      <section id="flow" className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.sectionFrame}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Flow da apresentacao</p>
            <h2 id="flow-title">Seis capitulos. Uma narrativa de valor.</h2>
            <p>
              A conversa sai de novidade de produto e entra em arquitetura: plataforma, dominios,
              risco, desenvolvedores e casos de uso Bradesco.
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
              <h2 id="platform-title">O material conversa com o footprint real, sem expor contrato.</h2>
              <p>
                A narrativa nao precisa vender produto isolado. Ela precisa conectar capacidades ja
                conhecidas com o que K26 trouxe de novo em IA, dados e execucao.
              </p>
            </div>
            <div className={styles.footprintCloud} aria-label="Capacidades em discussao">
              {footprint.map((item) => (
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
              A mesma novidade tem tres leituras: decisao executiva, profundidade tecnica e valor
              operacional para Bradesco.
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
            </div>

            <article className={styles.radarDetail}>
              <div className={styles.radarDetailTop}>
                <span>{activeItem.number}</span>
                <ActiveIcon size={28} aria-hidden="true" />
              </div>
              <h3>{activeItem.title}</h3>
              <p className={styles.radarSubtitle}>{activeItem.subtitle}</p>
              <p className={styles.radarCopy}>{activeItem[lensCopyKey]}</p>
              <div className={styles.questionBox}>
                <span>Pergunta para a sala</span>
                <strong>{activeItem.question}</strong>
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
              Nao e para fechar escopo na apresentacao. E para priorizar dominio, owner e
              prerequisitos tecnicos.
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
              <h2 id="close-title">Conversa tecnica, sem virar tour de produto.</h2>
              <p>
                Primeiro a tese, depois a arquitetura, entao os casos de uso. O objetivo e sair com
                uma decisao operacional, nao com uma lista de anuncios.
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
        <span>Uso restrito: briefing tecnico para conversa com Bradesco.</span>
        <span>Pagina nao indexada e nao listada no sitemap.</span>
      </footer>
    </main>
  )
}
