import type { Metadata } from 'next'

import AnswerBrief from '@/app/answers/_components/AnswerBrief'

const path = '/answers/consultoria-de-automacao-com-ia'

export const metadata: Metadata = {
  // Absolute: the buyer query is 45 characters. The root template would
  // append " | pierrondi.dev" and land at 61. " | Paulo Pierrondi" is 63.
  title: { absolute: 'Consultoria de automação com IA para empresas | Pierrondi' },
  description:
    'Consultoria de automação com IA para empresas de mid-market e operações: resultado observável, critério de aceite, baseline, sistema, métrica e handoff.',
  keywords: [
    'consultoria de automação com IA para empresas',
    'consultor de automação com IA',
    'automação com IA para empresas',
    'critério de aceite',
    'Fractional AI Automation Officer',
    'AgentOps',
  ],
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Consultoria de automação com IA para empresas | Pierrondi',
    description:
      'Resultado observável e critério de aceite para mid-market e operações. Baseline, sistema, métrica e handoff, com gates humanos.',
    url: path,
    siteName: 'pierrondi.dev',
    type: 'article',
    locale: 'pt_BR',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'pierrondi.dev answer brief — consultoria de automação com IA para empresas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoria de automação com IA para empresas | Pierrondi',
    description:
      'Resultado observável, critério de aceite e handoff para times de operação. Sem preço e sem cliente nesta página.',
    images: ['/og'],
  },
}

