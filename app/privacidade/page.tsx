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
  robots: { index: true, follow: true },
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
          Coletamos apenas o que você envia ativamente: nome, email e a mensagem
          escrita ao entrar em contato por formulário, email, LinkedIn ou
          WhatsApp. Não usamos rastreamento publicitário invasivo.
        </p>

        <h2>2. Para que usamos</h2>
        <p>
          Usamos seus dados exclusivamente para responder ao contato e dar
          seguimento à conversa. Não vendemos, alugamos nem compartilhamos seus
          dados com terceiros para fins de marketing.
        </p>

        <h2>3. Por quanto tempo guardamos</h2>
        <p>
          Mantemos dados de contato pelo tempo necessário para a conversa ou
          projeto, e podemos manter registros mínimos para obrigações fiscais,
          contratuais ou de segurança. Você pode pedir exclusão a qualquer
          momento.
        </p>

        <h2>4. Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados
          escrevendo para <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
          Respondemos em prazo razoável.
        </p>

        <h2>5. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger
          seus dados. Nenhum sistema é 100% imune, mas tratamos sua informação
          com o mesmo rigor de governança aplicado aos projetos.
        </p>

        <h2>6. Contato</h2>
        <p>
          Dúvidas sobre privacidade? Escreva para{' '}
          <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
        </p>
    </LegalDocument>
  )
}
