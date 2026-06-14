import { Fragment } from 'react'
import type { HomeExperienceCopy } from '@/app/home-experience-copy'
import HomeHeroClient from './HomeHeroClient'
import styles from '@/app/page.module.css'

interface HomeHeroServerProps {
  copy: HomeExperienceCopy['hero']
}

export default function HomeHeroServer({ copy }: HomeHeroServerProps) {
  let wordIndex = 0

  return (
    <section id="top" className={styles.hero} aria-labelledby="home-title" data-kimi-hero>
      <HomeHeroClient copy={copy} />

      <div className={styles.heroContent} data-hero-content>
        <div className={styles.heroTextMatte} aria-hidden="true" />
        <p className={styles.eyebrow} data-hero-kicker>
          {copy.kicker}
        </p>
        <h1 id="home-title" aria-label={copy.ariaLabel} data-hero-headline>
          {copy.headlineLines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              <span className={styles.heroWordLine}>
                {line.map((word, wordIndexInLine) => {
                  const index = wordIndex++
                  return (
                    <Fragment key={word.text}>
                      <span
                        data-hero-word
                        className={'accent' in word ? `${styles.heroWord} ${styles.heroAccent}` : styles.heroWord}
                        style={{ '--word-index': index } as React.CSSProperties}
                      >
                        {word.text}
                      </span>
                      {wordIndexInLine < line.length - 1 ? ' ' : null}
                    </Fragment>
                  )
                })}
              </span>
              {lineIndex < copy.headlineLines.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>
        <p className={styles.lead} data-hero-lead>
          {copy.lead}
        </p>
        <div className={styles.actions} data-hero-actions>
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
        <div className={styles.heroProof} aria-label={copy.proofIntro} data-hero-proof>
          <p>{copy.proofIntro}</p>
          <div>
            {copy.proofStrip.map((item, proofIndex) => (
              <span key={item.label} data-hero-proof-item style={{ '--proof-index': proofIndex } as React.CSSProperties}>
                <strong>{item.label}</strong>
                <b>{item.title}</b>
                <em>{item.copy}</em>
              </span>
            ))}
          </div>
        </div>
        <p className={styles.personalNote} data-hero-note>
          {copy.note}
        </p>
      </div>
    </section>
  )
}
