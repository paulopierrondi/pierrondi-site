'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import {
  CATALOG_CATEGORIES,
  CATALOG_EVIDENCE_LABELS,
  CATALOG_KIND_LABELS,
  MULTI_LLM_ROSTER,
  PORTFOLIO_CATALOG,
  PUBLIC_APP_STORE_APPS,
  portfolioCatalogSearchText,
  resolvePortfolioHref,
  type PortfolioCatalogCategory,
  type PortfolioCatalogEntry,
  type PortfolioLang,
} from './portfolio-catalog'
import styles from './PortfolioExperience.module.css'

const COPY = {
  pt: {
    llmKicker: 'MULTI-LLM OPERATING SYSTEM',
    llmTitle: 'Modelos diferentes. Uma operação governada.',
    llmLead:
      'Roteamento por tarefa, sensibilidade, custo e qualidade — com contexto versionado, ferramentas autorizadas, revisão independente, human gates e recibo de evidência.',
    llmFlow: ['Contexto', 'Política', 'Router', 'Modelos', 'Revisão', 'Evidência'],
    llmSystems: [
      ['Agent Hub', 'Registry, missões, handoffs e gates humanos.'],
      ['LLM Gateway', 'Roteamento, fallback, custo e telemetria por execução.'],
      ['Browser Runtime', 'Execução fixture-first, observável e limitada por política.'],
      ['Prompt Cache', 'Prefixos estáveis, deltas dinâmicos e isolamento de secrets.'],
    ],
    recentKicker: 'LABORATÓRIO DE PRODUTO · CONSTRUÇÕES RECENTES',
    recentTitle: 'Produtos recentes, apresentados como produto.',
    recentLead:
      'Sistemas funcionais que condensam descoberta, UX, arquitetura e entrega em uma experiência navegável — cada um com escopo e status explícitos.',
    openProduct: 'Abrir produto',
    seeInCatalog: 'Ver no catálogo',
    catalogKicker: 'CATÁLOGO COMPLETO · FONTE ÚNICA',
    catalogTitle: 'Tudo o que pode ser mostrado, organizado para encontrar rápido.',
    catalogLead:
      'Produtos, plataformas, apps, automações, sites, IA e sistemas enterprise — com um capability pack verificável para WordPress e Elementor. Cases reservados aparecem pela capacidade entregue, nunca por dados confidenciais.',
    searchLabel: 'Buscar no catálogo',
    searchPlaceholder: 'Busque por produto, tecnologia ou problema…',
    all: 'Tudo',
    clear: 'Limpar busca',
    result: 'projeto encontrado',
    results: 'projetos encontrados',
    noResults: 'Nenhum item corresponde a esta combinação.',
    reset: 'Mostrar catálogo completo',
    catalogNote:
      'Catálogo em nível de produto: worktrees, branches de manutenção, fornecedores e variações técnicas do mesmo sistema são consolidados para evitar duplicação artificial.',
    privateNote:
      'Privacidade por design: nomes de clientes, ambientes, dados, credenciais e métricas reservadas não entram nesta superfície pública.',
    routerLabel: 'ROTEADOR',
    routingDimensions: 'tarefa · risco · custo · qualidade',
    humanGateLabel: 'GATE HUMANO',
    liveSystemLabel: 'SISTEMA ATIVO / ROTEAMENTO GOVERNADO',
  },
  en: {
    llmKicker: 'MULTI-LLM OPERATING SYSTEM',
    llmTitle: 'Different models. One governed operation.',
    llmLead:
      'Routing by task, sensitivity, cost, and quality—with versioned context, authorized tools, independent review, human gates, and evidence receipts.',
    llmFlow: ['Context', 'Policy', 'Router', 'Models', 'Review', 'Evidence'],
    llmSystems: [
      ['Agent Hub', 'Registry, missions, handoffs, and human gates.'],
      ['LLM Gateway', 'Routing, fallback, cost, and per-run telemetry.'],
      ['Browser Runtime', 'Fixture-first execution constrained by observable policy.'],
      ['Prompt Cache', 'Stable prefixes, dynamic deltas, and secret isolation.'],
    ],
    recentKicker: 'PRODUCT LAB · RECENT BUILDS',
    recentTitle: 'Recent builds, presented as products.',
    recentLead:
      'Functional systems that compress discovery, UX, architecture, and delivery into a navigable experience—each with explicit scope and status.',
    openProduct: 'Open product',
    seeInCatalog: 'View in catalog',
    catalogKicker: 'COMPLETE CATALOG · SINGLE SOURCE',
    catalogTitle: 'Everything that can be shown, organized for fast discovery.',
    catalogLead:
      'Products, platforms, apps, automation, websites, AI, and enterprise systems—plus a verifiable WordPress and Elementor capability pack. Reserved work is represented by delivered capability, never confidential data.',
    searchLabel: 'Search the catalog',
    searchPlaceholder: 'Search by product, technology, or problem…',
    all: 'All',
    clear: 'Clear search',
    result: 'project found',
    results: 'projects found',
    noResults: 'No item matches this combination.',
    reset: 'Show complete catalog',
    catalogNote:
      'This is a product-level catalog: worktrees, maintenance branches, vendors, and technical variants of the same system are consolidated to avoid artificial duplication.',
    privateNote:
      'Privacy by design: client names, environments, data, credentials, and reserved metrics never enter this public surface.',
    routerLabel: 'ROUTER',
    routingDimensions: 'task · risk · cost · quality',
    humanGateLabel: 'HUMAN GATE',
    liveSystemLabel: 'LIVE SYSTEM / GOVERNED ROUTING',
  },
} as const

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const CREATIVE_MEDIA_SHELF = [
  {
    id: 'creative-forge',
    title: 'Creative Forge',
    src: '/portfolio/cantustudio/feature-graphic.png',
    href: { pt: '/studio#creative-forge', en: '/en/studio#creative-forge' },
    pt: {
      eyebrow: 'IMAGEM · COMPOSIÇÃO',
      summary: 'Do briefing à direção visual e às variantes de formato.',
      classification: 'ARTEFATO DE PRODUTO · CANTUSTUDIO',
      alt: 'Artefato público do CantuStudio com um fluxo de harmonização musical em interface editorial.',
    },
    en: {
      eyebrow: 'IMAGE · COMPOSITION',
      summary: 'From brief to visual direction and format variants.',
      classification: 'PRODUCT ARTIFACT · CANTUSTUDIO',
      alt: 'Public CantuStudio artifact showing a music-harmonization workflow in an editorial interface.',
    },
  },
  {
    id: 'creative-video-factory',
    title: 'Creative Video Factory',
    src: '/portfolio/studio/pierrondi-studio-review-console-v1.webp',
    href: { pt: '/studio#creative-video-factory', en: '/en/studio#creative-video-factory' },
    pt: {
      eyebrow: 'ROTEIRO · CORTE · ENTREGA',
      summary: 'Roteiro, voz, legendas, revisão e versões por canal.',
      classification: 'CENA AUTORAL · PROCESSO',
      alt: 'Cena autoral do Pierrondi Studio com console de revisão, edição e correção de cor.',
    },
    en: {
      eyebrow: 'SCRIPT · CUT · DELIVERY',
      summary: 'Scripts, voice, captions, review, and channel-ready versions.',
      classification: 'AUTHORIAL SCENE · PROCESS',
      alt: 'Pierrondi Studio authorial scene with a review console, editing, and color grading.',
    },
  },
  {
    id: 'content-engine',
    title: 'Pierrondi Content Engine',
    src: '/portfolio/studio/pierrondi-studio-storyboard-atlas-v1.webp',
    href: { pt: '/studio#content-engine', en: '/en/studio#content-engine' },
    pt: {
      eyebrow: 'BRIEFING · ROTEIRO · QA',
      summary: 'Uma fila editorial para organizar narrativa, peças e aprovação.',
      classification: 'CENA AUTORAL · PROCESSO',
      alt: 'Atlas autoral de storyboard do Pierrondi Studio com frames, marcações e notas de direção.',
    },
    en: {
      eyebrow: 'BRIEF · SCRIPT · QA',
      summary: 'An editorial queue that organizes narrative, assets, and approval.',
      classification: 'AUTHORIAL SCENE · PROCESS',
      alt: 'Pierrondi Studio authorial storyboard atlas with frames, markings, and direction notes.',
    },
  },
  {
    id: 'brand-os',
    title: 'Pierrondi Brand OS',
    src: '/portfolio/luar-do-campo/storefront-desktop.png',
    href: { pt: '/studio#brand-os', en: '/en/studio#brand-os' },
    pt: {
      eyebrow: 'IDENTIDADE · PRESENÇA',
      summary: 'Tokens, linguagem e superfícies que preservam coerência.',
      classification: 'DEMO CONCEITUAL · LUAR DO CAMPO',
      alt: 'Demo conceitual de storefront editorial Luar do Campo com painel de campanha e modelo em vestido marfim.',
    },
    en: {
      eyebrow: 'IDENTITY · PRESENCE',
      summary: 'Tokens, language, and surfaces that preserve coherence.',
      classification: 'CONCEPTUAL DEMO · LUAR DO CAMPO',
      alt: 'Luar do Campo conceptual editorial-storefront demo with a campaign panel and a model in an ivory dress.',
    },
  },
] as const

