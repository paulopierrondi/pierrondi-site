'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SiteLogo from './SiteLogo'
import styles from './SiteNav.module.css'

const links = [
  { label: 'Bio', href: '/about' },
  { label: 'Atuação', href: '/atuacao' },
  { label: 'Feitos', href: '/feitos' },
  { label: 'Ideias', href: '/blog' },
  { label: 'Contato', href: '/contato' },
]

export default function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      data-accent="lime"
    >
      <Link href="/" className={styles.brand} aria-label="Pierrondi.dev">
        <SiteLogo size={30} />
        <span className={styles.brandName}>
          Pierrondi<span className={styles.brandDot}>.</span>
        </span>
      </Link>

      <nav
        className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
        aria-label="Principal"
      >
        {links.map((link) => (
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
        <a
          href="https://br.linkedin.com/in/paulopierrondi"
          target="_blank"
          rel="noreferrer"
          className={styles.navCta}
        >
          Conectar <span aria-hidden="true">↗</span>
        </a>
        <button
          className={`${styles.navBurger} ${menuOpen ? styles.open : ''}`}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
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
