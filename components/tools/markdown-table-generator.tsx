'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: 'Name,Age,City\nAlice,30,NYC\nBob,25,LA', hasHeader: '1' }

export function MarkdownTableGenerator() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const hasHeader = state.hasHeader === '1'

  const { output, error } = useMemo(() => {
    if (!state.input.trim()) return { output: '', error: '' }
    try {
      const rows = state.input.trim().split('\n').map((line) => line.split(/[,\t|]/).map((c) => c.trim()))
      if (rows.length === 0) throw new Error('No data found')
      const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => (r[i] ?? '').length)))
      const formatRow = (cells: string[]) =>
        '| ' + cells.map((c, i) => (c ?? '').padEnd(widths[i] ?? 0)).join(' | ') + ' |'
      const separator = '| ' + widths.map((w) => '-'.repeat(Math.max(w, 3))).join(' | ') + ' |'

      const table = hasHeader
        ? [formatRow(rows[0]), separator, ...rows.slice(1).map(formatRow)].join('\n')
        : [separator, ...rows.map(formatRow)].join('\n')

      return { output: table, error: '' }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Failed to generate table',
      }
    }
  }, [state.input, hasHeader])

  return (
    <div className="grid gap-5">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hasHeader}
          onChange={(e) => setField('hasHeader', e.target.checked ? '1' : '0')}
          className="rounded"
        />
        First row is header
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="CSV or tab-separated data">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Name,Age,City&#10;Alice,30,NYC"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Markdown table">
          <ToolTextarea value={output} readOnly mono={false} placeholder="Markdown table appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
