/** @type {import('next').NextConfig} */
const compareSlugs = [
  'json-formatter',
  'base64-encode',
  'cron-tools',
  'jwt-io',
  'cyberchef',
  'crontab-guru',
  'hash-tools',
  'yaml-converters',
  'url-encoders',
]

const compareRedirects = [
  ...compareSlugs.map((slug) => ({
    source: `/compare/utilio-vs-${slug}`,
    destination: `/compare/utiliio-vs-${slug}`,
    permanent: true,
  })),
  ...compareSlugs.map((slug) => ({
    source: `/compare/utillio-vs-${slug}`,
    destination: `/compare/utiliio-vs-${slug}`,
    permanent: true,
  })),
]

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
