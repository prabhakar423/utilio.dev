'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fingerprint, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  computeHash,
  computeHmac,
  HASH_EXAMPLE,
  hmacLabel,
  type CryptoHashTab,
  type HashAlgorithm,
} from '@/lib/crypto-hash'
import { cn } from '@/lib/utils'

const SHARE_INITIAL = {
  tab: 'hash' as CryptoHashTab,
  input: '',
  key: '',
  message: '',
  algorithm: 'SHA-256' as HashAlgorithm,
}

const TABS: { id: CryptoHashTab; label: string; icon: typeof Fingerprint }[] = [
  { id: 'hash', label: 'Hash', icon: Fingerprint },
  { id: 'hmac', label: 'HMAC', icon: KeyRound },
]

interface HashWorkbenchProps {
  defaultTab?: CryptoHashTab
}

export function HashWorkbench({ defaultTab = 'hash' }: HashWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as CryptoHashTab
  const algorithm = (['SHA-256', 'SHA-384', 'SHA-512'].includes(state.algorithm)
    ? state.algorithm
    : 'SHA-256') as HashAlgorithm

  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (tab === 'hash') {
      if (!state.input.trim()) {
        setOutput('')
        setError('')
        return
      }
      void computeHash(state.input, algorithm)
        .then(setOutput)
        .catch(() => {
          setError('Failed to compute hash. Your browser may not support Web Crypto.')
          setOutput('')
        })
      return
    }

    if (!state.key.trim() || !state.message.trim()) {
      setOutput('')
      setError('')
      return
    }

    void computeHmac(state.key, state.message, algorithm)
      .then(setOutput)
      .catch(() => {
        setError('Failed to compute HMAC. Your browser may not support Web Crypto.')
        setOutput('')
      })
  }, [tab, state.input, state.key, state.message, algorithm])

  const loadExample = () => {
    if (tab === 'hash') {
      setField('input', HASH_EXAMPLE.input)
    } else {
      setField('key', HASH_EXAMPLE.key)
      setField('message', HASH_EXAMPLE.message)
    }
  }

  const clearAll = () => {
    setField('input', '')
    setField('key', '')
    setField('message', '')
    setOutput('')
    setError('')
  }

  const outputLabel =
    tab === 'hash' ? `${algorithm} hash` : `${hmacLabel(algorithm)} signature`

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={tab === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('tab', id)}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['SHA-256', 'SHA-384', 'SHA-512'] as HashAlgorithm[]).map((algo) => (
          <Button
            key={algo}
            type="button"
            variant={algorithm === algo ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('algorithm', algo)}
          >
            {tab === 'hash' ? algo : hmacLabel(algo)}
          </Button>
        ))}
      </div>

      {tab === 'hash' ? (
        <ToolPanel label="Input text">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Enter text to hash…"
            mono={false}
          />
        </ToolPanel>
      ) : (
        <>
          <ToolPanel label="Secret key">
            <ToolTextarea
              value={state.key}
              onChange={(e) => setField('key', e.target.value)}
              placeholder="your-secret-key"
              className="min-h-20"
              mono={false}
            />
          </ToolPanel>
          <ToolPanel label="Message">
            <ToolTextarea
              value={state.message}
              onChange={(e) => setField('message', e.target.value)}
              placeholder="Message to authenticate…"
              mono={false}
            />
          </ToolPanel>
        </>
      )}

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label={outputLabel}>
          <ToolTextarea value={output} readOnly className="min-h-20 font-mono" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} label="Copy" disabled={!output} />
        <ToolClearButton onClear={clearAll} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
      </ToolActions>

      {tab === 'hash' && (
        <p className="text-xs text-muted-foreground">
          Need a keyed signature? Switch to{' '}
          <button
            type="button"
            className="font-medium text-primary hover:text-primary/80"
            onClick={() => setField('tab', 'hmac')}
          >
            HMAC
          </button>{' '}
          — used for webhooks and API auth. Or verify JWTs in the{' '}
          <Link href="/tools/jwt-decoder" className="font-medium text-primary hover:text-primary/80">
            JWT workbench
          </Link>
          .
        </p>
      )}

      {tab === 'hmac' && (
        <p className="text-xs text-muted-foreground">
          Do not share production secrets via URL links. Use test keys only when sharing.
        </p>
      )}

      <ToolExample>
        <p className={cn('font-mono text-sm')}>
          {tab === 'hash'
            ? `"${HASH_EXAMPLE.input}" → SHA-256 hash (live)`
            : `HMAC-SHA256("${HASH_EXAMPLE.message}", key="${HASH_EXAMPLE.key}")`}
        </p>
      </ToolExample>
    </div>
  )
}
