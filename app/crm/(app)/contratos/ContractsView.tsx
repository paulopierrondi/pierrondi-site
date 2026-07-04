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
  const clr = STATUS_COLORS[status] ?? '#888'
  return (
    <span className="crm-badge" style={{ background: `${clr}20`, color: clr }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

type FormData = Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>
const EMPTY: FormData = { projectId: '', title: '', value: 0, currency: 'BRL', status: 'draft', signedDate: '', notes: '' }

export default function ContractsView({ initialContracts, projects, clients }: {
  initialContracts: Contract[]
  projects: Project[]
  clients: Client[]
}) {
  const [contracts, setContracts] = useState(initialContracts)
  const [editing, setEditing] = useState<Contract | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  async function save() {
    if (editing) {
      const res = await fetch(`/api/crm/contracts/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const updated: Contract = await res.json()
      setContracts((c) => c.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const res = await fetch('/api/crm/contracts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
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
      <div className="crm-page-header">
        <div>
          <h1 className="crm-page-title">Contratos</h1>
          <p className="crm-page-sub">{contracts.length} contrato(s)</p>
        </div>
        <button className="crm-btn-primary" onClick={() => { setCreating(true); setEditing(null); setForm(EMPTY) }}>
          <Plus size={15} /> Novo contrato
        </button>
      </div>

      {(creating || editing) && (
        <div className="crm-form-card">
          <p className="crm-form-title">{editing ? 'Editar contrato' : 'Novo contrato'}</p>
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
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ContractStatus }))}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div className="crm-field">
              <label>Assinado em</label>
              <input type="date" value={form.signedDate} onChange={(e) => setForm((f) => ({ ...f, signedDate: e.target.value }))} />
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
        {contracts.length === 0 ? (
          <div className="crm-empty">
            <p className="crm-empty-text">Nenhum contrato. Adicione o primeiro contrato acima.</p>
          </div>
        ) : contracts.map((c) => {
          const proj = projectMap[c.projectId]
          const client = proj ? clientMap[proj.clientId] : undefined
          return (
            <div key={c.id} className="crm-row">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>{c.title}</p>
                  <Badge status={c.status} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary)', marginTop: 4 }}>{fmt(c.value, c.currency)}</p>
                <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                  {proj ? proj.title : '—'}
                  {client ? ` · ${client.name}` : ''}
                  {c.signedDate ? ` · Assinado: ${c.signedDate}` : ''}
                </p>
              </div>
              <div className="crm-row-actions">
                <button className="crm-btn-icon" onClick={() => startEdit(c)}><Pencil size={14} /></button>
                <button className="crm-btn-icon crm-btn-icon-danger" onClick={() => remove(c.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
