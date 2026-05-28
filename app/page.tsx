import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import KimiHomeHero from '@/components/KimiHomeHero'
import HomeContactForm from './HomeContactForm'
import { feitos } from './feitos/feitos-data'
import styles from './page.module.css'

const themes = [
  {
    label: 'AI Control Tower',
    title: 'Controle antes da autonomia',
    copy:
      'Descobrir, observar, governar, proteger e medir agentes, modelos e workloads antes que eles virem mais uma camada invisivel de risco.',
  },
  {
    label: 'Workflow Data Fabric',
    title: 'Contexto antes da decisao',
    copy:
      'Dados conectados, semantica operacional e contexto em tempo real para que agentes decidam com base no que a empresa realmente sabe.',
  },
  {
    label: 'Autonomous Workforce',
    title: 'Execucao antes do hype',
    copy:
      'Especialistas de IA so importam quando resolvem trabalho fim a fim com identidade, permissao, escopo e trilha auditavel.',
  },
  {
    label: 'Service Graph e CSDM',
    title: 'Fundacao antes da escala',
    copy:
      'Servicos, ownership, dependencias e dados operacionais bem modelados continuam separando demo bonita de operacao confiavel.',
  },
]

const focusAreas = [
  {
    number: '01',
    title: 'Estrategia para plataforma',
    copy: 'Traduzir prioridades executivas em arquitetura, roadmap, governanca e adocao real da ServiceNow.',
  },
  {
    number: '02',
    title: 'Agentes para operacao',
    copy: 'Separar assistencia, autonomia e controle: qual trabalho pode ser delegado, em que escopo e com qual evidencia.',
  },
  {
    number: '03',
    title: 'Dados para contexto',
    copy: 'Conectar CMDB, Service Graph, CSDM e dados externos para reduzir decisao baseada em fragmentos.',
  },
  {
    number: '04',
    title: 'Adocao para valor',
    copy: 'Fazer inovacao virar ritual operacional: ownership, processo, metrica, seguranca e melhoria continua.',
  },
]

const operatingLayers = [
  {
    label: '01',
    title: 'Intent',
    copy: 'A entrada precisa ser simples para o usuario e clara para a plataforma.',
  },
  {
    label: '02',
    title: 'Context',
    copy: 'O agente precisa enxergar servico, ativo, risco, historico e prioridade.',
  },
  {
    label: '03',
    title: 'Control',
    copy: 'Permissao, politica, limite e aprovacao definem onde autonomia termina.',
  },
  {
    label: '04',
    title: 'Action',
    copy: 'Execucao acontece no workflow, nao em uma conversa solta.',
  },
  {
    label: '05',
    title: 'Evidence',
    copy: 'Valor e confianca dependem de log, metrica, auditoria e aprendizado.',
  },
]

const sourceLinks = [
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx',
    label: 'AI Control Tower',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-brings-Autonomous-Workforce-to-every-major-business-function/default.aspx',
    label: 'Autonomous Workforce',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-the-real-time-data-foundation-that-puts-autonomous-AI-to-work-across-the-enterprise/default.aspx',
    label: 'Workflow Data Fabric',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-opens-its-full-system-of-action-to-every-AI-Agent-in-the-enterprise/default.aspx',
    label: 'Action Fabric',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-moves-beyond-the-sidecar-AI-era-giving-customers-a-complete-AI-native-experience-across-all-products-and-packages/default.aspx',
    label: 'AI-native platform',
  },
  {
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-extends-agentic-AI-governance-from-desktops-to-data-centers-with-NVIDIA/default.aspx',
    label: 'Project Arc',
  },
]

