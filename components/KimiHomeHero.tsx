'use client'

import { Fragment, useLayoutEffect, useRef, useState, type PointerEvent, type RefObject } from 'react'
import gsap from 'gsap'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const KimiNeuralNetwork = dynamic(() => import('@/components/KimiNeuralNetwork'), { ssr: false })
const PortraitHologram = dynamic(() => import('@/components/PortraitHologram'), { ssr: false })
import type { HomeExperienceCopy } from '@/app/home-experience-copy'
import styles from '@/app/page.module.css'

interface KimiHomeHeroProps {
  copy: HomeExperienceCopy['hero']
}

type HeroRef<T extends HTMLElement> = RefObject<T | null>

interface HeroAnimationRefs {
  sectionRef: HeroRef<HTMLElement>
  kickerRef: HeroRef<HTMLParagraphElement>
  leadRef: HeroRef<HTMLParagraphElement>
  noteRef: HeroRef<HTMLParagraphElement>
  actionsRef: HeroRef<HTMLDivElement>
  portraitRef: HeroRef<HTMLDivElement>
  panelRef: HeroRef<HTMLDivElement>
}

const proofEase: [number, number, number, number] = [0.2, 0.8, 0.2, 1]

function useKimiHeroAnimation({
  sectionRef,
  kickerRef,
  leadRef,
  noteRef,
  actionsRef,
  portraitRef,
  panelRef,
}: HeroAnimationRefs) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-hero-word]')
      const rows = gsap.utils.toArray<HTMLElement>('[data-agent-row]')
      const actions = actionsRef.current ? Array.from(actionsRef.current.children) : []

      gsap.set([kickerRef.current, leadRef.current, noteRef.current, portraitRef.current, panelRef.current, ...actions], {
        autoAlpha: 0,
      })
      gsap.set(words, {
        autoAlpha: 0,
        y: 36,
        rotateX: -32,
        transformPerspective: 900,
      })
      gsap.set(rows, { autoAlpha: 0, x: 18 })

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.12 })

      timeline
        .fromTo(kickerRef.current, { x: -28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55 }, 0)
        .to(
          words,
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.78,
            stagger: { each: 0.045, from: 'start' },
          },
          0.28
        )
        .fromTo(leadRef.current, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.68 }, 0.92)
        .fromTo(noteRef.current, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, 1.12)
        .fromTo(actions, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 1.24)
        .fromTo(
          portraitRef.current,
          { x: 36, rotate: -4, scale: 0.96, autoAlpha: 0 },
          { x: 0, rotate: -1.5, scale: 1, autoAlpha: 1, duration: 0.72 },
          0.84
        )
        .fromTo(panelRef.current, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.62 }, 1.05)
        .to(rows, { x: 0, autoAlpha: 1, duration: 0.42, stagger: 0.06 }, 1.28)
    }, section)

    return () => context.revert()
  }, [actionsRef, kickerRef, leadRef, noteRef, panelRef, portraitRef, sectionRef])
}

function HeroScene({
  copy,
  portraitRef,
  panelRef,
  portraitActive,
  onPortraitActiveChange,
}: {
  copy: HomeExperienceCopy['hero']
  portraitRef: HeroRef<HTMLDivElement>
  panelRef: HeroRef<HTMLDivElement>
  portraitActive: boolean
  onPortraitActiveChange: (active: boolean) => void
}) {
  const handlePortraitMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    event.currentTarget.style.setProperty('--portrait-local-x', x.toFixed(4))
    event.currentTarget.style.setProperty('--portrait-local-y', y.toFixed(4))
    event.currentTarget.style.setProperty('--portrait-rotate-x', `${(y * -6).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--portrait-rotate-y', `${(x * 7).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--portrait-image-x', `${(x * -18).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--portrait-image-y', `${(y * -16).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--portrait-hologram-x', `${(x * 34).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--portrait-hologram-y', `${(y * 28).toFixed(2)}px`)
  }

  const resetPortrait = (target: HTMLDivElement) => {
    target.style.setProperty('--portrait-local-x', '0')
    target.style.setProperty('--portrait-local-y', '0')
    target.style.setProperty('--portrait-rotate-x', '0deg')
    target.style.setProperty('--portrait-rotate-y', '0deg')
    target.style.setProperty('--portrait-image-x', '0px')
    target.style.setProperty('--portrait-image-y', '0px')
    target.style.setProperty('--portrait-hologram-x', '0px')
    target.style.setProperty('--portrait-hologram-y', '0px')
    onPortraitActiveChange(false)
  }

  return (
    <div className={styles.heroScene} aria-hidden="true">
      <KimiNeuralNetwork />
      <div
        ref={portraitRef}
        className={styles.heroPortrait}
        data-portrait-active={portraitActive ? 'true' : 'false'}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') onPortraitActiveChange(true)
        }}
        onPointerMove={handlePortraitMove}
        onPointerLeave={(event) => resetPortrait(event.currentTarget)}
        onPointerCancel={(event) => resetPortrait(event.currentTarget)}
      >
        <div className={styles.heroPortraitDepth}>
          <Image
            src="/assets/paulo-pierrondi-hologram-ai.png"
            alt=""
            fill
            sizes="(max-width: 980px) 0px, 536px"
            className={styles.heroPortraitImage}
            preload
          />
          <PortraitHologram active={portraitActive} />
          <span className={styles.heroPortraitReticle} />
          <span className={styles.heroPortraitPulse} />
          <span className={styles.heroPortraitScan} />
        </div>
      </div>
      <div ref={panelRef} className={styles.agentPanel}>
        <span className={styles.agentPanelLabel}>{copy.agentPanelLabel}</span>
        {copy.agentSignals.map(([label, value]) => (
          <span key={label} className={styles.agentPanelRow} data-agent-row>
            <i aria-hidden="true" />
            <strong>{label}</strong>
            <b aria-hidden="true">-&gt;</b>
            <em>{value}</em>
          </span>
        ))}
      </div>
    </div>
  )
}

