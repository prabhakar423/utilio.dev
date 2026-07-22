import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { siteConfig } from '@/lib/site'

interface ContentPageProps {
  title: string
  description: string
  children: React.ReactNode
}

export function ContentPage({ title, description, children }: ContentPageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="border-b border-border/60 bg-muted/20">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to home
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
