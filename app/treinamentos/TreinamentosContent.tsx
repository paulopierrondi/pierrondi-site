import Link from 'next/link'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import type { HomeLang } from '@/lib/i18n/site-language'
import { TREINAMENTOS_COPY } from './treinamentos-content'
import styles from './Treinamentos.module.css'

const LINKEDIN_URL = 'https://br.linkedin.com/in/paulopierrondi'

const routes: Record<HomeLang, { contact: string; proof: string }> = {
  pt: { contact: '/contato', proof: '/feitos' },
  en: { contact: '/en/contato', proof: '/en/feitos' },
}

export default function TreinamentosContent({ lang }: { lang: HomeLang }) {
  const copy = TREINAMENTOS_COPY[lang]
  const route = routes[lang]

  return (
    <main className={styles.main}>
      <section className={styles.thesis} aria-labelledby="treinamentos-thesis">
        <Reveal>
          <p className={styles.eyebrow}>{copy.thesis.eyebrow}</p>
          <h2 id="treinamentos-thesis">{copy.thesis.title}</h2>
          <p className={styles.thesisBody}>{copy.thesis.body}</p>
        </Reveal>
      </section>

      <section className={styles.tracks} aria-labelledby="treinamentos-tracks">
        <Reveal>
          <p className={styles.eyebrow}>{copy.tracks.eyebrow}</p>
          <h2 id="treinamentos-tracks" className={styles.sectionTitle}>
            {copy.tracks.title}
          </h2>
        </Reveal>

        {copy.tracks.items.map((track) => (
          <article
            key={track.id}
            id={track.id}
            className={styles.track}
            aria-labelledby={`${track.id}-title`}
          >
            <div className={styles.row}>
              <aside className={styles.aside}>
                <Reveal>
                  <span className={styles.no}>{track.no}</span>
                  <h3 id={`${track.id}-title`}>{track.category}</h3>
                  <p className={styles.level}>{track.level}</p>
                  <p className={styles.outcome}>{track.outcome}</p>
                  <Link href={route.contact} className={styles.cta}>
                    {copy.trackCta} <span aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              </aside>

              <div className={styles.body}>
                <Reveal>
                  <p className={styles.trackTitle}>{track.title}</p>
                  <p className={styles.desc}>{track.desc}</p>
                  <p className={styles.audience}>{track.audience}</p>
                </Reveal>

                <RevealStagger className={styles.list} staggerDelay={0.05}>
                  {track.modules.map((module, index) => (
                    <RevealStaggerItem key={module}>
                      <div className={styles.li}>
                        <span className={styles.k}>{String(index + 1).padStart(2, '0')}</span>
                        <span className={styles.t}>{module}</span>
                      </div>
                    </RevealStaggerItem>
                  ))}
                </RevealStagger>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.formats} aria-labelledby="treinamentos-formats">
        <Reveal>
          <p className={styles.eyebrow}>{copy.formats.eyebrow}</p>
          <h2 id="treinamentos-formats" className={styles.sectionTitle}>
            {copy.formats.title}
          </h2>
          <p className={styles.sectionBody}>{copy.formats.body}</p>
        </Reveal>

        <RevealStagger className={styles.formatList} staggerDelay={0.05}>
          {copy.formats.items.map((format) => (
            <RevealStaggerItem key={format.id}>
              <div className={styles.formatRow}>
                <h3 className={styles.formatName}>{format.name}</h3>
                <p className={styles.formatDuration}>{format.duration}</p>
                <p className={styles.formatDesc}>{format.desc}</p>
              </div>
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <Reveal>
          <p className={styles.delivery}>{copy.formats.delivery}</p>
        </Reveal>
      </section>

      <section className={styles.method} aria-labelledby="treinamentos-method">
        <Reveal>
          <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
          <h2 id="treinamentos-method" className={styles.sectionTitle}>
            {copy.method.title}
          </h2>
        </Reveal>

        <RevealStagger className={styles.methodList} staggerDelay={0.05}>
          {copy.method.items.map((item, index) => (
            <RevealStaggerItem key={item}>
              <div className={styles.methodItem}>
                <span className={styles.k}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.t}>{item}</span>
              </div>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </section>

      <section className={styles.final}>
        <Reveal>
          <h2>{copy.final.h2}</h2>
          <p>{copy.final.p}</p>
          <div className={styles.finalActions}>
            <Link href={route.contact} className={styles.btnPrimary}>
              {copy.final.primary} <span aria-hidden="true">→</span>
            </Link>
            <Link href={route.proof} className={styles.btnGhost}>
              {copy.final.secondary} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={styles.linkedin}>
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </section>

      <p className={styles.disclaimer}>{copy.disclaimer}</p>
    </main>
  )
}
