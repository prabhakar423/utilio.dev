'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function AsciiConverter() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'char-to-code' | 'code-to-char'>('char-to-code')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      if (mode === 'char-to-code') {
        const codes = [...input].map((ch) => {
          const code = ch.codePointAt(0)!
          return `${ch} → ${code} (0x${code.toString(16).toUpperCase()})`
        })
        setOutput(codes.join('\n'))
      } else {
        const codes = input.split(/[\s,]+/).filter(Boolean)
        const chars = codes.map((code) => {
          const num = code.startsWith('0x') ? parseInt(code, 16) : parseInt(code, 10)
          if (Number.isNaN(num) || num < 0 || num > 0x10ffff) throw new Error(`Invalid code: ${code}`)
          return String.fromCodePoint(num)
        })
        setOutput(chars.join(''))
      }
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
        <Button type="button" size="sm" variant={mode === 'char-to-code' ? 'default' : 'outline'} onClick={() => setMode('char-to-code')}>Char → ASCII</Button>
        <Button type="button" size="sm" variant={mode === 'code-to-char' ? 'default' : 'outline'} onClick={() => setMode('code-to-char')}>ASCII → Char</Button>
      </div>
      <ToolPanel label="Input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'char-to-code' ? 'Hello' : '72 101 108 108 111'} className="min-h-32" />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Output"><ToolTextarea value={output} readOnly className="min-h-32" /></ToolPanel>}
    </div>
  )
}
