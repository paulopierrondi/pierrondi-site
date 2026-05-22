import type { Metadata } from 'next'
import styles from './page.module.css'

const themes = [
  {
    label: 'AI Control Tower',
    title: 'Governar IA antes de escalar IA',
    copy:
      'Inventario, observabilidade, politica, seguranca e metrica para agentes, modelos e workloads rodando dentro e fora da plataforma.',
  },
  {
    label: 'Workflow Data Fabric',
    title: 'Contexto vivo para decisao e acao',
    copy:
      'Dados conectados, semantica operacional e contexto em tempo real para que IA deixe de recomendar no vazio.',
  },
  {
    label: 'Now Assist e agentes',
    title: 'Assistencia que vira execucao governada',
    copy:
      'A conversa muda quando agentes trabalham com identidade, permissoes, trilha auditavel e workflow ponta a ponta.',
  },
  {
    label: 'Service Graph / CSDM',
    title: 'A base que separa demo de producao',
    copy:
      'CMDB, servicos, ownership e dependencias bem modeladas continuam sendo a fundacao da execucao confiavel.',
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
      'Uma pagina pessoal e profissional sobre ServiceNow, IA governada, dados, contexto e execucao corporativa.',
    url: '/',
    siteName: 'pierrondi.dev',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Paulo Pierrondi - ServiceNow e IA governada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Pierrondi - ServiceNow e IA governada',
    description: 'Site pessoal sobre ServiceNow, IA governada e workflows corporativos.',
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
          <a href="#focus">Foco</a>
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
          <span className={`${styles.sceneNode} ${styles.nodeThree}`}>Now Assist</span>
          <span className={`${styles.sceneNode} ${styles.nodeFour}`}>Service Graph</span>
          <div className={styles.sceneCore}>
            <span>Govern</span>
            <strong>AI</strong>
            <span>Act</span>
          </div>
          <div className={styles.signalLine} />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ServiceNow / Enterprise AI / Platform strategy</p>
          <h1 id="home-title">IA corporativa so escala quando existe governanca para agir.</h1>
          <p className={styles.lead}>
            Sou Technical Account Executive na ServiceNow, focado em ajudar organizacoes complexas a conectar
            plataforma, dados, contexto e workflows em operacoes mais governadas.
          </p>
          <p className={styles.personalNote}>
            Este e meu site pessoal. Nao e um canal oficial da ServiceNow e nao representa comunicacao da empresa.
          </p>
          <div className={styles.actions}>
            <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer">
              Conectar no LinkedIn
            </a>
            <a href="#themes">Ver temas de trabalho</a>
          </div>
        </div>
      </section>

      <section id="focus" className={styles.focusSection} aria-labelledby="focus-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Meu foco</p>
            <h2 id="focus-title">Traduzir inovacao em modelo operacional.</h2>
          </div>
          <div className={styles.focusGrid}>
            <article>
              <span>01</span>
              <h3>Da estrategia para a plataforma</h3>
              <p>Conectar prioridades executivas a arquitetura, roadmap, governanca e adocao real da ServiceNow.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Da IA para o workflow</h3>
              <p>Separar hype de execucao: onde IA assiste, onde agentes atuam e onde controles precisam existir.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Da implantacao para valor continuo</h3>
              <p>Olhar plataforma como capacidade viva: dados, processos, seguranca, experiencia e melhoria continua.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="themes" className={styles.themeSection} aria-labelledby="themes-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Temas que importam agora</p>
            <h2 id="themes-title">O ciclo da IA governada na ServiceNow.</h2>
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
                Os temas acima refletem anuncios publicos recentes da ServiceNow sobre governanca de IA, autonomous
                workforce, dados em tempo real e system of action para agentes.
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
