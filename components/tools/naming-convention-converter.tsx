'use client'

import { useMemo } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useShareableInput } from '@/hooks/use-shareable-input'

function toWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[._-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
}

function toPascalCase(words: string[]) {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

const transforms = {
  camelCase: (words: string[]) => words[0] + toPascalCase(words.slice(1)),
  PascalCase: (words: string[]) => toPascalCase(words),
  snake_case: (words: string[]) => words.join('_'),
  'SCREAMING_SNAKE': (words: string[]) => words.join('_').toUpperCase(),
  'kebab-case': (words: string[]) => words.join('-'),
  'dot.case': (words: string[]) => words.join('.'),
} as const

function NamingResultRow({ name, value }: { name: string; value: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 p-4">
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{name}</div>
        <div className="mt-1 break-all font-mono text-sm">{value}</div>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={() => void copy(value)}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  )
}

export function NamingConventionConverter() {
  const [input, setInput] = useShareableInput('myVariableName')

  const results = useMemo(() => {
    if (!input.trim()) return null
    const words = toWords(input)
    return Object.entries(transforms).map(([key, fn]) => ({
      key,
      value: fn(words),
    }))
  }, [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Variable or identifier">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="my_variable_name"
          className="min-h-20"
        />
      </ToolPanel>

      {results && (
        <div className="grid gap-3">
          {results.map(({ key, value }) => (
            <NamingResultRow key={key} name={key} value={value} />
          ))}
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>
    </div>
  )
}
