'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '1234567', mode: 'to-sci' }

export function ScientificNotationConverter() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = state.mode === 'from-sci' ? 'from-sci' : 'to-sci'

  const { output, error } = useMemo(() => {
    if (!state.input.trim()) return { output: '', error: '' }
    try {
      if (mode === 'to-sci') {
        const num = Number(state.input.replace(/,/g, ''))
        if (Number.isNaN(num)) throw new Error('Invalid number')
        return { output: num.toExponential(6).replace(/e\+?/, ' × 10^'), error: '' }
      }
      const normalized = state.input.replace(/×10\^/i, 'e').replace(/\s/g, '')
      const num = Number(normalized)
      if (Number.isNaN(num)) throw new Error('Invalid scientific notation')
      return { output: String(num), error: '' }
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
          variant={mode === 'to-sci' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'to-sci')}
        >
          Number → Scientific
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'from-sci' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'from-sci')}
        >
          Scientific → Number
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={mode === 'to-sci' ? '1234567' : '1.23 × 10^6'}
            className="min-h-24"
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly className="min-h-24" placeholder="Result appears here…" />
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
