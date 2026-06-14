import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ProductTile } from '@/components/ui/ProductTile'
import styles from './TermosContent.module.css'

export const metadata: Metadata = {
  title: 'Termos de Serviço',
  description: 'Termos de serviço da pierrondi.dev. Escopo fechado, código seu, transparência total.',
  alternates: {
    canonical: '/termos',
    languages: {
      'pt-BR': '/termos',
      'en-US': '/terms',
    },
  },
  robots: { index: true, follow: true },
}

export default function TermosPage() {
  return (
    <>
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow="Legal"
          headline="Termos de Serviço."
          headlineLevel="h1"
          tagline="Atualizado em abril de 2026"
        />

        <ProductTile variant="dark" as="div">
          <div className={styles.prose}>

            <h2>1. Definição dos serviços</h2>
            <p>
              A <strong>pierrondi.dev</strong> oferece quatro categorias de serviço:
            </p>
            <ul>
              <li><strong>Automação Express</strong> — processo automatizado com entrega em até 2 semanas. Inclui mapeamento, implementação e documentação.</li>
              <li><strong>Produto Digital (MVP)</strong> — desenvolvimento de aplicação ou micro SaaS do zero, com escopo fechado e prazo definido em proposta.</li>
              <li><strong>Tech Partner</strong> — consultoria técnica recorrente (CTO fracionado) com acompanhamento mensal, priorização de backlog e suporte a decisões de arquitetura.</li>
              <li><strong>App Store Connect / ASO</strong> — configuração pontual de metadata, screenshots, privacidade e ASO básico para apps iOS já prontos.</li>
            </ul>
            <p>
              Estes Termos também regem o uso do <strong>Pierrondi Shorts</strong>, aplicativo operado pela pierrondi.dev para
              criar, gerenciar e publicar vídeos curtos por meio de integrações oficiais, incluindo TikTok quando o usuário
              conecta sua conta de forma explícita.
            </p>

            <h2>2. Contratação</h2>
            <p>
              Toda contratação começa com uma proposta formal enviada pela pierrondi.dev, detalhando escopo, prazo, valor e entregáveis. O trabalho só inicia após aprovação por escrito (email ou assinatura digital). O escopo é sempre fechado — o que está na proposta é o que será entregue.
            </p>

            <h2>3. Pagamento</h2>
            <p>Para projetos (Automação Express e MVP):</p>
            <ul>
              <li>50% na aprovação da proposta (entrada)</li>
              <li>50% na entrega final</li>
            </ul>
            <p>Para o plano Tech Partner:</p>
            <ul>
              <li>Cobrança mensal, com vencimento no dia acordado em proposta</li>
            </ul>
            <p>
              A configuração de App Store Connect pode ser gratuita quando contratada como escopo pontual. Taxa anual da Apple,
              custos de contas, ferramentas, anúncios e quaisquer cobranças de terceiros são pagos diretamente pelo cliente.
            </p>
            <p>
              Formas de pagamento aceitas: Pix, boleto bancário ou cartão de crédito. Atrasos superiores a 15 dias podem resultar em suspensão dos serviços até regularização.
            </p>

            <h2>4. Escopo e alterações</h2>
            <p>
              O escopo contratado é o descrito na proposta aprovada. Qualquer alteração, adição de funcionalidade ou mudança de requisitos gera uma nova proposta com valores e prazos atualizados. Nenhuma cobrança adicional será feita sem aprovação prévia do cliente.
            </p>
            <p>
              No Pierrondi Shorts, integrações com TikTok e outros provedores dependem de OAuth, permissões oficiais,
              disponibilidade das APIs e políticas de cada plataforma. A pierrondi.dev usa essas integrações apenas quando o
              usuário autoriza e configura a conexão.
            </p>

            <h2>5. Prazos</h2>
            <p>
              Os prazos estimados constam na proposta e são contados a partir da data de aprovação e recebimento do pagamento inicial. Caso haja risco de atraso, a pierrondi.dev comunica com antecedência e apresenta novo cronograma. Atrasos causados por dependências do cliente (aprovações, acessos, conteúdo) não são de responsabilidade da pierrondi.dev.
            </p>

            <h2>6. Propriedade intelectual</h2>
            <p>
              Todo código-fonte, design, documentação e ativos digitais produzidos durante o projeto pertencem integralmente ao cliente após o pagamento total do valor contratado. Até a quitação, os entregáveis permanecem sob propriedade da pierrondi.dev.
            </p>

            <h2>7. Confidencialidade</h2>
            <p>
              Todas as informações compartilhadas pelo cliente durante a prestação de serviços são tratadas com sigilo. A pierrondi.dev não divulga dados, documentos ou estratégias do cliente a terceiros sem autorização expressa. Um acordo de confidencialidade (NDA) formal está disponível sob solicitação.
            </p>

            <h2>8. Limitação de responsabilidade</h2>
            <p>
              A pierrondi.dev não se responsabiliza por perdas indiretas, lucros cessantes, danos consequenciais ou prejuízos decorrentes do uso dos entregáveis após a entrega. A responsabilidade total da pierrondi.dev é limitada ao valor efetivamente pago pelo cliente no contrato em questão.
            </p>

            <h2>9. Rescisão</h2>
            <p>
              Qualquer uma das partes pode rescindir o contrato com aviso prévio de 15 dias corridos, por escrito (email). Em caso de rescisão:
            </p>
            <ul>
              <li>O trabalho entregue até a data da rescisão será cobrado proporcionalmente</li>
              <li>Entregáveis parciais serão disponibilizados ao cliente após quitação do valor proporcional</li>
              <li>Valores pagos antecipadamente por trabalho não realizado serão devolvidos</li>
            </ul>

            <h2>10. Foro</h2>
            <p>
              Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias decorrentes deste contrato, com exclusão de qualquer outro, por mais privilegiado que seja.
            </p>

            <h2>11. Contato</h2>
            <p>Para dúvidas sobre estes termos:</p>
            <p>
              <strong>pierrondi.dev</strong><br />
              Email: <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>
            </p>

          </div>
        </ProductTile>
      </main>
      <Footer />
    </>
  )
}
