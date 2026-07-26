'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

export function ExtractEmails() {
  const [input, setInput] = useShareableInput('')

  const { output, count } = useMemo(() => {
    if (!input.trim()) return { output: '', count: 0 }
    const matches = [...new Set(input.match(EMAIL_REGEX) ?? [])]
    return { output: matches.join('\n'), count: matches.length }
  }, [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Text containing email addresses">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contact alice@example.com or bob@company.org…"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="Extracted emails">
          <ToolTextarea value={output} readOnly mono={false} className="min-h-32" placeholder="Emails appear here…" />
          {count > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Found {count} unique email{count !== 1 ? 's' : ''}
            </p>
          )}
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>
    </div>
  )
}
