'use client'

import {
  Component,
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'
import styles from './FrontierEventHorizon.module.css'

const PARTICLE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uMotion;
  attribute float aRadius;
  attribute float aAngle;
  attribute float aHeight;
  attribute float aSize;
  attribute float aSpeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vEnergy;

  void main() {
    float angle = aAngle + uTime * aSpeed * uMotion;
    float turbulence = sin(angle * 5.0 + aRadius * 3.0) * 0.018 * aRadius;
    vec3 orbit = vec3(
      cos(angle) * aRadius,
      sin(angle) * aRadius,
      aHeight + turbulence
    );
    vec4 mvPosition = modelViewMatrix * vec4(orbit, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = min(6.0, aSize * uPixelRatio * (19.0 / -mvPosition.z));
    vColor = aColor;
    vEnergy = 1.0 - smoothstep(1.55, 5.9, aRadius);
  }
`

const PARTICLE_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vEnergy;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float particle = smoothstep(0.5, 0.06, distanceToCenter);
    float core = smoothstep(0.2, 0.0, distanceToCenter);
    float alpha = particle * mix(0.24, 0.78, vEnergy);
    gl_FragColor = vec4(vColor + core * 0.52, alpha);
  }
`

const RIM_VERTEX = /* glsl */ `
  varying float vFresnel;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * normal);
    vec3 viewDirection = normalize(-mvPosition.xyz);
    vFresnel = pow(1.0 - abs(dot(viewNormal, viewDirection)), 3.1);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const RIM_FRAGMENT = /* glsl */ `
  varying float vFresnel;

  void main() {
    vec3 warmWhite = mix(vec3(1.0, 0.48, 0.11), vec3(1.0), vFresnel);
    gl_FragColor = vec4(warmWhite, vFresnel * 0.72);
  }
`

const GLOW_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GLOW_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vec2 centered = vUv - 0.5;
    float distanceToCenter = length(centered);
    float halo = smoothstep(0.5, 0.04, distanceToCenter);
    float hollow = smoothstep(0.0, 0.18, distanceToCenter);
    float alpha = halo * hollow * 0.34;
    vec3 color = mix(vec3(1.0, 0.24, 0.025), vec3(1.0, 0.88, 0.58), halo);
    gl_FragColor = vec4(color, alpha);
  }
`

function seeded(index: number) {
  const value = Math.sin(index * 91.731 + 17.137) * 43758.5453
  return value - Math.floor(value)
}

function detectWebGlSupport(): boolean | null {
  if (typeof document === 'undefined') return null
  try {
    const probe = document.createElement('canvas')
    const context = probe.getContext('webgl2')
    if (!context) return false

    context.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function useDisposable(
  ...resources: Array<THREE.BufferGeometry | THREE.Material>
) {
  useEffect(
    () => () => resources.forEach((resource) => resource.dispose()),
    // Resources are stable memoized instances; a changed identity must dispose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    resources,
  )
}

function StarField({ compact }: { compact: boolean }) {
  const geometry = useMemo(() => {
    const count = compact ? 500 : 1_000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const warm = new THREE.Color('#f6b85f')
    const cold = new THREE.Color('#c6f7e0')

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seeded(index) - 0.5) * 18
      positions[index * 3 + 1] = (seeded(index + 310) - 0.5) * 10
      positions[index * 3 + 2] = -2 - seeded(index + 920) * 8
      const color = index % 7 === 0 ? cold : warm
      const intensity = 0.35 + seeded(index + 440) * 0.65
      colors[index * 3] = color.r * intensity
      colors[index * 3 + 1] = color.g * intensity
      colors[index * 3 + 2] = color.b * intensity
    }

    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    buffer.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return buffer
  }, [compact])

  useDisposable(geometry)

  return (
    <points geometry={geometry} renderOrder={-2}>
      <pointsMaterial
        size={compact ? 0.026 : 0.032}
        vertexColors
        transparent
        opacity={0.62}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function AccretionDisk({
  compact,
  reducedMotion,
}: {
  compact: boolean
  reducedMotion: boolean
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const count = compact ? 4_000 : 8_000
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const radii = new Float32Array(count)
    const angles = new Float32Array(count)
    const heights = new Float32Array(count)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const whiteHot = new THREE.Color('#fff8df')
    const amber = new THREE.Color('#ff9a2e')
    const rust = new THREE.Color('#8e2c0b')

    for (let index = 0; index < count; index += 1) {
      const distribution = Math.pow(seeded(index + 13), 1.72)
      const radius = 1.57 + distribution * 4.55
      const angle = seeded(index + 901) * Math.PI * 2
      const height = (seeded(index + 1_701) - 0.5) * (0.025 + radius * 0.022)
      const energy = 1 - THREE.MathUtils.smoothstep(radius, 1.65, 5.9)
      const base = radius < 2.35 ? whiteHot : radius < 4.0 ? amber : rust
      const color = base.clone().lerp(whiteHot, energy * 0.34)

      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = Math.sin(angle) * radius
      positions[index * 3 + 2] = height
      radii[index] = radius
      angles[index] = angle
      heights[index] = height
      sizes[index] = 0.44 + seeded(index + 2_600) * (radius < 2.3 ? 1.8 : 1.05)
      speeds[index] = 0.035 + 0.28 / Math.pow(radius, 1.45)
      colors[index * 3] = color.r
      colors[index * 3 + 1] = color.g
      colors[index * 3 + 2] = color.b
    }

    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    buffer.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1))
    buffer.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1))
    buffer.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1))
    buffer.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    buffer.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    buffer.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    return buffer
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.55) },
          uMotion: { value: reducedMotion ? 0 : 1 },
        },
        vertexShader: PARTICLE_VERTEX,
        fragmentShader: PARTICLE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    [reducedMotion],
  )

  useDisposable(geometry, material)
  useFrame(({ clock }) => {
    if (!reducedMotion && materialRef.current)
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <group rotation={[1.23, 0.08, -0.13]}>
      <points geometry={geometry} frustumCulled={false} renderOrder={3}>
        <primitive ref={materialRef} object={material} attach="material" />
      </points>
      <mesh renderOrder={3}>
        <torusGeometry args={[1.66, 0.055, 10, 192]} />
        <meshBasicMaterial
          color="#fff8dc"
          transparent
          opacity={0.88}
          toneMapped={false}
        />
      </mesh>
      <mesh renderOrder={3}>
        <torusGeometry args={[1.78, 0.16, 10, 192]} />
        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.11}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function SignalTerrain() {
  const geometry = useMemo(() => {
    const positions: number[] = []
    const rows = 20
    const columns = 28
    const point = (x: number, z: number) => {
      const y =
        -2.72 + Math.sin(x * 0.72 + z * 0.58) * 0.08 + Math.sin(z * 1.7) * 0.035
      return [x, y, z] as const
    }

    for (let row = 0; row < rows; row += 1) {
      const z = 4.2 - row * 0.42
      for (let column = 0; column < columns; column += 1) {
        const x1 = -8 + column * (16 / columns)
        const x2 = -8 + (column + 1) * (16 / columns)
        positions.push(...point(x1, z), ...point(x2, z))
      }
    }

    for (let column = 0; column <= columns; column += 1) {
      const x = -8 + column * (16 / columns)
      for (let row = 0; row < rows - 1; row += 1) {
        const z1 = 4.2 - row * 0.42
        const z2 = 4.2 - (row + 1) * 0.42
        positions.push(...point(x, z1), ...point(x, z2))
      }
    }

    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )
    return buffer
  }, [])

  useDisposable(geometry)

  return (
    <lineSegments geometry={geometry} renderOrder={-1}>
      <lineBasicMaterial
        color="#a5551e"
        transparent
        opacity={0.085}
        depthWrite={false}
      />
    </lineSegments>
  )
}

