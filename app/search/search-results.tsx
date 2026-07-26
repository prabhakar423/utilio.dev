'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ToolCard } from '@/components/cards/tool-card'
import { EmptyState } from '@/components/layout/empty-state'
import { searchToolIndex, type ToolSearchItem } from '@/lib/tool-search-index'

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<ToolSearchItem[]>([])

  useEffect(() => {
    setResults(query.trim() ? searchToolIndex(query) : [])
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
              : 'Enter a search term to find tools by name, category, or keyword.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={query ? 'No tools found' : 'Start searching'}
            description={
              query
                ? 'Try a different keyword, or browse tools by category from the homepage.'
                : 'Search by tool name, description, or category.'
            }
            actionLabel="Browse categories"
            actionHref="/"
          />
        )}
      </div>
    </>
  )
}
