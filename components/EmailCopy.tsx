'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

type Props = {
  email: string
  label?: string
}

export default function EmailCopy({ email, label }: Props) {
  const [copied, setCopied] = useState(false)

  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      trackEvent('email_copied', { email })
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }, [email])

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Copiar email ${email}`}
        className="email-copy-btn"
      >
        <span className="email-copy-text">{label ?? email}</span>
        <span className="email-copy-icon" aria-hidden="true">
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7.5L6 10.5L11 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 3V1.75A.75.75 0 015.75 1h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75H11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          )}
        </span>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="email-copy-toast"
          >
            <span className="email-copy-toast-dot" />
            Email copiado
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .email-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-system);
          font-size: 13px;
          letter-spacing: -0.12px;
          color: var(--color-ink);
          background: transparent;
          border: 1px solid var(--color-hairline);
          padding: 10px 16px;
          border-radius: 9999px;
          cursor: pointer;
          transition: border-color 0.2s ease-out, color 0.2s ease-out, background 0.2s ease-out;
          min-height: 40px;
        }
        .email-copy-btn:hover {
          border-color: var(--color-accent-cyan);
          color: var(--color-accent-cyan);
          background: rgba(0,212,255,0.04);
        }
        .email-copy-btn:focus-visible {
          outline: 2px solid var(--color-primary-focus);
          outline-offset: 3px;
        }
        .email-copy-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          color: currentColor;
          opacity: 0.7;
        }
        .email-copy-toast {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 10000;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-system);
          font-size: 13px;
          letter-spacing: -0.12px;
          color: var(--color-on-primary);
          background: var(--color-primary);
          padding: 12px 18px;
          border-radius: 9999px;
          box-shadow: 0 14px 44px -10px rgba(0,7,205,0.4), 0 2px 8px rgba(0,0,0,0.15);
          font-weight: 600;
        }
        .email-copy-toast-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-on-primary);
        }
        @media (max-width: 480px) {
          .email-copy-toast { right: 16px; bottom: 16px; font-size: 12px; padding: 10px 14px; }
        }
      `}</style>
    </>
  )
}
