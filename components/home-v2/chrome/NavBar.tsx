'use client'

import type { Lang, SectionId } from '../types'
import PublicNavigation from '@/components/PublicNavigation'
import { PUBLIC_NAV_COPY } from '@/components/public-navigation'

interface NavBarProps {
  lang: Lang
  activeSection?: SectionId
  activeHref?: string
  onNavigate: (target: SectionId) => void
}

export default function NavBar({ lang, activeSection, activeHref, onNavigate }: NavBarProps) {
  const copy = PUBLIC_NAV_COPY[lang]
  const onHome = Boolean(activeHref)

  const links = copy.links.map((link) => {
    const homeHref = link.homeSection
      ? `${onHome ? copy.homeHref : ''}#${link.homeSection}`
      : link.href
    const active = activeHref === link.href || Boolean(link.homeSection && activeSection === link.homeSection)

    return {
      ...link,
      href: homeHref,
      active,
      activeCurrent: link.homeSection ? ('location' as const) : ('page' as const),
      onSelect: link.homeSection
        ? ((event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault()
            onNavigate(link.homeSection as SectionId)
          })
        : undefined,
    }
  })

  return (
    <PublicNavigation
      lang={lang}
      homeHref={onHome ? copy.homeHref : '#hero'}
      links={links}
      onHomeSelect={(event) => {
        event.preventDefault()
        onNavigate('hero')
      }}
    />
  )
}
