'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent ?? ''
}

export function StripHtmlTags() {
  const [input, setInput] = useShareableInput('')

  const output = useMemo(() => (input ? stripHtml(input) : ''), [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="HTML input">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<p>Hello <strong>world</strong></p>"
          />
        </ToolPanel>
        <ToolPanel label="Plain text">
          <ToolTextarea value={output} readOnly mono={false} placeholder="Plain text appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>
    </div>
  )
}
