import type { Metadata } from 'next'
import LegalDocument from '@/components/LegalDocument'

export const metadata: Metadata = {
  title: 'Privacidade',
  description: 'Como a pierrondi.dev trata dados de contato no site pessoal de Paulo Pierrondi.',
  alternates: {
    canonical: '/privacidade',
    languages: {
      'pt-BR': '/privacidade',
      'en-US': '/privacy',
    },
  },
  robots: { index: false, follow: true },
}

export default function PrivacidadePage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacidade."
      lead={
        <>
        Como tratamos seus dados quando você fala com a pierrondi.dev. Direto,
        sem juridiquês desnecessário.
        </>
      }
    >
        <p>Última atualização: junho de 2026.</p>

        <h2>1. Quais dados coletamos</h2>
        <p>
          Coletamos nome, email e a mensagem que você envia ativamente por
          formulário, email, LinkedIn ou WhatsApp. Quando analytics está
          configurado, o site também pode processar dados agregados de navegação
          e informações técnicas necessárias para medir confiabilidade e
          desempenho do conteúdo.
        </p>

        <h2>2. Para que usamos</h2>
        <p>
          Usamos seus dados exclusivamente para responder ao contato e dar
          seguimento à conversa. Não vendemos, alugamos nem compartilhamos seus
          dados com terceiros para fins de marketing.
        </p>

        <h2>3. Cookies, armazenamento local e analytics</h2>
        <p>
          O site guarda sua preferência de cookies no armazenamento local do
          navegador. Plausible pode ser usado para medição agregada e focada em
          privacidade. Google Analytics só é carregado depois que você escolhe
          &quot;Aceitar todos&quot;, com anonimização de IP solicitada na
          configuração do site. Ao escolher &quot;Apenas essenciais&quot;, o
          Google Analytics permanece desativado.
        </p>

        <h2>4. Por quanto tempo guardamos</h2>
        <p>
          Mantemos dados de contato pelo tempo necessário para a conversa ou
          projeto, e podemos manter registros mínimos para obrigações fiscais,
          contratuais ou de segurança. Provedores de analytics seguem os
          períodos de retenção configurados em seus próprios serviços. Você pode
          pedir exclusão dos dados de contato a qualquer momento.
        </p>

        <h2>5. Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados
          escrevendo para <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
          Respondemos em prazo razoável.
        </p>

        <h2>6. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger
          seus dados. Nenhum sistema é 100% imune, mas tratamos sua informação
          com o mesmo rigor de governança aplicado aos projetos.
        </p>

        <h2>7. Contato</h2>
        <p>
          Dúvidas sobre privacidade? Escreva para{' '}
          <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
        </p>
    </LegalDocument>
  )
}
