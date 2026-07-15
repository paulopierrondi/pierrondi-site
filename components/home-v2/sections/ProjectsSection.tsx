'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PORTFOLIO_CASES } from '@/components/portfolio/portfolio-data'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import type { SectionProps } from '../types'
import {
  ProjectStory,
  ProjectTabs,
  ProjectsControls,
  ProjectsHeader,
  ProjectsScreenReaderList,
} from './ProjectsSectionParts'
import styles from './ProjectsSection.module.css'

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

  const paginate = useCallback(
    (delta: number) => goTo(index + delta),
    [goTo, index],
  )

  useEffect(() => {
    const rail = railRef.current
    const activeTab = rail?.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!rail || !activeTab) return

    // Center only the horizontal rail. Element.scrollIntoView() also moved the
    // document on mount, skipping hundreds of pixels past the entry hero.
    const centeredLeft =
      activeTab.offsetLeft - (rail.clientWidth - activeTab.clientWidth) / 2
    rail.scrollTo({
      left: Math.max(0, centeredLeft),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [index, reduceMotion])

  const active = items[index]
  const selectAndFocus = (next: number) => {
    const normalized = (next + items.length) % items.length
    goTo(normalized)
    requestAnimationFrame(() => {
      railRef.current
        ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        [normalized]?.focus()
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
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy))
      paginate(dx < 0 ? 1 : -1)
  }

  return (
    <section
      ref={rootRef}
      className={styles.region}
      aria-labelledby="portfolio-home-title"
    >
      <ProjectsScreenReaderList items={items} />
      <ProjectsHeader lang={lang} />

      <motion.div
        className={styles.stage}
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: reduceMotion ? 0 : 22 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ProjectTabs
          items={items}
          index={index}
          lang={lang}
          railRef={railRef}
          goTo={goTo}
          selectAndFocus={selectAndFocus}
        />
        <ProjectStory
          active={active}
          itemCount={items.length}
          lang={lang}
          direction={direction}
          reduceMotion={reduceMotion}
        />
      </motion.div>

      <ProjectsControls
        items={items}
        index={index}
        lang={lang}
        paginate={paginate}
      />
    </section>
  )
}
