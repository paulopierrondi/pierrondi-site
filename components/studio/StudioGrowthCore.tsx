'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import type { StudioLang } from './studio-data'
import styles from './StudioGrowthCore.module.css'

type CoreMode = 'hero' | 'compact'

type StudioGrowthCoreProps = {
  lang: StudioLang
  mode?: CoreMode
  className?: string
}

const NODE_POSITIONS: Array<[number, number, number]> = [
  [-3.55, 1.55, -0.45],
  [-2.65, -1.8, 0.2],
  [0.45, 2.62, -0.8],
  [3.15, 1.38, 0.35],
  [3.45, -1.72, -0.35],
]

const COPY = {
  pt: {
    eyebrow: 'GROWTH CORE / EM TEMPO REAL',
    status: 'SISTEMA VIVO',
    center: 'OPERAÇÃO CONECTADA',
    outcome: 'crescimento',
    nodes: ['Estratégia', 'Marca', 'Conteúdo', 'CRM', 'IA'],
    signal: ['diagnóstico', 'direção', 'produção', 'ativação', 'melhoria'],
  },
  en: {
    eyebrow: 'GROWTH CORE / LIVE',
    status: 'SYSTEM ALIVE',
    center: 'CONNECTED OPERATION',
    outcome: 'growth',
    nodes: ['Strategy', 'Brand', 'Content', 'CRM', 'AI'],
    signal: ['diagnose', 'direct', 'produce', 'activate', 'improve'],
  },
} as const

function seeded(index: number) {
  const value = Math.sin(index * 91.713 + 17.19) * 43758.5453
  return value - Math.floor(value)
}

function StarField({ compact }: { compact: boolean }) {
  const geometry = useMemo(() => {
    const count = compact ? 220 : 420
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const green = new THREE.Color('#4ade80')
    const cyan = new THREE.Color('#5ecbff')

    for (let index = 0; index < count; index += 1) {
      const radius = 3.8 + seeded(index) * 5.5
      const angle = seeded(index + 500) * Math.PI * 2
      const elevation = (seeded(index + 900) - 0.5) * 5.8
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = elevation
      positions[index * 3 + 2] = Math.sin(angle) * radius - 1.4

      const color = index % 5 === 0 ? cyan : green
      colors[index * 3] = color.r
      colors[index * 3 + 1] = color.g
      colors[index * 3 + 2] = color.b
    }

    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    buffer.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return buffer
  }, [compact])

  return (
    <points geometry={geometry}>
      <pointsMaterial size={compact ? 0.026 : 0.034} vertexColors transparent opacity={0.62} sizeAttenuation />
    </points>
  )
}

function ConnectionField() {
  const lines = useMemo(() => NODE_POSITIONS.map((position, index) => {
    const midpoint = new THREE.Vector3(position[0] * 0.46, position[1] * 0.46, position[2] + 0.5 + index * 0.05)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      midpoint,
      new THREE.Vector3(...position),
    ])
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(42))
    const material = new THREE.LineBasicMaterial({
      color: index === 4 ? '#f4bd50' : index > 1 ? '#4ade80' : '#5ecbff',
      transparent: true,
      opacity: 0.29,
    })
    return { curve, object: new THREE.Line(geometry, material) }
  }), [])

  return (
    <group>
      {lines.map(({ object }, index) => <primitive key={index} object={object} />)}
      {lines.map(({ curve }, index) => <Signal key={index} curve={curve} index={index} />)}
    </group>
  )
}

function Signal({ curve, index }: { curve: THREE.CatmullRomCurve3; index: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const progress = (clock.elapsedTime * (0.1 + index * 0.006) + index * 0.17) % 1
    ref.current.position.copy(curve.getPointAt(progress))
    const pulse = 0.7 + Math.sin(clock.elapsedTime * 5 + index) * 0.22
    ref.current.scale.setScalar(pulse)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.075, 14, 14]} />
      <meshBasicMaterial color={index === 4 ? '#ffd166' : '#b6ffd0'} toneMapped={false} />
    </mesh>
  )
}

