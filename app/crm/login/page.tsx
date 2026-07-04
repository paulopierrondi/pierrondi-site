'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight } from 'lucide-react'
import '../crm.css'

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
        setError('Senha incorreta.')
        setToken('')
      }
    } catch {
      setError('Erro de rede. Tente novamente.')
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
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(200,255,46,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          padding: '0 20px',
        }}
      >
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(200,255,46,0.1)',
              border: '1px solid rgba(200,255,46,0.2)',
              marginBottom: 16,
            }}
          >
            <Lock size={20} color="var(--color-primary)" strokeWidth={1.8} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: 4,
            }}
          >
            pierrondi.dev
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              margin: 0,
            }}
          >
            Studio CRM
          </h1>
          <p style={{ fontSize: 14, color: 'var(--color-muted)', marginTop: 6 }}>
            Acesso restrito
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-hairline-strong)',
            borderRadius: 16,
            padding: '28px 28px',
            boxShadow: 'var(--shadow-product)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  marginBottom: 8,
                }}
              >
                Senha de acesso
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="••••••••"
                autoFocus
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-hairline-strong)'}`,
                  background: 'var(--color-surface-3)',
                  color: 'var(--color-ink)',
                  fontSize: 15,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.12s',
                  letterSpacing: '0.1em',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(200,255,46,0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? 'var(--color-error)' : 'var(--color-hairline-strong)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--color-error)',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !token}
              style={{
                width: '100%',
                padding: '12px 0',
                borderRadius: 10,
                background: loading || !token ? 'rgba(200,255,46,0.4)' : 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: loading || !token ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontFamily: 'var(--font-body)',
                transition: 'background 0.12s',
              }}
            >
              {loading ? 'Entrando…' : <>Entrar <ArrowRight size={15} /></>}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--color-muted)',
            marginTop: 20,
          }}
        >
          Acesso exclusivo pierrondi@gmail.com
        </p>
      </div>
    </div>
  )
}
