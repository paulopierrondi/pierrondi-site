import type { SectionProps } from '../types'
import styles from './HeroSection.module.css'

export function HeroTelemetry({ lang }: { lang: SectionProps['lang'] }) {
  const isPt = lang === 'pt'
  return (
    <>
      <div className={styles.sceneMeta} aria-hidden="true">
        <span>{isPt ? 'MODELO OPERACIONAL / 001' : 'OPERATING MODEL / 001'}</span>
        <span className={styles.sceneStatus}>
          <i /> {isPt ? 'EVIDÊNCIA ATIVA' : 'EVIDENCE LOCK'}
        </span>
      </div>
      <div className={styles.orbitalData} aria-hidden="true">
        <span>EVENT HORIZON</span>
        <strong>{isPt ? 'intent → evidence' : 'intent → evidence'}</strong>
        <i />
        <small>context · control · action · human gate</small>
      </div>
      <div className={styles.scaleMarker} aria-hidden="true">
        <span>{isPt ? 'OBSERVADOR / HUMANO' : 'OBSERVER / HUMAN'}</span>
        <i />
      </div>
    </>
  )
}
