import React from "react"
import styles from "./ProductTile.module.css"

export interface ProductTileProps {
  variant?: "light" | "parchment" | "dark"
  eyebrow?: string
  headline?: string
  tagline?: string
  ctas?: React.ReactNode
  image?: React.ReactNode
  children?: React.ReactNode
  className?: string
  id?: string
  as?: "section" | "div"
}

export function ProductTile({
  variant = "light",
  eyebrow,
  headline,
  tagline,
  ctas,
  image,
  children,
  className,
  id,
  as: Tag = "section",
}: ProductTileProps) {
  const tileClassName = [
    styles.tile,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Tag className={tileClassName} id={id}>
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

        {headline && <h2 className={styles.headline}>{headline}</h2>}

        {tagline && <p className={styles.tagline}>{tagline}</p>}

        {children && <div className={styles["children-slot"]}>{children}</div>}

        {ctas && <div className={styles.ctas}>{ctas}</div>}

        {image && <div className={styles["image-slot"]}>{image}</div>}
      </div>
    </Tag>
  )
}

export default ProductTile
