'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleGauge,
  Cpu,
  DatabaseZap,
  GitBranch,
  Layers3,
  Network,
  Radar,
  ShieldCheck,
  TerminalSquare,
  Workflow,
  Zap,
} from 'lucide-react'
import { useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styles from './WhyPauloExperience.module.css'

const marketPressures = [
  {
    icon: Zap,
    title: 'The clock is the real competitor',
    copy:
      'In a matter of months the customer conversation jumped from AI roadmap to live experimentation. The threat to ServiceNow is not a feature gap. It is the speed at which others are moving inside the accounts.',
  },
  {
    icon: TerminalSquare,
    title: 'Customers now build without us',
    copy:
      'Local LLMs, vibe-code environments and agent frameworks let business and IT teams prototype workflows before a platform conversation even starts. Every one of those is a workflow ServiceNow could have owned.',
  },
  {
    icon: Radar,
    title: 'Competitors attack the edges first',
    copy:
      'Agentic tools will not replace the estate on day one. They land on intake, approvals, service requests, reporting and small legacy workflows — then expand. That is how install bases erode quietly.',
  },
  {
    icon: Layers3,
    title: 'The upside dwarfs the risk',
    copy:
      'Handled right, this pressure becomes the biggest modernization wave in years: retire fragmented SaaS and legacy apps, govern autonomy, and expand out from the workflow context only ServiceNow holds.',
  },
]

const serviceNowAngles = [
  {
    icon: BadgeCheck,
    title: 'A leader with a serious install base',
    copy:
      'ServiceNow has enterprise trust, workflow depth, data context, executive relevance and a respected customer footprint. That is the foundation to win the agentic shift.',
  },
  {
    icon: CircleGauge,
    title: 'The challenge is speed',
    copy:
      'The market accelerated faster than classic transformation cycles. Customers can now build around us, and competitors can package agents against pieces of our install base.',
  },
  {
    icon: DatabaseZap,
    title: 'The moat is governed execution',
    copy:
      'The winning story is not “more AI features.” It is secure enterprise execution: data, workflow, identity, audit, human gates and measurable business outcomes.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'The field motion must change',
    copy:
      'AI selling needs sharper discovery, stronger proofs, credible demos and a path from operating model to adoption velocity to revenue expansion.',
  },
]

const planSteps = [
  {
    phase: '01',
    icon: Radar,
    title: 'Map the pressure',
    copy:
      'Identify where each customer is building around ServiceNow, which legacy or SaaS apps are vulnerable, and where agentic competitors could enter.',
  },
  {
    phase: '02',
    icon: Network,
    title: 'Pick the replacement plays',
    copy:
      'Prioritize workflows that ServiceNow can absorb with platform data, governed agents and clearer business ownership.',
  },
  {
    phase: '03',
    icon: BrainCircuit,
    title: 'Build credible proofs',
    copy:
      'Turn customer-specific problems into agent demos, adoption narratives and executive POVs that feel real enough to move decisions.',
  },
  {
    phase: '04',
    icon: ShieldCheck,
    title: 'Govern the autonomy',
    copy:
      'Design human gates, data boundaries, telemetry, audit evidence and recovery paths before promising autonomous execution.',
  },
  {
    phase: '05',
    icon: ChartNoAxesCombined,
    title: 'Convert into expansion',
    copy:
      'Connect the operating model to adoption velocity, then convert adoption velocity into expansion and install-base defense.',
  },
]

const firstNinety = [
  {
    window: 'Days 0–30',
    title: 'Listen, map, pick the beachheads',
    points: [
      'Sit with field leaders and top accounts; map exactly where customers are already building AI around ServiceNow.',
      'Pick the 3–5 highest-leverage replacement plays per region and the legacy or SaaS they retire.',
      'Stand up the governance guardrails — human gates, data boundaries, audit — so nothing ships ungoverned.',
    ],
  },
  {
    window: 'Days 30–60',
    title: 'Ship proof that moves a deal',
    points: [
      'Turn one customer problem into a working, governed agent — real data, real workflow, not slideware.',
      'Pair with AEs and SCs to put that proof in front of an economic buyer and tie it to pipeline.',
      'Codify the discovery and demo into a kit the field can run without me in the room.',
    ],
  },
  {
    window: 'Days 60–90',
    title: 'Turn proof into a repeatable motion',
    points: [
      'Roll the play into a second and third account; track adoption velocity and the expansion signal.',
      'Publish the operating model: how ServiceNow positions, governs and expands agentic work.',
      'Hand the field a motion that defends the install base and opens new growth — reported in revenue terms.',
    ],
  },
]

const operatingSignals = [
  { label: 'Context', copy: 'customer narrative, install-base pressure, project memory and reusable plays' },
  { label: 'Routing', copy: 'right model, right agent, right tool and right risk boundary for each task' },
  { label: 'Governance', copy: 'human approval gates, no-secret discipline, audit evidence and production boundaries' },
  { label: 'Evidence', copy: 'working artifacts, tests, visual QA, notes and next actions before claiming done' },
]

const proofPillars = [
  ['AI maturity', 'LLM behavior, Llama/local models, Kimi, GPT, Gemini, Claude, LiteLLM-style routing, evals, cost and context limits.'],
  ['Customer maturity', 'Executive framing, discovery quality, adoption barriers, operating model design and value translation.'],
  ['Platform maturity', 'Now Assist, AI Agents, CMDB/CSDM, workflow context, governance and modernization paths.'],
  ['Execution maturity', 'Preflight, handoffs, evidence trails, visual QA, security boundaries and disciplined agent operations.'],
]

const capabilityStack = [
  'ServiceNow platform strategy',
  'Now Assist / AI Agents positioning',
  'Install-base defense',
  'Legacy and SaaS retirement plays',
  'CSDM and CMDB value framing',
  'Agentic workflow modernization',
  'Llama and local model literacy',
  'LiteLLM-style gateway thinking',
  'Multi-agent operating systems',
  'Prompt caching and cost control',
  'Human-in-the-loop governance',
  'Executive customer storytelling',
  'Field demos and adoption plays',
  'Operating model to revenue expansion',
]

const agentNodes = [
  { label: 'Install-base signal', x: 12, y: 24, mobileX: 23, mobileY: 18, tone: 'cyan' },
  { label: 'Local AI + vibe-code builds', x: 28, y: 66, mobileX: 31, mobileY: 58, tone: 'danger' },
  { label: 'Agent competitors', x: 43, y: 22, mobileX: 72, mobileY: 16, tone: 'danger' },
  { label: 'ServiceNow workflow context', x: 52, y: 52, mobileX: 50, mobileY: 43, tone: 'main' },
  { label: 'Governed agents', x: 74, y: 29, mobileX: 74, mobileY: 29, tone: 'lime' },
  { label: 'Legacy/SaaS retirement', x: 84, y: 67, mobileX: 74, mobileY: 58, tone: 'brass' },
]

const agentQueue = [
  'customer signal intake',
  'application-sprawl analysis',
  'ServiceNow replacement thesis',
  'agent policy and human gate',
  'executive POV and adoption plan',
]

const theaterMetrics = [
  ['3x', 'faster AI POV cycle'],
  ['0', 'secrets exposed'],
  ['1', 'platform-first story'],
]

const motionEase = [0.16, 1, 0.3, 1] as const
const revealViewport = { once: true, amount: 0.18 } as const

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: motionEase },
  },
}

