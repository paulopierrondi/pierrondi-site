'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useInView, animate, type Variants } from 'framer-motion'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { SectionProps } from '../types'
import { COPY } from '../copy'
import styles from './AboutSection.module.css'

interface ParsedStat {
  numeric: number | null
  prefix: string
  suffix: string
  raw: string
}

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/)
  if (!match) return { numeric: null, prefix: '', suffix: '', raw: value }
  return {
    numeric: parseFloat(match[2] ?? '0'),
    prefix: match[1] ?? '',
    suffix: match[3] ?? '',
    raw: value,
  }
}

function AnimatedStatValue({
  value,
  inView,
  reducedMotion,
}: {
  value: string
  inView: boolean
  reducedMotion: boolean
}) {
  const { numeric, prefix, suffix, raw } = useMemo(() => parseStatValue(value), [value])
  const [display, setDisplay] = useState<string>(raw)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (numeric === null || !inView || reducedMotion || hasAnimated) return

    const controls = animate(0, numeric, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(`${prefix}${Math.round(latest)}${suffix}`)
      },
      onComplete: () => {
        setDisplay(raw)
        setHasAnimated(true)
      },
    })

    return () => controls.stop()
  }, [numeric, prefix, suffix, raw, inView, reducedMotion, hasAnimated])

  return <span aria-label={raw}>{display}</span>
}

function BioParagraph({ text }: { text: string }) {
  if (!text.includes('**')) {
    return <>{text}</>
  }

  const parts = text.split(/(\*\*.*?\*\*)/g)
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className={styles.bioStrong}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}

function TestimonialAvatar({ name }: { name: string }) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .filter((part) => part.length > 0)
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }, [name])

  return <div className={styles.testimonialAvatar}>{initials}</div>
}

export default function AboutSection({ lang }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDListElement>(null)
  const reducedMotion = useHydratedReducedMotion()
  const isInView = useInView(ref, { margin: '-20% 0px', once: false })
  const statsInView = useInView(statsRef, { margin: '-10% 0px', once: false })

  const copy = COPY[lang]
  const about = copy.about
  const sectionMeta = copy.sections.find((section) => section.id === 'about')
  const hasTestimonials = about.testimonials.length > 0

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reducedMotion ? 0 : 0.12,
          delayChildren: reducedMotion ? 0 : 0.05,
        },
      },
    }),
    [reducedMotion]
  )

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: reducedMotion ? 0.6 : 0, y: reducedMotion ? 0 : 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reducedMotion ? 0.1 : 0.7,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    }),
    [reducedMotion]
  )

  return (
    <section ref={ref} className={styles.section}>
      <span className={styles.sectionLabel} aria-hidden="true">
        [ {sectionMeta?.label ?? 'about'} ]
      </span>
      <span className={styles.sectionIndicator} aria-hidden="true">
        <span className={styles.sectionIndicatorActive}>{sectionMeta?.index ?? '03'}</span>
        {' / '}
        {String(copy.sections.length).padStart(2, '0')}
      </span>

      <motion.div
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className={hasTestimonials ? styles.grid : styles.gridSingle}>
          <div className={styles.leftColumn}>
            <motion.h2 className={styles.heading} variants={itemVariants}>
              <span className={styles.headingPrompt}>$ </span>
              {about.heading}
            </motion.h2>

            <div className={styles.bio}>
              {about.bio.map((paragraph, index) => (
                <motion.p key={index} className={styles.bioParagraph} variants={itemVariants}>
                  <BioParagraph text={paragraph} />
                </motion.p>
              ))}
            </div>

            <motion.dl ref={statsRef} className={styles.statsGrid} variants={itemVariants}>
              {about.stats.map((stat, index) => (
                <motion.div key={index} className={styles.statCard} variants={itemVariants}>
                  <dt className={styles.statValue}>
                    <AnimatedStatValue
                      value={stat.value}
                      inView={statsInView}
                      reducedMotion={reducedMotion}
                    />
                  </dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          {hasTestimonials && (
            <aside className={styles.rightColumn}>
              <div className={styles.testimonialsStack}>
                {about.testimonials.map((testimonial, index) => (
                  <motion.blockquote
                    key={index}
                    className={styles.testimonialCard}
                    variants={itemVariants}
                  >
                    <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                    <div className={styles.testimonialDivider} />
                    <footer className={styles.testimonialFooter}>
                      <TestimonialAvatar name={testimonial.author} />
                      <div>
                        <cite className={styles.testimonialAuthor}>{testimonial.author}</cite>
                        <p className={styles.testimonialRole}>{testimonial.role}</p>
                      </div>
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </aside>
          )}
        </div>
      </motion.div>
    </section>
  )
}
