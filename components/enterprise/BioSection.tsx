import Reveal from '@/components/Reveal'
import styles from './BioSection.module.css'

interface BioSectionProps {
  eyebrow: string
  lede: string
  paragraphs: string[]
  creds: Array<{ k: string; v: string }>
  status: string
  loc: string
}

export default function BioSection({
  eyebrow,
  lede,
  paragraphs,
  creds,
  status,
  loc,
}: BioSectionProps) {
  return (
    <section className={styles.bio} id="bio" aria-labelledby="bio-title">
      <div className={styles.grid}>
        <div className={styles.identityPanel}>
          <Reveal>
            <div className={styles.frame} aria-label={`${status}. ${loc}`}>
              <div className={styles.meta}>
                <span className={styles.status}>
                  <span className={styles.live} aria-hidden="true" />
                  {status}
                </span>
                <span className={styles.loc}>{loc}</span>
              </div>
              <div className={styles.signalStack} aria-hidden="true">
                {creds.slice(0, 3).map((cred) => (
                  <span key={cred.k}>{cred.v}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className={styles.body}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className={styles.lede} id="bio-title">
              {lede.split('valor').map((part, index, arr) => (
                <span key={index}>
                  {part}
                  {index < arr.length - 1 && <em>valor</em>}
                </span>
              ))}
            </p>
          </Reveal>

          {paragraphs.map((p, index) => (
            <Reveal key={index} delay={0.1 + index * 0.02}>
              <p className={styles.paragraph}>{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.05}>
            <div className={styles.creds}>
              {creds.map((cred) => (
                <div key={cred.k} className={styles.cred}>
                  <div className={styles.credKey}>{cred.k}</div>
                  <div className={styles.credValue}>{cred.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
