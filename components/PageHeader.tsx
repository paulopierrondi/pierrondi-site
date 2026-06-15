import Reveal from '@/components/Reveal'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  lead: string
  chips?: string[]
}

export default function PageHeader({ eyebrow, title, lead, chips }: PageHeaderProps) {
  return (
    <header className={styles.pagehead}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>
            <span className={styles.tick} />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1>{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>{lead}</p>
        </Reveal>
        {chips && (
          <Reveal delay={0.12}>
            <div className={styles.chips}>
              {chips.map((chip) => (
                <span key={chip} className={styles.chip}>
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  )
}