export const metadata: Metadata = {
  title: 'Paulo Pierrondi - IA governada, ServiceNow, AgentOps e LLM inference',
  description:
    'Portfolio executivo de Paulo Pierrondi sobre IA governada, ServiceNow, SADA, agentes autonomos com governanca, LLM inference, AgentOps e plataformas de automacao enterprise.',
  keywords: [
    'Paulo Pierrondi',
    'IA governada',
    'ServiceNow',
    'SADA ServiceNow',
    'ServiceNow AI-Driven Architecture',
    'Now Assist',
    'AI Agents',
    'AgentOps',
    'LLM inference',
    'LLMOps',
    'CSDM',
    'CMDB',
    'enterprise AI',
    'workflow automation',
    'FSI AI',
    'Energy AI',
    'Retail AI',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Paulo Pierrondi - IA governada, ServiceNow, AgentOps e LLM inference',
    description:
      'Portfolio executivo sobre ServiceNow, SADA, agentes governados, inferencia de LLMs, AgentOps, dados e execucao corporativa.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - IA governada, AgentOps e ServiceNow',
    description: 'Portfolio executivo sobre ServiceNow, SADA, agentes governados, LLM inference e workflows corporativos.',
    images: ['/og'],
  },
}

export default function Home() {
  return (
    <main className={styles.page} data-swarm-root>
      <nav className={styles.nav} aria-label="Navegacao principal">
        <a href="#top" className={styles.brand} aria-label="Paulo Pierrondi">
          PIERRONDI
        </a>
        <div className={styles.navLinks}>
          <a href="#top">Inicio</a>
          <Link href="/design">Design</Link>
          <Link href="/feitos/sada-servicenow">SADA</Link>
          <Link href="/feitos/agentes-governados">Agentes</Link>
          <Link href="/feitos/llm-inferencia">LLM</Link>
          <Link href="/feitos/plataformas-automacao-ia">Automacao</Link>
          <a href="#contact">Contato</a>
          <a
            href="https://br.linkedin.com/in/paulopierrondi"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn de Paulo Pierrondi"
          >
            <span className={styles.navIcon} aria-hidden="true">in</span>
          </a>
        </div>
      </nav>

      <KimiHomeHero />

      <section id="thesis" className={styles.focusSection} aria-labelledby="thesis-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader} data-swarm-reveal>
            <p className={styles.eyebrow}>Minha lente</p>
            <h2 id="thesis-title">A conversa deixou de ser sobre IA. Agora e sobre trabalho delegado.</h2>
            <p className={styles.sectionCopy}>
              O ponto critico nao e quantos agentes existem. E se a organizacao sabe onde eles podem atuar, quais dados
              podem usar, quem aprova excecoes, como evidenciam valor e como aprendem sem perder controle.
            </p>
          </div>
          <div className={styles.focusGrid}>
            {focusAreas.map((area, index) => (
              <article key={area.number} data-swarm-reveal data-swarm-tilt data-reveal-delay={index + 1}>
                <span>{area.number}</span>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="operating" className={styles.operatingSection} aria-labelledby="operating-title">
        <div className={styles.sectionInner}>
          <div className={styles.operatingLayout}>
            <div data-swarm-reveal>
              <p className={styles.eyebrow}>Modelo operacional</p>
              <h2 id="operating-title">Agente autonomo exige base operacional: contexto, permissao, acao e evidencia.</h2>
              <p>
                Essa e a forma como eu estruturo a conversa: antes de escalar autonomia, desenhar a cadeia que conecta
                intencao, dados, controle, workflow e resultado mensuravel.
              </p>
            </div>
            <div className={styles.operatingRail}>
              {operatingLayers.map((layer, index) => (
                <article key={layer.label} data-swarm-reveal data-reveal-delay={index + 1}>
                  <span>{layer.label}</span>
                  <div>
                    <h3>{layer.title}</h3>
                    <p>{layer.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="themes" className={styles.themeSection} aria-labelledby="themes-title">
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} ${styles.themeHeader}`} data-swarm-reveal>
            <p className={styles.eyebrow}>Temas que importam agora</p>
            <h2 id="themes-title">O ciclo da IA governada na ServiceNow.</h2>
            <p className={styles.sectionCopy}>
              Minha leitura das novidades publicas: a plataforma esta se movendo de assistencia pontual para execucao
              governada, com dados vivos e agentes sob controle operacional.
            </p>
            <div className={styles.themeIdentity} data-swarm-reveal data-reveal-delay="2" aria-hidden="true">
              <div className={styles.themePortraitFrame}>
                <Image
                  src="/assets/paulo-pierrondi-executive-neural.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 980px) 220px, 300px"
                  className={styles.themePortraitImage}
                />
                <span className={styles.themePortraitScan} />
              </div>
              <div className={styles.themeIdentityCopy}>
                <strong>Paulo Pierrondi</strong>
                <span>leitura executiva + arquitetura operacional</span>
              </div>
            </div>
          </div>
          <div className={styles.themeGrid}>
            {themes.map((theme, index) => (
              <article key={theme.label} data-swarm-reveal data-swarm-tilt data-reveal-delay={index + 1}>
                <b className={styles.themeCardIndex}>{String(index + 1).padStart(2, '0')}</b>
                <span>{theme.label}</span>
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </article>
            ))}
          </div>

          <div id="feitos" className={styles.achievementsBlock} aria-labelledby="feitos-title">
            <div className={styles.achievementsHeader} data-swarm-reveal>
              <p className={styles.eyebrow}>Feitos aplicados</p>
              <h3 id="feitos-title">Arquiteturas de valor que ja construi, refinei e transformei em sistema.</h3>
              <p>
                Sem expor nomes: minha experiencia inclui apoiar grandes enterprises e industrias como FSI, Energy e
                Retail a avancarem na era da IA, dados e agentes. Abaixo estao os sistemas de pensamento e execucao que
                eu levo para conversas de investimento, contratacao e parceria.
              </p>
            </div>
            <div className={styles.achievementGrid}>
              {feitos.map((feito, index) => (
                <Link
                  key={feito.slug}
                  href={`/feitos/${feito.slug}`}
                  className={styles.achievementCard}
                  style={{ animationDelay: `${index * 90}ms` }}
                  data-swarm-reveal
                  data-swarm-tilt
                  data-reveal-delay={index + 1}
                >
                  <span className={styles.achievementIndex}>0{index + 1}</span>
                  <span className={styles.achievementLabel}>{feito.cardLabel}</span>
                  <h4>{feito.cardTitle}</h4>
                  <p>{feito.cardCopy}</p>
                  <span className={styles.achievementCta}>Abrir arquitetura</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sourcesSection} aria-labelledby="sources-title">
        <div className={styles.sectionInner}>
          <div className={styles.sourcesLayout}>
            <div data-swarm-reveal>
              <p className={styles.eyebrow}>Referencias publicas</p>
              <h2 id="sources-title">A base da conversa vem dos anuncios oficiais.</h2>
              <p>
                Os temas acima refletem anuncios publicos recentes da ServiceNow sobre governanca de IA, Autonomous
                Workforce, dados em tempo real, system of action para agentes e experiencias AI-native.
              </p>
            </div>
            <div className={styles.sourceLinks}>
              {sourceLinks.map((source, index) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  data-swarm-reveal
                  data-reveal-delay={index + 1}
                >
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
        <div className={styles.contactNeuralField} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.contactLayout}>
            <div className={styles.contactPitch} data-swarm-reveal>
              <p className={styles.eyebrow}>Contato executivo</p>
              <h2 id="contact-title">Vamos conversar sobre IA que vira execucao governada.</h2>
              <p>
                Use o formulario ou email direto para oportunidades, investimento, parcerias, arquitetura enterprise,
                ServiceNow, agentes governados, LLM inference ou plataformas de automacao com IA.
              </p>
              <div className={styles.contactProof}>
                <span>Resposta por email</span>
                <span>Sem nomes de clientes</span>
                <span>Contexto tecnico + executivo</span>
              </div>
            </div>
            <HomeContactForm />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>pierrondi.dev</span>
        <span>
          Site pessoal. Email: <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>. ServiceNow e marcas
          relacionadas pertencem aos seus respectivos titulares.
        </span>
      </footer>
    </main>
  )
}
