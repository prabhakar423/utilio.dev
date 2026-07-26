'use client'

import { useEffect } from 'react'
import { addRecentTool } from '@/lib/recent-tools'

interface RecentToolsTrackerProps {
  toolId: string
}

export function RecentToolsTracker({ toolId }: RecentToolsTrackerProps) {
  useEffect(() => {
    addRecentTool(toolId)
  }, [toolId])

  return null
}
