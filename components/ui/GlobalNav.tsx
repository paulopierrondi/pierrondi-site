'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './GlobalNav.module.css'

export interface GlobalNavLink {
  label: string
  href: string
  active?: boolean
}

export interface GlobalNavProps {
  logo: React.ReactNode
  links?: GlobalNavLink[]
  actions?: React.ReactNode
  mobileMenuContent?: React.ReactNode
  className?: string
}

function useCloseMenuOnDesktop(setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 835px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [setMenuOpen])
}

export function GlobalNav({
  logo,
  links,
  actions,
  mobileMenuContent,
  className,
}: GlobalNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      overlayRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    }
  }, [menuOpen])

  useCloseMenuOnDesktop(setMenuOpen)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const hasMenu = Boolean(mobileMenuContent ?? (links && links.length > 0))

  return (
    <>
      <nav
        className={[styles.root, className].filter(Boolean).join(' ')}
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className={styles.logo}>{logo}</div>

        {links && links.length > 0 && (
          <ul className={styles.links} role="list">
            {links.map(({ label, href, active }) => (
              <li key={href}>
                <a
                  href={href}
                  className={[styles.link, active ? styles.linkActive : ''].filter(Boolean).join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.right}>
          {actions && <div className={styles.actions}>{actions}</div>}

          {hasMenu && (
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="global-nav-overlay"
            >
              <span
                className={styles.bar}
                style={{
                  transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
                }}
              />
              <span className={styles.bar} style={{ opacity: menuOpen ? 0 : 1 }} />
              <span
                className={styles.bar}
                style={{
                  transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
                }}
              />
            </button>
          )}
        </div>
      </nav>

      {hasMenu && (
        <div
          id="global-nav-overlay"
          ref={overlayRef}
          className={[styles.overlay, menuOpen ? styles.overlayOpen : ''].filter(Boolean).join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          {mobileMenuContent ?? (
            links?.map(({ label, href, active }) => (
              <a
                key={href}
                href={href}
                className={styles.overlayLink}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </a>
            ))
          )}
        </div>
      )}
    </>
  )
}

export default GlobalNav
