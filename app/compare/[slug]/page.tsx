import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ShieldCheck, X } from 'lucide-react'
import { ToolCard } from '@/components/cards/tool-card'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import {
  getComparisonBySlug,
  getComparisonSlugs,
} from '@/lib/comparisons'
import { getGuideBySlug } from '@/lib/guides'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { tools } from '@/lib/tools'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) return { title: 'Comparison Not Found' }

  return createPageMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
    keywords: comparison.keywords,
  })
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)

  if (!comparison) {
    notFound()
  }

  const tool = tools[comparison.toolId]
  const seoGuide = tool?.seoGuideSlug ? getGuideBySlug(tool.seoGuideSlug) : undefined

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.title,
    description: comparison.description,
    datePublished: comparison.publishedAt,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/compare/${comparison.slug}`,
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Header />
      <main id="main-content" className="flex-1">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Compare', href: '/compare' },
            { label: comparison.title },
          ]}
        />

        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="size-3.5" />
              Runs locally · No upload
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{comparison.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{comparison.intro}</p>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
              <h2 className="font-semibold text-primary">{siteConfig.name}</h2>
              <ul className="mt-4 space-y-3">
                {comparison.utiliioPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-border/70 bg-muted/20 p-5">
              <h2 className="font-semibold">{comparison.competitor}</h2>
              <ul className="mt-4 space-y-3">
                {comparison.competitorPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                    <X className="mt-0.5 size-4 shrink-0 opacity-60" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-10 rounded-2xl border border-border/70 bg-card/50 p-6">
            <h2 className="text-xl font-semibold">Verdict</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{comparison.verdict}</p>
          </section>

          {tool && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold">Try it yourself</h2>
              <div className="mt-4 max-w-md">
                <ToolCard {...tool} />
              </div>
              {seoGuide && (
                <Link
                  href={`/guides/${seoGuide.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary/80"
                >
                  Read: {seoGuide.title} →
                </Link>
              )}
            </section>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/compare"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              ← All comparisons
            </Link>
            <Link href="/guides" className="text-sm font-medium text-primary hover:text-primary/80">
              Read guides →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
