import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Cpu,
  GitBranch,
  KeyRound,
  ListChecks,
  Radar,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from 'lucide-react'

import type { AutomationControlSnapshot } from '@/lib/automation-control/types'
import type { CreativeControlSnapshot } from '@/lib/creative-control/types'
import DevotionalsPanel from './DevotionalsPanel'
import LooksPanel from './LooksPanel'
import styles from './ControlTower.module.css'

interface ControlTowerProps {
  snapshot: AutomationControlSnapshot | null
  creative: CreativeControlSnapshot | null
}

const baseline = {
  agents: 70,
  proposedAgents: 31,
  dirtyRepos: 46,
  totalRepos: 47,
  failedAutomations: 10,
  launchAgents: 93,
  staleHandoffs: 1,
  unmappedRepos: 14,
}

const lanes = [
  {
    title: 'P0 agora',
    tone: 'red',
    items: [
      {
        label: '46 repos dirty',
        owner: 'Codex',
        detail: 'Classificar WIP por produto, risco e ação: commit temporário, stash ou worktree.',
      },
      {
        label: 'Automações falhas',
        owner: 'Ops',
        detail: 'Abrir logs, separar causa raiz e definir retry policy antes de expandir rotinas.',
      },
      {
        label: 'Handoff stale',
        owner: 'Agent Hub',
        detail: 'Fechar, reativar ou converter em backlog com evidência e próxima ação.',
      },
    ],
  },
  {
    title: 'P1 instrumentar',
    tone: 'amber',
    items: [
      {
        label: 'Scorecard de agentes',
        owner: 'Agent Hub',
        detail: 'Novo agente só entra ativo com score >= 70, owner, fonte de verdade e evidência.',
      },
      {
        label: 'MCP + observabilidade',
        owner: 'Ops',
        detail: 'Padronizar acesso a Linear, GitHub, Obsidian e traces por agente.',
      },
      {
        label: 'Repos sem Linear',
        owner: 'Produto',
        detail: 'Todo repo precisa apontar para produto, projeto, issue ou decisão de arquivo.',
      },
    ],
  },
  {
    title: 'P2 escalar',
    tone: 'blue',
    items: [
      {
        label: 'Durable execution',
        owner: 'Ops',
        detail: 'Migrar rotinas críticas para runner com estado, retry e recovery.',
      },
      {
        label: 'Memória ativa',
        owner: 'Vault',
        detail: 'Obsidian deixa de ser arquivo passivo e vira memória consultável por agentes.',
      },
      {
        label: 'Kill switch',
        owner: 'Security',
        detail: 'Pausar agente, categoria ou operação completa com log de auditoria.',
      },
    ],
  },
]

const supervisors = [
  ['Ops Health', 'Automações, journals, handoffs, falhas e recovery.'],
  ['Code Integration', 'Codex, Git, testes, PRs, CodeGraph e impacto técnico.'],
  ['Portfolio Product', 'Linear, roadmap, revenue, backlog e priorização.'],
  ['Growth Marketing', 'ASA, ASO, social, criativos, screenshots e funil.'],
]

const llmContext = [
  ['Runtime', 'LiteLLM fica como proxy OpenAI-compatible para agentes e workflows.'],
  ['Custo', 'Aliases controlam tier por workflow antes de qualquer chamada cara.'],
  ['Qualidade', 'Smoke testa /v1/models e /v1/chat/completions com saída mínima.'],
  ['Risco', 'Secrets via Railway/env central; nenhum token aparece no painel.'],
]

const workflowModel = [
  ['repo_hygiene_daily', 'Git status, Linear map e classificação de risco por repo.'],
  ['automation_health_hourly', 'Logs, journals e falhas com causa provável e owner.'],
  ['handoff_stale_sweeper', 'Handoffs antigos viram fechar, reativar ou backlog.'],
  ['agent_activation_gate', 'Scorecard >= 70 antes de qualquer agente novo ficar ativo.'],
  ['llm_cost_quality_daily', 'Custo, cache, tiering e anomalias por workflow.'],
]

