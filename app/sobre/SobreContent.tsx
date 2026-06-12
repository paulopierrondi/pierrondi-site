'use client'

import type { CSSProperties } from 'react'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './SobreContent.module.css'

const stats = [
  { value: '48h', label: 'Da ideia ao primeiro deploy' },
  { value: '100%', label: 'Projetos entregues no prazo' },
  { value: '3×', label: 'Mais rápido que agências' },
  { value: 'Solo', label: 'Founder técnico, sem overhead' },
]

const values = [
  { title: 'Entrega antes de promessa', desc: 'Todo projeto começa com escopo fechado. Prazo real, preço fixo. Sem "depende" no meio do caminho.' },
  { title: 'IA como alavanca, não vitrine', desc: 'Claude, n8n, Gemini e Make integrados ao processo de entrega — não para impressionar em demo, mas para entregar mais rápido.' },
  { title: 'Responsabilidade técnica pessoal', desc: 'Founder solo opera como tech lead do projeto. Você fala direto com quem codifica. Sem camada de gerenciamento.' },
  { title: 'Código que você continua', desc: 'Stack moderna, documentação mínima e suficiente, acesso completo. Nada de caixa preta ou lock-in.' },
]

const services = [
  { title: 'Automação Express', price: 'A partir de R$1.500', desc: 'Processo manual → fluxo automatizado. Entregue em até 2 semanas.', href: '/automacoes' },
  { title: 'Produto Digital (MVP)', price: 'A partir de R$5.000', desc: 'App web, micro SaaS ou ferramenta interna — do zero ao deploy em produção.', href: '/produto-digital' },
  { title: 'Tech Partner', price: 'R$2.500/mês', desc: 'CTO as a Service. Presença técnica contínua sem vínculo CLT.', href: '/tech-partner' },
  { title: 'App Store Connect', price: 'Configuração gratuita', desc: 'Metadata, screenshots, privacidade e ASO básico para app iOS já pronto.', href: '/app-store-connect' },
]

export default function SobreContent() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="Sobre nós"
        headline="Quem somos."
        tagline="A pierrondi.dev nasceu da frustração com agências lentas, orçamentos inflados e entregas que nunca chegam. Operada por um founder solo com histórico enterprise em ServiceNow, Oracle e Novartis."
      >
        <div className={styles.statsBar} data-animate>
          {stats.map((s) => (
            <div key={s.value} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </ProductTile>

      {/* História */}
      <ProductTile
        variant="dark"
        eyebrow="Origem"
        headline="Tech que entrega, não que promete."
      >
        <div className={styles.storyGrid} data-animate>
          <p className={styles.storyBody}>
            A <strong>pierrondi.dev</strong> é uma agência de tecnologia operada por um founder solo com perfil técnico forte. Arquiteto de soluções com histórico em enterprise — ServiceNow, Oracle, Novartis — decidiu parar de construir para corporações e começar a construir para quem mais precisa: PMEs, startups e infoprodutores que querem tech de verdade sem burocracia de agência grande.
          </p>
          <p className={styles.storyBody}>
            A operação usa <strong>IA como alavanca real</strong>: Claude, n8n, Make e Gemini integrados ao processo de desenvolvimento — não como marketing, mas como infraestrutura de entrega. Isso permite velocidade que times maiores não conseguem.
          </p>
          <p className={styles.storyBody}>
            Cada projeto tem escopo fechado, prazo real e preço fixo. Sem gerente de conta, sem slide de proposta de 40 páginas. Só <strong>diagnóstico rápido, execução direta e responsabilidade técnica pessoal</strong>.
          </p>
        </div>
      </ProductTile>

      {/* Valores */}
      <ProductTile
        variant="dark"
        eyebrow="Como trabalhamos"
        headline="Quatro princípios inegociáveis."
      >
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <article
              key={v.title}
              className={styles.valueCard}
              data-animate
              style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
            >
              <span className={styles.valueNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Serviços */}
      <ProductTile
        variant="dark"
        eyebrow="O que fazemos"
        headline="Quatro formas de trabalhar juntos."
      >
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <a
              key={s.title}
              href={s.href}
              className={styles.serviceCard}
              data-animate
              style={{ '--delay': `${i * 0.1}s` } as CSSProperties}
            >
              <span className={styles.serviceNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.servicePrice}>{s.price}</p>
              <p className={styles.serviceDesc}>{s.desc}</p>
              <span className={styles.serviceArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </ProductTile>

      {/* CTA */}
      <ProductTile
        variant="dark"
        eyebrow="Pronto para começar"
        headline="Vamos construir juntos?"
        tagline="Conta sua ideia. Em 24h a gente te diz se é viável e como chegar lá."
        ctas={
          <>
            <PillButton variant="primary" href="/#contact">Diagnóstico gratuito</PillButton>
            <PillButton variant="ghost" href="/precos">Ver preços</PillButton>
          </>
        }
      />
    </>
  )
}
