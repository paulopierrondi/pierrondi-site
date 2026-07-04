'use client'

import Link from 'next/link'
import type { DashboardStats, Project, Activity, Payment, Client } from '@/lib/crm/types'

function fmt(n: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(n)
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 12,
        padding: '20px 24px',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4 }}>{sub}</p>}
    </div>
  )
}

const STATUS_COLORS: Record<string, string> = {
  active: '#c8ff2e',
  completed: '#16c456',
  lead: '#55b8d9',
  paused: '#f2c82e',
  cancelled: '#ff4756',
  pending: '#f2c82e',
  done: '#16c456',
  in_progress: '#55b8d9',
  blocked: '#ff4756',
  received: '#16c456',
  overdue: '#ff4756',
  partial: '#f2c82e',
}

function Badge({ status }: { status: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: 99,
        background: `${STATUS_COLORS[status] ?? '#888'}22`,
        color: STATUS_COLORS[status] ?? '#888',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
    >
      {status.replace('_', ' ')}
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
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', marginTop: 4 }}>
          Visão geral dos seus projetos freelance
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Clientes" value={String(stats.totalClients)} />
        <StatCard label="Projetos ativos" value={String(stats.activeProjects)} />
        <StatCard label="Recebido" value={fmt(stats.totalReceived)} />
        <StatCard label="A receber" value={fmt(stats.pendingPayments)} />
        <StatCard label="Atividades abertas" value={String(stats.openActivities)} />
        <StatCard label="Projetos concluídos" value={String(stats.completedProjects)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {/* Recent projects */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>Projetos</h2>
            <Link href="/crm/projetos" style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none' }}>
              Ver todos →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentProjects.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>Nenhum projeto.</p>
            ) : (
              recentProjects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 10,
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{p.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                        {clientMap[p.clientId]?.name ?? '—'} · {fmt(p.value, p.currency)}
                      </p>
                    </div>
                    <Badge status={p.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Open activities */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>Atividades abertas</h2>
            <Link href="/crm/atividades" style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none' }}>
              Ver todas →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentActivities.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>Nenhuma atividade aberta.</p>
            ) : (
              recentActivities.map((a) => (
                <div
                  key={a.id}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 10,
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontSize: 14, color: 'var(--color-ink)', margin: 0 }}>{a.title}</p>
                    <Badge status={a.status} />
                  </div>
                  {a.dueDate && (
                    <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4 }}>
                      Prazo: {a.dueDate}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent payments */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>Pagamentos</h2>
            <Link href="/crm/pagamentos" style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none' }}>
              Ver todos →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentPayments.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>Nenhum pagamento.</p>
            ) : (
              recentPayments.map((pay) => (
                <div
                  key={pay.id}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 10,
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 14, color: 'var(--color-ink)', margin: 0 }}>{pay.description}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)', marginTop: 2 }}>
                        {fmt(pay.amount, pay.currency)}
                      </p>
                    </div>
                    <Badge status={pay.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
