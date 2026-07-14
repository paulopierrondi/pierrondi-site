'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCurrentLanguage, type HomeLang } from '@/lib/i18n/site-language'
import { usesHomeChrome, usesOwnAppChrome } from '@/components/home-v2/immersive-routes'
import styles from './SiteNav.module.css'

const navCopy: Record<HomeLang, {
  aria: string
  logoAria: string
  homeHref: string
  menuOpen: string
  menuClose: string
  links: Array<{ label: string; href: string }>
}> = {
  pt: {
    aria: 'Navegação principal',
    logoAria: 'Pierrondi.dev — página inicial',
    homeHref: '/',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    links: [
      { label: 'Bio', href: '/about' },
      { label: 'Atuação', href: '/atuacao' },
      { label: 'Studio', href: '/studio' },
      { label: 'Portfólio', href: '/portfolio' },
      { label: 'Feitos', href: '/feitos' },
      { label: 'Ideias', href: '/blog' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  en: {
    aria: 'Main navigation',
    logoAria: 'Pierrondi.dev — home',
    homeHref: '/en',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    links: [
      { label: 'About', href: '/en/about' },
      { label: 'Work', href: '/en/atuacao' },
      { label: 'Studio', href: '/en/studio' },
      { label: 'Portfolio', href: '/en/portfolio' },
      { label: 'Proof', href: '/en/feitos' },
      { label: 'Ideas', href: '/en/blog' },
      { label: 'Contact', href: '/en/contato' },
    ],
  },
}

export default function SiteNav() {
  const pathname = usePathname() || '/'
  const ownsHomeChrome = usesHomeChrome(pathname)
  const lang = getCurrentLanguage(pathname)
  const copy = navCopy[lang]
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

  const isActive = (href: string) => {
    if (href === '/' || href === '/en') return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  if (ownsHomeChrome || usesOwnAppChrome(pathname)) return null

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      data-accent="lime"
    >
      <Link href={copy.homeHref} className={styles.brand} aria-label={copy.logoAria}>
        <span className={styles.brandBracket}>&lt;</span>
        <span className={styles.brandName}>pierrondi.dev</span>
        <span className={styles.brandBracket}>/&gt;</span>
      </Link>

      <nav
        id="site-nav-links"
        className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
        aria-label={copy.aria}
      >
        {copy.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? styles.active : ''}
            aria-current={isActive(link.href) ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.navRight}>
        <button
          className={`${styles.navBurger} ${menuOpen ? styles.open : ''}`}
          aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="site-nav-links"
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
