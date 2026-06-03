'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Bot,
  Database,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Network,
  Rocket,
  ScrollText,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FsoAgentSwarm from './FsoAgentSwarm'
import styles from './FsoExperience.module.css'

const LIVE_APP = 'https://csdm-validator-production.up.railway.app'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

function Reveal({
  children,
  className,
  reduced,
}: {
  children: ReactNode
  className?: string
  reduced: boolean | null
}) {
  return (
    <motion.section
      className={className}
      variants={fadeUp}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      {children}
    </motion.section>
  )
}

/* ─────────────────────────── data ─────────────────────────── */

const shiftStats: Array<{ value: string; label: string; foot: string }> = [
  { value: '8–18k', label: 'hours per FSO program', foot: 'Bradesco-scale banking build' },
  { value: '32–64', label: 'weeks, start to hypercare', foot: 'services ≈ 75% of year-1 spend' },
  { value: '50–65%', label: 'of effort is authoring', foot: 'FSDM mapping · integrations · ATF · SoD' },
  { value: '0', label: 'of that is judgment work', foot: 'it is exactly what coding agents do well' },
]

type Lane = {
  tag: string
  title: string
  owner: string
  items: string[]
  meter: string
}

const lanes: Lane[] = [
  {
    tag: 'Build-time',
    title: 'Authoring lane',
    owner: 'Codex · Claude Code',
    items: [
      'FSDM source-to-target mappings',
      'Fluent (TS DSL) → sys_update_xml',
      'FSDM conformance rule sets',
      'ATF tests · Flow Designer · IRE transforms',
      'sn_devops CI/CD promotion',
    ],
    meter: 'Runs outside the instance, on your LLM spend — outside assist metering.',
  },
  {
    tag: 'Runtime',
    title: 'Reasoning lane',
    owner: 'Now Assist for FSO · AI Agents',
    items: [
      'Dispute / Claims / Complaint Case Summarization',
      '“Resolving ACH Disputes” — 4-agent workflow',
      'Friendly-fraud (Visa CE 3.0) automation',
      '“Report a Dispute” Virtual Agent intake',
      'Governed, grounded, audited reasoning',
    ],
    meter: 'Runs inside the instance, metered in assists — FSO Pro Plus / Enterprise Plus.',
  },
]

type Agent = {
  num: string
  name: string
  role: string
  artifact: string
  gate: string
  icon: LucideIcon
}

const agents: Agent[] = [
  {
    num: '00',
    name: 'Orchestrator',
    role: 'Sequences the 9-phase lifecycle, routes increments, enforces assess-first.',
    artifact: 'Execution plan · increment backlog · gate-decision log',
    gate: 'Owns the write-gate; escalates any prod / unknown target.',
    icon: Workflow,
  },
  {
    num: '01',
    name: 'FSDM Data Architect',
    role: 'Maps legacy core-banking schema to the Financial Services Data Model.',
    artifact: 'Source→target map · data dictionary · FSDM load-order plan',
    gate: 'Architect signs Consumer-vs-Contact + account hierarchy.',
    icon: Database,
  },
  {
    num: '02',
    name: 'Config / Metadata Generator',
    role: 'Authors FSO case types, states, SLAs, queues, ACL / SoD matrix.',
    artifact: 'Fluent app files → sys_update_xml · ACL/SoD matrix',
    gate: 'Compliance review of ACL/SoD (regulator-facing).',
    icon: ScrollText,
  },
  {
    num: '03',
    name: 'Process / Flow Builder',
    role: 'Builds Flow Designer flows, Script Includes, dispute/payment playbooks.',
    artifact: 'sys_hub_flow · Script Includes · Business Rules',
    gate: 'Human review of every flow + AI-agent guardrails.',
    icon: GitBranch,
  },
  {
    num: '04',
    name: 'Integration Builder',
    role: 'Scaffolds spokes for core banking, payments, KYC/AML from API specs.',
    artifact: 'IntegrationHub spokes · transform maps · idempotency',
    gate: 'Architect validates real-time-vs-batch + throttling.',
    icon: Network,
  },
  {
    num: '05',
    name: 'Migration & IRE Agent',
    role: 'Cleanse → load → reconcile in FSDM order, through the IRE only.',
    artifact: 'Transforms · reconciliation diffs · standalone Background Script',
    gate: 'Cutover approval + PII gate; zero orphan accounts.',
    icon: Server,
  },
  {
    num: '06',
    name: 'ATF Test Generator',
    role: 'Authors ATF for every case type, ACL/SoD rule, and integration path.',
    artifact: 'sys_atf_test suites · negative & SoD coverage',
    gate: 'Test Lead sign-off; UAT judgment stays human.',
    icon: Activity,
  },
  {
    num: '07',
    name: 'Validator / Quality',
    role: 'Runs declarative rules as the acceptance gate after every increment.',
    artifact: 'Maturity scorecard · blocking-rule backlog · safe fixes',
    gate: 'Auto-remediate only at confidence ≥ 0.95.',
    icon: ShieldCheck,
  },
  {
    num: '08',
    name: 'Change & Doc Writer',
    role: 'Requirement→config traceability, change narratives, runbooks.',
    artifact: 'Change docs · update-set inventory · rollback runbook',
    gate: 'Release Manager review before promotion.',
    icon: FileCheck2,
  },
]

