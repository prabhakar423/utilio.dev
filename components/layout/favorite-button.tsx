'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  FAVORITES_CHANGED_EVENT,
  isFavoriteTool,
  toggleFavoriteTool,
} from '@/lib/favorite-tools'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  toolId: string
  toolTitle: string
  compact?: boolean
}

export function FavoriteButton({ toolId, toolTitle, compact = false }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    setFavorited(isFavoriteTool(toolId))

    const sync = () => setFavorited(isFavoriteTool(toolId))
    window.addEventListener(FAVORITES_CHANGED_EVENT, sync)
    return () => window.removeEventListener(FAVORITES_CHANGED_EVENT, sync)
  }, [toolId])

  const handleToggle = () => {
    setFavorited(toggleFavoriteTool(toolId))
  }

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-8 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background"
        onClick={handleToggle}
        aria-label={favorited ? `Remove ${toolTitle} from favorites` : `Save ${toolTitle} to favorites`}
        aria-pressed={favorited}
      >
        <Star className={cn('size-4', favorited && 'fill-amber-400 text-amber-400')} />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      aria-label={favorited ? `Remove ${toolTitle} from favorites` : `Save ${toolTitle} to favorites`}
      aria-pressed={favorited}
    >
      <Star className={cn('size-4', favorited && 'fill-amber-400 text-amber-400')} />
      {favorited ? 'Saved' : 'Save'}
    </Button>
  )
}
