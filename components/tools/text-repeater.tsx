'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolSelect, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { text: '', count: '3', separator: '\n' }

export function TextRepeater() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const count = Math.min(100, Math.max(1, Number(state.count) || 1))

  const output = useMemo(() => {
    if (!state.text) return ''
    return Array(count).fill(state.text).join(state.separator)
  }, [state.text, count, state.separator])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text to repeat">
        <ToolTextarea
          value={state.text}
          onChange={(e) => setField('text', e.target.value)}
          placeholder="Hello"
          mono={false}
          className="min-h-20"
        />
      </ToolPanel>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Times: {count}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setField('count', e.target.value)}
            className="w-full"
          />
        </div>
        <ToolPanel label="Separator">
          <ToolSelect value={state.separator} onChange={(e) => setField('separator', e.target.value)}>
            <option value={'\n'}>New line</option>
            <option value=" ">Space</option>
            <option value=", ">Comma</option>
            <option value="">None</option>
          </ToolSelect>
        </ToolPanel>
      </div>

      <ToolPanel label="Output">
        <ToolTextarea value={output} readOnly mono={false} placeholder="Repeated text appears here…" />
      </ToolPanel>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('text', '')} />
      </ToolActions>
    </div>
  )
}
