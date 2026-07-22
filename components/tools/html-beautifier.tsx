'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function beautifyHtml(html: string): string {
  let formatted = ''
  let indent = 0
  const cleaned = html.replace(/>\s+</g, '><').trim()

  cleaned.split(/(<[^>]+>)/).filter(Boolean).forEach((part) => {
    if (part.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + part + '\n'
    if (part.match(/^<\w[^>]*[^/]>$/)) indent++
  })

  return formatted.trim()
}

export function HtmlBeautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const beautify = () => {
    setOutput(beautifyHtml(input))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="HTML input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-40" /></ToolPanel>
      <ToolActions>
        <Button type="button" onClick={beautify}>Beautify HTML</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="Formatted HTML"><ToolTextarea value={output} readOnly className="min-h-48" /></ToolPanel>}
    </div>
  )
}
