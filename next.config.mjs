import { createRequire } from 'module'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

const hasDSN = !!(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN)

let config = nextConfig

if (hasDSN) {
  const require = createRequire(import.meta.url)
  const { withSentryConfig } = require('@sentry/nextjs')
  config = withSentryConfig(nextConfig, { silent: true })
}

export default config
