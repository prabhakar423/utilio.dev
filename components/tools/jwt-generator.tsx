'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function base64UrlEncode(obj: object): string {
  const json = JSON.stringify(obj)
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function JwtGenerator() {
  const [header, setHeader] = useState('{"alg":"HS256","typ":"JWT"}')
  const [payload, setPayload] = useState('{"sub":"1234567890","name":"John Doe","iat":1516239022}')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setError('')
    try {
      const h = JSON.parse(header)
      const p = JSON.parse(payload)
      const unsigned = `${base64UrlEncode(h)}.${base64UrlEncode(p)}`
      setToken(`${unsigned}.SIGNATURE_PLACEHOLDER`)
    } catch {
      setError('Invalid JSON in header or payload')
      setToken('')
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(token)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Header (JSON)">
        <ToolTextarea value={header} onChange={(e) => setHeader(e.target.value)} className="min-h-20" />
      </ToolPanel>
      <ToolPanel label="Payload (JSON)">
        <ToolTextarea value={payload} onChange={(e) => setPayload(e.target.value)} className="min-h-32" />
      </ToolPanel>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <Button type="button" onClick={generate}>Generate unsigned JWT</Button>
      <p className="text-xs text-muted-foreground">Generates header.payload structure without signing. Use for testing and learning — not for production auth.</p>
      {token && (
        <>
          <ToolPanel label="JWT (unsigned)">
            <ToolTextarea value={token} readOnly className="min-h-20" />
          </ToolPanel>
          <Button type="button" variant="secondary" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy token
          </Button>
        </>
      )}
    </div>
  )
}
