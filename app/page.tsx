import type { Metadata } from 'next'
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

const agentSignals = [
  ['Intent', 'front door'],
  ['Context', 'service graph'],
  ['Policy', 'AI control'],
  ['Action', 'workflow'],
  ['Evidence', 'audit trail'],
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
  title: 'Paulo Pierrondi - ServiceNow, IA governada e enterprise workflows',
  description:
    'Site pessoal de Paulo Pierrondi, Technical Account Executive na ServiceNow, sobre IA governada, plataforma, dados e workflows corporativos.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Paulo Pierrondi - ServiceNow, IA governada e enterprise workflows',
    description:
      'Uma pagina pessoal sobre ServiceNow, agentes governados, modelo operacional, dados, contexto e execucao corporativa.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - ServiceNow e IA governada',
    description: 'Site pessoal sobre ServiceNow, agentes governados, modelo operacional e workflows corporativos.',
    images: ['/og'],
  },
}

export default function Home() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Navegacao principal">
        <a href="#top" className={styles.brand} aria-label="Paulo Pierrondi">
          Paulo Pierrondi
        </a>
        <div className={styles.navLinks}>
          <a href="#thesis">Tese</a>
          <a href="#operating">Modelo</a>
          <a href="#themes">Temas</a>
          <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </nav>

      <section id="top" className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroScene} aria-hidden="true">
          <div className={styles.sceneGrid} />
          <span className={`${styles.sceneNode} ${styles.nodeOne}`}>AI Control Tower</span>
          <span className={`${styles.sceneNode} ${styles.nodeTwo}`}>Workflow Data Fabric</span>
          <span className={`${styles.sceneNode} ${styles.nodeThree}`}>AI Workforce</span>
          <span className={`${styles.sceneNode} ${styles.nodeFour}`}>Service Graph</span>
          <div className={styles.sceneCore}>
            <span>Govern</span>
            <strong>AI</strong>
            <span>Act</span>
          </div>
          <div className={styles.agentPanel}>
            <span className={styles.agentPanelLabel}>Agent operating model</span>
            {agentSignals.map(([label, value]) => (
              <span key={label}>
                <strong>{label}</strong>
                <em>{value}</em>
              </span>
            ))}
          </div>
          <div className={styles.signalLine} />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ServiceNow / Enterprise AI / Platform strategy</p>
          <h1 id="home-title">IA corporativa nao escala so por modelos.</h1>
          <p className={styles.lead}>
            Ela escala quando governanca, contexto operacional e execucao em workflow andam juntos. Sou Technical
            Account Executive na ServiceNow, trabalhando na intersecao entre estrategia, plataforma, dados e adocao.
          </p>
          <p className={styles.personalNote}>
            Este e meu site pessoal, baseado em materiais publicos e na minha perspectiva profissional. Nao e um canal
            oficial da ServiceNow e nao inclui informacao de clientes.
          </p>
          <div className={styles.actions}>
            <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer">
              Conectar no LinkedIn
            </a>
            <a href="#thesis">Ver minha tese</a>
          </div>
        </div>
      </section>

      <section id="thesis" className={styles.focusSection} aria-labelledby="thesis-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Minha lente</p>
            <h2 id="thesis-title">A conversa deixou de ser sobre IA. Agora e sobre trabalho delegado.</h2>
            <p className={styles.sectionCopy}>
              O ponto critico nao e quantos agentes existem. E se a organizacao sabe onde eles podem atuar, quais dados
              podem usar, quem aprova excecoes, como evidenciam valor e como aprendem sem perder controle.
            </p>
          </div>
          <div className={styles.focusGrid}>
            {focusAreas.map((area) => (
              <article key={area.number}>
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
            <div>
              <p className={styles.eyebrow}>Modelo operacional</p>
              <h2 id="operating-title">O agente precisa de chao: contexto, permissao, acao e evidencia.</h2>
              <p>
                Essa e a forma como eu estruturo a conversa: antes de escalar autonomia, desenhar a cadeia que conecta
                intencao, dados, controle, workflow e resultado mensuravel.
              </p>
            </div>
            <div className={styles.operatingRail}>
              {operatingLayers.map((layer) => (
                <article key={layer.label}>
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
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Temas que importam agora</p>
            <h2 id="themes-title">O ciclo da IA governada na ServiceNow.</h2>
            <p className={styles.sectionCopy}>
              Minha leitura das novidades publicas: a plataforma esta se movendo de assistencia pontual para execucao
              governada, com dados vivos e agentes sob controle operacional.
            </p>
          </div>
          <div className={styles.themeGrid}>
            {themes.map((theme) => (
              <article key={theme.label}>
                <span>{theme.label}</span>
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sourcesSection} aria-labelledby="sources-title">
        <div className={styles.sectionInner}>
          <div className={styles.sourcesLayout}>
            <div>
              <p className={styles.eyebrow}>Referencias publicas</p>
              <h2 id="sources-title">A base da conversa vem dos anuncios oficiais.</h2>
              <p>
                Os temas acima refletem anuncios publicos recentes da ServiceNow sobre governanca de IA, Autonomous
                Workforce, dados em tempo real, system of action para agentes e experiencias AI-native.
              </p>
            </div>
            <div className={styles.sourceLinks}>
              {sourceLinks.map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>pierrondi.dev</span>
        <span>Site pessoal. Opinioes minhas. ServiceNow e marcas relacionadas pertencem aos seus respectivos titulares.</span>
      </footer>
    </main>
  )
}
