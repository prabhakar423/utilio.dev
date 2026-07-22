'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function FindAndReplace() {
  const [input, setInput] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [output, setOutput] = useState('')
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)

  const run = () => {
    if (!find) return
    try {
      const flags = caseSensitive ? 'g' : 'gi'
      const pattern = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags)
      let matches = 0
      const result = input.replace(pattern, (match) => { matches++; return replace })
      setOutput(result)
      setCount(matches)
      setCopied(false)
    } catch {
      setOutput('Invalid regex pattern')
      setCount(0)
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input text"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} mono={false} /></ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Find</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Replace with</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
        </div>
      </div>
      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} /> Case sensitive</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} /> Use regex</label>
      </div>
      <ToolActions>
        <Button type="button" onClick={run}>Replace all</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {count > 0 && <p className="text-sm text-muted-foreground">{count} replacement{count !== 1 ? 's' : ''} made</p>}
      {output && <ToolPanel label="Output"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>}
    </div>
  )
}
