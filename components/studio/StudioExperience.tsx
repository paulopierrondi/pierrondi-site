'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Check,
  Clapperboard,
  Compass,
  Layers3,
  Palette,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import {
  STUDIO_COPY,
  getStudioContactHref,
  type StudioLang,
} from './studio-data'
import styles from './StudioExperience.module.css'

const frontIcons = [Compass, Palette, Clapperboard, Bot] as const

export function StudioMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`${styles.mark} ${compact ? styles.markCompact : ''}`} aria-hidden="true">
      <span>P</span>
      <i>S</i>
    </span>
  )
}

function SignalMap({ lang }: { lang: StudioLang }) {
  const copy = STUDIO_COPY[lang].signalMap

  return (
    <figure className={styles.signalMap} aria-label={`${copy.title}: ${copy.nodes.join(' → ')}`}>
      <div className={styles.signalHeader}>
        <span>{copy.eyebrow}</span>
        <span className={styles.liveStatus}><i /> {copy.status}</span>
      </div>
      <div className={styles.signalTitle}>
        <StudioMark />
        <div>
          <span>PIERRONDI</span>
          <strong id="studio-system-map-title">STUDIO</strong>
        </div>
      </div>
      <div className={styles.signalCanvas} aria-hidden="true">
        <span className={styles.signalOrbit} />
        <span className={styles.signalSweep} />
        <svg viewBox="0 0 660 280" preserveAspectRatio="none">
          <defs>
            <linearGradient id="studio-line" x1="0" x2="1">
              <stop offset="0" stopColor="#60a5fa" />
              <stop offset="0.48" stopColor="#4ade80" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M 48 178 C 132 60, 226 60, 304 140 S 466 248, 612 78" />
          <path className={styles.signalPathGhost} d="M 48 220 C 156 160, 224 236, 330 152 S 506 34, 612 126" />
        </svg>
        <div className={styles.signalNodes}>
          {copy.nodes.map((node, index) => (
            <span key={node} className={styles.signalNode} data-node={index + 1}>
              <i>{String(index + 1).padStart(2, '0')}</i>
              <strong>{node}</strong>
            </span>
          ))}
        </div>
      </div>
      <figcaption>{copy.title}</figcaption>
    </figure>
  )
}

