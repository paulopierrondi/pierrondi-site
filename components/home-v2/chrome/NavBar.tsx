'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { Lang, NavCopy, SectionId } from '../types'
import styles from './NavBar.module.css'

interface NavBarProps {
  lang: Lang
  nav: NavCopy
  activeSection: SectionId
  onNavigate: (target: SectionId) => void
  langHrefs: { pt: string; en: string }
}

export default function NavBar({ lang, nav, activeSection, onNavigate, langHrefs }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleNavigate = (event: React.MouseEvent, target: SectionId) => {
    event.preventDefault()
    setMenuOpen(false)
    onNavigate(target)
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a
        href="#hero"
        className={styles.logo}
        onClick={(event) => handleNavigate(event, 'hero')}
        aria-label={lang === 'pt' ? 'pierrondi.dev — início' : 'pierrondi.dev — home'}
      >
        <span className={styles.bracket}>&lt;</span>
        <span className={styles.logoName}>pierrondi.dev</span>
        <span className={styles.bracket}>/&gt;</span>
      </a>

      <nav className={styles.links} aria-label={lang === 'pt' ? 'Seções' : 'Sections'}>
        {nav.links.map((link) => (
          <a
            key={link.target}
            href={`#${link.target}`}
            className={`${styles.link} ${activeSection === link.target ? styles.linkActive : ''}`}
            onClick={(event) => handleNavigate(event, link.target)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.right}>
        <div className={styles.langToggle}>
          <a
            href={langHrefs.pt}
            className={lang === 'pt' ? styles.langActive : styles.langIdle}
            aria-current={lang === 'pt' ? 'true' : undefined}
            aria-label="Português"
          >
            PT
          </a>
          <a
            href={langHrefs.en}
            className={lang === 'en' ? styles.langActive : styles.langIdle}
            aria-current={lang === 'en' ? 'true' : undefined}
            aria-label="English"
          >
            EN
          </a>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-label={lang === 'pt' ? 'Abrir menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label={lang === 'pt' ? 'Menu' : 'Menu'}>
          {nav.links.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className={`${styles.mobileLink} ${activeSection === link.target ? styles.mobileLinkActive : ''}`}
              onClick={(event) => handleNavigate(event, link.target)}
            >
              <span className={styles.mobilePrompt} aria-hidden="true">
                $
              </span>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
