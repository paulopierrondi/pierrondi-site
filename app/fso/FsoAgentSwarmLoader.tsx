'use client'

import dynamic from 'next/dynamic'

const FsoAgentSwarm = dynamic(() => import('./FsoAgentSwarm'), { ssr: false })

export default function FsoAgentSwarmLoader() {
  return <FsoAgentSwarm />
}
