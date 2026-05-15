import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@base-ui/react'],
  },
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 768, 1024, 1440],
  },
  async headers() {
    return [
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self' blob:",
              "connect-src 'self' formspree.io",
              "frame-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/policy', destination: '/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
    ]
  },
}

export default nextConfig
