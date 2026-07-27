'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { PortfolioLang } from './portfolio-data'
import { APP_STORE_CATALOG } from './portfolio-data'
import styles from './PortfolioExperience.module.css'

const EVIDENCE_FRAMES = [
  {
    id: 'cantustudio',
    src: '/portfolio/cantustudio/feature-graphic.png',
    className: styles.evidenceFrameMain,
    label: 'CantuStudio',
    sizes: '(max-width: 820px) 84vw, 36vw',
    priority: true,
  },
  {
    id: 'agenticoscore',
    src: '/portfolio/agenticoscore/home-desktop.png',
    className: styles.evidenceFrameAgent,
    label: 'AgenticosCore',
    sizes: '(max-width: 820px) 68vw, 31vw',
    priority: false,
  },
  {
    id: 'faithschool',
    src: '/portfolio/faithschool/app-home.png',
    className: styles.evidenceFramePhone,
    label: 'FaithSchool',
    sizes: '(max-width: 820px) 31vw, 13vw',
    priority: false,
  },
  {
    id: 'satb',
    src: '/portfolio/cantustudio/melodia-satb.png',
    className: styles.evidenceFrameScore,
    label: 'SATB / AI',
    sizes: '(max-width: 820px) 27vw, 12vw',
    priority: false,
  },
] as const

export default function PortfolioEvidenceMosaic({
  lang,
  reduceMotion,
}: {
  lang: PortfolioLang
  reduceMotion: boolean
}) {
  return (
    <div className={styles.heroEvidence} aria-hidden="true">
      <span className={styles.evidenceAxis} />

      {EVIDENCE_FRAMES.map((frame, index) => (
        <motion.figure
          key={frame.id}
          className={`${styles.evidenceFrame} ${frame.className}`}
          initial={reduceMotion ? false : { opacity: 0, clipPath: index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
          transition={{
            delay: reduceMotion ? 0 : 0.14 + index * 0.08,
            duration: reduceMotion ? 0 : 0.68,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src={frame.src}
            alt=""
            fill
            sizes={frame.sizes}
            priority={frame.priority}
          />
          <figcaption>{frame.label}</figcaption>
        </motion.figure>
      ))}

      <motion.div
        className={styles.evidenceApps}
        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0 : 0.52 }}
      >
        {APP_STORE_CATALOG.apps.slice(0, 4).map((app) => (
          <Image key={app.trackId} src={app.icon} alt="" width={44} height={44} />
        ))}
      </motion.div>

      <div className={styles.evidenceCounter}>
        <strong>21</strong>
        <span>{lang === 'pt' ? 'apps públicos' : 'public apps'}</span>
        <small>{lang === 'pt' ? 'prova, não promessa' : 'proof, not promise'}</small>
      </div>
    </div>
  )
}
