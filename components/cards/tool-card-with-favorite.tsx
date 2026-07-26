'use client'

import { ToolCard } from '@/components/cards/tool-card'
import { FavoriteButton } from '@/components/layout/favorite-button'

interface ToolCardWithFavoriteProps {
  id: string
  title: string
  description: string
  icon: string
  category: string
  compact?: boolean
  prefetch?: boolean
}

export function ToolCardWithFavorite(props: ToolCardWithFavoriteProps) {
  return (
    <div className="group relative">
      <ToolCard {...props} />
      <div
        className="absolute right-3 top-3 z-10 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <FavoriteButton toolId={props.id} toolTitle={props.title} compact />
      </div>
    </div>
  )
}
