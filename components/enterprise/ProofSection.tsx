'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import styles from './ProofSection.module.css'

interface ProofSectionProps {
  eyebrow: string
  title: string
  copy: string
  metrics: Array<{ value: string; label: string; count?: number }>
  convictions: string[]
}

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()

  const spring = useSpring(0, {
    stiffness: reduced ? 1000 : 50,
    damping: reduced ? 1000 : 30,
    duration: reduced ? 0 : 1.6,
  })

  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString('pt-BR'))

  useEffect(() => {
    if (inView) {
      spring.set(target)
    }
  }, [inView, spring, target])

  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  )
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
                  {metric.count !== undefined ? (
                    <CountUp target={metric.count} />
                  ) : (
                    metric.value
                  )}
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
