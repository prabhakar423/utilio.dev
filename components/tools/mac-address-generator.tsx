'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions } from '@/components/tools/tool-ui'

type Separator = ':' | '-' | 'none'

function generateMac(separator: Separator, uppercase: boolean): string {
  const bytes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))
  bytes[0] = (bytes[0] | 0x02) & 0xfe

  const hex = bytes.map((b) => b.toString(16).padStart(2, uppercase ? '2' : '2'))
  const parts = uppercase ? hex.map((h) => h.toUpperCase()) : hex

  if (separator === 'none') return parts.join('')
  return parts.join(separator)
}

export function MacAddressGenerator() {
  const [separator, setSeparator] = useState<Separator>(':')
  const [uppercase, setUppercase] = useState(true)
  const [count, setCount] = useState(1)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const macs = Array.from({ length: Math.min(count, 20) }, () => generateMac(separator, uppercase))
    setOutput(macs.join('\n'))
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
          <label className="mb-2 block text-sm font-medium">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value as Separator)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value=":">Colon (AA:BB:CC:DD:EE:FF)</option>
            <option value="-">Dash (AA-BB-CC-DD-EE-FF)</option>
            <option value="none">None (AABBCCDDEEFF)</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Count (max 20)</label>
          <input
            type="number"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value))))}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 pb-2.5 text-sm">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded"
            />
            Uppercase
          </label>
        </div>
      </div>
      <ToolActions>
        <Button type="button" onClick={generate}>Generate MAC address</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && (
        <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3 font-mono text-sm">
          {output}
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Generates locally administered, unicast MAC addresses suitable for testing and virtualization.
      </p>
    </div>
  )
}
