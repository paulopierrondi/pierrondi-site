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
  const portfolioHref = '/paulo'
  const architectureLabel = lang === 'pt' ? 'Arquitetura de operacao' : 'Operating architecture'
  const disclaimer =
    lang === 'pt'
      ? 'Conteudo pessoal. Nao e canal oficial da ServiceNow e nao usa informacao confidencial.'
      : 'Personal content. Not an official ServiceNow channel and does not use confidential information.'
  const publicOperatingItems =
    lang === 'pt'
      ? [
          'Tese executiva antes de ferramenta',
          'Contexto, politica, permissao e evidencia antes de autonomia',
          'Guardrails humanos para qualquer publicacao externa',
          'Nenhum nome de cliente, roadmap, incidente, budget ou print confidencial',
          'Prova por arquitetura, sistemas e execucao real',
        ]
      : [
          'Executive thesis before tooling',
          'Context, policy, permission and evidence before autonomy',
          'Human guardrails for any external publication',
          'No client names, roadmap, incident, budget or confidential screenshots',
          'Proof through architecture, systems and real execution',
        ]
  const evidenceItems =
    lang === 'pt'
      ? [
          {
            label: 'ServiceNow + FSI',
            title: 'Contexto enterprise real',
            body: 'Experiencia em conta grande, governanca, plataforma, CSDM/CMDB e discussao executiva sem expor informacao sensivel.',
          },
          {
            label: 'AgentOps',
            title: 'IA com sistema de operacao',
            body: 'Preflight, handoffs, memoria, human gates, validacao, automacao e rastreabilidade como parte do metodo.',
          },
          {
            label: 'Produto',
            title: 'Execucao publica verificavel',
            body: 'Site, portfolio, rotas de arquitetura, Marketing OS e provas visuais funcionando como demonstracao de capacidade aplicada.',
          },
        ]
      : [
          {
            label: 'ServiceNow + FSI',
            title: 'Real enterprise context',
            body: 'Experience with large-account governance, platform strategy, CSDM/CMDB and executive discussion without sensitive disclosure.',
          },
          {
            label: 'AgentOps',
            title: 'AI with an operating system',
            body: 'Preflight, handoffs, memory, human gates, validation, automation and traceability as part of the method.',
          },
          {
            label: 'Product',
            title: 'Publicly verifiable execution',
            body: 'Site, portfolio, architecture routes, Marketing OS and visual proof operating as applied capability evidence.',
          },
        ]
  const guardrailItems =
    lang === 'pt'
      ? [
          {
            label: 'Sem overclaim',
            theme: 'Nada de ranking inventado',
            hook: 'O posicionamento usa maturidade aplicada, evidencias e sistemas reais, nao percentis pessoais dificeis de auditar.',
            cta: 'Autoridade sem arrogancia.',
          },
          {
            label: 'Sem confidencial',
            theme: 'Clientes protegidos',
            hook: 'O site evita nomes, prints, metricas, incidentes, roadmap e qualquer material que pareca canal oficial.',
            cta: 'Credibilidade sem risco.',
          },
          {
            label: 'Sem venda fria',
            theme: 'Conversa por tese',
            hook: 'A CTA certa para executivos e pedir critica sobre a arquitetura, nao empurrar servico nem parecer campanha.',
            cta: 'Promocao simples e respeitosa.',
          },
        ]
      : [
          {
            label: 'No overclaim',
            theme: 'No invented ranking',
            hook: 'The positioning uses applied maturity, evidence and real systems, not personal percentiles that are hard to audit.',
            cta: 'Authority without arrogance.',
          },
          {
            label: 'No confidential content',
            theme: 'Clients protected',
            hook: 'The site avoids names, screenshots, metrics, incidents, roadmap and anything that could look official.',
            cta: 'Credibility without risk.',
          },
          {
            label: 'No cold pitch',
            theme: 'Conversation through thesis',
            hook: 'The right CTA for executives is to ask for critique on the architecture, not push a service.',
            cta: 'Simple, respectful promotion.',
          },
        ]

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
              ? 'Minha autoridade publica precisa provar maturidade sem vazar contexto sensivel.'
              : 'My public authority needs to prove maturity without leaking sensitive context.'}
          </h2>
        </div>
        <div className={styles.opsGrid}>
          {publicOperatingItems.map((item) => (
            <div key={item} className={styles.opsItem}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="evidence-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{lang === 'pt' ? 'Evidencia publica' : 'Public evidence'}</p>
          <h2 id="evidence-title">
            {lang === 'pt'
              ? 'O perfil precisa mostrar prova operacional, nao apenas curriculo.'
              : 'The profile needs to show operational proof, not just a resume.'}
          </h2>
        </div>
        <div className={styles.budgetGrid}>
          {evidenceItems.map((item) => (
            <article key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="queue-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>{lang === 'pt' ? 'Guardrails publicos' : 'Public guardrails'}</p>
          <h2 id="queue-title">
            {lang === 'pt'
              ? 'A forma de me promover tambem precisa ser governada.'
              : 'The way I promote myself also needs to be governed.'}
          </h2>
        </div>
        <div className={styles.queueGrid}>
          {guardrailItems.map((item) => (
            <article key={item.theme}>
              <span>{item.label}</span>
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
