'use client'

import { useMemo, useState } from 'react'
import { ToolStat } from '@/components/tools/tool-ui'

export function ParagraphCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    if (!trimmed) return null
    const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
    const words = trimmed.split(/\s+/).filter(Boolean).length
    const chars = trimmed.length
    return { paragraphs, words, chars }
  }, [text])

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to count paragraphs…"
          className="min-h-56 w-full resize-y rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm shadow-inner transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {stats && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Paragraphs" value={stats.paragraphs} accent />
          <ToolStat label="Words" value={stats.words} />
          <ToolStat label="Characters" value={stats.chars} />
        </div>
      )}
      <p className="text-xs text-muted-foreground">Paragraphs are separated by blank lines.</p>
    </div>
  )
}