function GrowthMachine({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const machine = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (reducedMotion || !machine.current) return
    machine.current.rotation.y += delta * 0.075
    machine.current.rotation.x = THREE.MathUtils.lerp(machine.current.rotation.x, state.pointer.y * 0.085, 0.035)
    machine.current.rotation.z = THREE.MathUtils.lerp(machine.current.rotation.z, -state.pointer.x * 0.06, 0.035)
    if (halo.current) halo.current.rotation.z -= delta * 0.13
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.42, 0.025)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.3, 0.025)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={machine} scale={compact ? 0.92 : 1}>
      <StarField compact={compact} />
      <ConnectionField />

      <group>
        <mesh>
          <icosahedronGeometry args={[1.25, 5]} />
          <meshPhysicalMaterial
            color="#07130d"
            emissive="#123c24"
            emissiveIntensity={0.82}
            metalness={0.72}
            roughness={0.18}
            clearcoat={1}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh scale={1.035}>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshBasicMaterial color="#77f5a4" wireframe transparent opacity={0.34} toneMapped={false} />
        </mesh>
        <mesh ref={halo} rotation={[Math.PI / 2.35, 0.25, 0]}>
          <torusGeometry args={[1.72, 0.017, 8, 160]} />
          <meshBasicMaterial color="#5ecbff" transparent opacity={0.62} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 1.72, -0.45, 0.4]}>
          <torusGeometry args={[2.08, 0.012, 8, 160]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.34} toneMapped={false} />
        </mesh>
        <pointLight color="#4ade80" intensity={compact ? 8 : 12} distance={8} decay={2} />
      </group>

      {NODE_POSITIONS.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[index === 4 ? 0.22 : 0.16, 22, 22]} />
            <meshPhysicalMaterial
              color={index === 4 ? '#f4bd50' : index > 1 ? '#4ade80' : '#5ecbff'}
              emissive={index === 4 ? '#8a4d00' : '#143d28'}
              emissiveIntensity={1.15}
              metalness={0.45}
              roughness={0.16}
            />
          </mesh>
          <mesh scale={index === 4 ? 1.85 : 1.7}>
            <sphereGeometry args={[0.2, 18, 18]} />
            <meshBasicMaterial
              color={index === 4 ? '#f4bd50' : '#4ade80'}
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Scene({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  return (
    <>
      <fog attach="fog" args={['#050807', 7, 16]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 6]} color="#c8ffdc" intensity={1.2} />
      <pointLight position={[-4, -2, 3]} color="#48baff" intensity={5} distance={11} />
      <GrowthMachine compact={compact} reducedMotion={reducedMotion} />
    </>
  )
}

export default function StudioGrowthCore({ lang, mode = 'hero', className = '' }: StudioGrowthCoreProps) {
  const reducedMotion = useHydratedReducedMotion()
  const [ready, setReady] = useState(false)
  const compact = mode === 'compact'
  const copy = COPY[lang]

  return (
    <div
      className={`${styles.core} ${compact ? styles.compact : styles.hero} ${className}`}
      data-studio-growth-core
      data-webgl-ready={ready ? 'true' : 'false'}
    >
      <div className={styles.aurora} aria-hidden="true" />
      <Canvas
        className={styles.canvas}
        aria-hidden="true"
        camera={{ position: [0, 0, compact ? 9.7 : 8.8], fov: compact ? 50 : 48 }}
        dpr={[1, compact ? 1.35 : 1.55]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
        onCreated={() => setReady(true)}
      >
        <Scene compact={compact} reducedMotion={reducedMotion} />
      </Canvas>

      <div className={styles.interface} aria-hidden="true">
        <div className={styles.topline}>
          <span>{copy.eyebrow}</span>
          <span className={styles.live}><i />{copy.status}</span>
        </div>

        <div className={styles.centerLockup}>
          <span className={styles.monogram}><b>P</b><i>S</i></span>
          <div><small>PIERRONDI</small><strong>STUDIO</strong></div>
          <em>{copy.center}</em>
        </div>

        <div className={styles.nodeLabels}>
          {copy.nodes.map((node, index) => (
            <span key={node} data-node={index + 1}>
              <i>{String(index + 1).padStart(2, '0')}</i>
              <strong>{node}</strong>
              <small>{copy.signal[index]}</small>
            </span>
          ))}
        </div>

        <div className={styles.outcome}>
          <span>05</span>
          <strong>{copy.outcome}</strong>
          <i />
        </div>
      </div>
    </div>
  )
}
