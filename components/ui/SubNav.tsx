import React from "react"
import styles from "./SubNav.module.css"

export interface SubNavProps {
  pageName: string
  links?: Array<{ label: string; href: string }>
  cta?: React.ReactNode
  className?: string
}

export function SubNav({ pageName, links, cta, className }: SubNavProps) {
  return (
    <nav
      className={[styles.subnav, className].filter(Boolean).join(" ")}
      aria-label="Page navigation"
    >
      <span className={styles.pageName}>{pageName}</span>
      {(links && links.length > 0) || cta ? (
        <div className={styles.right}>
          {links && links.length > 0 && (
            <ul className={styles.links} role="list">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.link}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {cta && <div className={styles.cta}>{cta}</div>}
        </div>
      ) : null}
    </nav>
  )
}

export default SubNav
