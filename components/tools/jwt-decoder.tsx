'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'
import { useToolShortcut } from '@/hooks/use-tool-shortcut'

const EXAMPLE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

function decodePart(part: string): unknown {
  const padded = part.replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join(''),
  )
  return JSON.parse(json)
}

function formatClaimDates(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object') return []
  const claims = payload as Record<string, unknown>
  const lines: string[] = []
  for (const key of ['exp', 'iat', 'nbf'] as const) {
    const value = claims[key]
    if (typeof value === 'number') {
      lines.push(`${key}: ${new Date(value * 1000).toLocaleString()} (${value})`)
    }
  }
  return lines
}

export function JwtDecoder() {
  const [token, setToken] = useShareableInput('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [claimDates, setClaimDates] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleDecode = useCallback(() => {
    setError('')
    setHeader('')
    setPayload('')
    setClaimDates([])

    const trimmed = token.trim()
    if (!trimmed) return

    const parts = trimmed.split('.')
    if (parts.length !== 3) {
      setError('Invalid JWT: expected 3 parts separated by dots (header.payload.signature)')
      return
    }

    try {
      const headerObj = decodePart(parts[0])
      const payloadObj = decodePart(parts[1])
      setHeader(JSON.stringify(headerObj, null, 2))
      setPayload(JSON.stringify(payloadObj, null, 2))
      setClaimDates(formatClaimDates(payloadObj))
    } catch {
      setError('Failed to decode JWT. Check that the token is valid Base64URL-encoded JSON.')
    }
  }, [token])

  useEffect(() => {
    handleDecode()
  }, [handleDecode])

  useToolShortcut(handleDecode, 'Enter')

  const clear = () => {
    setToken('')
    setHeader('')
    setPayload('')
    setClaimDates([])
    setError('')
  }

  const loadExample = () => setToken(EXAMPLE_TOKEN)

  const hasOutput = Boolean(header || payload)

  return (
    <div className="grid gap-5">
      <ToolPanel label="JWT token">
        <ToolTextarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here (eyJhbGciOiJ…)…"
          className="min-h-28"
        />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {claimDates.length > 0 && (
        <div className="rounded-xl border border-border/70 bg-muted/20 px-4 py-3 text-sm">
          <p className="font-medium">Time claims</p>
          <ul className="mt-1 space-y-0.5 text-muted-foreground">
            {claimDates.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {header && (
        <ToolPanel label="Header">
          <ToolTextarea value={header} readOnly className="min-h-32" />
        </ToolPanel>
      )}

      {payload && (
        <ToolPanel label="Payload">
          <ToolTextarea value={payload} readOnly className="min-h-48" />
        </ToolPanel>
      )}

      <ToolActions>
        {hasOutput && (
          <>
            <ToolCopyButton text={header} label="Copy header" disabled={!header} />
            <ToolCopyButton text={payload} label="Copy payload" disabled={!payload} />
          </>
        )}
        <ToolClearButton onClear={clear} />
        <Button type="button" variant="outline" onClick={loadExample}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample title="Example token">
        <p className="font-mono break-all">{EXAMPLE_TOKEN}</p>
      </ToolExample>

      <p className="text-xs text-muted-foreground">
        Signature verification is not performed. Never paste production secrets into untrusted tools.
      </p>
    </div>
  )
}
