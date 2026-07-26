/** @type {import('next').NextConfig} */
const compareRedirects = [
  'json-formatter',
  'base64-encode',
  'cron-tools',
  'jwt-io',
  'cyberchef',
  'crontab-guru',
  'hash-tools',
  'yaml-converters',
  'url-encoders',
].map((slug) => ({
  source: `/compare/utilio-vs-${slug}`,
  destination: `/compare/utillio-vs-${slug}`,
  permanent: true,
}))

const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return compareRedirects
  },
}

export default nextConfig
