'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleGauge,
  Cpu,
  Layers3,
  Network,
  Pause,
  Play,
  ShieldCheck,
  Waypoints,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import styles from './WhyPauloExperience.module.css'

const scenes = [
  {
    label: 'ServiceNow AI value',
    title: 'AI maturity only matters when it increases platform value.',
    copy:
      'My center of gravity is ServiceNow: AI agents, Now Assist, CSDM, workflow adoption, executive value and field credibility.',
    video: '/assets/paulo-videos/enterprise-ai.webm',
    fallback: '/assets/paulo-videos/enterprise-ai.mp4',
    poster: '/assets/paulo-videos/enterprise-ai.jpg',
  },
  {
    label: 'Governed agent operations',
    title: 'I operate AI with gates, memory, evidence and ownership.',
    copy:
      'Preflight, model routing, human approval gates, audit trails, handoffs and quality checks are part of the operating model.',
    video: '/assets/paulo-videos/agent-os.webm',
    fallback: '/assets/paulo-videos/agent-os.mp4',
    poster: '/assets/paulo-videos/agent-os.jpg',
  },
  {
    label: 'LLM operating depth',
    title: 'LLMs are leverage: Llama, Kimi, GPT, Gemini, Claude and LiteLLM-style routing.',
    copy:
      'I understand model behavior, cost, cache, context, evals and fallback patterns well enough to translate them into safer enterprise outcomes.',
    video: '/assets/paulo-videos/llm-inference.webm',
    fallback: '/assets/paulo-videos/llm-inference.mp4',
    poster: '/assets/paulo-videos/llm-inference.jpg',
  },
]

const valueMoves = [
  {
    icon: BriefcaseBusiness,
    title: 'ServiceNow-first credibility',
    copy:
      'I am not rebranding away from ServiceNow. I use AI depth to strengthen platform strategy, adoption, executive narrative and sales confidence.',
  },
  {
    icon: BrainCircuit,
    title: 'AI fluency beyond prompting',
    copy:
      'Model tiering, prompt caching, local and hosted models, LLM gateways, evals, memory, human gates and multi-agent execution are daily operating concepts.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Value translation',
    copy:
      'I can turn AI capability into measurable platform value: adoption velocity, workflow quality, demo credibility, risk reduction and expansion paths.',
  },
]

const proofPillars = [
  ['Platform value', 'Now Assist, AI Agents, CSDM, CMDB, operating model and executive alignment.'],
  ['Agent governance', 'Preflight, risk gates, handoffs, role routing, audit trail and recovery discipline.'],
  ['LLM systems', 'Llama/local models, Kimi, OpenAI, Gemini, Claude, LiteLLM patterns, cost and cache awareness.'],
  ['Field leverage', 'Better demos, stronger POVs, faster discovery, cleaner adoption plans and differentiated customer conversations.'],
]

const operatingSignals = [
  { label: 'Context', copy: 'second brain, project memory, customer narrative and reusable playbooks' },
  { label: 'Routing', copy: 'choose the right model, agent and tool for each risk level' },
  { label: 'Governance', copy: 'human gates, no-secret rules, audit evidence and production boundaries' },
  { label: 'Evidence', copy: 'build, test, visual QA, logs, notes and next actions before claiming done' },
]

const serviceNowAngles = [
  {
    icon: Layers3,
    title: 'AI adoption operating model',
    copy:
      'Help customers move from AI interest to governed adoption: ownership, process, data readiness, controls and measurable outcomes.',
  },
  {
    icon: Waypoints,
    title: 'Workflow Data Fabric narrative',
    copy:
      'Connect CMDB/CSDM quality, workflow context and AI agents into an executive platform story that can unlock budget and urgency.',
  },
  {
    icon: Network,
    title: 'Field enablement and demos',
    copy:
      'Create sharper demo paths and value narratives that make ServiceNow AI feel concrete, credible and tied to business execution.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance as a sales advantage',
    copy:
      'Translate AI risk concerns into a platform-led conversation about controls, evidence, security posture and responsible autonomy.',
  },
]

const capabilityStack = [
  'ServiceNow platform strategy',
  'Now Assist / AI Agents positioning',
  'CSDM and CMDB value framing',
  'LLM model routing and evals',
  'Llama and local model literacy',
  'LiteLLM-style gateway thinking',
  'Multi-agent operating systems',
  'Prompt caching and cost control',
  'Human-in-the-loop governance',
  'Executive storytelling',
  'Field demos and adoption plays',
  'Product and GTM execution',
]

