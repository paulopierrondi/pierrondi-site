'use client'

import { createElement, useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import {
  Bot,
  Brain,
  BrainCircuit,
  Briefcase,
  Code,
  Code2,
  Cpu,
  Database,
  Globe,
  Landmark,
  Layers,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { COPY } from '../copy'
import type { Lang, SectionProps, SkillCategory, SkillItem } from '../types'
import styles from './SkillsSection.module.css'

const ICON_MAP: Record<string, LucideIcon> = {
  bot: Bot,
  brain: Brain,
  braincircuit: BrainCircuit,
  code: Code,
  code2: Code2,
  terminal: Terminal,
  cpu: Cpu,
  workflow: Workflow,
  layers: Layers,
  briefcase: Briefcase,
  rocket: Rocket,
  network: Network,
  database: Database,
  globe: Globe,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
  landmark: Landmark,
}

function resolveIcon(name?: string): LucideIcon {
  if (!name) return Terminal
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  return ICON_MAP[key] ?? Terminal
}

function getSkillsMeta(lang: Lang) {
  return COPY[lang].sections.find((s) => s.id === 'skills')
}

const DEFAULT_MOTION = {
  stagger: 0.12,
  delay: 0.05,
  headerY: 30,
  cardY: 40,
  badgeY: 12,
  duration: 0.6,
  badgeDuration: 0.38,
} as const

const REDUCED_MOTION = {
  stagger: 0,
  delay: 0,
  headerY: 0,
  cardY: 0,
  badgeY: 0,
  duration: 0.1,
  badgeDuration: 0.1,
} as const

interface SkillCardProps {
  category: SkillCategory
  cardVariants: Variants
  badgeVariants: Variants
}

function SkillCard({ category, cardVariants, badgeVariants }: SkillCardProps) {
  const icon = createElement(resolveIcon(category.icon), {
    className: styles.icon,
    'aria-hidden': true,
  })

  return (
    <motion.article className={styles.card} variants={cardVariants} tabIndex={0}>
      <div className={styles.cardHeader}>
        {icon}
        <h3 className={styles.title}>{category.title}</h3>
      </div>

      <ul className={styles.badges}>
        {category.skills.map((skill: SkillItem) => (
          <motion.li key={skill.name} className={styles.badge} variants={badgeVariants}>
            <span className={styles.badgeName}>{skill.name}</span>
            {skill.note && (
              <>
                <span className={styles.badgeSeparator} aria-hidden="true">
                  {' · '}
                </span>
                <span className={styles.badgeNote}>{skill.note}</span>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function SkillsSection({ lang }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    margin: '-20% 0px',
    once: false,
  })
  const shouldReduceMotion = useHydratedReducedMotion()
  const motionTokens = shouldReduceMotion ? REDUCED_MOTION : DEFAULT_MOTION

  const copy = COPY[lang].skills
  const meta = getSkillsMeta(lang)

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionTokens.stagger,
        delayChildren: motionTokens.delay,
      },
    },
  }

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: motionTokens.headerY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: motionTokens.cardY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: motionTokens.stagger / 3,
        delayChildren: motionTokens.delay * 2,
      },
    },
  }

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: motionTokens.badgeY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.badgeDuration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section

      ref={sectionRef}
      className={styles.skills}
      aria-labelledby="skills-heading"
    >
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          {meta && (
            <motion.span className={styles.index} variants={headerVariants} aria-hidden="true">
              {meta.index}
            </motion.span>
          )}
          <motion.h2 id="skills-heading" className={styles.heading} variants={headerVariants}>
            {copy.heading}
          </motion.h2>
          {copy.intro && (
            <motion.p className={styles.intro} variants={headerVariants}>
              {copy.intro}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          {copy.categories.map((category: SkillCategory) => (
            <SkillCard
              key={category.title}
              category={category}
              cardVariants={cardVariants}
              badgeVariants={badgeVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
