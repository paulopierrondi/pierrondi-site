'use client'

import dynamic from 'next/dynamic'

const KimiSwarmEffects = dynamic(() => import('./KimiSwarmEffects'), { ssr: false })

export default function SwarmEffectsLoader() {
  return <KimiSwarmEffects />
}
