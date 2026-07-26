'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel } from '@/components/tools/tool-ui'

const STATUS_CODES = [
  { code: 100, name: 'Continue', desc: 'Server received request headers; client should continue.' },
  { code: 101, name: 'Switching Protocols', desc: 'Server agrees to switch protocols (e.g. WebSocket).' },
  { code: 200, name: 'OK', desc: 'Request succeeded.' },
  { code: 201, name: 'Created', desc: 'Resource created successfully.' },
  { code: 204, name: 'No Content', desc: 'Success with no response body.' },
  { code: 301, name: 'Moved Permanently', desc: 'Resource permanently moved to new URL.' },
  { code: 302, name: 'Found', desc: 'Temporary redirect to another URL.' },
  { code: 304, name: 'Not Modified', desc: 'Cached version is still valid.' },
  { code: 400, name: 'Bad Request', desc: 'Malformed or invalid request.' },
  { code: 401, name: 'Unauthorized', desc: 'Authentication required.' },
  { code: 403, name: 'Forbidden', desc: 'Authenticated but not authorized.' },
  { code: 404, name: 'Not Found', desc: 'Resource does not exist.' },
  { code: 405, name: 'Method Not Allowed', desc: 'HTTP method not supported for this URL.' },
  { code: 408, name: 'Request Timeout', desc: 'Server timed out waiting for request.' },
  { code: 409, name: 'Conflict', desc: 'Request conflicts with current resource state.' },
  { code: 422, name: 'Unprocessable Entity', desc: 'Valid syntax but semantic errors.' },
  { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded.' },
  { code: 500, name: 'Internal Server Error', desc: 'Unexpected server error.' },
  { code: 502, name: 'Bad Gateway', desc: 'Invalid response from upstream server.' },
  { code: 503, name: 'Service Unavailable', desc: 'Server temporarily unavailable.' },
  { code: 504, name: 'Gateway Timeout', desc: 'Upstream server timed out.' },
]

function category(code: number) {
  if (code < 200) return '1xx Informational'
  if (code < 300) return '2xx Success'
  if (code < 400) return '3xx Redirection'
  if (code < 500) return '4xx Client Error'
  return '5xx Server Error'
}

export function HttpStatusCodes() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return STATUS_CODES
    return STATUS_CODES.filter(
      (s) =>
        String(s.code).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Search status codes">
        <ToolInput
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, name, or description…"
        />
      </ToolPanel>

      <p className="text-sm text-muted-foreground">
        {filtered.length} code{filtered.length !== 1 ? 's' : ''} shown
      </p>

      <div className="grid gap-2">
        {filtered.map((s) => (
          <div key={s.code} className="rounded-xl border border-border/70 bg-card/50 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-sm font-bold text-primary">
                {s.code}
              </span>
              <span className="font-semibold">{s.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{category(s.code)}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <ToolActions>
        <ToolClearButton onClear={() => setQuery('')} />
      </ToolActions>
    </div>
  )
}
