'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Project, Client, ProjectStatus, Currency } from '@/lib/crm/types'

const STATUS_OPTIONS: ProjectStatus[] = ['lead', 'active', 'paused', 'completed', 'cancelled']
const CURRENCY_OPTIONS: Currency[] = ['BRL', 'USD', 'EUR']
const STATUS_LABELS: Record<string, string> = {
  lead: 'Lead', active: 'Ativo', paused: 'Pausado', completed: 'Concluído', cancelled: 'Cancelado',
}
const STATUS_COLORS: Record<string, string> = {
  active: '#c8ff2e', completed: '#16c456', lead: '#55b8d9', paused: '#f2c82e', cancelled: '#ff4756',
}

function fmt(n: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(n)
}

function Badge({ status }: { status: string }) {
  const clr = STATUS_COLORS[status] ?? '#888'
  return (
    <span className="crm-badge" style={{ background: `${clr}20`, color: clr }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

type FormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = {
  clientId: '', title: '', description: '', status: 'lead',
  startDate: '', endDate: '', value: 0, currency: 'BRL', notes: '',
}

export default function ProjectsView({ initialProjects, clients }: { initialProjects: Project[]; clients: Client[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const [editing, setEditing] = useState<Project | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/projects/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const updated: Project = await res.json()
      setProjects((p) => p.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
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
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Projetos</h1>
          <p className="crm-page-sub">{projects.length} projeto(s)</p>
        </div>
        <button className="crm-btn-primary" onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }}>
          <Plus size={15} /> Novo projeto
        </button>
      </div>

      {(creating || editing) && (
        <div className="crm-form-card">
          <p className="crm-form-title">{editing ? 'Editar projeto' : 'Novo projeto'}</p>
          <div className="crm-form-grid">
            <div className="crm-field">
              <label>Cliente</label>
              <select value={form.clientId} onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}>
                <option value="">— sem cliente —</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
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
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProjectStatus }))}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Valor</label>
              <input type="number" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) }))} />
            </div>
            <div className="crm-field">
              <label>Moeda</label>
              <select value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as Currency }))}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Início</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Fim</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
            </div>
            <div className="crm-field" style={{ gridColumn: 'span 2' }}>
              <label>Notas</label>
              <textarea rows={2} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="crm-btn-primary" onClick={save}>Salvar</button>
            <button className="crm-btn-secondary" onClick={() => { setCreating(false); setEditing(null); setForm(EMPTY) }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="crm-list">
        {projects.length === 0 ? (
          <div className="crm-empty">
            <p className="crm-empty-text">Nenhum projeto. Crie o primeiro projeto acima.</p>
          </div>
        ) : projects.map((p) => (
          <div key={p.id} className="crm-row">
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
            <div className="crm-row-actions">
              <button className="crm-btn-icon" onClick={() => startEdit(p)}><Pencil size={14} /></button>
              <button className="crm-btn-icon crm-btn-icon-danger" onClick={() => remove(p.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
