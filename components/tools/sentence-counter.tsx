'use client'

import { useMemo, useState } from 'react'
import { ToolStat } from '@/components/tools/tool-ui'

function countSentences(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  const matches = trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g)
  return matches?.filter((s) => s.trim()).length ?? 0
}

export function SentenceCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    if (!trimmed) return null
    const sentences = countSentences(trimmed)
    const words = trimmed.split(/\s+/).filter(Boolean).length
    const avgWords = sentences > 0 ? (words / sentences).toFixed(1) : '0'
    return { sentences, words, avgWords }
  }, [text])

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to count sentences…"
          className="min-h-56 w-full resize-y rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm shadow-inner transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {stats && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Sentences" value={stats.sentences} accent />
          <ToolStat label="Words" value={stats.words} />
          <ToolStat label="Avg words/sentence" value={stats.avgWords} />
        </div>
      )}
    </div>
  )
}
