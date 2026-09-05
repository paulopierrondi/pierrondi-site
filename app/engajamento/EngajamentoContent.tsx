import Link from 'next/link'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import { getWhatsAppHref } from '@/lib/contact'
import styles from '@/app/atuacao/Atuacao.module.css'
import {
  ENGAJAMENTO_COPY,
  ENGAJAMENTO_ROUTES,
  ENGAJAMENTO_WHATSAPP,
  type EngajamentoLang,
} from './engajamento-copy'

export type { EngajamentoLang }

export default function EngajamentoContent({ lang }: { lang: EngajamentoLang }) {
  const copy = ENGAJAMENTO_COPY[lang]
  const route = ENGAJAMENTO_ROUTES[lang]
  const whatsappHref = getWhatsAppHref(ENGAJAMENTO_WHATSAPP[lang])

  return (
    <main className={styles.main}>
      {copy.blocks.map((block) => (
        <section key={block.id} id={block.id} className={styles.svc} aria-labelledby={`${block.id}-title`}>
          <div className={styles.row}>
            <aside className={styles.aside}>
              <Reveal>
                <span className={styles.no}>{block.no}</span>
                <h2 id={`${block.id}-title`}>{block.category}</h2>
                <p className={styles.outcome}>{block.outcome}</p>
                <Link href={route.contact} className={styles.cta}>
                  {lang === 'pt' ? 'Conversar sobre isso' : 'Talk about this'} <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </aside>

            <div className={styles.body}>
              <Reveal>
                <p className={styles.desc}>{block.desc}</p>
              </Reveal>

              <RevealStagger className={styles.list} staggerDelay={0.05}>
                {block.items.map((item) => (
                  <RevealStaggerItem key={item.k}>
                    <div className={styles.li}>
                      <span className={styles.k}>{item.k}</span>
                      <span className={styles.t}>{item.t}</span>
                    </div>
                  </RevealStaggerItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </section>
      ))}

      <section id="prova" className={styles.svc} aria-labelledby="prova-title">
        <div className={styles.row}>
          <aside className={styles.aside}>
            <Reveal>
              <span className={styles.no}>04</span>
              <h2 id="prova-title">{copy.proof.h2}</h2>
              <p className={styles.outcome}>
                {lang === 'pt' ? 'Só o que já está publicado em /feitos.' : 'Only what is already published on /feitos.'}
              </p>
              <Link href={route.proof} className={styles.cta}>
                {copy.proof.cta} <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </aside>
          <div className={styles.body}>
            <Reveal>
              <p className={styles.desc}>{copy.proof.p}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <Reveal>
          <h2>{copy.final.h2}</h2>
          <p>{copy.final.p}</p>
          <div className={styles.finalActions}>
            <Link href={route.contact} className={styles.btnPrimary}>
              {copy.final.contact} <span aria-hidden="true">→</span>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              {copy.final.whatsapp} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p>{copy.disclaimer}</p>
        </Reveal>
      </section>
    </main>
  )
}
