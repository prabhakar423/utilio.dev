'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { BrandLogo } from '@/components/layout/brand-logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { DeferredSearchBar } from '@/components/search/deferred-search-bar'
import { categories } from '@/lib/categories'
import { cn } from '@/lib/utils'

const primaryCategories = categories.slice(0, 5)
const moreCategories = categories.slice(5)

const navLinkClass =
  'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo />

        <div className="hidden min-w-0 flex-1 lg:block lg:max-w-sm xl:max-w-md">
          <DeferredSearchBar />
        </div>

        <nav
          aria-label="Main"
          className="hidden min-w-0 items-center gap-0.5 lg:flex"
        >
          {primaryCategories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className={navLinkClass}>
              {category.name}
            </Link>
          ))}

          {moreCategories.length > 0 && (
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={cn(navLinkClass, 'inline-flex items-center gap-1')}
              >
                More
                <ChevronDown
                  className={cn('size-3.5 transition-transform', moreOpen && 'rotate-180')}
                />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-border/80 bg-popover py-1 shadow-xl">
                  {moreCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <Link href="/guides" className={navLinkClass}>
            Guides
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Search tools"
          >
            <Search className="size-5" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <nav
            aria-label="Mobile"
            className="fixed inset-x-0 top-[calc(var(--header-offset,7rem))] z-50 max-h-[calc(100dvh-var(--header-offset,7rem))] overflow-y-auto border-b border-border/60 bg-background px-4 py-4 shadow-lg lg:hidden"
          >
            <div className="space-y-1">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 space-y-1 border-t border-border/60 pt-4">
              <Link
                href="/guides"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Guides
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                All tools
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
