'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Client } from '@/lib/crm/types'

interface Props {
  initialClients: Client[]
}

const EMPTY: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  email: '',
  phone: '',
  company: '',
  notes: '',
}

export default function ClientsView({ initialClients }: Props) {
  const [clients, setClients] = useState(initialClients)
  const [editing, setEditing] = useState<Client | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(EMPTY)

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/clients/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const updated: Client = await res.json()
      setClients((c) => c.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    setEditing(c)
    setCreating(false)
    setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company, notes: c.notes })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Clientes</h1>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>{clients.length} cliente(s)</p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }}
          style={btnPrimary}
        >
          <Plus size={15} /> Novo cliente
        </button>
      </div>

      {(creating || editing) && (
        <FormCard
          title={editing ? 'Editar cliente' : 'Novo cliente'}
          onSave={save}
          onCancel={() => { setCreating(false); setEditing(null); setForm(EMPTY) }}
        >
          <Field label="Nome *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
          <Field label="Empresa" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} />
          <Field label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} type="email" />
          <Field label="Telefone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
          <Field label="Notas" value={form.notes} onChange={(v) => setForm((f) => ({ ...f, notes: v }))} multi />
        </FormCard>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {clients.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--color-muted)' }}>Nenhum cliente cadastrado.</p>
        ) : (
          clients.map((c) => (
            <div key={c.id} style={card}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{c.name}</p>
                {c.company && <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 2 }}>{c.company}</p>}
                {c.email && <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 1 }}>{c.email}</p>}
                {c.notes && <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 6, fontStyle: 'italic' }}>{c.notes}</p>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => startEdit(c)} style={btnIcon}><Pencil size={14} /></button>
                <button onClick={() => remove(c.id)} style={btnIconDanger}><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function FormCard({ title, children, onSave, onCancel }: {
  title: string
  children: React.ReactNode
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-hairline-strong)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>{title}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {children}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button onClick={onSave} style={btnPrimary}>Salvar</button>
        <button onClick={onCancel} style={btnSecondary}>Cancelar</button>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', multi }: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  multi?: boolean
}) {
  const style: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 8,
    border: '1px solid var(--color-hairline)',
    background: 'var(--color-surface-3)',
    color: 'var(--color-ink)',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical',
  }
  return (
    <div>
      <label style={{ fontSize: 12, color: 'var(--color-muted)', display: 'block', marginBottom: 4 }}>{label}</label>
      {multi ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} style={style} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={style} />
      )}
    </div>
  )
}

const card: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
  background: 'var(--color-surface)',
  border: '1px solid var(--color-hairline)',
  borderRadius: 12,
  padding: '16px 20px',
}

const btnPrimary: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 16px',
  borderRadius: 8,
  background: 'var(--color-primary)',
  color: 'var(--color-on-primary)',
  fontWeight: 700,
  fontSize: 13,
  border: 'none',
  cursor: 'pointer',
}

const btnSecondary: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  background: 'transparent',
  color: 'var(--color-body)',
  fontWeight: 500,
  fontSize: 13,
  border: '1px solid var(--color-hairline)',
  cursor: 'pointer',
}

const btnIcon: React.CSSProperties = {
  padding: 7,
  borderRadius: 7,
  background: 'transparent',
  color: 'var(--color-muted)',
  border: '1px solid var(--color-hairline)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
}

const btnIconDanger: React.CSSProperties = {
  ...btnIcon,
  color: 'var(--color-error)',
}
