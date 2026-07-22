'use client'

import { useMemo, useState } from 'react'
import { ToolStat } from '@/components/tools/tool-ui'

const WORDS_PER_MINUTE = 200

export function ReadingTimeCalculator() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    if (!trimmed) return null

    const words = trimmed.split(/\s+/).filter(Boolean).length
    const characters = trimmed.length
    const minutes = words / WORDS_PER_MINUTE
    const seconds = Math.ceil(minutes * 60)

    return {
      words,
      characters,
      minutes: Math.max(1, Math.ceil(minutes)),
      seconds,
    }
  }, [text])

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Text or article</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article or blog post here…"
          className="min-h-56 w-full resize-y rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm shadow-inner transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ToolStat label="Words" value={stats.words.toLocaleString()} />
          <ToolStat label="Characters" value={stats.characters.toLocaleString()} />
          <ToolStat label="Reading time" value={`${stats.minutes} min`} accent />
          <ToolStat label="At 200 wpm" value={`${stats.seconds}s`} />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Based on average adult reading speed of {WORDS_PER_MINUTE} words per minute.
      </p>
    </div>
  )
}
