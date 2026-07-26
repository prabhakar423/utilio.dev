'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeftRight, ArrowRightLeft } from 'lucide-react'
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
import { convertYaml, YAML_EXAMPLE, type YamlTab } from '@/lib/yaml-converter'

const SHARE_INITIAL = {
  tab: 'yaml-to-json' as YamlTab,
  input: '',
}

const TABS: { id: YamlTab; label: string; icon: typeof ArrowRightLeft }[] = [
  { id: 'yaml-to-json', label: 'YAML → JSON', icon: ArrowRightLeft },
  { id: 'json-to-yaml', label: 'JSON → YAML', icon: ArrowLeftRight },
]

interface YamlWorkbenchProps {
  defaultTab?: YamlTab
}

export function YamlWorkbench({ defaultTab = 'yaml-to-json' }: YamlWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as YamlTab

  const { output, error } = useMemo(
    () => convertYaml(state.input, tab),
    [state.input, tab],
  )

  const inputLabel = tab === 'yaml-to-json' ? 'YAML input' : 'JSON input'
  const outputLabel = tab === 'yaml-to-json' ? 'JSON output' : 'YAML output'
  const inputPlaceholder =
    tab === 'yaml-to-json' ? 'name: John\nage: 30' : '{"name":"John","age":30}'

  const loadExample = () => {
    setField('input', tab === 'yaml-to-json' ? YAML_EXAMPLE.yaml : YAML_EXAMPLE.json)
  }

  const swapToOtherTab = () => {
    if (!output) return
    setField('input', output)
    setField('tab', tab === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json')
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

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
        {output && (
          <Button type="button" variant="outline" size="sm" onClick={swapToOtherTab}>
            Use output in {tab === 'yaml-to-json' ? 'JSON → YAML' : 'YAML → JSON'} →
          </Button>
        )}
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        Paste Kubernetes or Docker Compose configs safely — conversion runs locally. Format JSON output in the{' '}
        <Link href="/tools/json-formatter" className="font-medium text-primary hover:text-primary/80">
          JSON Formatter
        </Link>
        .
      </p>

      <ToolExample>
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {tab === 'yaml-to-json' ? YAML_EXAMPLE.yaml : YAML_EXAMPLE.json}
        </pre>
      </ToolExample>
    </div>
  )
}
