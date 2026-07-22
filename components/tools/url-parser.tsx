'use client'

import { useState } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function UrlParser() {
  const [url, setUrl] = useState('https://example.com:8080/path?q=hello#section')
  const [output, setOutput] = useState('')

  const parse = () => {
    try {
      const u = new URL(url)
      setOutput(
        [
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
      )
    } catch {
      setOutput('Invalid URL. Include protocol (https://)')
    }
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="URL">
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm" />
      </ToolPanel>
      <button type="button" onClick={parse}
        className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Parse URL
      </button>
      {output && <ToolPanel label="Parsed components"><ToolTextarea value={output} readOnly className="min-h-48" mono={false} /></ToolPanel>}
    </div>
  )
}
