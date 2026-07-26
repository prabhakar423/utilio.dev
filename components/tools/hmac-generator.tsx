'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'

const SHARE_INITIAL = { key: '', message: '', algorithm: 'SHA-256' }

async function computeHmac(key: string, message: string, algorithm: Algorithm): Promise<string> {
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
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { key, message } = state
  const algorithm = (state.algorithm as Algorithm) || 'SHA-256'
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!key.trim() || !message.trim()) {
      setOutput('')
      setError('')
      return
    }
    void computeHmac(key, message, algorithm)
      .then(setOutput)
      .catch(() => {
        setError('Failed to compute HMAC. Your browser may not support Web Crypto.')
        setOutput('')
      })
  }, [key, message, algorithm])

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(['SHA-256', 'SHA-384', 'SHA-512'] as Algorithm[]).map((algo) => (
          <Button
            key={algo}
            type="button"
            variant={algorithm === algo ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('algorithm', algo)}
          >
            HMAC-{algo.replace('SHA-', '')}
          </Button>
        ))}
      </div>

      <ToolPanel label="Secret key">
        <ToolTextarea
          value={key}
          onChange={(e) => setField('key', e.target.value)}
          placeholder="your-secret-key"
          className="min-h-20"
          mono={false}
        />
      </ToolPanel>

      <ToolPanel label="Message">
        <ToolTextarea
          value={message}
          onChange={(e) => setField('message', e.target.value)}
          placeholder="Message to authenticate…"
          mono={false}
        />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label={`HMAC-${algorithm.replace('SHA-', '')} output`}>
          <ToolTextarea value={output} readOnly className="min-h-20 font-mono" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} label="Copy HMAC" disabled={!output} />
        <ToolClearButton
          onClear={() => {
            setField('key', '')
            setField('message', '')
            setOutput('')
            setError('')
          }}
        />
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        Do not share production secrets via URL links. Use test keys only when sharing.
      </p>
    </div>
  )
}
