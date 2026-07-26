'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE_INPUT = 'hello world?'
const EXAMPLE_OUTPUT = 'hello%20world%3F'

export function UrlEncoder() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    setOutput(input ? encodeURIComponent(input) : '')
  }, [input])

  const clear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Raw text or URL">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or URL to encode…"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Encoded output">
          <ToolTextarea value={output} readOnly placeholder="Encoded output appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={clear} />
      </ToolActions>

      <ToolExample>
        <p>Input: {EXAMPLE_INPUT}</p>
        <p>Output: {EXAMPLE_OUTPUT}</p>
      </ToolExample>
    </div>
  )
}
