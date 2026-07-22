'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

type SortOrder = 'asc' | 'desc' | 'reverse' | 'random'

function sortLines(text: string, order: SortOrder): string {
  const lines = text.split('\n')
  switch (order) {
    case 'asc':
      return [...lines].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).join('\n')
    case 'desc':
      return [...lines].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' })).join('\n')
    case 'reverse':
      return [...lines].reverse().join('\n')
    case 'random':
      return [...lines].sort(() => Math.random() - 0.5).join('\n')
    default:
      return text
  }
}

export function LineSorter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const run = (order: SortOrder) => {
    setOutput(sortLines(input, order))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input (one item per line)">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="zebra&#10;apple&#10;mango"
          mono={false}
        />
      </ToolPanel>

      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => run('asc')}>
          A → Z
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => run('desc')}>
          Z → A
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => run('reverse')}>
          Reverse
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => run('random')}>
          Shuffle
        </Button>
      </div>

      {output && (
        <>
          <ToolPanel label="Sorted output">
            <ToolTextarea value={output} readOnly mono={false} />
          </ToolPanel>
          <ToolActions>
            <Button type="button" variant="secondary" onClick={copy}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              Copy
            </Button>
          </ToolActions>
        </>
      )}
    </div>
  )
}
