'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', mode: 'escape' }

export function JsonStringEscaper() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { input } = state
  const mode = state.mode === 'unescape' ? 'unescape' : 'escape'

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: '' }
    try {
      if (mode === 'escape') {
        return { output: JSON.stringify(input).slice(1, -1), error: '' }
      }
      return {
        output: JSON.parse(`"${input.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`),
        error: '',
      }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Invalid escaped string',
      }
    }
  }, [input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === 'escape' ? 'default' : 'outline'} onClick={() => setField('mode', 'escape')}>
          Escape
        </Button>
        <Button type="button" size="sm" variant={mode === 'unescape' ? 'default' : 'outline'} onClick={() => setField('mode', 'unescape')}>
          Unescape
        </Button>
      </div>

      <ToolPanel label="Input">
        <ToolTextarea
          value={input}
          onChange={(e) => setField('input', e.target.value)}
          placeholder={mode === 'escape' ? 'Line with "quotes" and newlines' : 'Line with \"quotes\" and\\nnewlines'}
        />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
