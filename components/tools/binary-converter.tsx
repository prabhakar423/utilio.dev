'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

function textToBinary(text: string) {
  return Array.from(new TextEncoder().encode(text)).map((b) => b.toString(2).padStart(8, '0')).join(' ')
}

function binaryToText(binary: string) {
  const bytes = binary.split(/\s+/).map((b) => parseInt(b, 2))
  if (bytes.some((b) => Number.isNaN(b))) throw new Error('Invalid binary')
  return new TextDecoder().decode(new Uint8Array(bytes))
}

const SHARE_INITIAL = { input: '', mode: 'encode' }

export function BinaryConverter() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = state.mode === 'decode' ? 'decode' : 'encode'

  const { output, error } = useMemo(() => {
    if (!state.input.trim()) return { output: '', error: '' }
    try {
      return {
        output: mode === 'encode' ? textToBinary(state.input) : binaryToText(state.input),
        error: '',
      }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Conversion failed',
      }
    }
  }, [state.input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'encode')}
        >
          Text → Binary
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'decode')}
        >
          Binary → Text
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea value={state.input} onChange={(e) => setField('input', e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Result appears here…" />
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
