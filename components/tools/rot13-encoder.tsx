'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function rot13(text: string) {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

export function Rot13Encoder() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const output = input ? rot13(input) : ''

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Hello World" mono={false} /></ToolPanel>
        <ToolPanel label="ROT13 output"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>
      </div>
      <p className="text-xs text-muted-foreground">ROT13 is its own inverse — applying it twice returns the original text.</p>
      <ToolActions>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
