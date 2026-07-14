'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Check, MessageCircleMore, ShieldCheck } from 'lucide-react'
import ProductLogo from '@/components/ProductLogo'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import {
  APP_STORE_CATALOG,
  type PortfolioCase,
  type PortfolioLang,
} from './portfolio-data'
import styles from './ProjectVisual.module.css'

const APP_WALL = APP_STORE_CATALOG.apps.slice(0, 15)
const StudioGrowthCore = dynamic(() => import('@/components/studio/StudioGrowthCore'), {
  ssr: false,
  loading: () => <div className={styles.studioCoreLoading} aria-hidden="true" />,
})

export function CaseMark({ item, size = 42 }: { item: PortfolioCase; size?: number }) {
  if (item.logoSlug) return <ProductLogo slug={item.logoSlug} name={item.title} size={size} />

  if (item.visual === 'sada') {
    return (
      <span className={`${styles.caseMark} ${styles.caseMarkImage}`} style={{ width: size, height: size }}>
        <Image src="/portfolio/sada/sada-mark.svg" alt="SADA" width={size} height={size} />
      </span>
    )
  }

  if (item.visual === 'app-store') {
    return (
      <span className={`${styles.caseMark} ${styles.appMark}`} style={{ width: size + 8, height: size }} aria-hidden="true">
        {APP_STORE_CATALOG.apps.slice(0, 3).map((app, index) => (
          <Image
            key={app.trackId}
            src={app.icon}
            alt=""
            width={size - 7}
            height={size - 7}
            style={{ left: index * 8 }}
          />
        ))}
      </span>
    )
  }

  if (item.visual === 'kommo') {
    return (
      <span className={`${styles.caseMark} ${styles.kommoMark}`} style={{ width: size, height: size }} aria-hidden="true">
        <MessageCircleMore size={Math.round(size * 0.52)} />
      </span>
    )
  }

  if (item.visual === 'pierrondi-studio') {
    return (
      <span className={`${styles.caseMark} ${styles.studioMark}`} style={{ width: size, height: size }} aria-hidden="true">
        PS
      </span>
    )
  }

  return (
    <span className={`${styles.caseMark} ${styles.crmMark}`} style={{ width: size, height: size }} aria-hidden="true">
      SC
    </span>
  )
}

export default function ProjectVisual({
  item,
  lang,
  compact = false,
}: {
  item: PortfolioCase
  lang: PortfolioLang
  compact?: boolean
}) {
  const reduceMotion = useHydratedReducedMotion()
  const className = [styles.visual, styles[item.accent], compact ? styles.compact : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} data-visual={item.visual}>
      <span className={styles.grid} aria-hidden="true" />
      {item.visual === 'cantustudio' && <CantuVisual />}
      {item.visual === 'faithschool' && <FaithVisual reduceMotion={reduceMotion} />}
      {item.visual === 'app-store' && <AppStoreVisual lang={lang} reduceMotion={reduceMotion} />}
      {item.visual === 'kommo' && <KommoVisual lang={lang} reduceMotion={reduceMotion} />}
      {item.visual === 'studio-crm' && <CrmVisual lang={lang} reduceMotion={reduceMotion} />}
      {item.visual === 'pierrondi-studio' && <StudioVisual lang={lang} />}
      {item.visual === 'agenticoscore' && <AgenticosVisual />}
      {item.visual === 'sada' && <SadaVisual lang={lang} reduceMotion={reduceMotion} />}
    </div>
  )
}

function CantuVisual() {
  return (
    <div className={styles.cantuVisual}>
      <Image
        src="/portfolio/cantustudio/feature-graphic.png"
        alt="CantuStudio — importe, harmonize, revise e exporte"
        fill
        sizes="(max-width: 780px) 92vw, 56vw"
        className={styles.coverImage}
        priority
      />
      <div className={styles.visualProof}>
        <span>WEB</span>
        <span>APP STORE</span>
        <span>ANDROID BUILD</span>
      </div>
    </div>
  )
}

function FaithVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className={styles.faithVisual}>
      <div className={styles.faithWordmark}>
        <ProductLogo slug="faithschool-web" name="FaithSchool" size={46} />
        <div>
          <strong>FaithSchool</strong>
          <span>family learning system</span>
        </div>
      </div>
      <motion.div
        className={`${styles.phone} ${styles.phoneBack}`}
        initial={reduceMotion ? false : { opacity: 0, y: 20, rotate: 5 }}
        animate={{ opacity: 0.72, y: 0, rotate: 4 }}
        transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/portfolio/faithschool/app-planner.png" alt="FaithSchool planner" fill sizes="260px" />
      </motion.div>
      <motion.div
        className={`${styles.phone} ${styles.phoneFront}`}
        initial={reduceMotion ? false : { opacity: 0, y: 26, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/portfolio/faithschool/app-home.png" alt="FaithSchool home" fill sizes="280px" />
      </motion.div>
      <div className={styles.faithCaption}>WEB · IPHONE · IPAD · ANDROID BUILD</div>
    </div>
  )
}

function AppStoreVisual({ lang, reduceMotion }: { lang: PortfolioLang; reduceMotion: boolean }) {
  return (
    <div className={styles.appStoreVisual}>
      <div className={styles.appStoreHeadline}>
        <span>{lang === 'pt' ? 'PUBLICADOS NA' : 'PUBLISHED ON THE'}</span>
        <strong>App Store</strong>
        <small>{APP_STORE_CATALOG.count} {lang === 'pt' ? 'apps públicos' : 'public apps'}</small>
      </div>
      <div className={styles.appWall} aria-hidden="true">
        {APP_WALL.map((app, index) => (
          <motion.span
            key={app.trackId}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.72, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.34,
              delay: reduceMotion ? 0 : index * 0.025,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Image src={app.icon} alt="" fill sizes="88px" />
          </motion.span>
        ))}
      </div>
      <div className={styles.storeSweep} aria-hidden="true" />
    </div>
  )
}

