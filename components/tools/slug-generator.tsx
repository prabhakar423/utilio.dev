'use client'

import { useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

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
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const slug = useMemo(() => (input ? toSlug(input) : ''), [input])

  const copy = async () => {
    await navigator.clipboard.writeText(slug)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

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
        <>
          <ToolPanel label="URL slug">
            <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3 font-mono text-sm">
              {slug}
            </div>
          </ToolPanel>
          <Button type="button" variant="secondary" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? 'Copied' : 'Copy slug'}
          </Button>
        </>
      )}
    </div>
  )
}
