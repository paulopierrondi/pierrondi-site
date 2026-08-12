'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
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
  type StudioCreativeProofItem,
  type StudioLang,
} from './studio-data'
import styles from './StudioExperience.module.css'

const frontIcons = [Compass, Palette, Clapperboard, Bot] as const
const StudioGrowthCore = dynamic(() => import('./StudioGrowthCore'), {
  ssr: false,
  loading: () => <div className={styles.growthCoreLoading} aria-hidden="true" />,
})

const proofLayoutClasses: Record<StudioCreativeProofItem['layout'], string> = {
  atlas: styles.galleryAtlas,
  product: styles.galleryProduct,
  portrait: styles.galleryPortrait,
  review: styles.galleryReview,
  diptych: styles.galleryDiptych,
  demo: styles.galleryDemo,
}

export function StudioMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`${styles.mark} ${compact ? styles.markCompact : ''}`} aria-hidden="true">
      <span>P</span>
      <i>S</i>
    </span>
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
            <a href="#sistema-criativo" className={styles.secondaryAction}>
              {copy.secondaryCta} <ArrowDownRight aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div className={styles.heroVisual} {...reveal(0.1)}>
          <figure className={styles.growthFigure} aria-label={`${copy.signalMap.title}: ${copy.signalMap.nodes.join(' → ')}`}>
            <StudioGrowthCore lang={lang} />
            <figcaption className={styles.srOnly}>{copy.signalMap.title}</figcaption>
          </figure>
        </motion.div>

        <div className={styles.proofRail} aria-label={lang === 'pt' ? 'Componentes do sistema' : 'System components'}>
          {copy.proofLabels.map((label, index) => (
            <span key={label}><i>{String(index + 1).padStart(2, '0')}</i>{label}</span>
          ))}
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label={lang === 'pt' ? 'Seções do Studio' : 'Studio sections'}>
        <a href="#frentes">{copy.nav.services}</a>
        <a href="#sistema-criativo">{copy.nav.creative}</a>
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

      <section className={styles.creativeProof} id="sistema-criativo" aria-labelledby="studio-creative-title">
        <motion.header className={styles.sectionHeader} {...reveal()}>
          <p>{copy.creativeSystem.eyebrow}</p>
          <h2 id="studio-creative-title">{copy.creativeSystem.title}</h2>
          <span>{copy.creativeSystem.lead}</span>
        </motion.header>

        <motion.figure className={styles.productionDossier} {...reveal(0.04)}>
          <div className={styles.dossierVisual}>
            <Image
              src="/portfolio/studio/pierrondi-studio-production-dossier-v1.webp"
              alt={copy.creativeSystem.visualAlt}
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
              priority
            />
            <div className={styles.dossierFrame} aria-hidden="true">
              <span>PIERRONDI STUDIO</span>
              <i />
              <span>PRODUCTION / 01</span>
            </div>
          </div>
          <figcaption>
            <p>{copy.creativeSystem.visualLabel}</p>
            <span>{copy.creativeSystem.visualCaption}</span>
          </figcaption>
        </motion.figure>

        <div className={styles.visualIndex} aria-labelledby="studio-visual-index-title">
          <motion.header className={styles.visualIndexHeader} {...reveal(0.02)}>
            <p>{copy.creativeSystem.proofEyebrow}</p>
            <h3 id="studio-visual-index-title">{copy.creativeSystem.proofTitle}</h3>
            <span>{copy.creativeSystem.proofLead}</span>
          </motion.header>

          <div className={styles.galleryGrid}>
            {copy.creativeSystem.proofItems.map((item, index) => (
              <motion.article
                key={item.id}
                className={`${styles.galleryItem} ${proofLayoutClasses[item.layout]}`}
                data-studio-proof-item={item.id}
                {...reveal(index * 0.035)}
              >
                <div className={styles.galleryMedia}>
                  {item.sources.length === 1 ? (
                    <Image
                      src={item.sources[0].src}
                      alt={item.sources[0].alt}
                      fill
                      sizes="(max-width: 800px) calc(100vw - 36px), (max-width: 1080px) 50vw, 58vw"
                    />
                  ) : (
                    <div className={styles.galleryDiptychImages}>
                      {item.sources.map((source) => (
                        <div key={source.src} className={styles.galleryDiptychImage}>
                          <Image
                            src={source.src}
                            alt={source.alt}
                            fill
                            sizes="(max-width: 800px) calc((100vw - 62px) / 2), 24vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <span className={styles.galleryIndex} aria-hidden="true">{item.index}</span>
                </div>
                <div className={styles.galleryCopy}>
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                  <span>{item.caption}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <p className={styles.visualIndexNote}>{copy.creativeSystem.proofNote}</p>
        </div>

        <div className={styles.creativeSystemList}>
          {copy.creativeSystem.systems.map((system, index) => (
            <motion.article
              key={system.id}
              id={system.id}
              className={styles.creativeSystem}
              data-studio-creative-system={system.id}
              {...reveal(index * 0.045)}
            >
              <div className={styles.systemIdentity}>
                <span>{system.index}</span>
                <h3>{system.title}</h3>
                <p>{system.strapline}</p>
              </div>
              <div className={styles.systemBody}>
                <p>{system.description}</p>
                <ol aria-label={`${system.title}: ${copy.creativeSystem.capabilityLabel}`}>
                  {system.stages.map((stage, stageIndex) => (
                    <li key={stage}><i>{String(stageIndex + 1).padStart(2, '0')}</i>{stage}</li>
                  ))}
                </ol>
              </div>
              <div className={styles.systemOutputs}>
                <span>{copy.creativeSystem.formatLabel}</span>
                <ul>
                  {system.formats.map((format) => <li key={format}>{format}</li>)}
                </ul>
                <p><strong>{copy.creativeSystem.proofLabel}</strong>{system.proof}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className={styles.creativeNote}>{copy.creativeSystem.note}</p>
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
