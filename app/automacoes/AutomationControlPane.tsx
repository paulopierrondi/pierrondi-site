import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Database,
  Eye,
  Server,
  ShieldCheck,
} from 'lucide-react'

import type {
  AutomationControlSnapshot,
  AutomationControlStatus,
  AutomationSignal,
  ControlDecision,
} from '@/lib/automation-control/types'
import styles from './AutomationControlPane.module.css'

interface AutomationControlPaneProps {
  snapshot: AutomationControlSnapshot | null
}

function formatDate(value?: string) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date)
}

function statusLabel(status: AutomationControlStatus) {
  if (status === 'green') return 'Saudável'
  if (status === 'yellow') return 'Atenção'
  if (status === 'red') return 'Ação necessária'
  return 'Sem leitura'
}

function decisionTone(type: ControlDecision['type']) {
  if (type === 'act') return styles.act
  if (type === 'investigate') return styles.investigate
  if (type === 'monitor') return styles.monitor
  return styles.ignore
}

function automationTone(item: AutomationSignal) {
  const status = item.status.toLowerCase()
  if (status.includes('failed') || status.includes('error')) return styles.act
  if (status.includes('blocked') || status.includes('stale') || status.includes('silent')) return styles.investigate
  if (status.includes('success') || status.includes('ok') || status.includes('active')) return styles.ignore
  return styles.monitor
}

function EmptyState() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Automation Control Pane</p>
          <h1>Aguardando o primeiro snapshot do Mac.</h1>
          <p>
            Rode o coletor local com `AUTOMATION_CONTROL_INGEST_TOKEN` para enviar
            os sinais atuais ao Railway. A página já está privada, mas ainda não há
            dado armazenado neste runtime.
          </p>
        </div>
      </section>
    </main>
  )
}

