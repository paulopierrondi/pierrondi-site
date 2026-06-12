import { home, type Lang } from '@/lib/i18n/home-copy'
import BrandSignature from './BrandSignature'
import styles from './Footer.module.css'

interface FooterProps {
  lang?: Lang
}

export default function Footer({ lang = 'pt' }: FooterProps) {
  const t = home[lang].footer

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <BrandSignature className={styles.logo} size="lg" />
          <p className={styles.desc}>{t.desc}</p>
        </div>

        <nav className={styles.links} aria-label="Footer links">
          {t.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.meta}>
          <span className={styles.metaText}>{t.location}</span>
          <span className={styles.metaText}>{t.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
