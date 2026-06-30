'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import styles from './OperatingModelSection.module.css'

interface OperatingModelSectionProps {
  eyebrow: string
  title: string
  copy: string
  nodes: Array<{ num: string; title: string; copy: string }>
  flow: string[]
}

export default function OperatingModelSection({
  eyebrow,
  title,
  copy,
  nodes,
  flow,
}: OperatingModelSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const reduced = useReducedMotion()
  const litIndex = nodes.length - 1

  return (
    <section className={styles.model} id="modelo" aria-labelledby="modelo-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="modelo-title">{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{copy}</p>
          </Reveal>
        </div>

        <div className={styles.chain} ref={ref}>
          <div className={styles.rail}>
            <motion.i
              initial={false}
              animate={{ width: '100%' }}
              transition={{ duration: reduced ? 0 : 1.4, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className={styles.pulse}
              initial={false}
              animate={
                inView
                  ? { opacity: [0, 1, 1, 0], left: ['0%', '100%'] }
                  : { opacity: 0, left: '0%' }
              }
              transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {nodes.map((node, index) => (
            <motion.div
              key={node.num}
              className={styles.node}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.45,
                delay: inView && !reduced ? 0.08 * index : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`${styles.num} ${index <= litIndex ? styles.lit : ''}`}
              >
                {node.num}
              </div>
              <h3>{node.title}</h3>
              <p>{node.copy}</p>
            </motion.div>
          ))}
        </div>

        <Reveal>
          <div className={styles.flow}>
            {flow.map((item, index) => (
              <span key={item}>
                {index > 0 && <span className={styles.ar}>→</span>}
                <b>{item}</b>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
