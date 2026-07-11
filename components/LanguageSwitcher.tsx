'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  getCurrentLanguage,
  resolveLocalizedPath,
  shouldHideLanguageSwitcher,
  siteLanguages,
} from '@/lib/i18n/site-language'
import { isImmersiveHomeRoute } from '@/components/home-v2/immersive-routes'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const pathname = usePathname() || '/'
  const [locationSuffix, setLocationSuffix] = useState({ search: '', hash: '' })
  const currentLanguage = getCurrentLanguage(pathname)
  const hiddenOnClientRoute = shouldHideLanguageSwitcher(pathname)
  const hiddenOnPrivateOpsRoute =
    pathname === '/control_tower' ||
    pathname.startsWith('/control_tower/') ||
    pathname === '/automacoes' ||
    pathname.startsWith('/automacoes/')
  const hasTopNav = !hiddenOnClientRoute && !hiddenOnPrivateOpsRoute

  useEffect(() => {
    document.documentElement.lang = currentLanguage === 'en' ? 'en-US' : 'pt-BR'
  }, [currentLanguage])

  useEffect(() => {
    const syncLocationSuffix = () => {
      setLocationSuffix({ search: window.location.search, hash: window.location.hash })
    }
    syncLocationSuffix()
    window.addEventListener('hashchange', syncLocationSuffix)
    window.addEventListener('popstate', syncLocationSuffix)
    return () => {
      window.removeEventListener('hashchange', syncLocationSuffix)
      window.removeEventListener('popstate', syncLocationSuffix)
    }
  }, [])

  if (hiddenOnClientRoute || hiddenOnPrivateOpsRoute || isImmersiveHomeRoute(pathname)) return null

  return (
    <nav className={`${styles.switcher} ${hasTopNav ? styles.withTopNav : ''}`} aria-label="Language selector">
      {siteLanguages.map((language) => {
        const isActive = language.code === currentLanguage

        return (
          <Link
            key={language.code}
            href={resolveLocalizedPath(pathname, language.code, locationSuffix.search, locationSuffix.hash)}
            hrefLang={language.locale}
            aria-label={`${language.label} — ${language.name}`}
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