export default function StudioExperience({ lang }: { lang: StudioLang }) {
  const copy = STUDIO_COPY[lang]
  const reduceMotion = useHydratedReducedMotion()
  const { scrollYProgress } = useScroll()
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const contactHref = getStudioContactHref(lang)
  const portfolioHref = lang === 'pt' ? '/portfolio' : '/en/portfolio'

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <main className={styles.page}>
      <motion.span className={styles.progress} style={{ scaleX: progressScale }} aria-hidden="true" />

      <section className={styles.hero} id="top" aria-labelledby="studio-title">
        <span className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <motion.div className={styles.brandLockup} {...reveal()}>
            <StudioMark compact />
            <span>PIERRONDI <strong>STUDIO</strong></span>
          </motion.div>
          <motion.p className={styles.eyebrow} {...reveal(0.04)}>{copy.eyebrow}</motion.p>
          <motion.h1 id="studio-title" {...reveal(0.08)}>{copy.title}</motion.h1>
          <motion.blockquote {...reveal(0.12)}>{copy.positioning}</motion.blockquote>
          <motion.p className={styles.heroNote} {...reveal(0.16)}>{copy.heroNote}</motion.p>
          <motion.div className={styles.heroActions} {...reveal(0.2)}>
            <Link href={contactHref} className={styles.primaryAction}>
              {copy.primaryCta} <ArrowRight aria-hidden="true" />
            </Link>
            <a href="#metodo" className={styles.secondaryAction}>
              {copy.secondaryCta} <ArrowDownRight aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div className={styles.heroVisual} {...reveal(0.1)}>
          <SignalMap lang={lang} />
        </motion.div>

        <div className={styles.proofRail} aria-label={lang === 'pt' ? 'Componentes do sistema' : 'System components'}>
          {copy.proofLabels.map((label, index) => (
            <span key={label}><i>{String(index + 1).padStart(2, '0')}</i>{label}</span>
          ))}
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label={lang === 'pt' ? 'Seções do Studio' : 'Studio sections'}>
        <a href="#frentes">{copy.nav.services}</a>
        <a href="#cases">{copy.nav.cases}</a>
        <a href="#metodo">{copy.nav.process}</a>
        <a href="#parcerias">{copy.nav.partnership}</a>
      </nav>

      <section className={styles.services} id="frentes" aria-labelledby="studio-services-title">
        <motion.header className={styles.sectionHeader} {...reveal()}>
          <p>{copy.servicesEyebrow}</p>
          <h2 id="studio-services-title">{copy.servicesTitle}</h2>
          <span>{copy.servicesLead}</span>
        </motion.header>
        <div className={styles.serviceGrid}>
          {copy.fronts.map((front, index) => {
            const Icon = frontIcons[index]
            return (
              <motion.article key={front.id} className={styles.serviceCard} {...reveal(index * 0.05)}>
                <div className={styles.serviceTopline}>
                  <span>{front.index} / {front.label}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{front.title}</h3>
                <p>{front.description}</p>
                <ul>
                  {front.deliverables.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
                </ul>
                <div className={styles.serviceSignal}><i />{front.signal}</div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className={styles.cases} id="cases" aria-labelledby="studio-cases-title">
        <motion.header className={styles.sectionHeader} {...reveal()}>
          <p>{copy.casesEyebrow}</p>
          <h2 id="studio-cases-title">{copy.casesTitle}</h2>
          <span>{copy.casesLead}</span>
        </motion.header>
        <div className={styles.caseList}>
          {copy.cases.map((item, index) => (
            <motion.article key={item.index} className={styles.caseCard} {...reveal(index * 0.05)}>
              <div className={styles.caseIdentity}>
                <span>{item.index}</span>
                <small>{item.sector}</small>
                <h3>{item.title}</h3>
                <div className={styles.caseTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <dl className={styles.caseNarrative}>
                <div><dt>{copy.problemLabel}</dt><dd>{item.problem}</dd></div>
                <div><dt>{copy.solutionLabel}</dt><dd>{item.solution}</dd></div>
                <div className={styles.caseResult}><dt>{copy.resultLabel}</dt><dd>{item.result}</dd></div>
              </dl>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.process} id="metodo" aria-labelledby="studio-process-title">
        <motion.header className={styles.sectionHeader} {...reveal()}>
          <p>{copy.processEyebrow}</p>
          <h2 id="studio-process-title">{copy.processTitle}</h2>
          <span>{copy.processLead}</span>
        </motion.header>
        <div className={styles.processTrack}>
          <span className={styles.processLine} aria-hidden="true" />
          {copy.steps.map((step, index) => (
            <motion.article key={step.index} className={styles.processStep} {...reveal(index * 0.04)}>
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.partnership} id="parcerias" aria-labelledby="studio-partnership-title">
        <motion.div className={styles.partnershipCopy} {...reveal()}>
          <p>{copy.partnershipEyebrow}</p>
          <h2 id="studio-partnership-title">{copy.partnershipTitle}</h2>
          <span>{copy.partnershipBody}</span>
          <ul>
            {copy.partnershipPoints.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}
          </ul>
        </motion.div>
        <motion.div className={styles.partnerConsole} {...reveal(0.08)}>
          <div className={styles.consoleHeader}><span /><span /><span /><strong>partner_mode.yaml</strong></div>
          <div className={styles.consoleBody}>
            <span>client_owner:</span><strong>agency</strong>
            <span>studio_role:</span><strong>capacity_layer</strong>
            <span>delivery:</span><strong>documented</strong>
            <span>approval:</span><strong>human_gate</strong>
          </div>
          <div className={styles.consoleBadge}><Workflow aria-hidden="true" />{copy.partnershipBadge}</div>
        </motion.div>
      </section>

      <section className={styles.closing} aria-labelledby="studio-cta-title">
        <div className={styles.closingGlyph} aria-hidden="true"><Sparkles /><Layers3 /></div>
        <motion.div {...reveal()}>
          <p>{copy.ctaEyebrow}</p>
          <h2 id="studio-cta-title">{copy.ctaTitle}</h2>
          <span>{copy.ctaBody}</span>
          <div className={styles.closingActions}>
            <Link href={contactHref} className={styles.primaryAction}>{copy.ctaButton}<ArrowRight aria-hidden="true" /></Link>
            <Link href={portfolioHref} className={styles.secondaryAction}>{copy.ctaAlt}</Link>
          </div>
        </motion.div>
      </section>

      <div className={styles.studioFooter}>
        <span><StudioMark compact /> PIERRONDI STUDIO</span>
        <p>{copy.legalNote}</p>
      </div>
    </main>
  )
}
