'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function shuffleLines(lines: string[]): string[] {
  const result = [...lines]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function ListRandomizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const randomize = () => {
    const lines = input.split('\n').filter((line) => line.trim())
    setOutput(shuffleLines(lines).join('\n'))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input list (one item per line)">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana"
          mono={false}
        />
      </ToolPanel>
      <ToolActions>
        <Button type="button" onClick={randomize}>Shuffle list</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && (
        <ToolPanel label="Shuffled output">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      )}
    </div>
  )
}
