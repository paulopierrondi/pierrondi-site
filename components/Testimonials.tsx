'use client'

import styles from './Testimonials.module.css'

type Testimonial = {
  quote: string
  role: string
  context: string
  initial: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Automatizamos a triagem de chamados em duas semanas. O que o time levava 4h/dia virou 20 minutos.',
    role: 'Head de Operações',
    context: 'SaaS B2B, São Paulo',
    initial: 'C',
  },
  {
    quote: 'Queria um MVP pra validar a ideia sem contratar time. Em três semanas tinha landing, backend e primeiros usuários pagando.',
    role: 'Founder',
    context: 'Startup early-stage',
    initial: 'F',
  },
  {
    quote: 'Virou meu CTO sem ter CTO. Revisa código, decide arquitetura, segura a barra técnica enquanto foco no comercial.',
    role: 'CEO',
    context: 'Agência de marketing digital',
    initial: 'A',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section} id="depoimentos">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Quem já construiu com a gente</p>
        <h2 className={styles.headline}>Resultado real, em semanas.</h2>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <article key={i} className={styles.card}>
              <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className={styles.attribution}>
                <div className={styles.avatar} aria-hidden="true">{t.initial}</div>
                <div>
                  <p className={styles.name}>{t.role}</p>
                  <p className={styles.role}>{t.context}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
        <p className={styles.caveat}>
          Nomes mantidos confidenciais a pedido dos clientes. Cliente novo? Você entra direto na lista de casos — com transparência de antes/depois e métrica real.
        </p>
      </div>
    </section>
  )
}
