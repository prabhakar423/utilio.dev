'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function JsonStringEscaper() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      if (mode === 'escape') {
        setOutput(JSON.stringify(input).slice(1, -1))
      } else {
        setOutput(JSON.parse(`"${input.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid escaped string')
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
        <Button type="button" size="sm" variant={mode === 'escape' ? 'default' : 'outline'} onClick={() => setMode('escape')}>Escape</Button>
        <Button type="button" size="sm" variant={mode === 'unescape' ? 'default' : 'outline'} onClick={() => setMode('unescape')}>Unescape</Button>
      </div>
      <ToolPanel label="Input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'escape' ? 'Line with "quotes" and\nnewlines' : 'Line with \"quotes\" and\\nnewlines'} />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>{mode === 'escape' ? 'Escape string' : 'Unescape string'}</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Output"><ToolTextarea value={output} readOnly /></ToolPanel>}
    </div>
  )
}
