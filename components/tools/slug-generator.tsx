'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function SlugGenerator() {
  const [input, setInput] = useShareableInput('')

  const slug = useMemo(() => (input ? toSlug(input) : ''), [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Title or text">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="My Blog Post Title"
          mono={false}
          className="min-h-24"
        />
      </ToolPanel>

      {slug && (
        <ToolPanel label="URL slug">
          <ToolTextarea value={slug} readOnly className="min-h-16 font-mono" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={slug} label="Copy slug" disabled={!slug} />
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>
    </div>
  )
}
