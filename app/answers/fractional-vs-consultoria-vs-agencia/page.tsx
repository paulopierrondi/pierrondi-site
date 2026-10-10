import type { Metadata } from 'next'

import AnswerBrief from '../_components/AnswerBrief'

const path = '/answers/fractional-vs-consultoria-vs-agencia'
const enPath = '/en/answers/fractional-vs-consultancy-vs-agency'

export const metadata: Metadata = {
  title: 'Fractional, consultoria, agência ou interno?',
  description:
    'Compara, em tabela, Fractional, consultoria, agência e contratação interna: dono após o go-live, medição, formato e risco. Sem preço.',
  keywords: [
    'Fractional AI Automation Officer',
    'consultoria tradicional',
    'agência de automação',
    'contratação interna',
    'handoff',
    'baseline',
    'IA operacional',
  ],
  alternates: {
    canonical: path,
    languages: {
      'pt-BR': path,
      'en-US': '/en/answers/fractional-vs-consultancy-vs-agency',
      'x-default': path,
    },
  },
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
      directAnswer="Para um time de operações de médio porte que precisa de automações de IA em produção, as quatro vias comuns são Fractional AI Automation Officer, consultoria tradicional, agência de automação e contratação interna. A diferença que importa é estrutural: quem fica com o sistema depois do go-live, como o resultado é medido (baseline, métrica e handoff) e qual risco o time assume. A tabela compara esses formatos no mesmo eixo. Esta página não publica preço, cliente, logo nem ROI."
      comparison={{
        heading: 'Comparação no mesmo eixo',
        caption:
          'Formato usual de cada categoria. Não descreve uma empresa específica e não recomenda uma via sem saber quem opera depois do go-live.',
        columns: ['Eixo', 'Fractional', 'Consultoria', 'Agência', 'Interno'],
        rows: [
          {
            criterion: 'Dono após o go-live',
            cells: [
              'O time do cliente, depois do handoff.',
              'O cliente, só se implementação e transferência estiverem no escopo.',
              'O cliente, só se acessos, código, exceções e runbook forem transferidos.',
              'A pessoa contratada, se a vaga cobrir operação.',
            ],
          },
          {
            criterion: 'Medição',
            cells: [
              'Baseline, métrica observável e evidência de AgentOps.',
              'Costuma nascer no diagnóstico e pode parar no slide.',
              'Costuma nascer na entrega do fluxo.',
              'Só existe se a empresa já tiver baseline e dono da métrica.',
            ],
          },
          {
            criterion: 'Formato',
            cells: [
              'Engajamento contínuo, com gates no que é irreversível.',
              'Projeto com começo e fim.',
              'Projeto ou retainer para construir fluxos.',
              'Vínculo de trabalho, com rampa e gestão.',
            ],
          },
          {
            criterion: 'Risco principal',
            cells: [
              'Dependência até o handoff ficar completo.',
              'Recomendação sem sistema operável.',
              'Automação que só o fornecedor sabe manter.',
              'Rampa longa e pessoa única.',
            ],
          },
          {
            criterion: 'Quando cabe',
            cells: [
              'O time quer um operador externo que instala e entrega.',
              'O problema ainda é diagnóstico.',
              'Os fluxos já estão especificados e falta construir.',
              'A empresa quer dono permanente e aceita a rampa.',
            ],
          },
        ],
      }}
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
        {
          heading: 'Como decidir antes de contratar',
          paragraphs: [
            'A escolha não é de marca. É de quem precisa operar depois. A tabela alinha o formato usual de cada categoria. As quatro perguntas abaixo se respondem com o trabalho real do time, não com o slide da proposta.',
          ],
          bullets: [
            'Quem fica com acessos, código, exceções e runbook no dia seguinte ao go-live?',
            'Baseline, métrica observável e handoff estão escritos no escopo, ou só a entrega?',
            'Se o fornecedor ou a pessoa sair, o time ainda consegue operar?',
            'A prova pedida é o trabalho que mudou, ou a quantidade de fluxos publicados?',
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
        {
          question: 'Qual a diferença prática entre fractional e consultoria?',
          answer:
            'Consultoria tradicional costuma terminar no diagnóstico ou na recomendação. O formato fractional deste portfólio continua até o sistema estar em produção e o handoff entregar o dono ao time. Se o escopo for só um relatório, o nome fractional não descreve o trabalho.',
        },
        {
          question: 'Agência de automação e fractional entregam a mesma coisa?',
          answer:
            'Não. A agência, no formato usual, otimiza a construção de fluxos. O fractional otimiza o operating model: baseline, métrica, evidência e o que o time herda. Se a operação continuar na agência, o go-live não transferiu o dono.',
        },
        {
          question: 'Contratar alguém interno substitui um operador externo?',
          answer:
            'Substitui quando a empresa quer dono permanente e aceita a rampa, a gestão e o risco de pessoa única. Não substitui o método. A vaga não cria baseline, métrica e evidência sozinha. Um operador externo pode instalar esse método e sair no handoff; a pessoa interna fica para operá-lo.',
        },
        {
          question: 'O que perguntar antes de escolher uma via?',
          answer:
            'Quatro perguntas bastam: quem opera depois do go-live; se baseline, métrica e handoff estão no escopo; o que acontece quando o fornecedor ou a pessoa sai; e se a prova é o trabalho que mudou ou só um fluxo publicado. Preço não responde nenhuma delas.',
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
        {
          href: '/about',
          label: 'Sobre Paulo Pierrondi',
          description: 'Trajetória e o perfil público. O jobTitle continua Technical Account Executive.',
        },
        {
          href: '/atuacao',
          label: 'Atuação',
          description: 'Onde o trabalho gera valor: operating model, ServiceNow, AgentOps e estratégia.',
        },
        {
          href: '/answers/o-que-e-agentops',
          label: 'O que é AgentOps?',
          description: 'A camada de evidência: o que rodou, quem aprovou e o que o time herda.',
        },
        {
          href: '/answers/quem-e-paulo-pierrondi',
          label: 'Quem é Paulo Pierrondi?',
          description: 'Brief citável do autor, separado de qualquer listagem de marketplace.',
        },
        {
          href: enPath,
          label: 'Versão em inglês',
          description: 'A mesma comparação em inglês: dono após o go-live, medição e risco.',
        },
      ]}
      datePublished="2026-09-28"
      dateModified="2026-10-10"
    />
  )
}
