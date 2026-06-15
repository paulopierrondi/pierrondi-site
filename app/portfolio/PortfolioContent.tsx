'use client'

import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import { trackEvent } from '@/lib/analytics'
import styles from './PortfolioContent.module.css'

const portfolioEntries = [
  {
    title: 'Marketing OS — produto interno em construção pública',
    href: '/marketing-os',
    image: '/assets/ai.png',
    service: 'Produto interno · Prova técnica',
    result: 'Plataforma agentic operando o próprio marketing da pierrondi.dev.',
    description:
      'Studio interno, agentes versionados, governança humana e automações sandbox-first. A própria operação de marketing virou produto demonstrável, com Linear público e código rodando em produção.',
    proof: ['Agentes', 'Sandbox-first', 'Governança'],
  },
  {
    title: 'Calculadora de ROI para automação',
    href: '/calculadora',
    image: '/assets/server-room.png',
    service: 'Automação Express',
    result: 'Transforma curiosidade em conversa com número na mesa.',
    description:
      'Ferramenta interativa que estima economia mensal, payback e retorno. Ajuda o lead a enxergar o custo do processo manual antes mesmo da primeira reunião.',
    proof: ['ROI', 'Payback', 'Pré-qualificação'],
  },
  {
    title: 'Base comercial da pierrondi.dev',
    href: '/atuacao',
    image: '/assets/development.png',
    service: 'Landing e conversão',
    result: 'Oferta, prova, preço e contato no mesmo caminho.',
    description:
      'Home, preços, FAQ, contato, privacidade, termos, schema e analytics. Uma presença online pensada para gerar confiança e reduzir atrito na decisão.',
    proof: ['SEO', 'LGPD', 'Conversão'],
  },
  {
    title: 'Blog técnico com intenção comercial',
    href: '/blog',
    image: '/assets/content.png',
    service: 'Conteúdo e autoridade',
    result: 'Atrai quem já está pesquisando automação, MVP e CTO fracionado.',
    description:
      'Conteúdo técnico escrito para explicar decisões reais, educar o lead e apontar para a próxima conversa. Sem post decorativo, sem buzzword vazia.',
    proof: ['Autoridade', 'Busca', 'Educação'],
  },
  {
    title: 'Automação de processos com IA',
    href: '/calculadora',
    image: '/assets/ai.png',
    service: 'Automação Express',
    result: 'Menos trabalho manual em vendas, operação e atendimento.',
    description:
      'Fluxos com n8n, Make, APIs e IA aplicada para triagem, classificação, resumos, notificações e integração entre ferramentas que já existem na empresa.',
    proof: ['n8n', 'APIs', 'IA aplicada'],
  },
  {
    title: 'Produto digital e MVP',
    href: '/produto-digital',
    image: '/assets/design.png',
    service: 'Produto Digital',
    result: 'Do briefing ao primeiro usuário com escopo enxuto.',
    description:
      'Apps web, ferramentas internas e micro SaaS com interface, regra de negócio, deploy e base para evoluir sem depender de uma agência grande.',
    proof: ['Next.js', 'Deploy', 'MVP'],
  },
]

export default function PortfolioContent() {
  return (
    <>
      <PageHeader
        eyebrow="PORTFÓLIO"
        title={<>Cada entrega abre uma <span className="text-primary">conversa.</span></>}
        lead="Páginas, ferramentas, automações e produtos digitais criados para vender melhor, qualificar leads e reduzir trabalho manual com tecnologia enxuta."
      />

      <main className={styles.main}>
        <section aria-labelledby="vitrine-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Vitrine de entregas</span>
              <h2 id="vitrine-title">Do primeiro contato ao pipeline.</h2>
              <p className={styles.lead}>O portfólio foi organizado como uma entrada comercial: primeiro a dor, depois a prova, depois o próximo passo.</p>
            </div>
          </Reveal>

          <RevealStagger className={styles.grid} staggerDelay={0.06}>
            {portfolioEntries.map((entry, index) => (
              <RevealStaggerItem key={entry.title}>
                <Link
                  href={entry.href}
                  className={styles.card}
                  onClick={() =>
                    trackEvent('PortfolioCTA_Clicked', {
                      asset: entry.title,
                      service: entry.service,
                    })
                  }
                >
                  <div className={styles.cardMedia}>
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : undefined}
                      sizes="(max-width: 960px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <p className={styles.cardService}>{entry.service}</p>
                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                    <p className={styles.cardResult}>{entry.result}</p>
                    <p className={styles.cardDesc}>{entry.description}</p>
                    <div className={styles.proofList}>
                      {entry.proof.map((item) => (
                        <span key={item} className={styles.proofChip}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.ctaSection}>
          <Reveal>
            <h2>Quer uma vitrine assim para o seu negócio?</h2>
            <p>Me mande o contexto do que você vende, onde o lead trava e qual processo ainda depende de trabalho manual. Devolvo um caminho claro: página, automação, MVP ou direção técnica.</p>
            <Link
              href="/contato"
              className={styles.btnPrimary}
              onClick={() =>
                trackEvent('PortfolioCTA_Clicked', {
                  asset: 'portfolio-page-final-cta',
                  service: 'diagnostico',
                })
              }
            >
              Quero meu diagnóstico
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  )
}
