import { Suspense } from 'react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { SearchResults } from './search-results'

export const metadata = createPageMetadata({
  title: 'Search Tools',
  description: `Search all free browser tools on ${siteConfig.name}.`,
  path: '/search',
})

export default function SearchPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
              <p className="text-muted-foreground">Searching…</p>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
