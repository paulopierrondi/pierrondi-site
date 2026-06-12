'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import BrandSignature from './BrandSignature'
import styles from './Nav.module.css'

const NAV_COPY = {
  pt: {
    aria: 'Navegação principal',
    logoAria: 'pierrondi.dev — página inicial',
    home: 'Início',
    about: 'Sobre',
    paulo: 'Paulo',
    proof: 'Provas',
    cta: 'Contato executivo',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
  },
  en: {
    aria: 'Main navigation',
    logoAria: 'pierrondi.dev — home',
    home: 'Home',
    about: 'About',
    paulo: 'Paulo',
    proof: 'Proof',
    cta: 'Executive contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
} as const

export interface NavProps {
  lang?: keyof typeof NAV_COPY
}

export default function Nav({ lang = 'pt' }: NavProps) {
  const copy = NAV_COPY[lang] ?? NAV_COPY.pt
  const navLinks = [
    { label: copy.home, href: lang === 'en' ? '/en' : '/' },
    { label: copy.about, href: lang === 'en' ? '/en/about' : '/about' },
    { label: copy.paulo, href: '/paulo' },
    { label: copy.proof, href: '/feitos/sada-servicenow' },
  ]
  const ctaHref = lang === 'en' ? '/en#contact' : '/#contact'
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

  useEffect(() => {
    if (menuOpen) {
      overlayRef.current?.querySelector('a')?.focus()
    }
  }, [menuOpen])

  function isActive(href: string) {
    if (href.includes('#')) return pathname === '/' || pathname === '/en'
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
      <nav className={styles.root} role="navigation" aria-label={copy.aria}>
        <BrandSignature href={lang === 'en' ? '/en' : '/'} ariaLabel={copy.logoAria} className={styles.logo} />

        <ul className={styles.links} role="list">
          {navLinks.map((item) => (
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

        <div className={styles.right}>
          <div className={styles.ctaWrap}>
            <Link href={ctaHref}>
              {copy.cta}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={hamburgerRef}
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        className={`${styles.overlay}${menuOpen ? ` ${styles.overlayOpen}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        aria-label={copy.menuOpen}
        onKeyDown={handleOverlayKeyDown}
      >
        <button
          type="button"
          className={styles.overlayClose}
          onClick={() => closeMenu(true)}
          aria-label={copy.menuClose}
        >
          <X size={24} aria-hidden="true" />
        </button>
        {navLinks.map((item) => (
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
          <Link href={ctaHref} onClick={() => closeMenu(false)}>
            {copy.cta}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  )
}
