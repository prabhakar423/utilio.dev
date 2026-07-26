'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
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
import { HEX_EXAMPLE, transformHex, type HexTab } from '@/lib/hex-encoding'

const SHARE_INITIAL = {
  tab: 'encode' as HexTab,
  input: '',
}

const TABS: { id: HexTab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'encode', label: 'Text → Hex', icon: ArrowUpFromLine },
  { id: 'decode', label: 'Hex → Text', icon: ArrowDownToLine },
]

interface HexWorkbenchProps {
  defaultTab?: HexTab
}

export function HexWorkbench({ defaultTab = 'encode' }: HexWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as HexTab

  const { output, error } = useMemo(
    () => transformHex(state.input, tab),
    [state.input, tab],
  )

  const loadExample = () => {
    setField('input', tab === 'encode' ? HEX_EXAMPLE.plain : HEX_EXAMPLE.hex)
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
              tab === 'encode' ? 'Enter text…' : 'Enter hex (e.g. 48656c6c6f)…'
            }
            mono
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" mono />
        </ToolPanel>
      </div>

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
        Whitespace in hex input is ignored. For Base64 encoding, use the{' '}
        <Link href="/tools/base64-encoder" className="font-medium text-primary hover:text-primary/80">
          Base64 workbench
        </Link>
        .
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {HEX_EXAMPLE.plain} → {HEX_EXAMPLE.hex}
        </p>
      </ToolExample>
    </div>
  )
}