const loop: Array<{ step: string; name: string; desc: string }> = [
  { step: '1', name: 'Spec', desc: 'Assessment engine turns the instance state + requirements into a typed spec.' },
  { step: '2', name: 'Build', desc: 'Agents author Fluent / rules / ATF — deterministic, version-controlled artifacts.' },
  { step: '3', name: 'Apply', desc: 'Only through the write-gate: PDI auto · sub-prod approval · prod blocked.' },
  { step: '4', name: 'Validate', desc: 'The rule engine + ATF + Instance Scan re-run as the acceptance gate.' },
  { step: '5', name: 'Document', desc: 'Auto change narrative, traceability and durable rollback.' },
]

const phases: Array<{ when: string; what: string; delta: string; lever: string }> = [
  { when: 'Discovery', what: 'Auto-fill the FSO Case Type Questionnaire; baseline the instance via MCP.', delta: '4 wks → ~1.5 wks', lever: 'High' },
  { when: 'FSDM design', what: 'Map legacy schema → FSDM; emit machine-verified conformance rules.', delta: '2–3 wks → days', lever: 'High' },
  { when: 'Configuration', what: 'Case types, SLAs, the full ACL/SoD matrix as reviewable Fluent.', delta: 'weeks → days', lever: 'Med-High' },
  { when: 'Process / Flow', what: 'Flows, Script Includes, dispute playbooks; AI-Agent configs scaffolded.', delta: 'weeks → days', lever: 'Med-High' },
  { when: 'Integrations', what: 'Spokes + transforms + idempotency scaffolded from API specs.', delta: '6–15 @ 2–6 wks → hours', lever: 'High' },
  { when: 'Migration', what: 'IRE-ordered load + continuous reconciliation diff before cutover.', delta: 'money-pit → dashboard', lever: 'Very High' },
  { when: 'Testing', what: 'ATF regenerates on config drift; native agent root-causes failures.', delta: 'maintenance tax → 0', lever: 'Very High' },
  { when: 'Release', what: 'sn_devops promotion; Instance Scan gate; collision resolution.', delta: 'manual merge → gated', lever: 'Medium' },
  { when: 'Hypercare', what: 'The instance scores its own health daily; a score drop is the alarm.', delta: 'firefighting → telemetry', lever: 'Medium' },
]

const gates: Array<{ name: string; desc: string }> = [
  { name: 'ATF', desc: 'Broken flows, ACL/SoD regressions, integration breaks — negative + SoD tests, not just happy-path. Green suite is the precondition for promotion.' },
  { name: 'Instance Scan', desc: 'Anti-patterns, hard-coded sys_ids, GlideRecord-in-loop, ACL gaps, deprecated APIs. Zero criticals before an update set is reviewable.' },
  { name: 'Validator rules', desc: 'FSDM completeness, orphan Financial Accounts, missing Related Parties. A weighted stage score is the numeric acceptance threshold.' },
  { name: 'Update-set review', desc: 'A human + the release-guardian contract inspect the diff. Agents emit a reviewable artifact, never a blind live write.' },
  { name: 'Change approval', desc: 'Business / regulatory judgment, timing, blast radius. Non-prod approval ≠ prod approval. The gate is in code, not a wiki.' },
]

