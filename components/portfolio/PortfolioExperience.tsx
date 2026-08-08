'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, BrainCircuit, ExternalLink, Globe2, Layers3, Smartphone } from 'lucide-react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import PortfolioAtlas from './PortfolioAtlas'
import ProjectVisual, { CaseMark } from './ProjectVisual'
import PortfolioEvidenceMosaic from './PortfolioEvidenceMosaic'
import { MULTI_LLM_ROSTER, PORTFOLIO_CATALOG, PUBLIC_APP_STORE_APPS } from './portfolio-catalog'
import {
  APP_STORE_CATALOG,
  PORTFOLIO_CASES,
  type PortfolioCase,
  type PortfolioLang,
} from './portfolio-data'
import styles from './PortfolioExperience.module.css'

const COPY = {
  pt: {
    eyebrow: 'PORTFÓLIO TOTAL · PRODUTO · IA · ENGENHARIA',
    title: <>Tudo o que construí. <em>Organizado para encontrar rápido.</em></>,
    lead: 'Do framework enterprise ao produto publicado: um catálogo completo de sistemas, apps, sites, automações e operações multi-LLM — além de um capability pack verificável para WordPress e Elementor.',
    explore: 'Explorar o portfólio',
    casesKicker: 'CASES EM DESTAQUE · PROFUNDIDADE ANTES DA ESCALA',
    casesTitle: 'Os projetos que melhor explicam como eu construo.',
    casesLead: 'Uma leitura editorial dos produtos emblemáticos. O catálogo total, pesquisável e filtrável, vem logo depois.',
    problem: 'O que construí',
    evidence: 'Evidência',
    platforms: 'Plataformas',
    stack: 'Stack e método',
    appsKicker: 'CATÁLOGO PÚBLICO · APP STORE',
    appsTitle: '20 apps independentes. 20 identidades reais.',
    appsLead: 'A vitrine pública abaixo é sincronizada com o storefront da Apple. Os links e artworks são oficiais; trabalhos enterprise reservados ficam fora desta superfície.',
    appCta: 'Ver na App Store',
    systemKicker: 'CAPACIDADE DE ENGENHARIA',
    systemTitle: 'Uma disciplina. Muitas superfícies.',
    systemLead: 'Do CMS à App Store, do workflow ao multi-LLM: arquitetura, interface, dados, automação, distribuição, governança e handoff.',
    capabilities: [
      ['Produtos web', 'Next.js, React, APIs, dados, autenticação e operação', 'WEB'],
      ['Apps & mobile', 'SwiftUI, Capacitor, StoreKit, iOS, iPadOS e Android', 'APP'],
      ['Multi-LLM & agentes', 'Roteamento, RAG, MCP, evals, cache, fallback e human gates', 'LLM'],
      ['Automação & CRM', 'n8n, webhooks, filas, WhatsApp, Kommo e observabilidade', 'OPS'],
      ['WordPress & Elementor', 'Páginas, templates, blogs, formulários, SEO, tracking e handoff', 'CMS'],
      ['Creative systems', 'Brand OS, conteúdo, slides, áudio, vídeo e design systems', 'LAB'],
    ],
    ctaKicker: 'ARQUITETURA QUE VIRA SOFTWARE',
    ctaTitle: 'Quer conversar sobre um problema técnico real?',
    ctaBody: 'O foco aqui é arquitetura de IA, produtos, integrações e sistemas operáveis — sem expor clientes, dados privados ou contexto confidencial.',
    cta: 'Conversar sobre arquitetura e produtos',
  },
  en: {
    eyebrow: 'COMPLETE PORTFOLIO · PRODUCT · AI · ENGINEERING',
    title: <>Everything I built. <em>Organized for fast discovery.</em></>,
    lead: 'From enterprise frameworks to shipped products: a complete catalog of systems, apps, websites, automation, and multi-LLM operations—plus a verifiable WordPress and Elementor capability pack.',
    explore: 'Explore the portfolio',
    casesKicker: 'FEATURED CASES · DEPTH BEFORE SCALE',
    casesTitle: 'The projects that best explain how I build.',
    casesLead: 'An editorial view of the flagship products. The complete searchable, filterable catalog follows next.',
    problem: 'What I built',
    evidence: 'Evidence',
    platforms: 'Platforms',
    stack: 'Stack and method',
    appsKicker: 'PUBLIC CATALOG · APP STORE',
    appsTitle: '20 independent apps. 20 real identities.',
    appsLead: 'This public showcase is synchronized with Apple’s storefront. Links and artworks are official; reserved enterprise work stays off this surface.',
    appCta: 'View on the App Store',
    systemKicker: 'ENGINEERING CAPABILITY',
    systemTitle: 'One discipline. Many surfaces.',
    systemLead: 'From CMS to App Store and workflow to multi-LLM: architecture, interface, data, automation, distribution, governance, and handoff.',
    capabilities: [
      ['Web products', 'Next.js, React, APIs, data, authentication, and operations', 'WEB'],
      ['Apps & mobile', 'SwiftUI, Capacitor, StoreKit, iOS, iPadOS, and Android', 'APP'],
      ['Multi-LLM & agents', 'Routing, RAG, MCP, evals, cache, fallback, and human gates', 'LLM'],
      ['Automation & CRM', 'n8n, webhooks, queues, WhatsApp, Kommo, and observability', 'OPS'],
      ['WordPress & Elementor', 'Pages, templates, blogs, forms, SEO, tracking, and handoff', 'CMS'],
      ['Creative systems', 'Brand OS, content, slides, audio, video, and design systems', 'LAB'],
    ],
    ctaKicker: 'ARCHITECTURE THAT BECOMES SOFTWARE',
    ctaTitle: 'Want to discuss a real technical problem?',
    ctaBody: 'The focus here is AI architecture, products, integrations, and operational systems—without exposing clients, private data, or confidential context.',
    cta: 'Discuss architecture and products',
  },
} as const

