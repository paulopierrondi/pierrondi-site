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
import '../crm.css'

const NAV = [
  { href: '/crm', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/crm/clientes', label: 'Clientes', icon: Users },
  { href: '/crm/projetos', label: 'Projetos', icon: FolderKanban },
  { href: '/crm/contratos', label: 'Contratos', icon: FileText },
  { href: '/crm/pagamentos', label: 'Pagamentos', icon: DollarSign },
  { href: '/crm/atividades', label: 'Atividades', icon: CheckSquare },
  { href: '/crm/discussoes', label: 'Discussões', icon: MessageSquare },
]

export default function CRMShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/crm/auth', { method: 'DELETE' })
    router.push('/crm/login')
    router.refresh()
  }

  const currentPage = NAV.find((n) =>
    n.exact ? pathname === n.href : pathname.startsWith(n.href)
  )

  return (
    <div className="crm-root">
      {open && <div className="crm-overlay" onClick={() => setOpen(false)} />}

      <aside className={`crm-sidebar${open ? ' open' : ''}`}>
        <div className="crm-sidebar-logo">
          <span className="crm-sidebar-logo-label">pierrondi.dev</span>
          <span className="crm-sidebar-logo-name">Studio CRM</span>
        </div>

        <nav className="crm-nav" aria-label="CRM navigation">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`crm-nav-link${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={15} strokeWidth={1.8} aria-hidden />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="crm-sidebar-footer">
          <button className="crm-logout-btn" onClick={handleLogout} aria-label="Sair">
            <LogOut size={15} strokeWidth={1.8} aria-hidden />
            Sair
          </button>
        </div>
      </aside>

      <div className="crm-main">
        <header className="crm-topbar">
          <button
            className="crm-topbar-btn crm-topbar-menu"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="crm-topbar-breadcrumb">
            studio / {currentPage?.label.toLowerCase() ?? 'crm'}
          </span>
        </header>

        <main className="crm-content">{children}</main>
      </div>
    </div>
  )
}
