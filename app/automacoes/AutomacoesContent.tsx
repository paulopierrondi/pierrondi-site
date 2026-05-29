'use client'

import type { CSSProperties } from 'react'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './AutomacoesContent.module.css'

const benefits = [
  { title: 'Tempo recuperado', desc: 'Tarefas que hoje tomam horas por semana viram segundos. Relatórios, follow-ups, cadastros e sincronizações rodam no background.' },
  { title: 'Menos retrabalho', desc: 'Dados fluem certos entre sistemas. Menos planilha duplicada, menos "alguém esqueceu de avisar o outro time".' },
  { title: 'Processo auditável', desc: 'Cada passo do fluxo fica registrado. Você sabe o que aconteceu, quando e por qual gatilho — útil para compliance e melhoria contínua.' },
  { title: 'Integra o que você já tem', desc: 'Não precisa trocar de ERP ou CRM. Integramos o stack atual com APIs, webhooks e conectores oficiais.' },
  { title: 'IA onde faz sentido', desc: 'Classificação de leads, resumos, extração de dados de e-mails ou documentos — sempre com revisão humana quando necessário.' },
  { title: 'Cresce com o negócio', desc: 'Novos passos e integrações entram sem reescrever tudo. O workflow evolui junto com sua operação.' },
]

const steps = [
  { number: '01', title: 'Diagnóstico do fluxo', desc: 'Onde há cópia manual entre sistemas? Onde o time espera alguém "passar o bastão"? Priorizamos o que mais custa tempo ou dinheiro.' },
  { number: '02', title: 'Desenho do workflow', desc: 'Definimos gatilhos, etapas, validações e exceções — inclusive o que fazer quando algo falha.' },
  { number: '03', title: 'Implementação', desc: 'Montamos o fluxo, credenciais seguras, testes e documentação. Você acompanha em homologação antes de ir para produção.' },
  { number: '04', title: 'Monitoramento e evolução', desc: 'Ajustamos alertas, métricas e novos ramos conforme o negócio muda. Automação viva, não projeto engavetado.' },
]

const tools = [
  'n8n', 'Make', 'Zapier', 'HubSpot', 'Pipedrive', 'RD Station',
  'Google Sheets', 'Gmail', 'Outlook', 'Slack', 'Teams', 'Discord',
  'WhatsApp API', 'Stripe', 'Notion', 'Jira', 'OpenAI', 'Claude',
  'MySQL', 'Google Drive', 'S3', 'Meta Ads', 'Zendesk', 'Intercom',
]

const cases = [
  { title: 'Lead → CRM → notificação', desc: 'Lead preenche formulário ou manda mensagem; dados entram no CRM, equipe é avisada no Slack ou WhatsApp e follow-up é agendado automaticamente.', tags: ['CRM', 'WhatsApp', 'Slack'] },
  { title: 'Pedido → estoque → financeiro', desc: 'Venda confirmada atualiza planilha ou ERP, gera recibo por e-mail e abre tarefa para logística — sem ninguém precisar digitar nada.', tags: ['ERP', 'Google Sheets', 'Email'] },
  { title: 'Conteúdo e relatórios', desc: 'Dados de várias fontes viram relatório semanal automático ou resumo executivo com IA para diretoria. Zero cópia manual.', tags: ['IA', 'Google Sheets', 'Email'] },
  { title: 'Onboarding de cliente', desc: 'Contrato assinado dispara criação de acesso, envio de boas-vindas, tarefas internas e lembretes nos prazos certos.', tags: ['CRM', 'Email', 'Notion'] },
]

