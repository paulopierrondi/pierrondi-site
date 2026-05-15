'use client'

import Image from 'next/image'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Portfolio.module.css'

interface PortfolioProps {
  lang?: Lang
}

export default function Portfolio({ lang = 'pt' }: PortfolioProps) {
  const t = home[lang].portfolio
  const portfolioFullHref = lang === 'en' ? '/en/portfolio' : '/portfolio'

  const headline = `${t.titleLines[0]} ${t.titleLines[1]} ${t.titleLines[2]}${t.titleEm}`

  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.tagline}>{t.body}</p>

        <div className={styles.grid}>
          {t.items.map((item, index) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  loading={item.image === '/assets/development.png' ? 'eager' : undefined}
                  sizes="(max-width: 960px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className={styles.label}>{item.label}</span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>

                <div className={styles.proof}>
                  {item.proof.map((proof) => (
                    <span key={proof} className={styles.chip}>{proof}</span>
                  ))}
                </div>

                <Link
                  href={item.href}
                  className={styles.cardLink}
                  onClick={() => trackEvent('PortfolioCTA_Clicked', { asset: item.title, service: item.href })}
                >
                  {t.seeDelivery}
                  <span aria-hidden="true"> ↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.support}>
          {t.supporting.map((item) => (
            <span key={item} className={styles.chip}>{item}</span>
          ))}
        </div>

        <Link
          href={portfolioFullHref}
          className={styles.fullLink}
          onClick={() => trackEvent('PortfolioCTA_Clicked', { asset: 'portfolio-completo', service: 'portfolio' })}
        >
          {t.fullPortfolio}
          <span aria-hidden="true"> ↗</span>
        </Link>
      </div>
    </section>
  )
}
