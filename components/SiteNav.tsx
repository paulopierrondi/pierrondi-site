'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid } from 'lucide-react'
import { getCurrentLanguage, type HomeLang } from '@/lib/i18n/site-language'
import SiteLogo from './SiteLogo'
import styles from './SiteNav.module.css'

const navCopy: Record<HomeLang, {
  aria: string
  logoAria: string
  homeHref: string
  cta: string
  menuOpen: string
  menuClose: string
  links: Array<{ label: string; href: string }>
}> = {
  pt: {
    aria: 'Navegação principal',
    logoAria: 'Pierrondi.dev — página inicial',
    homeHref: '/',
    cta: 'Conectar',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    links: [
      { label: 'Bio', href: '/about' },
      { label: 'Atuação', href: '/atuacao' },
      { label: 'Feitos', href: '/feitos' },
      { label: 'Ideias', href: '/blog' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  en: {
    aria: 'Main navigation',
    logoAria: 'Pierrondi.dev — home',
    homeHref: '/en',
    cta: 'Connect',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    links: [
      { label: 'About', href: '/en/about' },
      { label: 'Work', href: '/en/atuacao' },
      { label: 'Proof', href: '/en/feitos' },
      { label: 'Ideas', href: '/en/blog' },
      { label: 'Contact', href: '/en/contato' },
    ],
  },
}

export default function SiteNav() {
  const pathname = usePathname() || '/'
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

  useEffect(() => {
    if (!menuOpen) return undefined

    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [menuOpen, pathname])

  const isActive = (href: string) => {
    if (href === '/' || href === '/en') return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      data-accent="lime"
    >
      <Link href={copy.homeHref} className={styles.brand} aria-label={copy.logoAria}>
        <SiteLogo size={30} />
        <span className={styles.brandName}>
          Pierrondi<span className={styles.brandDot}>.</span>
        </span>
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
        <Link href="/crm" className={styles.navAppBtn} title="Studio CRM" aria-label="Studio CRM">
          <LayoutGrid size={15} strokeWidth={1.8} />
        </Link>
        <a
          href="https://br.linkedin.com/in/paulopierrondi"
          target="_blank"
          rel="noreferrer"
          className={styles.navCta}
        >
          {copy.cta} <span aria-hidden="true">↗</span>
        </a>
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
