'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function RemoveLineBreaks() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'spaces' | 'nothing'>('spaces')
  const [copied, setCopied] = useState(false)

  const run = () => {
    const result =
      mode === 'spaces'
        ? input.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()
        : input.replace(/\r?\n/g, '')
    setOutput(result)
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === 'spaces' ? 'default' : 'outline'}
          onClick={() => setMode('spaces')}
        >
          Replace with spaces
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'nothing' ? 'default' : 'outline'}
          onClick={() => setMode('nothing')}
        >
          Remove entirely
        </Button>
      </div>

      <ToolPanel label="Input text">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with line breaks…"
          mono={false}
        />
      </ToolPanel>

      <ToolActions>
        <Button type="button" onClick={run}>
          Remove line breaks
        </Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy
        </Button>
      </ToolActions>

      {output && (
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      )}
    </div>
  )
}