export default function ConsultoriaDeAutomacaoComIaAnswerPage() {
  return (
    <AnswerBrief
      path={path}
      eyebrow="ANSWER BRIEF — CONSULTORIA"
      question="Consultoria de automação com IA para empresas"
      directAnswer="Consultoria de automação com IA para empresas, no trabalho de Paulo Pierrondi, entrega um recorte operacional com resultado observável e critério de aceite escrito antes da execução. O público é mid-market e times de operação com fila, exceção e dono, ainda sem um sistema que o time herde. A diferença é o formato: resultado e critério de aceite, na cadeia baseline, sistema, métrica e handoff, com automação governada e gates humanos. O caminho comercial é a página de engajamento."
      sections={[
        {
          heading: 'Quando a automação com IA compensa',
          paragraphs: [
            'Automação com IA para empresas compensa quando o trabalho já se repete e alguém é dono da fila. O time aponta o passo manual que sai, a exceção que volta e a evidência de hoje. Esse apontamento é o baseline. Sem ele, o depois não tem comparação. A IA fica no trecho repetível. A pessoa continua dona da decisão irreversível, com gate humano.',
            'Compensa quando a liderança pede resultado observável. O critério de aceite fica escrito antes: qual trabalho deixa de ser feito à mão, qual sistema entra e qual evidência o time aponta no fim. Se esse texto não fecha, ainda não há escopo. Mid-market cabe porque o time já sente o passo manual e ainda não tem operating model. A consultoria instala a cadeia baseline, sistema, métrica e handoff.',
          ],
        },
        {
          heading: 'Quando o trabalho deve esperar',
          paragraphs: [
            'O trabalho deve esperar quando o pedido ainda é um slide e ninguém nomeia fila, exceção ou dono. O próximo passo é descrever o trabalho real. Deve esperar também quando a fonte da métrica não existe e ninguém vai registrá-la. Número sem fonte vira vitrine. O método está no brief de medição. Esta página não publica taxa, cliente, depoimento ou economia.',
            'Deve esperar quando a busca é um banco de horas de consultor de automação com IA. Hora descreve presença. Esta oferta descreve recorte, critério de aceite e handoff. Deve esperar, ainda, quando o time não vai operar o sistema depois. Se acesso, exceção e runbook ficam no fornecedor, o go-live não entregou a operação.',
          ],
        },
        {
          heading: 'Como é a primeira fatia',
          paragraphs: [
            'A primeira fatia é um único fluxo: o trabalho que já dói, já tem dono e cabe num critério de aceite observável. Vários domínios ao mesmo tempo diluem o aceite. O baseline descreve o fluxo como ele é hoje, com entrada, exceção, retrabalho e o que o time já registra. Se essa fonte não existe, a fatia começa por criá-la.',
            'O sistema cobre o recorte com AgentOps: registry, permissão, gate humano e fallback quando a IA não deve seguir. O AI Operating Model entra como política de contexto, validação e auditoria, na linguagem da página de atuação. A métrica é uma medida que o time já vê: ciclo, fila parada, exceção escalada ou decisão com rastro. O handoff entrega registry, runbook e trilha de evidência. A fatia seguinte só abre quando essa herança está com quem opera.',
          ],
        },
        {
          heading: 'O que o time herda',
          paragraphs: [
            'O registry lista fluxo, dono, permissão e o que está fora de escopo. Sem ele, o agente vive numa conversa e some quando a pessoa sai. O runbook descreve exceção, gate e fallback: quem aprova o irreversível e o que o sistema faz quando a evidência não basta.',
            'A trilha de evidência diz o que rodou, quem aprovou e o que ficou registrado. AgentOps é essa disciplina. O critério de aceite da fatia fica amarrado ao baseline, para o time saber qual trabalho saiu da mão. A prova pública continua em feitos, no recorte que já está no ar. Esta página não acrescenta logo, depoimento ou número de case.',
          ],
        },
        {
          heading: 'Onde isso se encaixa na oferta',
          paragraphs: [
            'Paulo Pierrondi vende esse trabalho como Fractional AI Automation Officer, um engajamento contínuo para instalar a cadeia. Não é cargo da ServiceNow. O jobTitle público continua Technical Account Executive. A oferta é pessoal e independente. O caminho comercial é a página de engajamento. Contato e o WhatsApp do site servem para trazer um fluxo. A resposta é escopo e critério de aceite.',
            'No recorte deste site, consultor de automação com IA escreve o aceite e entrega o handoff. A comparação entre fractional, consultoria tradicional, agência e contratação interna está no brief correspondente, sem preço e sem cliente nomeado.',
          ],
        },
      ]}
      faq={[
        {
          question: 'Consultoria de automação com IA para empresas vende hora?',
          answer:
            'Não. Vende um recorte com resultado observável e critério de aceite escrito antes da execução. A cadeia é baseline, sistema, métrica e handoff, com gate humano no que é irreversível. Hora solta fica de fora. O formato contínuo está na página de engajamento.',
        },
        {
          question: 'Para quem é essa consultoria?',
          answer:
            'Para mid-market e times de operação que já têm fila, exceção e dono, e precisam que a automação rode no trabalho real. Serve quem já tem intenção de IA e ainda não tem um sistema que o time herde. Esta página não publica logo de cliente.',
        },
        {
          question: 'O que é a primeira fatia?',
          answer:
            'Um único fluxo com baseline do trabalho atual, sistema com registry e gate humano, métrica que o time já observa e handoff. A fatia seguinte espera essa herança. Vários domínios ao mesmo tempo diluem o critério de aceite.',
        },
        {
          question: 'O que o time herda no handoff?',
          answer:
            'Registry do que roda, runbook de exceção, aprovação e fallback, e trilha de evidência do que rodou e de quem aprovou. Sem esses três artefatos, a automação não foi entregue. O consultor não fica como dono permanente do acesso.',
        },
        {
          question: 'Esta página publica preço, cliente ou taxa de sucesso?',
          answer:
            'Não. Não há valor, faixa, depoimento, logo ou taxa de sucesso. A prova pública continua em feitos, no recorte já publicado. O caminho comercial é engajamento e contato.',
        },
      ]}
      internalLinks={[
        {
          href: '/engajamento',
          label: 'Engajamento',
          description: 'A oferta contínua: baseline, sistema, métrica e handoff.',
        },
        {
          href: '/atuacao',
          label: 'Atuação',
          description: 'Pilares: AI Operating Model, ServiceNow, AgentOps e estratégia.',
        },
        {
          href: '/answers/o-que-e-fractional-ai-automation-officer',
          label: 'O que é Fractional AI Automation Officer?',
          description: 'Definição citável da oferta. Resultado e evidência, não horas soltas.',
        },
        {
          href: '/answers/como-medir-resultado-de-ia-operacional',
          label: 'Como medir resultado de IA operacional',
          description: 'Baseline, métrica e evidência AgentOps, sem número inventado.',
        },
        {
          href: '/answers/o-que-e-agentops',
          label: 'O que é AgentOps?',
          description: 'Registry, gates humanos e execução com trilha de evidência.',
        },
        {
          href: '/answers/fractional-vs-consultoria-vs-agencia',
          label: 'Fractional, consultoria, agência ou interno?',
          description: 'Quatro vias no mesmo eixo, sem preço e sem cliente.',
        },
        {
          href: '/feitos',
          label: 'Feitos',
          description: 'Prova pública já publicada. Sem métrica nova nesta resposta.',
        },
        {
          href: '/contato',
          label: 'Contato / WhatsApp',
          description: 'Trazer um fluxo e receber escopo e critério de aceite.',
        },
      ]}
      datePublished="2026-11-16"
      dateModified="2026-11-16"
    />
  )
}
