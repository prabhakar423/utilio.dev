import Link from 'next/link'
import { BrandLogo } from '@/components/layout/brand-logo'
import { getAllGuides } from '@/lib/guides'
import { siteConfig } from '@/lib/site'
import { categories, getToolCount } from '@/lib/tools'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const guideCount = getAllGuides().length
  const toolCount = getToolCount()

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo size="sm" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description} Currently {toolCount} tools and {guideCount} guides — and
              growing.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground transition-colors hover:text-foreground">
                  All tools
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground transition-colors hover:text-foreground">
                  Guides ({guideCount})
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground transition-colors hover:text-foreground">
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
