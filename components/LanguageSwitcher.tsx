'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentLanguage, resolveLocalizedPath, siteLanguages } from '@/lib/i18n/site-language'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const pathname = usePathname() || '/'
  const currentLanguage = getCurrentLanguage(pathname)
  const hasTopNav = pathname === '/' || pathname === '/en' || pathname === '/about' || pathname === '/en/about'

  useEffect(() => {
    document.documentElement.lang = currentLanguage === 'en' ? 'en-US' : 'pt-BR'
  }, [currentLanguage])

  return (
    <nav
      className={`${styles.switcher}${hasTopNav ? ` ${styles.withTopNav}` : ''}`}
      aria-label="Language selector"
    >
      {siteLanguages.map((language) => {
        const isActive = language.code === currentLanguage

        return (
          <Link
            key={language.code}
            href={resolveLocalizedPath(pathname, language.code)}
            hrefLang={language.locale}
            aria-current={isActive ? 'page' : undefined}
            className={isActive ? styles.active : undefined}
          >
            {language.label}
          </Link>
        )
      })}
    </nav>
  )
}
