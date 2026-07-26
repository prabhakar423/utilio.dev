'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE = '<div class="card"><h1>Title</h1><p>Hello world</p></div>'

function beautifyHtml(html: string): string {
  let formatted = ''
  let indent = 0
  const cleaned = html.replace(/>\s+</g, '><').trim()

  cleaned.split(/(<[^>]+>)/).filter(Boolean).forEach((part) => {
    if (part.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + part + '\n'
    if (part.match(/^<\w[^>]*[^/]>$/)) indent++
  })

  return formatted.trim()
}

export function HtmlBeautifier() {
  const [input, setInput] = useShareableInput('')

  const output = useMemo(() => (input.trim() ? beautifyHtml(input) : ''), [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="HTML input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-40" />
      </ToolPanel>

      {output && (
        <ToolPanel label="Formatted HTML">
          <ToolTextarea value={output} readOnly className="min-h-48" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
        <Button type="button" variant="outline" onClick={() => setInput(EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <p className="font-mono">{EXAMPLE}</p>
      </ToolExample>
    </div>
  )
}
