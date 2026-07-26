'use client'

import { useMemo } from 'react'
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

const EXAMPLE = '<root><item>value</item><item>two</item></root>'

function formatXml(xml: string): string {
  const trimmed = xml.replace(/>\s*</g, '><').trim()
  let formatted = ''
  let indent = 0
  const parts = trimmed.replace(/(<[^>]+>)/g, '\n$1\n').split('\n').filter(Boolean)

  for (const part of parts) {
    if (part.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + part + '\n'
    if (part.match(/^<\w[^>]*[^/]>$/)) indent++
  }
  return formatted.trim()
}

export function XmlFormatter() {
  const [input, setInput] = useShareableInput('')

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, 'application/xml')
      if (doc.querySelector('parsererror')) throw new Error('Invalid XML')
      return { output: formatXml(input), error: '' }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Invalid XML',
      }
    }
  }, [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="XML input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><item>value</item></root>" />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label="Formatted XML">
          <ToolTextarea value={output} readOnly className="min-h-48" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
        <Button type="button" variant="outline" onClick={() => setInput(EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <p className="font-mono">{EXAMPLE}</p>
      </ToolExample>
    </div>
  )
}
