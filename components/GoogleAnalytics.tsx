'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type ConsentEventTarget = Pick<Window, 'gtag' | 'addEventListener' | 'removeEventListener'>
type ConsentStorage = Pick<Storage, 'getItem'>
type PageSource = {
  location?: Pick<Location, 'href' | 'pathname' | 'search'>
  document?: { title: string }
}

export type Ga4PageView = {
  page_location: string
  page_path: string
  page_title: string
}

export type Ga4RouteSlot = { current: (() => void) | null }

type Ga4ConsentState = {
  consentUpdated: boolean
  lastLocation: string | null
}

// Survives the dev Strict Mode remount so the same document does not emit
// a second page_view for the URL already sent after consent update.
const ga4ConsentState = new WeakMap<object, Ga4ConsentState>()

function consentState(target: object): Ga4ConsentState {
  const existing = ga4ConsentState.get(target)
  if (existing) return existing
  const created: Ga4ConsentState = { consentUpdated: false, lastLocation: null }
  ga4ConsentState.set(target, created)
  return created
}

export function readGa4PageView(source: PageSource): Ga4PageView {
  const location = source.location ?? window.location
  const pageTitle = source.document?.title ?? document.title
  return {
    page_location: location.href,
    page_path: `${location.pathname}${location.search ?? ''}`,
    page_title: pageTitle,
  }
}

function sendPageView(target: ConsentEventTarget & PageSource, state: Ga4ConsentState) {
  if (typeof target.gtag !== 'function') return
  const page = readGa4PageView(target)
  if (state.lastLocation === page.page_location) return
  state.lastLocation = page.page_location
  target.gtag('event', 'page_view', page)
}

export function subscribeToAnalyticsConsent(
  target: ConsentEventTarget & PageSource,
  storage: ConsentStorage,
  routeSlot?: Ga4RouteSlot,
) {
  function syncConsent() {
    if (storage.getItem('cookie-consent') !== 'all' || typeof target.gtag !== 'function') return
    const state = consentState(target)
    if (!state.consentUpdated) {
      target.gtag('consent', 'update', { analytics_storage: 'granted' })
      state.consentUpdated = true
    }
    // Config uses send_page_view: false, so this event is the only page_view.
    // It runs after the consent update, including when the grant arrives after
    // wait_for_update (500ms) and the config command has already dropped its hit.
    sendPageView(target, state)
  }

  function onRouteChange() {
    if (storage.getItem('cookie-consent') !== 'all' || typeof target.gtag !== 'function') return
    const state = consentState(target)
    // App Router navigations inside (pt) and (en) do not reload the document.
    // A signal before the consent update must not record the URL, or the later
    // grant would dedupe away the only page_view. History-based enhanced
    // measurement is a property setting and is not used for these hits.
    if (!state.consentUpdated) return
    sendPageView(target, state)
  }

  if (routeSlot) routeSlot.current = onRouteChange
  syncConsent()
  target.addEventListener('cookie-consent-granted', syncConsent)
  return () => {
    target.removeEventListener('cookie-consent-granted', syncConsent)
    if (routeSlot?.current === onRouteChange) routeSlot.current = null
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname()
  const onRouteRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!measurementId) return
    return subscribeToAnalyticsConsent(window, window.localStorage, onRouteRef)
  }, [measurementId])

  useEffect(() => {
    if (!measurementId) return
    onRouteRef.current?.()
  }, [measurementId, pathname])

  return null
}
