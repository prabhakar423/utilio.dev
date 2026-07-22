'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'

async function computeHmac(
  key: string,
  message: string,
  algorithm: Algorithm,
): Promise<string> {
  const encoder = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function HmacGenerator() {
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    setError('')
    setCopied(false)
    if (!key || !message) {
      setOutput('')
      return
    }
    try {
      setOutput(await computeHmac(key, message, algorithm))
    } catch {
      setError('Failed to compute HMAC. Your browser may not support Web Crypto.')
      setOutput('')
    }
  }

  const copy = async () => {
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
            HMAC-{algo.replace('SHA-', '')}
          </Button>
        ))}
      </div>
      <ToolPanel label="Secret key">
        <ToolTextarea
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="your-secret-key"
          className="min-h-20"
          mono={false}
        />
      </ToolPanel>
      <ToolPanel label="Message">
        <ToolTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message to authenticate…"
          mono={false}
        />
      </ToolPanel>
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {output && (
        <ToolPanel label={`HMAC-${algorithm.replace('SHA-', '')} output`}>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <code className="break-all font-mono text-sm">{output}</code>
          </div>
        </ToolPanel>
      )}
      <ToolActions>
        <Button type="button" onClick={generate}>Generate HMAC</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
