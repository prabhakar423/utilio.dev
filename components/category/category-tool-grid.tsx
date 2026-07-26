'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ToolCardWithFavorite } from '@/components/cards/tool-card-with-favorite'

export interface CategoryToolItem {
  id: string
  title: string
  description: string
  icon: string
  category: string
}

interface CategoryToolGridProps {
  tools: CategoryToolItem[]
}

export function CategoryToolGrid({ tools }: CategoryToolGridProps) {
  const [filter, setFilter] = useState('')

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return tools
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q),
    )
  }, [filter, tools])

  return (
    <>
      <div className="relative mb-8 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`Filter ${tools.length} tools…`}
          className="w-full rounded-xl border border-border/80 bg-background/80 py-2.5 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCardWithFavorite key={tool.id} {...tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/70 bg-card/50 px-6 py-12 text-center">
          <p className="font-medium">No matching tools</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different filter term.</p>
          <button
            type="button"
            onClick={() => setFilter('')}
            className="mt-4 text-sm font-medium text-primary hover:text-primary/80"
          >
            Clear filter
          </button>
        </div>
      )}
    </>
  )
}
