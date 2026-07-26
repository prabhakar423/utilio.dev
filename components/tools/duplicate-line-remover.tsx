'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', caseSensitive: '1' }

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
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const caseSensitive = state.caseSensitive === '1'

  const { output, removed } = useMemo(() => {
    if (!state.input) return { output: '', removed: 0 }
    const lines = state.input.split('\n')
    const result = removeDuplicates(state.input, caseSensitive)
    return { output: result, removed: lines.length - result.split('\n').length }
  }, [state.input, caseSensitive])

  return (
    <div className="grid gap-5">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => setField('caseSensitive', e.target.checked ? '1' : '0')}
          className="rounded"
        />
        Case sensitive
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input (one line per entry)">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="apple&#10;banana&#10;apple&#10;cherry"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly mono={false} placeholder="Deduplicated lines appear here…" />
          {output && (
            <p className="mt-2 text-xs text-muted-foreground">
              Removed {removed} duplicate line{removed !== 1 ? 's' : ''}
            </p>
          )}
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
