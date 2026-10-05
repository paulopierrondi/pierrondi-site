import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/fractional-vs-consultoria-vs-agencia'

export const metadata: Metadata = {
  title: 'Fractional, consultoria, agência ou interno?',
  description:
    'Compara Fractional AI Automation Officer, consultoria, agência de automação e contratação interna: dono após o go-live, medição e risco — sem preço.',
  keywords: [
    'Fractional AI Automation Officer',
    'consultoria tradicional',
    'agência de automação',
    'contratação interna',
    'handoff',
    'baseline',
    'IA operacional',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Fractional, consultoria, agência ou interno?',
    description:
      'Quatro vias para automação de IA em produção: quem fica com o sistema, como medir e quais riscos. Sem preço, cliente ou ROI.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'pierrondi.dev answer brief — fractional, consultoria, agência ou interno',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional, consultoria, agência ou interno?',
    description: 'Dono após o go-live, medição e risco — sem preço nem ROI inventado.',
    images: ['/og'],
  },
}

export default function FractionalVsConsultoriaVsAgenciaAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — COMPARAÇÃO"
      question="Fractional, consultoria, agência ou interno?"
      directAnswer="Para um time de operações de médio porte que precisa de automações de IA em produção, as quatro vias comuns são Fractional AI Automation Officer, consultoria tradicional, agência de automação e contratação interna. A diferença que importa é estrutural: quem fica com o sistema depois do go-live, como o resultado é medido (baseline, métrica e handoff) e qual risco o time assume. Esta página descreve o formato de cada via. Não publica preço, cliente, logo nem ROI."
      sections={[
        {
          heading: 'Quem fica com o sistema depois do go-live',
          bullets: [
            'Fractional AI Automation Officer: o formato deste portfólio instala a automação e entrega o handoff. O dono operacional depois do go-live é o time do cliente — registry, evidência e o que o time herda. A oferta não é um produto que fica preso no fornecedor.',
            'Consultoria tradicional: o formato usual entrega diagnóstico e recomendação, e às vezes um piloto. O sistema em produção só permanece com o cliente quando implementação e transferência estão no escopo. Sem isso, o artefato que fica é o relatório.',
            'Agência de automação: o formato usual constrói fluxos e integrações. O sistema fica com o cliente só se acessos, código, exceções e runbook forem transferidos. Se a operação continuar na agência, o go-live não transferiu o dono.',
            'Contratação interna: a pessoa pode ser o dono permanente desde o início. O sistema nasce dentro da empresa. Isso exige que a vaga cubra operação, não só experimento, e que o método não fique só na cabeça de uma pessoa.',
          ],
        },
        {
          heading: 'Como o resultado é medido',
          bullets: [
            'As quatro vias podem usar a mesma cadeia honesta: baseline do trabalho real, métrica observável antes de escalar e handoff com evidência. Sem baseline, o número de depois não tem com o que se comparar.',
            'Fractional: baseline, sistema, métrica e handoff são o formato da oferta. A métrica entra quando a fonte já é observável. A evidência é AgentOps: o que rodou, quem aprovou e o que o time herda.',
            'Consultoria: a medição costuma nascer no diagnóstico. O risco é a métrica parar no slide se ninguém operar o sistema depois do projeto.',
            'Agência: a medição costuma nascer na entrega, quando o fluxo está no ar. O risco é contar automação publicada no lugar do trabalho que mudou.',
            'Contratação interna: a pessoa pode medir no trabalho real, mas só se a empresa já tiver baseline e um dono da métrica. A vaga não cria a medida sozinha.',
          ],
        },
        {
          heading: 'Formato típico do engajamento',
          bullets: [
            'Fractional: engajamento contínuo, com gates humanos no que é irreversível. Não é pacote de horas soltas e não há sprint publicado neste site.',
            'Consultoria: projeto com começo e fim — discovery, recomendação e, quando contratado, implementação. O encerramento é o ponto em que a operação precisa de dono interno.',
            'Agência: projeto ou retainer para construir e manter fluxos. O formato tende a otimizar a entrega da automação, não o operating model do time.',
            'Contratação interna: vínculo de trabalho. É capacidade permanente, com rampa, gestão e o risco de cobertura quando a pessoa sai.',
          ],
        },
        {
          heading: 'Riscos de cada via',
          paragraphs: [
            'Nenhuma via é melhor por definição. O risco muda com o que o time precisa operar depois do go-live. Esta página não afirma o que uma consultoria ou agência específica faz: descreve o formato usual de cada categoria e o que perguntar antes de contratar.',
          ],
          bullets: [
            'Fractional: dependência temporária de um operador externo até o handoff ficar completo. Se o escopo virar horas sem evidência, o formato se dissolve. A oferta é pessoal e independente: não representa a ServiceNow e não muda o jobTitle público do site, que continua Technical Account Executive.',
            'Consultoria: recomendação sem sistema operável, e conhecimento que sai junto com o time do projeto.',
            'Agência: automação que só o fornecedor sabe manter, e volume de fluxos no lugar de resultado do trabalho.',
            'Contratação interna: tempo até a pessoa produzir, risco de pessoa única e a necessidade de o método (baseline, métrica, evidência) já existir na empresa.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Esta comparação cita preço, cliente ou ROI?',
          answer:
            'Não. Não há faixa de preço, cliente nomeado, logo ou ROI. A prova pública continua em /feitos, com o recorte já publicado. Esta página descreve formatos; não inventa resultado.',
        },
        {
          question: 'Fractional é sempre a melhor das quatro vias?',
          answer:
            'Não. É o formato deste portfólio quando o time quer um operador externo contínuo que instala o sistema e entrega o handoff. Consultoria cabe quando o problema ainda é diagnóstico. Agência cabe quando o gargalo é construir fluxos já especificados. Contratação interna cabe quando a empresa quer dono permanente e aceita a rampa. A escolha depende de quem deve operar depois do go-live.',
        },
        {
          question: 'Onde está o caminho comercial e como medir?',
          answer:
            'O caminho comercial é a página de engajamento. A definição do termo está no brief Fractional. A cadeia baseline, métrica e evidência está no brief de medição. Não há sprint publicado nesta resposta e não há Product schema.',
        },
      ]}
      internalLinks={[
        {
          href: '/engajamento',
          label: 'Engajamento',
          description: 'A oferta contínua: baseline, sistema, métrica e handoff.',
        },
        {
          href: '/answers/o-que-e-fractional-ai-automation-officer',
          label: 'O que é Fractional AI Automation Officer?',
          description: 'Definição citável da oferta — PT-first, sem twin EN.',
        },
        {
          href: '/answers/como-medir-resultado-de-ia-operacional',
          label: 'Como medir resultado de IA operacional',
          description: 'Framework honesto: baseline → métrica → evidência / AgentOps.',
        },
        {
          href: '/feitos',
          label: 'Feitos',
          description: 'Prova pública já publicada — sem métrica nova nesta resposta.',
        },
        {
          href: '/contato',
          label: 'Contato / WhatsApp',
          description: 'Conversar com contexto, ou começar direto no WhatsApp do site.',
        },
      ]}
      datePublished="2026-09-28"
      dateModified="2026-09-28"
    />
  )
}
