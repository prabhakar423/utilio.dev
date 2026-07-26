'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolShortcutHint,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'
import { useToolShortcut } from '@/hooks/use-tool-shortcut'

const EXAMPLE_INPUT = 'Hello World'
const EXAMPLE_OUTPUT = 'SGVsbG8gV29ybGQ='

export function Base64Encoder() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleEncode = () => {
    setError('')
    if (!input) {
      setOutput('')
      return
    }
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))))
    } catch {
      setError('Failed to encode input. Check for invalid characters.')
      setOutput('')
    }
  }

  useToolShortcut(handleEncode, 'Enter')

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadExample = () => {
    setInput(EXAMPLE_INPUT)
    setOutput('')
    setError('')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Plain text">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode…"
          />
        </ToolPanel>
        <ToolPanel label="Base64 output">
          <ToolTextarea value={output} readOnly placeholder="Encoded output appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <Button type="button" onClick={handleEncode}>
          Encode
        </Button>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={clear} />
        <Button type="button" variant="outline" onClick={loadExample}>
          Load example
        </Button>
        <ToolShortcutHint action="encode" />
      </ToolActions>

      <ToolExample>
        <p>Input: {EXAMPLE_INPUT}</p>
        <p>Output: {EXAMPLE_OUTPUT}</p>
      </ToolExample>
    </div>
  )
}
