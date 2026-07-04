'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'section' | 'article' | 'p' | 'h2' | 'h3'
}

export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Component = motion[as] as typeof motion.div

  return (
    <Component
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: reduced ? 0 : 0.08, margin: '-8% 0px -8% 0px' }}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  )
}

interface RevealStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  baseDelay?: number
}

export function RevealStagger({
  children,
  className = '',
  staggerDelay = 0.05,
  baseDelay = 0,
}: RevealStaggerProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: reduced ? 0 : 0.08, margin: '-8% 0px -8% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: baseDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealStaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      initial={false}
    >
      {children}
    </motion.div>
  )
}
