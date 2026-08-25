'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Download, ExternalLink, ShieldCheck } from 'lucide-react'
import type { FeitosLang } from './FeitosIndexContent'
import { deliveryCases, paidAiFlow, proofMetrics, publicProofs } from './feitos-proof-data'
import styles from './FeitosCommercialProof.module.css'

const copy = {
  pt: {
    eyebrow: 'PAULO PIERRONDI · DADOS · TRABALHOS · PROVA',
    title: <>Eu transformo trabalho manual em <em>sistemas que operam.</em></>,
    lead:
      'Arquiteto de IA e automação, full-stack builder e Technical Account Executive na ServiceNow. Construo produtos, integrações e workflows com pagamento, IA, dados e entrega automática — sempre com controle e evidência.',
    role: 'AI & Automation Architect · Full-stack Builder · ServiceNow TAE',
    location: 'Brasil · projetos em PT e EN',
    explore: 'Ver provas de execução',
    print: 'Salvar como PDF',
    note: 'Resultados agregados de cases anonimizados. São evidência histórica, não promessa de resultado para novos projetos.',
    metricsEyebrow: 'NÚMEROS COM CONTEXTO',
    metricsTitle: 'Experiência registrada. Sem métrica decorativa.',
    flowEyebrow: 'ARQUITETURA PARA O SEU TIPO DE PRODUTO',
    flowTitle: 'Texto → pagamento → IA → entrega. Sem operação manual no meio.',
    flowLead:
      'Esta é a arquitetura de referência para uma v1 econômica em Next.js, Vercel e Supabase, usando Mercado Pago ou Stripe e uma API de IA server-side.',
    flowStatus: 'Fluxo de referência · não é uma integração de cliente ao vivo',
    casesEyebrow: 'TRABALHOS SELECIONADOS',
    casesTitle: 'O mecanismo muda. A disciplina de entrega permanece.',
    casesLead:
      'Clientes e empresas permanecem anonimizados. Os resultados, a escala e a arquitetura descritos abaixo vêm do histórico de execução registrado.',
    publicEyebrow: 'PRODUTOS QUE VOCÊ PODE ABRIR',
    publicTitle: 'Prova pública, não screenshot de apresentação.',
    publicLead:
      'Produtos e sistemas reais para avaliar acabamento, profundidade técnica e capacidade de levar uma ideia até uma experiência navegável.',
    open: 'Abrir produto',
    allPortfolio: 'Ver portfólio completo',
  },
  en: {
    eyebrow: 'PAULO PIERRONDI · PROFILE · WORK · PROOF',
    title: <>I turn manual work into <em>systems that operate.</em></>,
    lead:
      'AI and automation architect, full-stack builder, and Technical Account Executive at ServiceNow. I build products, integrations, and workflows with payment, AI, data, and automated delivery—with control and evidence.',
    role: 'AI & Automation Architect · Full-stack Builder · ServiceNow TAE',
    location: 'Brazil · projects in PT and EN',
    explore: 'View execution proof',
    print: 'Save as PDF',
    note: 'Aggregate results from anonymized cases. Historical evidence, not a promise of future outcomes.',
    metricsEyebrow: 'NUMBERS WITH CONTEXT',
    metricsTitle: 'Recorded experience. No decorative metrics.',
    flowEyebrow: 'ARCHITECTURE FOR THIS PRODUCT TYPE',
    flowTitle: 'Input → payment → AI → delivery. No manual operation in between.',
    flowLead:
      'A reference architecture for an economical v1 using Next.js, Vercel, Supabase, Mercado Pago or Stripe, and a server-side AI API.',
    flowStatus: 'Reference flow · not a live client integration',
    casesEyebrow: 'SELECTED WORK',
    casesTitle: 'The mechanism changes. Delivery discipline remains.',
    casesLead:
      'Clients and companies remain anonymized. The results, scale, and architecture below come from the recorded delivery history.',
    publicEyebrow: 'PRODUCTS YOU CAN OPEN',
    publicTitle: 'Public proof, not a presentation screenshot.',
    publicLead:
      'Real products and systems for assessing craft, technical depth, and the ability to turn an idea into a navigable experience.',
    open: 'Open product',
    allPortfolio: 'View full portfolio',
  },
} as const

function Metrics({ lang }: { lang: FeitosLang }) {
  const t = copy[lang]
  return (
    <section className={styles.metrics} aria-labelledby="proof-metrics-title">
      <header className={styles.sectionHeader}>
        <p>{t.metricsEyebrow}</p>
        <h2 id="proof-metrics-title">{t.metricsTitle}</h2>
      </header>
      <div className={styles.metricGrid}>
        {proofMetrics.map((metric) => (
          <article key={metric.value}>
            <strong>{metric.value}</strong>
            <h3>{metric.label[lang]}</h3>
            <p>{metric.context[lang]}</p>
          </article>
        ))}
      </div>
      <p className={styles.disclaimer}><ShieldCheck aria-hidden="true" />{t.note}</p>
    </section>
  )
}

