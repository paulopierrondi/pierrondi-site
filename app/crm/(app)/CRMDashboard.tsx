'use client'

import Link from 'next/link'
import type { DashboardStats, Project, Activity, Payment, Client } from '@/lib/crm/types'

const STATUS_COLORS: Record<string, string> = {
  active: '#c8ff2e', completed: '#16c456', lead: '#55b8d9',
  paused: '#f2c82e', cancelled: '#ff4756',
  pending: '#f2c82e', done: '#16c456', in_progress: '#55b8d9', blocked: '#ff4756',
  received: '#16c456', overdue: '#ff4756', partial: '#55b8d9',
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Ativo', completed: 'Concluído', lead: 'Lead', paused: 'Pausado', cancelled: 'Cancelado',
  pending: 'Pendente', done: 'Feito', in_progress: 'Em andamento', blocked: 'Bloqueado',
  received: 'Recebido', overdue: 'Vencido', partial: 'Parcial',
}

function fmt(n: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(n)
}

function Badge({ status }: { status: string }) {
  const clr = STATUS_COLORS[status] ?? '#888'
  return (
    <span className="crm-badge" style={{ background: `${clr}20`, color: clr }}>
      {STATUS_LABELS[status] ?? status.replace('_', ' ')}
    </span>
  )
}

interface Props {
  stats: DashboardStats
  projects: Project[]
  activities: Activity[]
  payments: Payment[]
  clients: Client[]
}

export default function CRMDashboard({ stats, projects, activities, payments, clients }: Props) {
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))
  const recentProjects = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)
  const recentActivities = activities.filter((a) => a.status !== 'done').slice(0, 5)
  const recentPayments = [...payments].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)

  return (
    <div>
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Dashboard</h1>
          <p className="crm-page-sub">Visão geral dos seus projetos pessoais e produtos</p>
        </div>
      </div>

      <div className="crm-stats">
        <div className="crm-stat">
          <p className="crm-stat-label">Clientes</p>
          <p className="crm-stat-value">{stats.totalClients}</p>
        </div>
        <div className="crm-stat">
          <p className="crm-stat-label">Projetos ativos</p>
          <p className="crm-stat-value">{stats.activeProjects}</p>
        </div>
        <div className="crm-stat">
          <p className="crm-stat-label">Recebido</p>
          <p className="crm-stat-value" style={{ fontSize: 18 }}>{fmt(stats.totalReceived)}</p>
        </div>
        <div className="crm-stat">
          <p className="crm-stat-label">A receber</p>
          <p className="crm-stat-value" style={{ fontSize: 18 }}>{fmt(stats.pendingPayments)}</p>
        </div>
        <div className="crm-stat">
          <p className="crm-stat-label">Ativ. abertas</p>
          <p className="crm-stat-value">{stats.openActivities}</p>
        </div>
        <div className="crm-stat">
          <p className="crm-stat-label">Concluídos</p>
          <p className="crm-stat-value">{stats.completedProjects}</p>
        </div>
      </div>

      <div className="crm-sections">
        <section>
          <div className="crm-section-header">
            <h2 className="crm-section-title">Projetos recentes</h2>
            <Link href="/crm/projetos" className="crm-section-link">Ver todos →</Link>
          </div>
          <div className="crm-list">
            {recentProjects.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>Nenhum projeto.</p>
            ) : recentProjects.map((p) => (
              <div key={p.id} className="crm-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{p.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                      {clientMap[p.clientId]?.name ?? '—'} · {fmt(p.value, p.currency)}
                    </p>
                  </div>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="crm-section-header">
            <h2 className="crm-section-title">Atividades abertas</h2>
            <Link href="/crm/atividades" className="crm-section-link">Ver todas →</Link>
          </div>
          <div className="crm-list">
            {recentActivities.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>Nenhuma atividade aberta.</p>
            ) : recentActivities.map((a) => (
              <div key={a.id} className="crm-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <p style={{ fontSize: 14, color: 'var(--color-ink)', margin: 0 }}>{a.title}</p>
                  <Badge status={a.status} />
                </div>
                {a.dueDate && (
                  <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4 }}>Prazo: {a.dueDate}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="crm-section-header">
            <h2 className="crm-section-title">Pagamentos recentes</h2>
            <Link href="/crm/pagamentos" className="crm-section-link">Ver todos →</Link>
          </div>
          <div className="crm-list">
            {recentPayments.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>Nenhum pagamento.</p>
            ) : recentPayments.map((pay) => (
              <div key={pay.id} className="crm-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 14, color: 'var(--color-ink)', margin: 0 }}>{pay.description}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)', marginTop: 2 }}>
                      {fmt(pay.amount, pay.currency)}
                    </p>
                  </div>
                  <Badge status={pay.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
