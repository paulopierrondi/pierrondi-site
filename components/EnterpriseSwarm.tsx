'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const GOLDEN = Math.PI * (3 - Math.sqrt(5))

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createSpriteTexture() {
  if (typeof document === 'undefined') return null
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  if (!ctx) return null
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.25)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

interface SwarmGroupProps {
  scrollRef: React.MutableRefObject<number>
}

function SwarmGroup({ scrollRef }: SwarmGroupProps) {
  const reduced = useReducedMotion()
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const signalsRef = useRef<THREE.Points>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const core2Ref = useRef<THREE.Mesh>(null)
  const pMatRef = useRef<THREE.PointsMaterial | null>(null)

  const N = reduced ? 900 : 2600
  const R = 7.4
  const SIG = reduced ? 0 : 5

  const rng = useMemo(() => mulberry32(42), [])

  const {
    sprite,
    edges,
    sigState,
    pGeo,
    lGeo,
    sigGeo,
    pMat,
    lMat,
    sigMat,
  } = useMemo(() => {
    const sprite = createSpriteTexture()
    const positions = new Float32Array(N * 3)
    const colors = new Float32Array(N * 3)
    const pts: THREE.Vector3[] = []

    const cLime = new THREE.Color('#c8ff2e')
    const cCyan = new THREE.Color('#55b8d9')
    const cGold = new THREE.Color('#d6b45d')

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const phi = i * GOLDEN
      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r
      const rr = R * (0.93 + rng() * 0.14)
      const px = x * rr
      const py = y * rr
      const pz = z * rr
      positions[i * 3] = px
      positions[i * 3 + 1] = py
      positions[i * 3 + 2] = pz
      pts.push(new THREE.Vector3(px, py, pz))

      const c = cCyan.clone().lerp(cLime, (y + 1) / 2)
      const rnd = rng()
      if (rnd < 0.07) c.copy(cGold)
      else if (rnd < 0.16) c.copy(cLime)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const step = Math.max(8, Math.round(Math.sqrt(N)))
    const linePositions: number[] = []
    const edges: [THREE.Vector3, THREE.Vector3][] = []
    const maxLen = R * 0.92
    for (let i = 0; i < N; i++) {
      const a = pts[i]
      const cand = [i + 1, i + step, i + step + 1]
      for (const j of cand) {
        if (j >= N) continue
        const b = pts[j]
        if (a.distanceTo(b) < maxLen) {
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z)
          edges.push([a.clone(), b.clone()])
        }
      }
    }

    const sigState = Array.from({ length: SIG }, () => ({
      e: Math.floor(rng() * edges.length),
      t: rng(),
      sp: 0.004 + rng() * 0.006,
    }))

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

    const sigGeo = new THREE.BufferGeometry()
    const sigPos = new Float32Array(SIG * 3)
    sigGeo.setAttribute('position', new THREE.BufferAttribute(sigPos, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.17,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      opacity: 0.95,
    })

    const lMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#3f6a1f'),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const sigMat = new THREE.PointsMaterial({
      size: 0.55,
      map: sprite,
      color: new THREE.Color('#eaffb0'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.95,
    })

    return { sprite, positions, colors, linePositions, edges, sigState, pGeo, lGeo, sigGeo, pMat, lMat, sigMat }
  }, [N, SIG, rng])

  useEffect(() => {
    pMatRef.current = pMat
  }, [pMat])

  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const sigStateRef = useRef(sigState)

  useEffect(() => {
    sigStateRef.current = sigState
  }, [sigState])

  useEffect(() => {
    const onPointer = (e: PointerEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY
      mouse.current.tx = clientX / window.innerWidth - 0.5
      mouse.current.ty = clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => window.removeEventListener('pointermove', onPointer)
  }, [])

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime
    const dt = Math.min(clock.getDelta(), 0.05)
    const scroll = scrollRef.current

    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.045 + scroll * 1.4 + mouse.current.x * 0.5
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.08 + mouse.current.y * 0.32 + scroll * 0.25
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.12
      coreRef.current.rotation.x = t * 0.07
    }
    if (core2Ref.current) {
      core2Ref.current.rotation.y = t * 0.18
      core2Ref.current.rotation.z = -t * 0.1
    }

    if (pMatRef.current) {
      pMatRef.current.opacity = 0.78 + Math.sin(t * 0.6) * 0.12
    }

    camera.position.z = 17 + scroll * 5
    camera.position.y = scroll * -1.5
    camera.lookAt(0, 0, 0)

    if (SIG && signalsRef.current && edges.length) {
      const arr = signalsRef.current.geometry.attributes.position.array as Float32Array
      const state = sigStateRef.current
      for (let i = 0; i < SIG; i++) {
        const s = state[i]
        s.t += s.sp * dt * 60
        if (s.t >= 1) {
          s.t = 0
          s.e = Math.floor(rng() * edges.length)
        }
        const [a, b] = edges[s.e]
        arr[i * 3] = a.x + (b.x - a.x) * s.t
        arr[i * 3 + 1] = a.y + (b.y - a.y) * s.t
        arr[i * 3 + 2] = a.z + (b.z - a.z) * s.t
      }
      signalsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  if (!sprite) return null

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pGeo} material={pMat} />
      <lineSegments ref={linesRef} geometry={lGeo} material={lMat} />
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[3.1, 1]} />
        <meshBasicMaterial
          color="#c8ff2e"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={core2Ref}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial
          color="#55b8d9"
          wireframe
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {SIG > 0 && <points ref={signalsRef} geometry={sigGeo} material={sigMat} />}
    </group>
  )
}

function CameraSetup() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 0, 17)
  }, [camera])
  return null
}

interface EnterpriseSwarmProps {
  className?: string
}

export default function EnterpriseSwarm({ className = '' }: EnterpriseSwarmProps) {
  const scrollRef = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 17], fov: 46 }}
        dpr={[1, 2]}
        frameloop={reduced ? 'demand' : 'always'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        style={{ background: 'transparent' }}
      >
        <CameraSetup />
        <SwarmGroup scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
