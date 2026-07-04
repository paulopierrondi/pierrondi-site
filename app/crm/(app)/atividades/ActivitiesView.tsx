'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, CheckCircle2 } from 'lucide-react'
import type { Activity, Project, Client, ActivityStatus } from '@/lib/crm/types'

const STATUS_OPTIONS: ActivityStatus[] = ['pending', 'in_progress', 'done', 'blocked']
const STATUS_LABELS: Record<string, string> = { pending: 'Pendente', in_progress: 'Em andamento', done: 'Feito', blocked: 'Bloqueado' }
const STATUS_COLORS: Record<string, string> = { pending: '#f2c82e', in_progress: '#55b8d9', done: '#16c456', blocked: '#ff4756' }

function Badge({ status }: { status: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: `${STATUS_COLORS[status] ?? '#888'}22`, color: STATUS_COLORS[status] ?? '#888', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

type FormData = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = { projectId: '', title: '', description: '', status: 'pending', dueDate: '', completedAt: '' }

interface Props { initialActivities: Activity[]; projects: Project[]; clients: Client[] }

export default function ActivitiesView({ initialActivities, projects, clients }: Props) {
  const [activities, setActivities] = useState(initialActivities)
  const [editing, setEditing] = useState<Activity | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [filter, setFilter] = useState<string>('all')
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  const filtered = filter === 'all' ? activities : activities.filter((a) => a.status === filter)

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/activities/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const updated: Activity = await res.json()
      setActivities((a) => a.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/activities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const created: Activity = await res.json()
      setActivities((a) => [...a, created])
      setCreating(false)
    }
    setForm(EMPTY)
  }

  async function markDone(id: string) {
    const res = await fetch(`/api/crm/activities/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'done', completedAt: new Date().toISOString() }) })
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

  const open = activities.filter((a) => a.status !== 'done').length
  const done = activities.filter((a) => a.status === 'done').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Atividades</h1>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>{open} abertas · {done} feitas</p>
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }} style={btnPrimary}>
          <Plus size={15} /> Nova atividade
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['all', 'Todas'], ['pending', 'Pendentes'], ['in_progress', 'Em andamento'], ['done', 'Feitas'], ['blocked', 'Bloqueadas']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--color-hairline)', background: filter === v ? 'var(--color-primary)' : 'transparent', color: filter === v ? 'var(--color-on-primary)' : 'var(--color-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{l}</button>
        ))}
      </div>

      {(creating || editing) && (
        <div style={formCard}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
            {editing ? 'Editar atividade' : 'Nova atividade'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <div>
              <label style={labelStyle}>Projeto</label>
              <select value={form.projectId} onChange={(e) => setForm((f) => ({ ...f, projectId: e.target.value }))} style={inputStyle}>
                <option value="">— sem projeto —</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
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
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ActivityStatus }))} style={inputStyle}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Prazo</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={save} style={btnPrimary}>Salvar</button>
            <button onClick={() => { setCreating(false); setEditing(null); setForm(EMPTY) }} style={btnSecondary}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--color-muted)' }}>Nenhuma atividade.</p>
        ) : (
          filtered.map((a) => {
            const proj = projectMap[a.projectId]
            const client = proj ? clientMap[proj.clientId] : undefined
            return (
              <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: 12, padding: '14px 18px', opacity: a.status === 'done' ? 0.6 : 1 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink)', margin: 0, textDecoration: a.status === 'done' ? 'line-through' : 'none' }}>{a.title}</p>
                    <Badge status={a.status} />
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                    {proj ? proj.title : '—'}
                    {client ? ` · ${client.name}` : ''}
                    {a.dueDate ? ` · Prazo: ${a.dueDate}` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {a.status !== 'done' && (
                    <button onClick={() => markDone(a.id)} title="Marcar como feito" style={{ ...btnIcon, color: '#16c456' }}>
                      <CheckCircle2 size={14} />
                    </button>
                  )}
                  <button onClick={() => startEdit(a)} style={btnIcon}><Pencil size={14} /></button>
                  <button onClick={() => remove(a.id)} style={btnIconDanger}><Trash2 size={14} /></button>
                </div>
              </div>
            )
          })
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
