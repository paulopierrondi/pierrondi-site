'use client'

import Link from 'next/link'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import styles from './MarketingOsContent.module.css'

const layers = [
  {
    tag: '01 / Studio',
    title: 'Marketing Studio',
    desc: 'Painel interno onde tudo acontece: campanhas, conteúdo, calendário, inbox de aprovações e analytics. Denso, técnico, utilitário — não é mais um "dashboard bonito" sem função.',
    items: ['Campanhas com objetivo, canal e métricas reais', 'Content factory com status (draft, review, aprovado, publicado)', 'Inbox de aprovações com risk badge', 'Calendar editorial visual'],
  },
  {
    tag: '02 / Agents',
    title: 'Camada de Agentes',
    desc: 'Agentes especialistas com prompts versionados. Cada um faz uma coisa bem feita e reporta para o Orchestrator. Sandbox por padrão — geram drafts, nunca publicam.',
    items: ['Marketing Orchestrator (decide o que rodar)', 'SEO Blog · LinkedIn · Image · Video · Ads · CRO', 'Analytics Insights · Human Approval', 'Prompts versionados por agente'],
  },
  {
    tag: '03 / Governance',
    title: 'Governança Humana',
    desc: 'O que importa não é "IA fazendo marketing". É IA fazendo marketing com o humano no controle. Toda ação de risco passa por approval gate. Existe kill switch e cap diário.',
    items: ['Approval gates por nível de risco (low → critical)', 'Logs persistentes auditáveis', 'Feature flags + kill switch global', 'Cap diário de runs e custo de tokens'],
  },
  {
    tag: '04 / Automation',
    title: 'Automações Externas',
    desc: 'Conexão com n8n, Make, MCP, LinkedIn, Email e Analytics — só depois que governança e logs existem. Integração externa nunca vem antes do controle.',
    items: ['Webhooks n8n/Make em modo sandbox', 'Geração diária de drafts via cron', 'Plano semanal e resumo automático', 'Plausible analytics read-only integrado'],
  },
]

const principles = [
  { title: 'Sandbox first', desc: 'Agentes geram output local antes de qualquer ação externa. Você revê o draft. Aprova ou rejeita. Só então sai.' },
  { title: 'Approval gates explícitos', desc: 'Publicação, envio de email, ativação de campanha, conexão de ferramenta externa — tudo bloqueado até aprovação humana com motivo registrado.' },
  { title: 'Logs antes de automação', desc: 'Toda execução de agente, cada aprovação, cada chamada externa fica em log auditável. Antes de automatizar, você tem rastro.' },
  { title: 'Construção em público', desc: 'A própria pierrondi.dev opera o marketing nesta plataforma. Você vê funcionar antes de comprar.' },
]

const personas = [
  {
    title: 'Founder solo técnico',
    pain: 'Você sabe que precisa de marketing consistente. Não tem tempo de virar copywriter, designer e analista.',
    fit: 'Marketing OS opera no fundo. Você revisa drafts em 10 minutos por dia. Saída: posts, emails, análises rodando.',
  },
  {
    title: 'Gestor de marketing PME',
    pain: 'Time pequeno, ferramentas fragmentadas, planilha de calendário que ninguém olha. Sem tempo de pensar estratégia.',
    fit: 'Studio centraliza tudo. Agentes geram drafts. Time foca no que importa: validação, edição final, conversa com cliente.',
  },
  {
    title: 'Infoprodutor / creator',
    pain: 'Conteúdo é trabalho diário. Sem ele, sem venda. Com ele, sem tempo para vender.',
    fit: 'Calendário editorial automatizado. Agentes propõem ângulos. Você grava o que importa, eles processam o resto.',
  },
]

const packages = [
  {
    tag: 'Setup',
    price: 'R$8.000',
    desc: 'Tudo no ar em 14 dias úteis. Você opera sozinho.',
    featured: false,
    items: [
      'Studio em produção (Postgres, Auth, observability)',
      '5 agentes versionados com prompts treinados pra sua marca',
      'Approval workflow + audit log + kill switch',
      'Cron diário e semanal configurado',
      'Treinamento de 2h no studio',
      '30 dias de suporte por escrito',
    ],
  },
  {
    tag: 'Setup + 60 dias',
    price: 'R$15.000',
    desc: 'Setup + acompanhamento da primeira operação real.',
    featured: true,
    items: [
      'Tudo do Setup',
      '60 dias de operação assistida pelo Paulo',
      'Tuning semanal de prompts baseado em métricas',
      '2 campanhas implementadas no studio',
      'Calls quinzenais de revisão',
      'Handover documentado',
    ],
  },
  {
    tag: 'Tech Partner',
    price: 'R$3.500/mês',
    desc: 'Marketing OS + tech partner contínuo.',
    featured: false,
    items: [
      'Setup incluso',
      'Operação contínua do studio com você',
      'Evolução de agentes conforme necessidades',
      '~20h/mês de execução técnica',
      'Mínimo 3 meses',
    ],
  },
]

