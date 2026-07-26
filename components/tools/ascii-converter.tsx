'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', mode: 'char-to-code' }

export function AsciiConverter() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = state.mode === 'code-to-char' ? 'code-to-char' : 'char-to-code'

  const { output, error } = useMemo(() => {
    if (!state.input.trim()) return { output: '', error: '' }
    try {
      if (mode === 'char-to-code') {
        const codes = [...state.input].map((ch) => {
          const code = ch.codePointAt(0)!
          return `${ch} → ${code} (0x${code.toString(16).toUpperCase()})`
        })
        return { output: codes.join('\n'), error: '' }
      }
      const codes = state.input.split(/[\s,]+/).filter(Boolean)
      const chars = codes.map((code) => {
        const num = code.startsWith('0x') ? parseInt(code, 16) : parseInt(code, 10)
        if (Number.isNaN(num) || num < 0 || num > 0x10ffff) throw new Error(`Invalid code: ${code}`)
        return String.fromCodePoint(num)
      })
      return { output: chars.join(''), error: '' }
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
          variant={mode === 'char-to-code' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'char-to-code')}
        >
          Char → ASCII
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'code-to-char' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'code-to-char')}
        >
          ASCII → Char
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={mode === 'char-to-code' ? 'Hello' : '72 101 108 108 111'}
            className="min-h-32"
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly className="min-h-32" placeholder="Result appears here…" />
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
