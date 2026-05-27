'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { createNoise3D } from 'simplex-noise'
import * as THREE from 'three'

const NODE_COUNT = 76
const MAX_CONNECTIONS = 260
const CONNECTION_DISTANCE = 2.15
const MOUSE_REPEL_RADIUS = 2.25
const MOUSE_REPEL_STRENGTH = 0.75

type MousePosition = {
  x: number
  y: number
}

function seededRandom(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function lerpColor(a: THREE.Color, b: THREE.Color, t: number) {
  return a.clone().lerp(b, t)
}

function NeuralNodes({
  mouseRef,
  reducedMotion,
}: {
  mouseRef: MutableRefObject<MousePosition>
  reducedMotion: boolean
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const timeRef = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const noise3D = useMemo(() => createNoise3D(seededRandom(9713)), [])

  const { colors, initialPositions, scales } = useMemo(() => {
    const random = seededRandom(20260524)
    const white = new THREE.Color('#ffffff')
    const lime = new THREE.Color('#c8ff2e')
    const cool = new THREE.Color('#9be7ff')
    const positions = new Float32Array(NODE_COUNT * 3)
    const nodeColors: THREE.Color[] = []
    const nodeScales = new Float32Array(NODE_COUNT)

    for (let i = 0; i < NODE_COUNT; i += 1) {
      const ring = i % 11 === 0
      const x = (random() - 0.5) * 13.4
      const y = (random() - 0.5) * 8.2
      const z = (random() - 0.5) * 5.8
      const centerBias = Math.min(Math.hypot(x, y, z) / 7.5, 1)
      const color = ring ? lime : lerpColor(white, i % 5 === 0 ? cool : lime, centerBias * 0.72)
      const offset = i * 3

      positions[offset] = x
      positions[offset + 1] = y
      positions[offset + 2] = z
      nodeColors.push(color)
      nodeScales[i] = ring ? 0.16 + random() * 0.045 : 0.06 + random() * 0.085
    }

    return { colors: nodeColors, initialPositions: positions, scales: nodeScales }
  }, [])
  const positionsRef = useRef(initialPositions.slice())
  const originalPositionsRef = useRef(initialPositions)
  const displacementsRef = useRef(new Float32Array(NODE_COUNT * 3))

  useLayoutEffect(() => {
    if (!meshRef.current) return

    for (let i = 0; i < NODE_COUNT; i += 1) {
      meshRef.current.setColorAt(i, colors[i])
    }
    meshRef.current.instanceColor!.needsUpdate = true
  }, [colors])

  const linePositions = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), [])

  useFrame((_state, delta) => {
    if (!meshRef.current) return

    timeRef.current += delta
    const t = timeRef.current
    const mouseX = mouseRef.current.x * 6
    const mouseY = mouseRef.current.y * 4
    const motionScale = reducedMotion ? 0 : 1

    for (let i = 0; i < NODE_COUNT; i += 1) {
      const offset = i * 3
      const ox = originalPositionsRef.current[offset]
      const oy = originalPositionsRef.current[offset + 1]
      const oz = originalPositionsRef.current[offset + 2]
      const driftTime = t * 0.18
      const nx = noise3D(ox * 0.16, oy * 0.16, driftTime) * 0.34 * motionScale
      const ny = noise3D(oy * 0.16, oz * 0.16, driftTime + 100) * 0.34 * motionScale
      const nz = noise3D(oz * 0.16, ox * 0.16, driftTime + 200) * 0.24 * motionScale

      const px = ox + displacementsRef.current[offset] + nx
      const py = oy + displacementsRef.current[offset + 1] + ny
      const pz = oz + displacementsRef.current[offset + 2] + nz
      const dx = px - mouseX
      const dy = py - mouseY
      const dz = pz
      const distance = Math.hypot(dx, dy, dz)

      if (!reducedMotion && distance < MOUSE_REPEL_RADIUS && distance > 0.01) {
        const force = (1 - distance / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH
        displacementsRef.current[offset] += (dx / distance) * force * 0.1
        displacementsRef.current[offset + 1] += (dy / distance) * force * 0.1
      }

      displacementsRef.current[offset] *= 0.94
      displacementsRef.current[offset + 1] *= 0.94
      displacementsRef.current[offset + 2] *= 0.94

      const fx = ox + displacementsRef.current[offset] + nx
      const fy = oy + displacementsRef.current[offset + 1] + ny
      const fz = oz + displacementsRef.current[offset + 2] + nz

      positionsRef.current[offset] = fx
      positionsRef.current[offset + 1] = fy
      positionsRef.current[offset + 2] = fz

      dummy.position.set(fx, fy, fz)
      dummy.scale.setScalar(scales[i])
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true

    if (lineRef.current) {
      const lineArray = lineRef.current.geometry.attributes.position.array as Float32Array
      let lineIndex = 0
      let connectionCount = 0

      for (let i = 0; i < NODE_COUNT; i += 1) {
        for (let j = i + 1; j < NODE_COUNT; j += 1) {
          const iOffset = i * 3
          const jOffset = j * 3
          const dx = positionsRef.current[iOffset] - positionsRef.current[jOffset]
          const dy = positionsRef.current[iOffset + 1] - positionsRef.current[jOffset + 1]
          const dz = positionsRef.current[iOffset + 2] - positionsRef.current[jOffset + 2]
          const distance = Math.hypot(dx, dy, dz)

          if (distance < CONNECTION_DISTANCE && connectionCount < MAX_CONNECTIONS) {
            lineArray[lineIndex] = positionsRef.current[iOffset]
            lineArray[lineIndex + 1] = positionsRef.current[iOffset + 1]
            lineArray[lineIndex + 2] = positionsRef.current[iOffset + 2]
            lineArray[lineIndex + 3] = positionsRef.current[jOffset]
            lineArray[lineIndex + 4] = positionsRef.current[jOffset + 1]
            lineArray[lineIndex + 5] = positionsRef.current[jOffset + 2]
            lineIndex += 6
            connectionCount += 1
          }
        }
      }

      for (let i = lineIndex; i < lineArray.length; i += 1) {
        lineArray[i] = 0
      }

      lineRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (!reducedMotion && meshRef.current.parent) {
      meshRef.current.parent.rotation.y += delta * 0.025
      meshRef.current.parent.rotation.x = Math.sin(t * 0.08) * 0.018
    }
  })

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color="#f3ffe2" transparent opacity={0.96} />
      </instancedMesh>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#c8ff2e" transparent opacity={0.24} />
      </lineSegments>
    </group>
  )
}

function CameraController({ mouseRef, reducedMotion }: { mouseRef: MutableRefObject<MousePosition>; reducedMotion: boolean }) {
  useFrame((state) => {
    const targetX = reducedMotion ? 0 : mouseRef.current.x * 0.38
    const targetY = reducedMotion ? 0 : mouseRef.current.y * 0.28
    state.camera.position.x += (targetX - state.camera.position.x) * 0.045
    state.camera.position.y += (targetY - state.camera.position.y) * 0.045
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

export default function KimiNeuralNetwork() {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(mediaQuery.matches)
    syncMotion()
    mediaQuery.addEventListener('change', syncMotion)
    return () => mediaQuery.removeEventListener('change', syncMotion)
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
  }, [])

  return (
    <div className="kimi-neural-network" onPointerMove={handlePointerMove}>
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 58 }}
        dpr={[1, 1.6]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030303']} />
        <CameraController mouseRef={mouseRef} reducedMotion={reducedMotion} />
        <NeuralNodes mouseRef={mouseRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
