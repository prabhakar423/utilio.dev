'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const SearchBar = dynamic(
  () => import('@/components/search/search-bar').then((mod) => mod.SearchBar),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-9 w-full animate-pulse rounded-xl border border-border/60 bg-muted/40"
        aria-hidden
      />
    ),
  },
)

interface DeferredSearchBarProps {
  defaultQuery?: string
}

export function DeferredSearchBar({ defaultQuery }: DeferredSearchBarProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!ready) {
    return (
      <div
        className="h-9 w-full rounded-xl border border-border/60 bg-muted/20"
        aria-hidden
      />
    )
  }

  return <SearchBar defaultQuery={defaultQuery} />
}
