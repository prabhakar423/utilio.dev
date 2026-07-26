import type { MetadataRoute } from 'next'
import { categories } from '@/lib/categories'
import { getGuideSlugs } from '@/lib/guides'
import { siteConfig } from '@/lib/site'
import { toolSearchIndex } from '@/lib/tool-search-index'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const guidePages: MetadataRoute.Sitemap = getGuideSlugs().map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const toolPages: MetadataRoute.Sitemap = toolSearchIndex.map((tool) => ({
    url: `${base}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...guidePages, ...categoryPages, ...toolPages]
}
