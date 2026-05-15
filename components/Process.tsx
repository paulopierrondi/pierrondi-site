'use client'

import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Process.module.css'

interface ProcessProps {
  lang?: Lang
}

export default function Process({ lang = 'pt' }: ProcessProps) {
  const t = home[lang].process
  const sectionId = lang === 'en' ? 'how' : 'como'

  const headline = `${t.titleLines[0]} ${t.titleLines[1]} ${t.titleLines[2]}${t.titleEm}`

  return (
    <section className={styles.section} id={sectionId}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>

        <ol className={styles.stepList}>
          {t.steps.map((step) => (
            <li key={step.number} className={styles.stepRow}>
              <span className={styles.stepNumber}>{step.number}</span>
              <div className={styles.stepMeta}>
                <span className={styles.stepLabel}>{step.label}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p className={styles.stepDesc}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
