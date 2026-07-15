'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import { COPY } from '../copy'
import type { SectionProps } from '../types'
import { trackEvent } from '@/lib/analytics'
import { CONTACT, getWhatsAppHref } from '@/lib/contact'
import styles from './ContactSection.module.css'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactSection({ lang }: SectionProps) {
  const copy = COPY[lang].contact
  const whatsapp = lang === 'pt'
    ? {
        kicker: 'Canal mais direto',
        action: 'Chamar Paulo no WhatsApp',
        detail: 'Para começar uma conversa agora',
        href: getWhatsAppHref('Olá, Paulo! Vim pelo seu site e quero conversar sobre IA, produtos ou sistemas.'),
      }
    : {
        kicker: 'Most direct channel',
        action: 'Message Paulo on WhatsApp',
        detail: 'To start a conversation now',
        href: getWhatsAppHref('Hi Paulo! I found your site and would like to discuss AI, products, or operating systems.'),
      }
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useHydratedReducedMotion()
  const isInView = useInView(containerRef, { margin: '-20% 0px', once: false })

  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  const baseVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const formVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (formStatus === 'submitting') return

      const form = event.currentTarget
      const formData = new FormData(form)
      const nome = String(formData.get('nome') ?? '').trim()
      const email = String(formData.get('email') ?? '').trim()
      const mensagem = String(formData.get('mensagem') ?? '').trim()
      const gotcha = String(formData.get('_gotcha') ?? '').trim()

      setFormStatus('submitting')

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, mensagem, _gotcha: gotcha }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        setFormStatus('success')
        trackEvent('Contact_Form_Submitted', { form: 'home_v2', language: lang })
        form.reset()
      } catch {
        setFormStatus('error')
        trackEvent('Contact_Form_Error', { form: 'home_v2', language: lang })
      }
    },
    [formStatus, lang]
  )

  const statusIcon = formStatus === 'success' ? '$' : '>'

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <motion.div
            className={styles.column}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div className={styles.terminalHeader} variants={baseVariants}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>contact --init</span>
            </motion.div>

            <motion.h2 className={styles.title} variants={baseVariants}>
              <span className={styles.bracket}>[</span>
              {copy.heading}
              <span className={styles.bracket}>]</span>
            </motion.h2>

            <motion.p className={styles.intro} variants={baseVariants}>
              {copy.intro}
            </motion.p>

            <motion.a
              className={styles.whatsappCard}
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={baseVariants}
              onClick={() => trackEvent('Contact_WhatsApp_Clicked', { source: 'home_v2', language: lang })}
            >
              <span className={styles.whatsappHeader}>
                <span>{whatsapp.kicker}</span>
                <span className={styles.whatsappStatus}>online</span>
              </span>
              <span className={styles.whatsappContent}>
                <span>
                  <strong>WhatsApp</strong>
                  <small>{CONTACT.whatsapp.display} · {whatsapp.detail}</small>
                </span>
                <span className={styles.whatsappArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.whatsappAction}>{whatsapp.action}</span>
            </motion.a>

            <motion.div className={styles.emailCard} variants={baseVariants}>
              <div className={styles.emailCardHeader}>
                <span className={styles.emailCardLabel}>Email</span>
                <span className={styles.emailCardStatus}>online</span>
              </div>
              <a
                className={styles.emailLink}
                href={`mailto:${copy.email}`}
              >
                {copy.email}
              </a>
            </motion.div>

            <motion.div
              className={styles.socialLinks}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {copy.links.map((link) => (
                <motion.a
                  key={link.href}
                  className={styles.socialLink}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={baseVariants}
                >
                  <span className={styles.socialPrompt}>$</span>
                  <span>{link.label}</span>
                  <span className={styles.socialArrow} aria-hidden="true">
                    ↗
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.column}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={formVariants}
          >
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <div className={styles.windowControls}>
                  <span className={`${styles.control} ${styles.controlClose}`} aria-hidden="true" />
                  <span className={`${styles.control} ${styles.controlMinimize}`} aria-hidden="true" />
                  <span className={`${styles.control} ${styles.controlMaximize}`} aria-hidden="true" />
                </div>
                <span className={styles.formTitle}>send_message.sh</span>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="nome" className={styles.label}>
                    {copy.form.nameLabel}
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    className={styles.input}
                    placeholder={copy.form.namePlaceholder}
                    required
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>
                    {copy.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder={copy.form.emailPlaceholder}
                    required
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="mensagem" className={styles.label}>
                    {copy.form.messageLabel}
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    className={styles.textarea}
                    placeholder={copy.form.messagePlaceholder}
                    required
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <input
                  type="text"
                  name="_gotcha"
                  className={styles.honeypot}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  defaultValue=""
                />

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      <span>...</span>
                    </>
                  ) : (
                    <>
                      <span>$</span>
                      <span>{copy.form.submitLabel}</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className={`${styles.message} ${styles.successMessage}`} role="status" aria-live="polite">
                    <span aria-hidden="true">{statusIcon}</span>
                    <span>{copy.form.successMessage}</span>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className={`${styles.message} ${styles.errorMessage}`} role="alert" aria-live="assertive">
                    <span aria-hidden="true">{statusIcon}</span>
                    <span>{copy.form.errorMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLine}>{copy.footer.line}</span>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            {copy.footer.nav.map((item) => (
              <a key={item.href} className={styles.footerNavLink} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  )
}
