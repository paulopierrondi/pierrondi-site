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
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  Bot,
  Database,
  ExternalLink,
  FileCheck2,
  Gauge,
  GitBranch,
  Landmark,
  LockKeyhole,
  Network,
  Rocket,
  ScrollText,
  ShieldAlert,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FsoAgentSwarmLoader from './FsoAgentSwarmLoader'
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
  { value: '8–18k', label: 'hours per FSO program', foot: 'bank-scale design, build, test, release' },
  { value: '32–64', label: 'weeks, start to hypercare', foot: 'services throughput becomes the bottleneck' },
  { value: '50–65%', label: 'of effort is authoring', foot: 'FSDM · integrations · ATF · SoD · evidence' },
  { value: '0', label: 'blind automation', foot: 'risk determines autonomy, not excitement' },
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
    title: 'Implementation lane',
    owner: 'Codex · Claude Code',
    items: [
      'FSDM source-to-target mappings',
      'Fluent (TS DSL) → sys_update_xml',
      'FSDM + IRM conformance rule sets',
      'ATF tests · Flow Designer · IRE transforms · evidence packs',
      'sn_devops CI/CD promotion',
    ],
    meter: 'Runs outside the instance, on LLM spend — creates deterministic, reviewable artifacts.',
  },
  {
    tag: 'Runtime',
    title: 'Action + reasoning lane',
    owner: 'Now Assist for FSO · Action Fabric · IRM',
    items: [
      'Dispute / Claims / Complaint Case Summarization',
      '“Resolving ACH Disputes” — 4-agent workflow',
      'Friendly-fraud (Visa CE 3.0) automation',
      'IRM risk event, control, exception and evidence workflows',
      'Governed, grounded, audited action',
    ],
    meter: 'Runs inside the instance: assist consumption, Action Fabric execution and risk evidence.',
  },
]

type Discovery = {
  icon: LucideIcon
  title: string
  tag: string
  copy: string
}

const discoveries: Discovery[] = [
  {
    icon: Landmark,
    title: 'FSO is the value surface',
    tag: 'customer operations',
    copy:
      'Disputes, claims, complaints, financial accounts and regulated servicing become the workflow surface where automation creates visible business value.',
  },
  {
    icon: ShieldAlert,
    title: 'IRM is the control surface',
    tag: 'risk by design',
    copy:
      'Risk events, policy checks, exceptions, control attestations and evidence requests stop being after-the-fact governance. They become the contract around every automated action.',
  },
  {
    icon: Gauge,
    title: 'AI Control Tower is the operating room',
    tag: 'runtime visibility',
    copy:
      'Agents, models, data, actions, approvals, failures and remediation live in one monitored command layer instead of scattered scripts and tribal memory.',
  },
  {
    icon: LockKeyhole,
    title: 'Automation is the default posture',
    tag: 'future arrived',
    copy:
      'The decision is no longer “can AI help?” The decision is which step can be fully automated, which needs approval, and which must stay human because of blast radius.',
  },
]

