'use client'

import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const entityMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function encodeHtml(text: string) {
  return text.replace(/[&<>"']/g, (char) => entityMap[char] ?? char)
}

function decodeHtml(text: string) {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

export function HtmlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const run = () => {
    setCopied(false)
    setOutput(mode === 'encode' ? encodeHtml(input) : decodeHtml(input))
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
          Encode
        </Button>
        <Button
          type="button"
          variant={mode === 'decode' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('decode')}
        >
          Decode
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter HTML or text…' : 'Enter HTML entities…'}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <Button type="button" onClick={run}>
          {mode === 'encode' ? 'Encode HTML' : 'Decode HTML'}
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
          }}
        >
          <RefreshCw className="size-4" />
          Clear
        </Button>
      </ToolActions>
    </div>
  )
}
