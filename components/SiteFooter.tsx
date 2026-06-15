'use client'

import Link from 'next/link'
import SiteLogo from './SiteLogo'
import styles from './SiteFooter.module.css'

const currentYear = new Date().getFullYear()

export default function SiteFooter() {
  const scrollTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.lead}>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />Vamos conversar
            </p>
            <Link href="/contato" className={styles.headline}>
              IA que vira{' '}
              <span className={styles.accent}>execução governada.</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
            <div className={styles.actions}>
              <a
                href="https://br.linkedin.com/in/paulopierrondi"
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
              >
                Conectar no LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:pierrondi@gmail.com" className={styles.btnGhost}>
                Enviar email <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h3 className={styles.colHead}>Navegação</h3>
              <Link href="/">Início</Link>
              <Link href="/about">Bio</Link>
              <Link href="/atuacao">Atuação</Link>
              <Link href="/feitos">Feitos</Link>
              <Link href="/blog">Ideias</Link>
              <Link href="/contato">Contato</Link>
            </div>
            <div className={styles.col}>
              <h3 className={styles.colHead}>Atuação</h3>
              <Link href="/atuacao#operating-model">AI Operating Model</Link>
              <Link href="/atuacao#servicenow">ServiceNow & IA</Link>
              <Link href="/atuacao#agentops">AgentOps</Link>
              <Link href="/atuacao#lideranca">Estratégia</Link>
            </div>
            <div className={styles.col}>
              <h3 className={styles.colHead}>Contato</h3>
              <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>
              <a
                href="https://br.linkedin.com/in/paulopierrondi"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className={styles.status}>
                <span className={styles.live} aria-hidden="true" />
                Aberto a boas conversas
              </span>
            </div>
          </div>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          PIERRONDI
        </div>

        <div className={styles.bottom}>
          <div className={styles.brandNote}>
            <Link href="/" className={styles.brand} aria-label="Pierrondi.dev">
              <SiteLogo size={24} />
              <span className={styles.brandName}>
                Pierrondi<span className={styles.brandDot}>.</span>
              </span>
            </Link>
            <p className={styles.note}>
              Conteúdo independente. Sem posição oficial da ServiceNow. Sem
              nomes de clientes ou dados confidenciais. Opiniões próprias.
            </p>
          </div>
          <div className={styles.legal}>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Aviso legal</Link>
            <button className={styles.toTop} onClick={scrollTop}>
              Topo <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>

        <p className={styles.copyright}>© {currentYear} Paulo Pierrondi.</p>
      </div>
    </footer>
  )
}
