'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { COPY } from '../copy'
import type { SectionProps } from '../types'
import sceneStyles from '../three/FrontierEventHorizon.module.css'
import { HeroTelemetry } from './HeroTelemetry'
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

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

// The <h1> is its own stagger parent so line 1 and line 2 reveal in sequence.
const HEADLINE_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

function itemVariantsFor(reducedMotion: boolean): Variants {
  return reducedMotion
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
}

export default function HeroSection({ lang }: SectionProps) {
  const hero = COPY[lang].hero
  const reducedMotion = useHydratedReducedMotion()
  // Keep the full headline in the DOM at every stage. CSS reveals it visually,
  // avoiding the post-hydration text collapse caused by a JS typewriter.
  const fullLine2 = hero.headlineLine2
  const itemVariants = itemVariantsFor(reducedMotion)

  return (
    <section className={styles.hero} aria-labelledby={HEADING_ID}>
      <div className={styles.bg} aria-hidden="true">
        <div className={sceneStyles.fallback} data-frontier-fallback>
          <span className={sceneStyles.fallbackDisk} />
          <span className={sceneStyles.fallbackVoid} />
          <span className={sceneStyles.fallbackHorizon} />
          <span className={sceneStyles.fallbackObserver} />
        </div>
        <FrontierEventHorizon />
      </div>
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.chromaticVeil} aria-hidden="true" />
      <div className={styles.gravityWell} aria-hidden="true" />

      <HeroTelemetry lang={lang} />

      <div className={styles.content}>
        <motion.div
          className={styles.inner}
          variants={CONTAINER_VARIANTS}
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
            variants={HEADLINE_VARIANTS}
          >
            <motion.span className={styles.line1} variants={itemVariants}>
              {hero.headlineLine1}
            </motion.span>
            <motion.span className={styles.line2} variants={itemVariants}>
              <span className={styles.line2Text}>{fullLine2}</span>
            </motion.span>
          </motion.h1>

          <motion.p className={styles.description} variants={itemVariants}>
            {hero.description}
          </motion.p>

          <motion.ul className={styles.badges} variants={itemVariants}>
            {hero.badges.map((badge) => (
              <li key={badge} className={styles.badge}>
                {badge}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className={styles.ctas}
            data-hero-ctas
            variants={itemVariants}
          >
            <a className={styles.ctaPrimary} href={hero.ctaPrimary.href}>
              <span>{hero.ctaPrimary.label}</span>
              <ArrowDown className={styles.ctaIcon} aria-hidden="true" />
            </a>
            <a className={styles.ctaSecondary} href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </motion.div>

          <motion.nav
            className={styles.lanes}
            data-hero-lanes
            aria-label={lang === 'pt' ? 'Rotas de entrada' : 'Entry routes'}
            variants={itemVariants}
          >
            {hero.lanes.map((lane) => (
              <a
                key={lane.kicker}
                className={styles.lane}
                data-hero-lane={lane.kicker.toLowerCase()}
                href={lane.href}
              >
                <span className={styles.laneKicker}>{lane.kicker}</span>
                <span className={styles.laneLabel}>{lane.label}</span>
                <ArrowUpRight className={styles.laneIcon} aria-hidden="true" />
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  )
}
