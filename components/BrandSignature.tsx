import Link from 'next/link'
import styles from './BrandSignature.module.css'

type BrandTone = 'lime' | 'amber'
type BrandSize = 'sm' | 'md' | 'lg'

interface BrandSignatureProps {
  href?: string
  ariaLabel?: string
  subtitle?: string
  className?: string
  tone?: BrandTone
  size?: BrandSize
  compact?: boolean
  mobileCompact?: boolean
}

const toneClass: Record<BrandTone, string> = {
  lime: styles.toneLime,
  amber: styles.toneAmber,
}

const sizeClass: Record<BrandSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

function BrandBody({ subtitle = 'AI Operating Model', compact = false }: Pick<BrandSignatureProps, 'subtitle' | 'compact'>) {
  return (
    <>
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.markOrbit} />
        <span className={styles.markGrid} />
        <span className={styles.markLetters}>
          P<span>.</span>
        </span>
      </span>
      {!compact && (
        <span className={styles.stack}>
          <span className={styles.name}>
            pierrondi<span>.dev</span>
          </span>
          <small>{subtitle}</small>
        </span>
      )}
    </>
  )
}

export default function BrandSignature({
  href,
  ariaLabel = 'pierrondi.dev',
  subtitle,
  className = '',
  tone = 'lime',
  size = 'md',
  compact = false,
  mobileCompact = false,
}: BrandSignatureProps) {
  const classes = [styles.root, toneClass[tone], sizeClass[size], mobileCompact ? styles.mobileCompact : '', className]
    .filter(Boolean)
    .join(' ')

  if (!href) {
    return (
      <span className={classes} aria-label={ariaLabel}>
        <BrandBody subtitle={subtitle} compact={compact} />
      </span>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        <BrandBody subtitle={subtitle} compact={compact} />
      </a>
    )
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      <BrandBody subtitle={subtitle} compact={compact} />
    </Link>
  )
}
