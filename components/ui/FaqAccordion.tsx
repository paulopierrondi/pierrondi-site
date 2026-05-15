'use client'

import { useState } from 'react'
import styles from './FaqAccordion.module.css'

interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={styles.row}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={styles.question}>{item.q}</span>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">+</span>
            </button>
            {isOpen && (
              <div className={styles.answer}>
                <p>{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FaqAccordion
