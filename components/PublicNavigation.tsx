'use client'

import { useEffect, useRef, useState, type MouseEventHandler } from 'react'
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

// Keyboard focus must survive the panel closing: without this, Escape or
// selecting a section link drops focus to <body> / a hidden link.
function useReturnFocusOnClose(
  menuOpen: boolean,
  burgerRef: React.RefObject<HTMLButtonElement | null>,
  navPanelRef: React.RefObject<HTMLElement | null>,
) {
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true
      return
    }
    if (!wasOpenRef.current) return
    wasOpenRef.current = false
    const burger = burgerRef.current
    const active = document.activeElement
    const focusLost =
      active === null ||
      active === document.body ||
      Boolean(navPanelRef.current?.contains(active))
    if (burger && burger.offsetParent !== null && focusLost) burger.focus()
  }, [menuOpen, burgerRef, navPanelRef])
}

export default function PublicNavigation({ lang, homeHref, links, onHomeSelect }: PublicNavigationProps) {
  const copy = PUBLIC_NAV_COPY[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const navPanelRef = useRef<HTMLElement>(null)
  useReturnFocusOnClose(menuOpen, burgerRef, navPanelRef)

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
        ref={navPanelRef}
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
          ref={burgerRef}
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
