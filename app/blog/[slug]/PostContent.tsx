'use client'

import { useEffect, useRef } from 'react'
import styles from './PostContent.module.css'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = ref.current.querySelectorAll(`.${styles.postBody} h2`)
    els.forEach((el) => {
      ;(el as HTMLElement).style.opacity = '0'
      ;(el as HTMLElement).style.transform = 'translateY(16px)'
      ;(el as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={styles.postBody}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
