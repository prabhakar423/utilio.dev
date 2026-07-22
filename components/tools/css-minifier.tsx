'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function minifyCss(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .trim()
}

export function CssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const minify = () => {
    setOutput(minifyCss(input))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="CSS input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".class { color: red; }" /></ToolPanel>
      <ToolActions>
        <Button type="button" onClick={minify}>Minify CSS</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && (
        <ToolPanel label="Minified CSS">
          <ToolTextarea value={output} readOnly />
          <p className="mt-2 text-xs text-muted-foreground">
            Saved {input.length - output.length} characters ({Math.round((1 - output.length / input.length) * 100)}% reduction)
          </p>
        </ToolPanel>
      )}
    </div>
  )
}
