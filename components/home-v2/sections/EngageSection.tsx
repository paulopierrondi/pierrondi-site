'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Lang, SectionProps } from '../types'
import styles from './EngageSection.module.css'

type Step = { k: string; t: string; d: string }

type EngageCopy = {
  eyebrow: string
  heading: string
  lead: string
  chain: string
  steps: Step[]
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  actionsLabel: string
}

const ENGAGE: Record<Lang, EngageCopy> = {
  pt: {
    eyebrow: 'COMO ENGAJAR',
    heading: 'Fractional AI Automation Officer',
    lead: 'Engajamento contínuo para resultado mensurável. A cadeia pública é baseline → métrica → handoff — o sistema que o time opera depois, não horas soltas.',
    chain: 'baseline → métrica → handoff',
    steps: [
      { k: '01', t: 'Baseline', d: 'O trabalho de hoje, as restrições e o que já existe.' },
      { k: '02', t: 'Métrica', d: 'Adoção, qualidade e valor definidos antes de escalar.' },
      { k: '03', t: 'Handoff', d: 'O time fica com registry, runbook e trilha de evidência.' },
    ],
    primary: { label: 'abrir /engajamento', href: '/engajamento' },
    secondary: { label: 'contato', href: '#contact' },
    actionsLabel: 'Como engajar',
  },
  en: {
    eyebrow: 'HOW TO ENGAGE',
    heading: 'Fractional AI Automation Officer',
    lead: 'An ongoing engagement for a measurable outcome. The public chain is baseline → metric → handoff — the system the team operates afterwards, not loose hours.',
    chain: 'baseline → metric → handoff',
    steps: [
      { k: '01', t: 'Baseline', d: "Today's work, the constraints, and what already exists." },
      { k: '02', t: 'Metric', d: 'Adoption, quality, and value defined before scale.' },
      { k: '03', t: 'Handoff', d: 'The team keeps the registry, runbook, and evidence trail.' },
    ],
    primary: { label: 'open /en/engajamento', href: '/en/engajamento' },
    secondary: { label: 'contact', href: '#contact' },
    actionsLabel: 'How to engage',
  },
}

export default function EngageSection({ lang }: SectionProps) {
  const copy = ENGAGE[lang]

  return (
    <aside
      id="como-engajar"
      className={styles.root}
      data-home-engage={lang}
      aria-labelledby="home-engage-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="home-engage-heading">{copy.heading}</h2>
          <p className={styles.lead}>{copy.lead}</p>
          <p className={styles.chain}>{copy.chain}</p>
        </header>

        <ol className={styles.steps}>
          {copy.steps.map((step) => (
            <li key={step.k}>
              <span>{step.k}</span>
              <strong>{step.t}</strong>
              <p>{step.d}</p>
            </li>
          ))}
        </ol>

        <div className={styles.actions} aria-label={copy.actionsLabel}>
          <Link className={styles.primary} href={copy.primary.href} data-home-engage-cta>
            {copy.primary.label}
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <a className={styles.secondary} href={copy.secondary.href}>
            {copy.secondary.label}
          </a>
        </div>
      </div>
    </aside>
  )
}
