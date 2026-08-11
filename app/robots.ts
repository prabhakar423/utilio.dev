import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/opengraph-image',
        '/icon',
        '/tools/*/opengraph-image',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
