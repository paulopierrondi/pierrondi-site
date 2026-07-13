declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void
    gtag?: (...args: unknown[]) => void
  }
}

type EventProps = Record<string, string | number | boolean | undefined | null>

export function trackEvent(eventName: string, props: EventProps = {}) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)

  const baseProps: EventProps = {
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    utm_source: url.searchParams.get('utm_source') || undefined,
    utm_medium: url.searchParams.get('utm_medium') || undefined,
    utm_campaign: url.searchParams.get('utm_campaign') || undefined,
    thesisId: url.searchParams.get('thesisId') || url.searchParams.get('thesis') || undefined,
  }

  const cleanProps = Object.fromEntries(
    Object.entries({ ...baseProps, ...props }).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as Record<string, string | number | boolean>

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: cleanProps })
  }

  if (typeof window.gtag === 'function') {
    const ga4EventName = {
      Contact_Form_Submitted: 'generate_lead',
      Contact_Form_Error: 'contact_form_error',
      ThankYou_Viewed: 'lead_confirmation_viewed',
    }[eventName] || eventName.toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 40)
    window.gtag('event', ga4EventName, cleanProps)
  }
}
