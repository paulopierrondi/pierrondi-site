'use client'

import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const categories = [
  {
    label: 'Sobre o processo',
    items: [
      { q: 'Como funciona o diagnóstico gratuito?', a: 'Chamada de 30min, analisamos seu problema, propomos solução com prazo e custo reais.' },
      { q: 'Quanto tempo leva um projeto?', a: 'Automação: 1–2 semanas. MVP: 4–8 semanas. App Store Connect: setup pontual. Tech Partner: contínuo.' },
      { q: 'Posso acompanhar o progresso?', a: 'Sim. Você recebe atualizações objetivas por e-mail, WhatsApp ou painel combinado no início do projeto.' },
      { q: 'E se eu quiser mudar algo no meio?', a: 'Renegociamos escopo antes de continuar. Sem surpresa.' },
    ],
  },
  {
    label: 'Sobre preço',
    items: [
      { q: 'Posso parcelar?', a: 'Sim, até 3x para projetos acima de R$5.000.' },
      { q: 'O que acontece se o escopo mudar?', a: 'Novo escopo = nova proposta. Sem cobrança adicional sem aprovação.' },
      { q: 'Tem fidelidade ou contrato longo?', a: 'Não. Automação e MVP são por projeto. Tech Partner é mensal, sem fidelidade.' },
      { q: 'Por que é mais barato que agência tradicional?', a: 'Operação enxuta com IA. Sem gerente de conta, sem overhead de escritório.' },
      { q: 'A configuração do App Store Connect é paga?', a: 'O setup é gratuito para app iOS já pronto. A taxa anual da Apple, conta de desenvolvedor, anúncios e custos de terceiros ficam no nome e no cartão do cliente.' },
    ],
  },
  {
    label: 'Sobre entrega',
    items: [
      { q: 'Eu fico com o código?', a: '100%. Repositório, credenciais, documentação e acesso completo.' },
      { q: 'Quem faz o deploy?', a: 'Nós. Configuramos produção, domínio e monitoramento.' },
      { q: 'Tem suporte pós-entrega?', a: '30 dias de suporte inclusos em todo projeto. Extensão disponível.' },
      { q: 'Qual stack vocês usam?', a: 'Next.js, TypeScript, Supabase, n8n, Make, Railway. Ajustamos conforme o projeto.' },
      { q: 'Vocês publicam app na App Store?', a: 'Configuramos nome, descrição, keywords, screenshots, privacidade e ASO básico no App Store Connect. Submissão e aprovação final dependem das regras e revisão da Apple.' },
    ],
  },
  {
    label: 'Sobre fit',
    items: [
      { q: 'Funciona para empresa pequena?', a: 'Feito para isso. PMEs, startups e infoprodutores são nosso foco.' },
      { q: 'Preciso ter desenvolvedor interno?', a: 'Não. Entregamos pronto para usar. Se tiver dev, integramos com o time.' },
      { q: 'Vocês usam IA em tudo?', a: 'Usamos onde faz sentido: automação, geração de código, análise. Sem IA cosmética.' },
    ],
  },
]

export default function FaqContent() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <ProductTile
        variant="dark"
        eyebrow="FAQ"
        headline="Perguntas frequentes."
        headlineLevel="h1"
        tagline="Tudo que você precisa saber antes de contratar. Se sua dúvida não estiver aqui, fale com a gente."
      />

      {/* Categories */}
      {categories.map((cat, i) => (
        <ProductTile
          key={cat.label}
          variant={i % 2 === 0 ? 'light' : 'parchment'}
          eyebrow={cat.label}
        >
          <FaqAccordion items={cat.items} />
        </ProductTile>
      ))}

      {/* CTA */}
      <ProductTile
        variant="dark"
        eyebrow="Não encontrou sua dúvida"
        headline="Fale direto com a gente."
        tagline="Sem formulário, sem fila. Uma conversa de 30 min resolve."
        ctas={
          <>
            <PillButton variant="primary" href="/#contact">Falar com a pierrondi.dev</PillButton>
            <PillButton variant="ghost" href="/precos">Ver preços</PillButton>
          </>
        }
      />
    </>
  )
}
