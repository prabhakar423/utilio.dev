'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function MarkdownTableGenerator() {
  const [input, setInput] = useState('Name,Age,City\nAlice,30,NYC\nBob,25,LA')
  const [hasHeader, setHasHeader] = useState(true)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setError('')
    try {
      const rows = input.trim().split('\n').map((line) => line.split(/[,\t|]/).map((c) => c.trim()))
      if (rows.length === 0) throw new Error('No data found')
      const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => (r[i] ?? '').length)))
      const formatRow = (cells: string[]) =>
        '| ' + cells.map((c, i) => (c ?? '').padEnd(widths[i] ?? 0)).join(' | ') + ' |'
      const separator = '| ' + widths.map((w) => '-'.repeat(Math.max(w, 3))).join(' | ') + ' |'

      if (hasHeader) {
        setOutput([formatRow(rows[0]), separator, ...rows.slice(1).map(formatRow)].join('\n'))
      } else {
        setOutput([separator, ...rows.map(formatRow)].join('\n'))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate table')
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
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} className="rounded" />
        First row is header
      </label>
      <ToolPanel label="CSV or tab-separated data">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Name,Age,City&#10;Alice,30,NYC" mono={false} />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={generate}>Generate table</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Markdown table"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>}
    </div>
  )
}
