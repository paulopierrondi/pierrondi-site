import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CircuitBoard,
  Code2,
  LockKeyhole,
  Network,
  ShieldCheck,
} from 'lucide-react'

import type { AuthorityLang } from '@/lib/authority/authority'
import { authorityOps, getAuthorityPage } from '@/lib/authority/authority'
import { AboutReveal, AboutStagger, AboutStaggerItem } from './AboutMotion'
import styles from './AboutAuthorityExperience.module.css'

type AuthorityPage = ReturnType<typeof getAuthorityPage>
type PositioningCopy = { statement: string; short: string }

const linkedInUrl = 'https://br.linkedin.com/in/paulopierrondi'
const icons = [CircuitBoard, ShieldCheck, Network, LockKeyhole]
const consoleCopy = {
  file: 'paulo.profile.ts',
  role: 'Technical Account Executive @ ServiceNow',
  craft: 'AI architecture + full-stack products',
  loop: 'design → build → govern → ship',
  status: 'building in public',
}

export default function AboutAuthorityExperience({ lang }: { lang: AuthorityLang }) {
  const page = getAuthorityPage(lang)
  const positioning = authorityOps.positioning[lang]
  const portfolioHref = lang === 'pt' ? '/#projects' : '/en#projects'
  const currentRole =
    lang === 'pt' ? 'Technical Account Executive na ServiceNow' : 'Technical Account Executive at ServiceNow'
  const builderRole = lang === 'pt' ? 'Arquiteto de IA · Full-stack Builder' : 'AI Architect · Full-stack Builder'
  const disclaimer =
    lang === 'pt'
      ? 'Portfólio profissional pessoal. Conteúdo independente, público e sem informação confidencial.'
      : 'Personal professional portfolio. Independent public content with no confidential information.'

  return (
    <main className={styles.page}>
      <ProfileHero
        lang={lang}
        page={page}
        positioning={positioning}
        currentRole={currentRole}
        builderRole={builderRole}
        disclaimer={disclaimer}
      />
      <AboutReveal as="section" className={styles.thesisBand}>
        <span>{lang === 'pt' ? 'POSICIONAMENTO / 01' : 'POSITIONING / 01'}</span>
        <p>{positioning.statement}</p>
      </AboutReveal>
      <OperatingQualities page={page} />
      <OperatingArchitecture lang={lang} page={page} />
      <CapabilityMap lang={lang} page={page} />
      <PublicEvidence lang={lang} page={page} portfolioHref={portfolioHref} />
      <OperatingPrinciples lang={lang} page={page} />
      <PeerCta lang={lang} page={page} portfolioHref={portfolioHref} />
    </main>
  )
}

function ProfileHero({
  lang,
  page,
  positioning,
  currentRole,
  builderRole,
  disclaimer,
}: {
  lang: AuthorityLang
  page: AuthorityPage
  positioning: PositioningCopy
  currentRole: string
  builderRole: string
  disclaimer: string
}) {
  return (
    <section className={styles.hero} aria-labelledby="authority-title">
      <div className={styles.heroGrid}>
        <AboutReveal className={styles.heroCopy}>
          <p className={styles.kicker}>{page.hero.kicker}</p>
          <div className={styles.roleLine}>
            <span className={styles.liveDot} aria-hidden="true" />
            <strong>{currentRole}</strong>
            <span>{builderRole}</span>
          </div>
          <h1 id="authority-title">{page.hero.title}</h1>
          <p className={styles.heroLead}>{page.hero.lead}</p>
          <div className={styles.heroActions}>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">
              {page.hero.primaryCta}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#architecture">
              {page.hero.secondaryCta}
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.signalStrip} aria-label={lang === 'pt' ? 'Áreas de atuação' : 'Focus areas'}>
            {page.proofStrip.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </AboutReveal>
        <IdentitySystem lang={lang} positioning={positioning} disclaimer={disclaimer} />
      </div>
    </section>
  )
}

