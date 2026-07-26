'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  MORSE_EXAMPLE,
  MORSE_REFERENCE,
  transformMorse,
  type MorseTab,
} from '@/lib/morse-code'

const SHARE_INITIAL = {
  tab: 'encode' as MorseTab,
  input: '',
}

const TABS: { id: MorseTab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'encode', label: 'Text → Morse', icon: ArrowUpFromLine },
  { id: 'decode', label: 'Morse → Text', icon: ArrowDownToLine },
]

interface MorseWorkbenchProps {
  defaultTab?: MorseTab
}

export function MorseWorkbench({ defaultTab = 'encode' }: MorseWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as MorseTab

  const { output, error, symbolCount } = useMemo(
    () => transformMorse(state.input, tab),
    [state.input, tab],
  )

  const loadExample = () => {
    setField('input', tab === 'encode' ? MORSE_EXAMPLE.text : MORSE_EXAMPLE.code)
  }

  const swapToOtherTab = () => {
    if (!output) return
    setField('input', output)
    setField('tab', tab === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={tab === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('tab', id)}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={tab === 'encode' ? 'SOS' : '... --- ...'}
            mono
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Translation appears here…" mono />
        </ToolPanel>
      </div>

      {symbolCount !== undefined && output && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Radio className="size-3.5" />
          {symbolCount} Morse symbol{symbolCount === 1 ? '' : 's'} · words separated by /
        </p>
      )}

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
        {output && (
          <Button type="button" variant="outline" size="sm" onClick={swapToOtherTab}>
            {tab === 'encode' ? 'Decode output →' : 'Encode output →'}
          </Button>
        )}
      </ToolActions>

      <details className="rounded-2xl border border-border/70 bg-muted/20 p-4">
        <summary className="cursor-pointer text-sm font-medium">Morse code reference (A–Z, 0–9)</summary>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-9">
          {MORSE_REFERENCE.map(({ char, code }) => (
            <div key={char} className="rounded-lg border border-border/50 bg-background/80 px-2 py-1.5 text-center text-xs">
              <div className="font-semibold">{char}</div>
              <div className="mt-0.5 font-mono text-muted-foreground">{code}</div>
            </div>
          ))}
        </div>
      </details>

      <p className="text-xs text-muted-foreground">
        Use / between words when encoding. Try{' '}
        <Link href="/tools/binary-converter" className="font-medium text-primary hover:text-primary/80">
          Binary
        </Link>{' '}
        or{' '}
        <Link href="/tools/rot13-encoder" className="font-medium text-primary hover:text-primary/80">
          ROT13
        </Link>{' '}
        for other encodings.
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {MORSE_EXAMPLE.text} → {MORSE_EXAMPLE.code}
        </p>
      </ToolExample>
    </div>
  )
}
