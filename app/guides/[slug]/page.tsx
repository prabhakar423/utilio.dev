import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ToolCard } from '@/components/cards/tool-card'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import { getGuideBySlug, getGuideSlugs, type GuideBlock } from '@/lib/guides'
import { withPrivacyMetaDescription } from '@/lib/privacy-copy'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { tools } from '@/lib/tools'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return { title: 'Guide Not Found' }

  return createPageMetadata({
    title: `${guide.title} — ${siteConfig.name}`,
    description: withPrivacyMetaDescription(guide.description),
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
  })
}

function GuideBlockRenderer({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="mt-8 text-xl font-semibold text-foreground">{block.text}</h2>
    case 'paragraph':
      return <p className="mt-4 leading-relaxed">{block.text}</p>
    case 'list':
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'tool-cta':
      return (
        <Link
          href={`/tools/${block.toolId}`}
          className="mt-6 inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {block.label} →
        </Link>
      )
    default:
      return null
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const relatedTools = guide.relatedTools.map((id) => tools[id]).filter(Boolean)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/guides/${guide.slug}`,
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Header />
      <main id="main-content" className="flex-1">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: guide.title },
          ]}
        />

        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <header>
            <time dateTime={guide.publishedAt} className="text-sm text-muted-foreground">
              {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{guide.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{guide.description}</p>
          </header>

          <div className="mt-8 text-muted-foreground">
            {guide.blocks.map((block, index) => (
              <GuideBlockRenderer key={index} block={block} />
            ))}
          </div>
        </article>

        {relatedTools.length > 0 && (
          <section className="border-t border-border/60 bg-muted/20 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight">Related tools</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((tool) => (
                  <ToolCard key={tool.id} {...tool} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
