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
  // Point straight at the final destination to avoid 2-hop redirect chains
  // (/portfolio and /precos are themselves permanent redirects).
  { source: '/agentes', destination: '/feitos', permanent: true },
  { source: '/app-store-connect', destination: '/atuacao', permanent: true },
  { source: '/sobre', destination: '/about', permanent: true },
  { source: '/servicos', destination: '/atuacao', permanent: true },
  { source: '/services', destination: '/atuacao', permanent: true },
  { source: '/contact', destination: '/contato', permanent: true },
  // App-slug aliases -> their App Store canonical slug (verified against each
  // app's live asc.toml). Keeps legacy inbound links alive without shipping a
  // duplicate indexable page or a second sitemap entry for the same app.
  { source: '/apps/ammosort', destination: '/apps/ammosort-siege', permanent: true },
  { source: '/apps/ammosort/:doc', destination: '/apps/ammosort-siege/:doc', permanent: true },
  { source: '/apps/privytext', destination: '/apps/privytext-ai', permanent: true },
  { source: '/apps/privytext/:doc', destination: '/apps/privytext-ai/:doc', permanent: true },
  { source: '/apps/snapread-ai', destination: '/apps/snapread', permanent: true },
  { source: '/apps/snapread-ai/:doc', destination: '/apps/snapread/:doc', permanent: true },
  { source: '/privacy-policy', destination: '/privacy', permanent: true },
  { source: '/policy', destination: '/privacy', permanent: true },
  { source: '/terms-of-service', destination: '/terms', permanent: true },
]

// EN detail pages don't exist — redirect to the canonical PT slug so AI engines
// and shared links that construct /en/blog/<slug> or /en/feitos/<slug> don't 404.
// Use single-segment :slug (not :slug*) so the index pages /en/blog and
// /en/feitos remain 200s.
const EN_LOCALE_SLUG_REDIRECTS = [
  { source: '/en/blog/:slug', destination: '/blog/:slug', permanent: true },
  { source: '/en/feitos/:slug', destination: '/feitos/:slug', permanent: true },
]

// Apex -> www so ONE canonical host serves the whole site AND the GEO layer.
// Without this, https://pierrondi.dev/llms.txt (and /robots.txt, /sitemap.xml,
// /answers.json, every page) 404s on the apex — the site is dark to any AI answer
// engine or user that hits the apex. `has host` fires for the apex only, never www,
// so www traffic is untouched. redirects() run before the filesystem, so this also
// covers the static public/ artifacts. NOTE: if the apex is attached as a separate
// Railway domain that does not reach this app, set the redirect at the Railway
// domain level instead — this rule only fires when the apex request reaches Next.
const HOST_REDIRECTS = [
  {
    source: '/:path*',
    has: [{ type: 'host' as const, value: 'pierrondi.dev' }],
    destination: 'https://www.pierrondi.dev/:path*',
    permanent: true,
  },
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
    return [...HOST_REDIRECTS, ...CANONICAL_REDIRECTS, ...EN_LOCALE_SLUG_REDIRECTS]
  },
}

export default nextConfig
