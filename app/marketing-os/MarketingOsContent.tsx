'use client'

import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
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
      '60 dias de acompanhamento operacional',
      'Reuniões semanais de 30 min',
      'Ajuste de prompts e agentes com base em resultados',
      'Relatório de adoção, qualidade e ROI',
    ],
  },
]

export default function MarketingOsContent() {
  return (
    <>
      <PageHeader
        eyebrow="MARKETING OS"
        title={<>Marketing operado por agentes, sob <span className="text-primary">controle humano.</span></>}
        lead="Plataforma agentic que opera o marketing da sua empresa com agentes de IA, governança humana e automações controladas. Estamos construindo em público — você vê a operação real."
        chips={['Agentes', 'Sandbox', 'Approval Gates', 'n8n']}
      />

      <main className={styles.main}>
        <section className={styles.layers} aria-labelledby="layers-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Arquitetura</span>
              <h2 id="layers-title">Quatro camadas, nenhuma atalho.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.layerGrid} staggerDelay={0.06}>
            {layers.map((layer) => (
              <RevealStaggerItem key={layer.tag}>
                <article className={styles.card}>
                  <span className={styles.tag}>{layer.tag}</span>
                  <h3 className={styles.cardTitle}>{layer.title}</h3>
                  <p className={styles.cardDesc}>{layer.desc}</p>
                  <ul className={styles.cardList}>
                    {layer.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.principles} aria-labelledby="principles-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Princípios</span>
              <h2 id="principles-title">Regras que não negociamos.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.principleGrid} staggerDelay={0.05}>
            {principles.map((p) => (
              <RevealStaggerItem key={p.title}>
                <article className={styles.principleCard}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.personas} aria-labelledby="personas-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Para quem é</span>
              <h2 id="personas-title">Quem resolve com isso.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.personaGrid} staggerDelay={0.05}>
            {personas.map((p) => (
              <RevealStaggerItem key={p.title}>
                <article className={styles.personaCard}>
                  <h3>{p.title}</h3>
                  <p className={styles.pain}><strong>Dor:</strong> {p.pain}</p>
                  <p className={styles.fit}><strong>Fit:</strong> {p.fit}</p>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.packages} aria-labelledby="packages-title">
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Investimento</span>
              <h2 id="packages-title">Pacotes.</h2>
            </div>
          </Reveal>
          <RevealStagger className={styles.packageGrid} staggerDelay={0.06}>
            {packages.map((pkg) => (
              <RevealStaggerItem key={pkg.tag}>
                <article className={`${styles.packageCard} ${pkg.featured ? styles.packageFeatured : ''}`}>
                  <span className={`${styles.packageTag} ${pkg.featured ? styles.packageTagFeatured : ''}`}>{pkg.tag}</span>
                  <p className={styles.packagePrice}>{pkg.price}</p>
                  <p className={styles.packageDesc}>{pkg.desc}</p>
                  <ul className={styles.packageList}>
                    {pkg.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </section>

        <section className={styles.ctaSection}>
          <Reveal>
            <h2>Quer ver a operação real?</h2>
            <p>A pierrondi.dev opera o próprio marketing nesta plataforma. Números, posts e decisões reais.</p>
            <div className={styles.ctaActions}>
              <Link href="/marketing-os/numeros" className={styles.btnPrimary}>Ver os números</Link>
              <Link href="/contato" className={styles.btnGhost}>Conversar sobre implementação</Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}
