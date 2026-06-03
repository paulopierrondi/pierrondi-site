'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { createNoise3D } from 'simplex-noise'
import * as THREE from 'three'

/**
 * FsoAgentSwarm — a ServiceNow-recolored agent swarm.
 *
 * An instanced-sphere field where ~9 brighter "hub" nodes evoke the
 * implementation-agent roster, connected by live link-segments that
 * redraw as the swarm drifts (noise) and reacts to the cursor (repel).
 * Self-contained, reduced-motion aware, transparent background so the
 * hero gradient shows through.
 */

const NODE_COUNT = 72
const HUB_COUNT = 9 // the nine implementation agents
const MAX_CONNECTIONS = 240
const CONNECTION_DISTANCE = 2.25
const MOUSE_REPEL_RADIUS = 2.4
const MOUSE_REPEL_STRENGTH = 0.8

type MousePosition = { x: number; y: number }

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

function SwarmNodes({
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
  const noise3D = useMemo(() => createNoise3D(seededRandom(20260603)), [])

  const { colors, initialPositions, scales, isHub } = useMemo(() => {
    const random = seededRandom(420691)
    const ink = new THREE.Color('#dff6ff')
    const cyan = new THREE.Color('#23c2cf') // ServiceNow green/cyan
    const blue = new THREE.Color('#52b8ff')
    const indigo = new THREE.Color('#5873f7')
    const positions = new Float32Array(NODE_COUNT * 3)
    const nodeColors: THREE.Color[] = []
    const nodeScales = new Float32Array(NODE_COUNT)
    const hubFlags = new Uint8Array(NODE_COUNT)

    for (let i = 0; i < NODE_COUNT; i += 1) {
      // Spread the hubs deterministically across the field.
      const hub = i % Math.floor(NODE_COUNT / HUB_COUNT) === 0 && hubFlags.reduce((a, b) => a + b, 0) < HUB_COUNT
      const x = (random() - 0.5) * 13.2
      const y = (random() - 0.5) * 8.0
      const z = (random() - 0.5) * 5.6
      const centerBias = Math.min(Math.hypot(x, y, z) / 7.4, 1)
      const palette = i % 3 === 0 ? blue : i % 3 === 1 ? cyan : indigo
      const color = hub ? cyan : lerpColor(ink, palette, centerBias * 0.78)
      const offset = i * 3

      positions[offset] = x
      positions[offset + 1] = y
      positions[offset + 2] = z
      nodeColors.push(color)
      nodeScales[i] = hub ? 0.2 + random() * 0.05 : 0.05 + random() * 0.08
      hubFlags[i] = hub ? 1 : 0
    }

    return { colors: nodeColors, initialPositions: positions, scales: nodeScales, isHub: hubFlags }
  }, [])

  const positionsRef = useRef(initialPositions.slice())
  const originalPositionsRef = useRef(initialPositions)
  const displacementsRef = useRef(new Float32Array(NODE_COUNT * 3))
  const linePositions = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), [])

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < NODE_COUNT; i += 1) {
      meshRef.current.setColorAt(i, colors[i])
    }
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [colors])

  useFrame((_state, delta) => {
    if (!meshRef.current) return
    timeRef.current += Math.min(delta, 0.05)
    const t = timeRef.current
    const mouseX = mouseRef.current.x * 6
    const mouseY = mouseRef.current.y * 4
    const motionScale = reducedMotion ? 0 : 1

    for (let i = 0; i < NODE_COUNT; i += 1) {
      const offset = i * 3
      const ox = originalPositionsRef.current[offset]
      const oy = originalPositionsRef.current[offset + 1]
      const oz = originalPositionsRef.current[offset + 2]
      const driftTime = t * 0.16
      const nx = noise3D(ox * 0.16, oy * 0.16, driftTime) * 0.32 * motionScale
      const ny = noise3D(oy * 0.16, oz * 0.16, driftTime + 100) * 0.32 * motionScale
      const nz = noise3D(oz * 0.16, ox * 0.16, driftTime + 200) * 0.22 * motionScale

      const px = ox + displacementsRef.current[offset] + nx
      const py = oy + displacementsRef.current[offset + 1] + ny
      const dx = px - mouseX
      const dy = py - mouseY
      const distance = Math.hypot(dx, dy)

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

      // Hubs pulse gently.
      const pulse = isHub[i] && !reducedMotion ? 1 + Math.sin(t * 1.6 + i) * 0.12 : 1
      dummy.position.set(fx, fy, fz)
      dummy.scale.setScalar(scales[i] * pulse)
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
      for (let i = lineIndex; i < lineArray.length; i += 1) lineArray[i] = 0
      lineRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (!reducedMotion && meshRef.current.parent) {
      meshRef.current.parent.rotation.y += delta * 0.022
      meshRef.current.parent.rotation.x = Math.sin(t * 0.08) * 0.016
    }
  })

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#eafcff" transparent opacity={0.95} />
      </instancedMesh>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#23c2cf" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

function CameraRig({ mouseRef, reducedMotion }: { mouseRef: MutableRefObject<MousePosition>; reducedMotion: boolean }) {
  useFrame((state) => {
    const targetX = reducedMotion ? 0 : mouseRef.current.x * 0.36
    const targetY = reducedMotion ? 0 : mouseRef.current.y * 0.26
    state.camera.position.x += (targetX - state.camera.position.x) * 0.045
    state.camera.position.y += (targetY - state.camera.position.y) * 0.045
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function FsoAgentSwarm() {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mediaQuery.matches)
    sync()
    mediaQuery.addEventListener('change', sync)
    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
  }, [])

  return (
    <div className="fso-swarm-canvas" onPointerMove={handlePointerMove} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.4], fov: 56 }}
        dpr={[1, 1.6]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <CameraRig mouseRef={mouseRef} reducedMotion={reducedMotion} />
        <SwarmNodes mouseRef={mouseRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
