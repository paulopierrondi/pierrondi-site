'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BrainCircuit, Cpu, Network, Pause, Play, ShieldCheck } from 'lucide-react'
import ArchitectureDiagram from './ArchitectureDiagram'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import styles from './PauloPortfolioExperience.module.css'

type Lang = 'pt' | 'en'

const portrait = {
  primary: '/assets/paulo-pierrondi-executive-neural.jpg',
  fallback: '/assets/paulo-pierrondi-executive-enhanced.jpg',
}

const motionPreferenceKey = 'paulo-portfolio-motion'

const neuralNodes = Array.from({ length: 16 }, (_, index) => index)
const neuralSignals = Array.from({ length: 7 }, (_, index) => index)

const agentGovernanceDiagram = {
  nodes: [
    { id: 'prompt', label: 'Prompt', x: 40, y: 60, color: 'brass' as const },
    { id: 'router', label: 'Router LLM', x: 150, y: 60, color: 'cyan' as const },
    { id: 'agent', label: 'Agente', x: 270, y: 60, color: 'green' as const },
    { id: 'validator', label: 'Risk / Eval', x: 270, y: 140, color: 'cyan' as const },
    { id: 'gate', label: 'Human Gate', x: 150, y: 140, color: 'green' as const },
    { id: 'exec', label: 'Runner', x: 150, y: 210, color: 'green' as const },
    { id: 'audit', label: 'Audit Ledger', x: 270, y: 210, color: 'brass' as const },
  ],
  edges: [
    { from: 'prompt', to: 'router' },
    { from: 'router', to: 'agent' },
    { from: 'agent', to: 'validator' },
    { from: 'validator', to: 'gate' },
    { from: 'gate', to: 'exec' },
    { from: 'exec', to: 'audit' },
    { from: 'router', to: 'gate', dashed: true },
  ],
  signals: [
    { edgeIndex: 0, delay: 0, duration: 2 },
    { edgeIndex: 1, delay: 2, duration: 2 },
    { edgeIndex: 2, delay: 4, duration: 2 },
    { edgeIndex: 3, delay: 6, duration: 2 },
    { edgeIndex: 4, delay: 8, duration: 2 },
    { edgeIndex: 5, delay: 10, duration: 2 },
  ],
}

const serviceNowDiagram = {
  nodes: [
    { id: 'csdm', label: 'CSDM/CMDB', x: 60, y: 70, color: 'cyan' as const },
    { id: 'now', label: 'Now Assist', x: 200, y: 70, color: 'green' as const },
    { id: 'agents', label: 'AI Agents', x: 280, y: 70, color: 'green' as const },
    { id: 'op', label: 'Workflow', x: 280, y: 150, color: 'brass' as const },
    { id: 'result', label: 'Valor', x: 200, y: 150, color: 'green' as const },
    { id: 'gov', label: 'Governança', x: 60, y: 150, color: 'brass' as const },
  ],
  edges: [
    { from: 'csdm', to: 'now' },
    { from: 'now', to: 'agents' },
    { from: 'agents', to: 'op' },
    { from: 'op', to: 'result' },
    { from: 'result', to: 'gov', dashed: true },
    { from: 'gov', to: 'csdm', dashed: true },
    { from: 'now', to: 'op', dashed: true },
  ],
  signals: [
    { edgeIndex: 0, delay: 0, duration: 1.5 },
    { edgeIndex: 1, delay: 1.5, duration: 1.5 },
    { edgeIndex: 2, delay: 3, duration: 1.5 },
    { edgeIndex: 3, delay: 4.5, duration: 1.5 },
    { edgeIndex: 4, delay: 0.5, duration: 2 },
    { edgeIndex: 5, delay: 2.5, duration: 2 },
  ],
}

