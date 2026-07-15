'use client'

import type { RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import ProjectVisual, { CaseMark } from '@/components/portfolio/ProjectVisual'
import type {
  PortfolioCase,
  PortfolioLang,
} from '@/components/portfolio/portfolio-data'
import styles from './ProjectsSection.module.css'

type Navigate = (next: number) => void

export function ProjectsScreenReaderList({
  items,
}: {
  items: PortfolioCase[]
}) {
  return (
    <ul className={styles.srOnly}>
      {items.map((item) => (
        <li key={item.id}>
          <strong>
            {item.title}: {item.headline}
          </strong>{' '}
          {item.description} {item.proof}
        </li>
      ))}
    </ul>
  )
}

export function ProjectsHeader({ lang }: { lang: PortfolioLang }) {
  const portfolioHref = lang === 'pt' ? '/portfolio' : '/en/portfolio'
  const studioHref = lang === 'pt' ? '/studio' : '/en/studio'

  return (
    <header className={styles.topbar}>
      <div>
        <p className={styles.kicker}>
          {lang === 'pt'
            ? 'PRODUTO · MARCA · INTEGRAÇÕES · IA'
            : 'PRODUCT · BRAND · INTEGRATIONS · AI'}
        </p>
        <h2 id="portfolio-home-title" className={styles.heading}>
          <span className={styles.headingIndex}>02</span>
          {lang === 'pt'
            ? 'Estratégia e código que viraram sistema.'
            : 'Strategy and code turned into systems.'}
        </h2>
      </div>
      <div className={styles.topbarLinks}>
        <a href={studioHref} className={styles.studioDirectLink}>
          <span aria-hidden="true" />
          Pierrondi Studio
          <ArrowRight aria-hidden="true" />
        </a>
        <a href={portfolioHref} className={styles.portfolioLink}>
          {lang === 'pt' ? 'portfólio completo' : 'full portfolio'}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}

function tabTargetForKey(key: string, index: number, length: number) {
  if (key === 'ArrowRight') return index + 1
  if (key === 'ArrowLeft') return index - 1
  if (key === 'Home') return 0
  if (key === 'End') return length - 1
  return null
}

export function ProjectTabs({
  items,
  index,
  lang,
  railRef,
  goTo,
  selectAndFocus,
}: {
  items: PortfolioCase[]
  index: number
  lang: PortfolioLang
  railRef: RefObject<HTMLDivElement | null>
  goTo: Navigate
  selectAndFocus: Navigate
}) {
  return (
    <div
      ref={railRef}
      className={styles.caseRail}
      role="tablist"
      aria-label={lang === 'pt' ? 'Selecionar projeto' : 'Select project'}
    >
      {items.map((item, itemIndex) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          id={`project-tab-${item.id}`}
          aria-controls={`project-panel-${item.id}`}
          aria-selected={itemIndex === index}
          tabIndex={itemIndex === index ? 0 : -1}
          className={
            itemIndex === index
              ? `${styles.caseTab} ${styles.caseTabActive}`
              : styles.caseTab
          }
          onClick={() => goTo(itemIndex)}
          onKeyDown={(event) => {
            const target = tabTargetForKey(event.key, itemIndex, items.length)
            if (target === null) return
            event.preventDefault()
            selectAndFocus(target)
          }}
        >
          <CaseMark item={item} size={38} />
          <span>
            <small>{item.index}</small>
            <strong>{item.navLabel}</strong>
          </span>
        </button>
      ))}
    </div>
  )
}

function ProjectContent({
  active,
  itemCount,
  lang,
}: {
  active: PortfolioCase
  itemCount: number
  lang: PortfolioLang
}) {
  return (
    <div className={styles.contentColumn}>
      <div className={styles.statusLine}>
        <span className={styles.statusDot} aria-hidden="true" />
        {active.status}
        <span>
          {active.index} / {String(itemCount).padStart(2, '0')}
        </span>
      </div>

      <p className={styles.eyebrow}>{active.eyebrow}</p>
      <h3>{active.headline}</h3>
      <p className={styles.description}>{active.description}</p>
      <p className={styles.proof}>{active.proof}</p>

      <div
        className={styles.platforms}
        aria-label={lang === 'pt' ? 'Plataformas' : 'Platforms'}
      >
        {active.platforms.map((platform) => (
          <span key={platform}>{platform}</span>
        ))}
      </div>

      <dl className={styles.facts}>
        {active.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <a
          href={active.href}
          className={styles.primaryAction}
          target={active.external ? '_blank' : undefined}
          rel={active.external ? 'noreferrer' : undefined}
        >
          {active.cta}
          {active.external ? (
            <ExternalLink aria-hidden="true" />
          ) : (
            <ArrowRight aria-hidden="true" />
          )}
        </a>
        {active.secondaryHref && (
          <a
            href={active.secondaryHref}
            className={styles.secondaryAction}
            target="_blank"
            rel="noreferrer"
          >
            {active.secondaryCta}
          </a>
        )}
      </div>
    </div>
  )
}

export function ProjectStory({
  active,
  itemCount,
  lang,
  direction,
  reduceMotion,
}: {
  active: PortfolioCase
  itemCount: number
  lang: PortfolioLang
  direction: number
  reduceMotion: boolean
}) {
  return (
    <div className={styles.storyStage}>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.article
          key={active.id}
          id={`project-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${active.id}`}
          className={styles.story}
          custom={direction}
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 34 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -26 }
          }
          transition={{
            duration: reduceMotion ? 0.08 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            className={styles.visualColumn}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.46,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ProjectVisual item={active} lang={lang} compact />
          </motion.div>

          <ProjectContent active={active} itemCount={itemCount} lang={lang} />
        </motion.article>
      </AnimatePresence>
    </div>
  )
}

export function ProjectsControls({
  items,
  index,
  lang,
  paginate,
}: {
  items: PortfolioCase[]
  index: number
  lang: PortfolioLang
  paginate: (delta: number) => void
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.progress} aria-hidden="true">
        {items.map((item, itemIndex) => (
          <span
            key={item.id}
            className={itemIndex === index ? styles.progressActive : ''}
          />
        ))}
      </div>
      <span className={styles.counter} aria-live="polite">
        {String(index + 1).padStart(2, '0')} <i>/</i>{' '}
        {String(items.length).padStart(2, '0')}
      </span>
      <button
        type="button"
        onClick={() => paginate(-1)}
        aria-label={lang === 'pt' ? 'Projeto anterior' : 'Previous project'}
      >
        <ArrowLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => paginate(1)}
        aria-label={lang === 'pt' ? 'Próximo projeto' : 'Next project'}
      >
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  )
}
