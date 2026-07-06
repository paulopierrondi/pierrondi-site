'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!measurementId) return

    function syncConsent() {
      setEnabled(localStorage.getItem('cookie-consent') === 'all')
    }

    syncConsent()
    window.addEventListener('cookie-consent-granted', syncConsent)
    return () => window.removeEventListener('cookie-consent-granted', syncConsent)
  }, [measurementId])

  useEffect(() => {
    if (!enabled || !measurementId || typeof window.gtag !== 'function') return

    const query = window.location.search.replace(/^\?/, '')
    const pagePath = query ? `${pathname}?${query}` : pathname
    window.gtag('config', measurementId, {
      page_path: pagePath,
      anonymize_ip: true,
    })
  }, [enabled, measurementId, pathname])

  if (!measurementId || !enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', ${JSON.stringify(measurementId)}, { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
