'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { COPY } from '../copy'
import type { MockupLine, MockupTone, ProjectItem, SectionProps } from '../types'
import styles from './ProjectsSection.module.css'

const SECTION_NUMBER = '02'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return h
}

const TONE_CLASS: Record<MockupTone, string> = {
  keyword: styles.toneKeyword,
  string: styles.toneString,
  function: styles.toneFunction,
  comment: styles.toneComment,
  plain: styles.tonePlain,
  prompt: styles.tonePrompt,
  output: styles.toneOutput,
}

export default function ProjectsSection({ lang }: SectionProps) {
  const items = COPY[lang].projects.items
  const heading = COPY[lang].projects.heading

  const rootRef = useRef<HTMLElement>(null)
  const inView = useInView(rootRef, { margin: '-20% 0px', once: false })
  const reduceMotion = useReducedMotion() ?? false

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = useCallback(
    (dir: number) => {
      if (items.length === 0) return
      setDirection(dir)
      setIndex((prev) => (prev + dir + items.length) % items.length)
    },
    [items.length],
  )

  const goTo = useCallback(
    (i: number) => {
      if (items.length === 0 || i === index) return
      setDirection(i > index ? 1 : -1)
      setIndex(i)
    },
    [items.length, index],
  )

  // Keyboard navigation, only while the section is in view and focus is not in
  // an editable control.
  useEffect(() => {
    if (!inView) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Enter') return
      const ae = document.activeElement
      const tag = ae?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (ae && ae.getAttribute('contenteditable') === 'true') return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        paginate(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        paginate(-1)
      } else if (e.key === 'Enter') {
        const cta = rootRef.current?.querySelector(
          '[data-cta-primary]',
        ) as HTMLAnchorElement | null
        if (cta) {
          e.preventDefault()
          cta.click()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [inView, paginate])

  // Touch swipe navigation (horizontal-dominant, ~50px threshold).
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    if (!t) return
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const t = e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      paginate(dx < 0 ? 1 : -1)
    }
  }

  // --- Motion variants (directional; opacity-only when reduced motion) ---
  const slideVariants: Variants = {
    enter: {},
    center: {
      transition: { when: 'beforeChildren', staggerChildren: 0.06, delayChildren: 0.04 },
    },
    exit: { transition: { when: 'afterChildren', staggerChildren: 0.03 } },
  }

  const mockupVariants: Variants = {
    enter: (d: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 * d, scale: 0.98 },
    center: reduceMotion
      ? { opacity: 1, transition: { duration: 0.1 } }
      : { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: (d: number) =>
      reduceMotion
        ? { opacity: 0, transition: { duration: 0.1 } }
        : {
            opacity: 0,
            x: -40 * d,
            scale: 0.98,
            transition: { duration: 0.4, ease: 'easeInOut' },
          },
  }

  const contentVariants: Variants = {
    enter: {},
    center: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  }

  const itemVariants: Variants = {
    enter: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    center: reduceMotion
      ? { opacity: 1, transition: { duration: 0.1 } }
      : { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.1 } }
      : { opacity: 0, y: 8, transition: { duration: 0.2, ease: 'easeIn' } },
  }

  if (items.length === 0) return null

  const active = items[index]
  const lastLineIdx = lastNonEmptyIndex(active.mockup.lines)

  return (
    <section

      ref={rootRef}
      className={styles.region}
      role="region"
      aria-roledescription="carousel"
      aria-label={heading}
    >
      {/* Visually-hidden static list so crawlers see every project. */}
      <ul className={styles.srOnly}>
        {items.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <span> — {p.subtitle}. </span>
            <span>{p.description}</span>
          </li>
        ))}
      </ul>

      <div className={styles.topbar}>
        <h2 className={styles.heading}>
          <span className={styles.headingIndex}>{SECTION_NUMBER}</span>
          {heading}
        </h2>
      </div>

      <motion.div
        className={styles.stage}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={
          inView
            ? reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24 }
        }
        transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: 'easeOut' }}
      >
        <div className={styles.stageInner}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.slide}
            >
              <motion.div
                custom={direction}
                variants={mockupVariants}
                className={styles.mockupColumn}
              >
                <Mockup item={active} lastLineIdx={lastLineIdx} />
              </motion.div>

              <motion.div variants={contentVariants} className={styles.contentColumn}>
                {active.status && (
                  <motion.div variants={itemVariants}>
                    <span className={styles.statusBadge}>
                      <span
                        className={
                          active.status.live
                            ? `${styles.statusDot} ${styles.statusDotLive}`
                            : styles.statusDot
                        }
                        aria-hidden="true"
                      />
                      {active.status.label}
                    </span>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className={styles.number}>
                  {active.number}
                </motion.div>

                <motion.h3 variants={itemVariants} className={styles.title}>
                  <span className={styles.titlePrefix}>{'$ '}</span>
                  {active.title}
                </motion.h3>

                <motion.p variants={itemVariants} className={styles.subtitle}>
                  {active.subtitle}
                </motion.p>

                <motion.p variants={itemVariants} className={styles.description}>
                  {active.description}
                </motion.p>

                <motion.ul
                  variants={itemVariants}
                  className={styles.techList}
                  aria-label={techLabel(lang)}
                >
                  {active.tech.map((t) => (
                    <li key={t} className={styles.techTag}>
                      {t}
                    </li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants} className={styles.statsRow}>
                  {active.stats.map((s) => (
                    <div key={s.label} className={styles.stat}>
                      <span className={styles.statValue}>{s.value}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </motion.div>

                {(active.ctaPrimary || active.ctaSecondary) && (
                  <motion.div variants={itemVariants} className={styles.ctaRow}>
                    {active.ctaPrimary && (
                      <a
                        href={active.ctaPrimary.href}
                        className={styles.ctaPrimary}
                        data-cta-primary
                      >
                        {active.ctaPrimary.label}
                      </a>
                    )}
                    {active.ctaSecondary && (
                      <a
                        href={active.ctaSecondary.href}
                        className={styles.ctaSecondary}
                      >
                        {active.ctaSecondary.label}
                      </a>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slide indicator dots + counter (bottom-center on all breakpoints). */}
      <div className={styles.indicatorCluster}>
        <div className={styles.dotsRail} role="tablist" aria-label={heading}>
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={dotLabel(lang, i + 1, items.length, p.title)}
              className={
                i === index
                  ? `${styles.indicatorDot} ${styles.indicatorDotActive}`
                  : styles.indicatorDot
              }
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className={styles.counter} aria-live="polite" aria-atomic="true">
          <span className={styles.counterActive}>{pad(index + 1)}</span>
          <span className={styles.counterSeparator}>{' / '}</span>
          <span>{pad(items.length)}</span>
        </div>
      </div>

      {/* Prev / next arrows (wrap-around, never disabled). */}
      <div className={styles.navArrows}>
        <button
          type="button"
          className={styles.navArrow}
          onClick={() => paginate(-1)}
          aria-label={prevLabel(lang)}
        >
          ←
        </button>
        <button
          type="button"
          className={styles.navArrow}
          onClick={() => paginate(1)}
          aria-label={nextLabel(lang)}
        >
          →
        </button>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function lastNonEmptyIndex(lines: MockupLine[]): number {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].text.trim() !== '') return i
  }
  return Math.max(lines.length - 1, 0)
}

function techLabel(lang: SectionProps['lang']): string {
  return lang === 'pt' ? 'Tecnologias utilizadas' : 'Technologies used'
}
function prevLabel(lang: SectionProps['lang']): string {
  return lang === 'pt' ? 'Projeto anterior' : 'Previous project'
}
function nextLabel(lang: SectionProps['lang']): string {
  return lang === 'pt' ? 'Próximo projeto' : 'Next project'
}
function dotLabel(lang: SectionProps['lang'], n: number, total: number, title: string): string {
  return lang === 'pt' ? `Projeto ${n} de ${total}: ${title}` : `Project ${n} of ${total}: ${title}`
}

// ---------------------------------------------------------------------------
// Mockup
// ---------------------------------------------------------------------------

function Mockup({ item, lastLineIdx }: { item: ProjectItem; lastLineIdx: number }) {
  return (
    <figure className={styles.mockup} aria-label={item.title}>
      <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true">
        +
      </span>
      <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true">
        +
      </span>
      <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true">
        +
      </span>
      <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true">
        +
      </span>

      <div className={styles.mockupHeader}>
        <div className={styles.dots} aria-hidden="true">
          <span className={`${styles.dotLight} ${styles.dotRed}`} />
          <span className={`${styles.dotLight} ${styles.dotYellow}`} />
          <span className={`${styles.dotLight} ${styles.dotGreen}`} />
        </div>
        <span className={styles.windowTitle}>{item.mockup.windowTitle}</span>
      </div>

      <div className={styles.mockupBody}>
        {item.mockup.kind === 'code' && (
          <CodeLines lines={item.mockup.lines} lastLineIdx={lastLineIdx} />
        )}
        {item.mockup.kind === 'terminal' && (
          <TerminalLines lines={item.mockup.lines} lastLineIdx={lastLineIdx} />
        )}
        {item.mockup.kind === 'dashboard' && <DashboardRows lines={item.mockup.lines} />}
      </div>

      <figcaption className={styles.mockupFooter}>{item.mockup.statusLine}</figcaption>
    </figure>
  )
}

function Cursor() {
  return (
    <span className={styles.cursor} aria-hidden="true">
      ▋
    </span>
  )
}

function CodeLines({
  lines,
  lastLineIdx,
}: {
  lines: MockupLine[]
  lastLineIdx: number
}) {
  return (
    <>
      {lines.map((line, i) => {
        const tone = TONE_CLASS[line.tone ?? 'plain']
        const isLast = i === lastLineIdx
        return (
          <div key={i} className={`${styles.line} ${tone}`}>
            <span className={styles.lineNumber}>{i + 1}</span>
            <span className={styles.lineText}>
              {line.text}
              {isLast && <Cursor />}
            </span>
          </div>
        )
      })}
    </>
  )
}

function TerminalLines({
  lines,
  lastLineIdx,
}: {
  lines: MockupLine[]
  lastLineIdx: number
}) {
  return (
    <>
      {lines.map((line, i) => {
        const tone = line.tone ?? 'plain'
        const isPrompt = tone === 'prompt'
        const isLast = i === lastLineIdx
        const text = line.text
        const promptBody = isPrompt && text.startsWith('$ ') ? text.slice(2) : text
        const rowTone = isPrompt ? styles.tonePrompt : TONE_CLASS[tone]
        return (
          <div key={i} className={`${styles.line} ${rowTone}`}>
            <span className={styles.lineText}>
              {isPrompt ? (
                <>
                  <span className={styles.promptPrefix}>{'$ '}</span>
                  {promptBody}
                  {isLast && <Cursor />}
                </>
              ) : (
                <>
                  {text}
                  {isLast && <Cursor />}
                </>
              )}
            </span>
          </div>
        )
      })}
    </>
  )
}

function DashboardRows({ lines }: { lines: MockupLine[] }) {
  return (
    <>
      {lines.map((line, i) => {
        const colon = line.text.indexOf(':')
        const hasValue = colon >= 0 && colon < line.text.length - 1
        const label = hasValue ? line.text.slice(0, colon).trim() : line.text.trim()
        const isLast = i === lines.length - 1
        const fillPct = 35 + (hashStr(line.text) % 56)
        return (
          <div key={i} className={styles.dashRow}>
            <span className={styles.dashLabel}>{label}</span>
            <span className={styles.dashBar} aria-hidden="true">
              <span
                className={styles.dashBarFill}
                style={{ width: `${hasValue ? fillPct : 12}%` }}
              />
            </span>
            {isLast && <Cursor />}
          </div>
        )
      })}
    </>
  )
}
