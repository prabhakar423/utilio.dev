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
import { HTML_EXAMPLE, transformHtml, type HtmlTab } from '@/lib/html-encoding'

const SHARE_INITIAL = {
  tab: 'encode' as HtmlTab,
  input: '',
}

const TABS: { id: HtmlTab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'encode', label: 'Encode', icon: ArrowUpFromLine },
  { id: 'decode', label: 'Decode', icon: ArrowDownToLine },
]

interface HtmlWorkbenchProps {
  defaultTab?: HtmlTab
}

export function HtmlWorkbench({ defaultTab = 'encode' }: HtmlWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as HtmlTab

  const { output, error } = useMemo(
    () => transformHtml(state.input, tab),
    [state.input, tab],
  )

  const loadExample = () => {
    setField('input', tab === 'encode' ? HTML_EXAMPLE.plain : HTML_EXAMPLE.encoded)
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
              tab === 'encode' ? 'Enter HTML or text…' : 'Enter HTML entities…'
            }
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" />
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
        Escapes &amp;, &lt;, &gt;, and quotes for safe HTML display. For URL encoding, use the{' '}
        <Link href="/tools/url-encoder" className="font-medium text-primary hover:text-primary/80">
          URL workbench
        </Link>
        .
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {tab === 'encode' ? (
            <>
              &lt;div&gt; → &amp;lt;div&amp;gt;
            </>
          ) : (
            HTML_EXAMPLE.encoded
          )}
        </p>
      </ToolExample>
    </div>
  )
}
