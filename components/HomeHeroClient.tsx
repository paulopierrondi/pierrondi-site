'use client'

import dynamic from 'next/dynamic'
import { useState, type PointerEvent } from 'react'
import type { HomeExperienceCopy } from '@/app/home-experience-copy'
import styles from '@/app/page.module.css'

const KimiNeuralNetwork = dynamic(() => import('@/components/KimiNeuralNetwork'), { ssr: false })
const PortraitHologram = dynamic(() => import('@/components/PortraitHologram'), { ssr: false })

interface HomeHeroClientProps {
  copy: HomeExperienceCopy['hero']
}

export default function HomeHeroClient({ copy }: HomeHeroClientProps) {
  const [portraitActive, setPortraitActive] = useState(false)

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
    setPortraitActive(false)
  }

  return (
    <div className={styles.heroScene} aria-hidden="true">
      <KimiNeuralNetwork />
      <div
        className={styles.heroPortrait}
        data-portrait-active={portraitActive ? 'true' : 'false'}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') setPortraitActive(true)
        }}
        onPointerMove={handlePortraitMove}
        onPointerLeave={(event) => resetPortrait(event.currentTarget)}
        onPointerCancel={(event) => resetPortrait(event.currentTarget)}
      >
        <div className={styles.heroPortraitDepth}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/paulo-pierrondi-hologram-ai.png"
            alt=""
            className={styles.heroPortraitImage}
          />
          <PortraitHologram active={portraitActive} />
          <span className={styles.heroPortraitReticle} />
          <span className={styles.heroPortraitPulse} />
          <span className={styles.heroPortraitScan} />
        </div>
      </div>
      <div className={styles.agentPanel}>
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
