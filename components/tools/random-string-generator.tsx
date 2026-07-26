'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolSelect, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const CHARSETS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  hex: '0123456789abcdef',
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
} as const

type CharsetKey = keyof typeof CHARSETS

const SHARE_INITIAL = { length: '16', type: 'alphanumeric', count: '1' }

function randomString(length: number, charset: string) {
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, (n) => charset[n % charset.length]).join('')
}

export function RandomStringGenerator() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const [output, setOutput] = useState('')

  const length = Math.min(128, Math.max(4, Number(state.length) || 16))
  const count = Math.min(50, Math.max(1, Number(state.count) || 1))
  const type = (state.type in CHARSETS ? state.type : 'alphanumeric') as CharsetKey

  const generate = () => {
    setOutput(Array.from({ length: count }, () => randomString(length, CHARSETS[type])).join('\n'))
  }

  const settingsSummary = useMemo(
    () => `${length} chars · ${count} string${count !== 1 ? 's' : ''} · ${type}`,
    [length, count, type],
  )

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setField('length', e.target.value)}
            className="w-full"
          />
        </div>
        <ToolPanel label="Count">
          <ToolInput
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setField('count', e.target.value)}
          />
        </ToolPanel>
        <ToolPanel label="Character set">
          <ToolSelect value={type} onChange={(e) => setField('type', e.target.value)}>
            <option value="alphanumeric">Alphanumeric</option>
            <option value="hex">Hex</option>
            <option value="alpha">Letters only</option>
            <option value="symbols">With symbols</option>
          </ToolSelect>
        </ToolPanel>
      </div>

      <p className="text-sm text-muted-foreground">{settingsSummary}</p>

      <ToolActions>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
        <ToolCopyButton text={output} disabled={!output} />
      </ToolActions>

      {output && (
        <ToolPanel label="Generated strings">
          <ToolTextarea value={output} readOnly className="min-h-24" />
        </ToolPanel>
      )}
    </div>
  )
}