const faqs = [
  {
    q: 'Posso ver isso rodando antes de comprar?',
    a: (
      <>
        Sim. <Link href="/marketing-os/numeros">/marketing-os/numeros</Link> mostra métricas reais vindas do
        Postgres da operação. Posso também mostrar o studio real da pierrondi.dev em call.
      </>
    ),
  },
  {
    q: 'Vocês publicam sozinhos nas redes?',
    a: (
      <>
        Não. Tudo que vai pra fora passa por approval humano. <code>AUTO_PUBLISH</code> existe como flag, mas vem
        desligada e exige <code>kill_switch</code> off + 2-step manual pra ativar. Padrão é: agente gera draft,
        você aprova, integração externa publica.
      </>
    ),
  },
  {
    q: 'Quanto custa de tokens IA por mês?',
    a: (
      <>
        Operação típica (4 posts blog + 12 posts LinkedIn + 4 análises semanais) custa R$15-40/mês. Modelos:
        Opus 4.7 só pro Orchestrator (decisões), Sonnet 4.6 pra escrita, Haiku 4.5 pra análise. Cap diário
        configurável bloqueia surpresa. Cost ledger fica auditável em <code>/studio/settings</code>.
      </>
    ),
  },
  {
    q: 'E se eu quiser parar?',
    a: (
      <>
        Schema Postgres é seu, prompts são seus, código é open-source no seu repositório. Migration scripts
        versionados. Kill switch (<code>MARKETING_OS_HALT=true</code>) pausa tudo em &lt;1s. Sem lock-in
        proprietário — é Next.js, Drizzle, Anthropic SDK.
      </>
    ),
  },
  {
    q: 'E sobre segurança? LGPD?',
    a: (
      <>
        Auth.js com Google OAuth ou magic link. Audit log immutable de toda ação sensível com IP e user agent.
        Webhooks com HMAC signature. Sentry para incidentes. Sem dados de leads no contexto dos agentes — você
        controla o que entra. LGPD: rota /privacidade documentada.
      </>
    ),
  },
  {
    q: 'Preciso ter time técnico?',
    a: (
      <>
        Não. O setup é nosso. Você opera o studio (cliques, aprovações, edição). A camada técnica (Postgres,
        prompts, integrações) fica com a pierrondi.dev ou com você se quiser tomar conta depois — o repositório
        é seu.
      </>
    ),
  },
]

