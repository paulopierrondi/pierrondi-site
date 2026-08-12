'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PortfolioLang } from './portfolio-data'
import styles from './PortfolioExperience.module.css'

const COPY = {
  pt: {
    eyebrow: 'PIERRONDI STUDIO · CADERNO DE PRODUÇÃO',
    title: 'Do caderno ao corte final.',
    lead: 'Uma seleção autoral do processo de direção: storyboard, correção e revisão de entrega. A galeria completa mostra como o Studio organiza conteúdo em sistema.',
    cta: 'Ver sistema de criação',
    frameLabels: {
      dossier: 'CADERNO DE PRODUÇÃO · DIREÇÃO AUTORAL',
      storyboard: 'ATLAS DE STORYBOARD · SEQUÊNCIA E RITMO',
      review: 'CONSOLE DE REVISÃO · COR, CORTE E HANDOFF',
    },
    alt: {
      dossier: 'Cenário autoral do Pierrondi Studio com mesa de produção, monitor, anotações e materiais de direção visual.',
      storyboard: 'Atlas autoral de storyboard do Pierrondi Studio com frames, marcações e notas de direção.',
      review: 'Console autoral de revisão do Pierrondi Studio com monitor de edição, correção de cor e anotações de entrega.',
    },
    note: 'Visuais autorais do Pierrondi Studio. Eles representam linguagem e processo; não são registros de cliente, campanha publicada ou resultado de mídia.',
  },
  en: {
    eyebrow: 'PIERRONDI STUDIO · PRODUCTION NOTEBOOK',
    title: 'From notebook to final cut.',
    lead: 'An authorial selection from the direction process: storyboard, color work, and delivery review. The full gallery shows how the Studio turns content into a system.',
    cta: 'See the creative system',
    frameLabels: {
      dossier: 'PRODUCTION NOTEBOOK · AUTHORIAL DIRECTION',
      storyboard: 'STORYBOARD ATLAS · SEQUENCE AND RHYTHM',
      review: 'REVIEW CONSOLE · COLOR, CUT, AND HANDOFF',
    },
    alt: {
      dossier: 'Pierrondi Studio authorial production scene with a worktable, monitor, notes, and visual-direction materials.',
      storyboard: 'Pierrondi Studio authorial storyboard atlas with frames, markings, and direction notes.',
      review: 'Pierrondi Studio authorial review console with an editing monitor, color grading, and delivery notes.',
    },
    note: 'Pierrondi Studio authorial visuals. They represent language and process, not client work, published campaigns, or media results.',
  },
} as const

type FrameId = keyof (typeof COPY)['pt']['frameLabels']

const FRAMES: Array<{ id: FrameId; src: string; className: string; sizes: string }> = [
  {
    id: 'dossier',
    src: '/portfolio/studio/pierrondi-studio-production-dossier-v1.webp',
    className: styles.studioFrameDossier,
    sizes: '(max-width: 820px) calc(100vw - 44px), 58vw',
  },
  {
    id: 'storyboard',
    src: '/portfolio/studio/pierrondi-studio-storyboard-atlas-v1.webp',
    className: styles.studioFrameStoryboard,
    sizes: '(max-width: 820px) calc(100vw - 44px), 27vw',
  },
  {
    id: 'review',
    src: '/portfolio/studio/pierrondi-studio-review-console-v1.webp',
    className: styles.studioFrameReview,
    sizes: '(max-width: 820px) calc(100vw - 44px), 27vw',
  },
]

export default function PortfolioStudioSpotlight({
  lang,
  reduceMotion,
}: {
  lang: PortfolioLang
  reduceMotion: boolean
}) {
  const t = COPY[lang]
  const studioHref = lang === 'pt' ? '/studio#sistema-criativo' : '/en/studio#sistema-criativo'

  const reveal = (delay = 0) => ({
    initial: false,
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.52, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section className={styles.studioSpotlight} id="studio-visual" aria-labelledby="portfolio-studio-title">
      <motion.header className={styles.studioSpotlightHeader} {...reveal()}>
        <p>{t.eyebrow}</p>
        <h2 id="portfolio-studio-title">{t.title}</h2>
        <div>
          <span>{t.lead}</span>
          <Link href={studioHref}>{t.cta}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </motion.header>

      <div className={styles.studioFrames} aria-label={lang === 'pt' ? 'Seleção visual do Pierrondi Studio' : 'Pierrondi Studio visual selection'}>
        {FRAMES.map((frame, index) => (
          <motion.figure
            key={frame.id}
            className={`${styles.studioFrame} ${frame.className}`}
            data-portfolio-studio-frame={frame.id}
            {...reveal(0.05 + index * 0.05)}
          >
            <div className={styles.studioFrameMedia}>
              <Image src={frame.src} alt={t.alt[frame.id]} fill sizes={frame.sizes} />
              <figcaption>{t.frameLabels[frame.id]}</figcaption>
            </div>
          </motion.figure>
        ))}
      </div>

      <p className={styles.studioSpotlightNote}>{t.note}</p>
    </section>
  )
}
