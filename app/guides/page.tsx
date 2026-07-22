import { GuideCard } from '@/components/cards/guide-card'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { getAllGuides } from '@/lib/guides'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = createPageMetadata({
  title: `Guides — ${siteConfig.name}`,
  description: 'Learn how to use developer tools — Base64 encoding, JSON formatting, and more.',
  path: '/guides',
})

export default function GuidesIndexPage() {
  const guides = getAllGuides().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="border-b border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Guides</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Practical explainers that help you understand tools and solve problems faster.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
