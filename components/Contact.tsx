'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Contact.module.css'

interface FormErrors {
  nome?: string
  email?: string
  mensagem?: string
  servico?: string
}

interface ContactProps {
  lang?: Lang
}

export default function Contact({ lang = 'pt' }: ContactProps) {
  const t = home[lang].contact
  const sectionId = lang === 'en' ? 'contact' : 'contato'
  const router = useRouter()
  const hasTrackedStart = useRef(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [servico, setServico] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [trackingContext, setTrackingContext] = useState({
    landingPage: '',
    campaignId: '',
    thesisId: '',
    referrer: '',
    utmSource: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    setTrackingContext({
      landingPage: window.location.pathname,
      campaignId: url.searchParams.get('utm_campaign') || '',
      thesisId: url.searchParams.get('thesisId') || url.searchParams.get('thesis') || '',
      referrer: document.referrer || '',
      utmSource: url.searchParams.get('utm_source') || '',
    })
  }, [])

  function validate(): FormErrors {
    const nextErrors: FormErrors = {}
    if (!nome.trim()) nextErrors.nome = t.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t.errors.email
    if (!servico) nextErrors.servico = t.errors.service
    if (!mensagem.trim()) nextErrors.mensagem = t.errors.message
    return nextErrors
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, empresa, servico, mensagem, trackingContext, _gotcha: '' }),
      })

      if (!response.ok) throw new Error('Submit failed')

      trackEvent('Contact_Submitted', {
        service: servico,
        landingPage: trackingContext.landingPage,
        campaignId: trackingContext.campaignId,
        thesisId: trackingContext.thesisId,
        utm_source: trackingContext.utmSource,
      })

      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => router.push('/obrigado'), 900)
    } catch {
      setIsLoading(false)
      setSubmitError(t.fields.submitError)
      setTimeout(() => setSubmitError(''), 3000)
    }
  }

  return (
    <section className={styles.section} id={sectionId}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>

        <div className={styles.contactGrid}>
        <div className={styles.contactPitch} data-animate>
          <h2 className={styles.contactHeadline}>
            {t.titleLines[0]}<br />
            {t.titleLines[1]}<br />
            {t.titleLines[2]}<em>{t.titleEm}</em>
          </h2>
          <p className={styles.contactBody}>{t.body}</p>
          <ul className={styles.pointList}>
            {t.points.map((point) => (
              <li key={point} className={styles.pointItem}>{point}</li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          onFocusCapture={() => {
            if (hasTrackedStart.current) return
            hasTrackedStart.current = true
            trackEvent('Contact_Started', {
              service: servico || 'unknown',
              landingPage: trackingContext.landingPage,
              campaignId: trackingContext.campaignId,
              thesisId: trackingContext.thesisId,
            })
          }}
          noValidate
          className={styles.contactForm}
          data-animate
          style={{ '--delay': '0.12s' } as React.CSSProperties}
        >
          <div className={styles.fields}>
            <div>
              <label htmlFor="nome" className={styles.label}>{t.fields.name}</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={t.fields.namePlaceholder}
                aria-describedby={errors.nome ? 'nome-error' : undefined}
                aria-invalid={errors.nome ? 'true' : 'false'}
                className={styles.input}
              />
              {errors.nome && <span id="nome-error" role="alert" className={styles.error}>{errors.nome}</span>}
            </div>

            <div>
              <label htmlFor="email" className={styles.label}>{t.fields.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.fields.emailPlaceholder}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
                className={styles.input}
              />
              {errors.email && <span id="email-error" role="alert" className={styles.error}>{errors.email}</span>}
            </div>

            <div>
              <label htmlFor="empresa" className={styles.label}>{t.fields.company}</label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder={t.fields.companyPlaceholder}
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="servico" className={styles.label}>{t.fields.service}</label>
              <select
                id="servico"
                name="servico"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                aria-describedby={errors.servico ? 'servico-error' : undefined}
                aria-invalid={errors.servico ? 'true' : 'false'}
                className={styles.input}
              >
                <option value="" disabled>{t.fields.serviceDefault}</option>
                {t.fields.serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.servico && <span id="servico-error" role="alert" className={styles.error}>{errors.servico}</span>}
            </div>

            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className={styles.fullWidth}>
              <label htmlFor="mensagem" className={styles.label}>{t.fields.message}</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder={t.fields.messagePlaceholder}
                rows={5}
                aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
                aria-invalid={errors.mensagem ? 'true' : 'false'}
                className={`${styles.input} ${styles.textarea}`}
              />
              {errors.mensagem && <span id="mensagem-error" role="alert" className={styles.error}>{errors.mensagem}</span>}
            </div>

            <div className={`${styles.fullWidth} ${styles.submitRow}`}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoading || isSuccess}
              >
                {isSuccess ? t.fields.submitOk : isLoading ? t.fields.submitting : submitError || t.fields.submit}
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </section>
  )
}
