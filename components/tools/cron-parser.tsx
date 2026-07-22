'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const FIELD_LABELS = ['Minute', 'Hour', 'Day of month', 'Month', 'Day of week']

function describeField(value: string, index: number): string {
  if (value === '*') return `Every ${FIELD_LABELS[index].toLowerCase()}`
  if (value.startsWith('*/')) return `Every ${value.slice(2)} ${FIELD_LABELS[index].toLowerCase()}s`
  if (value.includes('-')) {
    const [a, b] = value.split('-')
    return `${FIELD_LABELS[index]} ${a} through ${b}`
  }
  if (value.includes(',')) return `${FIELD_LABELS[index]} at ${value}`
  return `${FIELD_LABELS[index]} at ${value}`
}

function parseCron(expr: string) {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) {
    throw new Error('Expected 5 fields: minute hour day month weekday')
  }
  return parts.map((part, i) => ({ field: FIELD_LABELS[i], value: part, description: describeField(part, i) }))
}

export function CronParser() {
  const [input, setInput] = useState('0 9 * * 1-5')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const parse = () => {
    setError('')
    try {
      const fields = parseCron(input)
      setOutput(
        fields.map((f) => `${f.field} (${f.value}): ${f.description}`).join('\n') +
          '\n\nSummary: Runs at minute ' +
          fields[0].value +
          ' of hour ' +
          fields[1].value +
          ', on days matching the pattern above.',
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid cron expression')
      setOutput('')
    }
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Cron expression (minute hour day month weekday)">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0 9 * * 1-5"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </ToolPanel>

      <p className="text-xs text-muted-foreground">
        Example: <code className="rounded bg-muted px-1">0 9 * * 1-5</code> = 9:00 AM, Monday–Friday
      </p>

      <Button type="button" onClick={parse}>
        Parse cron
      </Button>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {output && (
        <ToolPanel label="Explanation">
          <ToolTextarea value={output} readOnly className="min-h-36" mono={false} />
        </ToolPanel>
      )}
    </div>
  )
}
