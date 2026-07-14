'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { hv2Body, hv2Display } from '@/components/home-v2/fonts'
import HomeNavBar from '@/components/home-v2/chrome/NavBar'
import ProjectsSection from '@/components/home-v2/sections/ProjectsSection'
import type { SectionId } from '@/components/home-v2/types'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { feitos, type Feito, type FeitoAccent } from './feitos-data'
import styles from './FeitosIndex.module.css'
import '@/components/home-v2/home-v2.css'

export type FeitosLang = 'pt' | 'en'

const HOME_SECTION_HREFS: Record<FeitosLang, Record<SectionId, string>> = {
  pt: {
    hero: '/',
    projects: '/#projects',
    about: '/#about',
    skills: '/#skills',
    contact: '/#contact',
  },
  en: {
    hero: '/en',
    projects: '/en#projects',
    about: '/en#about',
    skills: '/en#skills',
    contact: '/en#contact',
  },
}

type IndexCaseCopy = Pick<Feito, 'cardLabel' | 'cardTitle' | 'headline' | 'cardCopy'>

const ENGLISH_CASE_COPY: Record<string, IndexCaseCopy> = {
  'sada-servicenow': {
    cardLabel: 'ServiceNow / SADA',
    cardTitle: 'SADA: a value architecture for governed AI',
    headline: 'From executive intent to a measured workflow.',
    cardCopy:
      'A framework developed by Paulo Pierrondi to connect strategy, architecture decisions, workflow execution, and measurable value.',
  },
  'agentops-governanca': {
    cardLabel: 'AgentOps / Governance',
    cardTitle: 'Governed agents built on data and context',
    headline: 'Autonomy only scales when an agent knows what it may do.',
    cardCopy:
      'A study of operational data, contextual inference, policies, evaluations, and human gates for autonomy that leaves an evidence trail.',
  },
  'llmops-inferencia': {
    cardLabel: 'LLMOps / Inference',
    cardTitle: 'LLM creation, evaluation, and inference',
    headline: 'The scientific work sits between the model and the decision.',
    cardCopy:
      'LLM pipelines for routing, RAG, prompt caching, evaluations, latency, cost, and observable quality.',
  },
  'automation-os': {
    cardLabel: 'Automation OS',
    cardTitle: 'Platforms for AI-powered automation and execution',
    headline: 'AI creates value when it becomes a reliable execution pipeline.',
    cardCopy:
      'Systems that coordinate agents, coders, validators, memory, browsers, runners, handoffs, and human approval.',
  },
}

const COPY = {
  pt: {
    eyebrow: 'FRAMEWORKS AUTORAIS · GOVERNANÇA · EXECUÇÃO',
    title: <>Sistemas que fazem <em>IA operar no mundo real.</em></>,
    lead:
      'A landing reúne os produtos publicados. Aqui, frameworks e operating models tornam explícita a arquitetura que sustenta contexto, decisão e automação em execução governada.',
    primaryAction: 'Explorar os sistemas',
    secondaryAction: 'Ver produtos e apps',
    proof: [
      ['04', 'sistemas autorais'],
      ['Contexto → ação', 'trilha de decisão'],
      ['Público por desenho', 'sem expor clientes'],
    ],
    sectionEyebrow: '04 FRAMEWORKS E SISTEMAS AUTORAIS',
    sectionTitle: 'A arquitetura por trás da execução.',
    sectionLead:
      'Produtos publicados ficam no portfólio. Aqui, cada framework deixa visível o raciocínio entre estratégia, controle, workflow e evidência — sem expor clientes ou confundir método com produto.',
    map: 'Mapa do sistema',
    publicFramework: 'framework público',
    thesis: 'Tese de arquitetura',
    evidence: 'Evidência pública',
    methods: 'Método',
    layers: 'camadas',
    workflows: 'fluxos',
    practices: 'práticas',
    openCase: 'Abrir arquitetura',
    relatedPortfolio: 'Ver portfólio de produtos',
    closingEyebrow: 'ARQUITETURA QUE VIRA EXECUÇÃO',
    closingTitle: 'Tem um problema técnico que precisa virar sistema?',
    closingLead:
      'A conversa começa por contexto, governança e uma decisão que possa ser colocada em operação.',
    contact: 'Iniciar conversa',
  },
  en: {
    eyebrow: 'ORIGINAL FRAMEWORKS · GOVERNANCE · EXECUTION',
    title: <>Systems that make <em>AI operate in the real world.</em></>,
    lead:
      'The landing brings together published products. Here, frameworks and operating models make the architecture behind context, decisions, and governed execution explicit.',
    primaryAction: 'Explore the systems',
    secondaryAction: 'View products and apps',
    proof: [
      ['04', 'original systems'],
      ['Context → action', 'decision trail'],
      ['Public by design', 'no client exposure'],
    ],
    sectionEyebrow: '04 ORIGINAL FRAMEWORKS AND SYSTEMS',
    sectionTitle: 'The architecture behind execution.',
    sectionLead:
      'Published products live in the portfolio. Here, each framework makes the reasoning between strategy, control, workflow, and evidence visible—without exposing clients or confusing method with product.',
    map: 'System map',
    publicFramework: 'public framework',
    thesis: 'Architecture thesis',
    evidence: 'Public evidence',
    methods: 'Method',
    layers: 'layers',
    workflows: 'workflows',
    practices: 'practices',
    openCase: 'Open architecture',
    relatedPortfolio: 'View product portfolio',
    closingEyebrow: 'ARCHITECTURE THAT BECOMES EXECUTION',
    closingTitle: 'Have a technical problem that needs to become a system?',
    closingLead:
      'The conversation starts with context, governance, and a decision that can be put into operation.',
    contact: 'Start a conversation',
  },
} as const

