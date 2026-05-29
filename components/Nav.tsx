'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'Paulo', href: '/paulo' },
]

const CTA_HREF = '/#contact'

export interface NavProps {
  lang?: string
}

export default function Nav({ lang: _lang = 'pt' }: NavProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
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

  function closeMenu(restoreFocus = false) {
    setMenuOpen(false)
    if (restoreFocus) {
      requestAnimationFrame(() => hamburgerRef.current?.focus())
    }
  }

  function handleOverlayKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      closeMenu(true)
      return
    }

    if (e.key !== 'Tab') return

    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    if (!focusable?.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
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
            ref={hamburgerRef}
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
        aria-hidden={!menuOpen}
        aria-label="Menu de navegação"
        onKeyDown={handleOverlayKeyDown}
      >
        <button
          type="button"
          className={styles.overlayClose}
          onClick={() => closeMenu(true)}
          aria-label="Fechar menu"
        >
          <X size={24} aria-hidden="true" />
        </button>
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.overlayLink}
            onClick={() => closeMenu(isActive(item.href))}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
        <div className={styles.overlayCta}>
          <Link href={CTA_HREF} onClick={() => closeMenu(false)}>
            Diagnóstico gratuito
          </Link>
        </div>
      </div>
    </>
  )
}