const llmOperation = [
  {
    label: 'Railway service',
    value: 'litellm-gateway',
    detail: 'Provisionado separado do gateway atual para rollback limpo.',
    tone: 'amber',
    icon: ServerCog,
  },
  {
    label: 'Secrets',
    value: 'master + salt',
    detail: 'Sincronizados via env central e Railway; valores nunca renderizados.',
    tone: 'green',
    icon: KeyRound,
  },
  {
    label: 'Deploy',
    value: 'gated',
    detail: 'Automação exige CONFIRM_PRODUCTION_DEPLOY=1 antes de subir.',
    tone: 'amber',
    icon: ShieldCheck,
  },
]

const modelAliases = [
  ['workflow-cheap', 'Gemini API Flash', 'Triagem, relatórios, varreduras e rotinas de volume.'],
  ['workflow-standard', 'GPT-5 mini', 'Execução padrão para agentes e workflows previsíveis.'],
  ['workflow-reasoning-manual', 'GPT-5', 'Escalação manual para raciocínio profundo.'],
  ['claude-manual-premium', 'Claude Opus', 'Fallback premium manual; Sonnet automatizado bloqueado.'],
]

const opsCommands = [
  ['check', 'npm run litellm:check'],
  ['secrets', 'npm run litellm:sync-secrets'],
  ['deploy', 'CONFIRM_PRODUCTION_DEPLOY=1 npm run litellm:deploy'],
  ['smoke', 'LITELLM_BASE_URL=https://<service> npm run litellm:smoke'],
]

function formatDate(value?: string) {
  if (!value) return 'sem snapshot vivo'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date)
}

interface Freshness {
  status: 'green' | 'amber' | 'red' | 'unknown'
  label: string
  ageMin: number | null
}

function freshness(collectedAt?: string): Freshness {
  if (!collectedAt) {
    return { status: 'unknown', label: 'sem ingestão', ageMin: null }
  }
  const ts = new Date(collectedAt).getTime()
  if (Number.isNaN(ts)) {
    return { status: 'unknown', label: 'timestamp inválido', ageMin: null }
  }
  const ageMin = Math.round((Date.now() - ts) / 60000)
  if (ageMin < 0) return { status: 'green', label: 'agora', ageMin }
  if (ageMin < 60) return { status: 'green', label: `${Math.max(1, ageMin)}min atrás`, ageMin }
  const ageHr = ageMin / 60
  if (ageMin < 360) {
    return { status: 'amber', label: `${ageHr.toFixed(1)}h atrás · envelhecendo`, ageMin }
  }
  if (ageHr < 24) return { status: 'red', label: `${ageHr.toFixed(0)}h atrás · STALE`, ageMin }
  return { status: 'red', label: `${(ageHr / 24).toFixed(1)}d atrás · STALE`, ageMin }
}

function metricData(snapshot: AutomationControlSnapshot | null) {
  return [
    {
      label: 'Repos dirty',
      value: baseline.dirtyRepos,
      detail: `${baseline.totalRepos} repos mapeados`,
      tone: 'red',
      icon: GitBranch,
    },
    {
      label: 'Falhas / bloqueios',
      value: snapshot ? snapshot.summary.failed + snapshot.summary.blocked : baseline.failedAutomations,
      detail: snapshot ? 'snapshot operacional vivo' : 'baseline Kimi ops',
      tone: 'red',
      icon: AlertTriangle,
    },
    {
      label: 'Agentes propostos',
      value: baseline.proposedAgents,
      detail: 'sem gate de ativação',
      tone: 'amber',
      icon: Bot,
    },
    {
      label: 'LaunchAgents',
      value: snapshot?.summary.launchAgentsTracked ?? baseline.launchAgents,
      detail: 'candidatos a consolidação',
      tone: 'blue',
      icon: Workflow,
    },
    {
      label: 'Handoffs abertos',
      value: snapshot?.summary.openHandoffs ?? baseline.staleHandoffs,
      detail: 'precisam owner e next action',
      tone: 'amber',
      icon: ListChecks,
    },
    {
      label: 'Registry agents',
      value: baseline.agents,
      detail: 'fonte Agent Hub',
      tone: 'green',
      icon: CheckCircle2,
    },
  ]
}

