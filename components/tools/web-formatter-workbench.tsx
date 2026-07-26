'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Braces, Code2, FileCode, Minimize2, Sparkles } from 'lucide-react'
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
  transformWebCode,
  WEB_FORMATTER_EXAMPLES,
  type WebFormatterTab,
} from '@/lib/web-formatter'

const SHARE_INITIAL = {
  tab: 'html' as WebFormatterTab,
  html: '',
  css: '',
  js: '',
  xml: '',
}

const TABS: { id: WebFormatterTab; label: string; icon: typeof Sparkles; action: string }[] = [
  { id: 'html', label: 'HTML', icon: FileCode, action: 'Beautify' },
  { id: 'css', label: 'CSS', icon: Minimize2, action: 'Minify' },
  { id: 'js', label: 'JavaScript', icon: Braces, action: 'Minify' },
  { id: 'xml', label: 'XML', icon: Code2, action: 'Format' },
]

interface WebFormatterWorkbenchProps {
  defaultTab?: WebFormatterTab
}

export function WebFormatterWorkbench({ defaultTab = 'html' }: WebFormatterWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as WebFormatterTab

  const input =
    tab === 'html' ? state.html : tab === 'css' ? state.css : tab === 'js' ? state.js : state.xml

  const setInput = (value: string) => setField(tab, value)

  const { output, error, savedBytes } = useMemo(
    () => transformWebCode(input, tab),
    [input, tab],
  )

  const currentTab = TABS.find((t) => t.id === tab)!
  const savedPct =
    savedBytes !== undefined && input.length > 0
      ? Math.round((savedBytes / input.length) * 100)
      : 0

  const loadExample = () => setField(tab, WEB_FORMATTER_EXAMPLES[tab])

  const clearCurrent = () => setField(tab, '')

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon, action }) => (
          <Button
            key={id}
            type="button"
            variant={tab === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('tab', id)}
          >
            <Icon className="size-3.5" />
            {label}
            <span className="text-xs opacity-70">· {action}</span>
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label={`${currentTab.label} input`}>
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-48"
            placeholder={`Paste ${currentTab.label} here…`}
          />
        </ToolPanel>
        <ToolPanel label={`${currentTab.action}d output`}>
          <ToolTextarea
            value={output}
            readOnly
            className="min-h-48"
            placeholder="Output appears here…"
          />
        </ToolPanel>
      </div>

      {savedBytes !== undefined && savedBytes > 0 && output && (
        <p className="text-xs text-muted-foreground">
          Saved {savedBytes} characters ({savedPct}% reduction)
        </p>
      )}

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={clearCurrent} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        {tab === 'html' ? 'Pretty-print minified HTML.' : tab === 'xml' ? 'Validate and indent XML.' : 'Basic minifier — test output before production.'}{' '}
        Convert Markdown in the{' '}
        <Link href="/tools/markdown-preview" className="font-medium text-primary hover:text-primary/80">
          Markdown workbench
        </Link>
        .
      </p>

      <ToolExample>
        <pre className="whitespace-pre-wrap font-mono text-sm">{WEB_FORMATTER_EXAMPLES[tab]}</pre>
      </ToolExample>
    </div>
  )
}
