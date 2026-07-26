'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE_URL = 'https://example.com:8080/path?q=hello&page=1#section'

export function UrlParser() {
  const [url, setUrl] = useShareableInput(EXAMPLE_URL)

  const { output, error } = useMemo(() => {
    const trimmed = url.trim()
    if (!trimmed) return { output: '', error: '' }

    try {
      const u = new URL(trimmed)
      return {
        output: [
          `Protocol: ${u.protocol}`,
          `Hostname: ${u.hostname}`,
          `Port: ${u.port || '(default)'}`,
          `Pathname: ${u.pathname}`,
          `Search: ${u.search || '(none)'}`,
          `Hash: ${u.hash || '(none)'}`,
          `Origin: ${u.origin}`,
          `Host: ${u.host}`,
          '',
          'Query parameters:',
          ...[...u.searchParams.entries()].map(([k, v]) => `  ${k} = ${v}`),
        ].join('\n'),
        error: '',
      }
    } catch {
      return { output: '', error: 'Invalid URL. Include protocol (https:// or http://).' }
    }
  }, [url])

  return (
    <div className="grid gap-5">
      <ToolPanel label="URL">
        <ToolInput
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/path?q=1"
          className="font-mono"
        />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label="Parsed components">
          <ToolTextarea value={output} readOnly className="min-h-48" mono={false} />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} label="Copy breakdown" disabled={!output} />
        <ToolClearButton onClear={() => setUrl('')} />
        <Button type="button" variant="outline" onClick={() => setUrl(EXAMPLE_URL)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <p className="font-mono break-all">{EXAMPLE_URL}</p>
      </ToolExample>
    </div>
  )
}