const llmInferenceDiagram = {
  nodes: [
    { id: 'task', label: 'Tarefa', x: 50, y: 62, color: 'brass' as const },
    { id: 'retrieval', label: 'RAG', x: 155, y: 58, color: 'cyan' as const },
    { id: 'router', label: 'Router', x: 265, y: 62, color: 'green' as const },
    { id: 'model', label: 'Modelo', x: 285, y: 142, color: 'cyan' as const },
    { id: 'cache', label: 'Cache', x: 165, y: 158, color: 'brass' as const },
    { id: 'eval', label: 'Eval', x: 55, y: 142, color: 'green' as const },
    { id: 'telemetry', label: 'Métrica', x: 165, y: 215, color: 'green' as const },
  ],
  edges: [
    { from: 'task', to: 'retrieval' },
    { from: 'retrieval', to: 'router' },
    { from: 'router', to: 'model' },
    { from: 'model', to: 'cache' },
    { from: 'cache', to: 'eval' },
    { from: 'eval', to: 'task', dashed: true },
    { from: 'cache', to: 'telemetry' },
    { from: 'router', to: 'telemetry', dashed: true },
  ],
  signals: [
    { edgeIndex: 0, delay: 0, duration: 1.6 },
    { edgeIndex: 1, delay: 1.6, duration: 1.6 },
    { edgeIndex: 2, delay: 3.2, duration: 1.6 },
    { edgeIndex: 3, delay: 4.8, duration: 1.6 },
    { edgeIndex: 4, delay: 6.4, duration: 1.6 },
    { edgeIndex: 6, delay: 8, duration: 1.9 },
  ],
}

const pipelineDiagram = {
  nodes: [
    { id: 'context', label: 'Problema', x: 60, y: 60, color: 'brass' as const },
    { id: 'llm', label: 'LLM / RAG', x: 200, y: 60, color: 'cyan' as const },
    { id: 'agentos', label: 'Agent OS', x: 280, y: 60, color: 'green' as const },
    { id: 'test', label: 'Teste', x: 280, y: 140, color: 'cyan' as const },
    { id: 'eval', label: 'Eval / Cache', x: 200, y: 140, color: 'brass' as const },
    { id: 'policy', label: 'Política', x: 60, y: 140, color: 'green' as const },
    { id: 'prod', label: 'Produção', x: 200, y: 210, color: 'green' as const },
  ],
  edges: [
    { from: 'context', to: 'llm' },
    { from: 'llm', to: 'agentos' },
    { from: 'agentos', to: 'test' },
    { from: 'test', to: 'eval' },
    { from: 'eval', to: 'policy' },
    { from: 'policy', to: 'context', dashed: true },
    { from: 'policy', to: 'prod' },
    { from: 'agentos', to: 'prod', dashed: true },
  ],
  signals: [
    { edgeIndex: 0, delay: 0, duration: 1.8 },
    { edgeIndex: 1, delay: 1.8, duration: 1.8 },
    { edgeIndex: 2, delay: 3.6, duration: 1.8 },
    { edgeIndex: 3, delay: 5.4, duration: 1.8 },
    { edgeIndex: 4, delay: 7.2, duration: 1.8 },
    { edgeIndex: 5, delay: 9, duration: 1.8 },
    { edgeIndex: 6, delay: 12, duration: 2 },
  ],
}

const diagramData = [serviceNowDiagram, agentGovernanceDiagram, llmInferenceDiagram, pipelineDiagram]

const neuralFieldVariants = {
  hero: styles.neuralFieldHero,
  proof: styles.neuralFieldProof,
  operating: styles.neuralFieldOperating,
  workflow: styles.neuralFieldWorkflow,
  architecture: styles.neuralFieldArchitecture,
  investor: styles.neuralFieldInvestor,
}

