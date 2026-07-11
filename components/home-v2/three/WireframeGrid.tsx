'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Raw three.js constants — no @react-three/drei is available.
const GRID_COLOR = '#4ade80'
const FOG_COLOR = '#0a0a0a'
const SIZE = 80
const DIVISIONS = 40
const STEP = SIZE / DIVISIONS // 2 units per cell
const SPEED = 2.2 // units / second, flowing toward the camera

/** A large wireframe floor grid receding into exponential fog. */
function GridFloor({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const positions: number[] = []
    const half = SIZE / 2
    for (let i = 0; i <= DIVISIONS; i += 1) {
      const v = -half + i * STEP
      // line along X at Z = v
      positions.push(-half, 0, v, half, 0, v)
      // line along Z at X = v
      positions.push(v, 0, -half, v, 0, half)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(GRID_COLOR),
        transparent: true,
        opacity: 0.1,
        fog: true,
      }),
    [],
  )

  useFrame((_, delta) => {
    const mesh = ref.current
    if (!mesh || !animate) return
    // Seamless treadmill: advance by a fraction of a cell and wrap within one
    // cell. The grid pattern repeats every STEP, so the wrap is invisible.
    mesh.position.z += delta * SPEED
    if (mesh.position.z >= STEP) {
      mesh.position.z -= STEP
    }
  })

  return (
    <>
      <fogExp2 attach="fog" args={[FOG_COLOR, 0.035]} />
      <lineSegments
        ref={ref}
        geometry={geometry}
        material={material}
        position={[0, -2, 0]}
      />
    </>
  )
}

export default function WireframeGrid() {
  const [hidden, setHidden] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMq = () => setReducedMotion(mq.matches)
    syncMq()
    mq.addEventListener('change', syncMq)

    const syncVis = () => setHidden(document.hidden)
    syncVis()
    document.addEventListener('visibilitychange', syncVis)

    return () => {
      mq.removeEventListener('change', syncMq)
      document.removeEventListener('visibilitychange', syncVis)
    }
  }, [])

  // Pause the render loop entirely when the tab is hidden.
  const frameloop: 'always' | 'never' | 'demand' = hidden ? 'never' : reducedMotion ? 'demand' : 'always'

  return (
    <div
      aria-hidden="true"
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 2.2, 9], fov: 58, near: 0.1, far: 200 }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 0, -30)
          gl.setClearColor(0x0a0a0a, 0)
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Static under reduced motion; paused entirely when tab is hidden. */}
        <GridFloor animate={!hidden && !reducedMotion} />
      </Canvas>
    </div>
  )
}
