'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CRMLoginPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/crm/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        router.push('/crm')
        router.refresh()
      } else {
        setError('Token inválido.')
      }
    } catch {
      setError('Erro de rede.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--color-canvas)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-body, sans-serif)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          padding: 32,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 16,
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 8 }}>
            Studio CRM
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>Acesso</h1>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 6 }}>Token de administrador</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token"
            autoFocus
            required
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 8,
              border: '1px solid var(--color-hairline-strong)',
              background: 'var(--color-surface-2)',
              color: 'var(--color-ink)',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: 16,
            }}
          />
          {error && (
            <p style={{ fontSize: 13, color: 'var(--color-error)', marginBottom: 12 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px 0',
              borderRadius: 8,
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              fontWeight: 700,
              fontSize: 14,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
