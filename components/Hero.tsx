'use client'

import Link from 'next/link'
import styles from './Hero.module.css'

export function Hero(_props: { lang?: string } = {}) {
  return (
    <section className={styles.hero}>
      {/* Spotlight glow backdrop */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.headline}>
          Seu site precisa vender mais<br />do que explicar.
        </h1>
        <p className={styles.subhead}>
          Landing pages de conversão, automações com n8n, agentes de IA e produtos digitais
          entregues com direção técnica real. Em até 4 semanas, código seu.
        </p>
        <div className={styles.ctas}>
          <Link href="#contato" className={styles.ctaPrimary}>
            Diagnóstico gratuito
          </Link>
          <Link href="#servicos" className={styles.ctaSecondary}>
            Ver serviços
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
