import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ToolCardWithFavorite } from '@/components/cards/tool-card-with-favorite'
import { CategoryToolGrid } from '@/components/category/category-tool-grid'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { EmptyState } from '@/components/layout/empty-state'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbJsonLd, categoryMetadata } from '@/lib/seo'
import { categories, getFeaturedToolsForCategory, getToolsByCategory } from '@/lib/tools'
import { getLucideIcon } from '@/lib/utils'

interface PageProps {
  params: Promise<{ categoryId: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({ categoryId: category.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { categoryId } = await params
  return categoryMetadata(categoryId) ?? { title: 'Category Not Found' }
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params
  const category = categories.find((c) => c.id === categoryId)

  if (!category) {
    notFound()
  }

  const categoryTools = getToolsByCategory(categoryId)
  const featuredTools = getFeaturedToolsForCategory(categoryId)
  const featuredIds = new Set(featuredTools.map((tool) => tool.id))
  const remainingTools = categoryTools.filter((tool) => !featuredIds.has(tool.id))
  const Icon = getLucideIcon(category.icon)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: `/category/${category.id}` },
        ])}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: category.name },
          ]}
        />

        <div className="border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              {Icon && (
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="size-6" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
                <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {categoryTools.length} tool{categoryTools.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {featuredTools.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold tracking-tight">Popular in {category.name}</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featuredTools.map((tool) => (
                  <ToolCardWithFavorite
                    key={tool.id}
                    id={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    category={tool.category}
                  />
                ))}
              </div>
            </section>
          )}

          {remainingTools.length > 0 ? (
            <CategoryToolGrid
              tools={remainingTools.map((tool) => ({
                id: tool.id,
                title: tool.title,
                description: tool.description,
                icon: tool.icon,
                category: tool.category,
              }))}
            />
          ) : categoryTools.length === 0 ? (
            <EmptyState
              title="No tools yet"
              description="This category is being expanded. Check back soon or browse other categories."
              actionHref="/"
            />
          ) : null}

          <div className="mt-12 text-center">
            <Link
              href="/search"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Browse all tools →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
