'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

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
  const [input, setInput] = useShareableInput('')

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      const rows = parseCsv(input)
      if (rows.length === 0) throw new Error('No CSV data found')
      return { output: formatCsv(rows), error: '' }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Failed to format CSV',
      }
    }
  }, [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="CSV input">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="name,age,city&#10;Alice,30,NYC&#10;Bob,25,LA"
          />
        </ToolPanel>
        <ToolPanel label="Aligned output">
          <ToolTextarea value={output} readOnly placeholder="Formatted CSV appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>
    </div>
  )
}
