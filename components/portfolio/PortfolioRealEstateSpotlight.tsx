'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Database, ScanSearch, Waypoints } from 'lucide-react'
import type { PortfolioLang } from './portfolio-data'
import PortfolioLink from './PortfolioLink'
import PropertyPartnerVisual from './PropertyPartnerVisual'
import styles from './PortfolioRealEstateSpotlight.module.css'

const PRODUCT_URL = 'https://meta-busca-parceiros-production.up.railway.app/'

const COPY = {
  pt: {
    index: '01 / NOVO CASE',
    eyebrow: 'PROPTECH · BUSCA COMPLEMENTAR · PROVENIÊNCIA',
    title: <>Uma frase de busca vira um <em>mapa claro de oportunidades.</em></>,
    lead: 'Meta Busca Parceiros normaliza catálogos, traduz intenção em filtros visíveis e preserva a origem do imóvel até a ficha detalhada.',
    status: 'PROTÓTIPO FUNCIONAL PÚBLICO',
    primary: 'Testar a busca pública',
    secondary: 'Ver case completo',
    facts: [
      ['12', 'imóveis sintéticos', Database],
      ['2', 'fontes demonstrativas', Waypoints],
      ['Texto → filtro', 'parsing determinístico', ScanSearch],
    ],
    boundary: 'Demonstração controlada: sem integração viva, coleta agendada, armazenamento de leads ou envio real de WhatsApp.',
  },
  en: {
    index: '01 / NEW CASE',
    eyebrow: 'PROPTECH · PARTNER SEARCH · PROVENANCE',
    title: <>One search phrase becomes a <em>clear opportunity map.</em></>,
    lead: 'Meta Partner Search normalizes catalogs, turns intent into visible filters, and preserves property provenance through the detail view.',
    status: 'PUBLIC FUNCTIONAL PROTOTYPE',
    primary: 'Try the public search',
    secondary: 'View full case',
    facts: [
      ['12', 'synthetic listings', Database],
      ['2', 'demonstration sources', Waypoints],
      ['Text → filter', 'deterministic parsing', ScanSearch],
    ],
    boundary: 'Controlled demonstration: no live integration, scheduled collection, lead storage, or real WhatsApp delivery.',
  },
} as const

export default function PortfolioRealEstateSpotlight({
  lang,
  reduceMotion,
}: {
  lang: PortfolioLang
  reduceMotion: boolean
}) {
  const t = COPY[lang]

  return (
    <section
      id="property-partner-search-spotlight"
      className={styles.spotlight}
      aria-labelledby="property-partner-search-title"
      data-property-partner-spotlight
    >
      <div className={styles.watermark} aria-hidden="true">PPS</div>
      <motion.article
        className={styles.copy}
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.topline}>
          <span>{t.index}</span>
          <strong><i />{t.status}</strong>
        </div>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 id="property-partner-search-title">{t.title}</h2>
        <p className={styles.lead}>{t.lead}</p>

        <div className={styles.actions}>
          <PortfolioLink href={PRODUCT_URL} external className={styles.primary}>
            {t.primary}<ArrowUpRight aria-hidden="true" />
          </PortfolioLink>
          <PortfolioLink href="#property-partner-search" className={styles.secondary}>
            {t.secondary}<ArrowDown aria-hidden="true" />
          </PortfolioLink>
        </div>

        <div className={styles.facts}>
          {t.facts.map(([value, label, Icon]) => (
            <div key={label}>
              <Icon aria-hidden="true" />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className={styles.boundary}>{t.boundary}</p>
      </motion.article>

      <motion.div
        className={styles.visual}
        initial={false}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <PropertyPartnerVisual lang={lang} mode="spotlight" />
      </motion.div>
    </section>
  )
}
