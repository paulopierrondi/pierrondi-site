'use client'

import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  label: string
  index: string
  total: string
}

export default function SectionLabel({ label, index, total }: SectionLabelProps) {
  return (
    <div className={styles.label} aria-hidden="true">
      <span className={styles.name}>{label}</span>
      <span className={styles.rule} />
      <span className={styles.count}>
        {index} / {total}
      </span>
    </div>
  )
}
