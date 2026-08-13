import { Building2, Search, SlidersHorizontal } from 'lucide-react'
import type { PortfolioLang } from './portfolio-data'
import styles from './PropertyPartnerVisual.module.css'

const COPY = {
  pt: {
    brand: 'META IMÓVEIS',
    product: 'BUSCA DE PARCEIROS',
    queryLabel: 'BUSCA EM LINGUAGEM NATURAL',
    query: '2 quartos até R$ 400 mil',
    chips: ['QUARTOS 2+', 'ATÉ R$ 400 MIL', '3 RESULTADOS'],
    sources: 'FONTES DEMONSTRATIVAS',
    partners: [['Marcelino', '06'], ['Fase 4', '06']],
    resultLabel: 'OPORTUNIDADES NORMALIZADAS',
    homes: [
      ['Apartamento', 'Jardim Aquarius', 'R$ 385 mil'],
      ['Apartamento', 'Vila Ema', 'R$ 399 mil'],
      ['Casa', 'Urbanova', 'R$ 395 mil'],
    ],
    origin: 'ORIGEM PRESERVADA',
    proof: ['12 IMÓVEIS SINTÉTICOS', '2 FONTES', 'PARSING DETERMINÍSTICO'],
  },
  en: {
    brand: 'META REAL ESTATE',
    product: 'PARTNER SEARCH',
    queryLabel: 'NATURAL-LANGUAGE SEARCH',
    query: '2 bedrooms up to R$400k',
    chips: ['2+ BEDROOMS', 'UP TO R$400K', '3 RESULTS'],
    sources: 'DEMONSTRATION SOURCES',
    partners: [['Marcelino', '06'], ['Fase 4', '06']],
    resultLabel: 'NORMALIZED OPPORTUNITIES',
    homes: [
      ['Apartment', 'Jardim Aquarius', 'R$385k'],
      ['Apartment', 'Vila Ema', 'R$399k'],
      ['House', 'Urbanova', 'R$395k'],
    ],
    origin: 'SOURCE PRESERVED',
    proof: ['12 SYNTHETIC LISTINGS', '2 SOURCES', 'DETERMINISTIC PARSING'],
  },
} as const

export default function PropertyPartnerVisual({
  lang,
  mode = 'case',
}: {
  lang: PortfolioLang
  mode?: 'case' | 'spotlight'
}) {
  const t = COPY[lang]

  return (
    <div className={styles.visual} data-mode={mode} data-property-partner-visual aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.console}>
        <header className={styles.header}>
          <div className={styles.identity}>
            <span><Building2 /></span>
            <div><strong>{t.brand}</strong><small>{t.product}</small></div>
          </div>
          <div className={styles.status}><i /> PROTÓTIPO</div>
        </header>

        <div className={styles.query}>
          <small>{t.queryLabel}</small>
          <div><Search /><strong>{t.query}</strong><SlidersHorizontal /></div>
        </div>

        <div className={styles.chips}>
          {t.chips.map((chip) => <span key={chip}>{chip}</span>)}
        </div>

        <div className={styles.workspace}>
          <aside className={styles.sources}>
            <small>{t.sources}</small>
            {t.partners.map(([name, count], index) => (
              <div key={name}>
                <i data-source={index} />
                <span>{name}</span>
                <strong>{count}</strong>
              </div>
            ))}
            <p><span /> {t.origin}</p>
          </aside>

          <section className={styles.results}>
            <header><small>{t.resultLabel}</small><strong>03</strong></header>
            <div className={styles.resultGrid}>
              {t.homes.map(([type, district, price], index) => (
                <article key={district}>
                  <div className={styles.propertyImage} data-property={index}><Building2 /></div>
                  <span>{type}</span>
                  <strong>{district}</strong>
                  <small>{price}</small>
                  <i>{index === 2 ? 'F4' : 'MI'}</i>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className={styles.proofStrip}>
        {t.proof.map((proof) => <span key={proof}>{proof}</span>)}
      </div>
    </div>
  )
}
