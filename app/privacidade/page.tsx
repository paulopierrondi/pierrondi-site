import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ProductTile } from '@/components/ui/ProductTile'
import styles from './PrivacidadeContent.module.css'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade e tratamento de dados pessoais da pierrondi.dev e do Pierrondi Shorts, em conformidade com a LGPD.',
  alternates: {
    canonical: '/privacidade',
    languages: {
      'pt-BR': '/privacidade',
      'en-US': '/privacy',
    },
  },
  robots: { index: true, follow: true },
}

export default function PrivacidadePage() {
  return (
    <>
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow="Legal"
          headline="Política de Privacidade."
          headlineLevel="h1"
          tagline="Atualizada em abril de 2026 · Em conformidade com a LGPD"
        />

        <ProductTile variant="dark" as="div">
          <div className={styles.prose}>
            <h2>1. Quem somos</h2>
            <p>
              A <strong>pierrondi.dev</strong> é uma agência de tecnologia que oferece automação de processos, desenvolvimento de produtos digitais (MVPs) e consultoria técnica (CTO fracionado) para PMEs, startups e infoprodutores no Brasil.
            </p>
            <p>
              O <strong>Pierrondi Shorts</strong> é um aplicativo operado pela pierrondi.dev para criar, gerenciar e publicar
              vídeos curtos por meio de integrações oficiais, incluindo TikTok quando o usuário conecta sua conta de forma
              explícita.
            </p>

            <h2>2. Dados que coletamos</h2>
            <p>Coletamos apenas os dados que você fornece voluntariamente pelo formulário de contato:</p>
            <ul>
              <li>Nome</li>
              <li>Email</li>
              <li>Empresa (opcional)</li>
              <li>Serviço de interesse</li>
              <li>Mensagem</li>
              <li>Dados de conta autorizados por OAuth, como identificador público, status da integração e permissões concedidas ao conectar TikTok ou outro provedor oficial.</li>
            </ul>
            <p>Não coletamos dados de navegação, cookies de rastreamento ou informações de dispositivo sem seu consentimento explícito.</p>

            <h2>3. Finalidade do tratamento</h2>
            <p>Os dados coletados são utilizados exclusivamente para:</p>
            <ul>
              <li>Responder sua solicitação de contato</li>
              <li>Enviar proposta comercial, se solicitada</li>
              <li>Agendar diagnóstico técnico gratuito</li>
              <li>Operar o Pierrondi Shorts e integrações oficiais de publicação ou gestão de conteúdo, sempre mediante consentimento e configuração explícita.</li>
            </ul>
            <p>Não vendemos, compartilhamos ou cedemos seus dados a terceiros para fins de marketing.</p>

            <h2>4. Base legal (LGPD Art. 7)</h2>
            <p>
              O tratamento dos seus dados é baseado no seu <strong>consentimento</strong> (ao enviar o formulário) e no <strong>legítimo interesse</strong> da pierrondi.dev em responder solicitações comerciais.
            </p>

            <h2>5. Processadores de dados</h2>
            <p>Utilizamos os seguintes serviços para processar dados:</p>
            <ul>
              <li><strong>Formspree</strong> — processamento do formulário de contato (<a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política deles</a>)</li>
              <li><strong>Railway</strong> — hospedagem do site</li>
              <li><strong>TikTok</strong> — autenticação OAuth e APIs oficiais quando você conecta sua conta ao Pierrondi Shorts</li>
            </ul>

            <h2>6. Prazo de retenção</h2>
            <p>
              Os dados do formulário são mantidos por no máximo <strong>6 meses</strong> após o último contato. Após esse prazo, são excluídos automaticamente, a menos que exista relação comercial ativa.
            </p>

            <h2>7. Seus direitos (LGPD Art. 18)</h2>
            <p>Você tem direito a:</p>
            <ul>
              <li>Confirmar se tratamos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar exclusão dos dados</li>
              <li>Revogar consentimento a qualquer momento</li>
            </ul>
            <p>Para exercer qualquer direito, entre em contato pelo email abaixo.</p>

            <h2>8. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo: HTTPS em todas as conexões, headers de segurança (CSP, HSTS), e acesso restrito aos dados coletados.
            </p>

            <h2>9. Contato</h2>
            <p>Para dúvidas ou solicitações sobre privacidade:</p>
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
