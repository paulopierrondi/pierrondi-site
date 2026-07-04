'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, CheckCircle2 } from 'lucide-react'
import type { Activity, Project, Client, ActivityStatus } from '@/lib/crm/types'

const STATUS_OPTIONS: ActivityStatus[] = ['pending', 'in_progress', 'done', 'blocked']
const STATUS_LABELS: Record<string, string> = { pending: 'Pendente', in_progress: 'Em andamento', done: 'Feito', blocked: 'Bloqueado' }
const STATUS_COLORS: Record<string, string> = { pending: '#f2c82e', in_progress: '#55b8d9', done: '#16c456', blocked: '#ff4756' }

const FILTERS = [
  ['all', 'Todas'],
  ['pending', 'Pendentes'],
  ['in_progress', 'Em andamento'],
  ['done', 'Feitas'],
  ['blocked', 'Bloqueadas'],
]

function Badge({ status }: { status: string }) {
  const clr = STATUS_COLORS[status] ?? '#888'
  return (
    <span className="crm-badge" style={{ background: `${clr}20`, color: clr }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

type FormData = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = { projectId: '', title: '', description: '', status: 'pending', dueDate: '', completedAt: '' }

export default function ActivitiesView({ initialActivities, projects, clients }: {
  initialActivities: Activity[]
  projects: Project[]
  clients: Client[]
}) {
  const [activities, setActivities] = useState(initialActivities)
  const [editing, setEditing] = useState<Activity | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [filter, setFilter] = useState('all')
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  const filtered = filter === 'all' ? activities : activities.filter((a) => a.status === filter)
  const open = activities.filter((a) => a.status !== 'done').length
  const done = activities.filter((a) => a.status === 'done').length

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/activities/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const updated: Activity = await res.json()
      setActivities((a) => a.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/activities', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const created: Activity = await res.json()
      setActivities((a) => [...a, created])
      setCreating(false)
    }
    setForm(EMPTY)
  }

  async function markDone(id: string) {
    const res = await fetch(`/api/crm/activities/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'done', completedAt: new Date().toISOString() }),
    })
    const updated: Activity = await res.json()
    setActivities((a) => a.map((x) => (x.id === updated.id ? updated : x)))
  }

  async function remove(id: string) {
    if (!confirm('Excluir atividade?')) return
    await fetch(`/api/crm/activities/${id}`, { method: 'DELETE' })
    setActivities((a) => a.filter((x) => x.id !== id))
  }

  function startEdit(a: Activity) {
    setEditing(a); setCreating(false)
    setForm({ projectId: a.projectId, title: a.title, description: a.description, status: a.status, dueDate: a.dueDate, completedAt: a.completedAt })
  }

  return (
    <div>
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Atividades</h1>
          <p className="crm-page-sub">{open} abertas · {done} feitas</p>
        </div>
        <button className="crm-btn-primary" onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }}>
          <Plus size={15} /> Nova atividade
        </button>
      </div>

      <div className="crm-tabs">
        {FILTERS.map(([v, l]) => (
          <button key={v} className={`crm-tab${filter === v ? ' active' : ''}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>

      {(creating || editing) && (
        <div className="crm-form-card">
          <p className="crm-form-title">{editing ? 'Editar atividade' : 'Nova atividade'}</p>
          <div className="crm-form-grid">
            <div className="crm-field">
              <label>Projeto</label>
              <select value={form.projectId} onChange={(e) => setForm((f) => ({ ...f, projectId: e.target.value }))}>
                <option value="">— sem projeto —</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div className="crm-field" style={{ gridColumn: 'span 2' }}>
              <label>Título *</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="crm-field" style={{ gridColumn: 'span 3' }}>
              <label>Descrição</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ActivityStatus }))}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Prazo</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="crm-btn-primary" onClick={save}>Salvar</button>
            <button className="crm-btn-secondary" onClick={() => { setCreating(false); setEditing(null); setForm(EMPTY) }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="crm-list">
        {filtered.length === 0 ? (
          <div className="crm-empty">
            <p className="crm-empty-text">Nenhuma atividade{filter !== 'all' ? ` com status "${STATUS_LABELS[filter]}"` : ''}.</p>
          </div>
        ) : filtered.map((a) => {
          const proj = projectMap[a.projectId]
          const client = proj ? clientMap[proj.clientId] : undefined
          return (
            <div key={a.id} className="crm-row" style={{ opacity: a.status === 'done' ? 0.6 : 1 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink)', margin: 0, textDecoration: a.status === 'done' ? 'line-through' : 'none' }}>
                    {a.title}
                  </p>
                  <Badge status={a.status} />
                </div>
                <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                  {proj ? proj.title : '—'}
                  {client ? ` · ${client.name}` : ''}
                  {a.dueDate ? ` · Prazo: ${a.dueDate}` : ''}
                </p>
              </div>
              <div className="crm-row-actions">
                {a.status !== 'done' && (
                  <button className="crm-btn-icon crm-btn-icon-success" onClick={() => markDone(a.id)} title="Marcar como feito">
                    <CheckCircle2 size={14} />
                  </button>
                )}
                <button className="crm-btn-icon" onClick={() => startEdit(a)}><Pencil size={14} /></button>
                <button className="crm-btn-icon crm-btn-icon-danger" onClick={() => remove(a.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
