'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', startAt: '1' }

export function AddLineNumbers() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const startAt = Math.max(0, Number(state.startAt) || 1)

  const output = useMemo(() => {
    if (!state.input) return ''
    const lines = state.input.split('\n')
    const pad = String(startAt + lines.length - 1).length
    return lines.map((line, i) => `${String(startAt + i).padStart(pad, ' ')}  ${line}`).join('\n')
  }, [state.input, startAt])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Start numbering at">
        <ToolInput
          type="number"
          min={0}
          value={startAt}
          onChange={(e) => setField('startAt', e.target.value)}
          className="w-32"
        />
      </ToolPanel>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input text">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Line one&#10;Line two&#10;Line three"
          />
        </ToolPanel>
        <ToolPanel label="Numbered output">
          <ToolTextarea value={output} readOnly placeholder="Numbered text appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
