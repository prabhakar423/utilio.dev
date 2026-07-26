'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'

const SHARE_INITIAL = { input: '', algorithm: 'SHA-256' }

async function computeHash(text: string, algorithm: Algorithm): Promise<string> {
  const data = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function HashGenerator() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const input = state.input
  const algorithm = (state.algorithm as Algorithm) || 'SHA-256'
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    void computeHash(input, algorithm)
      .then(setOutput)
      .catch(() => {
        setError('Failed to compute hash. Your browser may not support Web Crypto.')
        setOutput('')
      })
  }, [input, algorithm])

  const clear = () => {
    setField('input', '')
    setOutput('')
    setError('')
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
            onClick={() => setField('algorithm', algo)}
          >
            {algo}
          </Button>
        ))}
      </div>

      <ToolPanel label="Input text">
        <ToolTextarea
          value={input}
          onChange={(e) => setField('input', e.target.value)}
          placeholder="Enter text to hash…"
          mono={false}
        />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label={`${algorithm} hash`}>
          <ToolTextarea value={output} readOnly className="min-h-20 font-mono" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} label="Copy hash" disabled={!output} />
        <ToolClearButton onClear={clear} />
      </ToolActions>
    </div>
  )
}
