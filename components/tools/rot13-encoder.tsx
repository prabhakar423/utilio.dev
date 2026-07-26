'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function rot13(text: string) {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

export function Rot13Encoder() {
  const [input, setInput] = useShareableInput('')
  const output = useMemo(() => (input ? rot13(input) : ''), [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Hello World" mono={false} />
        </ToolPanel>
        <ToolPanel label="ROT13 output">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>

      <ToolExample>
        <p>ROT13 is its own inverse — applying it twice returns the original text.</p>
      </ToolExample>
    </div>
  )
}
