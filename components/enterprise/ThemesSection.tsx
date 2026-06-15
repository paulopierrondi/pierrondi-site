import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import styles from './ThemesSection.module.css'

interface ThemesSectionProps {
  eyebrow: string
  title: string
  items: Array<{ label: string; title: string; copy: string }>
}

export default function ThemesSection({ eyebrow, title, items }: ThemesSectionProps) {
  return (
    <section className={styles.themes} id="temas" aria-labelledby="temas-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="temas-title">{title}</h2>
          </Reveal>
        </div>

        <RevealStagger className={styles.grid} staggerDelay={0.05}>
          {items.map((item, index) => (
            <RevealStaggerItem key={item.label}>
              <article className={styles.theme}>
                <span className={styles.num}>0{index + 1}</span>
                <div className={styles.label}>{item.label}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
