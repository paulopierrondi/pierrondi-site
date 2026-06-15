import Reveal from '@/components/Reveal'
import styles from './ContactSection.module.css'

interface ContactSectionProps {
  eyebrow: string
  title: string
  copy: string
  primaryCta: string
  secondaryCta: string
  proof: string[]
}

export default function ContactSection({
  eyebrow,
  title,
  copy,
  primaryCta,
  secondaryCta,
  proof,
}: ContactSectionProps) {
  return (
    <section className={styles.contact} id="contato" aria-labelledby="contato-title">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>
            <span className={styles.tick} />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="contato-title">{title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p>{copy}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className={styles.actions}>
            <a
              href="https://br.linkedin.com/in/paulopierrondi"
              target="_blank"
              rel="noreferrer"
              className={styles.btnPrimary}
            >
              {primaryCta} <span aria-hidden="true">↗</span>
            </a>
            <a href="mailto:pierrondi@gmail.com" className={styles.btnGhost}>
              {secondaryCta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className={styles.proof}>
            {proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