const CATEGORY_PT: Record<string, string> = {
  Education: 'Educação',
  Productivity: 'Produtividade',
  Games: 'Jogos',
  Music: 'Música',
  Finance: 'Finanças',
  Lifestyle: 'Lifestyle',
  Utilities: 'Utilidades',
  'Photo & Video': 'Foto e vídeo',
  'Health & Fitness': 'Saúde e fitness',
  Entertainment: 'Entretenimento',
}

type PortfolioCopy = (typeof COPY)[PortfolioLang]

export default function PortfolioExperience({ lang }: { lang: PortfolioLang }) {
  const t = COPY[lang]
  const cases = PORTFOLIO_CASES[lang]
  const reduceMotion = useHydratedReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, reduceMotion ? 0 : -44])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.11], [1, reduceMotion ? 1 : 0.35])

  return (
    <main className={styles.page}>
      <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <motion.div className={styles.heroCopy} style={{ y: heroY, opacity: heroOpacity }}>
          <p>{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <div className={styles.heroBottom}>
            <p>{t.lead}</p>
            <a href="#cases">{t.explore}<ArrowDown aria-hidden="true" /></a>
          </div>
        </motion.div>
        <PortfolioEvidenceMosaic lang={lang} reduceMotion={reduceMotion} />
        <div className={styles.heroProof}>
          <span><Layers3 aria-hidden="true" /> {PORTFOLIO_CATALOG.length} {lang === 'pt' ? 'entradas' : 'entries'}</span>
          <span><Smartphone aria-hidden="true" /> {PUBLIC_APP_STORE_APPS.length} App Store</span>
          <span><BrainCircuit aria-hidden="true" /> {MULTI_LLM_ROSTER.length} Multi-LLM</span>
          <span><Globe2 aria-hidden="true" /> Web · CMS · Enterprise</span>
        </div>
      </header>

      <PortfolioCases lang={lang} cases={cases} t={t} reduceMotion={reduceMotion} />
      <PortfolioAtlas lang={lang} reduceMotion={reduceMotion} />
      <AppCatalog lang={lang} t={t} reduceMotion={reduceMotion} />
      <Capabilities t={t} reduceMotion={reduceMotion} />
      <PortfolioClosing lang={lang} t={t} />
    </main>
  )
}

