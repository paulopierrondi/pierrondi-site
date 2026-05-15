'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { home, type Lang } from '@/lib/i18n/home-copy'

interface MobileCTAProps {
  lang?: Lang
}

export default function MobileCTA({ lang = 'pt' }: MobileCTAProps) {
  const text = home[lang].mobileCta
  const contactAnchor = lang === 'en' ? '/en#contact' : '/#contato'
  const contactId = lang === 'en' ? 'contact' : 'contato'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const contactSection = document.getElementById(contactId)

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const contactVisible = contactSection?.getBoundingClientRect()
      const contactInView = contactVisible && contactVisible.top < window.innerHeight && contactVisible.bottom > 0
      setVisible(scrollPercent > 0.3 && !contactInView)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [contactId])

  return (
    <>
      <style>{`
        .mobile-cta {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-cta {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9997;
            height: 64px;
            background: var(--color-primary);
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.35s ease;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
          }
          .mobile-cta[data-hidden="true"] {
            transform: translateY(100%);
          }
          .mobile-cta-text {
            font-family: var(--font-system);
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.04em;
            color: var(--color-on-primary);
          }
        }
      `}</style>
      <Link href={contactAnchor} className="mobile-cta" data-hidden={!visible}>
        <span className="mobile-cta-text">{text}</span>
      </Link>
    </>
  )
}
