'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel } from '@/components/tools/tool-ui'

const CHARSETS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  hex: '0123456789abcdef',
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
}

function randomString(length: number, charset: string) {
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, (n) => charset[n % charset.length]).join('')
}

export function RandomStringGenerator() {
  const [length, setLength] = useState(16)
  const [type, setType] = useState<keyof typeof CHARSETS>('alphanumeric')
  const [count, setCount] = useState(1)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setOutput(Array.from({ length: count }, () => randomString(length, CHARSETS[type])).join('\n'))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Length: {length}</label>
          <input type="range" min="4" max="128" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Count</label>
          <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Character set</label>
          <select value={type} onChange={(e) => setType(e.target.value as keyof typeof CHARSETS)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm">
            <option value="alphanumeric">Alphanumeric</option>
            <option value="hex">Hex</option>
            <option value="alpha">Letters only</option>
            <option value="symbols">With symbols</option>
          </select>
        </div>
      </div>
      <Button type="button" onClick={generate}>Generate</Button>
      {output && (
        <>
          <ToolPanel label="Generated strings">
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4 font-mono text-sm break-all">{output}</div>
          </ToolPanel>
          <Button type="button" variant="secondary" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
          </Button>
        </>
      )}
    </div>
  )
}