const automationBrain: Array<{ label: string; value: string; copy: string }> = [
  {
    label: 'Read',
    value: 'context graph',
    copy: 'CMDB, CSDM, FSDM, IRM controls, policies, incidents, cases and prior decisions.',
  },
  {
    label: 'Decide',
    value: 'risk contract',
    copy: 'Autonomy level is computed from reversibility, regulatory exposure, data class and approval state.',
  },
  {
    label: 'Act',
    value: 'Action Fabric',
    copy: 'The platform executes through governed actions, not raw admin scripts.',
  },
  {
    label: 'Prove',
    value: 'evidence loop',
    copy: 'Every write leaves traceability, ATF proof, rollback path and IRM-ready evidence.',
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
    role: 'Runs declarative FSDM, ATF, Instance Scan and risk rules after every increment.',
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
  {
    num: '09',
    name: 'IRM / Control Tower Analyst',
    role: 'Maps automated actions to policy, risk, controls, approval states and evidence trails.',
    artifact: 'Risk decision matrix · control evidence · exception workflow',
    gate: 'Risk owner signs any high-blast-radius automation.',
    icon: ShieldAlert,
  },
]

const loop: Array<{ step: string; name: string; desc: string }> = [
  { step: '1', name: 'Spec', desc: 'Assessment engine turns the instance state + requirements into a typed spec.' },
  { step: '2', name: 'Build', desc: 'Agents author Fluent / rules / ATF — deterministic, version-controlled artifacts.' },
  { step: '3', name: 'Apply', desc: 'Through Action Fabric + the write-gate: PDI auto · sub-prod approval · prod blocked.' },
  { step: '4', name: 'Validate', desc: 'The rule engine + ATF + Instance Scan re-run as the acceptance gate.' },
  { step: '5', name: 'Document', desc: 'Auto change narrative, traceability and durable rollback.' },
]

const phases: Array<{ when: string; what: string; delta: string; lever: string }> = [
  { when: 'Discovery', what: 'Auto-fill the FSO Case Type Questionnaire; baseline the instance via MCP.', delta: '4 wks → ~1.5 wks', lever: 'High' },
  { when: 'FSDM design', what: 'Map legacy schema → FSDM; emit machine-verified conformance rules.', delta: '2–3 wks → days', lever: 'High' },
  { when: 'IRM design', what: 'Map policies, risk events, controls, exceptions and evidence to the automation contract.', delta: 'late governance → design-time', lever: 'Very High' },
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
  { name: 'IRM policy gate', desc: 'High-risk actions require mapped policy, control owner, exception path, evidence requirement and review cadence before automation level can increase.' },
  { name: 'Update-set review', desc: 'A human + the release-guardian contract inspect the diff. Agents emit a reviewable artifact, never a blind live write.' },
  { name: 'Change approval', desc: 'Business / regulatory judgment, timing, blast radius. Non-prod approval ≠ prod approval. The gate is in code, not a wiki.' },
]

const peopleStays: Array<{ role: string; desc: string }> = [
  { role: 'Solution architect', desc: 'Signs the Consumer-vs-Contact + account-hierarchy decisions. Wrong call = post-migration rework.' },
  { role: 'FSO SME', desc: 'Reviews every flow and tunes AI-agent prompts / guardrails. Ungoverned agent behavior is the risk.' },
  { role: 'Business users (UAT)', desc: 'Own acceptance judgment. Agents author the tests; humans decide what “done” means.' },
  { role: 'Release manager', desc: 'Approves prod promotion. Agents never push to a customer production instance.' },
  { role: 'Risk & compliance', desc: 'Sign the ACL/SoD, IRM policy mapping and regulatory evidence model — a first-class, regulator-facing phase.' },
]

const honest: string[] = [
  'FSO is absent from a stock PDI — exact sn_bom_* table names confirm via describe_table on a provisioned FSO instance.',
  'IRM mappings must be validated against the customer policy/control taxonomy. The page describes the operating model, not a claim of universal OOTB coverage.',
  'Fluent app-file authoring / export, ATF + Flow generation, and deep FSDM-conformance rules are the net-new build, layered on the existing engine.',
  'Rollback is in-memory today (24h TTL) — must be persisted before any customer write-back.',
  'Native AI runtime behavior, grounding and metering live inside the instance under Now Assist licensing — external agents do not own that lane.',
  'Effort figures are planning bands calibrated to the grounded envelope, not vendor commitments.',
]

const sprints: Array<{ tag: string; title: string; desc: string; gate: string }> = [
  {
    tag: 'Sprint 1 · D0–30',
    title: 'Assess + Scaffold',
    desc: 'Provision an FSO instance, baseline with the assessment engine, author the FSDM seed, and map first IRM control/evidence requirements.',
    gate: 'G1 — Readiness baseline: Fluent compiles, risk map exists, install is clean.',
  },
  {
    tag: 'Sprint 2 · D31–60',
    title: 'Build + Write-back',
    desc: 'Build the 3 dispute paths, run migration/reconcile dry-run, route write-back through the risk contract, and wire Now Assist + Action Fabric.',
    gate: 'G2 — Clean write-back: zero orphan accounts, all writes auditable and risk-classified.',
  },
  {
    tag: 'Sprint 3 · D61–90',
    title: 'Prove + Harden',
    desc: 'Author ATF suites, promote dev→test via sn_devops + Instance Scan, compile metrics, and review automation evidence in AI Control Tower / IRM.',
    gate: 'G3 — Proof: ATF green, scan clean, evidence complete, risk owner sign-off.',
  },
]

const metrics: Array<{ value: string; label: string }> = [
  { value: '≥ 70%', label: 'artifacts auto-generated' },
  { value: '≥ 85%', label: 'ATF coverage (incl. SoD)' },
  { value: '0', label: 'orphan Financial Accounts' },
  { value: '100%', label: 'writes with audit, rollback + risk class' },
  { value: '40–55%', label: 'faster build cycle' },
]

const exampleBullets: string[] = [
  'A declarative rule engine that scores CMDB/CSDM maturity — the same shape FSDM conformance needs.',
  'A fix engine that suggests and writes back to the instance, gated at ≥ 0.95 confidence, with snapshot rollback.',
  'A ServiceNow client 1:1 with the MCP tools — query, patch, aggregate, describe, IRE create.',
  'The Demo Forge write-gate: PDI auto · sub-prod approval · prod blocked.',
  'An FSO probe that already detects real Zurich sn_bom_* tables.',
  'The same pattern now extends to IRM: policy, risk, exception, evidence and approval as automation inputs.',
]

const openingLine =
  '“ServiceNow shipped the rails — Fluent SDK, MCP, Action Fabric and the native AI layer. I want to prove the operating model on top of them: a 90-day lighthouse where coding agents author a full Card Dispute build on FSDM, IRM defines the risk contract, Now Assist runs the ACH workflow at runtime, and AI Control Tower governs the whole thing. Want to co-define the success gates?”'

/* ─────────────────────────── component ─────────────────────────── */

type ReducedProps = { reduced: boolean | null }

function HeroSection({ reduced }: ReducedProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBg}>
        <FsoAgentSwarmLoader />
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
          <span className={styles.chip}>IRM · risk by design</span>
          <span className={styles.chip}>Action Fabric · MCP · Fluent SDK</span>
        </div>
        <h1 className={styles.heroTitle}>Automation-first <em>ServiceNow implementation</em></h1>
        <p className={styles.heroLede}>
          The future arrived: <strong>FSO, IRM and AI Control Tower</strong> running as one governed
          operating model. External coding agents author the build; native Now Assist and Action Fabric
          execute at runtime; IRM decides how much autonomy each action is allowed to have.
        </p>
        <HeroMeta />
        <div className={styles.heroCtas}>
          <a className={styles.ctaPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">
            Open live example <ArrowRight size={16} strokeWidth={2.2} />
          </a>
          <a className={styles.ctaGhost} href="#pilot">90-day pilot</a>
        </div>
      </motion.div>
    </header>
  )
}

