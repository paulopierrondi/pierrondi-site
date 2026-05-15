import type { ReactNode } from 'react'

export interface SectionHeaderProps {
  eyebrow: string
  titleLines: string[]
  titleEm?: string
  description?: ReactNode
  kickerClassName?: string
  titleClassName?: string
  copyClassName?: string
}

export default function SectionHeader({
  eyebrow,
  titleLines,
  titleEm,
  description,
  kickerClassName = 'section-kicker',
  titleClassName = 'section-title',
  copyClassName = 'section-copy',
}: SectionHeaderProps) {
  return (
    <>
      <span className={kickerClassName}>{eyebrow}</span>
      <h2 className={titleClassName}>
        {titleLines.map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < titleLines.length - 1 ? <br /> : null}
          </span>
        ))}
        {titleEm ? <em>{titleEm}</em> : null}
      </h2>
      {description ? <p className={copyClassName}>{description}</p> : null}
    </>
  )
}
