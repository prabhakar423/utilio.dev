'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"'
        i += 1
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      if (ch === '\r') i += 1
    } else {
      cell += ch
    }
  }
  row.push(cell)
  if (row.some((c) => c) || rows.length > 0) rows.push(row)
  return rows.filter((r) => r.some((c) => c.trim()))
}

function formatCsv(rows: string[][]): string {
  const widths = rows[0]?.map((_, col) => Math.max(...rows.map((r) => (r[col] ?? '').length))) ?? []
  return rows
    .map((row) => row.map((cell, i) => (cell ?? '').padEnd(widths[i] ?? 0)).join('  '))
    .join('\n')
}

export function CsvFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => {
    setError('')
    try {
      const rows = parseCsv(input)
      if (rows.length === 0) throw new Error('No CSV data found')
      setOutput(formatCsv(rows))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format CSV')
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
      <ToolPanel label="CSV input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,age,city&#10;Alice,30,NYC&#10;Bob,25,LA" />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={format}>Format CSV</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Aligned output"><ToolTextarea value={output} readOnly /></ToolPanel>}
    </div>
  )
}
