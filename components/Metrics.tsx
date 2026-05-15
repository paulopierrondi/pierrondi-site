'use client'

import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Metrics.module.css'

interface MetricsProps {
  lang?: Lang
}

export default function Metrics({ lang = 'pt' }: MetricsProps) {
  const t = home[lang].metrics

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <p className={styles.note}>{t.note}</p>

        <div className={styles.metricsGrid}>
          {t.items.map((item) => (
            <article key={item.label} className={styles.metricCard}>
              <strong className={styles.metricValue}>{item.value}</strong>
              <span className={styles.metricLabel}>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
