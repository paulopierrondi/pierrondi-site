import { ImageResponse } from 'next/og'

// Note: removed `runtime = 'edge'`. We deploy on Railway (single Node.js server,
// no edge runtime available). Edge here just got simulated and triggered the
// "Using edge runtime on a page currently disables static generation" warning
// without buying anything. Default Node runtime is what Railway actually runs.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#060606',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top — logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#62d84e',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#e6e6e6',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
            PIERRONDI.DEV
          </span>
        </div>

        {/* Center — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '88px',
              fontWeight: 800,
              color: '#e6e6e6',
              lineHeight: 0.9,
              letterSpacing: 0,
            }}
          >
            AI Operating Model.
          </div>
          <div
            style={{
              fontSize: '88px',
              fontWeight: 800,
              color: '#62d84e',
              lineHeight: 0.9,
              letterSpacing: 0,
            }}
          >
            ServiceNow + AgentOps.
          </div>
        </div>

        {/* Bottom — tagline */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: '16px',
              color: '#666666',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Enterprise AI | Platform Strategy | Workflows
          </span>
          <span
            style={{
              fontSize: '16px',
              color: '#62d84e',
              letterSpacing: '1px',
            }}
          >
            pierrondi.dev
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
