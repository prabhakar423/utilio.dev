'use client'

import { useMemo } from 'react'
import { Minimize2, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolResult,
  ToolStat,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import { processJson, type JsonMode } from '@/lib/json-formatter'
import { cn } from '@/lib/utils'

const EXAMPLE = `{"name":"John","age":30,"skills":["JSON","TypeScript"]}`

const MODES: { id: JsonMode; label: string; icon: typeof Sparkles }[] = [
  { id: 'format', label: 'Format', icon: Sparkles },
  { id: 'minify', label: 'Minify', icon: Minimize2 },
  { id: 'validate', label: 'Validate', icon: ShieldCheck },
]

const SHARE_INITIAL = {
  input: '',
  mode: 'format' as JsonMode,
}

export function JsonFormatter() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = (MODES.some((m) => m.id === state.mode) ? state.mode : 'format') as JsonMode

  const result = useMemo(() => processJson(state.input, mode), [state.input, mode])

  const statsSummary = result.stats
    ? result.stats.rootType === 'object'
      ? `${result.stats.keyCount} keys · depth ${result.stats.maxDepth}`
      : result.stats.rootType === 'array'
        ? `${result.stats.itemCount} items · depth ${result.stats.maxDepth}`
        : `primitive · ${result.stats.sizeBytes} bytes`
    : null

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {MODES.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={mode === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('mode', id)}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
        <span className="ml-auto self-center text-xs text-muted-foreground">
          {state.input.length.toLocaleString()} chars · live
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ToolPanel label="Input JSON">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Paste or type JSON here…"
            spellCheck={false}
          />
        </ToolPanel>
        <ToolPanel label={mode === 'validate' ? 'Validation result' : 'Output'}>
          <ToolTextarea
            value={result.output}
            readOnly
            placeholder={
              mode === 'validate'
                ? 'Validation result appears here…'
                : 'Formatted output appears here…'
            }
            className={cn(
              result.valid === true && mode === 'validate' && 'text-emerald-600 dark:text-emerald-400',
            )}
          />
        </ToolPanel>
      </div>

      {result.error && (
        <ToolError
          message={
            result.location
              ? `${result.error} (line ${result.location.line}, column ${result.location.column})`
              : result.error
          }
        />
      )}

      {result.valid === true && mode === 'validate' && (
        <ToolResult variant="success" title="Valid JSON">
          Syntax is correct.{statsSummary ? ` ${statsSummary}.` : ''}
        </ToolResult>
      )}

      {result.stats && result.valid && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat
            label="Root type"
            value={result.stats.rootType}
            accent
          />
          <ToolStat
            label={result.stats.rootType === 'array' ? 'Items' : 'Keys'}
            value={result.stats.itemCount ?? result.stats.keyCount ?? '—'}
          />
          <ToolStat label="Size" value={`${result.stats.sizeBytes.toLocaleString()} B`} />
        </div>
      )}

      {result.structure && result.valid && (
        <ToolPanel label="Structure preview">
          <ToolTextarea value={result.structure} readOnly className="min-h-32" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={result.output} disabled={!result.output} />
        <ToolClearButton onClear={() => setField('input', '')} />
        <Button type="button" variant="outline" onClick={() => setField('input', EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample title="Example input">
        <pre className="rounded-lg bg-muted/50 p-3 font-mono">{EXAMPLE}</pre>
      </ToolExample>
    </div>
  )
}
