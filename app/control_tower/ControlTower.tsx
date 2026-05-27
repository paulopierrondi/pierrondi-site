import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Cpu,
  GitBranch,
  ListChecks,
  Radar,
  ShieldCheck,
  Workflow,
} from 'lucide-react'

import type { AutomationControlSnapshot } from '@/lib/automation-control/types'
import styles from './ControlTower.module.css'

interface ControlTowerProps {
  snapshot: AutomationControlSnapshot | null
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
  ['Runtime', 'CLI disponível, processos ativos, último sinal e fallback por superfície.'],
  ['Custo', 'Modelo, tier, tokens, cache hit e custo estimado por workflow.'],
  ['Qualidade', 'Schema validado, retries, falhas de parsing e evidência de saída.'],
  ['Risco', 'Contexto sensível, secrets bloqueados, human gate e autonomia permitida.'],
]

const workflowModel = [
  ['repo_hygiene_daily', 'Git status, Linear map e classificação de risco por repo.'],
  ['automation_health_hourly', 'Logs, journals e falhas com causa provável e owner.'],
  ['handoff_stale_sweeper', 'Handoffs antigos viram fechar, reativar ou backlog.'],
  ['agent_activation_gate', 'Scorecard >= 70 antes de qualquer agente novo ficar ativo.'],
  ['llm_cost_quality_daily', 'Custo, cache, tiering e anomalias por workflow.'],
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

export default function ControlTower({ snapshot }: ControlTowerProps) {
  const metrics = metricData(snapshot)
  const p0 = lanes[0].items.length
  const topAutomations = snapshot?.automations.slice(0, 12) ?? []

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
          <a href="#automacoes">Automações</a>
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
              Painel privado para decidir o que para, o que corrige e o que pode
              escalar com evidência operacional.
            </p>
          </div>
          <div className={styles.statusCard} data-status={snapshot?.summary.overallStatus ?? 'red'}>
            <span>{snapshot ? 'Snapshot vivo' : 'Baseline Kimi'}</span>
            <strong>{formatDate(snapshot?.collectedAt)}</strong>
            <small>{snapshot?.machine.hostname ?? 'sem ingestão recente'}</small>
          </div>
        </header>

        <section className={styles.decisionBand}>
          <Radar size={22} />
          <div>
            <strong>Decisão recomendada: congelar novos agentes até o scorecard existir.</strong>
            <span>Resolver dirty repos, automações falhas e handoff stale antes de escalar autonomia.</span>
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
