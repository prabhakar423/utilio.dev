'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function TabToSpaces() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [spaces, setSpaces] = useState(2)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setOutput(input.replace(/\t/g, ' '.repeat(spaces)))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Spaces per tab: {spaces}</label>
        <input type="range" min="2" max="8" value={spaces} onChange={(e) => setSpaces(Number(e.target.value))} className="w-full max-w-xs" />
      </div>
      <ToolPanel label="Input with tabs">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="function() {&#10;&#9;return true;&#10;}" />
      </ToolPanel>
      <ToolActions>
        <Button type="button" onClick={convert}>Convert tabs to spaces</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Output"><ToolTextarea value={output} readOnly /></ToolPanel>}
    </div>
  )
}
