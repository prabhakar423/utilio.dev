'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Lock, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import { ROT13_EXAMPLE, rot13 } from '@/lib/rot13'

const SHARE_INITIAL = { input: '' }

export function Rot13Workbench() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)

  const output = useMemo(() => (state.input ? rot13(state.input) : ''), [state.input])
  const roundTrip = useMemo(() => (output ? rot13(output) : ''), [output])
  const isValidRoundTrip = Boolean(state.input && roundTrip === state.input)

  const loadExample = () => setField('input', ROT13_EXAMPLE.plain)

  const applyTwice = () => {
    if (!state.input) return
    setField('input', rot13(rot13(state.input)))
  }

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
        <Lock className="size-4 shrink-0 text-primary" />
        ROT13 is symmetric — encode and decode use the same operation.
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder="Hello World"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="ROT13 output">
          <ToolTextarea value={output} readOnly mono={false} placeholder="Output appears here…" />
        </ToolPanel>
      </div>

      {isValidRoundTrip && (
        <p className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <RotateCcw className="size-3.5" />
          Applying ROT13 twice returns the original text
        </p>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
        {state.input && (
          <Button type="button" variant="outline" size="sm" onClick={applyTwice}>
            Apply ROT13 twice →
          </Button>
        )}
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        ROT13 only affects A–Z letters. For reversible binary encoding, try{' '}
        <Link href="/tools/morse-code-translator" className="font-medium text-primary hover:text-primary/80">
          Morse code
        </Link>
        .
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {ROT13_EXAMPLE.plain} → {ROT13_EXAMPLE.encoded}
        </p>
      </ToolExample>
    </div>
  )
}
