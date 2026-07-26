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
  const { id, title, ...cardProps } = props

  return (
    <ToolCard
      {...cardProps}
      id={id}
      title={title}
      favorite={
        <div
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <FavoriteButton toolId={id} toolTitle={title} compact />
        </div>
      }
    />
  )
}
