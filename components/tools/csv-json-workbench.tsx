'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeftRight, ArrowRightLeft, Table2 } from 'lucide-react'
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
import { convertCsvJson, CSV_JSON_EXAMPLE, type CsvJsonTab } from '@/lib/csv-json'

const SHARE_INITIAL = {
  tab: 'csv-to-json' as CsvJsonTab,
  input: '',
}

const TABS: { id: CsvJsonTab; label: string; icon: typeof ArrowRightLeft }[] = [
  { id: 'csv-to-json', label: 'CSV → JSON', icon: ArrowRightLeft },
  { id: 'json-to-csv', label: 'JSON → CSV', icon: ArrowLeftRight },
]

interface CsvJsonWorkbenchProps {
  defaultTab?: CsvJsonTab
}

export function CsvJsonWorkbench({ defaultTab = 'csv-to-json' }: CsvJsonWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as CsvJsonTab

  const { output, error, rowCount } = useMemo(
    () => convertCsvJson(state.input, tab),
    [state.input, tab],
  )

  const inputLabel = tab === 'csv-to-json' ? 'CSV input' : 'JSON input (array of objects)'
  const outputLabel = tab === 'csv-to-json' ? 'JSON output' : 'CSV output'
  const inputPlaceholder =
    tab === 'csv-to-json'
      ? 'name,email\nJohn,john@example.com'
      : '[{"name":"John","email":"john@example.com"}]'

  const loadExample = () => {
    setField('input', tab === 'csv-to-json' ? CSV_JSON_EXAMPLE.csv : CSV_JSON_EXAMPLE.json)
  }

  const swapToOtherTab = () => {
    if (!output) return
    setField('input', output)
    setField('tab', tab === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json')
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
        <ToolPanel label={inputLabel}>
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={inputPlaceholder}
          />
        </ToolPanel>
        <ToolPanel label={outputLabel}>
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" />
        </ToolPanel>
      </div>

      {rowCount !== undefined && output && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Table2 className="size-3.5" />
          {rowCount} row{rowCount === 1 ? '' : 's'} converted
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
            Use output in {tab === 'csv-to-json' ? 'JSON → CSV' : 'CSV → JSON'} →
          </Button>
        )}
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        Simple comma-separated CSV with a header row. Format JSON output in the{' '}
        <Link href="/tools/json-formatter" className="font-medium text-primary hover:text-primary/80">
          JSON Formatter
        </Link>
        .
      </p>

      <ToolExample>
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {tab === 'csv-to-json' ? CSV_JSON_EXAMPLE.csv : CSV_JSON_EXAMPLE.json}
        </pre>
      </ToolExample>
    </div>
  )
}