function EventHorizon() {
  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: RIM_VERTEX,
        fragmentShader: RIM_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    [],
  )
  useDisposable(rimMaterial)

  return (
    <>
      <mesh position={[0, 0, -0.72]} scale={[5.5, 5.5, 1]} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={GLOW_VERTEX}
          fragmentShader={GLOW_FRAGMENT}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh renderOrder={2}>
        <sphereGeometry args={[1.42, 48, 48]} />
        <meshBasicMaterial color="#000000" depthWrite />
      </mesh>
      <mesh scale={1.035} material={rimMaterial} renderOrder={4}>
        <sphereGeometry args={[1.42, 48, 48]} />
      </mesh>
      <mesh rotation={[1.23, 0.08, -0.13]} renderOrder={4}>
        <torusGeometry args={[1.48, 0.018, 8, 192]} />
        <meshBasicMaterial
          color="#fff1c4"
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </>
  )
}

function ObserverSilhouette() {
  return (
    <group position={[-0.12, -2.42, 1.38]} scale={0.135} renderOrder={6}>
      <mesh position={[0, 0.78, -0.05]} scale={[2.7, 4.6, 1]}>
        <circleGeometry args={[0.42, 32]} />
        <meshBasicMaterial
          color="#ffd7a1"
          transparent
          opacity={0.085}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 1.48, 0.14]}>
        <sphereGeometry args={[0.29, 22, 22]} />
        <meshBasicMaterial color="#020202" />
      </mesh>
      <mesh position={[0, 0.7, 0.14]} scale={[0.5, 1.55, 0.42]}>
        <capsuleGeometry args={[0.34, 0.78, 8, 16]} />
        <meshBasicMaterial color="#020202" />
      </mesh>
      <mesh position={[-0.19, -0.48, 0.14]} rotation={[0, 0, 0.06]}>
        <capsuleGeometry args={[0.12, 0.92, 6, 12]} />
        <meshBasicMaterial color="#020202" />
      </mesh>
      <mesh position={[0.19, -0.48, 0.14]} rotation={[0, 0, -0.06]}>
        <capsuleGeometry args={[0.12, 0.92, 6, 12]} />
        <meshBasicMaterial color="#020202" />
      </mesh>
    </group>
  )
}