function HeroMeta() {
  return (
    <div className={styles.heroMeta}>
      {[
        ['Audience', 'ServiceNow internal'],
        ['Product', 'FSO + IRM'],
        ['Outcome', 'Governed automation'],
      ].map(([label, value]) => (
        <div key={label} className={styles.heroMetaItem}>
          <span className={styles.heroMetaLabel}>{label}</span>
          <span className={styles.heroMetaValue}>{value}</span>
        </div>
      ))}
    </div>
  )
}

function ContextSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>why the future arrived</span>
        <h2 className={styles.sectionTitle}>Agents are only useful when the platform knows context, risk and action.</h2>
        <p className={styles.sectionSub}>
          I don&apos;t just propose this — I run it every day. A <strong>council of specialized agents</strong> works
          over my own second brain: a living knowledge graph of thousands of connected notes. The same operating
          model maps directly onto ServiceNow: context graph, risk contract, governed action and evidence loop.
        </p>
      </div>
      <div className={styles.contextGrid}>
        <figure className={styles.contextFigure}>
          <Image
            src="/fso/context-graph.jpg"
            alt="A living knowledge graph — thousands of connected notes, the context a council of agents reasons over"
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
            className={styles.contextImage}
          />
          <figcaption>My second brain — the context a council of agents reasons over, every day.</figcaption>
        </figure>
        <div className={styles.contextPoints}>
          <ContextPoint label="01 · Context" title="Your ServiceNow graph is the automation brain" copy="CMDB · CSDM · FSDM · IRM, dependencies, live data and encoded rules become a context graph — the same shape as the knowledge graph beside this." />
          <ContextPoint label="02 · Council" title="A council of specialized agents, not one chatbot" copy="Architect, config, flow, migration, ATF, validator, IRM and docs agents each own a slice, hand off explicitly and produce evidence." />
          <ContextPoint label="03 · Governed action" title="Automation can finally leave the slide" copy="Fluent authors the build, MCP exposes the instance, Action Fabric executes with identity, and IRM defines the limits. That is automation you can defend." />
        </div>
      </div>
      <p className={styles.contextPunch}>
        Context + council + risk contract + Action Fabric → FSO ships faster without becoming shadow automation. <strong>That is the unlock.</strong>
      </p>
    </Reveal>
  )
}

