'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { dump } from 'js-yaml'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function JsonToYaml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      setOutput(dump(JSON.parse(input), { indent: 2, lineWidth: -1 }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="JSON input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name":"John","age":30}' /></ToolPanel>
        <ToolPanel label="YAML output"><ToolTextarea value={output} readOnly /></ToolPanel>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert to YAML</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
