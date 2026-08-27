'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hv2Body, hv2Display } from '@/components/home-v2/fonts'
import HomeNavBar from '@/components/home-v2/chrome/NavBar'
import ProjectsSection from '@/components/home-v2/sections/ProjectsSection'
import type { SectionId } from '@/components/home-v2/types'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import FeitosCommercialProof from './FeitosCommercialProof'
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
    sprintOffer: 'Oferta fixa: uma automação no ar',
  },
  en: {
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
    sprintOffer: 'Fixed offer: one automation live',
  },
} as const

const accentClass: Record<FeitoAccent, string> = {
  green: styles.nodeGreen,
  cyan: styles.nodeCyan,
  brass: styles.nodeBrass,
}

type FeitosCopy = (typeof COPY)[FeitosLang]

function getCaseCopy(feito: Feito, lang: FeitosLang): IndexCaseCopy {
  return lang === 'en' ? ENGLISH_CASE_COPY[feito.slug] ?? feito : feito
}

function DiagramGrid() {
  return (
    <g className={styles.diagramGrid}>
      {[48, 120, 192].map((line) => (
        <path key={`horizontal-${line}`} d={`M 20 ${line} H 340`} />
      ))}
      {[72, 144, 216, 288].map((line) => (
        <path key={`vertical-${line}`} d={`M ${line} 20 V 228`} />
      ))}
    </g>
  )
}

function DiagramEdges({ feito }: { feito: Feito }) {
  const nodeMap = new Map(feito.diagram.nodes.map((node) => [node.id, node]))

  return feito.diagram.edges.map((edge, index) => {
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
  })
}

function DiagramNodes({ feito }: { feito: Feito }) {
  return feito.diagram.nodes.map((node) => (
    <g key={node.id} className={accentClass[node.accent]}>
      <circle cx={node.x} cy={node.y} r="18" className={styles.nodeHalo} />
      <circle cx={node.x} cy={node.y} r="6" className={styles.nodeCore} />
      <text x={node.x} y={node.y + 35} textAnchor="middle" className={styles.nodeLabel}>
        {node.label}
      </text>
    </g>
  ))
}

function SystemDiagram({ feito, label }: { feito: Feito; label: string }) {
  const captionId = `system-map-${feito.slug}`

  return (
    <figure className={styles.diagram} aria-labelledby={captionId}>
      <div className={styles.diagramMeta}>
        <span>{label}</span>
        <span>{feito.navLabel}</span>
      </div>
      <svg viewBox="0 0 360 248" className={styles.svg} role="img">
        <DiagramGrid />
        <g><DiagramEdges feito={feito} /></g>
        <g><DiagramNodes feito={feito} /></g>
      </svg>
      <figcaption id={captionId}>{feito.diagram.label}</figcaption>
    </figure>
  )
}

type CaseRailProps = {
  lang: FeitosLang
  selected: number
  onSelect: (index: number) => void
  onFocus: (index: number) => void
}

function CaseRail({ lang, selected, onSelect, onFocus }: CaseRailProps) {
  return (
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
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') { event.preventDefault(); onFocus(index + 1) }
              if (event.key === 'ArrowLeft') { event.preventDefault(); onFocus(index - 1) }
              if (event.key === 'Home') { event.preventDefault(); onFocus(0) }
              if (event.key === 'End') { event.preventDefault(); onFocus(feitos.length - 1) }
            }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{feito.navLabel}</strong>
            <small>{feitoCopy.cardLabel}</small>
          </button>
        )
      })}
    </div>
  )
}

type CasePanelProps = {
  active: Feito
  copy: FeitosCopy
  lang: FeitosLang
  reduceMotion: ReturnType<typeof useHydratedReducedMotion>
  selected: number
}

function CasePanel({ active, copy, lang, reduceMotion, selected }: CasePanelProps) {
  const activeCopy = getCaseCopy(active, lang)
  const total = String(feitos.length).padStart(2, '0')

  return (
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
            <div><small>{copy.thesis}</small><p>{activeCopy.cardCopy}</p></div>
            <div><small>{copy.evidence}</small><p>{lang === 'en' ? active.englishAbstract : active.proof}</p></div>
          </div>
          <dl className={styles.caseFacts}>
            <div><dt>{copy.layers}</dt><dd>{String(active.layers.length).padStart(2, '0')}</dd></div>
            <div><dt>{copy.workflows}</dt><dd>{String(active.workflow.length).padStart(2, '0')}</dd></div>
            <div><dt>{copy.practices}</dt><dd>{String(active.methods.length).padStart(2, '0')}</dd></div>
          </dl>
          <div className={styles.methods} aria-label={copy.methods}>
            {active.methods.slice(0, 4).map((method) => <span key={method}>{method}</span>)}
          </div>
          <div className={styles.caseActions}>
            <Link href={`/feitos/${active.slug}`}>{copy.openCase}<ArrowRight aria-hidden="true" /></Link>
            <Link href={lang === 'pt' ? '/portfolio' : '/en/portfolio'} className={styles.secondaryAction}>{copy.relatedPortfolio}</Link>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  )
}

function SystemsSection({ lang }: { lang: FeitosLang }) {
  const copy = COPY[lang]
  const [selected, setSelected] = useState(0)
  const reduceMotion = useHydratedReducedMotion()

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
    <section id="systems" className={styles.systems} aria-labelledby="systems-title">
      <header className={styles.systemsIntro}>
        <p className={styles.eyebrow}>{copy.sectionEyebrow}</p>
        <h2 id="systems-title">{copy.sectionTitle}</h2>
        <p>{copy.sectionLead}</p>
      </header>
      <div className={styles.caseWorkbench}>
        <CaseRail lang={lang} selected={selected} onSelect={selectCase} onFocus={focusCase} />
        <CasePanel active={feitos[selected]} copy={copy} lang={lang} reduceMotion={reduceMotion} selected={selected} />
      </div>
    </section>
  )
}

function ClosingSection({ copy, lang }: { copy: FeitosCopy; lang: FeitosLang }) {
  return (
    <section className={styles.closing} aria-labelledby="feitos-contact-title">
      <p className={styles.eyebrow}>{copy.closingEyebrow}</p>
      <h2 id="feitos-contact-title">{copy.closingTitle}</h2>
      <p>{copy.closingLead}</p>
      <Link href={lang === 'pt' ? '/contato' : '/en/contato'}>
        {copy.contact}
        <ArrowRight aria-hidden="true" />
      </Link>
      {lang === 'pt' ? (
        <Link href="/sprint" className={styles.sprintOfferLink}>
          {copy.sprintOffer} · R$ 2.400
          <ArrowRight aria-hidden="true" />
        </Link>
      ) : null}
    </section>
  )
}

export default function FeitosIndexContent({ lang }: { lang: FeitosLang }) {
  const router = useRouter()
  const navigateHome = useCallback(
    (target: SectionId) => router.push(HOME_SECTION_HREFS[lang][target]),
    [lang, router],
  )

  return (
    <div className={`hv2 ${hv2Body.variable} ${hv2Display.variable} ${styles.root}`}>
      <HomeNavBar
        lang={lang}
        activeHref={lang === 'pt' ? '/feitos' : '/en/feitos'}
        onNavigate={navigateHome}
      />
      <main className={styles.page}>
        <FeitosCommercialProof lang={lang} />
        <div className={styles.portfolioFrame}>
          <ProjectsSection lang={lang} />
        </div>
        <SystemsSection lang={lang} />
        <ClosingSection copy={COPY[lang]} lang={lang} />
      </main>
    </div>
  )
}
