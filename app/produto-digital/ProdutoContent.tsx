'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
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
  return (
    <>
      <PageHeader
        eyebrow="MVP & PRODUTO DIGITAL"
        title={<>Do zero ao produto <span className="text-primary">funcional.</span></>}
        lead="App web, micro SaaS ou ferramenta interna — com stack moderna, deploy em produção e código que você pode continuar. A partir de R$5.000."
      />

      <main className={styles.main}>
        <section className={styles.deliverables} aria-labelledby="deliverables-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>O que entregamos</span>
              <h2 id="deliverables-title">Produto completo, não protótipo.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.deliverableGrid} staggerDelay={0.06}>
            {deliverables.map((d, i) => (
              <RevealStaggerItem key={d.title}>
                <article className={styles.deliverableCard} style={{ '--delay': `${i * 0.08}s` } as CSSProperties}>
                  <h3 className={styles.deliverableTitle}>{d.title}</h3>
                  <p className={styles.deliverableDesc}>{d.desc}</p>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.stack} aria-labelledby="stack-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Stack padrão</span>
              <h2 id="stack-title">Moderno, escalável, seu.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.stackGrid} staggerDelay={0.04}>
            {stack.map((s) => (
              <RevealStaggerItem key={s.name}>
                <div className={styles.stackCell}>
                  <span className={styles.stackName}>{s.name}</span>
                  <span className={styles.stackLabel}>{s.label}</span>
                </div>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.steps} aria-labelledby="steps-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Como funciona</span>
              <h2 id="steps-title">Processo claro, entrega em semanas.</h2>
            </div>
          </Reveal>
          <RevealStagger staggerDelay={0.05}>
            <ol className={styles.stepList}>
              {steps.map((s, i) => (
                <RevealStaggerItem key={s.number}>
                  <li className={styles.stepRow} style={{ '--delay': `${i * 0.08}s` } as CSSProperties}>
                    <span className={styles.stepNum}>{s.number}</span>
                    <div>
                      <h3 className={styles.stepTitle}>{s.title}</h3>
                      <p className={styles.stepDesc}>{s.desc}</p>
                    </div>
                  </li>
                </RevealStaggerItem>
              ))}
            </ol>
          </RevealStagger>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Dúvidas comuns</span>
              <h2 id="faq-title">Sem surpresa.</h2>
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
            <h2>Sua ideia merece ser real.</h2>
            <p>Diagnóstico gratuito de 30 min. Saímos com escopo, prazo e valor — sem compromisso.</p>
            <div className={styles.ctaActions}>
              <Link href="/contato" className={styles.btnPrimary}>Agendar diagnóstico</Link>
              <Link href="/atuacao" className={styles.btnGhost}>Ver todos os serviços</Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}
