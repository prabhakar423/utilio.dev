'use client'

import { useState } from 'react'

export function WordCounter() {
  const [text, setText] = useState('')

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    sentences: text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
  }

  const avgWordsPerLine = stats.lines > 0 ? (stats.words / stats.lines).toFixed(2) : '0.00'
  const avgCharsPerWord = stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(2) : '0.00'

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Paste or type your text here...'
          className="w-full h-64 p-3 font-mono text-sm border border-border rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-primary">{stats.characters}</div>
          <div className="text-xs text-muted-foreground mt-1">Characters</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
          <div className="text-xs text-muted-foreground mt-1">Chars (no spaces)</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-primary">{stats.words}</div>
          <div className="text-xs text-muted-foreground mt-1">Words</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-primary">{stats.lines}</div>
          <div className="text-xs text-muted-foreground mt-1">Lines</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
          <div className="text-xs text-muted-foreground mt-1">Sentences</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
          <div className="text-xs text-muted-foreground mt-1">Paragraphs</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-card border border-border">
        <div>
          <div className="text-lg font-bold text-primary">{avgWordsPerLine}</div>
          <div className="text-xs text-muted-foreground mt-1">Avg Words/Line</div>
        </div>
        <div>
          <div className="text-lg font-bold text-primary">{avgCharsPerWord}</div>
          <div className="text-xs text-muted-foreground mt-1">Avg Chars/Word</div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-card border border-border">
        <h3 className="font-semibold text-sm mb-2">Reading Time (assuming 200 wpm):</h3>
        <div className="text-2xl font-bold text-primary">{Math.ceil(stats.words / 200)} min</div>
      </div>
    </div>
  )
}