function HeroHeadline({
  copy,
  headlineRef,
}: {
  copy: HomeExperienceCopy['hero']
  headlineRef: HeroRef<HTMLHeadingElement>
}) {
  return (
    <h1 id="home-title" ref={headlineRef} aria-label={copy.ariaLabel}>
      {copy.headlineLines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          <span className={styles.heroWordLine}>
            {line.map((word, wordIndex) => (
              <Fragment key={word.text}>
                <span
                  data-hero-word
                  className={'accent' in word ? `${styles.heroWord} ${styles.heroAccent}` : styles.heroWord}
                >
                  {word.text}
                </span>
                {wordIndex < line.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
          {lineIndex < copy.headlineLines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}

function HeroActions({
  copy,
  actionsRef,
}: {
  copy: HomeExperienceCopy['hero']
  actionsRef: HeroRef<HTMLDivElement>
}) {
  return (
    <div ref={actionsRef} className={styles.actions}>
      <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer" data-swarm-magnetic>
        {copy.linkedIn}
      </a>
      <a href="#thesis" data-swarm-magnetic>
        {copy.proofCta}
      </a>
      <a href="#contact" className={styles.ctaWarm} data-swarm-magnetic>
        {copy.proofCta === 'Ver modelo operacional' ? 'Conversar agora' : 'Talk now'}
      </a>
    </div>
  )
}

function HeroProof({ copy }: { copy: HomeExperienceCopy['hero'] }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={styles.heroProof}
      aria-label={copy.proofIntro}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: 1.42, duration: 0.62, ease: proofEase }}
    >
      <p>{copy.proofIntro}</p>
      <div>
        {copy.proofStrip.map((item, index) => (
          <motion.span
            key={item.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 1.58 + index * 0.055, duration: 0.42, ease: proofEase }}
          >
            <strong>{item.label}</strong>
            <b>{item.title}</b>
            <em>{item.copy}</em>
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function KimiHomeHero({ copy }: KimiHomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const kickerRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [portraitActive, setPortraitActive] = useState(false)

  useKimiHeroAnimation({
    sectionRef,
    kickerRef,
    leadRef,
    noteRef,
    actionsRef,
    portraitRef,
    panelRef,
  })

  return (
    <section ref={sectionRef} id="top" className={styles.hero} aria-labelledby="home-title" data-kimi-hero>
      <HeroScene
        copy={copy}
        portraitRef={portraitRef}
        panelRef={panelRef}
        portraitActive={portraitActive}
        onPortraitActiveChange={setPortraitActive}
      />

      <div className={styles.heroContent}>
        <div className={styles.heroTextMatte} aria-hidden="true" />
        <p ref={kickerRef} className={styles.eyebrow}>
          {copy.kicker}
        </p>
        <HeroHeadline copy={copy} headlineRef={headlineRef} />
        <p ref={leadRef} className={styles.lead}>
          {copy.lead}
        </p>
        <HeroActions copy={copy} actionsRef={actionsRef} />
        <HeroProof copy={copy} />
        <p ref={noteRef} className={styles.personalNote}>
          {copy.note}
        </p>
      </div>
    </section>
  )
}
