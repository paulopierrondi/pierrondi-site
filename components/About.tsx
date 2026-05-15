'use client'

import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './About.module.css'

const stack = ['Next.js', 'TypeScript', 'n8n', 'Make', 'Claude', 'Gemini', 'Playwright', 'Railway']

interface AboutProps {
  lang?: Lang
}

export default function About({ lang = 'pt' }: AboutProps) {
  const t = home[lang].about

  const headline = `${t.titleLines[0]} ${t.titleLines[1]} ${t.titleLines[2]}${t.titleEm}`

  return (
    <section className={styles.section} id="sobre">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.tagline}>{t.body}</p>

        <div className={styles.stackRow}>
          {stack.map((item) => (
            <span key={item} className={styles.chip}>{item}</span>
          ))}
        </div>

        <div className={styles.principleGrid}>
          {t.principles.map((item) => (
            <article key={item.title} className={styles.principleCard}>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p className={styles.principleDesc}>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
