'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function removeDuplicates(text: string, caseSensitive: boolean): string {
  const seen = new Set<string>()
  return text.split('\n').filter((line) => {
    const key = caseSensitive ? line : line.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).join('\n')
}

export function DuplicateLineRemover() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [copied, setCopied] = useState(false)
  const [removed, setRemoved] = useState(0)

  const run = () => {
    const lines = input.split('\n')
    const result = removeDuplicates(input, caseSensitive)
    setOutput(result)
    setRemoved(lines.length - result.split('\n').length)
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
        Case sensitive
      </label>
      <ToolPanel label="Input (one line per entry)">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="apple\nbanana\napple\ncherry" mono={false} />
      </ToolPanel>
      <ToolActions>
        <Button type="button" onClick={run}>Remove duplicates</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <p className="text-sm text-muted-foreground">Removed {removed} duplicate line{removed !== 1 ? 's' : ''}</p>}
      {output && <ToolPanel label="Output"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>}
    </div>
  )
}
