'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

export function ExtractEmails() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)

  const extract = () => {
    const matches = [...new Set(input.match(EMAIL_REGEX) ?? [])]
    setOutput(matches.join('\n'))
    setCount(matches.length)
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text containing email addresses">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Contact alice@example.com or bob@company.org…" mono={false} />
      </ToolPanel>
      <ToolActions>
        <Button type="button" onClick={extract}>Extract emails</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <p className="text-sm text-muted-foreground">Found {count} unique email{count !== 1 ? 's' : ''}</p>}
      {output && <ToolPanel label="Extracted emails"><ToolTextarea value={output} readOnly mono={false} className="min-h-32" /></ToolPanel>}
    </div>
  )
}
