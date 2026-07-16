'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'

const easing = [0.16, 1, 0.3, 1] as const

export function AboutReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'aside'
}) {
  const reduceMotion = useHydratedReducedMotion()
  const Component = motion[as] as typeof motion.div

  return (
    <Component
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: '-6% 0px -6% 0px' }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay, ease: easing }}
    >
      {children}
    </Component>
  )
}

export function AboutStagger({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}) {
  const reduceMotion = useHydratedReducedMotion()
  const Component = motion[as] as typeof motion.div
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion ? undefined : { staggerChildren: 0.075, delayChildren: 0.05 },
    },
  }

  return (
    <Component
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-5% 0px -5% 0px' }}
      variants={variants}
    >
      {children}
    </Component>
  )
}

export function AboutStaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <motion.article
      className={className}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: easing },
              },
            }
      }
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: easing }}
    >
      {children}
    </motion.article>
  )
}
