import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import styles from './SystemsSection.module.css'

interface SystemsSectionProps {
  eyebrow: string
  title: string
  copy: string
  cards: Array<{ title: string; copy: string; tags: string[]; icon: 'chip' | 'nodes' | 'shield' | 'strategy' }>
}

const icons = {
  chip: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a3 3 0 0 1 3 3v1.2A3 3 0 0 1 18 9v.5a2.5 2.5 0 0 1 0 5V15a3 3 0 0 1-3 3v1a3 3 0 1 1-6 0v-1a3 3 0 0 1-3-3v-.5a2.5 2.5 0 0 1 0-5V9a3 3 0 0 1 3-2.8V5a3 3 0 0 1 3-3Z" />
      <path d="M12 8v8M9 11h6" />
    </svg>
  ),
  nodes: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="5" cy="6" r="2.4" />
      <circle cx="19" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M7 7.2 11 16M17 7.2 13 16M7.3 6h9.4" />
    </svg>
  ),
  shield: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  strategy: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 18v3m8-3v3M6 21h12" />
    </svg>
  ),
}

export default function SystemsSection({ eyebrow, title, copy, cards }: SystemsSectionProps) {
  return (
    <section className={styles.systems} id="sistemas" aria-labelledby="sistemas-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="sistemas-title">{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{copy}</p>
          </Reveal>
        </div>

        <RevealStagger className={styles.cards} staggerDelay={0.06}>
          {cards.map((card, index) => (
            <RevealStaggerItem key={card.title}>
              <article className={styles.card}>
                <div className={styles.idx}>0{index + 1}</div>
                <div className={styles.icon}>{icons[card.icon]}</div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <div className={styles.tags}>
                  {card.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
