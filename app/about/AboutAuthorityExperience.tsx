import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, CircuitBoard, LockKeyhole, Network, ShieldCheck } from 'lucide-react'

import type { AuthorityLang } from '@/lib/authority/authority'
import { authorityOps, getAuthorityPage } from '@/lib/authority/authority'
import styles from './AboutAuthorityExperience.module.css'

const linkedInUrl = 'https://br.linkedin.com/in/paulopierrondi'

const icons = [CircuitBoard, ShieldCheck, Network, LockKeyhole]

export default function AboutAuthorityExperience({ lang }: { lang: AuthorityLang }) {
  const page = getAuthorityPage(lang)
  const positioning = authorityOps.positioning[lang]
  const portfolioHref = lang === 'pt' ? '/paulo' : '/en'
  const architectureLabel = lang === 'pt' ? 'Arquitetura de operacao' : 'Operating architecture'
  const budgetLabel = lang === 'pt' ? 'Uso dos USD 40' : 'USD 40 use'
  const queueLabel = lang === 'pt' ? 'Fila editorial manual' : 'Manual editorial queue'
  const disclaimer =
    lang === 'pt'
      ? 'Conteudo pessoal. Nao e canal oficial da ServiceNow e nao usa informacao confidencial.'
      : 'Personal content. Not an official ServiceNow channel and does not use confidential information.'

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="authority-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{page.hero.kicker}</p>
            <h1 id="authority-title">{page.hero.title}</h1>
            <p className={styles.heroLead}>{page.hero.lead}</p>
            <div className={styles.heroActions}>
              <a href={linkedInUrl} target="_blank" rel="noreferrer">
                {page.hero.primaryCta}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#architecture">{page.hero.secondaryCta}</a>
            </div>
            <div className={styles.signalStrip} aria-label="Authority signals">
              {page.proofStrip.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>

          <aside className={styles.identitySystem} aria-label="Paulo Pierrondi">
            <div className={styles.portraitFrame}>
              <Image
                src="/assets/paulo-pierrondi-executive-neural.jpg"
                alt="Paulo Pierrondi"
                fill
                sizes="(max-width: 820px) 70vw, 360px"
                priority
              />
            </div>
            <div className={styles.identityCopy}>
              <span>Paulo Pierrondi</span>
              <strong>{positioning.short}</strong>
              <p>{disclaimer}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.thesisBand} aria-label="Positioning statement">
        <p>{positioning.statement}</p>
      </section>

      <section id="architecture" className={styles.section} aria-labelledby="architecture-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{architectureLabel}</p>
          <h2 id="architecture-title">{page.sections[0].title}</h2>
        </div>
        <div className={styles.operatingGrid}>
          {page.sections.map((section, index) => (
            <article key={section.title} className={styles.operatingCard}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{section.eyebrow}</p>
              <h3>{section.title}</h3>
              <small>{section.body}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="capabilities-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Capability map</p>
          <h2 id="capabilities-title">
            {lang === 'pt' ? 'Onde eu consigo criar valor agora.' : 'Where I can create value now.'}
          </h2>
        </div>
        <div className={styles.capabilityGrid}>
          {page.capabilities.map((capability, index) => {
            const Icon = icons[index % icons.length]
            return (
              <article key={capability.title} className={styles.capabilityCard}>
                <Icon size={24} aria-hidden="true" />
                <span>{capability.label}</span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="authority-os" className={styles.opsSection} aria-labelledby="ops-title">
        <div>
          <p className={styles.kicker}>Authority Ops</p>
          <h2 id="ops-title">
            {lang === 'pt'
              ? 'A operacao no Railway fica simples: conteudo build-time, aprovacao humana e zero escrita em runtime.'
              : 'The Railway operation stays simple: build-time content, human approval and zero runtime writes.'}
          </h2>
        </div>
        <div className={styles.opsGrid}>
          {page.operatingSystem.map((item) => (
            <div key={item} className={styles.opsItem}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="budget-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{budgetLabel}</p>
          <h2 id="budget-title">
            {lang === 'pt'
              ? 'Dinheiro compra consistencia, nao substitui a casa propria.'
              : 'The budget buys consistency, not a replacement for the owned surface.'}
          </h2>
        </div>
        <div className={styles.budgetGrid}>
          {authorityOps.budgetPlan.map((item) => (
            <article key={item.item}>
              <span>{item.monthlyUsd ? `USD ${item.monthlyUsd}` : 'Free'}</span>
              <h3>{item.item}</h3>
              <p>{item.use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="queue-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{queueLabel}</p>
          <h2 id="queue-title">
            {lang === 'pt'
              ? 'A primeira campanha e ServiceNow-only e fica em rascunho ate aprovacao.'
              : 'The first campaign is ServiceNow-only and stays draft-only until approval.'}
          </h2>
        </div>
        <div className={styles.queueGrid}>
          {authorityOps.contentQueue.map((item) => (
            <article key={item.id}>
              <span>{item.status.replace('_', ' ')}</span>
              <h3>{item.theme}</h3>
              <p>{item.hook}</p>
              <small>{item.cta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="authority-cta-title">
        <div>
          <p className={styles.kicker}>Next conversation</p>
          <h2 id="authority-cta-title">{page.cta.title}</h2>
          <p>{page.cta.body}</p>
        </div>
        <div className={styles.ctaActions}>
          <a href={linkedInUrl} target="_blank" rel="noreferrer">
            {page.cta.primary}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link href={portfolioHref}>{page.cta.secondary}</Link>
        </div>
      </section>
    </main>
  )
}