const accentClass: Record<FeitoAccent, string> = {
  green: styles.nodeGreen,
  cyan: styles.nodeCyan,
  brass: styles.nodeBrass,
}

function getCaseCopy(feito: Feito, lang: FeitosLang): IndexCaseCopy {
  return lang === 'en' ? ENGLISH_CASE_COPY[feito.slug] ?? feito : feito
}

function SystemDiagram({ feito, label }: { feito: Feito; label: string }) {
  const nodeMap = new Map(feito.diagram.nodes.map((node) => [node.id, node]))
  const captionId = `system-map-${feito.slug}`

  return (
    <figure className={styles.diagram} aria-labelledby={captionId}>
      <div className={styles.diagramMeta}>
        <span>{label}</span>
        <span>{feito.navLabel}</span>
      </div>
      <svg viewBox="0 0 360 248" className={styles.svg} role="img">
        <g className={styles.diagramGrid}>
          {[48, 120, 192].map((line) => (
            <path key={`horizontal-${line}`} d={`M 20 ${line} H 340`} />
          ))}
          {[72, 144, 216, 288].map((line) => (
            <path key={`vertical-${line}`} d={`M ${line} 20 V 228`} />
          ))}
        </g>
        <g>
          {feito.diagram.edges.map((edge, index) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            if (!from || !to) return null

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`${styles.edge} ${edge.dashed ? styles.dashed : ''}`}
                />
                <circle r="3" className={`${styles.signal} ${accentClass[to.accent]}`}>
                  <animateMotion
                    path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    dur="4.4s"
                    begin={`${index * 0.42}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )
          })}
        </g>
        <g>
          {feito.diagram.nodes.map((node) => (
            <g key={node.id} className={accentClass[node.accent]}>
              <circle cx={node.x} cy={node.y} r="18" className={styles.nodeHalo} />
              <circle cx={node.x} cy={node.y} r="6" className={styles.nodeCore} />
              <text x={node.x} y={node.y + 35} textAnchor="middle" className={styles.nodeLabel}>
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption id={captionId}>{feito.diagram.label}</figcaption>
    </figure>
  )
}

export default function FeitosIndexContent({ lang }: { lang: FeitosLang }) {
  const copy = COPY[lang]
  const router = useRouter()
  const [selected, setSelected] = useState(0)
  const reduceMotion = useHydratedReducedMotion()
  const active = feitos[selected]
  const activeCopy = getCaseCopy(active, lang)
  const total = String(feitos.length).padStart(2, '0')

  const navigateHome = useCallback(
    (target: SectionId) => {
      router.push(HOME_SECTION_HREFS[lang][target])
    },
    [lang, router],
  )

  const selectCase = (next: number) => {
    const normalized = (next + feitos.length) % feitos.length
    setSelected(normalized)
  }

  const focusCase = (next: number) => {
    selectCase(next)
    window.requestAnimationFrame(() => {
      document.querySelectorAll<HTMLButtonElement>(`[data-feito-tab]`)[
        (next + feitos.length) % feitos.length
      ]?.focus()
    })
  }

  return (
    <div className={`hv2 ${hv2Body.variable} ${hv2Display.variable} ${styles.root}`}>
      <HomeNavBar
        lang={lang}
        activeHref={lang === 'pt' ? '/feitos' : '/en/feitos'}
        onNavigate={navigateHome}
      />
      <div className={styles.portfolioFrame}>
        <ProjectsSection lang={lang} />
      </div>
      <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroBeam} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className={styles.heroLead}>{copy.lead}</p>
          <div className={styles.heroActions}>
            <a href="#systems">
              {copy.primaryAction}
              <ArrowDown aria-hidden="true" />
            </a>
            <Link href={lang === 'pt' ? '/portfolio' : '/en/portfolio'}>{copy.secondaryAction}</Link>
          </div>
        </div>

        <div className={styles.heroAtlas} aria-label={lang === 'pt' ? 'Mapa dos sistemas' : 'Systems map'}>
          <span className={styles.atlasCenter}>EVIDENCE</span>
          {feitos.map((feito, index) => (
            <span key={feito.slug} className={styles.atlasNode} data-index={index}>
              <i aria-hidden="true" />
              <strong>{feito.navLabel}</strong>
              <small>{String(index + 1).padStart(2, '0')}</small>
            </span>
          ))}
          <span className={styles.atlasOrbit} aria-hidden="true" />
          <span className={styles.atlasOrbitInner} aria-hidden="true" />
        </div>

        <dl className={styles.heroProof}>
          {copy.proof.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="systems" className={styles.systems} aria-labelledby="systems-title">
        <header className={styles.systemsIntro}>
          <p className={styles.eyebrow}>{copy.sectionEyebrow}</p>
          <h2 id="systems-title">{copy.sectionTitle}</h2>
          <p>{copy.sectionLead}</p>
        </header>

        <div className={styles.caseWorkbench}>
          <div className={styles.caseRail} role="tablist" aria-label={lang === 'pt' ? 'Selecionar sistema' : 'Select system'}>
            {feitos.map((feito, index) => {
              const feitoCopy = getCaseCopy(feito, lang)
              const isActive = index === selected
              return (
                <button
                  key={feito.slug}
                  type="button"
                  role="tab"
                  data-feito-tab
                  id={`feito-tab-${feito.slug}`}
                  aria-controls={`feito-panel-${feito.slug}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={isActive ? `${styles.caseTab} ${styles.caseTabActive}` : styles.caseTab}
                  onClick={() => selectCase(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                      event.preventDefault()
                      focusCase(index + 1)
                    }
                    if (event.key === 'ArrowLeft') {
                      event.preventDefault()
                      focusCase(index - 1)
                    }
                    if (event.key === 'Home') {
                      event.preventDefault()
                      focusCase(0)
                    }
                    if (event.key === 'End') {
                      event.preventDefault()
                      focusCase(feitos.length - 1)
                    }
                  }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{feito.navLabel}</strong>
                  <small>{feitoCopy.cardLabel}</small>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={active.slug}
              id={`feito-panel-${active.slug}`}
              role="tabpanel"
              aria-labelledby={`feito-tab-${active.slug}`}
              className={styles.casePanel}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.caseVisual}>
                <SystemDiagram feito={active} label={copy.map} />
                <div className={styles.visualFooter}>
                  <span>{activeCopy.cardLabel}</span>
                  <span>{copy.publicFramework}</span>
                </div>
              </div>

              <div className={styles.caseCopy}>
                <div className={styles.caseMeta}>
                  <span>{String(selected + 1).padStart(2, '0')} / {total}</span>
                  <span>{copy.publicFramework}</span>
                </div>
                <p className={styles.caseEyebrow}>{activeCopy.cardLabel}</p>
                <h3>{activeCopy.cardTitle}</h3>
                <p className={styles.caseHeadline}>{activeCopy.headline}</p>

                <div className={styles.caseNarrative}>
                  <div>
                    <small>{copy.thesis}</small>
                    <p>{activeCopy.cardCopy}</p>
                  </div>
                  <div>
                    <small>{copy.evidence}</small>
                    <p>{lang === 'en' ? active.englishAbstract : active.proof}</p>
                  </div>
                </div>

                <dl className={styles.caseFacts}>
                  <div>
                    <dt>{copy.layers}</dt>
                    <dd>{String(active.layers.length).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>{copy.workflows}</dt>
                    <dd>{String(active.workflow.length).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>{copy.practices}</dt>
                    <dd>{String(active.methods.length).padStart(2, '0')}</dd>
                  </div>
                </dl>

                <div className={styles.methods} aria-label={copy.methods}>
                  {active.methods.slice(0, 4).map((method) => <span key={method}>{method}</span>)}
                </div>

                <div className={styles.caseActions}>
                  <Link href={`/feitos/${active.slug}`}>
                    {copy.openCase}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link href={lang === 'pt' ? '/portfolio' : '/en/portfolio'} className={styles.secondaryAction}>
                    {copy.relatedPortfolio}
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="feitos-contact-title">
        <p className={styles.eyebrow}>{copy.closingEyebrow}</p>
        <h2 id="feitos-contact-title">{copy.closingTitle}</h2>
        <p>{copy.closingLead}</p>
        <Link href={lang === 'pt' ? '/contato' : '/en/contato'}>
          {copy.contact}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
      </main>
    </div>
  )
}
