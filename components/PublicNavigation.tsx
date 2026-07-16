'use client'

import { useEffect, useState, type MouseEventHandler } from 'react'
import Link from 'next/link'
import type { HomeLang } from '@/lib/i18n/site-language'
import { PUBLIC_NAV_COPY, type PublicNavLink } from '@/components/public-navigation'
import styles from './SiteNav.module.css'

export interface RenderedPublicNavLink extends PublicNavLink {
  active?: boolean
  activeCurrent?: 'page' | 'location'
  onSelect?: MouseEventHandler<HTMLAnchorElement>
}

interface PublicNavigationProps {
  lang: HomeLang
  homeHref: string
  links: RenderedPublicNavLink[]
  onHomeSelect?: MouseEventHandler<HTMLAnchorElement>
}

export default function PublicNavigation({ lang, homeHref, links, onHomeSelect }: PublicNavigationProps) {
  const copy = PUBLIC_NAV_COPY[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1081px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      data-public-navigation
      data-accent="copper"
    >
      <Link
        href={homeHref}
        className={styles.brand}
        aria-label={copy.logoAria}
        onClick={(event) => {
          setMenuOpen(false)
          onHomeSelect?.(event)
        }}
      >
        <span className={styles.brandBracket}>&lt;</span>
        <span className={styles.brandName}>pierrondi.dev</span>
        <span className={styles.brandBracket}>/&gt;</span>
      </Link>

      <nav
        id="site-nav-links"
        className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
        aria-label={copy.aria}
        data-public-nav-links
      >
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={link.active ? styles.active : ''}
            aria-current={link.active ? (link.activeCurrent ?? 'page') : undefined}
            data-public-nav-key={link.key}
            onClick={(event) => {
              if (menuOpen && link.onSelect) {
                event.preventDefault()
                setMenuOpen(false)
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => link.onSelect?.(event))
                })
                return
              }

              setMenuOpen(false)
              link.onSelect?.(event)
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.navRight}>
        <button
          type="button"
          className={`${styles.navBurger} ${menuOpen ? styles.open : ''}`}
          aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="site-nav-links"
          data-public-nav-burger
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