function ContextPoint({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <article>
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  )
}

function DiscoveriesSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>new discoveries</span>
        <h2 className={styles.sectionTitle}>
          FSO brings the work.<br />
          IRM brings the permission.<br />
          Action Fabric brings the hands.
        </h2>
        <p className={styles.sectionSub}>
          The strong version is not “AI writes some config.” The strong version is an automation-first
          operating model where every step knows its business context, risk class, approval state and evidence requirement before it acts.
        </p>
      </div>
      <motion.div className={styles.discoveryGrid} variants={stagger} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        {discoveries.map((item) => <DiscoveryCard key={item.title} item={item} />)}
      </motion.div>
      <div className={styles.brainStrip} aria-label="Automation brain loop">
        {automationBrain.map((step) => (
          <article key={step.label} className={styles.brainStep}>
            <span className={styles.brainLabel}>{step.label}</span>
            <strong>{step.value}</strong>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </Reveal>
  )
}

function DiscoveryCard({ item }: { item: Discovery }) {
  const Icon = item.icon
  return (
    <motion.article className={styles.discoveryCard} variants={cardItem}>
      <span className={styles.discoveryIcon}><Icon size={20} strokeWidth={1.8} /></span>
      <span className={styles.discoveryTag}>{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
    </motion.article>
  )
}

function ShiftSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>the shift</span>
        <h2 className={styles.sectionTitle}>The ceiling on FSO and IRM adoption is services throughput — not imagination.</h2>
        <p className={styles.sectionSub}>
          Programs stall in FSDM mapping, IRM control design, integration scaffolding, ATF authoring and
          SoD/evidence work. Some of it is judgment. Much of it is structured authoring. That is the share
          LLM coding agents remove — with risk gates instead of blind autonomy.
        </p>
      </div>
      <motion.div className={styles.statGrid} variants={stagger} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {shiftStats.map((s) => (
          <motion.div key={s.label} className={styles.statCard} variants={cardItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statFoot}>{s.foot}</span>
          </motion.div>
        ))}
      </motion.div>
    </Reveal>
  )
}

function LanesSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>the operating model</span>
        <h2 className={styles.sectionTitle}>Two lanes that compose — with IRM as the autonomy contract.</h2>
        <p className={styles.sectionSub}>
          ServiceNow built the SDK plugins and the MCP server <em>so external agents compose with the
          platform.</em> External agents author; native AI reasons and acts; IRM controls the risk boundary;
          AI Control Tower governs the operating room.
        </p>
      </div>
      <div className={styles.laneGrid}>{lanes.map((lane) => <LaneCard key={lane.title} lane={lane} reduced={reduced} />)}</div>
      <div className={styles.seamRow}>
        <span className={styles.seamLabel}>composition seams ServiceNow shipped</span>
        <div className={styles.seamChips}>
          <span className={styles.seamChip}>Fluent SDK <i>build-time</i></span>
          <span className={styles.seamChip}>Action Fabric + MCP / A2A <i>runtime · actions</i></span>
          <span className={styles.seamChip}>IRM <i>risk · controls · evidence</i></span>
          <span className={styles.seamChip}>AI Control Tower <i>governs both</i></span>
        </div>
      </div>
    </Reveal>
  )
}