const copy = {
  pt: {
    nav: {
      thesis: 'Tese',
      proof: 'Prova',
      work: 'Trabalho',
      motion: 'Arquiteturas',
      contact: 'Contato',
      language: 'EN',
      languageLabel: 'Alternar idioma',
      motionOn: 'Pausar sinapses',
      motionOff: 'Ativar sinapses',
      motionOnLabel: 'Pausar animações e sinapses',
      motionOffLabel: 'Ativar animações e sinapses',
    },
    hero: {
      eyebrow: 'Portfólio executivo / AI operating systems',
      title: 'Eu desenho sistemas onde IA vira execução governada.',
      lead:
        'ServiceNow, FSI, governança, treinamento e inferência de LLMs, agentes autônomos, produto digital e go-to-market em uma mesma arquitetura operacional.',
      note:
        'Este é meu portfólio pessoal: uma vitrine executiva do meu trabalho, da minha forma de operar e dos sistemas que estou construindo.',
      ctaPrimary: 'Conversar sobre oportunidades',
      ctaSecondary: 'Ver arquitetura',
      portrait: 'Foto executiva de Paulo Pierrondi',
      status: 'Disponível para conversas estratégicas',
    },
    proofTitle: 'O portfólio não é um PDF. É uma operação viva.',
    proofLead:
      'Meu diferencial é unir estratégia enterprise, execução técnica e governança de agentes em um sistema que aprende, valida e melhora com o tempo.',
    metrics: [
      ['61', 'agentes no registry'],
      ['44', 'repos com Agent OS'],
      ['16/0', 'homologação sem falhas'],
      ['1.263', 'notas no second brain'],
    ],
    operating: {
      eyebrow: 'Arquitetura de valor',
      title: 'O que eu levo para uma empresa ou investidor.',
      body:
        'Não vendo “usar IA”. Eu estruturo como IA entra em trabalho real: contexto, política, permissões, memória, validação, custo, canais e evidência.',
    },
    capabilities: [
      {
        icon: BrainCircuit,
        title: 'LLM training, eval e inferência',
        copy:
          'Fine-tuning/few-shot, avaliação, roteamento de modelos, prompts cacheáveis, pipelines de inferência e medição de qualidade antes de escalar autonomia.',
      },
      {
        icon: Network,
        title: 'Agent Operating Systems',
        copy:
          'Registry, scheduler, handoffs, memória, CodeGraph, Linear, Obsidian, human gates e runners para transformar agentes em operação auditável.',
      },
      {
        icon: ShieldCheck,
        title: 'ServiceNow e IA governada',
        copy:
          'Now Assist, AI Agents, CSDM, CMDB, governança, operating model e adoção enterprise com conexão explícita entre plataforma e resultado.',
      },
      {
        icon: Cpu,
        title: 'Produto e go-to-market',
        copy:
          'Apps, portfólio, App Store, paid evidence gates, criativos, analytics e narrativa executiva para converter execução em distribuição.',
      },
    ],
    workflows: [
      {
        kicker: 'Workflow 01',
        title: 'Agent Hub: governança antes da automação',
        copy:
          'Preflight, human gates, runner, email final, bloqueio de ações críticas e validação central antes de qualquer operação sensível.',
      },
      {
        kicker: 'Workflow 02',
        title: 'CodeGraph + Codex: código com impacto conhecido',
        copy:
          'Antes de patch, o sistema consulta símbolos, chamadas e impacto. Depois valida com lint, build, smoke e registro no vault.',
      },
      {
        kicker: 'Workflow 03',
        title: 'Portfolio OS: produto, marketing e evidência',
        copy:
          'Linear, Git, App Store, criativos e métricas viram uma fila de decisão para saber o que corrigir, pausar, lançar ou escalar.',
      },
    ],
    architectureTitle: 'Sistemas operacionais em sinapse.',
    architectureLead:
      'Diagramas vivos que mostram como a inferência passa por contexto, política, validação e execução até virar valor real.',
    architectures: [
      [
        'Arquitetura 01',
        'SADA: ServiceNow AI-Driven Architecture',
        'Estratégia, CSDM, contexto operacional, governança, adoção de IA e métricas de valor no mesmo mapa.',
        'Valor: transformar visão executiva em arquitetura, workflow e expansão mensurável.',
        '/feitos/sada-servicenow',
      ],
      [
        'Arquitetura 02',
        'Agentes autônomos governados',
        'Prompt, roteamento, avaliação de risco, human gate, runner e auditoria antes de qualquer ação crítica.',
        'Valor: autonomia operacional com rastreabilidade, compliance e controle de execução.',
        '/feitos/agentes-governados',
      ],
      [
        'Arquitetura 03',
        'LLM inference e avaliação',
        'RAG, roteamento, prompt caching, evals, fallback, latência, custo e telemetria por workflow.',
        'Valor: decidir modelo e arquitetura por evidência, não por preferência de fornecedor.',
        '/feitos/llm-inferencia',
      ],
      [
        'Arquitetura 04',
        'Fábrica de soluções IA/agentes',
        'Problema de negócio vira contexto, RAG/LLM, Agent OS, teste, eval/cache, política e produção.',
        'Valor: criar soluções de IA para atividades reais com velocidade, reuso e evidência.',
        '/feitos/plataformas-automacao-ia',
      ],
    ],
    investor: {
      eyebrow: 'Conversa estratégica',
      title: 'O ativo é a capacidade de operar sistemas complexos com IA sem perder controle.',
      body:
        'Para empresas, isso vira operating model. Para liderança, vira capacidade de construir e validar produtos com clareza. Para times técnicos, vira aceleração com rastreabilidade.',
      bullets: ['enterprise credibility', 'AI execution system', 'product portfolio', 'governed autonomy'],
    },
  },
  en: {
    nav: {
      thesis: 'Thesis',
      proof: 'Proof',
      work: 'Work',
      motion: 'Architectures',
      contact: 'Contact',
      language: 'PT',
      languageLabel: 'Toggle language',
      motionOn: 'Pause synapses',
      motionOff: 'Enable synapses',
      motionOnLabel: 'Pause animations and synapses',
      motionOffLabel: 'Enable animations and synapses',
    },
    hero: {
      eyebrow: 'Executive portfolio / AI operating systems',
      title: 'I design systems where AI becomes governed execution.',
      lead:
        'ServiceNow, financial services, governance, LLM training and inference, autonomous agents, digital products and go-to-market in one operating architecture.',
      note:
        'This is my personal portfolio: an executive view of my work, my operating model and the systems I am building.',
      ctaPrimary: 'Discuss opportunities',
      ctaSecondary: 'See architecture',
      portrait: 'Executive portrait of Paulo Pierrondi',
      status: 'Open to strategic conversations',
    },
    proofTitle: 'The portfolio is not a PDF. It is a living operation.',
    proofLead:
      'My edge is combining enterprise strategy, technical execution and agent governance into a system that learns, validates and improves over time.',
    metrics: [
      ['61', 'agents in the registry'],
      ['44', 'repos with Agent OS'],
      ['16/0', 'homologation checks'],
      ['1,263', 'second-brain notes'],
    ],
    operating: {
      eyebrow: 'Value architecture',
      title: 'What I bring to a company or investor.',
      body:
        'I do not sell “using AI”. I structure how AI enters real work: context, policy, permissions, memory, validation, cost, channels and evidence.',
    },
    capabilities: [
      {
        icon: BrainCircuit,
        title: 'LLM training, eval and inference',
        copy:
          'Fine-tuning/few-shot, evaluation, model routing, cache-aware prompts, inference pipelines and quality measurement before autonomy scales.',
      },
      {
        icon: Network,
        title: 'Agent Operating Systems',
        copy:
          'Registry, scheduler, handoffs, memory, CodeGraph, Linear, Obsidian, human gates and runners that turn agents into auditable operations.',
      },
      {
        icon: ShieldCheck,
        title: 'ServiceNow and governed AI',
        copy:
          'Now Assist, AI Agents, CSDM, CMDB, governance, operating model and enterprise adoption connected directly to business outcomes.',
      },
      {
        icon: Cpu,
        title: 'Product and go-to-market',
        copy:
          'Apps, portfolio, App Store, paid evidence gates, creatives, analytics and executive storytelling that turn execution into distribution.',
      },
    ],
    workflows: [
      {
        kicker: 'Workflow 01',
        title: 'Agent Hub: governance before automation',
        copy:
          'Preflight, human gates, runner, final email, critical-action blocks and central validation before any sensitive operation.',
      },
      {
        kicker: 'Workflow 02',
        title: 'CodeGraph + Codex: code with known impact',
        copy:
          'Before a patch, the system checks symbols, callers and impact. Then it validates with lint, build, smoke and durable vault records.',
      },
      {
        kicker: 'Workflow 03',
        title: 'Portfolio OS: product, marketing and evidence',
        copy:
          'Linear, Git, App Store, creatives and metrics become a decision queue for what to fix, pause, launch or scale.',
      },
    ],
    architectureTitle: 'Operating systems in synapse.',
    architectureLead:
      'Live diagrams showing how inference moves through context, policy, validation and execution until it becomes real value.',
    architectures: [
      [
        'Architecture 01',
        'SADA: ServiceNow AI-Driven Architecture',
        'Strategy, CSDM, operational context, governance, AI adoption and value metrics in one map.',
        'Value: turn executive intent into architecture, workflow and measurable expansion.',
        '/feitos/sada-servicenow',
      ],
      [
        'Architecture 02',
        'Governed autonomous agents',
        'Prompt, routing, risk evaluation, human gate, runner and audit before any critical action.',
        'Value: operational autonomy with traceability, compliance and execution control.',
        '/feitos/agentes-governados',
      ],
      [
        'Architecture 03',
        'LLM inference and evaluation',
        'RAG, model routing, prompt caching, evals, fallback, latency, cost and workflow telemetry.',
        'Value: choose model and architecture from evidence, not vendor preference.',
        '/feitos/llm-inferencia',
      ],
      [
        'Architecture 04',
        'AI/agent solution factory',
        'Business problem becomes context, RAG/LLM, Agent OS, testing, eval/cache, policy and production.',
        'Value: build AI solutions for real work with speed, reuse and evidence.',
        '/feitos/plataformas-automacao-ia',
      ],
    ],
    investor: {
      eyebrow: 'Strategic conversation',
      title: 'The asset is the ability to operate complex systems with AI without losing control.',
      body:
        'For companies, this becomes an operating model. For leadership, it becomes the capacity to build and validate products with clarity. For technical teams, it becomes acceleration with traceability.',
      bullets: ['enterprise credibility', 'AI execution system', 'product portfolio', 'governed autonomy'],
    },
  },
}

