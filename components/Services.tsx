'use client'

import Link from 'next/link'
import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Services.module.css'

interface ServicesProps {
  lang?: Lang
}

export default function Services({ lang = 'pt' }: ServicesProps) {
  const t = home[lang].services
  const sectionId = lang === 'en' ? 'services' : 'servicos'
  const contactAnchor = lang === 'en' ? '#contact' : '#contact'

  const headline = `${t.titleLines[0]} ${t.titleLines[1]} ${t.titleLines[2]}${t.titleEm}`

  return (
    <section className={styles.section} id={sectionId}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.tagline}>{t.body}</p>

        <div className={styles.serviceGrid}>
          {t.items.map((service) => (
            <article key={service.number} className={styles.serviceCard}>
              <div className={styles.cardTop}>
                <span className={styles.serviceNumber}>{service.number}</span>
                <span className={styles.timelineBadge}>{service.timeline}</span>
              </div>

              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.servicePrice}>{service.price}</p>
              <p className={styles.serviceDesc}>{service.description}</p>

              <ul className={styles.featureList}>
                {service.items.map((item) => (
                  <li key={item} className={styles.featureItem}>{item}</li>
                ))}
              </ul>

              <div className={styles.cardCta}>
                <Link href={contactAnchor}>{t.talk}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
