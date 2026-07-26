'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', spaces: '2' }

export function TabToSpaces() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const spaces = Math.min(8, Math.max(2, Number(state.spaces) || 2))

  const output = useMemo(
    () => (state.input ? state.input.replace(/\t/g, ' '.repeat(spaces)) : ''),
    [state.input, spaces],
  )

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Spaces per tab: {spaces}</label>
        <input
          type="range"
          min="2"
          max="8"
          value={spaces}
          onChange={(e) => setField('spaces', e.target.value)}
          className="w-full max-w-xs"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input with tabs">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="function() {&#10;&#9;return true;&#10;}"
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Converted text appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
