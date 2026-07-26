'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine, Binary } from 'lucide-react'
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
import { BINARY_EXAMPLE, transformBinary, type BinaryTab } from '@/lib/binary-encoding'

const SHARE_INITIAL = {
  tab: 'encode' as BinaryTab,
  input: '',
}

const TABS: { id: BinaryTab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'encode', label: 'Text → Binary', icon: ArrowUpFromLine },
  { id: 'decode', label: 'Binary → Text', icon: ArrowDownToLine },
]

interface BinaryWorkbenchProps {
  defaultTab?: BinaryTab
}

export function BinaryWorkbench({ defaultTab = 'encode' }: BinaryWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as BinaryTab

  const { output, error, byteCount } = useMemo(
    () => transformBinary(state.input, tab),
    [state.input, tab],
  )

  const loadExample = () => {
    setField('input', tab === 'encode' ? BINARY_EXAMPLE.plain : BINARY_EXAMPLE.binary)
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
            placeholder={
              tab === 'encode' ? 'Enter text…' : '01001000 01101001 (8-bit groups, space-separated)'
            }
            mono
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Result appears here…" mono />
        </ToolPanel>
      </div>

      {byteCount !== undefined && output && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Binary className="size-3.5" />
          {byteCount} byte{byteCount === 1 ? '' : 's'} · {byteCount * 8} bits
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

      <p className="text-xs text-muted-foreground">
        Each character encodes to 8-bit UTF-8 bytes. For hex, use the{' '}
        <Link href="/tools/hex-encoder" className="font-medium text-primary hover:text-primary/80">
          Hex workbench
        </Link>
        .
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {BINARY_EXAMPLE.plain} → {BINARY_EXAMPLE.binary}
        </p>
      </ToolExample>
    </div>
  )
}
