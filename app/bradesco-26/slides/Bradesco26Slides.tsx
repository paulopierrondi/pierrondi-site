'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Code2,
  DatabaseZap,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  MonitorPlay,
  Network,
  Presentation,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import styles from './Bradesco26Slides.module.css'

type SlideCard = {
  title: string
  copy: string
  meta?: string
  icon?: LucideIcon
}

type ProductReference = {
  name: string
  href: string
  label: string
  description: string
}

type Slide = {
  id: string
  number: string
  kicker: string
  title: string
  subtitle: string
  accent: 'red' | 'green' | 'blue' | 'gold' | 'cyan'
  signal: string
  icon: LucideIcon
  bullets: string[]
  cards: SlideCard[]
  tags: string[]
  product: ProductReference
}

const slides: Slide[] = [
  {
    id: 'abertura',
    number: '00',
    kicker: 'Knowledge 2026',
    title: 'Knowledge 2026 aplicado ao Bradesco.',
    subtitle:
      'Material executivo e técnico sobre governança de IA, contexto operacional, agentes, risco, dados e execução ponta a ponta.',
    accent: 'red',
    signal: '03 junho',
    icon: Presentation,
    bullets: [
      'O foco é traduzir os anúncios K26 em decisões práticas para operar IA com controle.',
      'O material conecta modelo operacional, velocidade de adoção e expansão de valor na plataforma.',
      'Cada seção foi estruturada com mensagem direta, contraste alto e leitura clara em reunião.',
    ],
    cards: [
      {
        title: '05-07 mai',
        copy: 'Base oficial K26 Las Vegas, consolidada pelos releases de 05/05 e 06/05.',
        meta: 'Fonte oficial',
        icon: Radar,
      },
      {
        title: '03 junho',
        copy: 'Roteiro de conversa com foco em arquitetura, adoção e próximos workshops.',
        meta: 'Apresentação',
        icon: MonitorPlay,
      },
      {
        title: '9 telas',
        copy: 'Cada tela ancora um produto ou anúncio oficial da ServiceNow para orientar a conversa.',
        meta: 'Navegação',
        icon: Layers3,
      },
    ],
    tags: ['AI governance', 'Contexto operacional', 'Execução governada'],
    product: {
      name: 'ServiceNow AI Platform',
      href: 'https://www.servicenow.com/now-platform.html',
      label: 'Produto base K26',
      description: 'AI, dados, workflows e segurança em uma única plataforma para transformar intenção em execução.',
    },
  },
  {
    id: 'tese',
    number: '01',
    kicker: 'Tese central',
    title: 'IA escala quando vira operação governada.',
    subtitle:
      'O diferencial não é ter mais IA. É colocar agentes para trabalhar com contexto real, permissões corretas, trilha auditável e indicadores de resultado.',
    accent: 'green',
    signal: 'Governar -> Contextualizar -> Executar',
    icon: BrainCircuit,
    bullets: [
      'Operating model define quem aprova, quem monitora e quem responde por exceção.',
      'Contexto confiável reduz resposta genérica e aumenta adoção com segurança.',
      'Sistema de ação transforma recomendação em trabalho executado com evidência.',
    ],
    cards: [
      {
        title: 'Governar',
        copy: 'AI Control Tower, identidade, telemetria, risco e medida desde o desenho.',
        meta: 'Controle',
        icon: ShieldCheck,
      },
      {
        title: 'Contextualizar',
        copy: 'CMDB, CSDM, catálogo, KB, WDF e Context Engine como base de decisão.',
        meta: 'Dados vivos',
        icon: DatabaseZap,
      },
      {
        title: 'Executar',
        copy: 'Action Fabric, MCP, approvals e workflows convertendo intenção em ação.',
        meta: 'Sistema de ação',
        icon: Workflow,
      },
    ],
    tags: ['Modelo operacional', 'Adoção', 'Receita expandida'],
    product: {
      name: 'ServiceNow AI Control Tower',
      href: 'https://www.servicenow.com/products/ai-control-tower.html',
      label: 'Produto K26',
      description: 'Governar qualquer agente, modelo, identidade e workflow com inventário, risco, telemetria e valor.',
    },
  },
  {
    id: 'mapa',
    number: '02',
    kicker: 'Mapa de produtos',
    title: 'Produtos K26 para orientar decisão.',
    subtitle:
      'Os temas abaixo deixam claro qual produto ou anúncio sustenta cada conversa: plataforma, agentes, experiência, desenvolvimento, dados, risco e arquitetura.',
    accent: 'blue',
    signal: 'Roteiro executivo',
    icon: Radar,
    bullets: [
      'Começar com a tese de governança e fechar com próximos workshops.',
      'Usar os blocos como capítulos, não como lista de produtos.',
      'Cada bloco deve terminar com uma decisão prática para Bradesco.',
    ],
    cards: [
      {
        title: 'AI & Plataforma',
        copy: 'AI Control Tower, Otto e Action Fabric como sistema governado de trabalho.',
        meta: '01',
        icon: Bot,
      },
      {
        title: 'Developers',
        copy: 'Build Agent, App Engine e Project Arc para escala com padrão e revisão.',
        meta: '02',
        icon: Code2,
      },
      {
        title: 'Autonomous IT',
        copy: 'ITSM, ITOM, CMDB e SPM conectados por contexto operacional.',
        meta: '03',
        icon: Gauge,
      },
      {
        title: 'FSI & Atendimento',
        copy: 'FSO, CSM e ouvidoria como jornada, evidência e continuidade.',
        meta: '04',
        icon: Network,
      },
      {
        title: 'Security & Risk',
        copy: 'Identidade, ativo, risco e resposta no mesmo sistema de ação.',
        meta: '05',
        icon: LockKeyhole,
      },
      {
        title: 'Arquitetura',
        copy: 'WDF, Context Engine, guardrails e camadas técnicas para executar.',
        meta: '06',
        icon: Layers3,
      },
    ],
    tags: ['Roteiro', 'Capítulos', 'Decisão'],
    product: {
      name: 'ServiceNow AI Agents',
      href: 'https://www.servicenow.com/products/ai-agents.html',
      label: 'Produto K26',
      description: 'Agentes nativos e conectados para executar trabalho em IT, CRM, RH, segurança, risco e desenvolvimento.',
    },
  },
  {
    id: 'plataforma',
    number: '03',
    kicker: 'AI & Plataforma',
    title: 'Da interface inteligente ao sistema de ação.',
    subtitle:
      'K26 reposiciona ServiceNow como plataforma para governar, contextualizar e executar trabalho com agentes, inclusive agentes externos.',
    accent: 'red',
    signal: 'AI Control Tower + Otto + Action Fabric',
    icon: Bot,
    bullets: [
      'AI Control Tower cria inventário, telemetria, política, segurança e métrica para agentes.',
      'Otto transforma intenção em jornada resolutiva, quando catálogo e conhecimento estão prontos.',
      'Action Fabric e MCP permitem que agentes externos acionem trabalho governado na plataforma.',
    ],
    cards: [
      {
        title: 'Pergunta executiva',
        copy: 'Quem assina o modelo de governança da IA operacional?',
        meta: 'Decisão',
        icon: CheckCircle2,
      },
      {
        title: 'Critério técnico',
        copy: 'Quais logs, IAM, CMDB, approvals e rollback existem antes de produção?',
        meta: 'Prontidão',
        icon: ShieldCheck,
      },
      {
        title: 'Movimento Bradesco',
        copy: 'Selecionar um domínio piloto e mapear agentes/assistentes já existentes.',
        meta: 'Workshop',
        icon: ArrowUpRight,
      },
    ],
    tags: ['Discover', 'Observe', 'Govern', 'Secure', 'Measure'],
    product: {
      name: 'ServiceNow Otto',
      href: 'https://www.servicenow.com/platform/otto.html',
      label: 'Produto K26',
      description: 'Experiência conversacional unificada para transformar intenção em trabalho concluído em chat, voz, web e mobile.',
    },
  },
  {
    id: 'developers',
    number: '04',
    kicker: 'Developers',
    title: 'Acelerar entrega sem abrir mão de arquitetura.',
    subtitle:
      'Build Agent e App Engine aumentam capacidade. O ponto crítico é nascer com padrões, revisão, Git, ACLs e esteira de promoção.',
    accent: 'blue',
    signal: 'Build Agent + App Engine + Project Arc',
    icon: Code2,
    bullets: [
      'Produtividade só vira valor se reduzir retrabalho, não se criar débito técnico mais rápido.',
      'Project Arc entra como tema exploratório para tarefas legadas e multi-etapa com sandbox.',
      'O primeiro caso deve ser app novo, escopo controlado e code review desde o primeiro dia.',
    ],
    cards: [
      {
        title: 'Padrão',
        copy: 'Templates, componentes reutilizáveis, regras de segurança e revisão obrigatória.',
        meta: 'Governança dev',
        icon: Layers3,
      },
      {
        title: 'Esteira',
        copy: 'Ambientes, Git, promoção, rollback e evidência técnica antes de produção.',
        meta: 'Entrega',
        icon: GitBranch,
      },
      {
        title: 'Piloto',
        copy: 'Escolher um app novo para provar velocidade com controle arquitetural.',
        meta: 'Próximo passo',
        icon: Sparkles,
      },
    ],
    tags: ['Build Agent', 'App Engine', 'Git', 'Review'],
    product: {
      name: 'ServiceNow Build Agent',
      href: 'https://www.servicenow.com/products/vibe-coding.html',
      label: 'Produto K26',
      description: 'Desenvolvimento agentic governado para criar apps enterprise-ready nos ambientes que o time já usa.',
    },
  },
  {
    id: 'operacoes',
    number: '05',
    kicker: 'Autonomous IT e Dados',
    title: 'Contexto operacional é o combustível da IA confiável.',
    subtitle:
      'CMDB e CSDM deixam de ser higiene de TI e viram contexto vivo para agentes, decisões e automações ponta a ponta.',
    accent: 'cyan',
    signal: 'Context Engine + WDF + CMDB/CSDM',
    icon: DatabaseZap,
    bullets: [
      'Context Engine conecta serviços, responsáveis, dependências, SLAs, histórico e conhecimento.',
      'Workflow Data Fabric usa dados onde eles vivem, sem copiar tudo para dentro da instância.',
      'O melhor piloto começa com uma decisão operacional concreta que depende de contexto confiável.',
    ],
    cards: [
      {
        title: 'Decisão de IA',
        copy: 'Qual resposta fica insegura sem contexto de serviço, criticidade e dependência?',
        meta: 'CMDB',
        icon: Boxes,
      },
      {
        title: 'Dado externo',
        copy: 'Qual dado fora da plataforma muda a ação dentro do workflow?',
        meta: 'WDF',
        icon: DatabaseZap,
      },
      {
        title: 'Domínio piloto',
        copy: 'Selecionar relações críticas antes de ampliar escopo de CMDB ou integração.',
        meta: 'CSDM',
        icon: Network,
      },
    ],
    tags: ['CMDB', 'CSDM', 'Knowledge Graph', 'Lineage'],
    product: {
      name: 'Workflow Data Fabric',
      href: 'https://www.servicenow.com/platform/workflow-data-fabric.html',
      label: 'Produto K26',
      description: 'Dados acionáveis e prontos para IA, com conexão, contexto e governança sem mover tudo para uma única base.',
    },
  },
  {
    id: 'risco',
    number: '06',
    kicker: 'Security & Risk',
    title: 'Agentes ampliam a superfície de identidade e risco.',
    subtitle:
      'Quando agentes executam trabalho, identidade humana e não humana, ativo, permissão e evidência precisam estar conectados.',
    accent: 'gold',
    signal: 'Identity + Asset + Risk response',
    icon: LockKeyhole,
    bullets: [
      'Autonomous Security and Risk conecta agente, identidade, ativo e resposta no mesmo sistema de ação.',
      'Least privilege, ciclo de vida e autorização por tipo de agente deixam de ser detalhe técnico.',
      'A evidência auditável precisa nascer junto com a automação, não depois do piloto.',
    ],
    cards: [
      {
        title: 'Risco executivo',
        copy: 'Onde a escala de agentes muda o apetite de risco?',
        meta: 'Governança',
        icon: ShieldCheck,
      },
      {
        title: 'Correlação técnica',
        copy: 'Como correlacionar API, identidade, agente e ativo em tempo real?',
        meta: 'Observabilidade',
        icon: GitBranch,
      },
      {
        title: 'Workshop',
        copy: 'Inventariar identidades não humanas e ações automatizadas de maior risco.',
        meta: 'Próximo passo',
        icon: CheckCircle2,
      },
    ],
    tags: ['Non-human identity', 'Least privilege', 'Asset context'],
    product: {
      name: 'ServiceNow Security Operations',
      href: 'https://www.servicenow.com/products/security-operations.html',
      label: 'Produto relacionado K26',
      description: 'Segurança, exposição, vulnerabilidade e resposta conectadas a ativos, identidades e workflows.',
    },
  },
  {
    id: 'arquitetura',
    number: '07',
    kicker: 'Arquitetura',
    title: 'A conversa precisa virar plano executável.',
    subtitle:
      'A arquitetura conecta experiência, IA governada, domínios de workflow, dados/contexto, segurança e integração.',
    accent: 'green',
    signal: 'Camadas técnicas',
    icon: Layers3,
    bullets: [
      'Experiência: Otto, portal, atendimento assistido e transição humana com contexto.',
      'IA governada: AI Control Tower, Now Assist, AI Specialists e políticas de execução.',
      'Dados e integração: WDF, Context Engine, CMDB/CSDM, MCP, OAuth, IAM e auditoria.',
    ],
    cards: [
      {
        title: 'Camada 1',
        copy: 'Experiência e canais para reduzir navegação e ambiguidade.',
        meta: 'Usuário',
        icon: MonitorPlay,
      },
      {
        title: 'Camada 2',
        copy: 'IA governada com responsáveis, permissões e telemetria.',
        meta: 'Controle',
        icon: BrainCircuit,
      },
      {
        title: 'Camada 3',
        copy: 'Dados, contexto, segurança e integração como fundação da execução.',
        meta: 'Fundação',
        icon: Boxes,
      },
    ],
    tags: ['Otto', 'Now Assist', 'WDF', 'MCP', 'IAM'],
    product: {
      name: 'MCP Server Console',
      href: 'https://www.servicenow.com/docs/r/intelligent-experiences/mcp-platform-manager-landing.html',
      label: 'Produto relacionado K26',
      description: 'Superfície oficial para publicar e governar ferramentas MCP que conectam agentes externos ao sistema de ação.',
    },
  },
  {
    id: 'fechamento',
    number: '08',
    kicker: 'Aprofundamento conjunto',
    title: 'Vamos aprofundar juntos os temas que mais importam para o Bradesco.',
    subtitle:
      'A ideia não é encerrar com uma lista de produtos. É escolher, com as pessoas certas, onde vale detalhar arquitetura, modelo operacional, riscos e próximos passos.',
    accent: 'red',
    signal: 'Próximas conversas',
    icon: CheckCircle2,
    bullets: [
      'Priorizar 2 ou 3 temas para aprofundamento: governança de IA, dados/contexto, atendimento, risco ou desenvolvimento.',
      'Trabalhar em conjunto com negócio, arquitetura, segurança e operação para separar inspiração de plano executável.',
      'Sair com agenda de conversas técnicas e executivas, respeitando maturidade, riscos e prioridades do Bradesco.',
    ],
    cards: [
      {
        title: 'Aprofundar',
        copy: 'Sessões por tema com perguntas de negócio, arquitetura, dados, segurança e adoção.',
        meta: 'Conversa',
        icon: Presentation,
      },
      {
        title: 'Conectar',
        copy: 'Contexto Bradesco, roadmap ServiceNow e prioridades reais da operação.',
        meta: 'Trabalho conjunto',
        icon: Network,
      },
      {
        title: 'Construir juntos',
        copy: 'Próximos passos com responsáveis, evidência e critérios de sucesso.',
        meta: 'Próximo passo',
        icon: CheckCircle2,
      },
    ],
    tags: ['Pessoas certas', 'Aprofundamento', 'Plano conjunto'],
    product: {
      name: 'Autonomous Workforce',
      href: 'https://www.servicenow.com/platform/autonomous-workforce.html',
      label: 'Produto K26',
      description: 'Especialistas digitais apoiam times humanos com escopo, permissões e contexto definidos para executar processos de ponta a ponta.',
    },
  },
]

