'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

type SortOrder = 'asc' | 'desc' | 'reverse' | 'random'

const SHARE_INITIAL = { input: '', order: 'asc' }

function sortLines(text: string, order: SortOrder, seed: number): string {
  const lines = text.split('\n')
  switch (order) {
    case 'asc':
      return [...lines].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).join('\n')
    case 'desc':
      return [...lines].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' })).join('\n')
    case 'reverse':
      return [...lines].reverse().join('\n')
    case 'random': {
      const shuffled = [...lines]
      let s = seed
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        s = (s * 1103515245 + 12345) & 0x7fffffff
        const j = s % (i + 1)
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled.join('\n')
    }
    default:
      return text
  }
}

export function LineSorter() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const order = (state.order as SortOrder) || 'asc'
  const [shuffleSeed, setShuffleSeed] = useState(1)

  const output = useMemo(() => {
    if (!state.input.trim()) return ''
    return sortLines(state.input, order, shuffleSeed)
  }, [state.input, order, shuffleSeed])

  const setOrder = (next: SortOrder) => {
    setField('order', next)
    if (next === 'random') setShuffleSeed((s) => s + 1)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input (one item per line)">
        <ToolTextarea
          value={state.input}
          onChange={(e) => setField('input', e.target.value)}
          placeholder="zebra&#10;apple&#10;mango"
          mono={false}
        />
      </ToolPanel>

      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant={order === 'asc' ? 'default' : 'outline'} onClick={() => setOrder('asc')}>
          A → Z
        </Button>
        <Button type="button" size="sm" variant={order === 'desc' ? 'default' : 'outline'} onClick={() => setOrder('desc')}>
          Z → A
        </Button>
        <Button type="button" size="sm" variant={order === 'reverse' ? 'default' : 'outline'} onClick={() => setOrder('reverse')}>
          Reverse
        </Button>
        <Button type="button" size="sm" variant={order === 'random' ? 'default' : 'outline'} onClick={() => setOrder('random')}>
          Shuffle
        </Button>
      </div>

      <ToolPanel label="Sorted output">
        <ToolTextarea value={output} readOnly mono={false} placeholder="Sorted lines appear here…" />
      </ToolPanel>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
