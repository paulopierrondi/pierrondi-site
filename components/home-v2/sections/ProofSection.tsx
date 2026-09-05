'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { deliveryCases } from '@/app/feitos/feitos-proof-data'
import { COPY } from '../copy'
import type { SectionProps } from '../types'
import styles from './ProofSection.module.css'

const HOME_PROOF_CASES = deliveryCases.slice(0, 2)

export default function ProofSection({ lang }: SectionProps) {
  const proof = COPY[lang].proof

  return (
    <aside id="proof" className={styles.root} aria-labelledby="home-proof-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.ledger}>{proof.ledgerLabel}</span>
            <span aria-hidden="true"> · </span>
            {proof.eyebrow}
          </p>
          <div className={styles.titleRow}>
            <h2 id="home-proof-heading">{proof.heading}</h2>
            <p className={styles.lead}>{proof.lead}</p>
          </div>
        </header>

        <div className={styles.grid}>
          {HOME_PROOF_CASES.map((item, index) => (
            <article key={item.result} className={styles.card}>
              <div className={styles.topline}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.sector[lang]}
              </div>
              <h3>{item.headline[lang]}</h3>
              <strong>{item.result}</strong>
              <p>{item.detail[lang]}</p>
              <ul aria-label={lang === 'pt' ? 'Tecnologias e métodos' : 'Technologies and methods'}>
                {item.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Link className={styles.cta} href={proof.cta.href}>
          {proof.cta.label}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}
