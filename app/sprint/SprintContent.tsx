import Link from 'next/link'
import Reveal from '@/components/Reveal'
import FaqAccordion from '@/components/ui/FaqAccordion'
import {
  SPRINT_OFFER,
  sprintPayWhatsAppHref,
  sprintSupportWhatsAppHref,
} from './sprint-content'
import styles from './Sprint.module.css'

export default function SprintContent() {
  const offer = SPRINT_OFFER

  return (
    <main className={styles.main}>
      <section className={styles.intro} aria-labelledby="sprint-intro-title">
        <Reveal>
          <p className={styles.eyebrow}>Oferta fixa · escopo fechado</p>
          <h2 id="sprint-intro-title" className={styles.sectionTitle}>
            {offer.name}
          </h2>
          <p className={styles.sectionBody}>{offer.promise}</p>
          <div className={styles.priceCard}>
            <div className={styles.priceRow}>
              <span className={styles.pricePrimary}>{offer.priceBrl}</span>
              <span className={styles.priceSecondary}>{offer.priceUsd}</span>
            </div>
            <p className={styles.priceNote}>{offer.billing}</p>
            <p className={styles.priceNote}>{offer.window}</p>
          </div>
        </Reveal>
      </section>

      <section className={styles.grid2} aria-labelledby="sprint-scope-title">
        <Reveal>
          <div className={styles.listBlock}>
            <h3 id="sprint-scope-title">Inclui</h3>
            <ul>
              {offer.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className={`${styles.listBlock} ${styles.excludes}`}>
            <h3>Não inclui</h3>
            <ul>
              {offer.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className={styles.acceptance} aria-labelledby="sprint-acceptance-title">
        <Reveal>
          <p className={styles.eyebrow}>Aceite testável</p>
          <h2 id="sprint-acceptance-title" className={styles.sectionTitle}>
            O que precisa passar para dar por entregue
          </h2>
          <div className={styles.checkList}>
            {offer.acceptance.map((item, index) => (
              <div key={item} className={styles.checkItem}>
                <span className={styles.checkMark}>{String(index + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className={styles.proof} aria-labelledby="sprint-proof-title">
        <Reveal>
          <p className={styles.eyebrow}>Uma prova pública</p>
          <h2 id="sprint-proof-title" className={styles.sectionTitle}>
            Mesmo tipo de problema, escala registrada
          </h2>
          <div className={styles.proofCard}>
            <strong>{offer.proof.headline}</strong>
            <p>{offer.proof.detail}</p>
            <Link href={offer.proof.href} className={styles.proofLink}>
              Ver agregados em /feitos <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className={styles.buy} aria-labelledby="sprint-buy-title">
        <Reveal>
          <p className={styles.eyebrow}>Como comprar</p>
          <h2 id="sprint-buy-title" className={styles.sectionTitle}>
            Pague, depois preencha o kickoff
          </h2>
          <p className={styles.sectionBody}>
            Sem call de vendas. O fluxo é: pagamento confirmado → formulário de kickoff completo →
            acessos no ar → 7 dias de execução.
          </p>
          <div className={styles.ctaRow}>
            <a
              href={sprintPayWhatsAppHref}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaPrimary}
            >
              Chamar no WhatsApp pra pagar <span aria-hidden="true">→</span>
            </a>
            <a
              href={sprintSupportWhatsAppHref}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaSecondary}
            >
              Comprovante travou? WhatsApp
            </a>
          </div>
          <p className={styles.paymentNote}>
            Links de Pix e Wise serão enviados na conversa do WhatsApp — não há chave ou URL de
            pagamento publicada nesta página.
          </p>
          <div className={styles.kickoffBanner}>
            <p>
              <strong>Já pagou?</strong> O relógio de 7 dias começa quando o formulário estiver
              completo e os acessos tiverem chegado.
            </p>
            <Link href="/sprint/kickoff" className={styles.ctaSecondary}>
              Abrir formulário de kickoff <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className={styles.faq} aria-labelledby="sprint-faq-title">
        <Reveal>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="sprint-faq-title" className={styles.sectionTitle}>
            Perguntas diretas
          </h2>
          <FaqAccordion items={[...offer.faq]} />
        </Reveal>
      </section>
    </main>
  )
}
