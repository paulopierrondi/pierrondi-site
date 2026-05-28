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
import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styles from './WhyPauloExperience.module.css'

const marketPressures = [
  {
    icon: Zap,
    title: 'The cycle compressed',
    copy:
      'In roughly two months, the customer conversation moved from AI roadmap to active experimentation. AI is no longer a future theme. It is a present operating pressure.',
  },
  {
    icon: TerminalSquare,
    title: 'Customers can now build',
    copy:
      'Local LLMs, vibe-code environments and agent frameworks let business and technology teams prototype new workflows before a platform conversation even starts.',
  },
  {
    icon: Radar,
    title: 'Competitors attack the edges',
    copy:
      'Agentic tools will not begin by replacing the whole estate. They will start around intake, approvals, service requests, reporting and small legacy workflows.',
  },
  {
    icon: Layers3,
    title: 'The platform opportunity is bigger',
    copy:
      'ServiceNow can turn this pressure into modernization: retire fragmented SaaS and legacy apps, govern autonomy and expand from workflow context.',
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

      <motion.section className={styles.hero} aria-labelledby="why-paulo-title" {...loadProps} variants={sectionReveal}>
        <div className={styles.neuralMap} aria-hidden="true">
          {neuralDots.map((dot) => (
            <span key={dot} style={{ '--dot-index': dot } as CSSProperties} />
          ))}
        </div>

        <motion.div className={styles.heroCopy} variants={heroCopyReveal}>
          <p className={styles.kicker}>Private briefing / ServiceNow agentic strategy</p>
          <h1 id="why-paulo-title">AI is not the future. It is the platform battleground now.</h1>
          <p className={styles.heroLead}>
            ServiceNow has the install base, workflow context and enterprise trust to win the agentic shift.
            The risk is speed: customers and competitors are already building AI around the platform with
            local models, vibe-code tools and agentic applications.
          </p>
          <div className={styles.heroActions}>
            <a href="#agentic-plan">
              Review the plan <ArrowUpRight size={16} />
            </a>
            <a href="#service-now-position">ServiceNow position</a>
          </div>
          <div className={styles.signalStrip} aria-label="Positioning signals">
            <span>ServiceNow first</span>
            <span>Agentic modernization</span>
            <span>Client maturity</span>
            <span>Governed execution</span>
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
          <h2 id="market-title">The conversation changed faster than the enterprise buying cycle.</h2>
          <p>
            This is the point I would make to leaders: AI is already changing how customers imagine software,
            how fast they expect prototypes, and how competitors can capture pieces of workflow value.
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
            <p className={styles.kicker}>Agent execution model</p>
            <h2 id="agent-title">The answer is not another AI demo. It is a customer modernization motion.</h2>
            <p>
              My thesis is to use AI maturity to help ServiceNow defend and expand the install base:
              find where customers are creating workarounds, show what can be retired, and move them into
              governed agents and workflows on the platform.
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
          <h2 id="service-now-title">Respect the leadership position. Name the challenge clearly.</h2>
          <p>
            The credible message is balanced: ServiceNow is a leading technology company with a serious install
            base and a unique workflow advantage. The challenge is that agentic competitors and customer-built
            AI are moving faster than traditional transformation motions.
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
          <p className={styles.kicker}>My plan</p>
          <h2 id="plan-title">Turn AI urgency into ServiceNow adoption and expansion.</h2>
          <p>
            This is where my customer knowledge and AI operating maturity matter: not as a side interest, but as
            a practical field motion for platform value, install-base defense and new growth.
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

      <motion.section className={styles.operatingSection} aria-labelledby="operating-title" {...revealProps} variants={sectionReveal}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Operating maturity</p>
          <h2 id="operating-title">Enough depth to execute. Enough restraint to avoid exporting the system.</h2>
          <p>
            This page deliberately exposes the maturity pattern, not the confidential machinery. The signal is
            disciplined AI management: context, routing, guardrails, evidence and business translation.
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

      <motion.section className={styles.proofSection} aria-labelledby="proof-title" {...revealProps} variants={sectionReveal}>
        <motion.div className={styles.proofIntro} variants={heroCopyReveal}>
          <p className={styles.kicker}>Proof without oversharing</p>
          <h2 id="proof-title">The maturity signal is real, but intentionally bounded.</h2>
          <p>
            I can speak credibly about AI operations because I run them. The point is not to expose internals.
            The point is to show I know how to turn AI from novelty into governed work that helps customers move.
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
          <p className={styles.kicker}>Capability stack</p>
          <h2 id="stack-title">AI expert enough to make ServiceNow more valuable.</h2>
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
          <p className={styles.kicker}>Author</p>
          <h2 id="author-title">Paulo Pierrondi</h2>
          <p>
            ServiceNow professional with practical AI and LLM operating depth. My focus is not to become separate
            from the platform. It is to help ServiceNow customers move faster, retire fragmented applications and
            convert governed agents into measurable enterprise value.
          </p>
          <div className={styles.authorActions}>
            <a href="mailto:paulo@pierrondi.dev?subject=US%20ServiceNow%20AI%20role%20conversation">
              Start the conversation <ArrowUpRight size={16} />
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