function IdentitySystem({
  lang,
  positioning,
  disclaimer,
}: {
  lang: AuthorityLang
  positioning: PositioningCopy
  disclaimer: string
}) {
  return (
    <AboutReveal as="aside" className={styles.identitySystem} delay={0.12}>
      <div className={styles.portraitFrame}>
        <Image
          src="/assets/paulo-pierrondi-executive-neural.jpg"
          alt="Paulo Pierrondi"
          fill
          sizes="(max-width: 820px) 88vw, 430px"
          priority
        />
        <div className={styles.portraitGrid} aria-hidden="true" />
        <span className={styles.portraitLabel}>PAULO_PIERRONDI / BUILDING_IN_PUBLIC</span>
      </div>
      <div className={styles.devConsole} aria-label={lang === 'pt' ? 'Perfil em código' : 'Profile as code'}>
        <div className={styles.consoleHeader}>
          <span className={styles.consoleDots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{consoleCopy.file}</span>
          <Code2 size={14} aria-hidden="true" />
        </div>
        <div className={styles.consoleBody}>
          <p><span>const role</span> = &quot;{consoleCopy.role}&quot;</p>
          <p><span>const craft</span> = &quot;{consoleCopy.craft}&quot;</p>
          <p><span>const loop</span> = &quot;{consoleCopy.loop}&quot;</p>
          <p><span>status</span>.<strong>{consoleCopy.status.replaceAll(' ', '_')}</strong>()</p>
        </div>
      </div>
      <div className={styles.identityCopy}>
        <span>Paulo Pierrondi</span>
        <strong>{positioning.short}</strong>
        <p>{disclaimer}</p>
      </div>
    </AboutReveal>
  )
}

function OperatingQualities({ page }: { page: AuthorityPage }) {
  return (
    <section className={styles.qualitiesSection} aria-labelledby="qualities-title">
      <AboutReveal className={styles.qualitiesIntro}>
        <p className={styles.kicker}>{page.qualities.eyebrow}</p>
        <h2 id="qualities-title">{page.qualities.title}</h2>
        <p>{page.qualities.body}</p>
      </AboutReveal>
      <AboutStagger className={styles.qualitiesGrid}>
        {page.qualities.items.map((quality, index) => (
          <AboutStaggerItem key={quality.title} className={styles.qualityCard}>
            <div className={styles.qualityMeta}>
              <span>{quality.label}</span>
              <small>{String(index + 1).padStart(2, '0')}</small>
            </div>
            <h3>{quality.title}</h3>
            <p>{quality.body}</p>
          </AboutStaggerItem>
        ))}
      </AboutStagger>
    </section>
  )
}

function OperatingArchitecture({ lang, page }: { lang: AuthorityLang; page: AuthorityPage }) {
  return (
    <section id="architecture" className={styles.section} aria-labelledby="architecture-title">
      <AboutReveal className={styles.sectionHeader}>
        <p className={styles.kicker}>{lang === 'pt' ? 'Arquitetura de atuação' : 'Operating architecture'}</p>
        <h2 id="architecture-title">{page.sections[0].title}</h2>
      </AboutReveal>
      <AboutStagger className={styles.operatingGrid}>
        {page.sections.map((section, index) => (
          <AboutStaggerItem key={section.title} className={styles.operatingCard}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{section.eyebrow}</p>
            <h3>{section.title}</h3>
            <small>{section.body}</small>
          </AboutStaggerItem>
        ))}
      </AboutStagger>
    </section>
  )
}

function CapabilityMap({ lang, page }: { lang: AuthorityLang; page: AuthorityPage }) {
  return (
    <section className={styles.section} aria-labelledby="capabilities-title">
      <AboutReveal className={styles.sectionHeader}>
        <p className={styles.kicker}>Capability map</p>
        <h2 id="capabilities-title">
          {lang === 'pt' ? 'Estratégia no quadro. Código em produção.' : 'Strategy on the board. Code in production.'}
        </h2>
      </AboutReveal>
      <AboutStagger className={styles.capabilityGrid}>
        {page.capabilities.map((capability, index) => {
          const Icon = icons[index % icons.length]
          return (
            <AboutStaggerItem key={capability.title} className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <Icon size={22} aria-hidden="true" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p>{capability.label}</p>
              <h3>{capability.title}</h3>
              <small>{capability.body}</small>
            </AboutStaggerItem>
          )
        })}
      </AboutStagger>
    </section>
  )
}

function PublicEvidence({
  lang,
  page,
  portfolioHref,
}: {
  lang: AuthorityLang
  page: AuthorityPage
  portfolioHref: string
}) {
  const portfolioCta = lang === 'pt' ? 'Ver prova no portfólio' : 'See proof in the portfolio'

  return (
    <section className={styles.evidenceSection} aria-labelledby="evidence-title">
      <AboutReveal className={styles.sectionHeader}>
        <p className={styles.kicker}>{page.evidence.eyebrow}</p>
        <h2 id="evidence-title">{page.evidence.title}</h2>
        <p className={styles.sectionLead}>{page.evidence.body}</p>
      </AboutReveal>
      <AboutStagger className={styles.evidenceGrid}>
        {page.evidence.items.map((item) => (
          <AboutStaggerItem key={item.title} className={styles.evidenceCard}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <Link href={portfolioHref} className={styles.evidenceLink}>
              {portfolioCta}
              <ArrowDownRight size={15} aria-hidden="true" />
            </Link>
          </AboutStaggerItem>
        ))}
      </AboutStagger>
    </section>
  )
}

function OperatingPrinciples({ lang, page }: { lang: AuthorityLang; page: AuthorityPage }) {
  return (
    <section id="authority-os" className={styles.opsSection} aria-labelledby="ops-title">
      <AboutReveal className={styles.opsIntro}>
        <p className={styles.kicker}>Operating principles</p>
        <h2 id="ops-title">
          {lang === 'pt'
            ? 'Construir rápido não elimina governança. Exige uma melhor.'
            : 'Building fast does not remove governance. It demands a better one.'}
        </h2>
        <p>
          {lang === 'pt'
            ? 'Meu método conecta intenção, contexto, controle, ação e evidência — do desenho executivo ao commit validado.'
            : 'My method connects intent, context, control, action and evidence — from executive design to a validated commit.'}
        </p>
      </AboutReveal>
      <AboutStagger className={styles.opsGrid}>
        {page.operatingSystem.map((item, index) => (
          <AboutStaggerItem key={item} className={styles.opsItem}>
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>{item}</span>
            <small>{String(index + 1).padStart(2, '0')}</small>
          </AboutStaggerItem>
        ))}
      </AboutStagger>
    </section>
  )
}

function PeerCta({
  lang,
  page,
  portfolioHref,
}: {
  lang: AuthorityLang
  page: AuthorityPage
  portfolioHref: string
}) {
  return (
    <AboutReveal as="section" className={styles.ctaSection}>
      <div>
        <p className={styles.kicker}>{lang === 'pt' ? 'Conversa entre pares' : 'A peer conversation'}</p>
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
    </AboutReveal>
  )
}
