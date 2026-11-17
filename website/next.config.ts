import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three ships modern ESM; let Next transpile drei/fiber cleanly.
  transpilePackages: ['three'],
  // Service pages that were renamed, merged or removed.
  async redirects() {
    return [
      { source: '/services/email-campaigns', destination: '/services/email-linkedin-marketing', permanent: true },
      { source: '/services/content-creation', destination: '/services/photography-video', permanent: true },
      { source: '/services/landing-pages', destination: '/#services', permanent: true },
    ]
  },
}

export default nextConfig
