'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  DollarSign,
  CheckSquare,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const NAV = [
  { href: '/crm', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm/clientes', label: 'Clientes', icon: Users },
  { href: '/crm/projetos', label: 'Projetos', icon: FolderKanban },
  { href: '/crm/contratos', label: 'Contratos', icon: FileText },
  { href: '/crm/pagamentos', label: 'Pagamentos', icon: DollarSign },
  { href: '/crm/atividades', label: 'Atividades', icon: CheckSquare },
]

export default function CRMShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/crm/auth', { method: 'DELETE' })
    router.push('/crm/login')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--color-canvas)',
        display: 'flex',
        fontFamily: 'var(--font-body, sans-serif)',
      }}
    >
      {/* Mobile overlay */}
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-hairline)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          zIndex: 20,
          transition: 'transform 0.2s',
        }}
        className={open ? '' : 'crm-sidebar'}
      >
        <div
          style={{
            padding: '20px 16px 12px',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
            }}
          >
            Studio CRM
          </span>
        </div>

        <nav style={{ flex: 1, padding: '8px 8px', overflowY: 'auto' }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/crm' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 8,
                  marginBottom: 2,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--color-primary)' : 'var(--color-body)',
                  background: active ? 'rgba(200, 255, 46, 0.08)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                <Icon size={16} strokeWidth={1.8} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--color-hairline)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '9px 12px',
              borderRadius: 8,
              fontSize: 14,
              color: 'var(--color-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} strokeWidth={1.8} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar (mobile) */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            borderBottom: '1px solid var(--color-hairline)',
            background: 'var(--color-surface)',
          }}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            style={{ background: 'none', border: 'none', color: 'var(--color-body)', cursor: 'pointer' }}
            className="crm-menu-btn"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>pierrondi.dev / studio</span>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>{children}</main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .crm-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .crm-sidebar {
            position: fixed !important;
            top: 0; left: 0; bottom: 0;
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