function TransactionFlow({ lang }: { lang: FeitosLang }) {
  const t = copy[lang]
  return (
    <section className={styles.flow} aria-labelledby="paid-ai-flow-title">
      <header className={styles.flowHeader}>
        <div>
          <p className={styles.eyebrow}>{t.flowEyebrow}</p>
          <h2 id="paid-ai-flow-title">{t.flowTitle}</h2>
        </div>
        <p>{t.flowLead}</p>
      </header>
      <div className={styles.flowRail}>
        {paidAiFlow.map((stage) => (
          <article key={stage.index}>
            <div className={styles.flowIndex}><span>{stage.index}</span><i aria-hidden="true" /></div>
            <h3>{stage.title[lang]}</h3>
            <p>{stage.detail[lang]}</p>
            <code>{stage.signal}</code>
          </article>
        ))}
      </div>
      <div className={styles.flowFooter}><span aria-hidden="true" />{t.flowStatus}</div>
    </section>
  )
}

function CaseStudies({ lang }: { lang: FeitosLang }) {
  const t = copy[lang]
  return (
    <section className={styles.cases} aria-labelledby="delivery-cases-title">
      <header className={styles.caseHeader}>
        <p className={styles.eyebrow}>{t.casesEyebrow}</p>
        <h2 id="delivery-cases-title">{t.casesTitle}</h2>
        <p>{t.casesLead}</p>
      </header>
      <div className={styles.caseGrid}>
        {deliveryCases.map((item, index) => (
          <article key={item.result}>
            <div className={styles.caseTopline}><span>{String(index + 1).padStart(2, '0')}</span>{item.sector[lang]}</div>
            <h3>{item.headline[lang]}</h3>
            <strong>{item.result}</strong>
            <p>{item.detail[lang]}</p>
            <ul aria-label={lang === 'pt' ? 'Tecnologias e métodos' : 'Technologies and methods'}>
              {item.methods.map((method) => <li key={method}>{method}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function PublicProducts({ lang }: { lang: FeitosLang }) {
  const t = copy[lang]
  return (
    <section className={styles.publicProof} aria-labelledby="public-products-title">
      <header className={styles.publicHeader}>
        <p className={styles.eyebrow}>{t.publicEyebrow}</p>
        <h2 id="public-products-title">{t.publicTitle}</h2>
        <p>{t.publicLead}</p>
      </header>
      <div className={styles.productGrid}>
        {publicProofs.map((item, index) => (
          <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className={styles.productCard}>
            <div className={styles.productMedia}>
              <Image
                src={item.image}
                alt={item.imageAlt[lang]}
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
                priority={index === 0}
              />
            </div>
            <div className={styles.productBody}>
              <span>{item.label[lang]}</span>
              <h3>{item.title}</h3>
              <p>{item.detail[lang]}</p>
              <strong>{t.open}<ExternalLink aria-hidden="true" /></strong>
            </div>
          </a>
        ))}
      </div>
      <Link className={styles.portfolioLink} href={lang === 'pt' ? '/portfolio' : '/en/portfolio'}>
        {t.allPortfolio}<ArrowRight aria-hidden="true" />
      </Link>
    </section>
  )
}

export default function FeitosCommercialProof({ lang }: { lang: FeitosLang }) {
  const t = copy[lang]
  const printPage = () => window.print()

  return (
    <>
      <section className={styles.hero} aria-labelledby="feitos-profile-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroSignal} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 id="feitos-profile-title">{t.title}</h1>
          <p className={styles.lead}>{t.lead}</p>
          <dl className={styles.identity}>
            <div><dt>{lang === 'pt' ? 'Atuação' : 'Work'}</dt><dd>{t.role}</dd></div>
            <div><dt>{lang === 'pt' ? 'Base' : 'Base'}</dt><dd>{t.location}</dd></div>
          </dl>
          <div className={styles.actions}>
            <a href="#execution-proof">{t.explore}<ArrowDown aria-hidden="true" /></a>
            <button type="button" onClick={printPage}>{t.print}<Download aria-hidden="true" /></button>
          </div>
        </div>
        <div className={styles.heroLedger} aria-label={lang === 'pt' ? 'Trilha de evidência' : 'Evidence trail'}>
          <span className={styles.ledgerLabel}>EVIDENCE LEDGER / 2026</span>
          {['context.received', 'scope.bounded', 'build.verified', 'delivery.evidenced'].map((event, index) => (
            <div key={event}><i aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span><code>{event}</code><strong>PASS</strong></div>
          ))}
          <p>{lang === 'pt' ? 'Contexto → permissão → ação → evidência' : 'Context → permission → action → evidence'}</p>
        </div>
      </section>
      <div id="execution-proof">
        <Metrics lang={lang} />
        <TransactionFlow lang={lang} />
        <CaseStudies lang={lang} />
        <PublicProducts lang={lang} />
      </div>
    </>
  )
}
