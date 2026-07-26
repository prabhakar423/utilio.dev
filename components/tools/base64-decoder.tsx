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

const EXAMPLE_INPUT = 'SGVsbG8gV29ybGQ='
const EXAMPLE_OUTPUT = 'Hello World'

export function Base64Decoder() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleDecode = () => {
    setError('')
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))))
    } catch {
      setError('Invalid Base64 input. Check padding and character set.')
      setOutput('')
    }
  }

  useToolShortcut(handleDecode, 'Enter')

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
        <ToolPanel label="Base64 input">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Base64 text to decode…"
          />
        </ToolPanel>
        <ToolPanel label="Plain text output">
          <ToolTextarea value={output} readOnly placeholder="Decoded text appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <Button type="button" onClick={handleDecode}>
          Decode
        </Button>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={clear} />
        <Button type="button" variant="outline" onClick={loadExample}>
          Load example
        </Button>
        <ToolShortcutHint action="decode" />
      </ToolActions>

      <ToolExample>
        <p>Input: {EXAMPLE_INPUT}</p>
        <p>Output: {EXAMPLE_OUTPUT}</p>
      </ToolExample>
    </div>
  )
}