const peopleStays: Array<{ role: string; desc: string }> = [
  { role: 'Solution architect', desc: 'Signs the Consumer-vs-Contact + account-hierarchy decisions. Wrong call = post-migration rework.' },
  { role: 'FSO SME', desc: 'Reviews every flow and tunes AI-agent prompts / guardrails. Ungoverned agent behavior is the risk.' },
  { role: 'Business users (UAT)', desc: 'Own acceptance judgment. Agents author the tests; humans decide what “done” means.' },
  { role: 'Release manager', desc: 'Approves prod promotion. Agents never push to a customer production instance.' },
  { role: 'Risk & compliance', desc: 'Sign the ACL/SoD matrix and regulatory config — a first-class, regulator-facing phase.' },
]

const honest: string[] = [
  'FSO is absent from a stock PDI — exact sn_bom_* table names confirm via describe_table on a provisioned FSO instance.',
  'Fluent app-file authoring / export, ATF + Flow generation, and deep FSDM-conformance rules are the net-new build, layered on the existing engine.',
  'Rollback is in-memory today (24h TTL) — must be persisted before any customer write-back.',
  'Native AI runtime behavior, grounding and metering live inside the instance under Now Assist licensing — external agents do not own that lane.',
  'Effort figures are planning bands calibrated to the grounded envelope, not vendor commitments.',
]

const sprints: Array<{ tag: string; title: string; desc: string; gate: string }> = [
  {
    tag: 'Sprint 1 · D0–30',
    title: 'Assess + Scaffold',
    desc: 'Provision an FSO instance, baseline with the assessment engine, author the FSDM seed as a standalone Background Script, generate the Card Dispute case type as Fluent.',
    gate: 'G1 — Readiness baseline: Fluent compiles & installs clean.',
  },
  {
    tag: 'Sprint 2 · D31–60',
    title: 'Build + Write-back',
    desc: 'Build the 3 dispute paths, run the migration / reconcile dry-run, agent-driven write-back at confidence ≥ 0.95, wire Now Assist Dispute Summarization + the ACH 4-agent workflow.',
    gate: 'G2 — Clean write-back: zero orphan accounts, all writes auditable.',
  },
  {
    tag: 'Sprint 3 · D61–90',
    title: 'Prove + Harden',
    desc: 'Author ATF suites, promote dev→test via sn_devops + Instance Scan, compile the measured metrics pack, run the insider review with the governance trail in AI Control Tower.',
    gate: 'G3 — Proof: ATF green, scan clean, metrics hit target, insider sign-off.',
  },
]

const metrics: Array<{ value: string; label: string }> = [
  { value: '≥ 70%', label: 'artifacts auto-generated' },
  { value: '≥ 85%', label: 'ATF coverage (incl. SoD)' },
  { value: '0', label: 'orphan Financial Accounts' },
  { value: '100%', label: 'writes with audit + rollback' },
  { value: '40–55%', label: 'faster build cycle' },
]

const exampleBullets: string[] = [
  'A declarative rule engine that scores CMDB/CSDM maturity — the same shape FSDM conformance needs.',
  'A fix engine that suggests and writes back to the instance, gated at ≥ 0.95 confidence, with snapshot rollback.',
  'A ServiceNow client 1:1 with the MCP tools — query, patch, aggregate, describe, IRE create.',
  'The Demo Forge write-gate: PDI auto · sub-prod approval · prod blocked.',
  'An FSO probe that already detects real Zurich sn_bom_* tables.',
]

const openingLine =
  '“ServiceNow shipped the rails — the Fluent SDK plugins for Claude Code / Codex and the native MCP server. I want to prove the operating model on top of them: a 90-day lighthouse where coding agents author a full Card Dispute build on FSDM, and Now Assist for FSO runs the ACH agentic workflow at runtime. External agents own the authoring lane, native AI owns the runtime lane, AI Control Tower governs both. Want to co-define the success gates?”'

/* ─────────────────────────── component ─────────────────────────── */

