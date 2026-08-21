import { Suspense } from 'react'
import { AdSlot } from '@/components/layout/ad-slot'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { FaqSection } from '@/components/layout/faq-section'
import { FavoriteButton } from '@/components/layout/favorite-button'
import { LocalProcessingBadge } from '@/components/layout/local-processing-badge'
import { PrivacyBadge } from '@/components/layout/privacy-badge'
import { RecentToolsTracker } from '@/components/layout/recent-tools-tracker'
import { RelatedComparisons } from '@/components/layout/related-comparisons'
import { RelatedGuides } from '@/components/layout/related-guides'
import { RelatedTools } from '@/components/layout/related-tools'
import { SharedLinkBanner } from '@/components/layout/shared-link-banner'
import { ShareUrlProvider } from '@/components/layout/share-url-provider'
import { ToolShareButton } from '@/components/layout/tool-share-button'
import { JsonLd } from '@/components/seo/json-ld'
import { siteConfig } from '@/lib/site'
import {
  breadcrumbJsonLd,
  faqJsonLd,
  toolJsonLd,
} from '@/lib/seo'
import { getComparisonsForTool } from '@/lib/comparisons'
import { getGuidesForTool } from '@/lib/guides'
import {
  getCategoryById,
  getCategoryName,
  getRelatedTools,
  type ToolDefinition,
} from '@/lib/tools'
import { getLucideIcon } from '@/lib/utils'

interface ToolLayoutProps {
  tool: ToolDefinition
  children: React.ReactNode
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const category = getCategoryById(tool.category)
  const related = getRelatedTools(tool)
  const relatedGuides = getGuidesForTool(tool.id)
  const relatedComparisons = getComparisonsForTool(tool.id)
  const faq = tool.faq ?? []
  const Icon = getLucideIcon(tool.icon)
  const toolUrl = `${siteConfig.url}/tools/${tool.id}`

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...(category
      ? [{ label: category.name, href: `/category/${category.id}` }]
      : []),
    { label: tool.title },
  ]

  const schema = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      ...(category
        ? [{ name: category.name, path: `/category/${category.id}` }]
        : []),
      { name: tool.title, path: `/tools/${tool.id}` },
    ]),
    toolJsonLd(tool),
    ...(faq.length > 0 ? [faqJsonLd(faq)] : []),
  ]

  return (
    <ShareUrlProvider defaultUrl={toolUrl}>
      <RecentToolsTracker toolId={tool.id} />
      <JsonLd data={schema} />
      <Breadcrumb items={breadcrumbItems} />

      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <AdSlot placement="top-banner" className="mb-8" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {Icon && (
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <Icon className="size-5" />
                  </div>
                )}
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {getCategoryName(tool.category)}
                </span>
                <LocalProcessingBadge />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {tool.seoH1 ?? tool.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {tool.seoIntro ?? tool.longDescription ?? tool.description}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <FavoriteButton toolId={tool.id} toolTitle={tool.title} />
              <ToolShareButton title={tool.title} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <PrivacyBadge />
            <div className="mt-4 rounded-2xl border border-border/70 bg-card/50 p-5 shadow-sm sm:mt-6 sm:p-8">
              <Suspense fallback={null}>
                <SharedLinkBanner />
              </Suspense>
              {children}
            </div>
            <AdSlot placement="content-middle" className="mt-8" />
          </div>
          <AdSlot placement="sidebar" />
        </div>
      </div>

      <RelatedTools tools={related} />
      <RelatedComparisons comparisons={relatedComparisons} />
      <RelatedGuides guides={relatedGuides} />
      {faq.length > 0 && <FaqSection items={faq} />}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <AdSlot placement="content-bottom" />
      </div>
    </ShareUrlProvider>
  )
}