function LaneCard({ lane, reduced }: { lane: Lane; reduced: boolean | null }) {
  return (
    <motion.article className={styles.laneCard} variants={cardItem} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className={styles.laneHead}>
        <span className={styles.laneTag}>{lane.tag}</span>
        <h3 className={styles.laneTitle}>{lane.title}</h3>
        <span className={styles.laneOwner}>{lane.owner}</span>
      </div>
      <ul className={styles.laneList}>{lane.items.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className={styles.laneFoot}>{lane.meter}</p>
    </motion.article>
  )
}

function ActionFabricSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>the execution seam</span>
        <h2 className={styles.sectionTitle}>Action Fabric — how the agents actually act.</h2>
        <p className={styles.sectionSub}>
          Authoring is half the story. <strong>Action Fabric</strong> is ServiceNow&apos;s governed
          system of action — the seam through which external agents and the Demo Forge brain invoke real work
          on the instance: provision, write back, remediate, trigger FSO and IRM flows.
        </p>
      </div>
      <div className={styles.laneGrid}>
        <StaticLane title="Agents don't just write — they execute" tag="Author → Act" items={['Fluent SDK builds the config (sys_update_xml).', 'IRM classifies the action before autonomy increases.', 'Action Fabric runs the action — governed, metered, audited.', 'Both lanes, one control plane, one evidence trail.']} foot="The write-gate becomes a native governed action — not just app logic." />
        <StaticLane title="Provisioning governed by default" tag="Demo Forge, upgraded" items={['Route provisioning & fix-engine write-back through Action Fabric.', 'RBAC + approval + audit + rollback + evidence come from the platform.', 'External agents act least-privilege, never raw admin.']} foot="Build-time = Fluent · actions = Action Fabric + MCP · risk contract = IRM · governance = AI Control Tower." />
      </div>
      <div className={styles.honestBox}>
        <span className={styles.honestKicker}><Sparkles size={14} strokeWidth={2} /> proof it&apos;s real — Knowledge 2026</span>
        <ul className={styles.honestList}>
          <li>At Knowledge 2026, ServiceNow opened its full system of action to third-party AI agents via <strong>Action Fabric</strong> — with <strong>Anthropic (Claude) as a launch partner</strong>.</li>
          <li>The seam this blueprint relies on isn&apos;t hypothetical: ServiceNow shipped it. External coding agents acting on the platform is the sanctioned direction, not a workaround.</li>
        </ul>
      </div>
    </Reveal>
  )
}

function StaticLane({ tag, title, items, foot }: { tag: string; title: string; items: string[]; foot: string }) {
  return (
    <article className={styles.laneCard}>
      <div className={styles.laneHead}>
        <span className={styles.laneTag}>{tag}</span>
        <h3 className={styles.laneTitle}>{title}</h3>
      </div>
      <ul className={styles.laneList}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className={styles.laneFoot}>{foot}</p>
    </article>
  )
}

function AgentCouncilSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>the council</span>
        <h2 className={styles.sectionTitle}>Ten agents. One governed build.</h2>
        <p className={styles.sectionSub}>The council reasons over your context graph. FSO builds the workflow; IRM governs the blast radius.</p>
      </div>
      <motion.div className={styles.agentGrid} variants={stagger} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        {agents.map((agent) => <AgentCard key={agent.name} agent={agent} reduced={reduced} />)}
      </motion.div>
    </Reveal>
  )
}

function AgentCard({ agent, reduced }: { agent: Agent; reduced: boolean | null }) {
  const Icon = agent.icon
  return (
    <motion.article className={styles.agentCard} variants={cardItem} whileHover={reduced ? undefined : { y: -6, borderColor: 'rgba(35, 194, 207, 0.55)' }}>
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
      <div className={styles.agentGate}><ShieldCheck size={13} strokeWidth={2} />{agent.gate}</div>
    </motion.article>
  )
}

function IncrementLoopSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>how every increment runs</span>
        <h2 className={styles.sectionTitle}>Spec → risk-class → build → apply → validate → document.</h2>
        <p className={styles.sectionSub}>Agents emit artifacts; the gate decides what reaches the instance and what level of autonomy is allowed.</p>
      </div>
      <motion.div className={styles.loopRow} variants={stagger} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {loop.map((s, i) => <LoopStep key={s.name} step={s} showArrow={i < loop.length - 1} />)}
      </motion.div>
      <div className={styles.writeGate}>
        <span className={styles.writeGateLabel}>write-gate by target</span>
        <div className={styles.writeGateItems}>
          <span className={`${styles.gateChip} ${styles.gateAuto}`}>PDI / demo → auto</span>
          <span className={`${styles.gateChip} ${styles.gateApproval}`}>customer sub-prod → approval</span>
          <span className={`${styles.gateChip} ${styles.gateBlocked}`}>prod / unknown → blocked</span>
          <span className={`${styles.gateChip} ${styles.gateIrm}`}>high-risk action → IRM review</span>
        </div>
      </div>
    </Reveal>
  )
}

