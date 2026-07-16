'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getCurrentLanguage } from '@/lib/i18n/site-language'
import { isImmersiveHomeRoute, usesOwnAppChrome } from '@/components/home-v2/immersive-routes'
import styles from './CookieBanner.module.css'

const copy = {
  pt: {
    aria: 'Consentimento de cookies',
    text: 'Usamos cookies para melhorar sua experiência e medir performance.',
    link: 'Política de Privacidade',
    linkHref: '/privacidade',
    essential: 'Apenas essenciais',
    accept: 'Aceitar todos',
  },
  en: {
    aria: 'Cookie consent',
    text: 'We use cookies to improve your experience and measure performance.',
    link: 'Privacy Policy',
    linkHref: '/privacy',
    essential: 'Essential only',
    accept: 'Accept all',
  },
} as const

export default function CookieBanner() {
  const pathname = usePathname()
  const lang = getCurrentLanguage(pathname || '/')
  const t = copy[lang]
  const [visible, setVisible] = useState(false)
  const suppressed =
    isImmersiveHomeRoute(pathname || '/') ||
    usesOwnAppChrome(pathname || '/') ||
    pathname === '/paulo' ||
    pathname === '/whypaulo' ||
    pathname?.startsWith('/apps') ||
    pathname?.startsWith('/studio/') ||
    pathname?.startsWith('/bradesco-26')

  useEffect(() => {
    if (suppressed) return
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [suppressed])

  function accept(level: 'all' | 'essential') {
    localStorage.setItem('cookie-consent', level)
    setVisible(false)
    if (level === 'all') {
      window.dispatchEvent(new Event('cookie-consent-granted'))
    }
  }

  if (!visible || suppressed) return null

  return (
    <div className={styles.banner} role="dialog" aria-label={t.aria}>
        <p className={styles.text}>
          {t.text} <a href={t.linkHref}>{t.link}</a>.
        </p>
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.essential}`} onClick={() => accept('essential')}>
            {t.essential}
          </button>
          <button className={`${styles.button} ${styles.accept}`} onClick={() => accept('all')}>
            {t.accept}
          </button>
        </div>
      </div>
  )
}
