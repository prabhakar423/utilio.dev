'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'

async function computeHash(text: string, algorithm: Algorithm): Promise<string> {
  const data = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function HashGenerator() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleHash = async () => {
    setError('')
    setCopied(false)
    if (!input) {
      setOutput('')
      return
    }
    try {
      setOutput(await computeHash(input, algorithm))
    } catch {
      setError('Failed to compute hash. Your browser may not support Web Crypto.')
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(['SHA-256', 'SHA-384', 'SHA-512'] as Algorithm[]).map((algo) => (
          <Button
            key={algo}
            type="button"
            variant={algorithm === algo ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAlgorithm(algo)}
          >
            {algo}
          </Button>
        ))}
      </div>

      <ToolPanel label="Input text">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash…"
          mono={false}
        />
      </ToolPanel>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {output && (
        <ToolPanel label={`${algorithm} hash`}>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <code className="break-all font-mono text-sm">{output}</code>
          </div>
        </ToolPanel>
      )}

      <ToolActions>
        <Button type="button" onClick={handleHash}>
          Generate hash
        </Button>
        <Button type="button" variant="secondary" onClick={handleCopy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copied' : 'Copy hash'}
        </Button>
      </ToolActions>
    </div>
  )
}
