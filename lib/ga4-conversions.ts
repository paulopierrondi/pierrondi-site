const ENGAGEMENT_PATHS = new Set(['/engajamento', '/en/engajamento'])
const SITE_HOSTS = new Set(['pierrondi.dev', 'www.pierrondi.dev', 'localhost', '127.0.0.1'])

export type Ga4Conversion =
  | { event: 'cta_engajamento_click'; params: { source: string } }
  | { event: 'whatsapp_click'; params: { page: string } }

type Ga4Params = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function normalizePage(page: string): string {
  const raw = page.trim() || '/'
  try {
    const url =
      raw.startsWith('http://') || raw.startsWith('https://')
        ? new URL(raw)
        : new URL(raw.startsWith('/') ? raw : `/${raw}`, 'https://www.pierrondi.dev')
    return url.pathname.replace(/\/+$/, '') || '/'
  } catch {
    return '/'
  }
}

function isAbsoluteHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')
}

/** Classify a clicked href. `page` is the current pathname and becomes `source` or `page`. */
export function classifyConversionClick(href: string, page: string): Ga4Conversion | null {
  const trimmed = href.trim()
  if (
    !trimmed ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('javascript:')
  ) {
    return null
  }

  let url: URL
  try {
    url = new URL(trimmed, 'https://www.pierrondi.dev')
  } catch {
    return null
  }

  const host = url.hostname.toLowerCase()
  if (host === 'wa.me' || host === 'www.wa.me') {
    return { event: 'whatsapp_click', params: { page: normalizePage(page) } }
  }

  const path = url.pathname.replace(/\/+$/, '') || '/'
  if (!ENGAGEMENT_PATHS.has(path)) return null
  if (isAbsoluteHref(trimmed) && !SITE_HOSTS.has(host)) return null

  return { event: 'cta_engajamento_click', params: { source: normalizePage(page) } }
}

/** Same signal as GoogleAnalytics: analytics_storage is granted only for cookie-consent=all. */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem('cookie-consent') === 'all'
  } catch {
    return false
  }
}

export function trackGa4Conversion(eventName: string, params: Ga4Params) {
  if (typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}
