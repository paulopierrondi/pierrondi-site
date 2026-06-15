'use client'

import styles from './SiteLogo.module.css'

interface SiteLogoProps {
  className?: string
  size?: number
}

export default function SiteLogo({ className = '', size = 30 }: SiteLogoProps) {
  return (
    <svg
      className={`${styles.logo} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="13"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.22"
      />
      <line x1="16" y1="16" x2="16" y2="6" stroke="var(--color-primary)" opacity="0.6" />
      <line x1="16" y1="16" x2="24.5" y2="20.5" stroke="var(--color-primary)" opacity="0.6" />
      <line x1="16" y1="16" x2="7.5" y2="20.5" stroke="var(--color-primary)" opacity="0.6" />
      <circle cx="16" cy="6" r="2.5" fill="var(--color-primary)" />
      <circle cx="24.5" cy="20.5" r="2.3" fill="var(--color-primary)" opacity="0.62" />
      <circle cx="7.5" cy="20.5" r="2.3" fill="var(--color-primary)" opacity="0.62" />
      <circle cx="16" cy="16" r="3.7" fill="var(--color-primary)" />
      <circle cx="16" cy="16" r="1.5" fill="#061006" />
    </svg>
  )
}
