'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const FACE_POINT_COUNT = 1080
const DATA_NODE_COUNT = 18
const LATTICE_ROWS = 13

function seededRandom(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function FacePointCloud({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const morphRef = useRef(0)

  const { geometry, facePositions, morphPositions } = useMemo(() => {
    const random = seededRandom(20260612)
    const positions = new Float32Array(FACE_POINT_COUNT * 3)
    const targetPositions = new Float32Array(FACE_POINT_COUNT * 3)
    const colors = new Float32Array(FACE_POINT_COUNT * 3)
    const lime = new THREE.Color('#c8ff2e')
    const cyan = new THREE.Color('#7ee7ff')
    const amber = new THREE.Color('#ffe56b')
    const white = new THREE.Color('#f7f5ee')

    for (let index = 0; index < FACE_POINT_COUNT; index += 1) {
      const head = index < FACE_POINT_COUNT * 0.74
      const angle = random() * Math.PI * 2
      const radius = Math.sqrt(random())
      const shoulder = random()
      const x = head ? Math.cos(angle) * radius * 0.82 : (shoulder - 0.5) * 2.25
      const y = head ? Math.sin(angle) * radius * 1.18 + 0.24 : -1.15 - random() * 0.34
      const shoulderCurve = head ? 0 : Math.pow(Math.abs(x) / 1.28, 1.8) * 0.24
      const z = (random() - 0.5) * (head ? 0.36 : 0.22)
      const offset = index * 3
      const color = index % 17 === 0 ? amber : index % 9 === 0 ? lime : index % 5 === 0 ? cyan : white.clone().lerp(cyan, 0.34)
      const loopTurn = (index / FACE_POINT_COUNT) * Math.PI * 2
      const loop = index % 2 === 0 ? 1 : -1
      const band = index % 3
      const loopRadius = 0.66 + random() * 1 + band * 0.08
      const workflowX = Math.sin(loopTurn * (1.8 + band * 0.18)) * loopRadius
      const workflowY = Math.sin(loopTurn * 0.82 + band * 0.74) * loopRadius * 0.48 - 0.08
      const workflowZ = Math.cos(loopTurn * (1.7 + band * 0.12)) * 0.36 + loop * 0.14

      positions[offset] = x
      positions[offset + 1] = y - shoulderCurve
      positions[offset + 2] = z
      targetPositions[offset] = workflowX
      targetPositions[offset + 1] = workflowY
      targetPositions[offset + 2] = workflowZ
      colors[offset] = color.r
      colors[offset + 1] = color.g
      colors[offset + 2] = color.b
    }

    const bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geometry: bufferGeometry, facePositions: positions, morphPositions: targetPositions }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return
    const elapsed = state.clock.elapsedTime
    const motion = reducedMotion ? 0 : 1
    const targetMorph = active ? 1 : 0
    morphRef.current += (targetMorph - morphRef.current) * (reducedMotion ? 1 : 0.075)
    const morph = morphRef.current
    const positionAttribute = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const array = positionAttribute.array as Float32Array

    for (let index = 0; index < FACE_POINT_COUNT; index += 1) {
      const offset = index * 3
      const pulse = Math.sin(elapsed * 2.4 + index * 0.075) * 0.032 * motion * morph
      const dissolve = Math.sin(elapsed * 3.2 + index * 0.19) * 0.028 * motion * morph
      array[offset] = THREE.MathUtils.lerp(facePositions[offset], morphPositions[offset], morph)
      array[offset + 1] = THREE.MathUtils.lerp(facePositions[offset + 1], morphPositions[offset + 1], morph) + pulse
      array[offset + 2] = THREE.MathUtils.lerp(facePositions[offset + 2], morphPositions[offset + 2], morph) + pulse * 1.4 + dissolve
    }

    positionAttribute.needsUpdate = true
    pointsRef.current.rotation.y = Math.sin(elapsed * 0.24) * 0.11 * motion + morph * Math.sin(elapsed * 0.7) * 0.28
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.035 * motion + morph * 0.1
    pointsRef.current.scale.setScalar(1 + morph * 0.18)
    materialRef.current.opacity = 0.62 + Math.sin(elapsed * 1.7) * 0.08 * motion + morph * 0.28
    materialRef.current.size = 0.028 + morph * 0.014
  })

  return (
    <points ref={pointsRef} geometry={geometry} position={[0.08, -0.02, 0]}>
      <pointsMaterial
        ref={materialRef}
        size={0.026}
        vertexColors
        transparent
        opacity={0.62}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HologramRings({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRefs = useRef<THREE.MeshBasicMaterial[]>([])
  const activeRef = useRef(0)
  const rings = useMemo(
    () => [
      { radius: 1.42, tube: 0.007, y: 0.62, color: '#c8ff2e', opacity: 0.46, rotation: [1.34, 0.18, -0.08] },
      { radius: 1.08, tube: 0.007, y: 0.16, color: '#7ee7ff', opacity: 0.32, rotation: [1.42, -0.12, 0.18] },
      { radius: 1.56, tube: 0.008, y: -0.72, color: '#c8ff2e', opacity: 0.38, rotation: [1.46, 0.22, 0.08] },
      { radius: 0.58, tube: 0.006, y: -0.02, color: '#ffe56b', opacity: 0.24, rotation: [1.2, 0.52, 0.32] },
      { radius: 1.78, tube: 0.005, y: -0.24, color: '#7ee7ff', opacity: 0.18, rotation: [1.5, -0.26, -0.18] },
    ],
    [],
  )

  useFrame((_state, delta) => {
    if (!groupRef.current) return
    activeRef.current += ((active ? 1 : 0) - activeRef.current) * (reducedMotion ? 1 : 0.08)
    const intensity = activeRef.current
    groupRef.current.scale.setScalar(1 + intensity * 0.18)
    materialRefs.current.forEach((material, index) => {
      const baseOpacity = rings[index]?.opacity ?? 0.24
      material.opacity = baseOpacity + intensity * (0.16 + index * 0.018)
    })
    if (reducedMotion) return
    groupRef.current.rotation.y += delta * (0.18 + intensity * 0.8)
    groupRef.current.rotation.z += delta * (0.035 + intensity * 0.22)
  })

  return (
    <group ref={groupRef} position={[0.08, -0.16, -0.15]}>
      {rings.map((ring, index) => (
        <mesh key={`${ring.radius}-${ring.y}`} position={[0, ring.y, 0]} rotation={ring.rotation as [number, number, number]}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 220]} />
          <meshBasicMaterial
            ref={(material) => {
              if (material) materialRefs.current[index] = material
            }}
            color={ring.color}
            transparent
            opacity={ring.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

function EnergyRibbons({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRefs = useRef<THREE.LineBasicMaterial[]>([])
  const activeRef = useRef(0)
  const ribbons = useMemo(() => {
    return [0, 1, 2].map((ribbonIndex) => {
      const points: THREE.Vector3[] = []
      const turns = 1.45 + ribbonIndex * 0.22

      for (let index = 0; index <= 180; index += 1) {
        const progress = index / 180
        const angle = progress * Math.PI * 2 * turns + ribbonIndex * 0.9
        const radius = 0.72 + Math.sin(progress * Math.PI) * (0.64 + ribbonIndex * 0.1)
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            -1.12 + progress * 2.52,
            Math.sin(angle) * (0.22 + ribbonIndex * 0.08),
          ),
        )
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      return {
        geometry,
        color: ribbonIndex === 1 ? '#7ee7ff' : ribbonIndex === 2 ? '#ffe56b' : '#c8ff2e',
        opacity: ribbonIndex === 1 ? 0.24 : 0.28,
        rotation: [0.06 * ribbonIndex, ribbonIndex * 0.38, -0.18 + ribbonIndex * 0.14] as [number, number, number],
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    activeRef.current += ((active ? 1 : 0) - activeRef.current) * (reducedMotion ? 1 : 0.09)
    const intensity = activeRef.current
    groupRef.current.scale.setScalar(0.96 + intensity * 0.18)
    materialRefs.current.forEach((material, index) => {
      material.opacity = ribbons[index].opacity + intensity * (0.18 + index * 0.04)
    })
    if (reducedMotion) return
    groupRef.current.rotation.y += delta * (0.1 + intensity * 0.62)
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.56) * 0.08 * intensity
  })

  return (
    <group ref={groupRef} position={[0.08, -0.04, 0.18]}>
      {ribbons.map((ribbon, index) => (
        <line key={ribbon.color} geometry={ribbon.geometry} rotation={ribbon.rotation}>
          <lineBasicMaterial
            ref={(material) => {
              if (material) materialRefs.current[index] = material
            }}
            color={ribbon.color}
            transparent
            opacity={ribbon.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  )
}

function DataNodes({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRefs = useRef<THREE.MeshBasicMaterial[]>([])
  const activeRef = useRef(0)
  const nodes = useMemo(() => {
    const random = seededRandom(12062026)

    return Array.from({ length: DATA_NODE_COUNT }, (_, index) => {
      const angle = (index / DATA_NODE_COUNT) * Math.PI * 2
      const radius = 0.9 + (index % 4) * 0.18 + random() * 0.14
      return {
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          -0.88 + (index % 6) * 0.34 + random() * 0.08,
          Math.sin(angle) * 0.44,
        ),
        rotation: [random() * 0.6, random() * 0.7, angle] as [number, number, number],
        color: index % 5 === 0 ? '#ffe56b' : index % 2 === 0 ? '#c8ff2e' : '#7ee7ff',
        size: 0.032 + random() * 0.018,
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    activeRef.current += ((active ? 1 : 0) - activeRef.current) * (reducedMotion ? 1 : 0.1)
    const intensity = activeRef.current
    groupRef.current.rotation.y += reducedMotion ? 0 : delta * (0.12 + intensity * 0.34)
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.42) * 0.04 * intensity
    groupRef.current.scale.setScalar(0.96 + intensity * 0.12)
    materialRefs.current.forEach((material, index) => {
      const shimmer = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 3 + index) * 0.08
      material.opacity = 0.38 + intensity * 0.34 + shimmer
    })
  })

  return (
    <group ref={groupRef} position={[0.08, -0.06, 0.42]}>
      {nodes.map((node, index) => (
        <mesh key={`${node.color}-${index}`} position={node.position} rotation={node.rotation}>
          <boxGeometry args={[node.size * 1.8, node.size, node.size]} />
          <meshBasicMaterial
            ref={(material) => {
              if (material) materialRefs.current[index] = material
            }}
            color={node.color}
            transparent
            opacity={0.42}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

function ScanLattice({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const lineRef = useRef<THREE.LineSegments>(null)
  const materialRef = useRef<THREE.LineBasicMaterial>(null)
  const positions = useMemo(() => {
    const lines: number[] = []

    for (let row = 0; row < LATTICE_ROWS; row += 1) {
      const y = -1.45 + row * 0.25
      const halfWidth = 0.62 + Math.max(0, 1.2 - Math.abs(y)) * 0.38
      lines.push(-halfWidth, y, 0.04, halfWidth, y, 0.04)
    }

    for (let col = 0; col < 7; col += 1) {
      const x = -0.9 + col * 0.3
      lines.push(x, -1.36, 0.03, x, 1.34, 0.03)
    }

    return new Float32Array(lines)
  }, [])

  useFrame((state) => {
    if (!lineRef.current) return
    const intensity = active ? 1 : 0
    if (materialRef.current) {
      materialRef.current.opacity = 0.18 + intensity * 0.22
    }
    if (reducedMotion) return
    lineRef.current.position.y = Math.sin(state.clock.elapsedTime * (0.9 + intensity * 1.2)) * (0.035 + intensity * 0.05)
    lineRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.02 * intensity
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={materialRef} color="#7ee7ff" transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}

function PortraitScene({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  return (
    <group>
      <HologramRings active={active} reducedMotion={reducedMotion} />
      <EnergyRibbons active={active} reducedMotion={reducedMotion} />
      <ScanLattice active={active} reducedMotion={reducedMotion} />
      <FacePointCloud active={active} reducedMotion={reducedMotion} />
      <DataNodes active={active} reducedMotion={reducedMotion} />
    </group>
  )
}

export default function PortraitHologram({ active }: { active: boolean }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(mediaQuery.matches)
    syncMotion()
    mediaQuery.addEventListener('change', syncMotion)
    return () => mediaQuery.removeEventListener('change', syncMotion)
  }, [])

  return (
    <div className="portrait-hologram">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 36 }}
        dpr={[1, 1.75]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
      >
        <PortraitScene active={active} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
