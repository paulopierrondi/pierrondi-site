'use client'

import { useMemo, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import styles from './page.module.css'

interface FormErrors {
  nome?: string
  email?: string
  mensagem?: string
}

export default function HomeContactForm() {
  const startedRef = useRef(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const trackingContext = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        landingPage: '/',
        campaignId: '',
        thesisId: '',
        referrer: '',
        utmSource: '',
      }
    }

    const url = new URL(window.location.href)
    return {
      landingPage: window.location.pathname,
      campaignId: url.searchParams.get('utm_campaign') || '',
      thesisId: url.searchParams.get('thesisId') || url.searchParams.get('thesis') || '',
      referrer: document.referrer || '',
      utmSource: url.searchParams.get('utm_source') || '',
    }
  }, [])

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('Contato via pierrondi.dev')
    const body = encodeURIComponent(
      [
        `Nome: ${nome.trim()}`,
        `Email: ${email.trim()}`,
        `Empresa/contexto: ${empresa.trim() || 'Nao informado'}`,
        '',
        mensagem.trim() || 'Quero conversar sobre...',
      ].join('\n')
    )

    return `mailto:pierrondi@gmail.com?subject=${subject}&body=${body}`
  }, [email, empresa, mensagem, nome])

  function validate() {
    const nextErrors: FormErrors = {}
    if (!nome.trim()) nextErrors.nome = 'Me diga seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Use um email valido.'
    if (!mensagem.trim()) nextErrors.mensagem = 'Me diga o contexto da conversa.'
    return nextErrors
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setStatus('idle')
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          empresa,
          servico: 'portfolio-executivo-ai',
          mensagem,
          trackingContext,
          _gotcha: '',
        }),
      })

      if (!response.ok) throw new Error('contact_failed')

      trackEvent('Executive_Contact_Submitted', {
        landingPage: trackingContext.landingPage,
        utm_source: trackingContext.utmSource,
      })

      setStatus('success')
      setNome('')
      setEmail('')
      setEmpresa('')
      setMensagem('')
    } catch {
      setStatus('error')
      window.location.href = mailtoHref
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className={styles.contactForm}
      data-swarm-reveal
      data-swarm-tilt
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      noValidate
      onFocusCapture={() => {
        if (startedRef.current) return
        startedRef.current = true
        trackEvent('Executive_Contact_Started', {
          landingPage: trackingContext.landingPage,
          utm_source: trackingContext.utmSource,
        })
      }}
    >
      <input type="hidden" name="servico" value="portfolio-executivo-ai" />
      <input type="hidden" name="landingPage" value={trackingContext.landingPage} />
      <input type="hidden" name="campaignId" value={trackingContext.campaignId} />
      <input type="hidden" name="thesisId" value={trackingContext.thesisId} />
      <input type="hidden" name="referrer" value={trackingContext.referrer} />
      <input type="hidden" name="utmSource" value={trackingContext.utmSource} />

      <div className={styles.contactField}>
        <label htmlFor="home-contact-name">Nome</label>
        <input
          id="home-contact-name"
          name="nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Seu nome"
          autoComplete="name"
          aria-invalid={errors.nome ? 'true' : 'false'}
          aria-describedby={errors.nome ? 'home-contact-name-error' : undefined}
        />
        {errors.nome && (
          <span id="home-contact-name-error" role="alert">
            {errors.nome}
          </span>
        )}
      </div>

      <div className={styles.contactField}>
        <label htmlFor="home-contact-email">Email</label>
        <input
          id="home-contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@empresa.com"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'home-contact-email-error' : undefined}
        />
        {errors.email && (
          <span id="home-contact-email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={`${styles.contactField} ${styles.contactFieldFull}`}>
        <label htmlFor="home-contact-company">Empresa ou contexto</label>
        <input
          id="home-contact-company"
          name="empresa"
          type="text"
          value={empresa}
          onChange={(event) => setEmpresa(event.target.value)}
          placeholder="Empresa, fundo, time ou oportunidade"
          autoComplete="organization"
        />
      </div>

      <div className={`${styles.contactField} ${styles.contactFieldFull}`}>
        <label htmlFor="home-contact-message">Mensagem</label>
        <textarea
          id="home-contact-message"
          name="mensagem"
          value={mensagem}
          onChange={(event) => setMensagem(event.target.value)}
          placeholder="Quero conversar sobre..."
          rows={5}
          aria-invalid={errors.mensagem ? 'true' : 'false'}
          aria-describedby={errors.mensagem ? 'home-contact-message-error' : undefined}
        />
        {errors.mensagem && (
          <span id="home-contact-message-error" role="alert">
            {errors.mensagem}
          </span>
        )}
      </div>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />

      <div className={`${styles.contactFieldFull} ${styles.contactSubmitRow}`}>
        <button type="submit" disabled={isLoading} data-swarm-magnetic>
          {isLoading ? 'Enviando...' : 'Enviar email'}
        </button>
        <a href={mailtoHref}>pierrondi@gmail.com</a>
      </div>

      {status === 'success' && (
        <p className={styles.contactStatus} role="status">
          Recebi. Vou responder pelo email informado.
        </p>
      )}
      {status === 'error' && (
        <p className={styles.contactStatus} data-error="true" role="alert">
          Nao consegui enviar pelo formulario. Abri um email direto; se nao abrir, use{' '}
          <a href={mailtoHref}>pierrondi@gmail.com</a>.
        </p>
      )}
    </form>
  )
}
