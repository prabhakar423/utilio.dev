'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine, Hash } from 'lucide-react'
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
import { ASCII_EXAMPLE, transformAscii, type AsciiTab } from '@/lib/ascii-encoding'

const SHARE_INITIAL = {
  tab: 'char-to-code' as AsciiTab,
  input: '',
}

const TABS: { id: AsciiTab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'char-to-code', label: 'Char → Code', icon: ArrowUpFromLine },
  { id: 'code-to-char', label: 'Code → Char', icon: ArrowDownToLine },
]

interface AsciiWorkbenchProps {
  defaultTab?: AsciiTab
}

export function AsciiWorkbench({ defaultTab = 'char-to-code' }: AsciiWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as AsciiTab

  const { output, error, rows } = useMemo(
    () => transformAscii(state.input, tab),
    [state.input, tab],
  )

  const loadExample = () => {
    setField('input', tab === 'char-to-code' ? ASCII_EXAMPLE.text : ASCII_EXAMPLE.codes)
  }

  const copyCodesOnly = rows?.map((r) => r.decimal).join(' ') ?? ''

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
            placeholder={
              tab === 'char-to-code' ? 'Hello' : '72 101 108 108 111 or 0x48 0x65…'
            }
            className="min-h-32"
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea
            value={output}
            readOnly
            className="min-h-32"
            placeholder="Result appears here…"
          />
        </ToolPanel>
      </div>

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/30 text-left text-xs text-muted-foreground">
                <th className="px-4 py-2 font-medium">Char</th>
                <th className="px-4 py-2 font-medium">Decimal</th>
                <th className="px-4 py-2 font-medium">Hex</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${row.char}-${i}`} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-2 font-mono">{row.char === ' ' ? '(space)' : row.char}</td>
                  <td className="px-4 py-2 font-mono">{row.decimal}</td>
                  <td className="px-4 py-2 font-mono">{row.hex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        {copyCodesOnly && (
          <ToolCopyButton text={copyCodesOnly} label="Copy decimal codes" />
        )}
        <ToolClearButton onClear={() => setField('input', '')} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
      </ToolActions>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Hash className="size-3.5" />
        Supports decimal and 0x hex codes. For full hex encoding, use the{' '}
        <Link href="/tools/hex-encoder" className="font-medium text-primary hover:text-primary/80">
          Hex workbench
        </Link>
        .
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {ASCII_EXAMPLE.text} → {ASCII_EXAMPLE.codes}
        </p>
      </ToolExample>
    </div>
  )
}
