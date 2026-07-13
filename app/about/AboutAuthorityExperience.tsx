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

const linkedInUrl = 'https://br.linkedin.com/in/paulopierrondi'
const icons = [CircuitBoard, ShieldCheck, Network, LockKeyhole]

export default function AboutAuthorityExperience({ lang }: { lang: AuthorityLang }) {
  const page = getAuthorityPage(lang)
  const positioning = authorityOps.positioning[lang]
  const portfolioHref = lang === 'pt' ? '/#projects' : '/en#projects'
  const architectureLabel = lang === 'pt' ? 'Arquitetura de atuação' : 'Operating architecture'
  const currentRole =
    lang === 'pt' ? 'Technical Account Executive na ServiceNow' : 'Technical Account Executive at ServiceNow'
  const builderRole = lang === 'pt' ? 'Arquiteto de IA · Full-stack Builder' : 'AI Architect · Full-stack Builder'
  const disclaimer =
    lang === 'pt'
      ? 'Portfólio profissional pessoal. Conteúdo independente, público e sem informação confidencial.'
      : 'Personal professional portfolio. Independent public content with no confidential information.'
  const consoleCopy =
    lang === 'pt'
      ? {
          file: 'paulo.profile.ts',
          role: 'Technical Account Executive @ ServiceNow',
          craft: 'AI architecture + full-stack products',
          loop: 'design → build → govern → ship',
          status: 'building in public',
        }
      : {
          file: 'paulo.profile.ts',
          role: 'Technical Account Executive @ ServiceNow',
          craft: 'AI architecture + full-stack products',
          loop: 'design → build → govern → ship',
          status: 'building in public',
        }
  const publicOperatingItems =
    lang === 'pt'
      ? [
          'Tese executiva antes da ferramenta',
          'Contexto, política, permissão e evidência antes da autonomia',
          'Código versionado, testável e observável antes de escalar',
          'Human gates para decisões com risco ou publicação externa',
          'Nenhum nome de cliente, roadmap, incidente ou material confidencial',
        ]
      : [
          'Executive thesis before tooling',
          'Context, policy, permission and evidence before autonomy',
          'Versioned, testable and observable code before scale',
          'Human gates for risky decisions or external publishing',
          'No client names, roadmaps, incidents or confidential material',
        ]
  const evidenceItems =
    lang === 'pt'
      ? [
          {
            label: 'Enterprise',
            title: 'Contexto operacional real',
            body: 'Atuação em conta de grande escala, governança, plataforma, CSDM/CMDB e narrativa executiva para serviços financeiros.',
          },
          {
            label: 'AgentOps',
            title: 'IA com sistema operacional',
            body: 'Preflight, handoffs, memória, permissões, avaliação, human gates e rastreabilidade incorporados ao método.',
          },
          {
            label: 'Full-stack',
            title: 'Produtos que saem do diagrama',
            body: 'Aplicações web e iOS, automações e sistemas agênticos funcionando como prova pública de engenharia aplicada.',
          },
        ]
      : [
          {
            label: 'Enterprise',
            title: 'Real operating context',
            body: 'Large-scale account work across governance, platform strategy, CSDM/CMDB and executive narratives for financial services.',
          },
          {
            label: 'AgentOps',
            title: 'AI with an operating system',
            body: 'Preflight, handoffs, memory, permissions, evaluation, human gates and traceability built into the method.',
          },
          {
            label: 'Full-stack',
            title: 'Products beyond the diagram',
            body: 'Web and iOS apps, automations and agent systems operating as public proof of applied engineering.',
          },
        ]

  return (
    <main className={styles.page}>
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
              <span className={styles.portraitLabel}>PAULO_PIERRONDI / SP_BR</span>
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
        </div>
      </section>

      <AboutReveal as="section" className={styles.thesisBand}>
        <span>{lang === 'pt' ? 'POSICIONAMENTO / 01' : 'POSITIONING / 01'}</span>
        <p>{positioning.statement}</p>
      </AboutReveal>

      <section id="architecture" className={styles.section} aria-labelledby="architecture-title">
        <AboutReveal className={styles.sectionHeader}>
          <p className={styles.kicker}>{architectureLabel}</p>
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

      <section className={styles.evidenceSection} aria-labelledby="evidence-title">
        <AboutReveal className={styles.sectionHeader}>
          <p className={styles.kicker}>{lang === 'pt' ? 'Evidência pública' : 'Public evidence'}</p>
          <h2 id="evidence-title">
            {lang === 'pt'
              ? 'Liderança enterprise, arquitetura e engenharia no mesmo sistema.'
              : 'Enterprise leadership, architecture and engineering in one system.'}
          </h2>
        </AboutReveal>
        <AboutStagger className={styles.evidenceGrid}>
          {evidenceItems.map((item) => (
            <AboutStaggerItem key={item.title} className={styles.evidenceCard}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </AboutStaggerItem>
          ))}
        </AboutStagger>
      </section>

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
          {publicOperatingItems.map((item, index) => (
            <AboutStaggerItem key={item} className={styles.opsItem}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
              <small>{String(index + 1).padStart(2, '0')}</small>
            </AboutStaggerItem>
          ))}
        </AboutStagger>
      </section>

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
    </main>
  )
}
