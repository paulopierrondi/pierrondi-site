'use client'

import { useEffect } from 'react'
import { classifyConversionClick, trackGa4Conversion } from '@/lib/ga4-conversions'

function elementFromTarget(target: EventTarget | null) {
  if (target instanceof Element) return target
  if (target instanceof Node) return target.parentElement
  return null
}

export default function Ga4ConversionListener() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0) return
      const element = elementFromTarget(event.target)
      if (!element) return
      const anchor = element.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      const href = anchor.getAttribute('href')
      if (!href) return
      const hit = classifyConversionClick(href, window.location.pathname)
      if (!hit) return
      trackGa4Conversion(hit.event, hit.params)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
