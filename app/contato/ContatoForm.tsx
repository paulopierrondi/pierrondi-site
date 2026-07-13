'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import styles from './Contato.module.css'

interface Labels {
  name: string
  email: string
  message: string
  placeholderName: string
  placeholderEmail: string
  placeholderMessage: string
  submit: string
  submitting: string
  ok: string
  error: string
}

export default function ContatoForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          nome: formData.get('nome'),
          email: formData.get('email'),
          mensagem: formData.get('mensagem'),
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        setStatus('ok')
        trackEvent('Contact_Form_Submitted', { form: 'contato_page' })
        form.reset()
      } else {
        setStatus('error')
        trackEvent('Contact_Form_Error', { form: 'contato_page', status: res.status })
      }
    } catch {
      setStatus('error')
      trackEvent('Contact_Form_Error', { form: 'contato_page', status: 'network' })
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span className={styles.label}>{labels.name}</span>
        <input type="text" name="nome" required placeholder={labels.placeholderName} />
      </label>
      <label>
        <span className={styles.label}>{labels.email}</span>
        <input type="email" name="email" required placeholder={labels.placeholderEmail} />
      </label>
      <label>
        <span className={styles.label}>{labels.message}</span>
        <textarea
          name="mensagem"
          required
          rows={5}
          placeholder={labels.placeholderMessage}
        />
      </label>
      <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
        {status === 'submitting' ? labels.submitting : labels.submit}
        <span aria-hidden="true">→</span>
      </button>
      {status === 'ok' && (
        <p className={styles.feedbackOk}>{labels.ok}</p>
      )}
      {status === 'error' && (
        <p className={styles.feedbackError}>{labels.error}</p>
      )}
    </form>
  )
}
