'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { COPY } from '../copy'
import type { SectionProps } from '../types'
import styles from './HeroSection.module.css'

// r3f background is client-only: never rendered on the server.
const WireframeGrid = dynamic(() => import('../three/WireframeGrid'), {
  ssr: false,
})

const HEADING_ID = 'hero-heading'
const TYPE_INTERVAL_MS = 55
// framer-motion cubic-bezier, typed as a fixed tuple to satisfy strict TS.
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function HeroSection({ lang }: SectionProps) {
  const hero = COPY[lang].hero
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { margin: '-20% 0px', once: false })
  const reducedMotion = useReducedMotion()

  // Typewriter for headline line 2. Initial state is the FULL string so the
  // server-rendered HTML always contains the complete headline (SEO). The
  // effect only runs on the client and only replays when motion is allowed.
  const fullLine2 = hero.headlineLine2
  const [typedCount, setTypedCount] = useState(fullLine2.length)

  useEffect(() => {
    if (reducedMotion) return
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTypedCount(i)
      if (i >= fullLine2.length) {
        window.clearInterval(id)
      }
    }, TYPE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [fullLine2, reducedMotion])

  // Under reduced motion the full line is always shown, no state writes needed.
  const typedLine2 = reducedMotion ? fullLine2 : fullLine2.slice(0, typedCount)

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  }

  // The <h1> is its own stagger parent so line 1 and line 2 reveal in sequence.
  const headlineVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
  }

  const itemVariants: Variants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EXPO_OUT },
        },
      }

  return (
    <section className={styles.hero} aria-labelledby={HEADING_ID}>
      <div className={styles.bg} aria-hidden="true">
        <WireframeGrid />
      </div>
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content} ref={rootRef}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className={styles.tagline} variants={itemVariants}>
            <span className={styles.bracket} aria-hidden="true">
              [
            </span>
            <span className={styles.taglineText}>{hero.tagline}</span>
            <span className={styles.bracket} aria-hidden="true">
              ]
            </span>
          </motion.p>

          <motion.h1
            id={HEADING_ID}
            className={styles.headline}
            variants={headlineVariants}
          >
            <motion.span className={styles.line1} variants={itemVariants}>
              {hero.headlineLine1}
            </motion.span>
            <motion.span className={styles.line2} variants={itemVariants}>
              <span className={styles.line2Text}>{typedLine2}</span>
              <span className={styles.cursor} aria-hidden="true">
                █
              </span>
            </motion.span>
          </motion.h1>

          <motion.p className={styles.description} variants={itemVariants}>
            <span className={styles.promptPrefix} aria-hidden="true">
              &gt;
            </span>
            <span>{hero.description}</span>
          </motion.p>

          <motion.ul className={styles.badges} variants={itemVariants}>
            {hero.badges.map((badge) => (
              <li key={badge} className={styles.badge}>
                {badge}
              </li>
            ))}
          </motion.ul>

          <motion.div className={styles.ctas} variants={itemVariants}>
            <a className={styles.ctaPrimary} href={hero.ctaPrimary.href}>
              <span>{hero.ctaPrimary.label}</span>
              <ArrowDown className={styles.ctaIcon} aria-hidden="true" />
            </a>
            <a className={styles.ctaSecondary} href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
