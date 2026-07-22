'use client'

import { useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function ReverseText() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'chars' | 'words' | 'lines'>('chars')
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    if (!input) return ''
    if (mode === 'chars') return input.split('').reverse().join('')
    if (mode === 'words') return input.split(' ').reverse().join(' ')
    return input.split('\n').reverse().join('\n')
  }, [input, mode])

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        {(['chars', 'words', 'lines'] as const).map((m) => (
          <Button key={m} type="button" size="sm" variant={mode === m ? 'default' : 'outline'} onClick={() => setMode(m)}>
            Reverse {m}
          </Button>
        ))}
      </div>
      <ToolPanel label="Input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} mono={false} /></ToolPanel>
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
