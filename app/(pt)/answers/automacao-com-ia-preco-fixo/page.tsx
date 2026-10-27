import type { Metadata } from 'next'

import AnswerBrief from '@/app/answers/_components/AnswerBrief'

const path = '/answers/automacao-com-ia-preco-fixo'

export const metadata: Metadata = {
  title: 'Automação com IA com preço fixo',
  description:
    'Automação com IA com preço fixo e escopo fechado: critério de aceite escrito antes, resultado observável e sem hora solta. Sem valor, cliente ou métrica.',
  keywords: [
    'automação com IA preço fixo',
    'consultor de automação com IA',
    'escopo fechado',
    'critério de aceite',
    'Fractional AI Automation Officer',
    'resultado mensurável',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Automação com IA com preço fixo',
    description:
      'Escopo fechado, critério de aceite e resultado observável. Sem hora solta, sem valor publicado e sem cliente nomeado.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'pierrondi.dev answer brief — automação com IA com preço fixo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automação com IA com preço fixo',
    description: 'Escopo fechado e critério de aceite — sem hora solta e sem preço publicado.',
    images: ['/og'],
  },
}

export default function AutomacaoComIaPrecoFixoAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — ESCOPO FECHADO"
      question="Automação com IA com preço fixo e escopo fechado"
      directAnswer="Automação com IA com preço fixo e escopo fechado é um engajamento em que o resultado, o limite e o critério de aceite ficam escritos antes de executar. O preço cobre esse escopo, não horas soltas. O critério de aceite é a condição observável que encerra a entrega: qual trabalho manual sai, qual sistema entra no lugar e qual evidência o time aponta. O que fica de fora não entra. Sem esse texto, o escopo não fecha."
      comparison={{
        heading: 'Hora solta, escopo fechado e Fractional',
        caption:
          'Formato de contratação. Não descreve uma empresa específica, não publica valor e não recomenda uma via sem saber se o aceite já pode ser escrito.',
        columns: ['Eixo', 'Hora solta', 'Preço fixo', 'Fractional contínuo'],
        rows: [
          {
            criterion: 'O que se vende',
            cells: [
              'Presença e horas.',
              'Uma entrega com limite escrito.',
              'Operating model até o handoff.',
            ],
          },
          {
            criterion: 'Critério de aceite',
            cells: [
              'Costuma não existir.',
              'Escrito antes de executar.',
              'Gates no que é irreversível.',
            ],
          },
          {
            criterion: 'Quando cabe',
            cells: [
              'O problema ainda muda toda semana.',
              'O recorte já fecha e o aceite é observável.',
              'O time quer um operador externo até herdar o sistema.',
            ],
          },
        ],
      }}
      sections={[
        {
          heading: 'Escopo, critério de aceite, resultado',
          paragraphs: [
            'A cadeia que torna o preço fixo honesto é escopo, critério de aceite e resultado mensurável. Cada elo precisa existir antes da execução. Se um deles falta, o nome preço fixo descreve uma lista aberta.',
          ],
          bullets: [
            'Escopo: o recorte do trabalho manual que vira sistema, automação ou produto. Diz o que entra, o que fica de fora e quem opera no dia seguinte.',
            'Critério de aceite: a condição observável que encerra o item. Não é “a IA rodou”. É o trabalho que saiu, o sistema que entrou e a evidência que o time aponta.',
            'Resultado mensurável: a comparação com o trabalho de hoje. Só entra quando a fonte já é observável. Sem baseline, o número de depois não tem com o que se comparar. O método está no brief de medição; esta página não inventa métrica.',
          ],
        },
        {
          heading: 'Quando o preço fixo cabe',
          paragraphs: [
            'Preço fixo cabe quando o trabalho já tem dono, fila e um recorte que dá para escrever. A entrega é um sistema, uma automação ou um produto com começo, fim e handoff. O time aceita que o que ficou de fora não entra sem um escopo novo.',
          ],
          bullets: [
            'O aceite pode ser observado pelo time, sem dashboard de vitrine e sem taxa inventada.',
            'A prova pedida é o trabalho que mudou, mais a trilha do que rodou, de quem aprovou e do que o time herda.',
            'O Fractional AI Automation Officer deste portfólio vende esse tipo de resultado: escopo, aceite e evidência. O jobTitle público do site continua Technical Account Executive. A oferta é pessoal e independente e não representa a ServiceNow.',
          ],
        },
        {
          heading: 'Quando o preço fixo não cabe',
          bullets: [
            'O problema ainda é diagnóstico. Ninguém sabe qual trabalho sai nem qual sistema entra. Nesse caso, fechar preço antes do recorte transforma incerteza em disputa.',
            'O trabalho muda toda semana e o aceite não se sustenta. Hora disponível descreve melhor a incerteza do que um pacote fechado.',
            'A liderança quer presença, não um resultado com limite. Escopo fechado recusa hora solta.',
            'O que se pede é operação contínua, sem um fim escrito. Isso é o engajamento em /engajamento: baseline, sistema, métrica e handoff. Não é um pacote de uma entrega só.',
            'Não há sprint publicado neste site. Pedir um sprint fechado com página própria não encontra rota aqui.',
          ],
        },
        {
          heading: 'Como se compara a hora e agência',
          paragraphs: [
            'Hora solta cobra presença. O risco é o trabalho crescer sem critério de aceite. Agência, no formato usual, otimiza a construção do fluxo. Preço fixo só transfere o dono se acessos, exceções e runbook estiverem no aceite. Se a operação continuar no fornecedor, o go-live não entregou o sistema.',
            'Fractional contínuo é o formato deste portfólio quando o time quer um operador externo que instala a cadeia e entrega o handoff. Preço fixo descreve uma entrega com limite. Os dois vendem resultado, escopo e aceite — não hora solta. A diferença é se o trabalho tem fim escrito ou continua até o operating model ficar com o time. A tabela das quatro vias, sem preço e sem cliente, está no brief de comparação.',
          ],
        },
        {
          heading: 'O que esta resposta não faz',
          paragraphs: [
            'Não publica valor, faixa, cliente, depoimento, review nem métrica. O caminho comercial é a página de engajamento e o contato. A prova pública continua em /feitos, com o recorte já publicado. A definição do termo Fractional está no brief correspondente.',
          ],
        },
      ]}
      faq={[
        {
          question: 'O que é um critério de aceite neste formato?',
          answer:
            'É a condição observável, escrita antes, que encerra a entrega. Nomeia o trabalho manual que sai, o sistema ou automação que entra e a evidência que o time aponta. Se o item não pode ser observado, não é critério. O que ficou de fora não entra sem um escopo novo.',
        },
        {
          question: 'Esta página publica preço, cliente ou review?',
          answer:
            'Não. Não há valor, faixa, cliente nomeado, depoimento, review ou métrica. O caminho comercial é /engajamento e /contato. A prova pública continua em /feitos, com o recorte já publicado.',
        },
        {
          question: 'Preço fixo substitui o Fractional AI Automation Officer?',
          answer:
            'Não. Preço fixo é o formato de uma entrega com escopo e aceite. O Fractional é o engajamento contínuo: baseline, sistema, métrica e handoff. Uma entrega fechada pode existir dentro dessa cadeia. O nome fractional não vira banco de horas.',
        },
        {
          question: 'Quando hora ou agência descrevem melhor o trabalho?',
          answer:
            'Hora descreve melhor quando o problema ainda muda e ninguém consegue escrever o aceite. Agência, no formato usual, descreve melhor quando os fluxos já estão especificados e o gargalo é construir — desde que o aceite inclua a transferência de acessos, exceções e runbook. A comparação das quatro vias está no brief Fractional, consultoria, agência ou interno.',
        },
        {
          question: 'Onde está o caminho comercial?',
          answer:
            'Na página de engajamento e no contato, inclusive o WhatsApp do site. Não há sprint publicado nesta resposta e não há Product schema.',
        },
      ]}
      internalLinks={[
        {
          href: '/engajamento',
          label: 'Engajamento',
          description: 'A oferta contínua: baseline, sistema, métrica e handoff.',
        },
        {
          href: '/contato',
          label: 'Contato / WhatsApp',
          description: 'Conversar com contexto, ou começar direto no WhatsApp do site.',
        },
        {
          href: '/answers/fractional-vs-consultoria-vs-agencia',
          label: 'Fractional, consultoria, agência ou interno?',
          description: 'Quatro vias no mesmo eixo: dono após o go-live, medição e risco. Sem preço.',
        },
        {
          href: '/answers/o-que-e-fractional-ai-automation-officer',
          label: 'O que é Fractional AI Automation Officer?',
          description: 'Definição citável da oferta — resultado e evidência, não horas soltas.',
        },
        {
          href: '/answers/como-medir-resultado-de-ia-operacional',
          label: 'Como medir resultado de IA operacional',
          description: 'Baseline, métrica e evidência AgentOps — sem número inventado.',
        },
        {
          href: '/feitos',
          label: 'Feitos',
          description: 'Prova pública já publicada — sem métrica nova nesta resposta.',
        },
      ]}
      datePublished="2026-10-26"
      dateModified="2026-10-26"
    />
  )
}
