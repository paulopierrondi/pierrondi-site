import Reveal from '@/components/Reveal'
import ContatoForm from './ContatoForm'
import styles from './Contato.module.css'

export type ContatoLang = 'pt' | 'en'

const copy: Record<ContatoLang, {
  channels: Array<{ label: string; value: string; href: string; icon: React.ReactNode }>
  creds: { response: string; timezone: string; kResponse: string; kTimezone: string }
  formLabels: { name: string; email: string; message: string; placeholderName: string; placeholderEmail: string; placeholderMessage: string; submit: string; submitting: string; ok: string; error: string }
}> = {
  pt: {
    channels: [
      {
        label: 'LinkedIn',
        value: 'in/paulopierrondi',
        href: 'https://br.linkedin.com/in/paulopierrondi',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        label: 'Email',
        value: 'pierrondi@gmail.com',
        href: 'mailto:pierrondi@gmail.com',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        ),
      },
      {
        label: 'WhatsApp',
        value: '+55 12 98205-1155',
        href: 'https://wa.me/5512982051155',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        ),
      },
    ],
    creds: { response: 'Em até 48h', timezone: 'São Paulo / BRT', kResponse: 'Resposta', kTimezone: 'Fuso' },
    formLabels: {
      name: 'Nome',
      email: 'Email',
      message: 'Sobre o que você quer falar?',
      placeholderName: 'Como devo te chamar?',
      placeholderEmail: 'seu@email.com',
      placeholderMessage: 'IA enterprise, ServiceNow, AgentOps, estratégia...',
      submit: 'Enviar mensagem',
      submitting: 'Enviando...',
      ok: 'Mensagem enviada. Entro em contato em breve.',
      error: 'Erro ao enviar. Tente o email direto.',
    },
  },
  en: {
    channels: [
      {
        label: 'LinkedIn',
        value: 'in/paulopierrondi',
        href: 'https://br.linkedin.com/in/paulopierrondi',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        label: 'Email',
        value: 'pierrondi@gmail.com',
        href: 'mailto:pierrondi@gmail.com',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        ),
      },
      {
        label: 'WhatsApp',
        value: '+55 12 98205-1155',
        href: 'https://wa.me/5512982051155',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        ),
      },
    ],
    creds: { response: 'Within 48h', timezone: 'São Paulo / BRT', kResponse: 'Reply', kTimezone: 'Timezone' },
    formLabels: {
      name: 'Name',
      email: 'Email',
      message: 'What do you want to talk about?',
      placeholderName: 'What should I call you?',
      placeholderEmail: 'you@email.com',
      placeholderMessage: 'Enterprise AI, ServiceNow, AgentOps, strategy...',
      submit: 'Send message',
      submitting: 'Sending...',
      ok: 'Message sent. I will get back to you soon.',
      error: 'Failed to send. Please try email directly.',
    },
  },
}

export default function ContatoPageContent({ lang }: { lang: ContatoLang }) {
  const c = copy[lang]
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Reveal>
          <div className={styles.channels}>
            {c.channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className={styles.channel}
              >
                <span className={styles.icon}>{channel.icon}</span>
                <span className={styles.label}>{channel.label}</span>
                <span className={styles.value}>{channel.value}</span>
              </a>
            ))}

            <div className={styles.creds}>
              <div className={styles.cred}>
                <span className={styles.credK}>{c.creds.kResponse}</span>
                <span className={styles.credV}>{c.creds.response}</span>
              </div>
              <div className={styles.cred}>
                <span className={styles.credK}>{c.creds.kTimezone}</span>
                <span className={styles.credV}>{c.creds.timezone}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ContatoForm labels={c.formLabels} />
        </Reveal>
      </div>
    </main>
  )
}
