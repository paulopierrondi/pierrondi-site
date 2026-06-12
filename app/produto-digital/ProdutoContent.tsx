'use client'

import type { CSSProperties } from 'react'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './ProdutoContent.module.css'

const deliverables = [
  { title: 'App web completo', desc: 'Frontend + backend + banco de dados. Stack moderna (Next.js, TypeScript, PostgreSQL) — pronta para crescer.' },
  { title: 'IA integrada', desc: 'Claude, OpenAI ou Gemini integrados ao produto onde faz sentido — não como feature de marketing, como utilidade real.' },
  { title: 'Deploy em produção', desc: 'Railway, Vercel ou infraestrutura definida em conjunto. Você recebe o produto no ar, não um zip de código.' },
  { title: 'Código seu', desc: 'Acesso completo ao repositório, documentação técnica e transferência de domínios e acessos. Zero lock-in.' },
  { title: 'Autenticação e segurança', desc: 'Login seguro, controle de sessão, proteção de rotas e boas práticas OWASP desde o primeiro commit.' },
  { title: 'Suporte pós-deploy', desc: '30 dias de suporte técnico após entrega para bugs e ajustes que aparecem em produção real.' },
]

const stack = [
  { name: 'Next.js 16', label: 'Frontend' },
  { name: 'TypeScript', label: 'Linguagem' },
  { name: 'PostgreSQL', label: 'Banco de dados' },
  { name: 'Supabase', label: 'Auth & DB' },
  { name: 'Railway', label: 'Deploy' },
  { name: 'Claude API', label: 'IA' },
  { name: 'Tailwind CSS', label: 'Estilo' },
  { name: 'Prisma', label: 'ORM' },
]

const steps = [
  { number: '01', title: 'Briefing & escopo', desc: 'Uma conversa de 30 min: o que você quer construir, quem vai usar, o que define sucesso. Saímos com escopo fechado e prazo definido.' },
  { number: '02', title: 'Proposta fixa', desc: 'Entregamos proposta com valor fixo, prazo e milestones claros. Sem "a mais depende". O que assina é o que entrega.' },
  { number: '03', title: 'Desenvolvimento', desc: 'Ciclos de 1 semana com entregas parciais visíveis. Você acompanha o progresso sem precisar cobrar update.' },
  { number: '04', title: 'Deploy & entrega', desc: 'Produto no ar, código no seu repositório, documentação entregue. Fim do projeto ou início do Tech Partner.' },
]

const faqs = [
  { q: 'Qual o prazo mínimo para um MVP?', a: 'MVPs focados saem em 3–6 semanas. Projetos com mais integrações ou complexidade de negócio levam de 6–10 semanas. Definimos o prazo real no escopo.' },
  { q: 'O produto escala com crescimento?', a: 'Sim. Usamos stack moderna com separação clara de camadas. O produto nasce pronto para crescer sem reescrever do zero.' },
  { q: 'Posso pedir mudanças durante o desenvolvimento?', a: 'Pequenas mudanças de escopo são absorvidas. Mudanças grandes que afetam prazo são tratadas como aditivo — sempre com transparência antes de executar.' },
  { q: 'Vocês integram com sistemas que já temos?', a: 'Sim. Integramos com APIs REST, webhooks, bancos existentes, CRMs e sistemas legados. Se tem API, dá para conectar.' },
  { q: 'E depois do MVP, como continuo?', a: 'Você pode assumir o desenvolvimento interno, contratar o Tech Partner para evolução contínua, ou fechar novos ciclos de desenvolvimento com a gente.' },
]

export default function ProdutoContent() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="MVP & Produto Digital"
        headline="Do zero ao produto funcional."
        tagline="App web, micro SaaS ou ferramenta interna — com stack moderna, deploy em produção e código que você pode continuar. A partir de R$5.000."
        ctas={
          <>
            <PillButton variant="primary" href="/#contact">Diagnóstico gratuito</PillButton>
            <PillButton variant="ghost" href="/automacoes">Ver automações</PillButton>
          </>
        }
      />

      {/* Entregas */}
      <ProductTile
        variant="dark"
        eyebrow="O que entregamos"
        headline="Produto completo, não protótipo."
      >
        <div className={styles.deliverableGrid}>
          {deliverables.map((d, i) => (
            <article
              key={d.title}
              className={styles.deliverableCard}
              data-animate
              style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
            >
              <h3 className={styles.deliverableTitle}>{d.title}</h3>
              <p className={styles.deliverableDesc}>{d.desc}</p>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Stack */}
      <ProductTile
        variant="dark"
        eyebrow="Stack padrão"
        headline="Moderno, escalável, seu."
      >
        <div className={styles.stackGrid} data-animate>
          {stack.map((s) => (
            <div key={s.name} className={styles.stackCell}>
              <span className={styles.stackName}>{s.name}</span>
              <span className={styles.stackLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </ProductTile>

      {/* Processo */}
      <ProductTile
        variant="dark"
        eyebrow="Como funciona"
        headline="Processo claro, entrega em semanas."
      >
        <ol className={styles.stepList}>
          {steps.map((s, i) => (
            <li
              key={s.number}
              className={styles.stepRow}
              data-animate
              style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
            >
              <span className={styles.stepNum}>{s.number}</span>
              <div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </ProductTile>

      {/* FAQ */}
      <ProductTile variant="dark" eyebrow="Dúvidas comuns" headline="Sem surpresa.">
        <FaqAccordion items={faqs} />
      </ProductTile>

      {/* CTA */}
      <ProductTile
        variant="dark"
        eyebrow="Pronto para começar"
        headline="Sua ideia merece ser real."
        tagline="Diagnóstico gratuito de 30 min. Saímos com escopo, prazo e valor — sem compromisso."
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
