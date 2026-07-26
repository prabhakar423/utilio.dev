'use client'

import { useCallback, useEffect, useState } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

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

export function JwtDecoder() {
  const [token, setToken] = useShareableInput('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const handleDecode = useCallback(() => {
    setError('')
    setHeader('')
    setPayload('')

    const trimmed = token.trim()
    if (!trimmed) return

    const parts = trimmed.split('.')
    if (parts.length !== 3) {
      setError('Invalid JWT: expected 3 parts separated by dots (header.payload.signature)')
      return
    }

    try {
      setHeader(JSON.stringify(decodePart(parts[0]), null, 2))
      setPayload(JSON.stringify(decodePart(parts[1]), null, 2))
    } catch {
      setError('Failed to decode JWT. Check that the token is valid Base64URL-encoded JSON.')
    }
  }, [token])

  useEffect(() => {
    if (token.trim()) {
      handleDecode()
    }
  }, [token, handleDecode])

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

      <button
        type="button"
        onClick={handleDecode}
        className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Decode JWT
      </button>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
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

      <p className="text-xs text-muted-foreground">
        Signature verification is not performed. Never paste production secrets into untrusted tools.
      </p>
    </div>
  )
}
