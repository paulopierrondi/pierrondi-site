'use client'

import { motion, useReducedMotion } from 'framer-motion'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  eyebrow: string
  title: string[]
  lead: string
  primaryCta: string
  secondaryCta: string
  micro: string[]
}

export default function HeroSection({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  micro,
}: HeroSectionProps) {
  const reduced = useReducedMotion()

  return (
    <section className={styles.hero} id="top" aria-label="Início">
      <div className={styles.inner}>
        <motion.div
          className={styles.eyebrow}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.tick} />
          {eyebrow}
        </motion.div>

        <h1 className={styles.headline}>
          {title.map((line, lineIndex) => (
            <span key={lineIndex} className={styles.line}>
              {line.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  className={
                    lineIndex === title.length - 1 ? styles.accent : undefined
                  }
                  initial={reduced ? false : { opacity: 0, y: '115%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + wordIndex * 0.05 + lineIndex * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.lead}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {lead}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="https://br.linkedin.com/in/paulopierrondi"
            target="_blank"
            rel="noreferrer"
            className={styles.btnPrimary}
          >
            {primaryCta} <span aria-hidden="true">↗</span>
          </a>
          <a href="#modelo" className={styles.btnGhost}>
            {secondaryCta} <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.div
          className={styles.micro}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {micro.map((item, index) => (
            <span key={item}>
              {index > 0 && <span className={styles.sep}>→</span>}
              {index === 1 ? <b>{item}</b> : <span>{item}</span>}
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.scrollcue}>
        <span className={styles.rail} />
        Scroll
      </div>
    </section>
  )
}
