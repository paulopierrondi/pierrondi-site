'use client'

import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Problem.module.css'

interface ProblemProps {
  lang?: Lang
}

export default function Problem({ lang = 'pt' }: ProblemProps) {
  const t = home[lang].problem

  const headline = `${t.titleLines[0]} ${t.titleLines[1]} ${t.titleLines[2]}${t.titleEm}`

  return (
    <section className={styles.section} id="problema">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.tagline}>{t.body}</p>

        <div className={styles.painGrid}>
          {t.pains.map((pain) => (
            <article key={pain.number} className={styles.painCard}>
              <span className={styles.painNumber}>{pain.number}</span>
              <h3 className={styles.painTitle}>{pain.title}</h3>
              <p className={styles.painText}>{pain.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
