'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Client } from '@/lib/crm/types'

const EMPTY: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', email: '', phone: '', company: '', notes: '',
}

export default function ClientsView({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState(initialClients)
  const [editing, setEditing] = useState<Client | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(EMPTY)

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/clients/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const updated: Client = await res.json()
      setClients((c) => c.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/clients', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const created: Client = await res.json()
      setClients((c) => [...c, created])
      setCreating(false)
    }
    setForm(EMPTY)
  }

  async function remove(id: string) {
    if (!confirm('Excluir cliente?')) return
    await fetch(`/api/crm/clients/${id}`, { method: 'DELETE' })
    setClients((c) => c.filter((x) => x.id !== id))
  }

  function startEdit(c: Client) {
    setEditing(c); setCreating(false)
    setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company, notes: c.notes })
  }

  return (
    <div>
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Clientes</h1>
          <p className="crm-page-sub">{clients.length} cliente(s)</p>
        </div>
        <button className="crm-btn-primary" onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }}>
          <Plus size={15} /> Novo cliente
        </button>
      </div>

      {(creating || editing) && (
        <div className="crm-form-card">
          <p className="crm-form-title">{editing ? 'Editar cliente' : 'Novo cliente'}</p>
          <div className="crm-form-grid">
            <div className="crm-field">
              <label>Nome *</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Empresa</label>
              <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Telefone</label>
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div className="crm-field" style={{ gridColumn: 'span 2' }}>
              <label>Notas</label>
              <textarea rows={3} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="crm-btn-primary" onClick={save}>Salvar</button>
            <button className="crm-btn-secondary" onClick={() => { setCreating(false); setEditing(null); setForm(EMPTY) }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="crm-list">
        {clients.length === 0 ? (
          <div className="crm-empty">
            <p className="crm-empty-text">Nenhum cliente cadastrado. Adicione o primeiro cliente acima.</p>
          </div>
        ) : clients.map((c) => (
          <div key={c.id} className="crm-row">
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{c.name}</p>
              {c.company && <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 2 }}>{c.company}</p>}
              {c.email && <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 1 }}>{c.email}</p>}
              {c.notes && <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 6, fontStyle: 'italic' }}>{c.notes}</p>}
            </div>
            <div className="crm-row-actions">
              <button className="crm-btn-icon" onClick={() => startEdit(c)}><Pencil size={14} /></button>
              <button className="crm-btn-icon crm-btn-icon-danger" onClick={() => remove(c.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
