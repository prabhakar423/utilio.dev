'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function normalizeWhitespace(text: string, collapseLines: boolean): string {
  let result = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  result = result
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')
  if (collapseLines) {
    result = result.replace(/\n{3,}/g, '\n\n').trim()
  }
  return result
}

export function WhitespaceNormalizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [collapseLines, setCollapseLines] = useState(true)
  const [copied, setCopied] = useState(false)

  const normalize = () => {
    setOutput(normalizeWhitespace(input, collapseLines))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={collapseLines}
          onChange={(e) => setCollapseLines(e.target.checked)}
          className="rounded"
        />
        Collapse excessive blank lines
      </label>
      <ToolPanel label="Messy text">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Text   with    extra   spaces&#10;&#10;&#10;and blank lines"
          mono={false}
        />
      </ToolPanel>
      <ToolActions>
        <Button type="button" onClick={normalize}>Normalize whitespace</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && (
        <ToolPanel label="Clean output">
          <ToolTextarea value={output} readOnly mono={false} />
          {input.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Reduced from {input.length} to {output.length} characters
            </p>
          )}
        </ToolPanel>
      )}
    </div>
  )
}
