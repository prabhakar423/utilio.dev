'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function ScientificNotationConverter() {
  const [input, setInput] = useState('1234567')
  const [mode, setMode] = useState<'to-sci' | 'from-sci'>('to-sci')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      if (mode === 'to-sci') {
        const num = Number(input.replace(/,/g, ''))
        if (Number.isNaN(num)) throw new Error('Invalid number')
        setOutput(num.toExponential(6).replace(/e\+?/, ' × 10^'))
      } else {
        const normalized = input.replace(/×10\^/i, 'e').replace(/\s/g, '')
        const num = Number(normalized)
        if (Number.isNaN(num)) throw new Error('Invalid scientific notation')
        setOutput(String(num))
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
        <Button type="button" size="sm" variant={mode === 'to-sci' ? 'default' : 'outline'} onClick={() => setMode('to-sci')}>Number → Scientific</Button>
        <Button type="button" size="sm" variant={mode === 'from-sci' ? 'default' : 'outline'} onClick={() => setMode('from-sci')}>Scientific → Number</Button>
      </div>
      <ToolPanel label="Input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'to-sci' ? '1234567' : '1.23 × 10^6'} className="min-h-24" />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Output"><ToolTextarea value={output} readOnly className="min-h-24" /></ToolPanel>}
    </div>
  )
}
