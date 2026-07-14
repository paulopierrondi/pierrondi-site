'use client'

import { useCallback, useEffect, useMemo, useState, useRef, type ComponentType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { COPY } from './copy'
import type { Lang, SectionId, SectionProps } from './types'
import { hv2Body, hv2Display } from './fonts'
import NavBar from './chrome/NavBar'
import SectionDots from './chrome/SectionDots'
import SectionLabel from './chrome/SectionLabel'
import HeroSection from './sections/HeroSection'
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
      el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    },
    [reducedMotion],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-hv2-section]', root)

      sections.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(el.dataset.hv2Section as SectionId)
            }
          },
        })
      })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
        const snapTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
        })
        return () => snapTrigger.kill()
      })
    }, root)

    return () => ctx.revert()
    // sectionIds is a stable serialization of the section list for this lang
  }, [sectionIds])

  const activeMeta = copy.sections.find((section) => section.id === activeSection) ?? copy.sections[0]
  const total = String(copy.sections.length).padStart(2, '0')

  return (
    <div ref={rootRef} className={`hv2 ${hv2Body.variable} ${hv2Display.variable} ${styles.root}`}>
      <NavBar
        lang={lang}
        activeSection={activeSection}
        onNavigate={scrollTo}
      />

      <main className={styles.sections}>
        {copy.sections.map((meta) => {
          const Section = SECTION_COMPONENTS[meta.id]
          return (
            <section
              key={meta.id}
              id={meta.id}
              data-hv2-section={meta.id}
              className={styles.section}
              aria-label={meta.label}
            >
              <Section lang={lang} />
            </section>
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
