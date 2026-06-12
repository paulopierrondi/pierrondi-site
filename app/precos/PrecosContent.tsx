'use client'

import type { CSSProperties } from 'react'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './PrecosContent.module.css'

const plans = [
  {
    tag: 'Rápido',
    title: 'Automação Express',
    price: 'R$1.500–3.000',
    period: '2 semanas',
    items: [
      'Diagnóstico do processo',
      'Workflow n8n ou Make',
      'Integração com APIs existentes',
      'Documentação do fluxo',
      '30 dias de suporte pós-entrega',
    ],
    href: '/automacoes',
  },
  {
    tag: 'Popular',
    title: 'Produto Digital (MVP)',
    price: 'R$5.000–12.000',
    period: '4–8 semanas',
    featured: true,
    items: [
      'Discovery e escopo fechado',
      'UI/UX funcional',
      'Next.js + Supabase',
      'Deploy em produção',
      'Documentação técnica',
      '30 dias de suporte pós-entrega',
    ],
    href: '/produto-digital',
  },
  {
    tag: 'Contínuo',
    title: 'Tech Partner (CTO)',
    price: 'R$2.500/mês',
    period: 'contínuo',
    items: [
      '~20h/mês dedicadas',
      'Arquitetura de sistemas',
      'Code review e mentoria',
      'Roadmap de produto',
      'Decisões técnicas e stack selection',
    ],
    href: '/tech-partner',
  },
  {
    tag: 'Pontual',
    title: 'App Store Connect',
    price: 'R$0',
    period: 'taxa Apple à parte',
    items: [
      'Nome, descrição e keywords',
      'Upload de screenshots',
      'Privacidade do app',
      'ASO básico para busca orgânica',
    ],
    href: '/app-store-connect',
  },
]

const comparison = {
  headers: ['', 'pierrondi.dev', 'Freelancer', 'Agência Tradicional', 'Equipe Interna'],
  rows: [
    { label: 'Custo', values: ['R$1.5k–12k', 'R$1k–5k', 'R$15k–50k+', 'R$15k+/mês'] },
    { label: 'Prazo', values: ['2–8 semanas', '4–16 semanas', '8–24 semanas', 'Contínuo'] },
    { label: 'Risco', values: ['Baixo (escopo fixo)', 'Alto (sem processo)', 'Médio (overhead)', 'Médio (turnover)'] },
    { label: 'Flexibilidade', values: ['Alta', 'Alta', 'Baixa', 'Alta'] },
    { label: 'Suporte', values: ['30 dias inclusos', 'Nenhum', 'Contrato à parte', 'Interno'] },
    { label: 'Código seu', values: ['100% seu', 'Depende', 'Depende do contrato', '100% seu'] },
  ],
}

const faqs = [
  { q: 'Posso parcelar?', a: 'Sim. Projetos de MVP podem ser parcelados em até 3x. Automações e Tech Partner são pagos conforme contrato — entrada + entrega ou mensalidade.' },
  { q: 'E se o escopo mudar no meio do projeto?', a: 'Mudanças acontecem. Renegociamos prazo e custo antes de continuar. Nada é feito sem aprovação. Sem surpresa na fatura.' },
  { q: 'Por que não contratar um freelancer?', a: 'Freelancer não tem processo, não tem SLA, e frequentemente some no meio do projeto. Aqui tem escopo fechado, prazo real, documentação e suporte pós-entrega.' },
  { q: 'O código é meu?', a: '100%. Repositório GitHub, credenciais de infra, documentação técnica — tudo entregue no final. Sem lock-in, sem dependência.' },
  { q: 'Tem contrato?', a: 'Sim. Todo projeto começa com contrato de escopo fechado, prazo definido e preço fixo. Protege os dois lados.' },
]

export default function PrecosContent() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="Preços"
        headline="Transparência total."
        tagline='Sem surpresa. Sem hora extra. Sem "depende". Escopo fechado, prazo definido, preço fixo.'
      />

      {/* Plans */}
      <ProductTile
        variant="dark"
        eyebrow="Planos"
        headline="Escolha o que faz sentido agora."
      >
        <div className={styles.plansGrid}>
          {plans.map((plan, i) => (
            <article
              key={plan.title}
              className={`${styles.planCard} ${plan.featured ? styles.planCardFeatured : ''}`}
              data-animate
              style={{ '--delay': `${i * 0.1}s` } as CSSProperties}
            >
              <span className={`${styles.planTag} ${plan.featured ? styles.planTagFeatured : ''}`}>{plan.tag}</span>
              <h3 className={styles.planTitle}>{plan.title}</h3>
              <div className={styles.planPrice}>{plan.price}</div>
              <div className={styles.planPeriod}>{plan.period}</div>
              <ul className={styles.planItems}>
                {plan.items.map((item) => (
                  <li key={item} className={styles.planItem}>
                    <span className={styles.planCheck} aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.planCta}>
                <PillButton variant={plan.featured ? 'primary' : 'ghost'} href={plan.href}>
                  Saiba mais
                </PillButton>
              </div>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Comparison */}
      <ProductTile
        variant="dark"
        eyebrow="Comparativo"
        headline="Por que a pierrondi.dev?"
      >
        <div className={styles.tableWrap} data-animate>
          <table className={styles.table}>
            <thead>
              <tr>
                {comparison.headers.map((h, i) => (
                  <th key={h || 'empty'} className={`${styles.th} ${i === 1 ? styles.thHighlight : ''} ${i === 0 ? styles.thFirst : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.label}>
                  <td className={`${styles.td} ${styles.tdLabel}`}>{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={`${row.label}-${i}`} className={`${styles.td} ${i === 0 ? styles.tdHighlight : ''}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProductTile>

      {/* FAQ */}
      <ProductTile variant="dark" eyebrow="Dúvidas comuns" headline="Perguntas frequentes.">
        <FaqAccordion items={faqs} />
      </ProductTile>

      {/* CTA */}
      <ProductTile
        variant="dark"
        eyebrow="Pronto para começar"
        headline="Diagnóstico gratuito em 30 minutos."
        tagline="Conta o problema. A gente mostra como resolver — com prazo e preço antes de começar."
        ctas={
          <>
            <PillButton variant="primary" href="/#contact">Agendar diagnóstico</PillButton>
            <PillButton variant="ghost" href="/">Ver todos os serviços</PillButton>
          </>
        }
      />
    </>
  )
}
