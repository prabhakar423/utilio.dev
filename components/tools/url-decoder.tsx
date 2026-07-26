'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE_INPUT = 'hello%20world%3F'
const EXAMPLE_OUTPUT = 'hello world?'

export function UrlDecoder() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }
    try {
      setOutput(decodeURIComponent(input))
      setError('')
    } catch {
      setError('Invalid encoded URL. Check for malformed percent-encoding.')
      setOutput('')
    }
  }, [input])

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Encoded URL">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste encoded URL to decode…"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Decoded text">
          <ToolTextarea value={output} readOnly placeholder="Decoded text appears here…" mono={false} />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={clear} />
        <Button
          type="button"
          variant="outline"
          onClick={() => setInput(EXAMPLE_INPUT)}
        >
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <p>Input: {EXAMPLE_INPUT}</p>
        <p>Output: {EXAMPLE_OUTPUT}</p>
      </ToolExample>
    </div>
  )
}
