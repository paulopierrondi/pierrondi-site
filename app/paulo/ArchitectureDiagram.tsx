'use client'

import { motion } from 'framer-motion'
import styles from './PauloPortfolioExperience.module.css'

type NodeColor = 'green' | 'cyan' | 'brass'

interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  color: NodeColor
}

interface DiagramEdge {
  from: string
  to: string
  dashed?: boolean
}

interface Signal {
  edgeIndex: number
  delay: number
  duration: number
}

interface ArchitectureDiagramProps {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  signals: Signal[]
  variant: string
  shouldAnimate: boolean
}

const colorMap: Record<NodeColor, string> = {
  green: '#7ee35f',
  cyan: '#6dc6d9',
  brass: '#d8b45f',
}

export default function ArchitectureDiagram({
  nodes,
  edges,
  signals,
  variant,
  shouldAnimate,
}: ArchitectureDiagramProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const cycleSeconds = 14

  const pathForEdge = (edge: DiagramEdge, index: number) => {
    const from = nodeMap.get(edge.from)
    const to = nodeMap.get(edge.to)
    if (!from || !to) return null
    return (
      <path
        key={`edge-${index}`}
        id={`${variant}-edge-${index}`}
        d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
        className={styles.diagramEdge}
        data-dashed={edge.dashed ? 'true' : undefined}
        strokeDasharray={edge.dashed ? '4 3' : undefined}
        style={{ animationDelay: `${index * 0.18}s` }}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 400 250"
      className={styles.diagramSvg}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id={`${variant}-glow-green`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${variant}-glow-cyan`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${variant}-glow-brass`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      <g className={styles.diagramEdges}>
        {edges.map((edge, i) => pathForEdge(edge, i))}
      </g>

      {/* Signals */}
      <g className={styles.diagramSignals}>
        {signals.map((sig, i) => {
          const edge = edges[sig.edgeIndex]
          if (!edge) return null
          const from = nodeMap.get(edge.from)
          const to = nodeMap.get(edge.to)
          if (!from || !to) return null
          const color = colorMap[to.color] || colorMap.green
          return (
            <motion.circle
              key={`sig-${i}`}
              r="3.5"
              fill={color}
              className={styles.diagramSignal}
              initial={false}
              animate={
                shouldAnimate
                  ? {
                      cx: [from.x, from.x, to.x, to.x],
                      cy: [from.y, from.y, to.y, to.y],
                      opacity: [0, 1, 1, 0],
                      scale: [0.72, 1.12, 1.08, 0.72],
                    }
                  : {
                      cx: from.x,
                      cy: from.y,
                      opacity: 0,
                      scale: 0.9,
                    }
              }
              transition={
                shouldAnimate
                  ? {
                      duration: sig.duration,
                      delay: sig.delay,
                      repeat: Infinity,
                      repeatDelay: Math.max(0, cycleSeconds - sig.duration),
                      ease: 'linear',
                    }
                  : { duration: 0 }
              }
            />
          )
        })}
      </g>

      {/* Nodes */}
      <g className={styles.diagramNodes}>
        {nodes.map((node, i) => {
          const fill = colorMap[node.color]
          const glowId = `${variant}-glow-${node.color}`
          return (
            <g
              key={node.id}
              className={styles.diagramNode}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="7"
                fill={fill}
                filter={`url(#${glowId})`}
                opacity="0.9"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="3"
                fill="#fff"
                opacity="0.7"
              />
              <text
                x={node.x}
                y={node.y + 22}
                textAnchor="middle"
                className={styles.diagramLabel}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
