import { ArrowRight } from 'lucide-react'
import FsoHeroEffects from './FsoHeroEffects'
import styles from './FsoExperience.module.css'

const LIVE_APP = 'https://csdm-validator-production.up.railway.app'

export default function FsoHeroServer() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBg}>
        <FsoHeroEffects />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
      </div>

      <div className={styles.heroInner} data-fso-hero-inner>
        <div className={styles.heroChips} data-fso-hero-chips>
          <span className={styles.chip}><span className={styles.chipDot} /> ServiceNow</span>
          <span className={styles.chip}>FSO · Financial Services Operations</span>
          <span className={styles.chip}>IRM · risk by design</span>
          <span className={styles.chip}>Action Fabric · MCP · Fluent SDK</span>
        </div>
        <h1 className={styles.heroTitle} data-fso-hero-title>
          Automation-first <em>ServiceNow implementation</em>
        </h1>
        <p className={styles.heroLede} data-fso-hero-lede>
          The future arrived: <strong>FSO, IRM and AI Control Tower</strong> running as one governed
          operating model. External coding agents author the build; native Now Assist and Action Fabric
          execute at runtime; IRM decides how much autonomy each action is allowed to have.
        </p>
        <div className={styles.heroMeta} data-fso-hero-meta>
          {[
            ['Audience', 'ServiceNow internal'],
            ['Product', 'FSO + IRM'],
            ['Outcome', 'Governed automation'],
          ].map(([label, value]) => (
            <div key={label} className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>{label}</span>
              <span className={styles.heroMetaValue}>{value}</span>
            </div>
          ))}
        </div>
        <div className={styles.heroCtas} data-fso-hero-ctas>
          <a className={styles.ctaPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">
            Open live example <ArrowRight size={16} strokeWidth={2.2} />
          </a>
          <a className={styles.ctaGhost} href="#pilot">90-day pilot</a>
        </div>
      </div>
    </header>
  )
}