function LoopStep({ step, showArrow }: { step: { step: string; name: string; desc: string }; showArrow: boolean }) {
  return (
    <motion.div className={styles.loopStep} variants={cardItem}>
      <span className={styles.loopStepNum}>{step.step}</span>
      <span className={styles.loopStepName}>{step.name}</span>
      <span className={styles.loopStepDesc}>{step.desc}</span>
      {showArrow && <span className={styles.loopArrow} aria-hidden="true">→</span>}
    </motion.div>
  )
}

function PhasePlaybookSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>discovery → hypercare</span>
        <h2 className={styles.sectionTitle}>The phase-by-phase playbook.</h2>
        <p className={styles.sectionSub}>IRM enters early so governance is designed into the automation, not stapled on after the demo.</p>
      </div>
      <motion.div className={styles.phaseList} variants={stagger} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        {phases.map((p) => <PhaseRow key={p.when} phase={p} />)}
      </motion.div>
    </Reveal>
  )
}

function PhaseRow({ phase }: { phase: { when: string; what: string; delta: string; lever: string } }) {
  const leverClass = styles[`lev${phase.lever.replace(/[^A-Za-z]/g, '')}`] ?? ''
  return (
    <motion.div className={styles.phaseRow} variants={cardItem}>
      <span className={styles.phaseWhen}>{phase.when}</span>
      <span className={styles.phaseWhat}>{phase.what}</span>
      <span className={styles.phaseDelta}>{phase.delta}</span>
      <span className={`${styles.phaseLever} ${leverClass}`}>{phase.lever}</span>
    </motion.div>
  )
}

function GovernanceSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>error handling · people handling</span>
        <h2 className={styles.sectionTitle}>The part that makes it defensible.</h2>
        <p className={styles.sectionSub}>Agent output is treated as a pull request against a regulated system — never an oracle.</p>
      </div>
      <div className={styles.govGrid}>
        <GovernanceColumn title="Error handling — the gate stack" icon={ShieldCheck} items={gates.map((g) => ({ title: g.name, copy: g.desc }))} note="No auto-apply without passing tests. CI/CD writes go through the IRE only, so re-runs are idempotent and never duplicate." />
        <GovernanceColumn title="People handling — who stays human" icon={Users} items={peopleStays.map((p) => ({ title: p.role, copy: p.desc }))} note="The line between augmentation and automation is drawn by blast radius × reversibility × regulatory exposure — not by model confidence." />
      </div>
      <div className={styles.honestBox}>
        <span className={styles.honestKicker}><Sparkles size={14} strokeWidth={2} /> honest — what does not work yet</span>
        <ul className={styles.honestList}>{honest.map((h) => <li key={h}>{h}</li>)}</ul>
      </div>
    </Reveal>
  )
}

function GovernanceColumn({ title, icon: Icon, items, note }: { title: string; icon: LucideIcon; items: Array<{ title: string; copy: string }>; note: string }) {
  return (
    <div className={styles.govCol}>
      <h3 className={styles.govColTitle}><Icon size={16} strokeWidth={2} /> {title}</h3>
      <div className={styles.gateList}>
        {items.map((item) => (
          <div key={item.title} className={styles.gateBlock}>
            <span className={styles.gateBlockName}>{item.title}</span>
            <p className={styles.gateBlockDesc}>{item.copy}</p>
          </div>
        ))}
      </div>
      <p className={styles.govNote}>{note}</p>
    </div>
  )
}

function PilotSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div id="pilot" />
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>prove it in 90 days</span>
        <h2 className={styles.sectionTitle}>One lighthouse: Card Dispute on FSDM, governed by IRM.</h2>
        <p className={styles.sectionSub}>The densest proof-per-dollar in the suite: full FSDM tree, native AI, IRM-ready evidence, and a real Bradesco pain.</p>
      </div>
      <motion.div className={styles.pilotGrid} variants={stagger} initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        {sprints.map((s) => (
          <motion.article key={s.title} className={styles.sprintCard} variants={cardItem}>
            <span className={styles.sprintTag}>{s.tag}</span>
            <h3 className={styles.sprintTitle}>{s.title}</h3>
            <p className={styles.sprintDesc}>{s.desc}</p>
            <span className={styles.sprintGate}>{s.gate}</span>
          </motion.article>
        ))}
      </motion.div>
      <div className={styles.metricRow}>{metrics.map((m) => <div key={m.label} className={styles.metricCard}><span className={styles.metricValue}>{m.value}</span><span className={styles.metricLabel}>{m.label}</span></div>)}</div>
    </Reveal>
  )
}

function CommercialChainSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>why ServiceNow wins</span>
        <h2 className={styles.sectionTitle}>Operating model → adoption velocity → revenue.</h2>
      </div>
      <div className={styles.chainRow}>
        <ChainStep num="01" title="Operating model" copy="Agents remove the services-throughput ceiling while IRM and ServiceNow controls define the autonomy boundary." />
        <span className={styles.chainArrow} aria-hidden="true">→</span>
        <ChainStep num="02" title="Adoption velocity" copy="More FSO and risk workflows go live per quarter at the same account — adoption stops being gated by consulting capacity." />
        <span className={styles.chainArrow} aria-hidden="true">→</span>
        <ChainStep num="03" title="Revenue expansion" copy="More live workflows → more native Now Assist and governed action consumption → larger FSI ACV." />
      </div>
    </Reveal>
  )
}

function ChainStep({ num, title, copy }: { num: string; title: string; copy: string }) {
  return (
    <div className={styles.chainStep}>
      <span className={styles.chainNum}>{num}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  )
}

function ExampleProjectSection({ reduced }: ReducedProps) {
  return (
    <Reveal className={styles.section} reduced={reduced}>
      <div className={styles.exampleCard} data-swarm-tilt>
        <div className={styles.exampleInner}>
          <div>
            <span className={styles.exampleKicker}><Rocket size={14} strokeWidth={2} /> this is not a slide</span>
            <h2 className={styles.exampleTitle}>The control plane already runs.</h2>
            <p className={styles.exampleSub}>The validator app below is the working engine behind this plan. It is what becomes the FSO + IRM control plane.</p>
            <ul className={styles.exampleList}>{exampleBullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <div className={styles.exampleActions}>
              <a className={styles.exampleLinkPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">Open the live app <ExternalLink size={16} strokeWidth={2.2} /></a>
            </div>
          </div>
          <div className={styles.exampleVisual} aria-hidden="true"><Bot size={64} strokeWidth={1.2} /><span>csdm-validator · Demo Forge</span></div>
        </div>
      </div>
    </Reveal>
  )
}

function CtaSection({ reduced }: ReducedProps) {
  return (
    <motion.section className={styles.cta} initial={reduced ? false : { opacity: 0, y: 36, scale: 0.98 }} animate={reduced ? { opacity: 1, y: 0, scale: 1 } : undefined} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease }}>
      <div className={styles.ctaInner}>
        <span className={styles.ctaKicker}>open the conversation</span>
        <h2 className={styles.ctaTitle}>Let’s build the automation-first ServiceNow implementation model.</h2>
        <p className={styles.ctaLine}>{openingLine}</p>
        <div className={styles.ctaActions}>
          <a className={styles.ctaPrimary} href={LIVE_APP} target="_blank" rel="noreferrer">See the working example <ArrowRight size={16} strokeWidth={2.2} /></a>
          <a className={styles.ctaGhost} href="https://www.pierrondi.dev" target="_blank" rel="noreferrer">pierrondi.dev</a>
        </div>
      </div>
    </motion.section>
  )
}

function FooterNote() {
  return (
    <footer className={styles.confidential}>
      <span>Paulo Pierrondi · ServiceNow TAE · FSI Brazil</span>
      <span className={styles.confidentialMeta}>FSO · IRM · Action Fabric · Fluent SDK · Claude Code + Codex · grounded on a working build</span>
    </footer>
  )
}

export default function FsoExperience() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <main className={styles.shell} ref={containerRef}>
      <motion.div className={styles.scrollProgress} style={{ scaleX: reduced ? 1 : progressScaleX }} aria-hidden="true" />
      <div className={styles.container}>
        <HeroSection reduced={reduced} />
        <ContextSection reduced={reduced} />
        <DiscoveriesSection reduced={reduced} />
        <ShiftSection reduced={reduced} />
        <LanesSection reduced={reduced} />
        <ActionFabricSection reduced={reduced} />
        <AgentCouncilSection reduced={reduced} />
        <IncrementLoopSection reduced={reduced} />
        <PhasePlaybookSection reduced={reduced} />
        <GovernanceSection reduced={reduced} />
        <PilotSection reduced={reduced} />
        <CommercialChainSection reduced={reduced} />
        <ExampleProjectSection reduced={reduced} />
        <CtaSection reduced={reduced} />
        <FooterNote />
      </div>
    </main>
  )
}
