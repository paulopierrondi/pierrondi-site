import Link from 'next/link'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import styles from './Atuacao.module.css'

export type AtuacaoLang = 'pt' | 'en'

interface Service {
  id: string
  no: string
  category: string
  title: string
  outcome: string
  desc: string
  items: Array<{ k: string; t: string }>
}

const copy: Record<AtuacaoLang, { header: { eyebrow: string; title: React.ReactNode; lead: string; chips: string[] }; final: { h2: string; p: string; cta: string } }> = {
  pt: {
    header: {
      eyebrow: 'ATUAÇÃO',
      title: <>Onde eu <span className="text-primary">gero valor.</span></>,
      lead: 'Quatro pilares de atuação para levar IA enterprise de intenção a execução governada — sem preços, sem pacotes, sem linguagem de agência.',
      chips: ['AI Operating Model', 'ServiceNow', 'AgentOps', 'Estratégia'],
    },
    final: {
      h2: 'Quer ver aplicações concretas?',
      p: 'Os feitos mostram como esses pilares viram sistema, demo e execução.',
      cta: 'Ver os feitos',
    },
  },
  en: {
    header: {
      eyebrow: 'WORK',
      title: <>Where I <span className="text-primary">create value.</span></>,
      lead: 'Four pillars to take enterprise AI from intent to governed execution — no pricing, no packages, no agency speak.',
      chips: ['AI Operating Model', 'ServiceNow', 'AgentOps', 'Strategy'],
    },
    final: {
      h2: 'Want to see concrete applications?',
      p: 'The work index shows how these pillars become systems, demos and execution.',
      cta: 'See the work',
    },
  },
}

