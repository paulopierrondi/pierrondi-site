'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Project, Client, ProjectStatus, Currency } from '@/lib/crm/types'

const STATUS_OPTIONS: ProjectStatus[] = ['lead', 'active', 'paused', 'completed', 'cancelled']
const CURRENCY_OPTIONS: Currency[] = ['BRL', 'USD', 'EUR']

const STATUS_COLORS: Record<string, string> = {
  active: '#c8ff2e',
  completed: '#16c456',
  lead: '#55b8d9',
  paused: '#f2c82e',
  cancelled: '#ff4756',
}

const STATUS_LABELS: Record<string, string> = {
  lead: 'Lead',
  active: 'Ativo',
  paused: 'Pausado',
  completed: 'Concluído',
  cancelled: 'Cancelado',
}

function fmt(n: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(n)
}

function Badge({ status }: { status: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
      background: `${STATUS_COLORS[status] ?? '#888'}22`,
      color: STATUS_COLORS[status] ?? '#888',
      letterSpacing: '0.04em', textTransform: 'uppercase' as const,
    }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

type FormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = {
  clientId: '', title: '', description: '', status: 'lead',
  startDate: '', endDate: '', value: 0, currency: 'BRL', notes: '',
}

interface Props {
  initialProjects: Project[]
  clients: Client[]
}

export default function ProjectsView({ initialProjects, clients }: Props) {
  const [projects, setProjects] = useState(initialProjects)
  const [editing, setEditing] = useState<Project | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/projects/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const updated: Project = await res.json()
      setProjects((p) => p.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const created: Project = await res.json()
      setProjects((p) => [...p, created])
      setCreating(false)
    }
    setForm(EMPTY)
  }

  async function remove(id: string) {
    if (!confirm('Excluir projeto?')) return
    await fetch(`/api/crm/projects/${id}`, { method: 'DELETE' })
    setProjects((p) => p.filter((x) => x.id !== id))
  }

  function startEdit(p: Project) {
    setEditing(p); setCreating(false)
    setForm({ clientId: p.clientId, title: p.title, description: p.description, status: p.status, startDate: p.startDate, endDate: p.endDate, value: p.value, currency: p.currency, notes: p.notes })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Projetos</h1>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>{projects.length} projeto(s)</p>
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }} style={btnPrimary}>
          <Plus size={15} /> Novo projeto
        </button>
      </div>

      {(creating || editing) && (
        <div style={formCard}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
            {editing ? 'Editar projeto' : 'Novo projeto'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <div>
              <label style={labelStyle}>Cliente</label>
              <select value={form.clientId} onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))} style={inputStyle}>
                <option value="">— sem cliente —</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Título *</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Descrição</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProjectStatus }))} style={inputStyle}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Valor</label>
              <input type="number" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Moeda</label>
              <select value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as Currency }))} style={inputStyle}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Início</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Fim</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Notas</label>
              <textarea rows={2} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={save} style={btnPrimary}>Salvar</button>
            <button onClick={() => { setCreating(false); setEditing(null); setForm(EMPTY) }} style={btnSecondary}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--color-muted)' }}>Nenhum projeto.</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{p.title}</p>
                  <Badge status={p.status} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 2 }}>
                  {clientMap[p.clientId]?.name ?? '—'} · {fmt(p.value, p.currency)}
                  {p.startDate && ` · ${p.startDate}`}
                  {p.endDate && ` → ${p.endDate}`}
                </p>
                {p.description && <p style={{ fontSize: 13, color: 'var(--color-body)', marginTop: 6 }}>{p.description}</p>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => startEdit(p)} style={btnIcon}><Pencil size={14} /></button>
                <button onClick={() => remove(p.id)} style={btnIconDanger}><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { fontSize: 12, color: 'var(--color-muted)', display: 'block', marginBottom: 4 }
const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--color-hairline)', background: 'var(--color-surface-3)', color: 'var(--color-ink)', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }
const formCard: React.CSSProperties = { background: 'var(--color-surface-2)', border: '1px solid var(--color-hairline-strong)', borderRadius: 12, padding: 20, marginBottom: 24 }
const btnPrimary: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: 'var(--color-primary)', color: 'var(--color-on-primary)', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }
const btnSecondary: React.CSSProperties = { padding: '8px 16px', borderRadius: 8, background: 'transparent', color: 'var(--color-body)', fontWeight: 500, fontSize: 13, border: '1px solid var(--color-hairline)', cursor: 'pointer' }
const btnIcon: React.CSSProperties = { padding: 7, borderRadius: 7, background: 'transparent', color: 'var(--color-muted)', border: '1px solid var(--color-hairline)', cursor: 'pointer', display: 'flex', alignItems: 'center' }
const btnIconDanger: React.CSSProperties = { ...btnIcon, color: 'var(--color-error)' }
