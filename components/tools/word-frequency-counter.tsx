'use client'

import { useMemo, useState } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function WordFrequencyCounter() {
  const [text, setText] = useState('')

  const frequencies = useMemo(() => {
    const trimmed = text.trim()
    if (!trimmed) return []

    const counts = new Map<string, number>()
    const words = trimmed.toLowerCase().match(/\b[\w']+\b/g) ?? []
    for (const word of words) {
      counts.set(word, (counts.get(word) ?? 0) + 1)
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
  }, [text])

  const totalWords = useMemo(() => {
    const words = text.trim().match(/\b[\w']+\b/g)
    return words?.length ?? 0
  }, [text])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text input">
        <ToolTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to analyze word frequency…"
          mono={false}
        />
      </ToolPanel>
      {frequencies.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            {totalWords.toLocaleString()} words · {frequencies.length} unique (top 50 shown)
          </p>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Word</th>
                  <th className="px-4 py-2 font-medium">Count</th>
                  <th className="px-4 py-2 font-medium">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {frequencies.map(([word, count]) => (
                  <tr key={word} className="hover:bg-muted/20">
                    <td className="px-4 py-2 font-mono">{word}</td>
                    <td className="px-4 py-2">{count}</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {((count / totalWords) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
