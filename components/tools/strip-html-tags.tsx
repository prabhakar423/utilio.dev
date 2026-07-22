'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent ?? ''
}

export function StripHtmlTags() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const run = () => {
    setOutput(stripHtml(input))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="HTML input">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<p>Hello <strong>world</strong></p>"
        />
      </ToolPanel>

      <ToolActions>
        <Button type="button" onClick={run}>
          Strip HTML tags
        </Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy plain text
        </Button>
      </ToolActions>

      {output && (
        <ToolPanel label="Plain text">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      )}
    </div>
  )
}
