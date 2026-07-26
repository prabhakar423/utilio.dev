'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', mode: 'chars' }

export function ReverseText() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { input } = state
  const mode = (['chars', 'words', 'lines'] as const).includes(state.mode as 'chars')
    ? (state.mode as 'chars' | 'words' | 'lines')
    : 'chars'

  const output = useMemo(() => {
    if (!input) return ''
    if (mode === 'chars') return input.split('').reverse().join('')
    if (mode === 'words') return input.split(' ').reverse().join(' ')
    return input.split('\n').reverse().join('\n')
  }, [input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(['chars', 'words', 'lines'] as const).map((m) => (
          <Button
            key={m}
            type="button"
            size="sm"
            variant={mode === m ? 'default' : 'outline'}
            onClick={() => setField('mode', m)}
          >
            Reverse {m}
          </Button>
        ))}
      </div>

      <ToolPanel label="Input">
        <ToolTextarea value={input} onChange={(e) => setField('input', e.target.value)} mono={false} />
      </ToolPanel>

      {output && (
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
