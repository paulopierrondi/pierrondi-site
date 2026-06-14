'use client'

import { usePathname } from 'next/navigation'
import SiteJsonLd from './SiteJsonLd'

export default function SiteJsonLdWrapper() {
  const pathname = usePathname()

  if (pathname?.startsWith('/bradesco-26')) {
    return null
  }

  return <SiteJsonLd />
}
