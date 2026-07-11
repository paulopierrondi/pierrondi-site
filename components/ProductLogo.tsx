import Image from 'next/image'
import manifest from '@/public/app-icons/manifest.json'
import styles from './ProductLogo.module.css'

interface ManifestEntry {
  file: string
  name: string
  source: string
}

const ICONS = manifest as Record<string, ManifestEntry>

interface ProductLogoProps {
  /** Slug matching public/app-icons/manifest.json (app registry or web product slug). */
  slug: string
  /** Product name, used for alt text and the monogram fallback. */
  name: string
  size?: number
  className?: string
}

/**
 * Official product/app icon when one exists in public/app-icons (fetched via
 * `npm run icons:fetch`), otherwise a terminal-style monogram tile so every
 * product gets a consistent visual anchor.
 */
export default function ProductLogo({ slug, name, size = 56, className }: ProductLogoProps) {
  const entry = ICONS[slug]

  if (entry) {
    return (
      <span
        className={`${styles.tile} ${className ?? ''}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={`/app-icons/${entry.file}`}
          alt={`Logo oficial de ${name}`}
          width={size}
          height={size}
          className={styles.image}
          unoptimized={entry.file.endsWith('.svg')}
        />
      </span>
    )
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span
      className={`${styles.tile} ${styles.monogram} ${className ?? ''}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
