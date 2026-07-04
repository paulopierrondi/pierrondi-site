'use client'

import { useState } from 'react'
import { Plus, Trash2, MessageSquare, ArrowDownLeft, ArrowUpRight, Lock } from 'lucide-react'
import type { Discussion, Project, Client } from '@/lib/crm/types'

const DIRECTION_OPTIONS = [
  { value: 'inbound', label: 'Recebida', icon: ArrowDownLeft, color: '#55b8d9' },
  { value: 'outbound', label: 'Enviada', icon: ArrowUpRight, color: '#c8ff2e' },
  { value: 'internal', label: 'Interna', icon: Lock, color: '#888' },
]

const CHANNEL_OPTIONS = ['WhatsApp', 'Email', 'Meet', 'Telefone', 'Slack', 'Notion', 'Outro']

type FormData = Omit<Discussion, 'id' | 'createdAt'>
const EMPTY: FormData = { projectId: '', content: '', direction: 'inbound', channel: 'WhatsApp' }

function DirectionBadge({ direction }: { direction: string }) {
  const opt = DIRECTION_OPTIONS.find((d) => d.value === direction)
  const clr = opt?.color ?? '#888'
  return (
    <span className="crm-badge" style={{ background: `${clr}20`, color: clr }}>
      {opt?.label ?? direction}
    </span>
  )
}

function fmt(iso: string) {
  try {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function DiscussoesView({ initialDiscussions, projects, clients }: {
  initialDiscussions: Discussion[]
  projects: Project[]
  clients: Client[]
}) {
  const [discussions, setDiscussions] = useState(initialDiscussions)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [filterProject, setFilterProject] = useState('')
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  const filtered = filterProject
    ? discussions.filter((d) => d.projectId === filterProject)
    : discussions

  const sorted = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  async function save() {
    const res = await fetch('/api/crm/discussions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const created: Discussion = await res.json()
    setDiscussions((d) => [created, ...d])
    setCreating(false)
    setForm(EMPTY)
  }

  async function remove(id: string) {
    if (!confirm('Excluir discussão?')) return
    await fetch(`/api/crm/discussions/${id}`, { method: 'DELETE' })
    setDiscussions((d) => d.filter((x) => x.id !== id))
  }

  return (
    <div>
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Discussões</h1>
          <p className="crm-page-sub">{discussions.length} registro(s) de comunicação</p>
        </div>
        <button className="crm-btn-primary" onClick={() => { setCreating(true); setForm(EMPTY) }}>
          <Plus size={15} /> Nova discussão
        </button>
      </div>

      {/* Project filter */}
      {projects.length > 0 && (
        <div className="crm-tabs" style={{ marginBottom: creating ? 12 : 20 }}>
          <button
            className={`crm-tab${filterProject === '' ? ' active' : ''}`}
            onClick={() => setFilterProject('')}
          >
            Todos projetos
          </button>
          {projects.map((p) => (
            <button
              key={p.id}
              className={`crm-tab${filterProject === p.id ? ' active' : ''}`}
              onClick={() => setFilterProject(p.id)}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      {creating && (
        <div className="crm-form-card">
          <p className="crm-form-title">Nova discussão</p>
          <div className="crm-form-grid">
            <div className="crm-field">
              <label>Projeto</label>
              <select value={form.projectId} onChange={(e) => setForm((f) => ({ ...f, projectId: e.target.value }))}>
                <option value="">— sem projeto —</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Direção</label>
              <select value={form.direction} onChange={(e) => setForm((f) => ({ ...f, direction: e.target.value as Discussion['direction'] }))}>
                {DIRECTION_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Canal</label>
              <select value={form.channel} onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))}>
                {CHANNEL_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="crm-field" style={{ gridColumn: '1 / -1' }}>
              <label>Conteúdo *</label>
              <textarea
                rows={4}
                placeholder="O que foi discutido, decidido ou comunicado..."
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="crm-btn-primary" onClick={save} disabled={!form.content.trim()}>Salvar</button>
            <button className="crm-btn-secondary" onClick={() => { setCreating(false); setForm(EMPTY) }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="crm-list">
        {sorted.length === 0 ? (
          <div className="crm-empty">
            <MessageSquare size={32} className="crm-empty-icon" />
            <p className="crm-empty-text">Nenhuma discussão registrada. Comece adicionando a primeira comunicação acima.</p>
          </div>
        ) : sorted.map((d) => {
          const proj = projectMap[d.projectId]
          const client = proj ? clientMap[proj.clientId] : undefined
          const opt = DIRECTION_OPTIONS.find((x) => x.value === d.direction)
          const Icon = opt?.icon ?? MessageSquare
          const clr = opt?.color ?? '#888'
          return (
            <div key={d.id} className="crm-row" style={{ alignItems: 'flex-start', gap: 16 }}>
              <div
                style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: `${clr}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2,
                }}
              >
                <Icon size={15} color={clr} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  <DirectionBadge direction={d.direction} />
                  <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>{d.channel}</span>
                  {proj && (
                    <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>
                      · {proj.title}{client ? ` (${client.name})` : ''}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--color-muted)', marginLeft: 'auto' }}>{fmt(d.createdAt)}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-body-strong)', margin: 0, lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {d.content}
                </p>
              </div>
              <button className="crm-btn-icon crm-btn-icon-danger" onClick={() => remove(d.id)} style={{ flexShrink: 0 }}>
                <Trash2 size={13} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
