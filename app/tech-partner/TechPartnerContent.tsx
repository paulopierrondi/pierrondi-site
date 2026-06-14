'use client'

import type { CSSProperties } from 'react'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './TechPartnerContent.module.css'

const includes = [
  { title: 'Revisão de stack e arquitetura', desc: 'Diagnóstico contínuo da saúde técnica do produto. Identificação de dívida técnica e priorização do que resolver primeiro.' },
  { title: 'Code review semanal', desc: 'Revisão de PRs com feedback técnico direto. Padrões de qualidade, segurança e performance mantidos sprint a sprint.' },
  { title: 'Decisões de arquitetura', desc: 'Participação em decisões técnicas críticas: escolha de stack, modelagem de banco, design de API, integrações.' },
  { title: 'Roadmap técnico', desc: 'Tradução da visão de produto em roadmap técnico executável. Estimativas realistas, dependências mapeadas.' },
  { title: 'Execução parcial', desc: 'Desenvolvimento de features estratégicas, spikes técnicos e protótipos. Capacidade de execução quando o time interno não dá conta.' },
  { title: 'Mentoria do time', desc: 'Apoio técnico ao time de desenvolvimento. Code pairing, orientação de carreira técnica e elevação do nível coletivo.' },
]

const faqs = [
  { q: 'Qual o compromisso mínimo?', a: 'Contrato mensal, renovável. Sem fidelidade de 12 meses. Você mantém enquanto fizer sentido para o negócio.' },
  { q: 'Quantas horas por mês?', a: '~20h/mês dedicadas, distribuídas conforme a demanda da semana. Code reviews, calls estratégicas, execução parcial e resposta a dúvidas técnicas.' },
  { q: 'Funciona para time sem CTO?', a: 'Exatamente para isso. Startups e PMEs que têm dev(s) mas não têm liderança técnica estratégica.' },
  { q: 'Funciona junto com time interno?', a: 'Sim. O Tech Partner complementa o time — não substitui. Age como CTO fracionado que define direção e padrões técnicos.' },
  { q: 'Posso contratar só quando precisar?', a: 'O modelo é recorrente por design — consistência é o valor. Para demandas pontuais, o Produto Digital é o formato certo.' },
]

const fit = [
  { label: 'Startups early-stage', desc: 'Time dev sem liderança técnica sênior para guiar arquitetura e decisões de stack.' },
  { label: 'PMEs com produto digital', desc: 'Software interno ou SaaS que precisa evoluir com qualidade sem contratar CTO CLT.' },
  { label: 'Infoprodutores técnicos', desc: 'Creators que construíram produto próprio e precisam de revisão técnica contínua.' },
  { label: 'Times remotos', desc: 'Empresas com dev(s) espalhados que precisam de referência técnica e code review consistente.' },
]

export default function TechPartnerContent() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="CTO as a Service"
        headline="Tech Partner. Fracionado."
        headlineLevel="h1"
        tagline="Presença técnica contínua sem vínculo CLT. Arquitetura, code review, roadmap e execução parcial — para negócios que precisam de liderança técnica sem contratar um CTO full-time."
        ctas={
          <>
            <PillButton variant="primary" href="/#contact">Agendar conversa</PillButton>
            <PillButton variant="ghost" href="/precos">Ver preços</PillButton>
          </>
        }
      >
        <div className={styles.heroPricing} data-animate>
          <span className={styles.heroPrice}>R$2.500<span className={styles.heroPeriod}>/mês</span></span>
          <span className={styles.heroNote}>Contrato mensal · Sem fidelidade</span>
        </div>
      </ProductTile>

      {/* O que inclui */}
      <ProductTile
        variant="dark"
        eyebrow="O que inclui"
        headline="Presença técnica de verdade."
      >
        <div className={styles.includesGrid}>
          {includes.map((item, i) => (
            <article
              key={item.title}
              className={styles.includeCard}
              data-animate
              style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
            >
              <h3 className={styles.includeTitle}>{item.title}</h3>
              <p className={styles.includeDesc}>{item.desc}</p>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Para quem é */}
      <ProductTile
        variant="dark"
        eyebrow="Para quem é"
        headline="Ideal para negócios que crescem."
      >
        <div className={styles.fitGrid} data-animate>
          {fit.map((f) => (
            <div key={f.label} className={styles.fitCard}>
              <strong className={styles.fitLabel}>{f.label}</strong>
              <p className={styles.fitDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </ProductTile>

      {/* FAQ */}
      <ProductTile variant="dark" eyebrow="Dúvidas comuns" headline="Sem letra miúda.">
        <FaqAccordion items={faqs} />
      </ProductTile>

      {/* CTA */}
      <ProductTile
        variant="dark"
        eyebrow="Pronto para começar"
        headline="Liderança técnica quando você precisa."
        tagline="Agende uma conversa de 30 min. Entenda se o Tech Partner é o formato certo para o seu momento."
        ctas={
          <>
            <PillButton variant="primary" href="/#contact">Agendar conversa</PillButton>
            <PillButton variant="ghost" href="/produto-digital">Ver produto digital</PillButton>
          </>
        }
      />
    </>
  )
}
