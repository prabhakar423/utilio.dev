'use client'

import { useMemo } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

type DiffLine = { type: 'same' | 'added' | 'removed'; text: string }

const SHARE_INITIAL = { textA: '', textB: '' }

function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n')
  const linesB = b.split('\n')
  const result: DiffLine[] = []
  const max = Math.max(linesA.length, linesB.length)

  for (let i = 0; i < max; i++) {
    const lineA = linesA[i]
    const lineB = linesB[i]

    if (lineA === lineB) {
      if (lineA !== undefined) result.push({ type: 'same', text: lineA })
    } else {
      if (lineA !== undefined) result.push({ type: 'removed', text: lineA })
      if (lineB !== undefined) result.push({ type: 'added', text: lineB })
    }
  }

  return result
}

export function TextDiff() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { textA, textB } = state

  const diff = useMemo(() => {
    if (!textA && !textB) return null
    return diffLines(textA, textB)
  }, [textA, textB])

  const stats = useMemo(() => {
    if (!diff) return null
    return {
      added: diff.filter((d) => d.type === 'added').length,
      removed: diff.filter((d) => d.type === 'removed').length,
      same: diff.filter((d) => d.type === 'same').length,
    }
  }, [diff])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Original text">
          <ToolTextarea
            value={textA}
            onChange={(e) => setField('textA', e.target.value)}
            placeholder="Paste original text…"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Changed text">
          <ToolTextarea
            value={textB}
            onChange={(e) => setField('textB', e.target.value)}
            placeholder="Paste modified text…"
            mono={false}
          />
        </ToolPanel>
      </div>

      {stats && (
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="text-emerald-600 dark:text-emerald-400">+{stats.added} added</span>
          <span className="text-red-600 dark:text-red-400">−{stats.removed} removed</span>
          <span>{stats.same} unchanged</span>
        </div>
      )}

      {diff && diff.length > 0 && (
        <ToolPanel label="Diff">
          <div className="max-h-96 overflow-auto rounded-xl border border-border/70 font-mono text-sm">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`px-3 py-0.5 ${
                  line.type === 'added'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : line.type === 'removed'
                      ? 'bg-red-500/10 text-red-700 dark:text-red-300'
                      : ''
                }`}
              >
                <span className="mr-2 select-none text-muted-foreground">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                </span>
                {line.text || '\u00a0'}
              </div>
            ))}
          </div>
        </ToolPanel>
      )}
    </div>
  )
}
