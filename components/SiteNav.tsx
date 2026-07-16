'use client'

import { usePathname } from 'next/navigation'
import { getCurrentLanguage } from '@/lib/i18n/site-language'
import { usesHomeChrome, usesOwnAppChrome } from '@/components/home-v2/immersive-routes'
import PublicNavigation from '@/components/PublicNavigation'
import { PUBLIC_NAV_COPY } from '@/components/public-navigation'

export default function SiteNav() {
  const pathname = usePathname() || '/'
  const ownsHomeChrome = usesHomeChrome(pathname)
  const lang = getCurrentLanguage(pathname)
  const copy = PUBLIC_NAV_COPY[lang]

  const isActive = (href: string) => {
    if (href === '/' || href === '/en') return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  if (ownsHomeChrome || usesOwnAppChrome(pathname)) return null

  return (
    <PublicNavigation
      key={pathname}
      lang={lang}
      homeHref={copy.homeHref}
      links={copy.links.map((link) => ({ ...link, active: isActive(link.href) }))}
    />
  )
}