function reveal(shouldAnimate: boolean, delay = 0) {
  return shouldAnimate
    ? {
        initial: { y: 18, opacity: 0, filter: 'blur(8px)' },
        whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
        viewport: { once: true, amount: 0.22, margin: '-40px' },
        transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {
        initial: false as const,
        animate: { y: 0, opacity: 1, filter: 'none' },
        transition: { duration: 0 },
      }
}

function heroStep(shouldAnimate: boolean, delay = 0) {
  return shouldAnimate
    ? {
        initial: { y: 16, opacity: 0, filter: 'blur(10px)' },
        animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
        transition: { duration: 0.74, delay, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {
        initial: false as const,
        animate: { y: 0, opacity: 1, filter: 'none' },
        transition: { duration: 0 },
      }
}

function NeuralField({
  shouldAnimate,
  variant,
}: {
  shouldAnimate: boolean
  variant: keyof typeof neuralFieldVariants
}) {
  return (
    <motion.div
      className={`${styles.neuralField} ${neuralFieldVariants[variant]}`}
      aria-hidden="true"
      initial={shouldAnimate ? { opacity: 0, y: 34, scale: 0.98 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      animate={!shouldAnimate ? { opacity: 0.5, y: 0, scale: 1 } : undefined}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.neuralMesh}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.neuralNodes}>
        {neuralNodes.map((node) => (
          <span key={node} />
        ))}
      </div>
      <div className={styles.neuralSignals}>
        {neuralSignals.map((signal) => (
          <span key={signal} />
        ))}
      </div>
    </motion.div>
  )
}

export default function PauloPortfolioExperience() {
  const lang: Lang = 'pt'
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null)
  const [portraitSrc, setPortraitSrc] = useState(portrait.primary)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useHydratedReducedMotion()
  const t = copy[lang]
  const defaultMotionOn = mounted ? !prefersReducedMotion : false
  const shouldAnimate = motionOverride ?? defaultMotionOn

  const motionClass = useMemo(
    () => ` ${shouldAnimate ? styles.motionEnabled : styles.paused}`,
    [shouldAnimate]
  )

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedMotion = window.localStorage.getItem(motionPreferenceKey)
      if (storedMotion === 'on') setMotionOverride(true)
      if (storedMotion === 'off') setMotionOverride(false)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  const resetNavScroll = () => {
    window.requestAnimationFrame(() => {
      navRef.current?.scrollTo({ left: 0, behavior: shouldAnimate ? 'smooth' : 'auto' })
    })
  }

  const toggleMotion = () => {
    const nextMotion = !shouldAnimate
    setMotionOverride(nextMotion)
    window.localStorage.setItem(motionPreferenceKey, nextMotion ? 'on' : 'off')
    resetNavScroll()
  }

  return (
    <div className={`${styles.page}${motionClass}`}>
      <div className={styles.noise} aria-hidden="true" />

      <nav ref={navRef} className={styles.localNav} aria-label="Paulo portfolio sections">
        <a href="#thesis">{t.nav.thesis}</a>
        <a href="#proof">{t.nav.proof}</a>
        <a href="#work">{t.nav.work}</a>
        <a href="#motion">{t.nav.motion}</a>
        <a href="#contact">{t.nav.contact}</a>
        <button
          type="button"
          onClick={toggleMotion}
          aria-pressed={!shouldAnimate}
          aria-label={shouldAnimate ? t.nav.motionOnLabel : t.nav.motionOffLabel}
        >
          {shouldAnimate ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          <span className={styles.localNavText}>{shouldAnimate ? t.nav.motionOn : t.nav.motionOff}</span>
        </button>
      </nav>

      <section className={`${styles.hero} ${styles.neuralSection}`} id="thesis">
        <NeuralField shouldAnimate={shouldAnimate} variant="hero" />
        <div className={styles.motionField} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.heroCopy}>
          <motion.p className={styles.eyebrow} {...heroStep(shouldAnimate)}>
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 {...heroStep(shouldAnimate, 0.08)}>{t.hero.title}</motion.h1>
          <motion.p className={styles.lead} {...heroStep(shouldAnimate, 0.16)}>
            {t.hero.lead}
          </motion.p>
          <motion.p className={styles.note} {...heroStep(shouldAnimate, 0.22)}>
            {t.hero.note}
          </motion.p>
          <motion.p className={styles.profileContext} {...heroStep(shouldAnimate, 0.26)}>
            {lang === 'pt' ? (
              <>
                Perfil executivo e trajetória: <Link href="/about">ver Paulo Pierrondi</Link>. Esta página é o laboratório público dos sistemas em construção.
              </>
            ) : (
              <>
                Executive profile and background: <Link href="/about">meet Paulo Pierrondi</Link>. This page is the public lab for systems in progress.
              </>
            )}
          </motion.p>
          <motion.div className={styles.heroActions} {...heroStep(shouldAnimate, 0.3)}>
            <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer">
              {t.hero.ctaPrimary}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#work">{t.hero.ctaSecondary}</a>
          </motion.div>
        </div>

        <motion.div className={styles.portraitSystem} {...heroStep(shouldAnimate, 0.38)}>
          <div className={styles.portraitFrame}>
            <Image
              src={portraitSrc}
              alt={t.hero.portrait}
              width={900}
              height={900}
              sizes="(max-width: 760px) min(78vw, 320px), 340px"
              className={styles.portraitImage}
              preload
              onError={() => setPortraitSrc((current) => (current === portrait.fallback ? current : portrait.fallback))}
            />
            <div className={styles.portraitScan} aria-hidden="true" />
          </div>
          <div className={styles.statusCard}>
            <span>{t.hero.status}</span>
            <strong>ServiceNow + AI + Product</strong>
          </div>
        </motion.div>
      </section>

      <section className={`${styles.proof} ${styles.neuralSection}`} id="proof">
        <NeuralField shouldAnimate={shouldAnimate} variant="proof" />
        <motion.div className={styles.sectionHeader} {...reveal(shouldAnimate)}>
          <p className={styles.eyebrow}>{lang === 'pt' ? 'Prova operacional' : 'Operational proof'}</p>
          <h2>{t.proofTitle}</h2>
          <p>{t.proofLead}</p>
        </motion.div>

        <div className={styles.metricsGrid}>
          {t.metrics.map(([value, label], index) => (
            <motion.article key={label} {...reveal(shouldAnimate, index * 0.06)}>
              <strong>{value}</strong>
              <span>{label}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={`${styles.operating} ${styles.neuralSection}`} id="work">
        <NeuralField shouldAnimate={shouldAnimate} variant="operating" />
        <motion.div className={styles.operatingIntro} {...reveal(shouldAnimate)}>
          <p className={styles.eyebrow}>{t.operating.eyebrow}</p>
          <h2>{t.operating.title}</h2>
          <p>{t.operating.body}</p>
        </motion.div>

        <div className={styles.capabilityGrid}>
          {t.capabilities.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article key={item.title} className={styles.capabilityCard} {...reveal(shouldAnimate, index * 0.05)}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className={`${styles.workflowSection} ${styles.neuralSection}`}>
        <NeuralField shouldAnimate={shouldAnimate} variant="workflow" />
        <div className={styles.workflowTrack}>
          {t.workflows.map((item, index) => (
            <motion.article key={item.title} className={styles.workflowCard} {...reveal(shouldAnimate, index * 0.05)}>
              <span>{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={`${styles.architectureSection} ${styles.neuralSection}`} id="motion">
        <NeuralField shouldAnimate={shouldAnimate} variant="architecture" />
        <motion.div className={styles.sectionHeader} {...reveal(shouldAnimate)}>
          <p className={styles.eyebrow}>{lang === 'pt' ? 'Arquitetura em movimento' : 'Architecture in motion'}</p>
          <h2>{t.architectureTitle}</h2>
          <p>{t.architectureLead}</p>
        </motion.div>

        <div className={styles.architectureGrid}>
          {t.architectures.map(([tag, title, subtitle, outcome, href], index) => {
            const diagram = diagramData[index]
            return (
              <motion.article key={title} className={styles.architectureCard} {...reveal(shouldAnimate, index * 0.08)}>
                <div className={`${styles.architectureViewport} ${styles.diagramViewport}`}>
                  <ArchitectureDiagram
                    nodes={diagram.nodes}
                    edges={diagram.edges}
                    signals={diagram.signals}
                    variant={`diagram-${index}`}
                    shouldAnimate={shouldAnimate}
                  />
                  <div className={styles.architectureFlow} aria-hidden="true" />
                </div>
                <div className={styles.architectureMeta}>
                  <span>{tag}</span>
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                  <strong className={styles.diagramOutcome}>{outcome}</strong>
                  <Link className={styles.architectureLink} href={href}>
                    {lang === 'pt' ? 'Abrir arquitetura detalhada' : 'Open detailed architecture'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className={`${styles.investor} ${styles.neuralSection}`} id="contact">
        <NeuralField shouldAnimate={shouldAnimate} variant="investor" />
        <motion.div className={styles.investorPanel} {...reveal(shouldAnimate)}>
          <p className={styles.eyebrow}>{t.investor.eyebrow}</p>
          <h2>{t.investor.title}</h2>
          <p>{t.investor.body}</p>
          <div className={styles.bulletLine}>
            {t.investor.bullets.map((bullet) => (
              <span key={bullet}>{bullet}</span>
            ))}
          </div>
          <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
