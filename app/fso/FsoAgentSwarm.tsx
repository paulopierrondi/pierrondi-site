'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { createNoise3D } from 'simplex-noise'
import * as THREE from 'three'

/**
 * FsoAgentSwarm — a ServiceNow-recolored KNOWLEDGE GRAPH.
 *
 * Instead of a uniform cloud, nodes are generated as COMMUNITIES (clusters) —
 * like a second-brain / Obsidian graph: dense colored clusters, a big "index"
 * blob, and sparse bridge-edges between them. The distance-based link pass then
 * renders dense intra-cluster edges + a few inter-cluster bridges, drifting with
 * noise and reacting to the cursor. The metaphor: your ServiceNow context graph,
 * with a council of agents reasoning over it.
 */

type Palette = 'ink' | 'cyan' | 'blue' | 'indigo' | 'green'

const CLUSTERS: Array<{ cx: number; cy: number; cz: number; r: number; n: number; palette: Palette; tight: number }> = [
  { cx: 4.7, cy: -0.2, cz: 0.0, r: 1.7, n: 44, palette: 'ink', tight: 0.62 }, // big index blob (right)
  { cx: -3.9, cy: 2.4, cz: 0.6, r: 1.7, n: 20, palette: 'cyan', tight: 0.85 },
  { cx: -4.9, cy: -1.9, cz: -0.6, r: 1.5, n: 17, palette: 'blue', tight: 0.85 },
  { cx: -1.4, cy: -3.0, cz: 0.4, r: 1.4, n: 16, palette: 'green', tight: 0.85 },
  { cx: 0.9, cy: 3.0, cz: -0.5, r: 1.4, n: 15, palette: 'indigo', tight: 0.85 },
  { cx: 2.5, cy: -2.6, cz: 0.3, r: 1.3, n: 13, palette: 'green', tight: 0.9 },
  { cx: -0.6, cy: 0.4, cz: 0.0, r: 1.1, n: 12, palette: 'cyan', tight: 0.95 }, // central bridge
]
const LOOSE_COUNT = 16
const NODE_COUNT = CLUSTERS.reduce((a, c) => a + c.n, 0) + LOOSE_COUNT

const MAX_CONNECTIONS = 460
const CONNECTION_DISTANCE = 1.85
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
    const random = seededRandom(771)
    const ink = new THREE.Color('#e9f7ff')
    const cyan = new THREE.Color('#23c2cf')
    const blue = new THREE.Color('#52b8ff')
    const indigo = new THREE.Color('#5873f7')
    const green = new THREE.Color('#34d399')
    const paletteMap: Record<Palette, THREE.Color> = { ink, cyan, blue, indigo, green }

    const positions = new Float32Array(NODE_COUNT * 3)
    const nodeColors: THREE.Color[] = []
    const nodeScales = new Float32Array(NODE_COUNT)
    const hubFlags = new Uint8Array(NODE_COUNT)

    let i = 0
    for (const cluster of CLUSTERS) {
      const base = paletteMap[cluster.palette]
      for (let k = 0; k < cluster.n; k += 1, i += 1) {
        // gaussian-ish offset within the cluster (sum of two randoms)
        const spread = cluster.r * cluster.tight
        const ox = ((random() + random()) - 1) * spread
        const oy = ((random() + random()) - 1) * spread
        const oz = ((random() + random()) - 1) * spread * 0.7
        const offset = i * 3
        positions[offset] = cluster.cx + ox
        positions[offset + 1] = cluster.cy + oy
        positions[offset + 2] = cluster.cz + oz
        const isCenterHub = k === 0 || (k === 1 && cluster.n > 18)
        const color = isCenterHub
          ? (cluster.palette === 'ink' ? cyan : base)
          : lerpColor(cluster.palette === 'ink' ? ink : base, ink, 0.25 + random() * 0.3)
        nodeColors.push(color)
        nodeScales[i] = isCenterHub ? 0.2 + random() * 0.06 : 0.05 + random() * 0.07
        hubFlags[i] = isCenterHub ? 1 : 0
      }
    }
    // loose satellite nodes scattered between clusters
    for (let k = 0; k < LOOSE_COUNT; k += 1, i += 1) {
      const offset = i * 3
      positions[offset] = (random() - 0.5) * 13.5
      positions[offset + 1] = (random() - 0.5) * 8.5
      positions[offset + 2] = (random() - 0.5) * 5
      nodeColors.push(lerpColor(green, ink, random() * 0.5))
      nodeScales[i] = 0.045 + random() * 0.05
      hubFlags[i] = 0
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
      const driftTime = t * 0.14
      const nx = noise3D(ox * 0.16, oy * 0.16, driftTime) * 0.28 * motionScale
      const ny = noise3D(oy * 0.16, oz * 0.16, driftTime + 100) * 0.28 * motionScale
      const nz = noise3D(oz * 0.16, ox * 0.16, driftTime + 200) * 0.18 * motionScale

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
      meshRef.current.parent.rotation.y += delta * 0.018
      meshRef.current.parent.rotation.x = Math.sin(t * 0.08) * 0.014
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
        <lineBasicMaterial color="#23c2cf" transparent opacity={0.16} />
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
        camera={{ position: [0, 0, 8.6], fov: 56 }}
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