const faqs = [
  { q: 'Preciso saber programar?', a: 'Não. Você descreve o processo; a gente implementa. Em alguns casos, um membro do seu time aprende a ajustar pequenos passos no n8n com nosso apoio.' },
  { q: 'Quanto tempo leva o primeiro fluxo?', a: 'Fluxos focados costumam sair em 1–2 semanas, dependendo da complexidade das integrações. Começamos pelo que dá retorno mais rápido.' },
  { q: 'Meus dados ficam seguros?', a: 'Credenciais ficam em ambiente seguro; seguimos boas práticas de permissão mínima e, quando necessário, fluxos em infraestrutura sua ou dedicada.' },
  { q: 'Quanto custa uma automação?', a: 'A partir de R$1.500 para fluxos focados. Após mapear o fluxo numa conversa rápida, passamos proposta clara — sem surpresa.' },
  { q: 'E se uma integração falhar ou a API mudar?', a: 'O fluxo é desenhado com tratamento de erros, retentativas e avisos quando algo não responde. Quando ferramentas mudam API, ajustamos o workflow.' },
  { q: 'O workflow fica com minha empresa?', a: 'Sim. Documentação, credenciais sob sua governança e acesso completo ao que foi implementado. Nada de caixa preta.' },
  { q: 'Qual ferramenta vocês usam?', a: 'n8n como padrão — pela flexibilidade, custo e controle. Também trabalhamos com Make, Zapier ou integração em código quando é o melhor encaixe.' },
]

export default function AutomacoesContent() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="Automação de Processos"
        headline="Processos que rodam sozinhos."
        tagline="Automação com integrações sob medida: CRM, planilhas, e-mail, WhatsApp, ERPs, APIs e IA no mesmo workflow — menos cópia manual, mais velocidade para vendas, financeiro e operações."
        ctas={
          <>
            <PillButton variant="primary" href="/#contato">Diagnóstico gratuito</PillButton>
            <PillButton variant="ghost" href="/#contato">Falar comigo</PillButton>
          </>
        }
      />

      {/* Benefícios */}
      <ProductTile
        variant="dark"
        eyebrow="Por que automatizar"
        headline="Automação é liberdade."
        tagline="Liberar gente para o que realmente gera valor — vendas, atendimento estratégico, criatividade e decisão."
      >
        <div className={styles.benefitGrid}>
          {benefits.map((b, i) => (
            <article
              key={b.title}
              className={styles.benefitCard}
              data-animate
              style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
            >
              <span className={styles.benefitNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* Como funciona */}
      <ProductTile
        variant="dark"
        eyebrow="Como funciona"
        headline="Processo claro, resultado em semanas."
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

      {/* Integrações */}
      <ProductTile
        variant="dark"
        eyebrow="O que dá para conectar"
        headline="Quase tudo que tem API ou webhook entra."
      >
        <div className={styles.toolsGrid} data-animate>
          {tools.map((t) => (
            <span key={t} className={styles.toolBadge}>{t}</span>
          ))}
        </div>
      </ProductTile>

      {/* Casos de uso */}
      <ProductTile
        variant="dark"
        eyebrow="Casos de uso"
        headline="Fluxos que entregam rápido."
      >
        <div className={styles.caseGrid}>
          {cases.map((c, i) => (
            <article
              key={c.title}
              className={styles.caseCard}
              data-animate
              style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
            >
              <span className={styles.caseNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.caseTitle}>{c.title}</h3>
              <p className={styles.caseDesc}>{c.desc}</p>
              <div className={styles.caseTags}>
                {c.tags.map((tag) => (
                  <span key={tag} className={styles.caseTag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </ProductTile>

      {/* FAQ */}
      <ProductTile variant="dark" eyebrow="Dúvidas comuns" headline="Sem mistério.">
        <FaqAccordion items={faqs} />
      </ProductTile>

      {/* CTA final */}
      <ProductTile
        variant="dark"
        eyebrow="Pronto para começar"
        headline="Tire o repetitivo do colo do time."
        tagline="Agende uma conversa de 30 min sem compromisso. Conte onde está o gargalo — a gente desenha o caminho."
        ctas={
          <>
            <PillButton variant="primary" href="/#contato">Diagnóstico gratuito</PillButton>
            <PillButton variant="ghost" href="/">Ver todos os serviços</PillButton>
          </>
        }
      />
    </>
  )
}
