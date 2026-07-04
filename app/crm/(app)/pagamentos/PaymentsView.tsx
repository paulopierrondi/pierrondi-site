'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Payment, Project, Client, PaymentStatus, Currency } from '@/lib/crm/types'

const STATUS_OPTIONS: PaymentStatus[] = ['pending', 'partial', 'received', 'overdue']
const CURRENCY_OPTIONS: Currency[] = ['BRL', 'USD', 'EUR']
const STATUS_LABELS: Record<string, string> = { pending: 'Pendente', partial: 'Parcial', received: 'Recebido', overdue: 'Vencido' }
const STATUS_COLORS: Record<string, string> = { received: '#16c456', pending: '#f2c82e', partial: '#55b8d9', overdue: '#ff4756' }

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

type FormData = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = { projectId: '', description: '', amount: 0, currency: 'BRL', status: 'pending', dueDate: '', receivedDate: '', notes: '' }

export default function PaymentsView({ initialPayments, projects, clients }: {
  initialPayments: Payment[]
  projects: Project[]
  clients: Client[]
}) {
  const [payments, setPayments] = useState(initialPayments)
  const [editing, setEditing] = useState<Payment | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  const totalReceived = payments.filter((p) => p.status === 'received').reduce((s, p) => s + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === 'pending' || p.status === 'partial').reduce((s, p) => s + p.amount, 0)

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/payments/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const updated: Payment = await res.json()
      setPayments((p) => p.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/payments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const created: Payment = await res.json()
      setPayments((p) => [...p, created])
      setCreating(false)
    }
    setForm(EMPTY)
  }

  async function remove(id: string) {
    if (!confirm('Excluir pagamento?')) return
    await fetch(`/api/crm/payments/${id}`, { method: 'DELETE' })
    setPayments((p) => p.filter((x) => x.id !== id))
  }

  function startEdit(p: Payment) {
    setEditing(p); setCreating(false)
    setForm({ projectId: p.projectId, description: p.description, amount: p.amount, currency: p.currency, status: p.status, dueDate: p.dueDate, receivedDate: p.receivedDate, notes: p.notes })
  }

  return (
    <div>
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Pagamentos</h1>
          <p className="crm-page-sub">{payments.length} pagamento(s)</p>
        </div>
        <button className="crm-btn-primary" onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }}>
          <Plus size={15} /> Novo pagamento
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div className="crm-stat" style={{ flex: 1 }}>
          <p className="crm-stat-label">Total recebido</p>
          <p className="crm-stat-value" style={{ color: 'var(--color-success)', fontSize: 20 }}>{fmt(totalReceived)}</p>
        </div>
        <div className="crm-stat" style={{ flex: 1 }}>
          <p className="crm-stat-label">A receber</p>
          <p className="crm-stat-value" style={{ color: 'var(--color-warning)', fontSize: 20 }}>{fmt(totalPending)}</p>
        </div>
      </div>

      {(creating || editing) && (
        <div className="crm-form-card">
          <p className="crm-form-title">{editing ? 'Editar pagamento' : 'Novo pagamento'}</p>
          <div className="crm-form-grid">
            <div className="crm-field">
              <label>Projeto</label>
              <select value={form.projectId} onChange={(e) => setForm((f) => ({ ...f, projectId: e.target.value }))}>
                <option value="">— sem projeto —</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div className="crm-field" style={{ gridColumn: 'span 2' }}>
              <label>Descrição *</label>
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Valor</label>
              <input type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))} />
            </div>
            <div className="crm-field">
              <label>Moeda</label>
              <select value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as Currency }))}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as PaymentStatus }))}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Vencimento</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
            </div>
            <div className="crm-field">
              <label>Recebido em</label>
              <input type="date" value={form.receivedDate} onChange={(e) => setForm((f) => ({ ...f, receivedDate: e.target.value }))} />
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
        {payments.length === 0 ? (
          <div className="crm-empty">
            <p className="crm-empty-text">Nenhum pagamento registrado.</p>
          </div>
        ) : payments.map((p) => {
          const proj = projectMap[p.projectId]
          const client = proj ? clientMap[proj.clientId] : undefined
          return (
            <div key={p.id} className="crm-row">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>{fmt(p.amount, p.currency)}</p>
                  <Badge status={p.status} />
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-ink)', marginTop: 4 }}>{p.description}</p>
                <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                  {proj ? proj.title : '—'}
                  {client ? ` · ${client.name}` : ''}
                  {p.dueDate ? ` · Vence: ${p.dueDate}` : ''}
                  {p.receivedDate ? ` · Recebido: ${p.receivedDate}` : ''}
                </p>
                {p.notes && <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4, fontStyle: 'italic' }}>{p.notes}</p>}
              </div>
              <div className="crm-row-actions">
                <button className="crm-btn-icon" onClick={() => startEdit(p)}><Pencil size={14} /></button>
                <button className="crm-btn-icon crm-btn-icon-danger" onClick={() => remove(p.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
