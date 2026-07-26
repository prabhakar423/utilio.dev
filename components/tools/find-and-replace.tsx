'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = {
  input: '',
  find: '',
  replace: '',
  caseSensitive: '0',
  useRegex: '0',
}

export function FindAndReplace() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { input, find, replace } = state
  const caseSensitive = state.caseSensitive === '1'
  const useRegex = state.useRegex === '1'

  const { output, count, error } = useMemo(() => {
    if (!find) return { output: input, count: 0, error: '' }
    try {
      const flags = caseSensitive ? 'g' : 'gi'
      const pattern = useRegex
        ? new RegExp(find, flags)
        : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags)
      let matches = 0
      const result = input.replace(pattern, (match) => {
        matches++
        return replace
      })
      return { output: result, count: matches, error: '' }
    } catch {
      return { output: '', count: 0, error: 'Invalid regex pattern' }
    }
  }, [input, find, replace, caseSensitive, useRegex])

  const showOutput = find.trim().length > 0

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input text">
        <ToolTextarea value={input} onChange={(e) => setField('input', e.target.value)} mono={false} />
      </ToolPanel>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="Find">
          <ToolInput type="text" value={find} onChange={(e) => setField('find', e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Replace with">
          <ToolInput type="text" value={replace} onChange={(e) => setField('replace', e.target.value)} />
        </ToolPanel>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-4 py-2.5 text-sm">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setField('caseSensitive', e.target.checked ? '1' : '0')}
            className="size-4 accent-primary"
          />
          Case sensitive
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-4 py-2.5 text-sm">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setField('useRegex', e.target.checked ? '1' : '0')}
            className="size-4 accent-primary"
          />
          Use regex
        </label>
      </div>

      {error && <ToolError message={error} />}

      {showOutput && !error && (
        <p className="text-sm text-muted-foreground">
          {count} replacement{count !== 1 ? 's' : ''} made
        </p>
      )}

      {showOutput && !error && (
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!showOutput || !output} />
        <ToolClearButton
          onClear={() => {
            setField('input', '')
            setField('find', '')
            setField('replace', '')
          }}
        />
      </ToolActions>
    </div>
  )
}
