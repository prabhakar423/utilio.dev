'use client'

import { useMemo, useState } from 'react'
import { ToolStat } from '@/components/tools/tool-ui'

function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }
  return matrix[a.length][b.length]
}

export function LevenshteinCalculator() {
  const [first, setFirst] = useState('kitten')
  const [second, setSecond] = useState('sitting')

  const stats = useMemo(() => {
    if (!first && !second) return null
    const distance = levenshtein(first, second)
    const maxLen = Math.max(first.length, second.length)
    const similarity = maxLen === 0 ? 100 : Math.round((1 - distance / maxLen) * 100)
    return { distance, similarity }
  }, [first, second])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">String A</label>
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">String B</label>
          <input
            type="text"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolStat label="Edit distance" value={stats.distance} accent />
          <ToolStat label="Similarity" value={`${stats.similarity}%`} />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Levenshtein distance is the minimum number of single-character edits (insertions, deletions, substitutions) to transform one string into another.
      </p>
    </div>
  )
}
