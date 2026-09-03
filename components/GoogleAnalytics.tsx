'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function pagePath(pathname: string) {
  if (typeof window === 'undefined') return pathname
  const query = window.location.search.replace(/^\?/, '')
  return query ? `${pathname}?${query}` : pathname
}

function grantAnalytics(measurementId: string, pathname: string) {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  window.gtag('config', measurementId, {
    page_path: pagePath(pathname),
    anonymize_ip: true,
  })
}

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId) return
    const id = measurementId

    function syncConsent() {
      if (localStorage.getItem('cookie-consent') === 'all') {
        grantAnalytics(id, pathname)
      }
    }

    syncConsent()
    window.addEventListener('cookie-consent-granted', syncConsent)
    return () => window.removeEventListener('cookie-consent-granted', syncConsent)
  }, [measurementId, pathname])

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== 'function') return
    window.gtag('config', measurementId, {
      page_path: pagePath(pathname),
      anonymize_ip: true,
    })
  }, [measurementId, pathname])

  return null
}
