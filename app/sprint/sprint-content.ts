import { getWhatsAppHref } from '@/lib/contact'

export const SPRINT_OFFER = {
  name: 'Uma automação no ar',
  promise:
    'Um processo manual doloroso — WhatsApp + planilha + copy-paste — vira um fluxo no ar em 7 dias após o kickoff, com aceite escrito e testável.',
  priceBrl: 'R$ 2.400',
  priceUsd: 'US$ 450 via Wise',
  billing: 'Pré-pago. Sem hora avulsa.',
  window: 'Pague agora, kickoff em outubro de 2026. Sem call de discovery — o comprador preenche o formulário.',
  includes: [
    '1 fluxo no ar (n8n / Make / GoHighLevel / WhatsApp Business oficial / API)',
    'Aceite escrito',
    'Happy path + um caminho de falha',
    'Handoff curto',
    '7 dias de revisão no mesmo fluxo',
  ],
  excludes: [
    'Design, marca ou social',
    'Segundo fluxo',
    'WhatsApp não oficial',
    'Sistemas sem API ou sem acesso no dia 1',
    'Discovery aberto, SDR, closer ou trial gratuito',
  ],
  acceptance: [
    'O gatilho dispara sozinho',
    'O resultado chega no destino combinado em até 5 minutos no happy path',
    'Erros param de forma visível e alertam',
    'O comprador reproduz o happy path uma vez com o handoff',
    'O handoff nomeia gatilho, destino, falha e custo recorrente',
  ],
  proof: {
    headline: '2 semanas → 2 horas',
    detail:
      'Arquitetura de integração com mais de 700 workflows e processamento de 2–3 milhões de documentos por mês. Agregado público em /feitos: 50.000+ horas economizadas.',
    href: '/feitos',
  },
  faq: [
    {
      q: 'Preciso de call antes de pagar?',
      a: 'Não. Leia esta página, pague e preencha o kickoff. Dúvidas objetivas vão no campo de fuso e janela do formulário.',
    },
    {
      q: 'Quando começa o relógio de 7 dias?',
      a: 'Quando o formulário de kickoff estiver completo e os acessos necessários tiverem chegado.',
    },
    {
      q: 'E se meu sistema não tiver API?',
      a: 'Está fora do escopo. Só entram sistemas com API documentada ou acesso no dia 1.',
    },
    {
      q: 'Posso pedir um segundo fluxo no mesmo pacote?',
      a: 'Não. Um fluxo, um aceite, uma janela de revisão. Segundo fluxo é outro contrato.',
    },
    {
      q: 'Como pago?',
      a: 'Chame no WhatsApp. Pix e link Wise serão colados na conversa — não há chave ou link publicado nesta página.',
    },
    {
      q: 'Comprovante ou pagamento travou?',
      a: 'Use o mesmo WhatsApp publicado no site. Não invente outro canal.',
    },
  ],
} as const

export const sprintPayWhatsAppHref = getWhatsAppHref(
  'Olá, Paulo! Quero pagar a oferta "Uma automação no ar" (R$ 2.400 / US$ 450 Wise). Me confirma Pix ou Wise?',
)

export const sprintSupportWhatsAppHref = getWhatsAppHref(
  'Olá, Paulo! Paguei a oferta Sprint e preciso de ajuda com comprovante ou kickoff.',
)
