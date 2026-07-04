import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import styles from './ProofSection.module.css'

interface ProofSectionProps {
  eyebrow: string
  title: string
  copy: string
  metrics: Array<{ value: string; label: string; count?: number }>
  convictions: string[]
}

export default function ProofSection({ eyebrow, title, copy, metrics, convictions }: ProofSectionProps) {
  return (
    <section className={styles.proof} id="prova" aria-labelledby="prova-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="prova-title">{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{copy}</p>
          </Reveal>
        </div>

        <div className={styles.metrics}>
          {metrics.map((metric, index) => (
            <Reveal key={metric.value} delay={index * 0.05}>
              <div className={styles.metric}>
                <div className={styles.value}>
                  {metric.value}
                </div>
                <div className={styles.label}>{metric.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <RevealStagger className={styles.quotes} staggerDelay={0.06}>
          {convictions.map((quote, index) => (
            <RevealStaggerItem key={index}>
              <figure className={styles.quote}>
                <p>“{quote}”</p>
                <figcaption>
                  <b>Convicção 0{index + 1}</b>
                </figcaption>
              </figure>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