function KommoVisual({ lang, reduceMotion }: { lang: PortfolioLang; reduceMotion: boolean }) {
  const columns = lang === 'pt'
    ? [
        ['Novo lead', 'Mensagem recebida'],
        ['Triagem', 'Origem + intenção'],
        ['Qualificado', 'Jornada correta'],
        ['Handoff', 'Pessoa assume'],
      ]
    : [
        ['New lead', 'Message received'],
        ['Triage', 'Source + intent'],
        ['Qualified', 'Right journey'],
        ['Handoff', 'Human takes over'],
      ]

  return (
    <div className={styles.kommoVisual}>
      <div className={styles.integrationHeader}>
        <span className={styles.kommoWordmark}>kommo</span>
        <ArrowRight aria-hidden="true" />
        <span className={styles.whatsappWordmark}><MessageCircleMore aria-hidden="true" /> WhatsApp</span>
        <span className={styles.controlled}>{lang === 'pt' ? 'fluxo controlado' : 'controlled flow'}</span>
      </div>
      <div className={styles.pipeline}>
        {columns.map(([title, copy], index) => (
          <motion.div
            key={title}
            className={styles.pipelineColumn}
            initial={reduceMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : index * 0.07 }}
          >
            <span className={styles.pipelineIndex}>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <div className={styles.leadCard}>
              <span className={styles.avatar} />
              <p>{copy}</p>
              {index === columns.length - 1 ? <Check aria-hidden="true" /> : <span className={styles.pulseDot} />}
            </div>
          </motion.div>
        ))}
      </div>
      <div className={styles.integrationFooter}>
        <span><Bot aria-hidden="true" /> Salesbot</span>
        <span><ShieldCheck aria-hidden="true" /> LGPD gate</span>
        <span><MessageCircleMore aria-hidden="true" /> human handoff</span>
      </div>
    </div>
  )
}

function CrmVisual({ lang, reduceMotion }: { lang: PortfolioLang; reduceMotion: boolean }) {
  const modules = lang === 'pt'
    ? ['Clientes', 'Projetos', 'Contratos', 'Pagamentos', 'Atividades', 'Discussões']
    : ['Clients', 'Projects', 'Contracts', 'Payments', 'Activities', 'Discussions']

  return (
    <div className={styles.crmVisual}>
      <aside className={styles.crmSidebar}>
        <div className={styles.crmBrand}><span>SC</span><strong>Studio CRM</strong></div>
        {modules.map((module, index) => (
          <span key={module} className={index === 1 ? styles.crmActive : ''}>{module}</span>
        ))}
      </aside>
      <div className={styles.crmCanvas}>
        <header>
          <div>
            <span>OPERATIONS / 2026</span>
            <strong>{lang === 'pt' ? 'Visão operacional' : 'Operations view'}</strong>
          </div>
          <span className={styles.secureBadge}><ShieldCheck aria-hidden="true" /> {lang === 'pt' ? 'protegido' : 'protected'}</span>
        </header>
        <div className={styles.crmMetrics}>
          {['12', '07', '04'].map((value, index) => (
            <motion.div
              key={value}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
            >
              <span>{lang === 'pt' ? ['projetos', 'atividades', 'contratos'][index] : ['projects', 'activities', 'contracts'][index]}</span>
              <strong>{value}</strong>
            </motion.div>
          ))}
        </div>
        <div className={styles.crmTable}>
          {[74, 58, 84, 42].map((width, index) => (
            <span key={width} style={{ '--row-width': `${width}%`, '--row-delay': `${index * 90}ms` } as CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AgenticosVisual() {
  return (
    <div className={styles.agenticosVisual}>
      <Image
        src="/portfolio/agenticoscore/home-desktop.png"
        alt="Interface pública do AgenticosCore Revenue OS"
        fill
        sizes="(max-width: 780px) 92vw, 56vw"
        className={styles.coverImage}
      />
      <div className={styles.agenticosLabel}>
        <Image src="/portfolio/agenticoscore/logo.svg" alt="" width={28} height={28} />
        <span>REVENUE OPERATING SYSTEM</span>
      </div>
    </div>
  )
}

function StudioVisual({ lang }: { lang: PortfolioLang }) {
  return (
    <div className={styles.studioVisual}>
      <StudioGrowthCore lang={lang} mode="compact" />
    </div>
  )
}

function SadaVisual({ lang, reduceMotion }: { lang: PortfolioLang; reduceMotion: boolean }) {
  const stages = ['Intent', 'Context', 'Control', 'Action', 'Evidence']
  return (
    <div className={styles.sadaVisual}>
      <Image
        src="/portfolio/sada/sada-logo.svg"
        alt="SADA — Architecture Intelligence"
        width={316}
        height={96}
        className={styles.sadaLogo}
      />
      <div className={styles.sadaFlow}>
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : index * 0.08 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{stage}</strong>
          </motion.div>
        ))}
        <span className={styles.sadaLine} aria-hidden="true" />
      </div>
      <p>{lang === 'pt' ? 'arquitetura → workflow → valor mensurável' : 'architecture → workflow → measurable value'}</p>
    </div>
  )
}
