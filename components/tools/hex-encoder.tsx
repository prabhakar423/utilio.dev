'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { input: '', mode: 'encode' }

function encodeHex(text: string) {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function decodeHex(hex: string) {
  const cleaned = hex.replace(/\s/g, '')
  if (!/^[0-9a-fA-F]*$/.test(cleaned) || cleaned.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }
  const bytes = new Uint8Array(cleaned.length / 2)
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.slice(i, i + 2), 16)
  }
  return new TextDecoder().decode(bytes)
}

export function HexEncoder() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { input } = state
  const mode = state.mode === 'decode' ? 'decode' : 'encode'

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      return {
        output: mode === 'encode' ? encodeHex(input) : decodeHex(input),
        error: '',
      }
    } catch {
      return { output: '', error: 'Invalid hex input. Use pairs of hexadecimal characters (0-9, a-f).' }
    }
  }, [input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" variant={mode === 'encode' ? 'default' : 'outline'} size="sm" onClick={() => setField('mode', 'encode')}>
          Text → Hex
        </Button>
        <Button type="button" variant={mode === 'decode' ? 'default' : 'outline'} size="sm" onClick={() => setField('mode', 'decode')}>
          Hex → Text
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text…' : 'Enter hex (e.g. 48656c6c6f)…'}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>

      <ToolExample>
        <p className="font-mono">Hello → 48656c6c6f</p>
      </ToolExample>
    </div>
  )
}