export default function PortfolioAtlas({
  lang,
  reduceMotion,
}: {
  lang: PortfolioLang
  reduceMotion: boolean
}) {
  const t = COPY[lang]
  const [activeCategory, setActiveCategory] = useState<PortfolioCatalogCategory | 'all'>('all')
  const [query, setQuery] = useState('')
  const recent = PORTFOLIO_CATALOG.filter((entry) => entry.recent)

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    return PORTFOLIO_CATALOG.filter((entry) => {
      const categoryMatches = activeCategory === 'all' || entry.category === activeCategory
      const queryMatches = !normalizedQuery || normalize(portfolioCatalogSearchText(entry)).includes(normalizedQuery)
      return categoryMatches && queryMatches
    })
  }, [activeCategory, query])

  const reset = () => {
    setActiveCategory('all')
    setQuery('')
  }

  return (
    <>
      <section id="multi-llm" className={styles.multiLlm} aria-labelledby="multi-llm-title">
        <header className={styles.atlasHeader}>
          <p>{t.llmKicker}</p>
          <h2 id="multi-llm-title">{t.llmTitle}</h2>
          <span>{t.llmLead}</span>
        </header>

        <div className={styles.llmConsole} data-system-label={t.liveSystemLabel}>
          <div className={styles.llmFlow} aria-label={t.llmFlow.join(', ')}>
            {t.llmFlow.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < t.llmFlow.length - 1 && <ArrowRight aria-hidden="true" />}
              </div>
            ))}
          </div>

          <div className={styles.llmRoster}>
            <div className={styles.llmCore}>
              <BrainCircuit aria-hidden="true" />
              <span>{t.routerLabel}</span>
              <strong>MULTI-LLM</strong>
              <small>{t.routingDimensions}</small>
            </div>
            <div className={styles.modelGrid}>
              {MULTI_LLM_ROSTER.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: reduceMotion ? 0 : 0.34, delay: reduceMotion ? 0 : index * 0.045 }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{model.name}</strong>
                  <small>{model.role[lang]}</small>
                </motion.div>
              ))}
            </div>
            <div className={styles.llmGate}>
              <ShieldCheck aria-hidden="true" />
              <span>{t.humanGateLabel}</span>
              <strong>{lang === 'pt' ? 'Aprovação antes da ação sensível' : 'Approval before sensitive action'}</strong>
              <small>{lang === 'pt' ? 'push · deploy · produção · dados · publicação' : 'push · deploy · production · data · publishing'}</small>
            </div>
          </div>

          <div className={styles.llmSystems}>
            {t.llmSystems.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <Check aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recentes" className={styles.recentProducts} aria-labelledby="recent-products-title">
        <header className={styles.atlasHeader}>
          <p>{t.recentKicker}</p>
          <h2 id="recent-products-title">{t.recentTitle}</h2>
          <span>{t.recentLead}</span>
        </header>

        <div className={styles.recentGrid}>
          {recent.map((entry, index) => (
            <motion.article
              key={entry.id}
              data-category={entry.category}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : (index % 4) * 0.05 }}
            >
              <div className={styles.recentTopline}>
                <span>{CATALOG_KIND_LABELS[entry.kind][lang]}</span>
                <small>{entry.status[lang]}</small>
              </div>
              <div className={styles.productGlyph} aria-hidden="true">
                <span>{entry.shortCode}</span>
                <i />
              </div>
              <p>{CATALOG_CATEGORIES[entry.category].label[lang]}</p>
              <h3>{entry.name}</h3>
              <span className={styles.productSummary}>{entry.summary[lang]}</span>
              <div className={styles.productTags}>
                {entry.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <a
                href={resolvePortfolioHref(entry, lang) ?? `#catalog-${entry.id}`}
                target={entry.external ? '_blank' : undefined}
                rel={entry.external ? 'noreferrer' : undefined}
              >
                {entry.href ? entry.cta?.[lang] ?? t.openProduct : t.seeInCatalog}
                {entry.external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="catalogo" className={styles.catalog} aria-labelledby="catalog-title">
        <header className={styles.atlasHeader}>
          <p>{t.catalogKicker}</p>
          <h2 id="catalog-title">{t.catalogTitle}</h2>
          <span>{t.catalogLead}</span>
        </header>

        <div className={styles.catalogMetrics}>
          <div><strong>{PORTFOLIO_CATALOG.length}</strong><span>{lang === 'pt' ? 'entradas catalogadas' : 'catalog entries'}</span></div>
          <div><strong>{CATALOG_CATEGORIES_ORDER.length}</strong><span>{lang === 'pt' ? 'disciplinas' : 'disciplines'}</span></div>
          <div><strong>{PUBLIC_APP_STORE_APPS.length}</strong><span>{lang === 'pt' ? 'apps independentes' : 'independent apps'}</span></div>
          <div><strong>{MULTI_LLM_ROSTER.length}</strong><span>{lang === 'pt' ? 'lanes de modelo' : 'model lanes'}</span></div>
        </div>

        <div className={styles.catalogControls}>
          <label className={styles.catalogSearch}>
            <span className={styles.srOnly}>{t.searchLabel}</span>
            <Search aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label={t.clear}>
                <X aria-hidden="true" />
              </button>
            )}
          </label>

          <div className={styles.catalogFilters} role="group" aria-label={lang === 'pt' ? 'Filtrar por disciplina' : 'Filter by discipline'}>
            <button
              type="button"
              aria-pressed={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            >
              {t.all}<span>{PORTFOLIO_CATALOG.length}</span>
            </button>
            {CATALOG_CATEGORIES_ORDER.map((category) => {
              const categoryData = CATALOG_CATEGORIES[category]
              const count = PORTFOLIO_CATALOG.filter((entry) => entry.category === category).length
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {categoryData.label[lang]}<span>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.catalogResultLine} aria-live="polite">
          <span>{String(filtered.length).padStart(2, '0')}</span>
          <p>{filtered.length === 1 ? t.result : t.results}</p>
          <i />
        </div>

        {activeCategory === 'creative-media' && !query && (
          <CreativeMediaShelf lang={lang} reduceMotion={reduceMotion} />
        )}

        {filtered.length > 0 ? (
          <div className={styles.catalogGrid}>
            {filtered.map((entry, index) => (
              <CatalogCard key={entry.id} entry={entry} index={index} lang={lang} />
            ))}
          </div>
        ) : (
          <div className={styles.catalogEmpty}>
            <Sparkles aria-hidden="true" />
            <p>{t.noResults}</p>
            <button type="button" onClick={reset}>{t.reset}</button>
          </div>
        )}

        <footer className={styles.catalogFooter}>
          <p>{t.catalogNote}</p>
          <span><ShieldCheck aria-hidden="true" />{t.privateNote}</span>
        </footer>
      </section>
    </>
  )
}

function CreativeMediaShelf({
  lang,
  reduceMotion,
}: {
  lang: PortfolioLang
  reduceMotion: boolean
}) {
  const copy = lang === 'pt'
    ? {
        eyebrow: 'PIERRONDI STUDIO · FRENTES EM FOCO',
        title: 'Quatro sistemas para dar forma, ritmo e consistência ao conteúdo.',
        lead: 'Uma leitura visual das frentes criativas. Os nove itens técnicos permanecem catalogados logo abaixo.',
        cta: 'Ver sistema',
        note: 'Cenas autorais, artefatos de produto e demos conceituais — não registros de cliente ou resultados de mídia.',
      }
    : {
        eyebrow: 'PIERRONDI STUDIO · FOCUSED PRACTICES',
        title: 'Four systems that give content form, rhythm, and consistency.',
        lead: 'A visual reading of the creative practices. The nine technical items remain cataloged just below.',
        cta: 'View system',
        note: 'Authorial scenes, product artifacts, and conceptual demos—not client records or media results.',
      }

  return (
    <section className={styles.creativeMediaShelf} data-creative-media-shelf aria-labelledby="creative-media-shelf-title">
      <header className={styles.creativeMediaShelfHeader}>
        <p>{copy.eyebrow}</p>
        <h3 id="creative-media-shelf-title">{copy.title}</h3>
        <span>{copy.lead}</span>
      </header>

      <div className={styles.creativeMediaShelfGrid}>
        {CREATIVE_MEDIA_SHELF.map((item, index) => {
          const itemCopy = item[lang]

          return (
            <motion.a
              key={item.id}
              href={item.href[lang]}
              className={styles.creativeMediaShelfCard}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : index * 0.04 }}
            >
              <div className={styles.creativeMediaShelfMedia}>
                <Image src={item.src} alt={itemCopy.alt} fill sizes="(max-width: 560px) 43vw, (max-width: 1050px) 30vw, 19vw" />
              </div>
              <div className={styles.creativeMediaShelfCopy}>
                <p>{itemCopy.eyebrow}</p>
                <h4>{item.title}</h4>
                <span>{itemCopy.summary}</span>
                <small>{itemCopy.classification}</small>
                <strong>{copy.cta}<ArrowRight aria-hidden="true" /></strong>
              </div>
            </motion.a>
          )
        })}
      </div>

      <p className={styles.creativeMediaShelfNote}>{copy.note}</p>
    </section>
  )
}

const CATALOG_CATEGORIES_ORDER = Object.keys(CATALOG_CATEGORIES) as PortfolioCatalogCategory[]

function CatalogCard({
  entry,
  index,
  lang,
}: {
  entry: PortfolioCatalogEntry
  index: number
  lang: PortfolioLang
}) {
  const href = resolvePortfolioHref(entry, lang)

  return (
    <article id={`catalog-${entry.id}`} className={styles.catalogCard} data-category={entry.category}>
      <div className={styles.catalogCardTopline}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <small>{CATALOG_KIND_LABELS[entry.kind][lang]}</small>
        {entry.featured && <em>{lang === 'pt' ? 'Destaque' : 'Featured'}</em>}
      </div>
      <div className={styles.catalogCardIdentity}>
        <span aria-hidden="true">{entry.shortCode}</span>
        <div>
          <p>{CATALOG_CATEGORIES[entry.category].label[lang]}</p>
          <h3>{entry.name}</h3>
        </div>
      </div>
      <p className={styles.catalogCardSummary}>{entry.summary[lang]}</p>
      <div className={styles.catalogProof}>
        <small>{lang === 'pt' ? 'O que prova' : 'What it proves'} · {CATALOG_EVIDENCE_LABELS[entry.evidence][lang]}</small>
        <p>{entry.proof[lang]}</p>
      </div>
      <div className={styles.catalogCardBottom}>
        <div>
          {entry.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <strong>{entry.status[lang]}</strong>
      </div>
      {href && (
        <a href={href} target={entry.external ? '_blank' : undefined} rel={entry.external ? 'noreferrer' : undefined}>
          {entry.cta?.[lang] ?? (lang === 'pt' ? 'Abrir evidência' : 'Open evidence')}
          {entry.external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </a>
      )}
    </article>
  )
}