export default function FsoExperience() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <main className={styles.shell} ref={containerRef}>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: reduced ? 1 : progressScaleX }}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* ─────────── HERO ─────────── */}
        <header className={styles.hero}>
          <div className={styles.heroBg}>
            <FsoAgentSwarm />
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroGrid} aria-hidden="true" />
          </div>

          <motion.div
            className={styles.heroInner}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className={styles.heroChips}>
              <span className={styles.chip}><span className={styles.chipDot} /> ServiceNow</span>
              <span className={styles.chip}>FSO · Financial Services Operations</span>
              <span className={styles.chip}>Fluent SDK</span>
              <span className={styles.chip}>Claude Code · Codex</span>
            </div>

            <h1 className={styles.heroTitle}>
              ServiceNow <em>Implementation Agents</em>
            </h1>
            <p className={styles.heroLede}>
              An AI implementation team that builds <strong>Financial Services Operations</strong> end to
              end — discovery to hypercare. External coding agents author the build; native Now Assist
              reasons at runtime; every change passes the same gates a regulated bank already trusts.
            </p>

            <div className={styles.heroMeta}>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Audience</span>
                <span className={styles.heroMetaValue}>ServiceNow internal</span>
              </div>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Product</span>
                <span className={styles.heroMetaValue}>FSO · Banking</span>
              </div>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Outcome</span>
                <span className={styles.heroMetaValue}>Adoption velocity</span>
              </div>
            </div>

            <div className={styles.heroCtas}>
              <a className={styles.ctaPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">
                See the working example <ArrowRight size={16} strokeWidth={2.2} />
              </a>
              <a className={styles.ctaGhost} href="#pilot">Jump to the 90-day pilot</a>
            </div>
          </motion.div>
        </header>

        {/* ─────────── THE SHIFT ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>the shift</span>
            <h2 className={styles.sectionTitle}>
              The ceiling on FSO revenue is services throughput — not license demand.
            </h2>
            <p className={styles.sectionSub}>
              Programs stall in FSDM mapping, integration scaffolding, ATF authoring and SoD work. None of
              it is judgment — it is authoring. That is the share LLM coding agents remove, deterministically.
            </p>
          </div>
          <motion.div
            className={styles.statGrid}
            variants={stagger}
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {shiftStats.map((s) => (
              <motion.div key={s.label} className={styles.statCard} variants={cardItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statFoot}>{s.foot}</span>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── TWO LANES ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>the operating model</span>
            <h2 className={styles.sectionTitle}>Two lanes that compose — not compete.</h2>
            <p className={styles.sectionSub}>
              ServiceNow built the SDK plugins and the MCP server <em>so external agents compose with the
              platform.</em> External agents author; native AI reasons; AI Control Tower governs both.
            </p>
          </div>

          <div className={styles.laneGrid}>
            {lanes.map((lane) => (
              <motion.article
                key={lane.title}
                className={styles.laneCard}
                variants={cardItem}
                initial={reduced ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className={styles.laneHead}>
                  <span className={styles.laneTag}>{lane.tag}</span>
                  <h3 className={styles.laneTitle}>{lane.title}</h3>
                  <span className={styles.laneOwner}>{lane.owner}</span>
                </div>
                <ul className={styles.laneList}>
                  {lane.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.laneFoot}>{lane.meter}</p>
              </motion.article>
            ))}
          </div>

          <div className={styles.seamRow}>
            <span className={styles.seamLabel}>composition seams ServiceNow shipped</span>
            <div className={styles.seamChips}>
              <span className={styles.seamChip}>Fluent SDK <i>build-time</i></span>
              <span className={styles.seamChip}>Native MCP server / client + A2A <i>runtime</i></span>
              <span className={styles.seamChip}>AI Control Tower <i>governs both</i></span>
            </div>
          </div>
        </Reveal>

        {/* ─────────── THE AGENT TEAM ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>the implementation team</span>
            <h2 className={styles.sectionTitle}>Nine agents. One governed build.</h2>
            <p className={styles.sectionSub}>
              Each agent has a responsibility, a concrete ServiceNow output artifact, and an explicit human
              gate — a real implementation team, expressed as agents.
            </p>
          </div>

          <motion.div
            className={styles.agentGrid}
            variants={stagger}
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            {agents.map((agent) => {
              const Icon = agent.icon
              return (
                <motion.article
                  key={agent.name}
                  className={styles.agentCard}
                  variants={cardItem}
                  whileHover={reduced ? undefined : { y: -6, borderColor: 'rgba(35, 194, 207, 0.55)' }}
                >
                  <div className={styles.agentTop}>
                    <span className={styles.agentIcon}><Icon size={20} strokeWidth={1.8} /></span>
                    <span className={styles.agentNum}>{agent.num}</span>
                  </div>
                  <h3 className={styles.agentName}>{agent.name}</h3>
                  <p className={styles.agentRole}>{agent.role}</p>
                  <div className={styles.agentMetaRow}>
                    <span className={styles.agentMetaLabel}>Emits</span>
                    <span className={styles.agentArtifact}>{agent.artifact}</span>
                  </div>
                  <div className={styles.agentGate}>
                    <ShieldCheck size={13} strokeWidth={2} />
                    {agent.gate}
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </Reveal>

        {/* ─────────── THE LOOP ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>how every increment runs</span>
            <h2 className={styles.sectionTitle}>Spec → build → apply → validate → document.</h2>
            <p className={styles.sectionSub}>
              One case type, one integration, one data domain at a time. Agents emit artifacts; the gate
              decides what reaches the instance.
            </p>
          </div>
          <motion.div
            className={styles.loopRow}
            variants={stagger}
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {loop.map((s, i) => (
              <motion.div key={s.name} className={styles.loopStep} variants={cardItem}>
                <span className={styles.loopStepNum}>{s.step}</span>
                <span className={styles.loopStepName}>{s.name}</span>
                <span className={styles.loopStepDesc}>{s.desc}</span>
                {i < loop.length - 1 && <span className={styles.loopArrow} aria-hidden="true">→</span>}
              </motion.div>
            ))}
          </motion.div>
          <div className={styles.writeGate}>
            <span className={styles.writeGateLabel}>write-gate by target</span>
            <div className={styles.writeGateItems}>
              <span className={`${styles.gateChip} ${styles.gateAuto}`}>PDI / demo → auto</span>
              <span className={`${styles.gateChip} ${styles.gateApproval}`}>customer sub-prod → approval</span>
              <span className={`${styles.gateChip} ${styles.gateBlocked}`}>prod / unknown → blocked</span>
            </div>
          </div>
        </Reveal>

        {/* ─────────── PHASE PLAYBOOK ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>discovery → hypercare</span>
            <h2 className={styles.sectionTitle}>The phase-by-phase playbook.</h2>
            <p className={styles.sectionSub}>
              What the agents do per phase, and the credible before → after — without touching the two phases
              AI should not own: OOTB configuration judgment and UAT acceptance.
            </p>
          </div>
          <motion.div
            className={styles.phaseList}
            variants={stagger}
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            {phases.map((p) => (
              <motion.div key={p.when} className={styles.phaseRow} variants={cardItem}>
                <span className={styles.phaseWhen}>{p.when}</span>
                <span className={styles.phaseWhat}>{p.what}</span>
                <span className={styles.phaseDelta}>{p.delta}</span>
                <span className={`${styles.phaseLever} ${styles[`lev${p.lever.replace(/[^A-Za-z]/g, '')}`] ?? ''}`}>{p.lever}</span>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ─────────── ERROR & PEOPLE HANDLING ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>error handling · people handling</span>
            <h2 className={styles.sectionTitle}>The part that makes it defensible.</h2>
            <p className={styles.sectionSub}>
              Agent output is treated as a pull request against a regulated system — never an oracle. Machines
              catch machine errors; humans keep the judgment that should stay human.
            </p>
          </div>

          <div className={styles.govGrid}>
            <div className={styles.govCol}>
              <h3 className={styles.govColTitle}><ShieldCheck size={16} strokeWidth={2} /> Error handling — the gate stack</h3>
              <div className={styles.gateList}>
                {gates.map((g) => (
                  <div key={g.name} className={styles.gateBlock}>
                    <span className={styles.gateBlockName}>{g.name}</span>
                    <p className={styles.gateBlockDesc}>{g.desc}</p>
                  </div>
                ))}
              </div>
              <p className={styles.govNote}>
                No auto-apply without passing tests. Validation errors return HTTP 400 — a business error — not
                a false 500. CI/CD writes go through the IRE only, so re-runs are idempotent and never duplicate.
              </p>
            </div>

            <div className={styles.govCol}>
              <h3 className={styles.govColTitle}><Users size={16} strokeWidth={2} /> People handling — who stays human</h3>
              <ul className={styles.peopleList}>
                {peopleStays.map((p) => (
                  <li key={p.role}>
                    <span className={styles.peopleRole}>{p.role}</span>
                    <span className={styles.peopleDesc}>{p.desc}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.govNote}>
                The line between augmentation and automation is drawn by blast radius × reversibility ×
                regulatory exposure — not by model confidence. Augment by default; automate only where it is
                reversible and gated.
              </p>
            </div>
          </div>

          <div className={styles.honestBox}>
            <span className={styles.honestKicker}><Sparkles size={14} strokeWidth={2} /> honest — what does not work yet</span>
            <ul className={styles.honestList}>
              {honest.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ─────────── 90-DAY PILOT ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div id="pilot" />
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>prove it in 90 days</span>
            <h2 className={styles.sectionTitle}>One lighthouse: Card Dispute, end to end on FSDM.</h2>
            <p className={styles.sectionSub}>
              The densest proof-per-dollar in the suite: full FSDM tree, OOTB native AI to compose against,
              regulator-facing by nature (Visa CE 3.0 / Nacha), and a real Bradesco pain.
            </p>
          </div>

          <motion.div
            className={styles.pilotGrid}
            variants={stagger}
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {sprints.map((s) => (
              <motion.article key={s.title} className={styles.sprintCard} variants={cardItem}>
                <span className={styles.sprintTag}>{s.tag}</span>
                <h3 className={styles.sprintTitle}>{s.title}</h3>
                <p className={styles.sprintDesc}>{s.desc}</p>
                <span className={styles.sprintGate}>{s.gate}</span>
              </motion.article>
            ))}
          </motion.div>

          <div className={styles.metricRow}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metricCard}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ─────────── COMMERCIAL CHAIN ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>why ServiceNow wins</span>
            <h2 className={styles.sectionTitle}>Operating model → adoption velocity → revenue.</h2>
          </div>
          <div className={styles.chainRow}>
            <div className={styles.chainStep}>
              <span className={styles.chainNum}>01</span>
              <h3>Operating model</h3>
              <p>Agents remove the services-throughput ceiling while every artifact stays governed by ServiceNow’s own controls.</p>
            </div>
            <span className={styles.chainArrow} aria-hidden="true">→</span>
            <div className={styles.chainStep}>
              <span className={styles.chainNum}>02</span>
              <h3>Adoption velocity</h3>
              <p>More FSO modules go live per quarter at the same account — adoption stops being gated by consulting capacity.</p>
            </div>
            <span className={styles.chainArrow} aria-hidden="true">→</span>
            <div className={styles.chainStep}>
              <span className={styles.chainNum}>03</span>
              <h3>Revenue expansion</h3>
              <p>More live workflows → more native Now Assist consumption → Pro Plus → Enterprise Plus upsell → larger FSI ACV.</p>
            </div>
          </div>
        </Reveal>

        {/* ─────────── EXAMPLE PROJECT ─────────── */}
        <Reveal className={styles.section} reduced={reduced}>
          <div className={styles.exampleCard} data-swarm-tilt>
            <div className={styles.exampleInner}>
              <div>
                <span className={styles.exampleKicker}><Rocket size={14} strokeWidth={2} /> this is not a slide</span>
                <h2 className={styles.exampleTitle}>The control plane already runs.</h2>
                <p className={styles.exampleSub}>
                  The validator app below is the working engine behind this plan — a live ServiceNow instance
                  scanner, fix engine and assess-first provisioning brain. It is what becomes the FSO control plane.
                </p>
                <ul className={styles.exampleList}>
                  {exampleBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className={styles.exampleActions}>
                  <a className={styles.exampleLinkPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">
                    Open the live app <ExternalLink size={16} strokeWidth={2.2} />
                  </a>
                </div>
              </div>
              <div className={styles.exampleVisual} aria-hidden="true">
                <Bot size={64} strokeWidth={1.2} />
                <span>csdm-validator · Demo Forge</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ─────────── CTA ─────────── */}
        <motion.section
          className={styles.cta}
          initial={reduced ? false : { opacity: 0, y: 36, scale: 0.98 }}
          animate={reduced ? { opacity: 1, y: 0, scale: 1 } : undefined}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className={styles.ctaInner}>
            <span className={styles.ctaKicker}>open the conversation</span>
            <h2 className={styles.ctaTitle}>Let’s build the ServiceNow implementation agents.</h2>
            <p className={styles.ctaLine}>{openingLine}</p>
            <div className={styles.ctaActions}>
              <a className={styles.ctaPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">
                See the working example <ArrowRight size={16} strokeWidth={2.2} />
              </a>
              <a className={styles.ctaGhost} href="https://www.pierrondi.dev" target="_blank" rel="noreferrer">pierrondi.dev</a>
            </div>
          </div>
        </motion.section>

        <footer className={styles.confidential}>
          <span>Paulo Pierrondi · ServiceNow TAE · FSI Brazil</span>
          <span className={styles.confidentialMeta}>FSO · Fluent SDK · Claude Code + Codex · grounded on a working build</span>
        </footer>
      </div>
    </main>
  )
}
