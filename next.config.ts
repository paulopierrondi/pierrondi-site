import type { NextConfig } from 'next'

// Note: @next/bundle-analyzer was removed — it's webpack-only and our build runs
// on Turbopack. Use `npm run analyze` (→ `next experimental-analyze`) instead.

// Routes that actually spawn ffmpeg/ffprobe at request time (or transitively
// import a module that does). Anything not in this list is built without the
// ~100MB ffmpeg binary in its serverless bundle. Adding a new render entry
// point? Add the route here.
const FFMPEG_BINARY_GLOBS = [
  './node_modules/ffmpeg-static/**/*',
  './node_modules/ffprobe-static/bin/**/*',
  './node_modules/ffprobe-static/index.js',
  './node_modules/ffprobe-static/package.json',
]

const FFMPEG_TRACED_ROUTES = [
  '/api/studio/videos/render',
  '/api/studio/videos/[id]/render',
  '/api/studio/creatives/remix',
  '/api/studio/long-form/ingest',
  '/api/studio/long-form/[id]',
  '/api/studio/voice/clone',
  '/api/studio/voice/list',
  '/api/admin/render-and-publish/[scriptId]',
  '/api/admin/creative-remix',
  '/api/admin/render-debug',
  '/api/marketing-os/force-video',
  '/api/marketing-os/render-debug',
  '/api/marketing-os/campaigns/youtube-burst',
  '/api/cron/daily-video',
  '/api/cron/video-quality',
  '/api/cron/weekly-youtube-burst',
  '/studio/videos/[id]',
]

const ffmpegTracingIncludes = Object.fromEntries(
  FFMPEG_TRACED_ROUTES.map((route) => [route, FFMPEG_BINARY_GLOBS])
)

const CANONICAL_REDIRECTS = [
  { source: '/agentes', destination: '/portfolio', permanent: true },
  { source: '/app-store-connect', destination: '/precos', permanent: true },
  { source: '/sobre', destination: '/about', permanent: true },
  { source: '/servicos', destination: '/atuacao', permanent: true },
  { source: '/services', destination: '/atuacao', permanent: true },
  { source: '/privacy-policy', destination: '/privacy', permanent: true },
  { source: '/policy', destination: '/privacy', permanent: true },
  { source: '/terms-of-service', destination: '/terms', permanent: true },
]

const nextConfig: NextConfig = {
  serverExternalPackages: ['ffmpeg-static', 'ffprobe-static'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@base-ui/react'],
  },
  // CI runs `tsc --noEmit` and `eslint` as separate steps. Next 16 already
  // dropped the built-in eslint pass, so we rely on the CI steps for validation.
  // Do NOT disable TypeScript errors here — they are real build defects.
  outputFileTracingIncludes: ffmpegTracingIncludes,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 768, 1024, 1440],
  },
  async headers() {
    return [
      {
        source: '/bradesco-26',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0, must-revalidate' }],
      },
      {
        source: '/bradesco-26/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0, must-revalidate' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(self), microphone=(self), geolocation=(self)' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self' blob:",
              // localhost / 127.0.0.1 allowed so the Studio (browser) can talk
              // to the local-agent (pierrondi-local-agent) on the user's Mac.
              // The local-agent itself enforces token + Origin allowlist.
              "connect-src 'self' formspree.io https://plausible.io *.sentry.io http://127.0.0.1:* http://localhost:* ws://127.0.0.1:* ws://localhost:*",
              "frame-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return CANONICAL_REDIRECTS
  },
}

export default nextConfig
