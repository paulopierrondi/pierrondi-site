'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { ArrowDown } from 'lucide-react'
import { COPY } from '../copy'
import type { SectionProps } from '../types'
import sceneStyles from '../three/FrontierEventHorizon.module.css'
import styles from './HeroSection.module.css'

// The procedural event horizon is client-only; CSS remains as the no-WebGL fallback.
const FrontierEventHorizon = dynamic(
  () => import('../three/FrontierEventHorizon'),
  {
    ssr: false,
  },
)

const HEADING_ID = 'hero-heading'
// framer-motion cubic-bezier, typed as a fixed tuple to satisfy strict TS.
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

function HeroTelemetry() {
  return (
    <>
      <div className={styles.sceneMeta} aria-hidden="true">
        <span>FRONTIER SYSTEM / 001</span>
        <span className={styles.sceneStatus}>
          <i /> SIGNAL LOCK
        </span>
      </div>
      <div className={styles.orbitalData} aria-hidden="true">
        <span>EVENT HORIZON</span>
        <strong>R → ∞</strong>
        <i />
        <small>40°42′46″ N · 74°00′21″ W</small>
      </div>
      <div className={styles.scaleMarker} aria-hidden="true">
        <span>OBSERVER / 01</span>
        <i />
      </div>
    </>
  )
}

export default function HeroSection({ lang }: SectionProps) {
  const hero = COPY[lang].hero
  const reducedMotion = useHydratedReducedMotion()

  // Keep the full headline in the DOM at every stage. CSS reveals it visually,
  // avoiding the post-hydration text collapse caused by a JS typewriter.
  const fullLine2 = hero.headlineLine2

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
        <div className={sceneStyles.fallback} data-frontier-fallback>
          <span className={sceneStyles.fallbackDisk} />
          <span className={sceneStyles.fallbackVoid} />
        </div>
        <FrontierEventHorizon />
      </div>
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.chromaticVeil} aria-hidden="true" />

      <HeroTelemetry />

      <div className={styles.content}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial={false}
          animate="visible"
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
              <span className={styles.line2Text}>{fullLine2}</span>
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