export default function WhyPauloExperience() {
  const reducedMotion = useReducedMotion()
  const [activeScene, setActiveScene] = useState(0)
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reducedMotion || !playing) return
    const id = window.setInterval(() => {
      setActiveScene((current) => (current + 1) % scenes.length)
    }, 6200)
    return () => window.clearInterval(id)
  }, [playing, reducedMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion || !playing) {
      video.pause()
      return
    }
    void video.play().catch(() => {
      video.pause()
    })
  }, [activeScene, playing, reducedMotion])

  const scene = scenes[activeScene]
  const motionClass = !reducedMotion && playing ? styles.motionEnabled : styles.motionPaused

  const neuralDots = useMemo(() => Array.from({ length: 22 }, (_, index) => index), [])

  return (
    <main className={`${styles.page} ${motionClass}`}>
      <div className={styles.noise} aria-hidden="true" />
      <section className={styles.hero} aria-labelledby="why-paulo-title">
        <div className={styles.neuralMap} aria-hidden="true">
          {neuralDots.map((dot) => (
            <span key={dot} style={{ '--dot-index': dot } as React.CSSProperties} />
          ))}
        </div>

        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Private briefing / ServiceNow AI value</p>
          <h1 id="why-paulo-title">ServiceNow value leader with real AI operating maturity.</h1>
          <p className={styles.heroLead}>
            I am a ServiceNow professional first. My AI and LLM depth exists to help the platform win:
            stronger executive conversations, faster adoption, better governed demos and clearer value expansion.
          </p>
          <div className={styles.heroActions}>
            <a href="mailto:paulo@pierrondi.dev?subject=ServiceNow%20AI%20leadership%20conversation">
              Discuss the fit <ArrowUpRight size={16} />
            </a>
            <a href="#service-now-value">See platform value</a>
          </div>
          <div className={styles.signalStrip} aria-label="Positioning signals">
            <span>ServiceNow-first</span>
            <span>AI governance</span>
            <span>LLM operations</span>
            <span>US field impact</span>
          </div>
        </div>

        <aside className={styles.heroSystem} aria-label="Paulo executive signal">
          <div className={styles.portraitFrame}>
            <Image
              src="/assets/paulo-pierrondi-executive-neural.jpg"
              alt="Paulo Pierrondi"
              fill
              priority
              sizes="(max-width: 760px) 78vw, 360px"
            />
          </div>
          <div className={styles.systemReadout}>
            <span>Operating posture</span>
            <strong>AI depth applied to ServiceNow revenue expansion</strong>
          </div>
        </aside>
      </section>

      <section className={styles.filmSection} aria-labelledby="briefing-film-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Embedded briefing film</p>
          <h2 id="briefing-film-title">A short visual story that stays in context.</h2>
          <p>
            The film is not generic AI theater. It frames AI maturity as a ServiceNow value multiplier:
            platform adoption, governed autonomy, better customer conversations and safer execution.
          </p>
        </div>

        <div className={styles.filmGrid}>
          <div className={styles.filmStage}>
            <video
              key={scene.video}
              ref={videoRef}
              className={styles.filmVideo}
              poster={scene.poster}
              muted
              loop
              playsInline
              autoPlay={!reducedMotion && playing}
              preload="metadata"
            >
              <source src={scene.video} type="video/webm" />
              <source src={scene.fallback} type="video/mp4" />
            </video>
            <div className={styles.filmOverlay}>
              <span>{scene.label}</span>
              <h3>{scene.title}</h3>
              <p>{scene.copy}</p>
            </div>
            <button
              className={styles.playToggle}
              type="button"
              onClick={() => setPlaying((current) => !current)}
              aria-label={playing ? 'Pause briefing film' : 'Play briefing film'}
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
          </div>

          <div className={styles.sceneRail} aria-label="Briefing film scenes">
            {scenes.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={index === activeScene ? styles.sceneActive : undefined}
                onClick={() => setActiveScene(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
                <small>{item.title}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.valueSection} id="service-now-value" aria-labelledby="value-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Why it matters for ServiceNow</p>
          <h2 id="value-title">AI expertise becomes valuable when it moves the platform conversation forward.</h2>
          <p>
            The strongest positioning is not “I use many AI tools.” It is “I can make ServiceNow AI more
            credible, more adoptable and easier to sell because I understand both the enterprise platform
            and the AI operating layer underneath it.”
          </p>
        </div>

        <div className={styles.valueGrid}>
          {valueMoves.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className={styles.valueCard}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.operatingSection} aria-labelledby="operating-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Operating maturity</p>
          <h2 id="operating-title">What leaders should infer without seeing the internal playbook.</h2>
          <p>
            This page deliberately exposes the maturity pattern, not the confidential machinery. The signal is
            disciplined AI management: context, routing, guardrails, evidence and business translation.
          </p>
        </div>

        <div className={styles.operatingFlow}>
          {operatingSignals.map((item, index) => (
            <article key={item.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.platformSection} aria-labelledby="platform-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Platform sales leverage</p>
          <h2 id="platform-title">Where this increases ServiceNow revenue odds.</h2>
        </div>

        <div className={styles.platformGrid}>
          {serviceNowAngles.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title">
        <div className={styles.proofIntro}>
          <p className={styles.kicker}>Proof without oversharing</p>
          <h2 id="proof-title">The maturity signal is real, but intentionally bounded.</h2>
          <p>
            I can speak credibly about AI operations because I run them: model choices, local inference,
            agent routing, memory, evals, observability, cost controls and recovery paths. The point is not
            to expose internals. The point is to show I know how to turn AI from novelty into governed work.
          </p>
        </div>
        <div className={styles.proofGrid}>
          {proofPillars.map(([title, copy]) => (
            <article key={title}>
              <BadgeCheck size={20} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.stackSection} aria-labelledby="stack-title">
        <div>
          <p className={styles.kicker}>Capability stack</p>
          <h2 id="stack-title">Enough detail to show maturity. Not enough to export the system.</h2>
        </div>
        <div className={styles.stackCloud}>
          {capabilityStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className={styles.closeSection} aria-labelledby="close-title">
        <div className={styles.closePanel}>
          <CircleGauge size={28} aria-hidden="true" />
          <h2 id="close-title">The US fit.</h2>
          <p>
            I can help ServiceNow teams convert the AI wave into platform value: clearer executive POVs,
            stronger customer confidence, faster adoption plans and field motions that connect AI capability
            to measurable workflow outcomes.
          </p>
          <a href="mailto:paulo@pierrondi.dev?subject=US%20ServiceNow%20AI%20role%20conversation">
            Start the conversation <ArrowUpRight size={16} />
          </a>
        </div>
        <div className={styles.closeAside}>
          <Cpu size={22} aria-hidden="true" />
          <strong>Positioning thesis</strong>
          <span>ServiceNow first. AI as leverage. Governance as differentiation. Revenue as the test.</span>
        </div>
      </section>
    </main>
  )
}
