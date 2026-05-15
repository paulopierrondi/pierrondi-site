import React from "react"
import styles from "./UtilityCard.module.css"

export interface UtilityCardProps {
  image?: React.ReactNode
  title: string
  subtitle?: string
  link?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function UtilityCard({
  image,
  title,
  subtitle,
  link,
  children,
  className,
}: UtilityCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      {image && (
        <div className={styles.imageSlot} aria-hidden="true">
          {image}
        </div>
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.content}>{children}</div>}
        {link && <div className={styles.link}>{link}</div>}
      </div>
    </div>
  )
}

export default UtilityCard
