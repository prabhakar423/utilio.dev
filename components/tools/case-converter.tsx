'use client'

import { useMemo, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function toTitleCase(text: string) {
  return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

function toSnakeCase(text: string) {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

function toCamelCase(text: string) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/[\s_-]+/g, '')
}

const transforms = {
  uppercase: (t: string) => t.toUpperCase(),
  lowercase: (t: string) => t.toLowerCase(),
  title: toTitleCase,
  sentence: (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
  snake: toSnakeCase,
  camel: toCamelCase,
} as const

type TransformKey = keyof typeof transforms

export function CaseConverter() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const results = useMemo(() => {
    if (!input) return null
    return Object.entries(transforms).map(([key, fn]) => ({
      key: key as TransformKey,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: fn(input),
    }))
  }, [input])

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    window.setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input text">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert…"
          mono={false}
        />
      </ToolPanel>

      {results && (
        <div className="grid gap-3">
          {results.map(({ key, label, value }) => (
            <div
              key={key}
              className="flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </div>
                <div className="mt-1 break-words font-mono text-sm">{value}</div>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => copy(value, key)}>
                {copied === key ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
