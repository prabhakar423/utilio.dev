'use client'

import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

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
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const run = () => {
    setError('')
    setCopied(false)
    try {
      setOutput(mode === 'encode' ? encodeHex(input) : decodeHex(input))
    } catch {
      setError('Invalid hex input. Use pairs of hexadecimal characters (0-9, a-f).')
      setOutput('')
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'encode' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('encode')}
        >
          Text → Hex
        </Button>
        <Button
          type="button"
          variant={mode === 'decode' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('decode')}
        >
          Hex → Text
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text…' : 'Enter hex (e.g. 48656c6c6f)…'}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" />
        </ToolPanel>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <ToolActions>
        <Button type="button" onClick={run}>
          Convert
        </Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setInput('')
            setOutput('')
            setError('')
          }}
        >
          <RefreshCw className="size-4" />
          Clear
        </Button>
      </ToolActions>
    </div>
  )
}
