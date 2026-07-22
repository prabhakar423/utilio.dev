'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n')
  if (lines.length < 2) throw new Error('CSV needs a header row and at least one data row')
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
  })
}

export function CsvToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      setOutput(JSON.stringify(parseCsv(input), null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV')
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
        <ToolPanel label="CSV input">
          <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={'name,email\nJohn,john@example.com\nJane,jane@example.com'} />
        </ToolPanel>
        <ToolPanel label="JSON output">
          <ToolTextarea value={output} readOnly placeholder="JSON appears here…" />
        </ToolPanel>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert to JSON</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
