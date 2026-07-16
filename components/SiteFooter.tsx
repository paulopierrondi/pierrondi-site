'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT, getWhatsAppHref } from '@/lib/contact'
import { getCurrentLanguage, type HomeLang } from '@/lib/i18n/site-language'
import { isImmersiveHomeRoute, usesOwnAppChrome } from '@/components/home-v2/immersive-routes'
import styles from './SiteFooter.module.css'

const currentYear = new Date().getFullYear()

const footerCopy: Record<HomeLang, {
  eyebrow: string
  headlinePrefix: string
  headlineAccent: string
  contactHref: string
  primaryCta: string
  secondaryCta: string
  navHead: string
  navLinks: Array<{ label: string; href: string }>
  workHead: string
  workLinks: Array<{ label: string; href: string }>
  productHead: string
  productLinks: Array<{ label: string; href: string }>
  contactHead: string
  status: string
  note: string
  brandHref: string
  legalLinks: Array<{ label: string; href: string }>
  toTop: string
}> = {
  pt: {
    eyebrow: 'Vamos conversar',
    headlinePrefix: 'IA que vira',
    headlineAccent: 'execução governada.',
    contactHref: '/contato',
    primaryCta: 'Chamar Paulo no WhatsApp',
    secondaryCta: 'Enviar email',
    navHead: 'Navegação',
    navLinks: [
      { label: 'Início', href: '/' },
      { label: 'Bio', href: '/about' },
      { label: 'Atuação', href: '/atuacao' },
      { label: 'Feitos', href: '/feitos' },
      { label: 'Ideias', href: '/blog' },
      { label: 'Contato', href: '/contato' },
    ],
    workHead: 'Atuação',
    workLinks: [
      { label: 'AI Operating Model', href: '/atuacao#operating-model' },
      { label: 'ServiceNow & IA', href: '/atuacao#servicenow' },
      { label: 'AgentOps', href: '/atuacao#agentops' },
      { label: 'AI Search Index', href: '/ai-search' },
      { label: 'Estratégia', href: '/atuacao#lideranca' },
    ],
    productHead: 'Sites',
    productLinks: [
      { label: 'FaithSchool', href: 'https://faithschool.app' },
      { label: 'CantuStudio', href: 'https://cantustudio.app' },
      { label: 'AgenticosCore', href: 'https://agenticoscore.ai' },
    ],
    contactHead: 'Contato',
    status: 'Aberto a boas conversas',
    note: 'Conteúdo autoral, com recorte público e sem dados confidenciais. Opiniões próprias, sem representação institucional.',
    brandHref: '/',
    legalLinks: [
      { label: 'Privacidade', href: '/privacidade' },
      { label: 'Aviso legal', href: '/termos' },
    ],
    toTop: 'Topo',
  },
  en: {
    eyebrow: "Let's talk",
    headlinePrefix: 'AI that becomes',
    headlineAccent: 'governed execution.',
    contactHref: '/en/contato',
    primaryCta: 'Message Paulo on WhatsApp',
    secondaryCta: 'Send email',
    navHead: 'Navigation',
    navLinks: [
      { label: 'Home', href: '/en' },
      { label: 'About', href: '/en/about' },
      { label: 'Work', href: '/en/atuacao' },
      { label: 'Proof', href: '/en/feitos' },
      { label: 'Ideas', href: '/en/blog' },
      { label: 'Contact', href: '/en/contato' },
    ],
    workHead: 'Work',
    workLinks: [
      { label: 'AI Operating Model', href: '/en/atuacao#operating-model' },
      { label: 'ServiceNow & AI', href: '/en/atuacao#servicenow' },
      { label: 'AgentOps', href: '/en/atuacao#agentops' },
      { label: 'AI Search Index', href: '/ai-search' },
      { label: 'Strategy', href: '/en/atuacao#lideranca' },
    ],
    productHead: 'Sites',
    productLinks: [
      { label: 'FaithSchool', href: 'https://faithschool.app' },
      { label: 'CantuStudio', href: 'https://cantustudio.app' },
      { label: 'AgenticosCore', href: 'https://agenticoscore.ai' },
    ],
    contactHead: 'Contact',
    status: 'Open for good conversations',
    note: 'Independent writing built from public context and without confidential data. Personal views, with no institutional representation.',
    brandHref: '/en',
    legalLinks: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Legal notice', href: '/terms' },
    ],
    toTop: 'Top',
  },
}

export default function SiteFooter() {
  const pathname = usePathname() || '/'
  const lang = getCurrentLanguage(pathname)
  const copy = footerCopy[lang]
  const whatsappHref = getWhatsAppHref(
    lang === 'pt'
      ? 'Olá, Paulo! Vim pelo seu site e gostaria de conversar.'
      : 'Hi Paulo! I found your site and would like to talk.'
  )

  const scrollTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isImmersiveHomeRoute(pathname) || usesOwnAppChrome(pathname)) return null

  return (
    <footer className={`${styles.footer} ${pathname === '/paulo' ? styles.withFloatingNav : ''}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.lead}>
            <p className={styles.eyebrow}>
              <span className={styles.tick} />{copy.eyebrow}
            </p>
            <Link href={copy.contactHref} className={styles.headline}>
              {copy.headlinePrefix}{' '}
              <span className={styles.accent}>{copy.headlineAccent}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
            <div className={styles.actions}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
              >
                {copy.primaryCta} <span aria-hidden="true">↗</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className={styles.btnGhost}>
                {copy.secondaryCta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h3 className={styles.colHead}>{copy.navHead}</h3>
              {copy.navLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
            <div className={styles.col}>
              <h3 className={styles.colHead}>{copy.workHead}</h3>
              {copy.workLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
            <div className={styles.col}>
              <h3 className={styles.colHead}>{copy.productHead}</h3>
              {copy.productLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
            <div className={styles.col}>
              <h3 className={styles.colHead}>{copy.contactHead}</h3>
              <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className={styles.status}>
                <span className={styles.live} aria-hidden="true" />
                {copy.status}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          PIERRONDI
        </div>

        <div className={styles.bottom}>
          <div className={styles.brandNote}>
            <Link href={copy.brandHref} className={styles.brand} aria-label="Pierrondi.dev">
              <span className={styles.brandBracket}>&lt;</span>
              <span className={styles.brandName}>pierrondi.dev</span>
              <span className={styles.brandBracket}>/&gt;</span>
            </Link>
            <p className={styles.note}>{copy.note}</p>
          </div>
          <div className={styles.legal}>
            {copy.legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
            <button className={styles.toTop} onClick={scrollTop}>
              {copy.toTop} <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>

        <p className={styles.copyright}>© {currentYear} Paulo Pierrondi.</p>
      </div>
    </footer>
  )
}
