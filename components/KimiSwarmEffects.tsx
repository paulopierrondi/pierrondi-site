'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

type Particle = {
  life: number
  maxLife: number
  opacity: number
  size: number
  vx: number
  vy: number
  x: number
  y: number
}

const MAX_PARTICLES = 28

export default function KimiSwarmEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const swarmRoot = document.querySelector<HTMLElement>('[data-swarm-root]')
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-swarm-reveal]'))
    const tiltItems = Array.from(document.querySelectorAll<HTMLElement>('[data-swarm-tilt]'))
    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>('[data-swarm-magnetic]'))

    swarmRoot?.classList.add('swarm-enhanced', 'swarm-gsap-ready')

    let lenis: Lenis | null = null
    let lenisTicker: ((time: number) => void) | null = null

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.08,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      })
      lenis.on('scroll', ScrollTrigger.update)
      lenisTicker = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(lenisTicker)
      gsap.ticker.lagSmoothing(0)
    }

    const gsapContext = gsap.context(() => {
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.28,
          },
        })
      }

      if (reducedMotion) {
        revealItems.forEach((item) => item.classList.add('is-visible'))
        if (revealItems.length > 0) {
          gsap.set(revealItems, { autoAlpha: 1, clearProps: 'transform,filter' })
        }
        return
      }

      revealItems.forEach((item) => {
        const delay = Number(item.dataset.revealDelay || 0) * 0.055
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 34, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            delay,
            ease: 'power3.out',
            onStart: () => item.classList.add('is-visible'),
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    }, document.body)

    const refreshScrollTrigger = window.setTimeout(() => ScrollTrigger.refresh(), 250)

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      root.style.setProperty('--swarm-x', x.toFixed(4))
      root.style.setProperty('--swarm-y', y.toFixed(4))
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    const tiltCleanups = tiltItems.map((item) => {
      const handleMove = (event: PointerEvent) => {
        if (reducedMotion || event.pointerType === 'touch') return
        const rect = item.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        const rotateX = (y - 0.5) * -7
        const rotateY = (x - 0.5) * 7

        item.dataset.tiltActive = 'true'
        item.style.setProperty('--swarm-tilt-x', `${(x * 100).toFixed(2)}%`)
        item.style.setProperty('--swarm-tilt-y', `${(y * 100).toFixed(2)}%`)
        item.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
      }

      const handleLeave = () => {
        item.dataset.tiltActive = 'false'
        item.style.transform = ''
      }

      item.addEventListener('pointermove', handleMove, { passive: true })
      item.addEventListener('pointerleave', handleLeave)
      return () => {
        item.removeEventListener('pointermove', handleMove)
        item.removeEventListener('pointerleave', handleLeave)
      }
    })

    const magneticCleanups = magneticItems.map((item) => {
      const handleMove = (event: PointerEvent) => {
        if (reducedMotion || event.pointerType === 'touch') return
        const rect = item.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        item.style.setProperty('--swarm-magnet-x', `${(dx * 0.12).toFixed(2)}px`)
        item.style.setProperty('--swarm-magnet-y', `${(dy * 0.12).toFixed(2)}px`)
      }

      const handleLeave = () => {
        item.style.setProperty('--swarm-magnet-x', '0px')
        item.style.setProperty('--swarm-magnet-y', '0px')
      }

      item.addEventListener('pointermove', handleMove, { passive: true })
      item.addEventListener('pointerleave', handleLeave)
      return () => {
        item.removeEventListener('pointermove', handleMove)
        item.removeEventListener('pointerleave', handleLeave)
      }
    })

    let animationFrame = 0
    let trailActive = true
    const particles: Particle[] = []
    const pointer = { x: -100, y: -100, previousX: -100, previousY: -100 }
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const canDrawTrail = Boolean(canvas && context && !reducedMotion && !('ontouchstart' in window))

    const resizeCanvas = () => {
      if (!canvas) return
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context?.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const spawnParticles = (event: PointerEvent) => {
      pointer.previousX = pointer.x
      pointer.previousY = pointer.y
      pointer.x = event.clientX
      pointer.y = event.clientY

      const dx = pointer.x - pointer.previousX
      const dy = pointer.y - pointer.previousY
      const distance = Math.hypot(dx, dy)
      if (distance < 8) return

      const count = Math.min(3, Math.floor(distance / 14))
      for (let i = 0; i < count; i += 1) {
        if (particles.length >= MAX_PARTICLES) particles.shift()
        const t = count === 1 ? 1 : i / (count - 1)
        particles.push({
          x: pointer.previousX + dx * t,
          y: pointer.previousY + dy * t,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1.6 + Math.random() * 2.4,
          opacity: 0.62,
          life: 0,
          maxLife: 28 + Math.random() * 28,
        })
      }
    }

    const drawParticles = () => {
      if (!trailActive || !canvas || !context) return
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.life += 1
        if (particle.life >= particle.maxLife) {
          particles.splice(index, 1)
          continue
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.98
        particle.vy *= 0.98

        const lifeRatio = 1 - particle.life / particle.maxLife
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(74,222,128,${particle.opacity * lifeRatio})`
        context.shadowBlur = 18
        context.shadowColor = 'rgba(74,222,128,0.46)'
        context.fill()
      }

      animationFrame = requestAnimationFrame(drawParticles)
    }

    if (canDrawTrail) {
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      window.addEventListener('pointermove', spawnParticles, { passive: true })
      animationFrame = requestAnimationFrame(drawParticles)
    }

    return () => {
      window.clearTimeout(refreshScrollTrigger)
      gsapContext.revert()
      if (lenisTicker) gsap.ticker.remove(lenisTicker)
      lenis?.destroy()
      window.removeEventListener('pointermove', handlePointerMove)
      tiltCleanups.forEach((cleanup) => cleanup())
      magneticCleanups.forEach((cleanup) => cleanup())
      if (canDrawTrail) {
        trailActive = false
        window.removeEventListener('resize', resizeCanvas)
        window.removeEventListener('pointermove', spawnParticles)
        cancelAnimationFrame(animationFrame)
      }
      swarmRoot?.classList.remove('swarm-enhanced', 'swarm-gsap-ready')
    }
  }, [pathname])

  return (
    <>
      <div ref={progressRef} className="swarm-progress-bar" aria-hidden="true" />
      <canvas ref={canvasRef} className="swarm-particle-trail" aria-hidden="true" />
    </>
  )
}
