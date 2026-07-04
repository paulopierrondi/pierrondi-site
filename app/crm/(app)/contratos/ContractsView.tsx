'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Contract, Project, Client, ContractStatus, Currency } from '@/lib/crm/types'

const STATUS_OPTIONS: ContractStatus[] = ['draft', 'sent', 'signed', 'cancelled']
const CURRENCY_OPTIONS: Currency[] = ['BRL', 'USD', 'EUR']
const STATUS_LABELS: Record<string, string> = { draft: 'Rascunho', sent: 'Enviado', signed: 'Assinado', cancelled: 'Cancelado' }
const STATUS_COLORS: Record<string, string> = { draft: '#888', sent: '#55b8d9', signed: '#16c456', cancelled: '#ff4756' }

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

type FormData = Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = { projectId: '', title: '', value: 0, currency: 'BRL', status: 'draft', signedDate: '', notes: '' }

interface Props { initialContracts: Contract[]; projects: Project[]; clients: Client[] }

export default function ContractsView({ initialContracts, projects, clients }: Props) {
  const [contracts, setContracts] = useState(initialContracts)
  const [editing, setEditing] = useState<Contract | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/contracts/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const updated: Contract = await res.json()
      setContracts((c) => c.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/contracts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const created: Contract = await res.json()
      setContracts((c) => [...c, created])
      setCreating(false)
    }
    setForm(EMPTY)
  }

  async function remove(id: string) {
    if (!confirm('Excluir contrato?')) return
    await fetch(`/api/crm/contracts/${id}`, { method: 'DELETE' })
    setContracts((c) => c.filter((x) => x.id !== id))
  }

  function startEdit(c: Contract) {
    setEditing(c); setCreating(false)
    setForm({ projectId: c.projectId, title: c.title, value: c.value, currency: c.currency, status: c.status, signedDate: c.signedDate, notes: c.notes })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Contratos</h1>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>{contracts.length} contrato(s)</p>
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }} style={btnPrimary}>
          <Plus size={15} /> Novo contrato
        </button>
      </div>

      {(creating || editing) && (
        <div style={formCard}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>{editing ? 'Editar contrato' : 'Novo contrato'}</p>
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
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ContractStatus }))} style={inputStyle}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Assinado em</label>
              <input type="date" value={form.signedDate} onChange={(e) => setForm((f) => ({ ...f, signedDate: e.target.value }))} style={inputStyle} />
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
        {contracts.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--color-muted)' }}>Nenhum contrato.</p>
        ) : (
          contracts.map((c) => {
            const proj = projectMap[c.projectId]
            const client = proj ? clientMap[proj.clientId] : undefined
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{c.title}</p>
                    <Badge status={c.status} />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 700, marginTop: 4 }}>{fmt(c.value, c.currency)}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                    {proj ? proj.title : '—'}
                    {client ? ` · ${client.name}` : ''}
                    {c.signedDate ? ` · Assinado: ${c.signedDate}` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(c)} style={btnIcon}><Pencil size={14} /></button>
                  <button onClick={() => remove(c.id)} style={btnIconDanger}><Trash2 size={14} /></button>
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
