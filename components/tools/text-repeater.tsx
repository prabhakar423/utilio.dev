'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function TextRepeater() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(3)
  const [separator, setSeparator] = useState('\n')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setOutput(Array(count).fill(text).join(separator))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text to repeat">
        <ToolTextarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Hello" mono={false} className="min-h-20" />
      </ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Times: {count}</label>
          <input type="range" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Separator</label>
          <select value={separator} onChange={(e) => setSeparator(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm">
            <option value={'\n'}>New line</option>
            <option value=" ">Space</option>
            <option value=", ">Comma</option>
            <option value="">None</option>
          </select>
        </div>
      </div>
      <Button type="button" onClick={generate}>Repeat text</Button>
      {output && (
        <>
          <ToolPanel label="Output"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>
          <Button type="button" variant="secondary" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
          </Button>
        </>
      )}
    </div>
  )
}
