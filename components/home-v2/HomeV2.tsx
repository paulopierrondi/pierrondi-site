'use client'

import { Fragment, useCallback, useEffect, useMemo, useState, useRef, type ComponentType } from 'react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { COPY } from './copy'
import type { Lang, SectionId, SectionProps } from './types'
import { hv2Body, hv2Display } from './fonts'
import NavBar from './chrome/NavBar'
import SectionDots from './chrome/SectionDots'
import SectionLabel from './chrome/SectionLabel'
import HeroSection from './sections/HeroSection'
import ProofSection from './sections/ProofSection'
import ProjectsSection from './sections/ProjectsSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ContactSection from './sections/ContactSection'
import styles from './HomeV2.module.css'
import './home-v2.css'

const SECTION_COMPONENTS: Record<SectionId, ComponentType<SectionProps>> = {
  hero: HeroSection,
  projects: ProjectsSection,
  about: AboutSection,
  skills: SkillsSection,
  contact: ContactSection,
}

export interface HomeV2Props { lang: Lang }

export default function HomeV2({ lang }: HomeV2Props) {
  const copy = COPY[lang]
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const reducedMotion = useHydratedReducedMotion()

  const sectionIds = useMemo(() => copy.sections.map((section) => section.id).join(','), [copy])

  const scrollTo = useCallback(
    (target: SectionId) => {
      const el = document.getElementById(target)
      const targetHash = `#${target}`

      if (window.location.hash !== targetHash) {
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${window.location.search}${targetHash}`,
        )
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }

      el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    },
    [reducedMotion],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-hv2-section]'))
    const ratios = new Map<string, number>()

    const pickActive = () => {
      let bestId: SectionId | null = null
      let bestRatio = 0
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestId = id as SectionId
          bestRatio = ratio
        }
      }
      if (bestId) setActiveSection(bestId)
    }

    // Observe only. Never snap or scrub the document — GSAP snap + the
    // non-section proof bridge made scroll land between 100svh slides.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.hv2Section
          if (!id) continue
          if (entry.isIntersecting) ratios.set(id, entry.intersectionRatio)
          else ratios.delete(id)
        }
        pickActive()
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
        rootMargin: '-8% 0px -8% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
    // sectionIds is a stable serialization of the section list for this lang
  }, [sectionIds])

  const activeMeta = copy.sections.find((section) => section.id === activeSection) ?? copy.sections[0]
  const total = String(copy.sections.length).padStart(2, '0')

  return (
    <div
      ref={rootRef}
      className={`hv2 ${hv2Body.variable} ${hv2Display.variable} ${styles.root}`}
      data-active-section={activeSection}
    >
      <NavBar
        lang={lang}
        activeSection={activeSection}
        onNavigate={scrollTo}
      />

      <main className={styles.sections}>
        {copy.sections.map((meta) => {
          const Section = SECTION_COMPONENTS[meta.id]
          return (
            <Fragment key={meta.id}>
              <section
                id={meta.id}
                data-hv2-section={meta.id}
                data-hv2-active={meta.id === activeSection ? 'true' : 'false'}
                className={styles.section}
                aria-label={meta.label}
              >
                <Section lang={lang} />
              </section>
              {meta.id === 'hero' ? <ProofSection lang={lang} /> : null}
            </Fragment>
          )
        })}
      </main>

      <SectionDots
        sections={copy.sections}
        activeSection={activeSection}
        onNavigate={scrollTo}
        ariaLabel={lang === 'pt' ? 'Navegação de seções' : 'Section navigation'}
      />
      <SectionLabel label={activeMeta.label} index={activeMeta.index} total={total} />
    </div>
  )
}
