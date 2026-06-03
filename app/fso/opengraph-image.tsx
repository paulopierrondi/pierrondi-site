import { ImageResponse } from 'next/og'

// Node runtime (Railway) — no edge. Mirrors app/og/route.tsx conventions.
export const alt = 'ServiceNow Implementation Agents — AI-built FSO, end to end'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          background: 'linear-gradient(135deg, #03121a 0%, #06202b 55%, #050a0e 100%)',
          color: '#eef5f7',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-140px',
            right: '-90px',
            width: '540px',
            height: '540px',
            display: 'flex',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(35,194,207,0.22), transparent 62%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#23c2cf', display: 'flex' }} />
          <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '0.02em', color: '#cfe9ee', display: 'flex' }}>
            ServiceNow · FSO · Fluent SDK · Claude Code + Codex
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '78px',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            <span style={{ display: 'flex' }}>ServiceNow</span>
            <span style={{ display: 'flex', color: '#23c2cf' }}>Implementation Agents</span>
          </div>
          <div style={{ display: 'flex', fontSize: '30px', lineHeight: 1.35, color: 'rgba(232,244,247,0.76)', maxWidth: '920px' }}>
            An AI implementation team that builds Financial Services Operations end to end — agents author, native AI acts, every change governed.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '24px', color: 'rgba(255,255,255,0.55)', position: 'relative' }}>
          <div style={{ display: 'flex' }}>Paulo Pierrondi · ServiceNow TAE</div>
          <div style={{ display: 'flex', color: '#52b8ff' }}>pierrondi.dev/fso</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
