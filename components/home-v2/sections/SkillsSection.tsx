'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
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

export default function SkillsSection({ lang }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    margin: '-20% 0px',
    once: false,
  })
  const shouldReduceMotion = useReducedMotion()

  const copy = COPY[lang].skills
  const meta = getSkillsMeta(lang)

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }

  const headerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 0 : 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 0 : 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const badgeVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 0 : 0, scale: shouldReduceMotion ? 1 : 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: [0.68, -0.55, 0.265, 1.55],
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
          {copy.categories.map((category: SkillCategory) => {
            const Icon = resolveIcon(category.icon)
            return (
              <motion.article
                key={category.title}
                className={styles.card}
                variants={cardVariants}
                tabIndex={0}
              >
                <div className={styles.cardHeader}>
                  <Icon className={styles.icon} aria-hidden="true" />
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
          })}
        </motion.div>
      </div>
    </section>
  )
}
