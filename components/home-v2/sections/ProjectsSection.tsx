'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import ProjectVisual, { CaseMark } from '@/components/portfolio/ProjectVisual'
import { PORTFOLIO_CASES } from '@/components/portfolio/portfolio-data'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import type { SectionProps } from '../types'
import styles from './ProjectsSection.module.css'

const SECTION_NUMBER = '02'

export default function ProjectsSection({ lang }: SectionProps) {
  const items = PORTFOLIO_CASES[lang]
  const rootRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { margin: '-18% 0px', once: false })
  const reduceMotion = useHydratedReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const goTo = useCallback(
    (next: number) => {
      const normalized = (next + items.length) % items.length
      if (normalized === index) return
      setDirection(normalized > index ? 1 : -1)
      setIndex(normalized)
    },
    [index, items.length],
  )

  const paginate = useCallback((delta: number) => goTo(index + delta), [goTo, index])

  useEffect(() => {
    const activeTab = railRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')
    activeTab?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' })
  }, [index, reduceMotion])

  const active = items[index]
  const portfolioHref = lang === 'pt' ? '/portfolio' : '/en/portfolio'

  const selectAndFocus = (next: number) => {
    const normalized = (next + items.length) % items.length
    goTo(normalized)
    requestAnimationFrame(() => {
      railRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[normalized]?.focus()
    })
  }

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    const touch = event.changedTouches[0]
    if (!start || !touch) return
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) paginate(dx < 0 ? 1 : -1)
  }

  return (
    <section ref={rootRef} className={styles.region} aria-labelledby="portfolio-home-title">
      <ul className={styles.srOnly}>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}: {item.headline}</strong> {item.description} {item.proof}
          </li>
        ))}
      </ul>

      <header className={styles.topbar}>
        <div>
          <p className={styles.kicker}>{lang === 'pt' ? 'PRODUTO · MOBILE · INTEGRAÇÕES · IA' : 'PRODUCT · MOBILE · INTEGRATIONS · AI'}</p>
          <h2 id="portfolio-home-title" className={styles.heading}>
            <span className={styles.headingIndex}>{SECTION_NUMBER}</span>
            {lang === 'pt' ? 'Código que virou produto.' : 'Code that became product.'}
          </h2>
        </div>
        <a href={portfolioHref} className={styles.portfolioLink}>
          {lang === 'pt' ? 'portfólio completo' : 'full portfolio'}
          <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <motion.div
        className={styles.stage}
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 22 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
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
              className={itemIndex === index ? `${styles.caseTab} ${styles.caseTabActive}` : styles.caseTab}
              onClick={() => goTo(itemIndex)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault()
                  selectAndFocus(itemIndex + 1)
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault()
                  selectAndFocus(itemIndex - 1)
                }
                if (event.key === 'Home') {
                  event.preventDefault()
                  selectAndFocus(0)
                }
                if (event.key === 'End') {
                  event.preventDefault()
                  selectAndFocus(items.length - 1)
                }
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

        <div className={styles.storyStage}>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={active.id}
              id={`project-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${active.id}`}
              className={styles.story}
              custom={direction}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -26 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={styles.visualColumn}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectVisual item={active} lang={lang} compact />
              </motion.div>

              <div className={styles.contentColumn}>
                <div className={styles.statusLine}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {active.status}
                  <span>{active.index} / {String(items.length).padStart(2, '0')}</span>
                </div>

                <p className={styles.eyebrow}>{active.eyebrow}</p>
                <h3>{active.headline}</h3>
                <p className={styles.description}>{active.description}</p>
                <p className={styles.proof}>{active.proof}</p>

                <div className={styles.platforms} aria-label={lang === 'pt' ? 'Plataformas' : 'Platforms'}>
                  {active.platforms.map((platform) => <span key={platform}>{platform}</span>)}
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
                    {active.external ? <ExternalLink aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
                  </a>
                  {active.secondaryHref && (
                    <a href={active.secondaryHref} className={styles.secondaryAction} target="_blank" rel="noreferrer">
                      {active.secondaryCta}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className={styles.controls}>
        <div className={styles.progress} aria-hidden="true">
          {items.map((item, itemIndex) => (
            <span key={item.id} className={itemIndex === index ? styles.progressActive : ''} />
          ))}
        </div>
        <span className={styles.counter} aria-live="polite">
          {String(index + 1).padStart(2, '0')} <i>/</i> {String(items.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={() => paginate(-1)} aria-label={lang === 'pt' ? 'Projeto anterior' : 'Previous project'}>
          <ArrowLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => paginate(1)} aria-label={lang === 'pt' ? 'Próximo projeto' : 'Next project'}>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
