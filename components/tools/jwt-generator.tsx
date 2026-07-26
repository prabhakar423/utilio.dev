'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = {
  header: '{"alg":"HS256","typ":"JWT"}',
  payload: '{"sub":"1234567890","name":"John Doe","iat":1516239022}',
}

function base64UrlEncode(obj: object): string {
  const json = JSON.stringify(obj)
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function JwtGenerator() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { header, payload } = state

  const { token, error } = useMemo(() => {
    if (!header.trim() || !payload.trim()) return { token: '', error: '' }
    try {
      const h = JSON.parse(header)
      const p = JSON.parse(payload)
      const unsigned = `${base64UrlEncode(h)}.${base64UrlEncode(p)}`
      return { token: `${unsigned}.SIGNATURE_PLACEHOLDER`, error: '' }
    } catch {
      return { token: '', error: 'Invalid JSON in header or payload' }
    }
  }, [header, payload])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Header (JSON)">
        <ToolTextarea value={header} onChange={(e) => setField('header', e.target.value)} className="min-h-20" />
      </ToolPanel>

      <ToolPanel label="Payload (JSON)">
        <ToolTextarea value={payload} onChange={(e) => setField('payload', e.target.value)} className="min-h-32" />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {token && (
        <ToolPanel label="JWT (unsigned)">
          <ToolTextarea value={token} readOnly className="min-h-20" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={token} label="Copy token" disabled={!token} />
        <ToolClearButton
          onClear={() => {
            setField('header', SHARE_INITIAL.header)
            setField('payload', SHARE_INITIAL.payload)
          }}
        />
      </ToolActions>

      <ToolExample>
        <p>
          Generates header.payload structure without signing. Use for testing and learning — not for
          production auth. Pair with the JWT Decoder to inspect tokens.
        </p>
      </ToolExample>
    </div>
  )
}
