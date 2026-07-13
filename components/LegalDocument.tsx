import type { ReactNode } from 'react'
import styles from './LegalDocument.module.css'

interface LegalDocumentProps {
  eyebrow: string
  title: string
  lead: ReactNode
  children: ReactNode
}

/**
 * Shared public-document frame. Route-specific pages retain their own copy
 * and metadata so legal URLs, canonicals, and language alternates remain
 * independently auditable.
 */
export default function LegalDocument({ eyebrow, title, lead, children }: LegalDocumentProps) {
  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>PIERRONDI.DEV / {eyebrow.toUpperCase()}</p>
          <h1>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </header>

        <article className={styles.document}>{children}</article>
      </div>
    </main>
  )
}