function PortfolioCases({
  lang,
  cases,
  t,
  reduceMotion,
}: {
  lang: PortfolioLang
  cases: PortfolioCase[]
  t: PortfolioCopy
  reduceMotion: boolean
}) {
  return (
    <>
      <section id="cases" className={styles.casesIntro}>
        <p>{t.casesKicker}</p>
        <h2>{t.casesTitle}</h2>
        <span>{t.casesLead}</span>
      </section>

      <div className={styles.caseCollection}>
        <nav className={styles.caseIndex} aria-label={lang === 'pt' ? 'Índice de projetos' : 'Project index'}>
          {cases.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <CaseMark item={item} size={34} />
              <span>{item.index}</span>
              <strong>{item.navLabel}</strong>
            </a>
          ))}
        </nav>

        <div className={styles.caseList}>
          {cases.map((item, index) => (
            <PortfolioCaseStudy
              key={item.id}
              item={item}
              index={index}
              total={cases.length}
              lang={lang}
              t={t}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </>
  )
}

function PortfolioCaseStudy({
  item,
  index,
  total,
  lang,
  t,
  reduceMotion,
}: {
  item: PortfolioCase
  index: number
  total: number
  lang: PortfolioLang
  t: PortfolioCopy
  reduceMotion: boolean
}) {
  return (
    <motion.section
      id={item.id}
      className={styles.case}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.caseVisual} data-order={index % 2 === 0 ? 'visual-first' : 'copy-first'}>
        <ProjectVisual item={item} lang={lang} />
      </div>
      <article className={styles.caseCopy}>
        <div className={styles.caseMeta}>
          <span>{item.index} / {String(total).padStart(2, '0')}</span>
          <span>{item.status}</span>
        </div>
        <p className={styles.caseEyebrow}>{item.eyebrow}</p>
        <h2>{item.headline}</h2>

        <div className={styles.caseNarrative}>
          <div>
            <small>{t.problem}</small>
            <p>{item.description}</p>
          </div>
          <div>
            <small>{t.evidence}</small>
            <p>{item.proof}</p>
          </div>
        </div>

        <dl className={styles.caseFacts}>
          {item.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.taxonomy}>
          <div>
            <small>{t.platforms}</small>
            <p>{item.platforms.join(' · ')}</p>
          </div>
          <div>
            <small>{t.stack}</small>
            <p>{item.stack.join(' · ')}</p>
          </div>
        </div>

        <div className={styles.caseActions}>
          <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
            {item.cta}{item.external ? <ExternalLink aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
          </a>
          {item.secondaryHref && (
            <a href={item.secondaryHref} target="_blank" rel="noreferrer" className={styles.secondaryLink}>
              {item.secondaryCta}<ExternalLink aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    </motion.section>
  )
}

function AppCatalog({
  lang,
  t,
  reduceMotion,
}: {
  lang: PortfolioLang
  t: PortfolioCopy
  reduceMotion: boolean
}) {
  return (
    <section id="app-store" className={styles.appsSection} aria-labelledby="app-store-title">
        <header>
          <p>{t.appsKicker}</p>
          <h2 id="app-store-title">{t.appsTitle}</h2>
          <span>{t.appsLead}</span>
        </header>
        <div className={styles.appsGrid}>
          {PUBLIC_APP_STORE_APPS.map((app, index) => (
            <motion.a
              key={app.trackId}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : (index % 5) * 0.035 }}
            >
              <Image src={app.icon} alt={lang === 'pt' ? `Ícone de ${app.name}` : `Icon for ${app.name}`} width={72} height={72} />
              <span>
                <strong>{app.name}</strong>
                <small>{lang === 'pt' ? CATEGORY_PT[app.category] ?? app.category : app.category}</small>
                <em>{t.appCta}<ExternalLink aria-hidden="true" /></em>
              </span>
            </motion.a>
          ))}
        </div>
        <p className={styles.catalogNote}>Apple developer ID {APP_STORE_CATALOG.developerId} · storefront {APP_STORE_CATALOG.storefront.toUpperCase()} · {PUBLIC_APP_STORE_APPS.length} {lang === 'pt' ? 'apps independentes exibidos' : 'independent apps shown'}</p>
    </section>
  )
}

function Capabilities({
  t,
  reduceMotion,
}: {
  t: PortfolioCopy
  reduceMotion: boolean
}) {
  return (
    <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <header>
          <p>{t.systemKicker}</p>
          <h2 id="capabilities-title">{t.systemTitle}</h2>
          <span>{t.systemLead}</span>
        </header>
        <div>
          {t.capabilities.map(([title, copy, code], index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <strong>{code}</strong>
            </motion.article>
          ))}
        </div>
    </section>
  )
}

function PortfolioClosing({ lang, t }: { lang: PortfolioLang; t: PortfolioCopy }) {
  return (
    <section className={styles.closing}>
      <p>{t.ctaKicker}</p>
      <h2>{t.ctaTitle}</h2>
      <span>{t.ctaBody}</span>
      <a href={lang === 'pt' ? '/contato' : '/en/contato'}>{t.cta}<ArrowRight aria-hidden="true" /></a>
    </section>
  )
}