const slideTransition = {
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1] as const,
}

export default function Bradesco26Slides() {
  const [activeIndex, setActiveIndex] = useState(0)
  const pageRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const activeSlide = slides[activeIndex]
  const progress = useMemo(
    () => ((activeIndex + 1) / slides.length) * 100,
    [activeIndex],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        setActiveIndex((index) => Math.min(slides.length - 1, index + 1))
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        setActiveIndex((index) => Math.max(0, index - 1))
      }

      if (event.key === 'Home') {
        setActiveIndex(0)
      }

      if (event.key === 'End') {
        setActiveIndex(slides.length - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const goToPrevious = () => {
    setActiveIndex((index) => Math.max(0, index - 1))
  }

  const goToNext = () => {
    setActiveIndex((index) => Math.min(slides.length - 1, index + 1))
  }

  const enterPresentationMode = async () => {
    const target = pageRef.current
    if (!target || !document.fullscreenEnabled) return

    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await target.requestFullscreen()
  }

  return (
    <main ref={pageRef} className={styles.page}>
      <div className={styles.progressRail} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <SlidesTopbar
        activeIndex={activeIndex}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        enterPresentationMode={enterPresentationMode}
      />
      <section id="slide-deck" className={styles.deckShell} aria-label="Material de apresentação K26">
        <ThumbRail activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <SlideStage
          activeSlide={activeSlide}
          activeIndex={activeIndex}
          prefersReducedMotion={prefersReducedMotion}
        />
      </section>
    </main>
  )
}

type SlidesTopbarProps = {
  activeIndex: number
  goToPrevious: () => void
  goToNext: () => void
  enterPresentationMode: () => Promise<void>
}

function SlidesTopbar({ activeIndex, goToPrevious, goToNext, enterPresentationMode }: SlidesTopbarProps) {
  return (
    <nav className={styles.topbar} aria-label="Navegação da apresentação">
      <Link href="/bradesco-26#radar" className={styles.backLink}>
        <ArrowLeft size={15} aria-hidden="true" />
        Radar
      </Link>
      <div className={styles.brand}>
        <strong>ServiceNow - Bradesco</strong>
        <span>Material K26</span>
      </div>
      <div className={styles.topActions}>
        <button type="button" className={styles.navStep} onClick={goToPrevious} disabled={activeIndex === 0} aria-label="Voltar seção" title="Voltar seção">
          <ArrowLeft size={15} aria-hidden="true" />
        </button>
        <button type="button" className={styles.navStep} onClick={goToNext} disabled={activeIndex === slides.length - 1} aria-label="Avançar seção" title="Avançar seção">
          <ArrowRight size={15} aria-hidden="true" />
        </button>
        <button type="button" className={styles.presentMode} onClick={enterPresentationMode}>
          <MonitorPlay size={15} aria-hidden="true" />
          Tela cheia
        </button>
      </div>
    </nav>
  )
}

type ThumbRailProps = {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

function ThumbRail({ activeIndex, setActiveIndex }: ThumbRailProps) {
  return (
    <aside className={styles.thumbRail} aria-label="Seções do material">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          className={index === activeIndex ? styles.thumbActive : styles.thumb}
          onClick={() => setActiveIndex(index)}
          aria-current={index === activeIndex ? 'step' : undefined}
        >
          <span>{slide.number}</span>
          <strong>{slide.title}</strong>
        </button>
      ))}
    </aside>
  )
}

