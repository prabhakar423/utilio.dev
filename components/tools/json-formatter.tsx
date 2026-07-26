'use client'

import { useCallback, useState } from 'react'
import { Check, Copy, Minimize2, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'
import { useToolShortcut } from '@/hooks/use-tool-shortcut'
import { cn } from '@/lib/utils'

type Mode = 'format' | 'minify' | 'validate'

const EXAMPLE = `{"name":"John","age":30,"skills":["JSON","TypeScript"]}`

export function JsonFormatter() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<Mode>('format')
  const [copied, setCopied] = useState(false)
  const [valid, setValid] = useState<boolean | null>(null)

  const run = useCallback(
    (nextMode: Mode = mode) => {
      setError('')
      setCopied(false)
      setValid(null)

      if (!input.trim()) {
        setOutput('')
        return
      }

      try {
        const parsed = JSON.parse(input)

        if (nextMode === 'validate') {
          setValid(true)
          setOutput('✓ Valid JSON')
          return
        }

        setValid(true)
        setOutput(
          nextMode === 'minify'
            ? JSON.stringify(parsed)
            : JSON.stringify(parsed, null, 2),
        )
      } catch (err) {
        setValid(false)
        setError(err instanceof Error ? err.message : 'Invalid JSON')
        setOutput('')
      }
    },
    [input, mode],
  )

  useToolShortcut(() => run(), 'Enter')

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const loadExample = () => {
    setInput(EXAMPLE)
    setOutput('')
    setError('')
    setValid(null)
  }

  const modes: { id: Mode; label: string; icon: typeof Sparkles }[] = [
    { id: 'format', label: 'Format', icon: Sparkles },
    { id: 'minify', label: 'Minify', icon: Minimize2 },
    { id: 'validate', label: 'Validate', icon: ShieldCheck },
  ]

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {modes.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={mode === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode(id)
              if (input.trim()) run(id)
            }}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
        <span className="ml-auto self-center text-xs text-muted-foreground">
          {input.length.toLocaleString()} chars · Ctrl+Enter to run
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ToolPanel label="Input JSON">
          <ToolTextarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setValid(null)
            }}
            placeholder="Paste or type JSON here…"
            spellCheck={false}
          />
        </ToolPanel>
        <ToolPanel label={mode === 'validate' ? 'Validation result' : 'Output'}>
          <ToolTextarea
            value={output}
            readOnly
            placeholder={
              mode === 'validate'
                ? 'Validation result appears here…'
                : 'Formatted output appears here…'
            }
            className={cn(
              valid === true && mode === 'validate' && 'text-emerald-600 dark:text-emerald-400',
            )}
          />
        </ToolPanel>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <ToolActions>
        <Button type="button" onClick={() => run()}>
          {mode === 'format' && 'Format JSON'}
          {mode === 'minify' && 'Minify JSON'}
          {mode === 'validate' && 'Validate JSON'}
        </Button>
        <Button type="button" variant="secondary" onClick={handleCopy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copied' : 'Copy output'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setInput('')
            setOutput('')
            setError('')
            setValid(null)
          }}
        >
          <RefreshCw className="size-4" />
          Clear
        </Button>
        <Button type="button" variant="ghost" onClick={loadExample}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample title="Example input">
        <pre className="rounded-lg bg-muted/50 p-3 font-mono">{EXAMPLE}</pre>
      </ToolExample>
    </div>
  )
}