const heroCopyReveal: Variants = {
  hidden: { opacity: 0, x: -34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: motionEase },
  },
}

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: motionEase },
  },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: motionEase },
  },
}

const staggerReveal: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

const agentPaths = [
  'M12 24 C24 18 38 36 52 52',
  'M28 66 C38 60 44 56 52 52',
  'M43 22 C50 28 52 38 52 52',
  'M52 52 C62 42 68 34 74 29',
  'M52 52 C64 58 74 63 84 67',
]

export default function WhyPauloExperience() {
  const reducedMotion = useReducedMotion()
  const neuralDots = useMemo(() => Array.from({ length: 26 }, (_, index) => index), [])
  const motionClass = reducedMotion ? styles.motionPaused : styles.motionEnabled

  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : 80])
  const heroFade = useTransform(heroProgress, [0, 1], [1, reducedMotion ? 1 : 0])
  const neuralY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : -120])
  const revealProps = reducedMotion
    ? { initial: 'visible' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: revealViewport }
  const loadProps = reducedMotion
    ? { initial: 'visible' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const }
  const cardHover = reducedMotion ? undefined : { y: -7, borderColor: 'rgba(200, 255, 46, 0.34)' }
  const softHover = reducedMotion ? undefined : { y: -3, scale: 1.015 }

  return (
    <main className={`${styles.page} ${motionClass}`}>
      <div className={styles.noise} aria-hidden="true" />

      <motion.section
        ref={heroRef}
        className={styles.hero}
        aria-labelledby="why-paulo-title"
        {...loadProps}
        variants={sectionReveal}
      >
        <motion.div className={styles.neuralMap} aria-hidden="true" style={{ y: neuralY, opacity: heroFade }}>
          {neuralDots.map((dot) => (
            <span key={dot} style={{ '--dot-index': dot } as CSSProperties} />
          ))}
        </motion.div>

        <motion.div className={styles.heroCopy} variants={heroCopyReveal} style={{ y: heroCopyY }}>
          <p className={styles.kicker}>The case to make me ServiceNow&apos;s AI person</p>
          <h1 id="why-paulo-title">Every vendor has an AI story. I&apos;m the rare one who actually runs the system.</h1>
          <p className={styles.heroLead}>
            ServiceNow already owns the install base, the workflow context and the enterprise trust to win
            the agentic era. What it needs is a person who lives where AI operating depth meets enterprise
            field execution — who can sit with a CIO in the morning and ship a governed agent in the
            afternoon. That is the job I already do every day. Hire me to do it for ServiceNow.
          </p>
          <div className={styles.heroActions}>
            <a href="#agentic-plan">
              See how I&apos;d win <ArrowUpRight size={16} />
            </a>
            <a href="#why-me">Why me, specifically</a>
          </div>
          <div className={styles.signalStrip} aria-label="Positioning signals">
            <span>Operates AI daily</span>
            <span>Speaks to the C-suite</span>
            <span>Ships governed agents</span>
            <span>Measured in revenue</span>
          </div>
        </motion.div>

        <motion.aside className={styles.pressurePanel} aria-label="Market pressure readout" variants={panelReveal}>
          <div className={styles.pressureHeader}>
            <Cpu size={22} aria-hidden="true" />
            <span>Live market readout</span>
          </div>
          <div className={styles.pressureGauge} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <ul>
            <li>
              <strong>Customers</strong>
              <span>building AI workflows locally</span>
            </li>
            <li>
              <strong>Competitors</strong>
              <span>packaging agentic app builders</span>
            </li>
            <li>
              <strong>ServiceNow</strong>
              <span>able to turn workflow context into governed execution</span>
            </li>
          </ul>
        </motion.aside>
      </motion.section>

      <motion.section className={styles.marketSection} aria-labelledby="market-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>The panorama</p>
          <h2 id="market-title">The agentic shift is already inside your accounts.</h2>
          <p>
            This is the read I would bring to leadership on day one: AI has already changed how customers
            imagine software, how fast they expect results, and how quietly a competitor can take a slice of
            workflow value. The window to lead this — instead of defend against it — is open right now.
          </p>
        </div>

        <motion.div className={styles.marketGrid} variants={staggerReveal}>
          {marketPressures.map((item) => {
            const Icon = item.icon
            return (
              <motion.article key={item.title} variants={cardReveal} whileHover={cardHover}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section className={styles.agentSection} aria-labelledby="agent-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.agentLayout}>
          <motion.div className={styles.agentNarrative} variants={heroCopyReveal}>
            <p className={styles.kicker}>How I&apos;d run the role</p>
            <h2 id="agent-title">Not another AI demo. A repeatable customer modernization motion.</h2>
            <p>
              My playbook is simple and it scales: find where customers are quietly building around
              ServiceNow, show them what can be retired, and move that work onto governed agents and
              workflows on the platform. AI stops being a science project and becomes install-base
              defense plus expansion — measured in pipeline, not slides.
            </p>
            <div className={styles.theaterStats} aria-label="Execution signals">
              {theaterMetrics.map(([value, label]) => (
                <motion.div key={label} whileHover={softHover}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.agentTheater}
            aria-label="Visual model of agents executing customer modernization work"
            variants={panelReveal}
          >
            <div className={styles.agentCanvas}>
              <svg className={styles.agentLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {agentPaths.map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    initial={reducedMotion ? undefined : { pathLength: 0.24, opacity: 0.28 }}
                    animate={
                      reducedMotion
                        ? undefined
                        : { pathLength: [0.24, 1, 0.42], opacity: [0.32, 0.86, 0.42] }
                    }
                    transition={{ duration: 4.2 + index * 0.34, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </svg>
              {agentNodes.map((node, index) => (
                <motion.div
                  key={node.label}
                  className={styles.agentNode}
                  data-tone={node.tone}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: [0.9, 1, 0.92],
                          borderColor: [
                            'rgba(247, 245, 238, 0.16)',
                            index === 3 ? 'rgba(200, 255, 46, 0.54)' : 'rgba(247, 245, 238, 0.3)',
                            'rgba(247, 245, 238, 0.16)',
                          ],
                        }
                  }
                  transition={{ duration: 3.8 + index * 0.22, repeat: Infinity, ease: 'easeInOut' }}
                  style={
                    {
                      '--x': `${node.x}%`,
                      '--y': `${node.y}%`,
                      '--mobile-x': `${node.mobileX}%`,
                      '--mobile-y': `${node.mobileY}%`,
                    } as CSSProperties
                  }
                >
                  <span />
                  <strong>{node.label}</strong>
                </motion.div>
              ))}
              <motion.div
                className={styles.executionCore}
                animate={reducedMotion ? undefined : { boxShadow: ['0 0 0 rgba(200, 255, 46, 0)', '0 0 34px rgba(200, 255, 46, 0.2)', '0 0 0 rgba(200, 255, 46, 0)'] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <GitBranch size={18} aria-hidden="true" />
                <strong>agentic operating loop</strong>
                <span>discover → govern → prove → expand</span>
              </motion.div>
            </div>

            <motion.div className={styles.taskQueue} aria-label="Agent task queue" variants={staggerReveal}>
              {agentQueue.map((task, index) => (
                <motion.div key={task} variants={cardReveal} whileHover={softHover} style={{ '--queue-index': index } as CSSProperties}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{task}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.serviceNowSection}
        id="service-now-position"
        aria-labelledby="service-now-title"
        {...revealProps}
        variants={sectionReveal}
      >
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>ServiceNow position</p>
          <h2 id="service-now-title">You&apos;re winning. The one missing piece is a translator.</h2>
          <p>
            Let me be balanced and honest: ServiceNow is a leader with a serious install base and a workflow
            advantage no one else has. The only real exposure is speed — agentic competitors and
            customer-built AI move faster than classic transformation motions. Closing that gap is less about
            more AI features and more about a person who can translate AI capability into enterprise outcomes.
          </p>
        </div>

        <motion.div className={styles.serviceNowGrid} variants={staggerReveal}>
          {serviceNowAngles.map((item) => {
            const Icon = item.icon
            return (
              <motion.article key={item.title} variants={cardReveal} whileHover={cardHover}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section className={styles.planSection} id="agentic-plan" aria-labelledby="plan-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>My plan in the seat</p>
          <h2 id="plan-title">What I&apos;d do with the role — turn AI urgency into adoption and expansion.</h2>
          <p>
            This is where customer knowledge and AI operating maturity stop being a résumé line and become a
            repeatable field motion. Five moves, run account by account, that defend the install base and open
            new growth.
          </p>
        </div>

        <motion.div className={styles.planGrid} variants={staggerReveal}>
          {planSteps.map((item) => {
            const Icon = item.icon
            return (
              <motion.article key={item.phase} className={styles.planStep} variants={cardReveal} whileHover={cardHover}>
                <span>{item.phase}</span>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section className={styles.ninetySection} aria-labelledby="ninety-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>First 90 days</p>
          <h2 id="ninety-title">What you&apos;d see from me in the first quarter.</h2>
          <p>
            No ramp-up theater. A time-boxed plan that produces a governed proof and a repeatable field
            motion before the quarter closes.
          </p>
        </div>

        <motion.div className={styles.ninetyGrid} variants={staggerReveal}>
          {firstNinety.map((phase) => (
            <motion.article key={phase.window} className={styles.ninetyCard} variants={cardReveal} whileHover={cardHover}>
              <span className={styles.ninetyWindow}>{phase.window}</span>
              <h3>{phase.title}</h3>
              <ul>
                {phase.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.operatingSection} aria-labelledby="operating-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>How I actually operate AI</p>
          <h2 id="operating-title">I run governed AI every day — this is the discipline I&apos;d bring in.</h2>
          <p>
            I&apos;m showing the operating pattern, not the confidential machinery. The point is that I treat AI
            the way an enterprise has to: context, routing, guardrails, evidence and business translation — not
            prompts and vibes.
          </p>
        </div>

        <motion.div className={styles.operatingFlow} variants={staggerReveal}>
          {operatingSignals.map((item, index) => (
            <motion.article key={item.label} variants={cardReveal} whileHover={softHover}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.proofSection} id="why-me" aria-labelledby="proof-title" {...revealProps} variants={sectionReveal}>
        <motion.div className={styles.proofIntro} variants={heroCopyReveal}>
          <p className={styles.kicker}>Why me, specifically</p>
          <h2 id="proof-title">The combination almost no one has — all four at once.</h2>
          <p>
            Plenty of people have one or two of these. The value is in holding all four together: the AI
            engineer who understands the customer, the platform and how to ship. That intersection is exactly
            where ServiceNow needs to win the agentic era — and it is where I already live.
          </p>
        </motion.div>
        <motion.div className={styles.proofGrid} variants={staggerReveal}>
          {proofPillars.map(([title, copy]) => (
            <motion.article key={title} variants={cardReveal} whileHover={cardHover}>
              <BadgeCheck size={20} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.stackSection} aria-labelledby="stack-title" {...revealProps} variants={sectionReveal}>
        <motion.div variants={heroCopyReveal}>
          <p className={styles.kicker}>What I bring on day one</p>
          <h2 id="stack-title">AI-fluent enough to make ServiceNow more valuable — fast.</h2>
        </motion.div>
        <motion.div className={styles.stackCloud} variants={staggerReveal}>
          {capabilityStack.map((item) => (
            <motion.span key={item} variants={cardReveal} whileHover={softHover}>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className={styles.authorSection} aria-labelledby="author-title" {...revealProps} variants={sectionReveal}>
        <motion.div className={styles.authorPhoto} variants={panelReveal} whileHover={softHover}>
          <Image
            src="/assets/paulo-pierrondi-executive-neural.jpg"
            alt="Paulo Pierrondi"
            fill
            sizes="(max-width: 760px) 86vw, 340px"
          />
        </motion.div>
        <motion.div className={styles.authorPanel} variants={panelReveal}>
          <p className={styles.kicker}>The ask</p>
          <h2 id="author-title">Make me ServiceNow&apos;s AI person.</h2>
          <p>
            I&apos;m a ServiceNow professional with rare, hands-on AI and LLM operating depth. I don&apos;t want
            to sit beside the platform — I want to make it the place where governed agents create measurable
            enterprise value. Give me the role and I&apos;ll turn AI urgency into adoption velocity,
            install-base defense and expansion. This is the highest-leverage hire you can make this year.
          </p>
          <div className={styles.authorActions}>
            <a href="mailto:paulo@pierrondi.dev?subject=US%20ServiceNow%20AI%20role%20conversation">
              Let&apos;s talk about the role <ArrowUpRight size={16} />
            </a>
            <span>
              <Workflow size={16} aria-hidden="true" />
              ServiceNow first. AI as leverage. Revenue as the test.
            </span>
          </div>
        </motion.div>
      </motion.section>
    </main>
  )
}
