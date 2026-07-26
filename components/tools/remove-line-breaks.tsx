'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', mode: 'spaces' }

export function RemoveLineBreaks() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = state.mode === 'nothing' ? 'nothing' : 'spaces'

  const output = useMemo(() => {
    if (!state.input) return ''
    return mode === 'spaces'
      ? state.input.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()
      : state.input.replace(/\r?\n/g, '')
  }, [state.input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === 'spaces' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'spaces')}
        >
          Replace with spaces
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'nothing' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'nothing')}
        >
          Remove entirely
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input text">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Paste text with line breaks…"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly mono={false} placeholder="Single-line text appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
