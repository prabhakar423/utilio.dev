'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function jsonToCsv(data: unknown[]): string {
  if (!Array.isArray(data) || data.length === 0) throw new Error('JSON must be a non-empty array of objects')
  const headers = Object.keys(data[0] as object)
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = String((row as Record<string, unknown>)[h] ?? '')
      return val.includes(',') ? `"${val}"` : val
    }).join(','),
  )
  return [headers.join(','), ...rows].join('\n')
}

export function JsonToCsv() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      setOutput(jsonToCsv(JSON.parse(input)))
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
        <ToolPanel label="JSON input (array of objects)">
          <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={'[{"name":"John","age":30},{"name":"Jane","age":25}]'} />
        </ToolPanel>
        <ToolPanel label="CSV output">
          <ToolTextarea value={output} readOnly placeholder="CSV appears here…" />
        </ToolPanel>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert to CSV</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
