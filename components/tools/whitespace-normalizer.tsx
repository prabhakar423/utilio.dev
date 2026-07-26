'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', collapseLines: '1' }

function normalizeWhitespace(text: string, collapseLines: boolean): string {
  let result = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  result = result
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')
  if (collapseLines) {
    result = result.replace(/\n{3,}/g, '\n\n').trim()
  }
  return result
}

export function WhitespaceNormalizer() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const collapseLines = state.collapseLines === '1'

  const output = useMemo(() => {
    if (!state.input) return ''
    return normalizeWhitespace(state.input, collapseLines)
  }, [state.input, collapseLines])

  return (
    <div className="grid gap-5">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={collapseLines}
          onChange={(e) => setField('collapseLines', e.target.checked ? '1' : '0')}
          className="rounded"
        />
        Collapse excessive blank lines
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Messy text">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Text   with    extra   spaces&#10;&#10;&#10;and blank lines"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Clean output">
          <ToolTextarea value={output} readOnly mono={false} placeholder="Normalized text appears here…" />
          {state.input.length > 0 && output && (
            <p className="mt-2 text-xs text-muted-foreground">
              Reduced from {state.input.length} to {output.length} characters
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
