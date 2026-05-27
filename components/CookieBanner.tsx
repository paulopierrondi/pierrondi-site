'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const suppressed =
    pathname === '/' ||
    pathname === '/paulo' ||
    pathname?.startsWith('/apps') ||
    pathname?.startsWith('/studio') ||
    pathname?.startsWith('/bradesco-26')

  useEffect(() => {
    if (suppressed) return
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [suppressed])

  function accept(level: 'all' | 'essential') {
    localStorage.setItem('cookie-consent', level)
    setVisible(false)
    if (level === 'all') {
      window.dispatchEvent(new Event('cookie-consent-granted'))
    }
  }

  if (!visible || suppressed) return null

  return (
    <>
      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9998;
          background: var(--color-surface-card);
          border-top: 1px solid var(--color-hairline);
          padding: 20px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          animation: slideUp 0.4s ease;
        }
        .cookie-text {
          font-family: var(--font-system);
          font-size: 13px;
          color: var(--color-body);
          line-height: 1.6;
          flex: 1;
        }
        .cookie-text a {
          color: var(--color-accent-cyan);
          text-decoration: none;
        }
        .cookie-text a:hover { text-decoration: underline; }
        .cookie-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }
        .cookie-btn {
          font-family: var(--font-system);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 10px 20px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .cookie-btn:hover { opacity: 0.8; }
        .cookie-btn-accept {
          background: var(--color-primary);
          color: var(--color-on-primary);
        }
        .cookie-btn-essential {
          background: transparent;
          color: var(--color-muted);
          border: 1px solid var(--color-hairline);
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          .cookie-banner {
            flex-direction: column;
            padding: 20px 24px;
            gap: 16px;
          }
          .cookie-actions {
            width: 100%;
          }
          .cookie-btn {
            flex: 1;
          }
        }
      `}</style>

      <div className="cookie-banner" role="dialog" aria-label="Consentimento de cookies">
        <p className="cookie-text">
          Usamos cookies para melhorar sua experiência e medir performance.
          Leia nossa <a href="/privacidade">Política de Privacidade</a>.
        </p>
        <div className="cookie-actions">
          <button className="cookie-btn cookie-btn-essential" onClick={() => accept('essential')}>
            Apenas essenciais
          </button>
          <button className="cookie-btn cookie-btn-accept" onClick={() => accept('all')}>
            Aceitar todos
          </button>
        </div>
      </div>
    </>
  )
}
