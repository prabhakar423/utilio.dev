'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { load } from 'js-yaml'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'
import { useToolShortcut } from '@/hooks/use-tool-shortcut'

export function YamlToJson() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      setOutput(JSON.stringify(load(input), null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid YAML')
      setOutput('')
    }
  }

  useToolShortcut(convert, 'Enter')

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="YAML input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="name: John&#10;age: 30" /></ToolPanel>
        <ToolPanel label="JSON output"><ToolTextarea value={output} readOnly /></ToolPanel>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert to JSON</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
        <span className="self-center text-xs text-muted-foreground">Ctrl+Enter to convert</span>
      </ToolActions>
    </div>
  )
}
