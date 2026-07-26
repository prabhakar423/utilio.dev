'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { ToolCard } from '@/components/cards/tool-card'
import { FAVORITES_CHANGED_EVENT, getFavoriteToolIds } from '@/lib/favorite-tools'
import { tools, type ToolDefinition } from '@/lib/tools'

export function FavoriteToolsSection() {
  const [favorites, setFavorites] = useState<ToolDefinition[]>([])

  useEffect(() => {
    const load = () => {
      const ids = getFavoriteToolIds()
      setFavorites(ids.map((id) => tools[id]).filter(Boolean))
    }
    load()
    window.addEventListener(FAVORITES_CHANGED_EVENT, load)
    return () => window.removeEventListener(FAVORITES_CHANGED_EVENT, load)
  }, [])

  if (favorites.length === 0) return null

  return (
    <section className="border-b border-border/60 bg-muted/10 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-2">
          <Star className="size-5 fill-amber-400 text-amber-400" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Your favorites</h2>
            <p className="mt-1 text-muted-foreground">Saved on this device — no account needed</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.slice(0, 4).map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