export default function AutomationControlPane({ snapshot }: AutomationControlPaneProps) {
  if (!snapshot) return <EmptyState />

  const p0 = snapshot.decisions.filter((item) => item.priority === 'P0')
  const topAutomations = snapshot.automations.slice(0, 36)
  const kimiCodeLanes = snapshot.kimiCodeLanes ?? []

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Automation Control Pane</p>
          <h1>Onde atuar, onde monitorar, onde ignorar.</h1>
          <p>
            Snapshot executivo das automações, coders, LLMs e runtime Railway.
            Fonte: sinais locais do Mac enviados para o Railway.
          </p>
        </div>
        <div className={styles.heroStatus} data-status={snapshot.summary.overallStatus}>
          <span>{statusLabel(snapshot.summary.overallStatus)}</span>
          <strong>{formatDate(snapshot.collectedAt)}</strong>
          <small>{snapshot.machine.hostname}</small>
        </div>
      </section>

      <section className={styles.metricGrid} aria-label="Resumo operacional">
        <article>
          <Activity size={20} />
          <span>Ativos recentes</span>
          <strong>{snapshot.summary.activeRecent}</strong>
        </article>
        <article>
          <AlertTriangle size={20} />
          <span>Falhas / bloqueios</span>
          <strong>{snapshot.summary.failed + snapshot.summary.blocked}</strong>
        </article>
        <article>
          <Clock3 size={20} />
          <span>Silenciosos</span>
          <strong>{snapshot.summary.silentOrStale}</strong>
        </article>
        <article>
          <Eye size={20} />
          <span>Sem evidência</span>
          <strong>{snapshot.summary.noEvidence}</strong>
        </article>
        <article>
          <Server size={20} />
          <span>LaunchAgents</span>
          <strong>{snapshot.summary.launchAgentsTracked}</strong>
        </article>
        <article>
          <Database size={20} />
          <span>Codex automations</span>
          <strong>{snapshot.summary.codexAutomations}</strong>
        </article>
      </section>

      <section className={styles.sectionHeader}>
        <div>
          <p className={styles.kicker}>Prioridade executiva</p>
          <h2>Ações recomendadas</h2>
        </div>
        <span>{p0.length} P0</span>
      </section>

      <section className={styles.decisionGrid}>
        {snapshot.decisions.map((decision) => (
          <article className={`${styles.decision} ${decisionTone(decision.type)}`} key={`${decision.priority}-${decision.title}`}>
            <div className={styles.decisionTop}>
              <span>{decision.priority}</span>
              <strong>{decision.type}</strong>
            </div>
            <h3>{decision.title}</h3>
            <p>{decision.rationale}</p>
            <div className={styles.nextAction}>{decision.nextAction}</div>
            {decision.evidence && <small>{decision.evidence}</small>}
          </article>
        ))}
      </section>

      <section className={styles.twoColumn}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Coders</h2>
            <span>evidência por superfície</span>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Coder</th>
                  <th>Ativo</th>
                  <th>Falhou</th>
                  <th>Silencioso</th>
                  <th>Sem evid.</th>
                  <th>Leitura</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.coders.map((coder) => (
                  <tr key={coder.name}>
                    <td>{coder.name}</td>
                    <td>{coder.active}</td>
                    <td>{coder.failed + coder.blocked}</td>
                    <td>{coder.silentOrStale}</td>
                    <td>{coder.noEvidence}</td>
                    <td>{coder.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>LLMs em uso</h2>
            <span>CLI, processos e jobs recentes</span>
          </div>
          <div className={styles.llmList}>
            {snapshot.llms.map((llm) => (
              <article key={llm.name} data-status={llm.status}>
                <div>
                  <strong>{llm.name}</strong>
                  <span>{llm.available ? llm.cliPath ?? 'CLI disponível' : 'CLI não detectado'}</span>
                </div>
                <div>
                  <b>{llm.recentJobs}</b>
                  <small>jobs</small>
                </div>
                <div>
                  <b>{llm.activeProcesses}</b>
                  <small>proc.</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Kimi code lanes</h2>
          <span>{kimiCodeLanes.reduce((sum, lane) => sum + lane.total, 0)} automações</span>
        </div>
        <div className={styles.kimiLaneGrid}>
          {kimiCodeLanes.map((lane) => (
            <article key={lane.lane} className={styles.kimiLane}>
              <div className={styles.kimiLaneTop}>
                <div>
                  <strong>{lane.lane === 'low' ? 'Low code' : 'Mid code'}</strong>
                  <span>{lane.description}</span>
                </div>
                <b>{lane.total}</b>
              </div>
              <div className={styles.kimiLaneStats}>
                <span>loaded {lane.loaded}</span>
                <span>dormant {lane.dormant}</span>
                <span>gated {lane.gated}</span>
              </div>
              <div className={styles.kimiLaneList}>
                {lane.items.slice(0, 8).map((item) => (
                  <div key={item.id} data-risk={item.risk}>
                    <strong>{item.id}</strong>
                    <span>{item.status} · {item.risk}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Automações</h2>
          <span>{snapshot.automations.length} sinais classificados</span>
        </div>
        <div className={styles.automationGrid}>
          {topAutomations.map((item) => (
            <article className={`${styles.automation} ${automationTone(item)}`} key={`${item.surface}-${item.id}`}>
              <div>
                <strong>{item.id}</strong>
                <span>{item.surface} · {item.ageLabel ?? formatDate(item.lastSeen)}</span>
              </div>
              <p>{item.signal}</p>
              <small>{item.action}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.railwayBand}>
        <ShieldCheck size={22} />
        <div>
          <h2>Railway</h2>
          <p>
            {snapshot.railway.linked ? 'Projeto linkado' : 'Projeto não linkado'} ·{' '}
            {snapshot.railway.project ?? 'sem projeto'} · {snapshot.railway.environment ?? 'sem ambiente'} ·{' '}
            {snapshot.railway.service ?? 'sem serviço'}
          </p>
        </div>
        <CheckCircle2 size={20} />
      </section>

      <section className={styles.reportList}>
        <h2>Fontes</h2>
        {snapshot.reports.map((report) => (
          <div key={report.path}>
            <span>{report.name}</span>
            <code>{report.path}</code>
          </div>
        ))}
      </section>
    </main>
  )
}
