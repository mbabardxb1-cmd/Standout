import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three ships modern ESM; let Next transpile drei/fiber cleanly.
  transpilePackages: ['three'],
}

export default nextConfig
