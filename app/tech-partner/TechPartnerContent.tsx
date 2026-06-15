'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
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
  return (
    <>
      <PageHeader
        eyebrow="CTO AS A SERVICE"
        title={<>Tech Partner. <span className="text-primary">Fracionado.</span></>}
        lead="Presença técnica contínua sem vínculo CLT. Arquitetura, code review, roadmap e execução parcial — para negócios que precisam de liderança técnica sem contratar um CTO full-time."
      />

      <main className={styles.main}>
        <Reveal>
          <div className={styles.heroPricing}>
            <span className={styles.heroPrice}>R$2.500<span className={styles.heroPeriod}>/mês</span></span>
            <span className={styles.heroNote}>Contrato mensal · Sem fidelidade</span>
          </div>
        </Reveal>

        <section className={styles.includes} aria-labelledby="includes-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>O que inclui</span>
              <h2 id="includes-title">Presença técnica de verdade.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.includesGrid} staggerDelay={0.06}>
            {includes.map((item, i) => (
              <RevealStaggerItem key={item.title}>
                <article className={styles.includeCard} style={{ '--delay': `${i * 0.08}s` } as CSSProperties}>
                  <h3 className={styles.includeTitle}>{item.title}</h3>
                  <p className={styles.includeDesc}>{item.desc}</p>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.fit} aria-labelledby="fit-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Para quem é</span>
              <h2 id="fit-title">Ideal para negócios que crescem.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.fitGrid} staggerDelay={0.05}>
            {fit.map((f) => (
              <RevealStaggerItem key={f.label}>
                <div className={styles.fitCard}>
                  <strong className={styles.fitLabel}>{f.label}</strong>
                  <p className={styles.fitDesc}>{f.desc}</p>
                </div>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Dúvidas comuns</span>
              <h2 id="faq-title">Sem letra miúda.</h2>
            </div>
          </Reveal>
          <RevealStagger staggerDelay={0.04}>
            {faqs.map((faq) => (
              <RevealStaggerItem key={faq.q}>
                <details className={styles.faq}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.ctaSection}>
          <Reveal>
            <h2>Liderança técnica quando você precisa.</h2>
            <p>Agende uma conversa de 30 min. Entenda se o Tech Partner é o formato certo para o seu momento.</p>
            <div className={styles.ctaActions}>
              <Link href="/contato" className={styles.btnPrimary}>Agendar conversa</Link>
              <Link href="/produto-digital" className={styles.btnGhost}>Ver produto digital</Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}
