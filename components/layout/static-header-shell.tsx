import Link from 'next/link'
import { Search } from 'lucide-react'
import { BrandLogo } from '@/components/layout/brand-logo'
import { siteConfig } from '@/lib/site'

/** Minimal server-rendered header shell for fast first paint on the homepage. */
export function StaticHeaderShell() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo />
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted-foreground lg:hidden"
            aria-label="Search tools"
          >
            <Search className="size-5" />
          </Link>
          <span className="hidden text-sm text-muted-foreground lg:inline">{siteConfig.name}</span>
        </div>
      </div>
    </header>
  )
}