// Flags readiness only after the first frame actually paints. Declaring ready
// in onCreated retires the CSS fallback while frameloop can still be 'never'
// (hero offscreen / document hidden), leaving a black canvas behind it.
function ReadySignal({ onReady }: { onReady: () => void }) {
  const signaled = useRef(false)
  useFrame(() => {
    if (signaled.current) return
    signaled.current = true
    onReady()
  })
  return null
}

function CosmicSystem({
  reducedMotion,
  pointer,
}: {
  reducedMotion: boolean
  pointer: MutableRefObject<{ x: number; y: number }>
}) {
  const rig = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const compact = viewport.width < 6.4
  const scale = compact ? 0.7 : Math.min(1.15, 0.92 + viewport.width * 0.018)
  const position: [number, number, number] = [
    compact ? 0 : Math.min(2.2, viewport.width * 0.16),
    compact ? 1.22 : 0.42,
    -0.3,
  ]

  useFrame(({ clock }) => {
    if (!rig.current || reducedMotion) return
    rig.current.rotation.y = THREE.MathUtils.lerp(
      rig.current.rotation.y,
      pointer.current.x * 0.045,
      0.028,
    )
    rig.current.rotation.x = THREE.MathUtils.lerp(
      rig.current.rotation.x,
      -pointer.current.y * 0.025,
      0.028,
    )
    // Bounded breathing drift: an unbounded += rotation slowly turned the
    // disk vertical after a few minutes, breaking the hero composition.
    rig.current.rotation.z = Math.sin(clock.elapsedTime * 0.055) * 0.05
  })

  return (
    <>
      <StarField compact={compact} />
      <SignalTerrain />
      <group ref={rig} position={position} scale={scale}>
        <EventHorizon />
        <AccretionDisk compact={compact} reducedMotion={reducedMotion} />
        <ObserverSilhouette />
      </group>
    </>
  )
}

class FrontierBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onFailure()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function FrontierEventHorizon() {
  const rootRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const reducedMotion = useHydratedReducedMotion()
  const [supported, setSupported] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [inViewport, setInViewport] = useState(true)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) setSupported(detectWebGlSupport())
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const syncVisibility = () => setHidden(document.hidden)
    syncVisibility()
    document.addEventListener('visibilitychange', syncVisibility)

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin: '12% 0px', threshold: 0.01 },
    )
    if (rootRef.current) observer.observe(rootRef.current)

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    if (reducedMotion || !finePointer.matches) return

    const trackPointer = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', trackPointer, { passive: true })
    return () => window.removeEventListener('pointermove', trackPointer)
  }, [reducedMotion])

  const active = inViewport && !hidden
  const frameloop: 'always' | 'demand' | 'never' = !active
    ? 'never'
    : reducedMotion
      ? 'never'
      : 'always'
  const state =
    reducedMotion || supported === false ? 'fallback' : ready ? 'ready' : 'loading'

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-frontier-scene
      data-frontier-state={state}
      data-frontier-active={active ? 'true' : 'false'}
      data-frontier-motion={reducedMotion ? 'reduced' : 'full'}
      data-frontier-loop={frameloop}
    >
      {supported && !reducedMotion && (
        <FrontierBoundary onFailure={() => setSupported(false)}>
          <Canvas
            className={`${styles.canvas} ${ready ? styles.canvasReady : ''}`}
            aria-hidden="true"
            camera={{ position: [0, 0.1, 9], fov: 46, near: 0.1, far: 80 }}
            dpr={[1, 1.35]}
            frameloop={frameloop}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x020202, 0)
              gl.toneMapping = THREE.ACESFilmicToneMapping
              gl.toneMappingExposure = 1.22
              gl.domElement.addEventListener(
                'webglcontextlost',
                (event) => {
                  event.preventDefault()
                  setSupported(false)
                },
                { once: true },
              )
            }}
          >
            <fog attach="fog" args={['#020202', 8, 27]} />
            <ReadySignal onReady={() => setReady(true)} />
            <CosmicSystem reducedMotion={reducedMotion} pointer={pointerRef} />
          </Canvas>
        </FrontierBoundary>
      )}
    </div>
  )
}
