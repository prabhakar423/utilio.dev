import type { Metadata } from 'next'
import { withPrivacyMetaDescription } from '@/lib/privacy-copy'
import { siteConfig } from '@/lib/site'
import type { ToolDefinition } from '@/lib/tools'
import { categories, getCategoryById } from '@/lib/tools'

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
}): Metadata {
  const url = `${siteConfig.url}${path}`

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export function createToolMetadata(tool: ToolDefinition): Metadata {
  const ogImage = `${siteConfig.url}/tools/${tool.id}/opengraph-image`
  const description = withPrivacyMetaDescription(tool.longDescription ?? tool.description)
  return createPageMetadata({
    title: `${tool.title} — Free Online Tool`,
    description,
    path: `/tools/${tool.id}`,
    keywords: tool.keywords,
    ogImage,
  })
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function toolJsonLd(tool: ToolDefinition) {
  const category = getCategoryById(tool.category)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.longDescription ?? tool.description,
    url: `${siteConfig.url}/tools/${tool.id}`,
    applicationCategory: category?.name ?? 'Utility',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
  }
}

export function categoryMetadata(categoryId: string): Metadata | null {
  const category = categories.find((c) => c.id === categoryId)
  if (!category) return null

  return createPageMetadata({
    title: `${category.name} — Free Online Tools`,
    description: category.description,
    path: `/category/${category.id}`,
  })
}
