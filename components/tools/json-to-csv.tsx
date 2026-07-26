'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE = '[{"name":"John","age":30},{"name":"Jane","age":25}]'

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
  const [input, setInput] = useShareableInput('')

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      return { output: jsonToCsv(JSON.parse(input)), error: '' }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Invalid JSON',
      }
    }
  }, [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="JSON input (array of objects)">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={EXAMPLE}
          />
        </ToolPanel>
        <ToolPanel label="CSV output">
          <ToolTextarea value={output} readOnly placeholder="CSV appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
        <Button type="button" variant="outline" onClick={() => setInput(EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <pre className="font-mono whitespace-pre-wrap">{EXAMPLE}</pre>
      </ToolExample>
    </div>
  )
}
