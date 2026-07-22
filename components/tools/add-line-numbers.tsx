'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function AddLineNumbers() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [startAt, setStartAt] = useState(1)
  const [copied, setCopied] = useState(false)

  const addNumbers = () => {
    const lines = input.split('\n')
    const pad = String(startAt + lines.length - 1).length
    setOutput(lines.map((line, i) => `${String(startAt + i).padStart(pad, ' ')}  ${line}`).join('\n'))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Start numbering at</label>
        <input type="number" min="0" value={startAt} onChange={(e) => setStartAt(Number(e.target.value))}
          className="w-32 rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <ToolPanel label="Input text">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Line one&#10;Line two&#10;Line three" />
      </ToolPanel>
      <ToolActions>
        <Button type="button" onClick={addNumbers}>Add line numbers</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Numbered output"><ToolTextarea value={output} readOnly /></ToolPanel>}
    </div>
  )
}
