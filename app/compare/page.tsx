import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { getAllComparisons } from '@/lib/comparisons'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = createPageMetadata({
  title: `Compare — ${siteConfig.name} vs Other Online Tools`,
  description: `See how ${siteConfig.name} compares to other online tools. Privacy-first, browser-based processing with no upload required.`,
  path: '/compare',
})

export default function CompareIndexPage() {
  const comparisons = getAllComparisons().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />

        <div className="border-b border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="size-5" />
              <span className="text-sm font-medium">Privacy-first comparisons</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How {siteConfig.name} compares
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Honest comparisons focused on one question: does your data leave your browser?
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/compare/${comparison.slug}`}
                className="group rounded-2xl border border-border/70 bg-card/70 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <h2 className="text-lg font-semibold group-hover:text-primary">{comparison.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {comparison.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read comparison
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
