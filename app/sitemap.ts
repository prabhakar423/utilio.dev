import type { MetadataRoute } from 'next'
import { categories } from '@/lib/categories'
import { getComparisonSlugs } from '@/lib/comparisons'
import { CLICK_PRIORITY_GUIDE_SLUGS, getAllGuides } from '@/lib/guides'
import { siteConfig } from '@/lib/site'
import { CLICK_PRIORITY_TOOL_IDS } from '@/lib/tools'
import { toolSearchIndex } from '@/lib/tool-search-index'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/compare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const clickPriorityGuideSlugs = new Set<string>(CLICK_PRIORITY_GUIDE_SLUGS)
  const clickPriorityToolIds = new Set<string>(CLICK_PRIORITY_TOOL_IDS)

  const guidePages: MetadataRoute.Sitemap = getAllGuides()
    .filter((guide) => !guide.noindex)
    .map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedAt ?? guide.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: clickPriorityGuideSlugs.has(guide.slug) ? 0.85 : 0.75,
    }))

  const comparisonPages: MetadataRoute.Sitemap = getComparisonSlugs().map((slug) => ({
    url: `${base}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.72,
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
    priority: clickPriorityToolIds.has(tool.id) ? 0.95 : 0.9,
  }))

  return [...staticPages, ...guidePages, ...comparisonPages, ...categoryPages, ...toolPages]
}
