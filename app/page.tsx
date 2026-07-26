import Link from 'next/link'
import { ArrowRight, Lock, Sparkles, Zap } from 'lucide-react'
import { CategoryCard } from '@/components/cards/category-card'
import { GuideCard } from '@/components/cards/guide-card'
import { ToolCard } from '@/components/cards/tool-card'
import { DeferredHomeSections } from '@/components/home/deferred-home-sections'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import { HeroSearchForm } from '@/components/search/hero-search-form'
import { siteConfig } from '@/lib/site'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { getAllGuides } from '@/lib/guides'
import {
  categories,
  getAllTools,
  getRecentlyAddedTools,
  getToolCount,
  getTrendingTools,
} from '@/lib/tools'

export default function HomePage() {
  const toolCount = getToolCount()
  const allTools = getAllTools()
  const trendingTools = getTrendingTools()
  const recentTools = getRecentlyAddedTools(4)
  const allGuides = getAllGuides()
  const guides = allGuides
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4)
  const previewTools = [...allTools]
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 12)

  return (
    <>
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="size-3.5" />
                {toolCount} free tools · {siteConfig.hero.badge}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {siteConfig.hero.headline}
                <span className="block text-primary [background-image:linear-gradient(to_right,var(--primary),var(--primary),var(--accent))] [-webkit-background-clip:text] [background-clip:text] [-webkit-text-fill-color:transparent] [text-fill-color:transparent] supports-[background-clip:text]:text-transparent">
                  {siteConfig.hero.highlight}
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 text-balance">
                {siteConfig.description}
              </p>

              <div className="mx-auto mt-10 max-w-xl">
                <HeroSearchForm />
              </div>

              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: Zap, label: `${toolCount} tools`, sub: 'More added regularly' },
                  { icon: Lock, label: '100% private', sub: 'Data never leaves your device' },
                  { icon: Sparkles, label: `${allGuides.length} guides`, sub: 'Free forever, no accounts' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm"
                  >
                    <Icon className="mx-auto size-5 text-primary" />
                    <div className="mt-2 font-semibold">{label}</div>
                    <div className="mt-0.5 text-xs text-foreground/65">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DeferredHomeSections />

        {/* Categories */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Browse by category</h2>
                <p className="mt-2 text-muted-foreground">
                  {categories.length} categories · {toolCount} tools available now
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular */}
        <section className="border-y border-border/60 bg-muted/20 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Popular tools</h2>
                <p className="mt-2 text-muted-foreground">Most useful utilities to start with</p>
              </div>
              <Link
                href="/search"
                className="hidden items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
              >
                View all tools
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trendingTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Recently added */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Recently added</h2>
              <p className="mt-2 text-muted-foreground">Latest tools on the platform</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Guides */}
        <section className="border-t border-border/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Guides</h2>
                <p className="mt-2 text-muted-foreground">
                  {allGuides.length} guides · learn the concepts behind the tools
                </p>
              </div>
              <Link
                href="/guides"
                className="hidden items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
              >
                All guides
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} compact />
              ))}
            </div>
          </div>
        </section>

        {/* All tools preview */}
        <section className="border-t border-border/60 bg-muted/20 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Every tool, one platform</h2>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                A growing library of browser-based utilities — showing {previewTools.length} of{' '}
                {toolCount} tools below.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {previewTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} compact prefetch={false} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse all {toolCount} tools
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
