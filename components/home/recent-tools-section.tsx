'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { ToolCard } from '@/components/cards/tool-card'
import { getRecentToolIds } from '@/lib/recent-tools'
import { getToolSearchItem, type ToolSearchItem } from '@/lib/tool-search-index'

export function RecentToolsSection() {
  const [recent, setRecent] = useState<ToolSearchItem[]>([])

  useEffect(() => {
    const ids = getRecentToolIds()
    setRecent(ids.map((id) => getToolSearchItem(id)).filter(Boolean) as ToolSearchItem[])
  }, [])

  if (recent.length === 0) return null

  return (
    <section className="border-b border-border/60 bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-2">
          <Clock className="size-5 text-primary" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Recently used</h2>
            <p className="mt-1 text-muted-foreground">Pick up where you left off</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recent.slice(0, 4).map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
