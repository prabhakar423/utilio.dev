'use client'

import { useMemo, useState } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function CharacterFrequencyCounter() {
  const [text, setText] = useState('')

  const frequencies = useMemo(() => {
    if (!text) return []
    const map = new Map<string, number>()
    for (const char of text) {
      if (char === '\n') continue
      map.set(char, (map.get(char) ?? 0) + 1)
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([char, count]) => ({
        char: char === ' ' ? '(space)' : char,
        count,
        percent: ((count / text.replace(/\n/g, '').length) * 100).toFixed(1),
      }))
  }, [text])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text">
        <ToolTextarea value={text} onChange={(e) => setText(e.target.value)} mono={false} />
      </ToolPanel>
      {frequencies.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/30">
                <th className="px-4 py-2 text-left font-medium">Character</th>
                <th className="px-4 py-2 text-right font-medium">Count</th>
                <th className="px-4 py-2 text-right font-medium">%</th>
              </tr>
            </thead>
            <tbody>
              {frequencies.map(({ char, count, percent }) => (
                <tr key={char} className="border-b border-border/40">
                  <td className="px-4 py-2 font-mono">{char}</td>
                  <td className="px-4 py-2 text-right">{count}</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
