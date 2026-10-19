'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type ConsentEventTarget = Pick<Window, 'gtag' | 'addEventListener' | 'removeEventListener'>
type ConsentStorage = Pick<Storage, 'getItem'>

export function subscribeToAnalyticsConsent(target: ConsentEventTarget, storage: ConsentStorage) {
  function syncConsent() {
    if (storage.getItem('cookie-consent') !== 'all' || typeof target.gtag !== 'function') return
    target.gtag('consent', 'update', { analytics_storage: 'granted' })
  }

  syncConsent()
  target.addEventListener('cookie-consent-granted', syncConsent)
  return () => target.removeEventListener('cookie-consent-granted', syncConsent)
}

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  useEffect(() => {
    if (!measurementId) return
    return subscribeToAnalyticsConsent(window, window.localStorage)
  }, [measurementId])

  return null
}
