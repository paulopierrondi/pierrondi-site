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
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: `${STATUS_COLORS[status] ?? '#888'}22`, color: STATUS_COLORS[status] ?? '#888', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

type FormData = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = { projectId: '', description: '', amount: 0, currency: 'BRL', status: 'pending', dueDate: '', receivedDate: '', notes: '' }

interface Props { initialPayments: Payment[]; projects: Project[]; clients: Client[] }

export default function PaymentsView({ initialPayments, projects, clients }: Props) {
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
      const res = await fetch(`/api/crm/payments/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const updated: Payment = await res.json()
      setPayments((p) => p.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Pagamentos</h1>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>{payments.length} pagamento(s)</p>
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }} style={btnPrimary}>
          <Plus size={15} /> Novo pagamento
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={statBox}>
          <p style={statLabel}>Total recebido</p>
          <p style={{ ...statValue, color: 'var(--color-success)' }}>{fmt(totalReceived)}</p>
        </div>
        <div style={statBox}>
          <p style={statLabel}>A receber</p>
          <p style={{ ...statValue, color: 'var(--color-warning)' }}>{fmt(totalPending)}</p>
        </div>
      </div>

      {(creating || editing) && (
        <div style={formCard}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
            {editing ? 'Editar pagamento' : 'Novo pagamento'}
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
              <label style={labelStyle}>Descrição *</label>
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Valor</label>
              <input type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Moeda</label>
              <select value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as Currency }))} style={inputStyle}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as PaymentStatus }))} style={inputStyle}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Vencimento</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Recebido em</label>
              <input type="date" value={form.receivedDate} onChange={(e) => setForm((f) => ({ ...f, receivedDate: e.target.value }))} style={inputStyle} />
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
        {payments.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--color-muted)' }}>Nenhum pagamento.</p>
        ) : (
          payments.map((p) => {
            const proj = projectMap[p.projectId]
            const client = proj ? clientMap[proj.clientId] : undefined
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: 12, padding: '16px 20px' }}>
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
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(p)} style={btnIcon}><Pencil size={14} /></button>
                  <button onClick={() => remove(p.id)} style={btnIconDanger}><Trash2 size={14} /></button>
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
const statBox: React.CSSProperties = { background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: 10, padding: '14px 20px' }
const statLabel: React.CSSProperties = { fontSize: 11, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }
const statValue: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: 0 }
