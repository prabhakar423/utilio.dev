'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function textToBinary(text: string) {
  return Array.from(new TextEncoder().encode(text)).map((b) => b.toString(2).padStart(8, '0')).join(' ')
}

function binaryToText(binary: string) {
  const bytes = binary.split(/\s+/).map((b) => parseInt(b, 2))
  if (bytes.some((b) => Number.isNaN(b))) throw new Error('Invalid binary')
  return new TextDecoder().decode(new Uint8Array(bytes))
}

export function BinaryConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      setOutput(mode === 'encode' ? textToBinary(input) : binaryToText(input))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
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
        <Button type="button" size="sm" variant={mode === 'encode' ? 'default' : 'outline'} onClick={() => setMode('encode')}>Text → Binary</Button>
        <Button type="button" size="sm" variant={mode === 'decode' ? 'default' : 'outline'} onClick={() => setMode('decode')}>Binary → Text</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} /></ToolPanel>
        <ToolPanel label="Output"><ToolTextarea value={output} readOnly /></ToolPanel>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
