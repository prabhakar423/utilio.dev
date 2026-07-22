'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function formatXml(xml: string): string {
  const trimmed = xml.replace(/>\s*</g, '><').trim()
  let formatted = ''
  let indent = 0
  const parts = trimmed.replace(/(<[^>]+>)/g, '\n$1\n').split('\n').filter(Boolean)

  for (const part of parts) {
    if (part.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + part + '\n'
    if (part.match(/^<\w[^>]*[^/]>$/)) indent++
  }
  return formatted.trim()
}

export function XmlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => {
    setError('')
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, 'application/xml')
      if (doc.querySelector('parsererror')) throw new Error('Invalid XML')
      setOutput(formatXml(input))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid XML')
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
      <ToolPanel label="XML input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><item>value</item></root>" />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={format}>Format XML</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Formatted XML"><ToolTextarea value={output} readOnly className="min-h-48" /></ToolPanel>}
    </div>
  )
}
