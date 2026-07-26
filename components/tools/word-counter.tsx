'use client'

import { useMemo } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolPanel,
  ToolStat,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function computeStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text ? text.split('\n').length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = text ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0
  const paragraphs = text ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    sentences,
    paragraphs,
    avgWordsPerLine: lines > 0 ? (words / lines).toFixed(1) : '0',
    avgCharsPerWord: words > 0 ? (charactersNoSpaces / words).toFixed(1) : '0',
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
  }
}

export function WordCounter() {
  const [text, setText] = useShareableInput('')

  const stats = useMemo(() => computeStats(text), [text])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Your text">
        <ToolTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          mono={false}
          className="min-h-48"
        />
      </ToolPanel>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <ToolStat label="Words" value={stats.words} accent />
        <ToolStat label="Characters" value={stats.characters} />
        <ToolStat label="No spaces" value={stats.charactersNoSpaces} />
        <ToolStat label="Lines" value={stats.lines} />
        <ToolStat label="Sentences" value={stats.sentences} />
        <ToolStat label="Paragraphs" value={stats.paragraphs} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ToolStat label="Avg words / line" value={stats.avgWordsPerLine} />
        <ToolStat label="Avg chars / word" value={stats.avgCharsPerWord} />
        <ToolStat
          label="Reading time"
          value={stats.words > 0 ? `${stats.readingMinutes} min` : '—'}
          accent
        />
      </div>

      <ToolActions>
        <ToolClearButton onClear={() => setText('')} />
      </ToolActions>
    </div>
  )
}