type SlideStageProps = {
  activeSlide: Slide
  activeIndex: number
  prefersReducedMotion: boolean | null
}

function SlideStage({ activeSlide, activeIndex, prefersReducedMotion }: SlideStageProps) {
  const ActiveIcon = activeSlide.icon

  return (
    <div className={styles.stageWrap}>
      <AnimatePresence mode="wait">
        <motion.article
          key={activeSlide.id}
          className={`${styles.slide} ${styles[activeSlide.accent]}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28, rotateX: 4, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -18, rotateX: -3, scale: 0.99 }}
          transition={slideTransition}
        >
          <div className={styles.slideGrid} aria-hidden="true" />
          <div className={styles.slideBeacon} aria-hidden="true" />
          <header className={styles.slideHeader}>
            <div><p>{activeSlide.kicker}</p><h1>{activeSlide.title}</h1></div>
            <div className={styles.slideSignal}><ActiveIcon size={28} aria-hidden="true" /><span>{activeSlide.signal}</span></div>
          </header>
          <ProductStrip product={activeSlide.product} />
          <div className={styles.slideBody}>
            <SlideMessage activeSlide={activeSlide} />
            <SlideCards activeSlide={activeSlide} />
          </div>
          <footer className={styles.slideFooter}>
            <div className={styles.tagRail}>{activeSlide.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <span>{activeIndex + 1}/{slides.length}</span>
          </footer>
        </motion.article>
      </AnimatePresence>
    </div>
  )
}

function ProductStrip({ product }: { product: ProductReference }) {
  return (
    <aside className={styles.productStrip} aria-label="Produto ServiceNow relacionado">
      <div>
        <span>{product.label}</span>
        <strong>{product.name}</strong>
        <p>{product.description}</p>
      </div>
      <a href={product.href} target="_blank" rel="noreferrer">
        ServiceNow
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </aside>
  )
}

function SlideMessage({ activeSlide }: { activeSlide: Slide }) {
  return (
    <section className={styles.messagePanel}>
      <p className={styles.lead}>{activeSlide.subtitle}</p>
      <ul className={styles.bulletList}>
        {activeSlide.bullets.map((bullet) => (
          <li key={bullet}>
            <CheckCircle2 size={19} aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SlideCards({ activeSlide }: { activeSlide: Slide }) {
  return (
    <section className={styles.cardGrid} aria-label="Pontos-chave">
      {activeSlide.cards.map((card) => {
        const CardIcon = card.icon ?? Sparkles
        return (
          <article key={card.title}>
            <div>
              <CardIcon size={23} aria-hidden="true" />
              {card.meta ? <span>{card.meta}</span> : null}
            </div>
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </article>
        )
      })}
    </section>
  )
}
