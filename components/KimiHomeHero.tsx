'use client'

import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import KimiNeuralNetwork from '@/components/KimiNeuralNetwork'
import type { HomeExperienceCopy } from '@/app/home-experience-copy'
import styles from '@/app/page.module.css'

interface KimiHomeHeroProps {
  copy: HomeExperienceCopy['hero']
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
  }, [])

  return (
    <section ref={sectionRef} id="top" className={styles.hero} aria-labelledby="home-title" data-kimi-hero>
      <div className={styles.heroScene} aria-hidden="true">
        <KimiNeuralNetwork />
        <div ref={portraitRef} className={styles.heroPortrait}>
          <Image
            src="/assets/paulo-pierrondi-executive-neural.jpg"
            alt=""
            fill
            sizes="(max-width: 980px) 0px, 320px"
            className={styles.heroPortraitImage}
            preload
          />
          <span className={styles.heroPortraitScan} />
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

      <div className={styles.heroContent}>
        <div className={styles.heroTextMatte} aria-hidden="true" />
        <p ref={kickerRef} className={styles.eyebrow}>
          {copy.kicker}
        </p>
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
        <p ref={leadRef} className={styles.lead}>
          {copy.lead}
        </p>
        <p ref={noteRef} className={styles.personalNote}>
          {copy.note}
        </p>
        <div ref={actionsRef} className={styles.actions}>
          <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer" data-swarm-magnetic>
            {copy.linkedIn}
          </a>
          <a href="#contact" data-swarm-magnetic>
            {copy.email}
          </a>
        </div>
      </div>
    </section>
  )
}
