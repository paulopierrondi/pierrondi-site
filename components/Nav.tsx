'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './Nav.module.css'

// Static nav links per design spec (AGE-1454)
const NAV_LINKS = [
  { label: 'Automações', href: '/automacoes' },
  { label: 'Produto Digital', href: '/produto-digital' },
  { label: 'Tech Partner', href: '/tech-partner' },
  { label: 'Preços', href: '/precos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Studio', href: '/studio' },
]

const CTA_HREF = '/#contato'

export interface NavProps {
  lang?: string
}

export default function Nav({ lang: _lang = 'pt' }: NavProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when mobile menu is open — save/restore previous value
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // Move focus to the first link in the overlay when it opens
  useEffect(() => {
    if (menuOpen) {
      overlayRef.current?.querySelector('a')?.focus()
    }
  }, [menuOpen])

  function isActive(href: string) {
    if (href.includes('#')) return pathname === '/'
    if (href === '/blog') return pathname.startsWith('/blog')
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <nav className={styles.root} role="navigation" aria-label="Navegação principal">
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="pierrondi.dev — página inicial">
          pierrondi.dev
        </Link>

        {/* Desktop nav links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.link}${isActive(item.href) ? ` ${styles.linkActive}` : ''}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + mobile hamburger */}
        <div className={styles.right}>
          {/* Desktop CTA */}
          <div className={styles.ctaWrap}>
            <Link href={CTA_HREF}>
              Diagnóstico gratuito
            </Link>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
          >
            <span
              className={styles.bar}
              style={{
                transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
              }}
            />
            <span
              className={styles.bar}
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className={styles.bar}
              style={{
                transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        className={`${styles.overlay}${menuOpen ? ` ${styles.overlayOpen}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false) }}
      >
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.overlayLink}
            onClick={() => setMenuOpen(false)}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
        <div className={styles.overlayCta}>
          <Link href={CTA_HREF} onClick={() => setMenuOpen(false)}>
            Diagnóstico gratuito
          </Link>
        </div>
      </div>
    </>
  )
}