export default function MarketingOsContent() {
  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="Marketing OS"
        headline="Marketing operado por agentes, com humano no controle."
        tagline="Plataforma agentic que opera o marketing da sua empresa: agentes de IA geram drafts, você aprova, automações publicam. Sandbox por padrão, approval gates explícitos, logs auditáveis. A própria pierrondi.dev opera o próprio marketing aqui — você vê funcionar antes de comprar."
        ctas={
          <>
            <PillButton
              variant="primary"
              href="/#contato"
              className="plausible-event-name=marketing-os-cta-primary"
            >
              Quero implementar
            </PillButton>
            <PillButton
              variant="ghost"
              href="/portfolio"
              className="plausible-event-name=marketing-os-cta-secondary"
            >
              Ver portfólio
            </PillButton>
          </>
        }
      >
        <div className={styles.statusPill} aria-label="Status: produto em produção assistida">
          <span className={styles.statusDot} aria-hidden="true" />
          Produto final em produção assistida
        </div>
      </ProductTile>

      {/* Layers */}
      <ProductTile
        variant="dark"
        eyebrow="Arquitetura"
        headline="Quatro camadas, cada uma com escopo claro."
        tagline="Studio + Agentes + Governança + Automação. Não é uma ferramenta de IA genérica. É uma operação completa onde cada camada existe antes da próxima — e a próxima só liga depois que a anterior provou estar segura."
      >
        <div className={styles.layersGrid}>
          {layers.map((layer, i) => (
            <article
              key={layer.title}
              className={`${styles.layerCard} reveal-anim-fast`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className={styles.layerTag}>{layer.tag}</span>
              <h3 className={styles.layerTitle}>{layer.title}</h3>
              <p className={styles.layerDesc}>{layer.desc}</p>
              <ul className={styles.layerItems} aria-label={`Recursos de ${layer.title}`}>
                {layer.items.map((item) => (
                  <li key={item} className={styles.layerItem}>
                    <span className={styles.layerItemArrow} aria-hidden="true">&#8594;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Principles */}
      <ProductTile
        variant="dark"
        eyebrow="Princípios"
        headline="Quatro regras que não negociamos."
        tagline="IA sem controle vira passivo. Estes princípios estão no código, não em slide."
      >
        <div className={styles.principlesGrid}>
          {principles.map((p, i) => (
            <article
              key={p.title}
              className={`${styles.principleCard} reveal-anim-fast`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleDesc}>{p.desc}</p>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Personas */}
      <ProductTile
        variant="dark"
        eyebrow="Para quem"
        headline="Três encaixes claros."
        tagline="Não é para todo mundo. Funciona melhor quando o problema é marketing consistente sem time grande."
      >
        <div className={styles.personasGrid}>
          {personas.map((persona, i) => (
            <article
              key={persona.title}
              className={`${styles.personaCard} reveal-anim-fast`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <h3 className={styles.personaTitle}>{persona.title}</h3>
              <div className={styles.personaBlock}>
                <span className={styles.personaLabel}>Dor</span>
                <p className={styles.personaText}>{persona.pain}</p>
              </div>
              <div className={styles.personaBlock}>
                <span className={`${styles.personaLabel} ${styles.personaLabelFit}`}>Encaixe</span>
                <p className={styles.personaText}>{persona.fit}</p>
              </div>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Pricing */}
      <ProductTile
        variant="dark"
        eyebrow="Pacotes"
        headline="Três caminhos pra implementar."
        tagline="Setup é trabalho técnico real (Postgres, Auth, agentes, prompts versionados). Os pacotes diferem em quanto da operação a pierrondi.dev roda junto depois que está no ar."
      >
        <div className={styles.pricingGrid}>
          {packages.map((pkg, i) => (
            <article
              key={pkg.tag}
              className={`${styles.pricingCard} ${pkg.featured ? styles.pricingCardFeatured : ''} reveal-anim-fast`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className={`${styles.pricingTag} ${pkg.featured ? styles.pricingTagFeatured : ''}`}>
                {pkg.tag}
              </span>
              <div className={styles.pricingPrice}>{pkg.price}</div>
              <p className={styles.pricingDesc}>{pkg.desc}</p>
              <ul className={styles.pricingItems} aria-label={`Incluso no pacote ${pkg.tag}`}>
                {pkg.items.map((item) => (
                  <li key={item} className={styles.pricingItem}>
                    <span className={styles.pricingCheck} aria-hidden="true">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className={styles.pricingNote}>
          Tokens de IA não inclusos — em uso normal, R$15–40/mês. Cap diário configurável bloqueia runaway.
        </p>
      </ProductTile>

      {/* FAQ */}
      <ProductTile
        variant="dark"
        eyebrow="FAQ"
        headline="Objeções honestas."
      >
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.q} className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                {faq.q}
                <span className={styles.faqToggle} aria-hidden="true">+</span>
              </summary>
              <div className={styles.faqAnswer}>{faq.a}</div>
            </details>
          ))}
        </div>
      </ProductTile>

      {/* Final CTA */}
      <ProductTile
        variant="dark"
        eyebrow="Diagnóstico gratuito"
        headline="30 minutos. Escopo fechado. Saída real."
        tagline="Mostramos o studio rodando. Discutimos onde a sua operação encaixa. Saída: proposta com escopo fechado e prazo real — ou recomendação de não implementar agora, se for o caso."
        ctas={
          <>
            <PillButton
              variant="primary"
              href="/#contato"
              className="plausible-event-name=marketing-os-cta-bottom"
            >
              Agendar diagnóstico
            </PillButton>
            <PillButton
              variant="ghost"
              href="/marketing-os/numeros"
              className="plausible-event-name=marketing-os-cta-numbers"
            >
              Ver números reais
            </PillButton>
          </>
        }
      />
    </>
  )
}
