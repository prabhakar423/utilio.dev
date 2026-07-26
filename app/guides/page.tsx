import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GuideCard } from '@/components/cards/guide-card'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import { getAllGuides, getFeaturedGuides, getWorkbenchGuides } from '@/lib/guides'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = createPageMetadata({
  title: `Guides — ${siteConfig.name}`,
  description: `Learn how to format JSON, decode JWTs, encode Base64, build cron schedules, and more — with free ${siteConfig.name} tools that run locally in your browser.`,
  path: '/guides',
  keywords: [
    'developer guides',
    'json formatter guide',
    'jwt decoder guide',
    'base64 encoding guide',
    'cron expression guide',
    'online tools tutorial',
  ],
})

export default function GuidesIndexPage() {
  const featured = getFeaturedGuides()
  const workbench = getWorkbenchGuides()
  const excludedSlugs = new Set([
    ...featured.map((g) => g.slug),
    ...workbench.map((g) => g.slug),
  ])
  const guides = getAllGuides()
    .filter((g) => !excludedSlugs.has(g.slug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} Guides`,
    itemListElement: getAllGuides().slice(0, 20).map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/guides/${guide.slug}`,
      name: guide.title,
    })),
  }

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <Header />
      <main id="main-content" className="flex-1">
        <div className="border-b border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Guides</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Practical explainers for {siteConfig.name} tools — JSON, JWT, encoding, cron, and more.
              Every example links to a free browser-based tool with no upload.
            </p>
            <Link
              href="/compare"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              See how {siteConfig.name} compares to other tools
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">Start here</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Most popular guides for developers debugging APIs, auth, and data formats.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">Workbench guides</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Deep dives on unified workbenches — multiple tabs, live output, and shareable state on one page.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {workbench.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">All guides</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
