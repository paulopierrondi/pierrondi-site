'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Building2, Boxes, GalleryVerticalEnd, LayoutGrid, Smartphone } from 'lucide-react'
import type { PortfolioLang } from './portfolio-data'
import styles from './PortfolioSectionNav.module.css'

const ITEMS = {
  pt: [
    { id: 'property-partner-search-spotlight', label: 'Imóveis', icon: Building2 },
    { id: 'studio-visual', label: 'Studio', icon: GalleryVerticalEnd },
    { id: 'cases', label: 'Cases', icon: LayoutGrid },
    { id: 'catalogo', label: 'Catálogo', icon: Boxes },
    { id: 'app-store', label: 'Apps', icon: Smartphone },
  ],
  en: [
    { id: 'property-partner-search-spotlight', label: 'Property', icon: Building2 },
    { id: 'studio-visual', label: 'Studio', icon: GalleryVerticalEnd },
    { id: 'cases', label: 'Cases', icon: LayoutGrid },
    { id: 'catalogo', label: 'Catalog', icon: Boxes },
    { id: 'app-store', label: 'Apps', icon: Smartphone },
  ],
} as const

export default function PortfolioSectionNav({ lang }: { lang: PortfolioLang }) {
  const items = ITEMS[lang]
  const [activeId, setActiveId] = useState<string>(items[0].id)

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => Boolean(target))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))

        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.08, 0.25] },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      className={styles.nav}
      aria-label={lang === 'pt' ? 'Atalhos do portfólio' : 'Portfolio shortcuts'}
      data-portfolio-section-nav
    >
      <span className={styles.label}>{lang === 'pt' ? 'IR PARA' : 'JUMP TO'}</span>
      <div className={styles.rail}>
        {items.map(({ id, label, icon: Icon }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={activeId === id ? styles.active : undefined}
            aria-current={activeId === id ? 'location' : undefined}
            onClick={() => setActiveId(id)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
