'use client'

import type { SectionId, SectionMeta } from '../types'
import styles from './SectionDots.module.css'

interface SectionDotsProps {
  sections: SectionMeta[]
  activeSection: SectionId
  onNavigate: (target: SectionId) => void
  ariaLabel: string
}

export default function SectionDots({ sections, activeSection, onNavigate, ariaLabel }: SectionDotsProps) {
  const total = String(sections.length).padStart(2, '0')

  return (
    <nav className={styles.rail} aria-label={ariaLabel}>
      {sections.map((section) => {
        const active = section.id === activeSection
        return (
          <button
            key={section.id}
            type="button"
            className={`${styles.dot} ${active ? styles.dotActive : ''}`}
            aria-label={`${section.label} (${section.index}/${total})`}
            aria-current={active ? 'true' : undefined}
            onClick={() => onNavigate(section.id)}
          >
            <span className={styles.index} aria-hidden="true">
              {section.index}
            </span>
            <span className={styles.circle} aria-hidden="true" />
          </button>
        )
      })}
    </nav>
  )
}