function scoreRows(snapshot: AutomationControlSnapshot | null) {
  const automationScore = snapshot
    ? Math.max(0, 100 - (snapshot.summary.failed + snapshot.summary.blocked) * 10 - snapshot.summary.silentOrStale * 3)
    : 48

  return [
    ['Preflight', 92, 'green'],
    ['Git hygiene', 18, 'red'],
    ['Automation', automationScore, automationScore >= 70 ? 'green' : automationScore >= 45 ? 'amber' : 'red'],
    ['Handoffs', snapshot?.summary.openHandoffs ? 54 : 62, 'amber'],
    ['Secrets', 35, 'red'],
    ['Observability', snapshot ? 52 : 40, 'amber'],
  ] as const
}

export default function ControlTower({ snapshot, creative }: ControlTowerProps) {
  const metrics = metricData(snapshot)
  const p0 = lanes[0].items.length
  const topAutomations = snapshot?.automations.slice(0, 12) ?? []
  const automationFreshness = freshness(snapshot?.collectedAt)
  const creativeFreshness = freshness(creative?.collectedAt)
  const statusTone =
    snapshot == null
      ? 'red'
      : automationFreshness.status === 'red'
        ? 'red'
        : automationFreshness.status === 'amber'
          ? 'yellow'
          : snapshot.summary.overallStatus

  return (
    <main className={styles.shell}>
      <aside className={styles.rail}>
        <div className={styles.brand}>
          <strong>Agent Ops Control Tower</strong>
          <span>Agentes, automações, Git, handoffs, custos e gates.</span>
        </div>
        <nav aria-label="Seções do Control Tower" className={styles.railNav}>
          <a href="#risco">Risco</a>
          <a href="#score">Score</a>
          <a href="#agentes">Agentes</a>
          <a href="#llm">LLM</a>
          <a href="#automacoes">Automações</a>
          <a href="#looks">Looks</a>
          <a href="#devotionais">Devotionais</a>
          <a href="#governanca">Governança</a>
        </nav>
        <p className={styles.railNote}>
          Vermelho exige decisão. Amber exige triagem. Azul entra em roadmap.
          Verde só aparece com evidência.
        </p>
      </aside>

      <section className={styles.content}>
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>pierrondi.dev / control_tower</p>
            <h1>Gerencie a operação agentica por risco, não por ruído.</h1>
            <p>
              Painel privado para decidir o que para, o que corrige, qual modelo roda
              cada workflow e o que pode escalar com evidência operacional.
            </p>
          </div>
          <div className={styles.statusCard} data-status={statusTone}>
            <span>
              {snapshot
                ? automationFreshness.status === 'red'
                  ? 'Snapshot STALE'
                  : automationFreshness.status === 'amber'
                    ? 'Snapshot envelhecendo'
                    : 'Snapshot vivo'
                : 'Baseline Kimi'}
            </span>
            <strong>{formatDate(snapshot?.collectedAt)}</strong>
            <small>
              {snapshot
                ? `${snapshot.machine.hostname} · ${automationFreshness.label}`
                : 'sem ingestão recente'}
            </small>
          </div>
        </header>

        <section className={styles.decisionBand}>
          <Radar size={22} />
          <div>
            <strong>Decisão recomendada: agentes usam LiteLLM por alias, não provider direto.</strong>
            <span>Gateway customizado continua para apps; workflows passam pelo proxy com gates, custo e smoke.</span>
          </div>
          <em>{p0} P0</em>
        </section>

        <section className={styles.metrics} aria-label="Resumo operacional">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <article key={metric.label} className={styles.metric} data-tone={metric.tone}>
                <Icon size={18} />
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.detail}</small>
              </article>
            )
          })}
        </section>

        <section id="risco" className={styles.board} aria-label="Fila operacional por prioridade">
          {lanes.map((lane) => (
            <div key={lane.title} className={styles.lane} data-tone={lane.tone}>
              <div className={styles.laneHeader}>
                <h2>{lane.title}</h2>
                <span>{lane.items.length}</span>
              </div>
              {lane.items.map((item) => (
                <article key={item.label} className={styles.issue}>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.owner}</span>
                  </div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.twoColumn}>
          <article id="score" className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Score operacional</h2>
              <span>0-100</span>
            </div>
            <div className={styles.scoreGrid}>
              {scoreRows(snapshot).map(([label, score, tone]) => (
                <div key={label} className={styles.scoreRow}>
                  <span>{label}</span>
                  <div className={styles.bar}>
                    <i style={{ width: `${score}%` }} data-tone={tone} />
                  </div>
                  <strong>{score}</strong>
                </div>
              ))}
            </div>
          </article>

          <article id="agentes" className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Supervisores</h2>
              <span>modelo alvo</span>
            </div>
            <div className={styles.supervisorGrid}>
              {supervisors.map(([title, detail]) => (
                <div key={title}>
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.twoColumn}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>LLM Context</h2>
              <span>modelo, custo, qualidade, risco</span>
            </div>
            <div className={styles.contextGrid}>
              {llmContext.map(([title, detail]) => (
                <div key={title}>
                  <Cpu size={16} />
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Workflow OS</h2>
              <span>primeiros 5 fluxos</span>
            </div>
            <div className={styles.workflowList}>
              {workflowModel.map(([id, detail]) => (
                <div key={id}>
                  <strong>{id}</strong>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="llm" className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Operação LLM</h2>
            <span>LiteLLM + Railway + aliases</span>
          </div>
          <div className={styles.llmOpsGrid}>
            {llmOperation.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.label} data-tone={item.tone}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </article>
              )
            })}
          </div>
          <div className={styles.aliasGrid}>
            {modelAliases.map(([alias, route, detail]) => (
              <article key={alias}>
                <strong>{alias}</strong>
                <span>{route}</span>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className={styles.commandRail}>
            <TerminalSquare size={18} />
            <div>
              {opsCommands.map(([label, command]) => (
                <code key={label}>{command}</code>
              ))}
            </div>
          </div>
        </section>

        <section id="automacoes" className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Automações recentes</h2>
            <span>{snapshot ? `${snapshot.automations.length} sinais` : 'aguardando ingestão'}</span>
          </div>
          {topAutomations.length ? (
            <div className={styles.automationGrid}>
              {topAutomations.map((item) => (
                <article key={`${item.surface}-${item.id}`} data-status={item.status}>
                  <strong>{item.id}</strong>
                  <span>{item.surface} · {item.ageLabel ?? 'sem idade'}</span>
                  <p>{item.action}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <CircleDollarSign size={20} />
              <p>
                Nenhum snapshot vivo no runtime. Rode o coletor local para enviar
                sinais de automações, LLMs e Railway.
              </p>
            </div>
          )}
        </section>

        {creative ? (
          <LooksPanel
            stats={creative.looks.stats}
            recent={creative.looks.recent}
            freshnessLabel={creativeFreshness.label}
            freshnessTone={creativeFreshness.status}
          />
        ) : (
          <section id="looks" className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>FashionCore looks</h2>
              <span>sem snapshot</span>
            </div>
            <div className={styles.emptyState}>
              <Workflow size={20} />
              <p>
                Rode <code>brain-env-run -- python3 scripts/creative-control-snapshot.py</code>
                no host local para ingerir looks do fashioncore.
              </p>
            </div>
          </section>
        )}

        {creative ? (
          <DevotionalsPanel
            stats={creative.devotionals.stats}
            pending={creative.devotionals.pending}
            freshnessLabel={creativeFreshness.label}
            freshnessTone={creativeFreshness.status}
          />
        ) : (
          <section id="devotionais" className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>FaithSchool devotionals</h2>
              <span>sem snapshot</span>
            </div>
            <div className={styles.emptyState}>
              <Workflow size={20} />
              <p>
                Coletor ainda não rodou. Approve/reject ficam habilitados quando
                o snapshot for ingerido com pelo menos um devotional pendente.
              </p>
            </div>
          </section>
        )}

        <section id="governanca" className={styles.guardrailBand}>
          <ShieldCheck size={24} />
          <div>
            <h2>Gates obrigatórios</h2>
            <p>
              Deploy, push/merge, App Store, ads, produção, bulk Linear e secrets
              continuam exigindo comando explícito do Paulo.
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}
