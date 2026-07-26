'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ToolCardWithFavorite } from '@/components/cards/tool-card-with-favorite'
import { EmptyState } from '@/components/layout/empty-state'
import { DeferredSearchBar } from '@/components/search/deferred-search-bar'
import { loadSearchIndex, searchLoadedIndex } from '@/lib/search-client'
import type { ToolSearchItem } from '@/lib/tool-search-index'

const POPULAR_TOOLS = [
  { id: 'json-formatter', label: 'JSON Formatter' },
  { id: 'jwt-decoder', label: 'JWT Decoder' },
  { id: 'hash-generator', label: 'Hash Generator' },
  { id: 'regex-tester', label: 'Regex Tester' },
  { id: 'base64-encoder', label: 'Base64 Encoder' },
  { id: 'password-generator', label: 'Password Generator' },
]

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<ToolSearchItem[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    void loadSearchIndex().then((index) => {
      setResults(searchLoadedIndex(query, index))
    })
  }, [query])

  return (
    <>
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {query ? `Results for "${query}"` : 'Search tools'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {query
              ? `${results.length} tool${results.length !== 1 ? 's' : ''} found`
              : 'Find tools by name, category, or keyword.'}
          </p>
          <div className="mt-6 max-w-xl">
            <DeferredSearchBar defaultQuery={query} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCardWithFavorite key={tool.id} {...tool} />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <EmptyState
              title={query ? 'No tools found' : 'Start searching'}
              description={
                query
                  ? 'Try a different keyword, or pick one of the popular tools below.'
                  : 'Search by tool name, description, or category.'
              }
              actionLabel="Browse categories"
              actionHref="/"
            />
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Popular tools</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR_TOOLS.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-sm transition-colors hover:border-primary/30 hover:bg-card hover:text-primary"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