const services: Record<AtuacaoLang, Service[]> = {
  pt: [
    {
      id: 'operating-model',
      no: '01',
      category: 'AI Operating Model',
      title: 'De piloto isolado para operação repetível.',
      outcome: 'Arquitetura de valor que conecta intenção a resultado mensurável.',
      desc: 'Desenho a cadeia que conecta intenção, contexto, controle, ação e evidência. O foco não é o modelo, mas como a IA entra em trabalho real: política, permissão, memória, validação, custo e auditoria.',
      items: [
        { k: '01', t: 'Mapeamento de casos de uso por domínio de negócio e risco.' },
        { k: '02', t: 'Modelo de governança com human gates, escopo e fallback.' },
        { k: '03', t: 'Métricas de adoção, qualidade e valor antes da escala.' },
        { k: '04', t: 'Artefatos executivos: arquitetura, roadmap e enablement.' },
      ],
    },
    {
      id: 'servicenow',
      no: '02',
      category: 'ServiceNow & IA Governada',
      title: 'IA enterprise com fundação, não só licença.',
      outcome: 'Now Assist e AI Agents conectados a CMDB, CSDM e resultado de negócio.',
      desc: 'Trabalho com ServiceNow há anos em contas FSI. Conecto Now Assist, AI Agents, CSDM, CMDB e Service Graph a um operating model que produz adoção e evidência, não apenas POCs bonitas.',
      items: [
        { k: '01', t: 'Arquitetura de valor para Now Assist e AI Agents.' },
        { k: '02', t: 'CSDM, CMDB e Service Graph como fundação de contexto.' },
        { k: '03', t: 'Governança, compliance e trilha de auditoria.' },
        { k: '04', t: 'Enablement de arquitetos e times de entrega.' },
      ],
    },
    {
      id: 'agentops',
      no: '03',
      category: 'AgentOps & Governança',
      title: 'Agentes que operam sob controle.',
      outcome: 'Registry, scheduler, handoffs e runners que transformam agentes em operação auditável.',
      desc: 'Construo os sistemas que tornam agentes confiáveis: registry, scheduler, handoffs, memória, human gates e runners. O objetivo é tirar a execução da conversa solta e colocá-la em workflow com trilha de evidência.',
      items: [
        { k: '01', t: 'Registry e scheduler de agentes e workflows.' },
        { k: '02', t: 'Human-in-the-loop e aprovações explícitas.' },
        { k: '03', t: 'Memória, observabilidade e aprendizado contínuo.' },
        { k: '04', t: 'Execução auditável e rollback seguro.' },
      ],
    },
    {
      id: 'lideranca',
      no: '04',
      category: 'Estratégia & Liderança',
      title: 'Narrativa que move board, arquitetura e entrega.',
      outcome: 'Decisões de IA traduzidas em linguagem executiva e técnica ao mesmo tempo.',
      desc: 'Atuo como ponte entre estratégia e execução: traduzir decisões de board para arquitetos, e complexidade técnica para executivos. Crio narrativa, enablement e clareza para decisões de alto impacto.',
      items: [
        { k: '01', t: 'Narrativa executiva para programas de IA.' },
        { k: '02', t: 'Workshops e enablement de liderança técnica.' },
        { k: '03', t: 'Frameworks de decisão: risco, custo, valor, adoção.' },
        { k: '04', t: 'Arquitetura de comunicação entre squads e stakeholders.' },
      ],
    },
  ],
  en: [
    {
      id: 'operating-model',
      no: '01',
      category: 'AI Operating Model',
      title: 'From isolated pilot to repeatable operation.',
      outcome: 'Value architecture that connects intent to measurable outcome.',
      desc: 'I design the chain connecting intent, context, control, action and evidence. The focus is not the model, but how AI enters real work: policy, permission, memory, validation, cost and audit.',
      items: [
        { k: '01', t: 'Use-case mapping by business domain and risk.' },
        { k: '02', t: 'Governance model with human gates, scope and fallback.' },
        { k: '03', t: 'Adoption, quality and value metrics before scale.' },
        { k: '04', t: 'Executive artifacts: architecture, roadmap and enablement.' },
      ],
    },
    {
      id: 'servicenow',
      no: '02',
      category: 'ServiceNow & Governed AI',
      title: 'Enterprise AI with foundation, not just license.',
      outcome: 'Now Assist and AI Agents connected to CMDB, CSDM and business outcome.',
      desc: 'I have worked with ServiceNow for years in FSI accounts. I connect Now Assist, AI Agents, CSDM, CMDB and Service Graph into an operating model that produces adoption and evidence, not just beautiful POCs.',
      items: [
        { k: '01', t: 'Value architecture for Now Assist and AI Agents.' },
        { k: '02', t: 'CSDM, CMDB and Service Graph as context foundation.' },
        { k: '03', t: 'Governance, compliance and audit trail.' },
        { k: '04', t: 'Enablement for architects and delivery teams.' },
      ],
    },
    {
      id: 'agentops',
      no: '03',
      category: 'AgentOps & Governance',
      title: 'Agents that operate under control.',
      outcome: 'Registry, scheduler, handoffs and runners that turn agents into auditable operation.',
      desc: 'I build the systems that make agents reliable: registry, scheduler, handoffs, memory, human gates and runners. The goal is to move execution out of loose chat and into workflow with evidence trail.',
      items: [
        { k: '01', t: 'Agent and workflow registry and scheduler.' },
        { k: '02', t: 'Human-in-the-loop and explicit approvals.' },
        { k: '03', t: 'Memory, observability and continuous learning.' },
        { k: '04', t: 'Auditable execution and safe rollback.' },
      ],
    },
    {
      id: 'lideranca',
      no: '04',
      category: 'Strategy & Leadership',
      title: 'Narrative that moves board, architecture and delivery.',
      outcome: 'AI decisions translated into executive and technical language at the same time.',
      desc: 'I act as a bridge between strategy and execution: translating board decisions for architects, and technical complexity for executives. I create narrative, enablement and clarity for high-impact decisions.',
      items: [
        { k: '01', t: 'Executive narrative for AI programs.' },
        { k: '02', t: 'Workshops and enablement for technical leadership.' },
        { k: '03', t: 'Decision frameworks: risk, cost, value, adoption.' },
        { k: '04', t: 'Communication architecture across squads and stakeholders.' },
      ],
    },
  ],
}

export default function AtuacaoContent({ lang }: { lang: AtuacaoLang }) {
  const c = copy[lang]
  const svcList = services[lang]
  return (
    <main className={styles.main}>
      {svcList.map((svc) => (
        <section key={svc.id} id={svc.id} className={styles.svc} aria-labelledby={`${svc.id}-title`}>
          <div className={styles.row}>
            <aside className={styles.aside}>
              <Reveal>
                <span className={styles.no}>{svc.no}</span>
                <h2 id={`${svc.id}-title`}>{svc.category}</h2>
                <p className={styles.outcome}>{svc.outcome}</p>
                <a
                  href="https://br.linkedin.com/in/paulopierrondi"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.cta}
                >
                  {lang === 'pt' ? 'Conversar sobre isso' : 'Talk about this'} <span aria-hidden="true">↗</span>
                </a>
              </Reveal>
            </aside>

            <div className={styles.body}>
              <Reveal>
                <p className={styles.desc}>{svc.desc}</p>
              </Reveal>

              <RevealStagger className={styles.list} staggerDelay={0.05}>
                {svc.items.map((item) => (
                  <RevealStaggerItem key={item.k}>
                    <div className={styles.li}>
                      <span className={styles.k}>{item.k}</span>
                      <span className={styles.t}>{item.t}</span>
                    </div>
                  </RevealStaggerItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </section>
      ))}

      <section className={styles.final}>
        <Reveal>
          <h2>{c.final.h2}</h2>
          <p>{c.final.p}</p>
          <Link href="/feitos" className={styles.btnPrimary}>
            {c.final.cta} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
