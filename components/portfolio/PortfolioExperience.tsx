'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ExternalLink, Layers3, MessageSquareMore, Smartphone, Workflow } from 'lucide-react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import ProjectVisual, { CaseMark } from './ProjectVisual'
import { APP_STORE_CATALOG, PORTFOLIO_CASES, type PortfolioLang } from './portfolio-data'
import styles from './PortfolioExperience.module.css'

const COPY = {
  pt: {
    eyebrow: 'PORTFÓLIO DE PRODUTO · ARQUITETURA DE IA · ENGENHARIA',
    title: <>Produtos e sistemas que provam <em>execução ponta a ponta.</em></>,
    lead: 'Do framework enterprise ao app publicado: web, iOS, Android, CRM, WhatsApp e automação com identidade, testes, governança e evidência pública.',
    explore: 'Explorar os cases',
    casesKicker: 'SETE PROJETOS / UMA DISCIPLINA DE ENTREGA',
    casesTitle: 'Cada projeto mostra uma parte diferente do trabalho.',
    casesLead: 'Produto, mobile, integração, operação e arquitetura — com papel técnico, plataformas e status verificável.',
    problem: 'O que construí',
    evidence: 'Evidência',
    platforms: 'Plataformas',
    stack: 'Stack e método',
    appsKicker: 'CATÁLOGO PÚBLICO · APP STORE',
    appsTitle: '21 apps publicados. 21 identidades reais.',
    appsLead: 'A vitrine abaixo é sincronizada com o storefront público da Apple. Os links e artworks são oficiais; nenhum monograma ou status inventado.',
    appCta: 'Ver na App Store',
    systemKicker: 'CAPACIDADE DE ENGENHARIA',
    systemTitle: 'Da interface ao pacote de distribuição.',
    systemLead: 'O portfólio não para no front-end: inclui arquitetura, APIs, persistência, automação, builds mobile e operação protegida.',
    capabilities: [
      ['Web + produto', 'Next.js, React, APIs, dados e produção', 'WEB'],
      ['iPhone e iPad', 'Swift, SwiftUI, Capacitor, StoreKit e App Store', 'IOS'],
      ['Android build', 'Kotlin, Compose, Gradle e pacotes AAB', 'AAB'],
      ['CRM + WhatsApp', 'Funis, webhooks, Salesbot e handoff humano', 'CRM'],
    ],
    ctaKicker: 'ARQUITETURA QUE VIRA SOFTWARE',
    ctaTitle: 'Quer conversar sobre um problema técnico real?',
    ctaBody: 'O foco aqui é arquitetura de IA, produtos, integrações e sistemas operáveis — sem expor clientes, dados privados ou contexto confidencial.',
    cta: 'Conversar sobre arquitetura e produtos',
  },
  en: {
    eyebrow: 'PRODUCT PORTFOLIO · AI ARCHITECTURE · ENGINEERING',
    title: <>Products and systems that prove <em>end-to-end execution.</em></>,
    lead: 'From enterprise frameworks to published apps: web, iOS, Android, CRM, WhatsApp, and automation with identity, testing, governance, and public evidence.',
    explore: 'Explore the cases',
    casesKicker: 'SEVEN PROJECTS / ONE DELIVERY DISCIPLINE',
    casesTitle: 'Each project reveals a different part of the work.',
    casesLead: 'Product, mobile, integration, operations, and architecture — with a clear technical role, platforms, and verifiable status.',
    problem: 'What I built',
    evidence: 'Evidence',
    platforms: 'Platforms',
    stack: 'Stack and method',
    appsKicker: 'PUBLIC CATALOG · APP STORE',
    appsTitle: '21 published apps. 21 real identities.',
    appsLead: 'This catalog is synchronized with Apple’s public storefront. Links and artworks are official—no invented monograms or release statuses.',
    appCta: 'View on the App Store',
    systemKicker: 'ENGINEERING CAPABILITY',
    systemTitle: 'From interface to distribution package.',
    systemLead: 'The portfolio goes beyond front-end work: architecture, APIs, persistence, automation, mobile builds, and protected operations.',
    capabilities: [
      ['Web + product', 'Next.js, React, APIs, data, and production', 'WEB'],
      ['iPhone and iPad', 'Swift, SwiftUI, Capacitor, StoreKit, and App Store', 'IOS'],
      ['Android build', 'Kotlin, Compose, Gradle, and AAB packages', 'AAB'],
      ['CRM + WhatsApp', 'Pipelines, webhooks, Salesbot, and human handoff', 'CRM'],
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
        <div className={styles.heroMosaic} aria-hidden="true">
          {APP_STORE_CATALOG.apps.slice(0, 12).map((app, index) => (
            <motion.span
              key={app.trackId}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.18 + index * 0.045, duration: reduceMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={app.icon} alt="" fill sizes="96px" />
            </motion.span>
          ))}
          <span className={styles.mosaicCount}>21<small>APPS</small></span>
        </div>
        <div className={styles.heroProof}>
          <span><Smartphone aria-hidden="true" /> App Store</span>
          <span><Layers3 aria-hidden="true" /> Web · iOS · Android</span>
          <span><MessageSquareMore aria-hidden="true" /> CRM + WhatsApp</span>
          <span><Workflow aria-hidden="true" /> Enterprise AI</span>
        </div>
      </header>

      <section id="cases" className={styles.casesIntro}>
        <p>{t.casesKicker}</p>
        <h2>{t.casesTitle}</h2>
        <span>{t.casesLead}</span>
      </section>

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
          <motion.section
            id={item.id}
            key={item.id}
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
                <span>{item.index} / {String(cases.length).padStart(2, '0')}</span>
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
        ))}
      </div>

      <section id="app-store" className={styles.appsSection} aria-labelledby="app-store-title">
        <header>
          <p>{t.appsKicker}</p>
          <h2 id="app-store-title">{t.appsTitle}</h2>
          <span>{t.appsLead}</span>
        </header>
        <div className={styles.appsGrid}>
          {APP_STORE_CATALOG.apps.map((app, index) => (
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
              <Image src={app.icon} alt={`Ícone de ${app.name}`} width={72} height={72} />
              <span>
                <strong>{app.name}</strong>
                <small>{lang === 'pt' ? CATEGORY_PT[app.category] ?? app.category : app.category}</small>
                <em>{t.appCta}<ExternalLink aria-hidden="true" /></em>
              </span>
            </motion.a>
          ))}
        </div>
        <p className={styles.catalogNote}>Apple developer ID {APP_STORE_CATALOG.developerId} · storefront {APP_STORE_CATALOG.storefront.toUpperCase()} · {APP_STORE_CATALOG.count} apps</p>
      </section>

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

      <section className={styles.closing}>
        <p>{t.ctaKicker}</p>
        <h2>{t.ctaTitle}</h2>
        <span>{t.ctaBody}</span>
        <a href={lang === 'pt' ? '/contato' : '/en/contato'}>{t.cta}<ArrowRight aria-hidden="true" /></a>
      </section>
    </main>
  )
}
